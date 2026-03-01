export const ROLES = {
  STUDENT: "student",
  ASSESSOR: "assessor",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ENROLMENT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type EnrolmentStatus =
  (typeof ENROLMENT_STATUS)[keyof typeof ENROLMENT_STATUS];

export const SECTION_PROGRESS_STATUS = {
  LOCKED: "locked",
  AVAILABLE: "available",
  IN_PROGRESS: "in_progress",
  QUIZ_COMPLETED: "quiz_completed",
  SUBMITTED: "submitted",
  COMPLETED: "completed",
} as const;

export type SectionProgressStatus =
  (typeof SECTION_PROGRESS_STATUS)[keyof typeof SECTION_PROGRESS_STATUS];

export const PURCHASE_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type PurchaseStatus =
  (typeof PURCHASE_STATUS)[keyof typeof PURCHASE_STATUS];

export const QUESTION_TYPE = {
  MULTIPLE_CHOICE: "multiple_choice",
  TRUE_FALSE: "true_false",
  SHORT_ANSWER: "short_answer",
} as const;

export type QuestionType =
  (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export const ROUTES = {
  HOME: "/",
  COURSES: "/courses",
  HOW_IT_WORKS: "/how-it-works",
  ABOUT: "/about",
  FAQ: "/faq",
  CONTACT: "/contact",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  SAFEGUARDING: "/safeguarding",
} as const;
