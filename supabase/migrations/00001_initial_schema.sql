-- Enums
create type user_role as enum ('student', 'assessor', 'admin');
create type enrolment_status as enum ('active', 'completed', 'cancelled');
create type section_progress_status as enum ('locked', 'available', 'in_progress', 'quiz_completed', 'submitted', 'completed');
create type purchase_status as enum ('pending', 'completed', 'failed', 'refunded');
create type question_type as enum ('multiple_choice', 'true_false', 'short_answer');

-- Profiles (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role user_role not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Courses
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  level text,
  price_gbp integer not null default 0,
  stripe_price_id text,
  is_published boolean not null default false,
  is_available_for_purchase boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index courses_slug_idx on courses (slug);

-- Course sections
create table course_sections (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses on delete cascade,
  title text not null,
  slug text not null,
  section_number integer not null,
  learning_video_url text,
  demo_video_url text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, slug),
  unique (course_id, section_number)
);

create index course_sections_course_id_idx on course_sections (course_id);

-- Section quiz questions
create table section_quiz_questions (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references course_sections on delete cascade,
  question_text text not null,
  question_type question_type not null default 'multiple_choice',
  options jsonb,
  correct_answer jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index quiz_questions_section_id_idx on section_quiz_questions (section_id);

-- Course enrolments
create table course_enrolments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles on delete cascade,
  course_id uuid not null references courses on delete cascade,
  status enrolment_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index enrolments_user_id_idx on course_enrolments (user_id);
create index enrolments_course_id_idx on course_enrolments (course_id);

-- Section progress
create table section_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles on delete cascade,
  section_id uuid not null references course_sections on delete cascade,
  status section_progress_status not null default 'locked',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, section_id)
);

create index section_progress_user_id_idx on section_progress (user_id);

-- Quiz attempts
create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles on delete cascade,
  section_id uuid not null references course_sections on delete cascade,
  is_complete boolean not null default false,
  score integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index quiz_attempts_user_section_idx on quiz_attempts (user_id, section_id);

-- Quiz answers
create table quiz_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references quiz_attempts on delete cascade,
  question_id uuid not null references section_quiz_questions on delete cascade,
  answer jsonb not null,
  created_at timestamptz not null default now()
);

create index quiz_answers_attempt_id_idx on quiz_answers (attempt_id);

-- Course purchases
create table course_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles on delete cascade,
  course_id uuid not null references courses on delete cascade,
  stripe_checkout_session_id text not null unique,
  amount integer not null,
  status purchase_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index purchases_user_id_idx on course_purchases (user_id);
create index purchases_session_id_idx on course_purchases (stripe_checkout_session_id);
