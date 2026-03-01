"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitQuiz(
  sectionId: string,
  courseId: string,
  courseSlug: string,
  answers: { questionId: string; answer: string }[]
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Create quiz attempt
  const { data: attempt, error: attemptError } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: user.id,
      section_id: sectionId,
      is_complete: true,
    })
    .select()
    .single();

  if (attemptError || !attempt) {
    return { error: "Failed to create quiz attempt" };
  }

  // Insert answers
  const answerRows = answers.map((a) => ({
    attempt_id: attempt.id,
    question_id: a.questionId,
    answer: JSON.stringify(a.answer),
  }));

  const { error: answersError } = await supabase
    .from("quiz_answers")
    .insert(answerRows);

  if (answersError) {
    return { error: "Failed to save answers" };
  }

  // Calculate score
  const { data: questions } = await supabase
    .from("section_quiz_questions")
    .select("id, correct_answer")
    .eq("section_id", sectionId);

  let score = 0;
  if (questions) {
    for (const q of questions) {
      const userAnswer = answers.find((a) => a.questionId === q.id);
      if (userAnswer) {
        const correctStr =
          typeof q.correct_answer === "string"
            ? q.correct_answer
            : JSON.stringify(q.correct_answer);
        const userStr = JSON.stringify(userAnswer.answer);
        if (
          correctStr.toLowerCase().replace(/"/g, "") ===
          userStr.toLowerCase().replace(/"/g, "")
        ) {
          score++;
        }
      }
    }
  }

  // Update attempt with score
  await supabase
    .from("quiz_attempts")
    .update({ score })
    .eq("id", attempt.id);

  // Update section progress to quiz_completed
  await supabase
    .from("section_progress")
    .update({ status: "quiz_completed" as const })
    .eq("user_id", user.id)
    .eq("section_id", sectionId);

  // Unlock next section
  const { data: sections } = await supabase
    .from("course_sections")
    .select("id, sort_order")
    .eq("course_id", courseId)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (sections) {
    const currentIndex = sections.findIndex((s) => s.id === sectionId);
    if (currentIndex !== -1 && currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      const { data: nextProgress } = await supabase
        .from("section_progress")
        .select("status")
        .eq("user_id", user.id)
        .eq("section_id", nextSection.id)
        .single();

      if (nextProgress?.status === "locked") {
        await supabase
          .from("section_progress")
          .update({ status: "available" as const })
          .eq("user_id", user.id)
          .eq("section_id", nextSection.id);
      }
    }
  }

  revalidatePath(`/courses/${courseSlug}`);

  return {
    success: true,
    score,
    total: questions?.length ?? 0,
  };
}
