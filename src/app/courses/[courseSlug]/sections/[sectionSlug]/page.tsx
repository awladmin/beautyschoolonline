import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock } from "lucide-react";
import { QuizForm } from "@/components/portal/quiz-form";
import { PortalHeader } from "@/components/portal/portal-header";

interface SectionPageProps {
  params: Promise<{ courseSlug: string; sectionSlug: string }>;
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { courseSlug, sectionSlug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .eq("is_published", true)
    .single();

  if (!course) return { title: "Not Found" };

  const { data: section } = await supabase
    .from("course_sections")
    .select("title")
    .eq("course_id", course.id)
    .eq("slug", sectionSlug)
    .single();

  return { title: section?.title || "Section" };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { courseSlug, sectionSlug } = await params;
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.id)
    .single();

  // Get course
  const { data: course } = await supabase
    .from("courses")
    .select("id, title, slug")
    .eq("slug", courseSlug)
    .eq("is_published", true)
    .single();

  if (!course) notFound();

  // Check enrolment
  const { data: enrolment } = await supabase
    .from("course_enrolments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .eq("status", "active")
    .single();

  if (!enrolment) redirect(`/courses/${courseSlug}`);

  // Get section
  const { data: section } = await supabase
    .from("course_sections")
    .select("*")
    .eq("course_id", course.id)
    .eq("slug", sectionSlug)
    .eq("is_published", true)
    .single();

  if (!section) notFound();

  // Get progress
  const { data: progress } = await supabase
    .from("section_progress")
    .select("status")
    .eq("user_id", user.id)
    .eq("section_id", section.id)
    .single();

  if (progress?.status === "locked") {
    return (
      <>
        <PortalHeader
          email={profile?.email || user.email!}
          role={profile?.role ?? null}
        />
        <main className="min-h-[calc(100vh-4rem)]">
          <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
            <Card className="w-full max-w-md text-center">
              <CardContent className="py-8">
                <Lock className="mx-auto h-12 w-12 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-semibold">Section Locked</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Complete the previous section to unlock this one.
                </p>
                <Button className="mt-6" variant="outline" asChild>
                  <Link href={`/courses/${courseSlug}`}>Back to Course</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </>
    );
  }

  // Mark as in_progress if available
  if (progress?.status === "available") {
    await supabase
      .from("section_progress")
      .update({ status: "in_progress" as const })
      .eq("user_id", user.id)
      .eq("section_id", section.id);
  }

  // Get quiz questions
  const { data: questions } = await supabase
    .from("section_quiz_questions")
    .select("id, question_text, question_type, options, sort_order")
    .eq("section_id", section.id)
    .order("sort_order", { ascending: true });

  const isQuizCompleted =
    progress?.status === "quiz_completed" ||
    progress?.status === "submitted" ||
    progress?.status === "completed";

  return (
    <>
      <PortalHeader
        email={profile?.email || user.email!}
        role={profile?.role ?? null}
      />
      <main className="min-h-[calc(100vh-4rem)]">
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href={`/courses/${courseSlug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {course.title}
              </Link>
            </Button>

            <div className="mb-8">
              <Badge variant="secondary" className="mb-2">
                Section {section.section_number}
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {section.title}
              </h1>
            </div>

            {/* Learning Video */}
            {section.learning_video_url && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Learning Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={section.learning_video_url}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Demo Video */}
            {section.demo_video_url && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Demo Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={section.demo_video_url}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quiz */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Quiz</h2>
              {isQuizCompleted ? (
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-green-600 font-medium">
                      You&apos;ve already completed this quiz.
                    </p>
                    <Button className="mt-4" variant="outline" asChild>
                      <Link href={`/courses/${courseSlug}`}>
                        Back to Course
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <QuizForm
                  sectionId={section.id}
                  courseId={course.id}
                  courseSlug={courseSlug}
                  questions={questions ?? []}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
