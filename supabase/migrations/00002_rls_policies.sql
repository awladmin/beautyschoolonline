-- Enable RLS on all tables
alter table profiles enable row level security;
alter table courses enable row level security;
alter table course_sections enable row level security;
alter table section_quiz_questions enable row level security;
alter table course_enrolments enable row level security;
alter table section_progress enable row level security;
alter table quiz_attempts enable row level security;
alter table quiz_answers enable row level security;
alter table course_purchases enable row level security;

-- Helper: check if current user is admin
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
    and role = 'admin'
  );
$$ language sql security definer;

-- Profiles
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Admins can view all profiles"
  on profiles for select using (is_admin());

create policy "Admins can update all profiles"
  on profiles for update using (is_admin());

-- Courses (published courses are public)
create policy "Anyone can view published courses"
  on courses for select using (is_published = true);

create policy "Admins can do everything with courses"
  on courses for all using (is_admin());

-- Course sections (published sections of published courses are public)
create policy "Anyone can view published sections of published courses"
  on course_sections for select using (
    is_published = true
    and exists (
      select 1 from courses
      where courses.id = course_sections.course_id
      and courses.is_published = true
    )
  );

create policy "Admins can do everything with sections"
  on course_sections for all using (is_admin());

-- Quiz questions (visible to enrolled users and admins)
create policy "Enrolled users can view quiz questions"
  on section_quiz_questions for select using (
    exists (
      select 1 from course_sections cs
      join course_enrolments ce on ce.course_id = cs.course_id
      where cs.id = section_quiz_questions.section_id
      and ce.user_id = auth.uid()
      and ce.status = 'active'
    )
  );

create policy "Admins can do everything with questions"
  on section_quiz_questions for all using (is_admin());

-- Course enrolments
create policy "Users can view own enrolments"
  on course_enrolments for select using (auth.uid() = user_id);

create policy "Admins can do everything with enrolments"
  on course_enrolments for all using (is_admin());

-- Section progress
create policy "Users can view own progress"
  on section_progress for select using (auth.uid() = user_id);

create policy "Users can update own progress"
  on section_progress for update using (auth.uid() = user_id);

create policy "Admins can do everything with progress"
  on section_progress for all using (is_admin());

-- Quiz attempts
create policy "Users can view own quiz attempts"
  on quiz_attempts for select using (auth.uid() = user_id);

create policy "Users can insert own quiz attempts"
  on quiz_attempts for insert with check (auth.uid() = user_id);

create policy "Users can update own quiz attempts"
  on quiz_attempts for update using (auth.uid() = user_id);

create policy "Admins can do everything with quiz attempts"
  on quiz_attempts for all using (is_admin());

-- Quiz answers
create policy "Users can view own quiz answers"
  on quiz_answers for select using (
    exists (
      select 1 from quiz_attempts
      where quiz_attempts.id = quiz_answers.attempt_id
      and quiz_attempts.user_id = auth.uid()
    )
  );

create policy "Users can insert own quiz answers"
  on quiz_answers for insert with check (
    exists (
      select 1 from quiz_attempts
      where quiz_attempts.id = quiz_answers.attempt_id
      and quiz_attempts.user_id = auth.uid()
    )
  );

create policy "Admins can do everything with quiz answers"
  on quiz_answers for all using (is_admin());

-- Course purchases
create policy "Users can view own purchases"
  on course_purchases for select using (auth.uid() = user_id);

create policy "Admins can do everything with purchases"
  on course_purchases for all using (is_admin());
