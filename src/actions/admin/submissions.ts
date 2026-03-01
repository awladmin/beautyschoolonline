"use server";

import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") throw new Error("Not authorized");
  return supabase;
}

export async function getSubmissions() {
  const supabase = await requireAdmin();

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("*, profiles(email, full_name), course_sections(title, courses(title))")
    .eq("is_complete", true)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return data;
}
