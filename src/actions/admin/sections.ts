"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { SectionFormValues } from "@/lib/schemas/course";

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

export async function getAdminSection(sectionId: string) {
  const supabase = await requireAdmin();

  const { data: section } = await supabase
    .from("course_sections")
    .select("*")
    .eq("id", sectionId)
    .single();

  if (!section) return null;

  const { data: questions } = await supabase
    .from("section_quiz_questions")
    .select("*")
    .eq("section_id", sectionId)
    .order("sort_order", { ascending: true });

  return { section, questions: questions ?? [] };
}

export async function createSection(courseId: string, values: SectionFormValues) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from("course_sections").insert({
    course_id: courseId,
    title: values.title,
    slug: values.slug,
    section_number: values.sectionNumber,
    learning_video_url: values.learningVideoUrl || null,
    demo_video_url: values.demoVideoUrl || null,
    is_published: values.isPublished,
    sort_order: values.sortOrder,
  });

  if (error) return { error: error.message };
  revalidatePath(`/admin/courses/${courseId}/edit`);
  return { success: true };
}

export async function updateSection(
  sectionId: string,
  courseId: string,
  values: SectionFormValues
) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("course_sections")
    .update({
      title: values.title,
      slug: values.slug,
      section_number: values.sectionNumber,
      learning_video_url: values.learningVideoUrl || null,
      demo_video_url: values.demoVideoUrl || null,
      is_published: values.isPublished,
      sort_order: values.sortOrder,
    })
    .eq("id", sectionId);

  if (error) return { error: error.message };
  revalidatePath(`/admin/courses/${courseId}/edit`);
  return { success: true };
}

export async function deleteSection(sectionId: string, courseId: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("course_sections")
    .delete()
    .eq("id", sectionId);

  if (error) return { error: error.message };
  revalidatePath(`/admin/courses/${courseId}/edit`);
  return { success: true };
}
