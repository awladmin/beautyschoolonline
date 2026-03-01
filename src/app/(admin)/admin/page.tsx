import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { StatsCards } from "@/components/admin/stats-cards";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: userCount },
    { count: courseCount },
    { count: enrolmentCount },
    { count: submissionCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase
      .from("course_enrolments")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("quiz_attempts")
      .select("*", { count: "exact", head: true })
      .eq("is_complete", true),
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
      <StatsCards
        userCount={userCount ?? 0}
        courseCount={courseCount ?? 0}
        enrolmentCount={enrolmentCount ?? 0}
        submissionCount={submissionCount ?? 0}
      />
    </div>
  );
}
