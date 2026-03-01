-- Seed data for local development
-- Note: Auth users must be created via Supabase Auth (dashboard or API).
-- This seeds the public tables assuming profiles are auto-created by the trigger.

-- Sample courses
insert into courses (id, title, slug, description, level, price_gbp, is_published, is_available_for_purchase) values
  ('00000000-0000-0000-0000-000000000001', 'Bronze', 'bronze', 'Learn the fundamentals of nail art with weekly guided lessons. Perfect for DofE Bronze Skills section.', 'Bronze', 2500, true, true),
  ('00000000-0000-0000-0000-000000000002', 'Silver', 'silver', 'Build on your skills with intermediate beauty techniques. Ideal for DofE Silver Skills section.', 'Silver', 3500, true, true),
  ('00000000-0000-0000-0000-000000000003', 'Gold', 'gold', 'Master advanced beauty skills with in-depth video lessons and portfolio building. Designed for DofE Gold Skills.', 'Gold', 4500, true, false);

-- Sections for Bronze Nail Art
insert into course_sections (id, course_id, title, slug, section_number, learning_video_url, demo_video_url, is_published, sort_order) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Introduction to Nail Care', 'intro-nail-care', 1, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', true, 1),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Basic Nail Shapes', 'basic-nail-shapes', 2, 'https://www.youtube.com/embed/dQw4w9WgXcQ', null, true, 2),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Colour Theory & Polish Application', 'colour-theory-polish', 3, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', true, 3),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Simple Nail Art Designs', 'simple-nail-art', 4, 'https://www.youtube.com/embed/dQw4w9WgXcQ', null, true, 4);

-- Sections for Silver Beauty Techniques
insert into course_sections (id, course_id, title, slug, section_number, learning_video_url, demo_video_url, is_published, sort_order) values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Skincare Fundamentals', 'skincare-fundamentals', 1, 'https://www.youtube.com/embed/dQw4w9WgXcQ', null, true, 1),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Facial Techniques', 'facial-techniques', 2, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', true, 2),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Makeup Basics', 'makeup-basics', 3, 'https://www.youtube.com/embed/dQw4w9WgXcQ', null, true, 3);

-- Quiz questions for Section 1 of Bronze Nail Art
insert into section_quiz_questions (section_id, question_text, question_type, options, correct_answer, sort_order) values
  ('10000000-0000-0000-0000-000000000001', 'What is the first step in a basic manicure?', 'multiple_choice', '["Remove old polish", "Apply new polish", "File nails", "Apply cuticle oil"]', '"Remove old polish"', 1),
  ('10000000-0000-0000-0000-000000000001', 'Nails should be filed in one direction only.', 'true_false', '["True", "False"]', '"True"', 2),
  ('10000000-0000-0000-0000-000000000001', 'Name one tool used for pushing back cuticles.', 'short_answer', null, '"cuticle pusher"', 3);

-- Quiz questions for Section 2
insert into section_quiz_questions (section_id, question_text, question_type, options, correct_answer, sort_order) values
  ('10000000-0000-0000-0000-000000000002', 'Which nail shape is considered the most natural?', 'multiple_choice', '["Round", "Stiletto", "Coffin", "Almond"]', '"Round"', 1),
  ('10000000-0000-0000-0000-000000000002', 'Square nails are filed straight across the tip.', 'true_false', '["True", "False"]', '"True"', 2);
