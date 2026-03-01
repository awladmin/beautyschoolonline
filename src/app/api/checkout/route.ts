import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, courseSlug } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Fetch the course
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .eq("is_published", true)
      .eq("is_available_for_purchase", true)
      .single();

    if (courseError || !course) {
      return NextResponse.json(
        { error: "Course not found or not available" },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const { data: existing } = await supabase
      .from("course_enrolments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Already enrolled in this course" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe Checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        user_id: user.id,
        course_id: courseId,
      },
      line_items: [
        course.stripe_price_id
          ? { price: course.stripe_price_id, quantity: 1 }
          : {
              price_data: {
                currency: "gbp",
                product_data: {
                  name: course.title,
                },
                unit_amount: course.price_gbp,
              },
              quantity: 1,
            },
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&course=${courseSlug || course.slug}`,
      cancel_url: `${appUrl}/checkout/cancel?course=${courseSlug || course.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
