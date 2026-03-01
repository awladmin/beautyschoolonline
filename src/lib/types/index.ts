import type { Database } from "./database";

export type { Database };

// Convenience row types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type CourseSection =
  Database["public"]["Tables"]["course_sections"]["Row"];
export type QuizQuestion =
  Database["public"]["Tables"]["section_quiz_questions"]["Row"];
export type CourseEnrolment =
  Database["public"]["Tables"]["course_enrolments"]["Row"];
export type SectionProgress =
  Database["public"]["Tables"]["section_progress"]["Row"];
export type QuizAttempt = Database["public"]["Tables"]["quiz_attempts"]["Row"];
export type QuizAnswer = Database["public"]["Tables"]["quiz_answers"]["Row"];
export type CoursePurchase =
  Database["public"]["Tables"]["course_purchases"]["Row"];

// Insert types
export type ProfileInsert =
  Database["public"]["Tables"]["profiles"]["Insert"];
export type CourseInsert = Database["public"]["Tables"]["courses"]["Insert"];
export type CourseSectionInsert =
  Database["public"]["Tables"]["course_sections"]["Insert"];
export type QuizQuestionInsert =
  Database["public"]["Tables"]["section_quiz_questions"]["Insert"];

// Enum types
export type UserRole = Database["public"]["Enums"]["user_role"];
export type EnrolmentStatus = Database["public"]["Enums"]["enrolment_status"];
export type SectionProgressStatus =
  Database["public"]["Enums"]["section_progress_status"];
export type PurchaseStatus = Database["public"]["Enums"]["purchase_status"];
export type QuestionType = Database["public"]["Enums"]["question_type"];

// Composite types for common queries
export type CourseWithSections = Course & {
  course_sections: CourseSection[];
};

export type SectionWithQuestions = CourseSection & {
  section_quiz_questions: QuizQuestion[];
};

export type EnrolmentWithCourse = CourseEnrolment & {
  courses: Course;
};

export type SectionProgressWithSection = SectionProgress & {
  course_sections: CourseSection;
};
