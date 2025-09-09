-- Seed data for CBE Career Guide
-- Run this after setting up the schema and RLS policies

-- Insert Kenyan counties and sample schools
INSERT INTO schools (name, location, county, type, registration_number, contact_email, contact_phone, principal_name) VALUES
-- Nairobi County
('Alliance High School', 'Kikuyu', 'Nairobi', 'secondary', 'AHS001', 'info@alliancehigh.ac.ke', '+254-20-2024000', 'Dr. John Kamau'),
('Loreto Convent Msongari', 'Karen', 'Nairobi', 'secondary', 'LCM001', 'admin@loreto.ac.ke', '+254-20-2671000', 'Sr. Mary Wanjiku'),
('Nairobi Primary School', 'CBD', 'Nairobi', 'primary', 'NPS001', 'info@nairobiprimary.ac.ke', '+254-20-2240000', 'Mrs. Grace Muthoni'),

-- Mombasa County
('Aga Khan Academy Mombasa', 'Mombasa', 'Mombasa', 'mixed', 'AKAM001', 'info@agakhanacademy.ac.ke', '+254-41-2000000', 'Mr. Ahmed Hassan'),
('Coast Girls High School', 'Mombasa', 'Mombasa', 'secondary', 'CGHS001', 'admin@coastgirls.ac.ke', '+254-41-2100000', 'Mrs. Fatuma Ali'),

-- Kisumu County
('Maseno School', 'Maseno', 'Kisumu', 'secondary', 'MS001', 'info@maseno.ac.ke', '+254-57-2000000', 'Mr. Peter Ochieng'),
('Tom Mboya University College', 'Homabay', 'Kisumu', 'mixed', 'TMUC001', 'admin@tmuc.ac.ke', '+254-59-2000000', 'Dr. Susan Akinyi'),

-- Nakuru County
('Menengai High School', 'Nakuru', 'Nakuru', 'secondary', 'MHS001', 'info@menengai.ac.ke', '+254-51-2000000', 'Mr. David Kiprop'),
('Nakuru Day Secondary School', 'Nakuru', 'Nakuru', 'secondary', 'NDSS001', 'admin@nakuruday.ac.ke', '+254-51-2100000', 'Mrs. Mary Wanjiru'),

-- Eldoret/Uasin Gishu County
('Moi High School Kabarak', 'Kabarak', 'Nakuru', 'secondary', 'MHSK001', 'info@kabarak.ac.ke', '+254-51-2200000', 'Mr. Samuel Ruto');

-- Insert core subjects for Kenyan curriculum
INSERT INTO subjects (name, code, description, grade_levels, is_core) VALUES
-- Primary subjects (Grades 1-8)
('Mathematics', 'MATH', 'Core mathematics covering arithmetic, algebra, and geometry', ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], true),
('English', 'ENG', 'English language and literature', ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], true),
('Kiswahili', 'KIS', 'Kiswahili language and literature', ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], true),
('Science and Technology', 'SCI', 'Integrated science covering basic concepts', ARRAY[1,2,3,4,5,6,7,8], true),
('Social Studies', 'SS', 'Geography, history, and civics', ARRAY[1,2,3,4,5,6,7,8], true),
('Creative Arts', 'CA', 'Music, art, and drama', ARRAY[1,2,3,4,5,6,7,8], false),
('Physical Education', 'PE', 'Sports and physical fitness', ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], false),

-- Secondary subjects (Forms 1-4, Grades 9-12)
('Biology', 'BIO', 'Study of living organisms', ARRAY[9,10,11,12], false),
('Chemistry', 'CHEM', 'Study of matter and chemical reactions', ARRAY[9,10,11,12], false),
('Physics', 'PHY', 'Study of matter, energy, and their interactions', ARRAY[9,10,11,12], false),
('History and Government', 'HIST', 'Kenyan and world history, government systems', ARRAY[9,10,11,12], false),
('Geography', 'GEO', 'Physical and human geography', ARRAY[9,10,11,12], false),
('Computer Studies', 'COMP', 'Basic computer skills and programming', ARRAY[9,10,11,12], false),
('Business Studies', 'BUS', 'Basic business and entrepreneurship concepts', ARRAY[9,10,11,12], false),
('Agriculture', 'AGR', 'Farming techniques and agricultural science', ARRAY[9,10,11,12], false),
('Home Science', 'HS', 'Nutrition, clothing, and home management', ARRAY[9,10,11,12], false),
('Art and Design', 'ART', 'Visual arts and design principles', ARRAY[9,10,11,12], false),
('Music', 'MUS', 'Music theory and performance', ARRAY[9,10,11,12], false),
('French', 'FR', 'French language', ARRAY[9,10,11,12], false),
('German', 'GER', 'German language', ARRAY[9,10,11,12], false),
('Arabic', 'AR', 'Arabic language', ARRAY[9,10,11,12], false);

