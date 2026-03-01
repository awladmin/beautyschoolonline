import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Lock, PlayCircle, Video, Brain, Gauge } from "lucide-react";
import { BuyButton } from "@/components/portal/buy-button";

interface CourseDetailPageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("title, description")
    .eq("slug", courseSlug)
    .eq("is_published", true)
    .single();

  if (!course) return { title: "Course Not Found" };

  return {
    title: course.title,
    description: course.description || undefined,
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseSlug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", courseSlug)
    .eq("is_published", true)
    .single();

  if (!course) notFound();

  // Fetch sections
  const { data: sections } = await supabase
    .from("course_sections")
    .select("id, title, slug, section_number, sort_order")
    .eq("course_id", course.id)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  // Check if user is authenticated and enrolled
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isEnrolled = false;
  if (user) {
    const { data: enrolment } = await supabase
      .from("course_enrolments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .eq("status", "active")
      .single();
    isEnrolled = !!enrolment;
  }

  const priceFormatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(course.price_gbp / 100);

  return (
    <section className="bg-secondary/30 px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Course header */}
        <div className="mb-8">
          {course.level && (
            <Badge variant="secondary" className="mb-4">
              {course.level} Level
            </Badge>
          )}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {course.title}
          </h1>
          {course.description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {course.description}
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sections list */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">What You&apos;ll Learn</h2>
            <div className="space-y-3">
              {sections?.map((section, index) => (
                <Card
                  key={section.id}
                  className={
                    isEnrolled
                      ? "transition-colors hover:border-primary/50"
                      : ""
                  }
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    {isEnrolled ? (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <PlayCircle className="h-5 w-5 text-primary" />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-semibold text-muted-foreground">
                          {index + 1}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Section {section.section_number}
                      </p>
                    </div>
                    {isEnrolled ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/courses/${course.slug}/sections/${section.slug}`}
                        >
                          Start
                        </Link>
                      </Button>
                    ) : (
                      <Lock className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    )}
                  </CardContent>
                </Card>
              ))}
              {(!sections || sections.length === 0) && (
                <p className="text-muted-foreground">
                  Course sections coming soon.
                </p>
              )}
            </div>
          </div>

          {/* Purchase / Enrolment card */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-2xl">{priceFormatted}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEnrolled ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      You&apos;re enrolled
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                  </>
                ) : course.is_available_for_purchase ? (
                  <>
                    {user ? (
                      <BuyButton
                        courseId={course.id}
                        courseSlug={course.slug}
                      />
                    ) : (
                      <>
                        <Button className="w-full py-6 text-base font-semibold" asChild>
                          <Link href={`/signup?redirect=/courses/${course.slug}`}>
                            Register to Purchase
                          </Link>
                        </Button>
                        <p className="text-center text-xs text-muted-foreground">
                          It only takes 2 minutes to create an account and
                          complete your purchase. You&apos;ll get instant access
                          to the course.
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    This course is not currently available for purchase.
                  </p>
                )}
                <div className="border-t pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                      <span>
                        {sections?.length || 0} section
                        {(sections?.length || 0) !== 1 ? "s" : ""} of content
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Video className="h-4 w-4 shrink-0 text-primary" />
                      <span>Video lessons with expert tutor</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Brain className="h-4 w-4 shrink-0 text-primary" />
                      <span>Quizzes to test your knowledge</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Gauge className="h-4 w-4 shrink-0 text-primary" />
                      <span>Self-paced learning</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-primary" />
                      <span>Lifetime access</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
