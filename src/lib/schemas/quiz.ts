import { z } from "zod";

export const quizAnswerSchema = z.object({
  questionId: z.string().uuid(),
  answer: z.union([z.string(), z.boolean()]),
});

export const submitQuizSchema = z.object({
  sectionId: z.string().uuid(),
  answers: z.array(quizAnswerSchema).min(1, "Please answer all questions"),
});

export type SubmitQuizValues = z.infer<typeof submitQuizSchema>;