-- Sample career data for recommendations
-- This would typically be populated by an AI system, but here's some sample data
INSERT INTO career_recommendations (student_id, career_title, match_percentage, demand_level, salary_range, required_subjects, recommended_courses, skills_needed, description) 
SELECT 
    s.id,
    'Software Developer',
    85.5,
    'Very High',
    'KSh 80,000 - 300,000',
    ARRAY['Mathematics', 'Computer Studies', 'Physics'],
    ARRAY['Computer Science', 'Software Engineering', 'Information Technology'],
    ARRAY['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
    'Design, develop, and maintain software applications and systems. High demand in Kenya''s growing tech sector.'
FROM students s 
LIMIT 1;

-- Sample assessment questions for quick assessment
-- This is a simplified example - in practice, you'd have a more sophisticated question bank
DO $$
DECLARE
    sample_questions JSONB := '[
        {
            "id": 1,
            "question": "What subject do you enjoy most?",
            "type": "multiple_choice",
            "options": ["Mathematics", "Science", "Languages", "Arts", "Social Studies"],
            "category": "interests"
        },
        {
            "id": 2,
            "question": "Which activity sounds most appealing to you?",
            "type": "multiple_choice",
            "options": ["Solving puzzles", "Conducting experiments", "Writing stories", "Drawing/painting", "Helping others"],
            "category": "preferences"
        },
        {
            "id": 3,
            "question": "What is your strongest skill?",
            "type": "multiple_choice",
            "options": ["Analytical thinking", "Creativity", "Communication", "Leadership", "Technical skills"],
            "category": "skills"
        },
        {
            "id": 4,
            "question": "In group projects, you usually:",
            "type": "multiple_choice",
            "options": ["Lead the team", "Do the research", "Present the findings", "Organize the work", "Support others"],
            "category": "personality"
        },
        {
            "id": 5,
            "question": "Your ideal work environment would be:",
            "type": "multiple_choice",
            "options": ["Office setting", "Laboratory", "Outdoors", "Creative studio", "Community center"],
            "category": "environment"
        }
    ]'::jsonb;
    student_record RECORD;
BEGIN
    -- Create sample assessments for existing students
    FOR student_record IN SELECT id FROM students LIMIT 3 LOOP
        INSERT INTO assessments (
            student_id, 
            type, 
            title, 
            description, 
            questions, 
            max_score, 
            status
        ) VALUES (
            student_record.id,
            'quick',
            'Career Interest Assessment',
            'A quick assessment to understand your interests and preferences for career guidance',
            sample_questions,
            100.0,
            'pending'
        );
    END LOOP;
END $$;

-- Update school statistics
UPDATE schools SET 
    total_students = (
        SELECT COUNT(*) FROM students WHERE school_id = schools.id
    ),
    total_teachers = (
        SELECT COUNT(*) FROM teachers WHERE school_id = schools.id
    );

-- Sample performance data
-- This would typically come from actual student assessments
DO $$
DECLARE
    student_record RECORD;
    subject_record RECORD;
    random_score DECIMAL(5,2);
BEGIN
    FOR student_record IN SELECT id, grade_level FROM students LOOP
        FOR subject_record IN SELECT id FROM subjects WHERE student_record.grade_level = ANY(grade_levels) LOOP
            -- Generate random scores between 40 and 95
            random_score := 40 + (RANDOM() * 55);
            
            INSERT INTO performance_records (
                student_id,
                subject_id,
                score,
                max_score,
                grade_level,
                term,
                year
            ) VALUES (
                student_record.id,
                subject_record.id,
                random_score,
                100.0,
                student_record.grade_level,
                1, -- Term 1
                2024
            );
        END LOOP;
    END LOOP;
END $$;

-- Create some sample AI interactions
INSERT INTO ai_interactions (student_id, question, response, context)
SELECT 
    s.id,
    'What careers are good for someone who likes mathematics?',
    'Based on your interest in mathematics, you might consider careers in engineering, data science, finance, actuarial science, or computer programming. These fields heavily rely on mathematical skills and offer good career prospects in Kenya.',
    '{"interests": ["mathematics"], "grade_level": ' || s.grade_level || '}'::jsonb
FROM students s
LIMIT 2;

-- Add some sample admin users (you'll need to create these through the auth system first)
-- This is just a placeholder - actual admin users need to be created through Supabase Auth
INSERT INTO admins (user_id, organization, position, permissions)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Ministry of Education', 'Education Officer', ARRAY['read', 'write', 'admin']),
    ('00000000-0000-0000-0000-000000000002', 'Kenya Institute of Curriculum Development', 'Curriculum Specialist', ARRAY['read', 'write'])
ON CONFLICT (user_id) DO NOTHING;
