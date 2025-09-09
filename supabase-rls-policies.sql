-- Row Level Security (RLS) Policies for CBE Career Guide
-- Run this after creating the main schema

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
CREATE POLICY "Users can view their own profile" ON profiles 
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles 
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Service role can insert profiles" ON profiles 
FOR INSERT WITH CHECK (true);

-- Schools table policies
CREATE POLICY "Anyone can view schools" ON schools 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage schools" ON schools 
FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Students table policies
CREATE POLICY "Students can view their own data" ON students 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students can update their own data" ON students 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Teachers can view students in their school" ON students 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM teachers t 
        JOIN profiles p ON t.user_id = p.id 
        WHERE p.id = auth.uid() AND t.school_id = students.school_id
    )
);

CREATE POLICY "Admins can view all students" ON students 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can manage students" ON students 
FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Service role can insert students" ON students 
FOR INSERT WITH CHECK (true);

-- Teachers table policies
CREATE POLICY "Teachers can view their own data" ON teachers 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Teachers can update their own data" ON teachers 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Teachers in same school can view each other" ON teachers 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM teachers t 
        JOIN profiles p ON t.user_id = p.id 
        WHERE p.id = auth.uid() AND t.school_id = teachers.school_id
    )
);

CREATE POLICY "Admins can view all teachers" ON teachers 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can manage teachers" ON teachers 
FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Service role can insert teachers" ON teachers 
FOR INSERT WITH CHECK (true);

-- Admins table policies
CREATE POLICY "Admins can view their own data" ON admins 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can update their own data" ON admins 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Super admins can view all admins" ON admins 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM admins a 
        JOIN profiles p ON a.user_id = p.id 
        WHERE p.id = auth.uid() AND 'super_admin' = ANY(a.permissions)
    )
);

CREATE POLICY "Service role can insert admins" ON admins 
FOR INSERT WITH CHECK (true);

-- Subjects table policies
CREATE POLICY "Anyone can view subjects" ON subjects 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage subjects" ON subjects 
FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Assessments table policies
CREATE POLICY "Students can view their own assessments" ON assessments 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE id = assessments.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can update their own assessments" ON assessments 
FOR UPDATE USING (
    EXISTS (SELECT 1 FROM students WHERE id = assessments.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can insert their own assessments" ON assessments 
FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM students WHERE id = assessments.student_id AND user_id = auth.uid())
);

CREATE POLICY "Teachers can view assessments of their students" ON assessments 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM students s
        JOIN teachers t ON s.school_id = t.school_id
        JOIN profiles p ON t.user_id = p.id
        WHERE s.id = assessments.student_id AND p.id = auth.uid()
    )
);

CREATE POLICY "Teachers can update assessments of their students" ON assessments 
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM students s
        JOIN teachers t ON s.school_id = t.school_id
        JOIN profiles p ON t.user_id = p.id
        WHERE s.id = assessments.student_id AND p.id = auth.uid()
    )
);

CREATE POLICY "Admins can manage all assessments" ON assessments 
FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Performance records table policies
CREATE POLICY "Students can view their own performance" ON performance_records 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE id = performance_records.student_id AND user_id = auth.uid())
);

CREATE POLICY "Teachers can view performance of their students" ON performance_records 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM students s
        JOIN teachers t ON s.school_id = t.school_id
        JOIN profiles p ON t.user_id = p.id
        WHERE s.id = performance_records.student_id AND p.id = auth.uid()
    )
);

CREATE POLICY "Teachers can insert performance records" ON performance_records 
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM students s
        JOIN teachers t ON s.school_id = t.school_id
        JOIN profiles p ON t.user_id = p.id
        WHERE s.id = performance_records.student_id AND p.id = auth.uid()
    )
);

CREATE POLICY "Admins can manage all performance records" ON performance_records 
FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Career recommendations table policies
CREATE POLICY "Students can view their own recommendations" ON career_recommendations 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE id = career_recommendations.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can update their own recommendations" ON career_recommendations 
FOR UPDATE USING (
    EXISTS (SELECT 1 FROM students WHERE id = career_recommendations.student_id AND user_id = auth.uid())
);

CREATE POLICY "System can insert recommendations" ON career_recommendations 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Teachers can view recommendations of their students" ON career_recommendations 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM students s
        JOIN teachers t ON s.school_id = t.school_id
        JOIN profiles p ON t.user_id = p.id
        WHERE s.id = career_recommendations.student_id AND p.id = auth.uid()
    )
);

-- AI interactions table policies
CREATE POLICY "Students can view their own AI interactions" ON ai_interactions 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE id = ai_interactions.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can insert their own AI interactions" ON ai_interactions 
FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM students WHERE id = ai_interactions.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can update their own AI interactions" ON ai_interactions 
FOR UPDATE USING (
    EXISTS (SELECT 1 FROM students WHERE id = ai_interactions.student_id AND user_id = auth.uid())
);

-- Function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
