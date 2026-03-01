import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CourseCard } from "@/components/portal/course-card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your enrolled courses and learning progress.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: enrolments } = await supabase
    .from("course_enrolments")
    .select("*, courses(*)")
    .eq("user_id", user.id)
    .eq("status", "active");

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Hi {firstName}!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here are your enrolled courses.
        </p>

        {enrolments && enrolments.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolments.map((enrolment) => {
              const course = enrolment.courses;
              if (!course) return null;
              return (
                <CourseCard
                  key={enrolment.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  level={course.level}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h2 className="mt-4 text-lg font-semibold">No courses yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse our courses and enrol to get started.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
