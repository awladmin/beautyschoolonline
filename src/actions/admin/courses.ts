"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CourseFormValues } from "@/lib/schemas/course";

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

export async function getAdminCourses() {
  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAdminCourseById(id: string) {
  const supabase = await requireAdmin();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) return null;

  const { data: sections } = await supabase
    .from("course_sections")
    .select("*")
    .eq("course_id", id)
    .order("sort_order", { ascending: true });

  return { course, sections: sections ?? [] };
}

export async function createCourse(values: CourseFormValues) {
  const supabase = await requireAdmin();

  const { data, error } = await supabase
    .from("courses")
    .insert({
      title: values.title,
      slug: values.slug,
      description: values.description || null,
      level: values.level || null,
      price_gbp: values.priceGbp,
      stripe_price_id: values.stripePriceId || null,
      is_published: values.isPublished,
      is_available_for_purchase: values.isAvailableForPurchase,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin/courses");
  return { success: true, courseId: data.id };
}

export async function updateCourse(id: string, values: CourseFormValues) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("courses")
    .update({
      title: values.title,
      slug: values.slug,
      description: values.description || null,
      level: values.level || null,
      price_gbp: values.priceGbp,
      stripe_price_id: values.stripePriceId || null,
      is_published: values.isPublished,
      is_available_for_purchase: values.isAvailableForPurchase,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/courses");
  return { success: true };
}

export async function deleteCourse(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/courses");
  return { success: true };
}
