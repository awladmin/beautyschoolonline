-- Auto-create profile on auth.users insert
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'student'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Auto-update updated_at timestamp
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on profiles
  for each row execute function handle_updated_at();
create trigger set_updated_at before update on courses
  for each row execute function handle_updated_at();
create trigger set_updated_at before update on course_sections
  for each row execute function handle_updated_at();
create trigger set_updated_at before update on section_quiz_questions
  for each row execute function handle_updated_at();
create trigger set_updated_at before update on course_enrolments
  for each row execute function handle_updated_at();
create trigger set_updated_at before update on section_progress
  for each row execute function handle_updated_at();
create trigger set_updated_at before update on quiz_attempts
  for each row execute function handle_updated_at();
create trigger set_updated_at before update on course_purchases
  for each row execute function handle_updated_at();

-- Auto-create section_progress rows when enrolment is created
create or replace function handle_new_enrolment()
returns trigger as $$
declare
  section record;
  first_section boolean := true;
begin
  for section in
    select id from course_sections
    where course_id = new.course_id
    and is_published = true
    order by sort_order asc, section_number asc
  loop
    insert into section_progress (user_id, section_id, status)
    values (
      new.user_id,
      section.id,
      case when first_section then 'available'::section_progress_status else 'locked'::section_progress_status end
    );
    first_section := false;
  end loop;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_enrolment_created
  after insert on course_enrolments
  for each row execute function handle_new_enrolment();
