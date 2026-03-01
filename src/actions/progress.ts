"use server";

import { createClient } from "@/lib/supabase/server";
import type { SectionProgressStatus } from "@/lib/types";

export async function getSectionProgress(sectionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("section_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("section_id", sectionId)
    .single();

  return data;
}

export async function getCourseProgress(courseId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("section_progress")
    .select("*, course_sections(*)")
    .eq("user_id", user.id)
    .eq("course_sections.course_id", courseId)
    .order("course_sections(sort_order)", { ascending: true });

  return data ?? [];
}

export async function updateSectionProgress(
  sectionId: string,
  status: SectionProgressStatus
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("section_progress")
    .update({ status })
    .eq("user_id", user.id)
    .eq("section_id", sectionId);

  if (error) return { error: error.message };
  return { success: true };
}

export async function unlockNextSection(
  courseId: string,
  currentSectionId: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Get all sections for this course in order
  const { data: sections } = await supabase
    .from("course_sections")
    .select("id, sort_order")
    .eq("course_id", courseId)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (!sections) return { error: "No sections found" };

  const currentIndex = sections.findIndex((s) => s.id === currentSectionId);
  if (currentIndex === -1 || currentIndex >= sections.length - 1) {
    return { success: true }; // No next section
  }

  const nextSection = sections[currentIndex + 1];

  // Check if next section is still locked
  const { data: nextProgress } = await supabase
    .from("section_progress")
    .select("status")
    .eq("user_id", user.id)
    .eq("section_id", nextSection.id)
    .single();

  if (nextProgress?.status === "locked") {
    await supabase
      .from("section_progress")
      .update({ status: "available" })
      .eq("user_id", user.id)
      .eq("section_id", nextSection.id);
  }

  return { success: true };
}
