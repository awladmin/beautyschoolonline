"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCourseSections(courseId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("course_sections")
    .select("*")
    .eq("course_id", courseId)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data;
}

export async function getSectionBySlug(courseSlug: string, sectionSlug: string) {
  const supabase = await createClient();

  // First get the course
  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .eq("is_published", true)
    .single();

  if (!course) return null;

  const { data: section } = await supabase
    .from("course_sections")
    .select("*")
    .eq("course_id", course.id)
    .eq("slug", sectionSlug)
    .eq("is_published", true)
    .single();

  return section;
}

export async function getSectionQuestions(sectionId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("section_quiz_questions")
    .select("*")
    .eq("section_id", sectionId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data;
}
