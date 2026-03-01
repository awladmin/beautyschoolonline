import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().optional(),
  level: z.string().optional(),
  priceGbp: z.number().int().min(0, "Price must be 0 or more"),
  stripePriceId: z.string().optional(),
  isPublished: z.boolean(),
  isAvailableForPurchase: z.boolean(),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

export const sectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  sectionNumber: z.number().int().min(1),
  learningVideoUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  demoVideoUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  isPublished: z.boolean(),
  sortOrder: z.number().int(),
});

export type SectionFormValues = z.infer<typeof sectionSchema>;

export const questionSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  questionType: z.enum(["multiple_choice", "true_false", "short_answer"]),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  sortOrder: z.number().int(),
});

export type QuestionFormValues = z.infer<typeof questionSchema>;
