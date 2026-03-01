"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { QuestionFormValues } from "@/lib/schemas/course";

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

export async function createQuestion(
  sectionId: string,
  courseId: string,
  values: QuestionFormValues
) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from("section_quiz_questions").insert({
    section_id: sectionId,
    question_text: values.questionText,
    question_type: values.questionType,
    options: values.options ? JSON.stringify(values.options) : null,
    correct_answer: JSON.stringify(values.correctAnswer),
    sort_order: values.sortOrder,
  });

  if (error) return { error: error.message };
  revalidatePath(`/admin/courses/${courseId}/sections/${sectionId}/edit`);
  return { success: true };
}

export async function updateQuestion(
  questionId: string,
  sectionId: string,
  courseId: string,
  values: QuestionFormValues
) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("section_quiz_questions")
    .update({
      question_text: values.questionText,
      question_type: values.questionType,
      options: values.options ? JSON.stringify(values.options) : null,
      correct_answer: JSON.stringify(values.correctAnswer),
      sort_order: values.sortOrder,
    })
    .eq("id", questionId);

  if (error) return { error: error.message };
  revalidatePath(`/admin/courses/${courseId}/sections/${sectionId}/edit`);
  return { success: true };
}

export async function deleteQuestion(
  questionId: string,
  sectionId: string,
  courseId: string
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("section_quiz_questions")
    .delete()
    .eq("id", questionId);

  if (error) return { error: error.message };
  revalidatePath(`/admin/courses/${courseId}/sections/${sectionId}/edit`);
  return { success: true };
}
