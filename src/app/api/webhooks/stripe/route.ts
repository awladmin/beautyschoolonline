import { NextResponse } from "next/server";
import { getStripe, Stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const courseId = session.metadata?.course_id;

    if (!userId || !courseId) {
      console.error("Missing metadata in checkout session:", session.id);
      return NextResponse.json({ received: true });
    }

    // Create purchase record
    const { error: purchaseError } = await supabase
      .from("course_purchases")
      .insert({
        user_id: userId,
        course_id: courseId,
        stripe_checkout_session_id: session.id,
        amount: session.amount_total ?? 0,
        status: "completed",
      });

    if (purchaseError) {
      console.error("Failed to create purchase:", purchaseError);
    }

    // Create enrolment (trigger will auto-create section progress)
    const { error: enrolmentError } = await supabase
      .from("course_enrolments")
      .insert({
        user_id: userId,
        course_id: courseId,
        status: "active",
      });

    if (enrolmentError) {
      // May be a duplicate — that's fine
      if (!enrolmentError.message.includes("duplicate")) {
        console.error("Failed to create enrolment:", enrolmentError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
