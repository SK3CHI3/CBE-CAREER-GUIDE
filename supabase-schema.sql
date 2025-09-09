-- CBE Career Guide Database Schema
-- This file contains the complete database schema for the CBE Career Guide application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE assessment_type AS ENUM ('quick', 'comprehensive', 'subject_specific');
CREATE TYPE assessment_status AS ENUM ('pending', 'in_progress', 'completed', 'reviewed');
CREATE TYPE school_type AS ENUM ('primary', 'secondary', 'mixed');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schools table
CREATE TABLE schools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    county TEXT NOT NULL,
    type school_type NOT NULL,
    registration_number TEXT UNIQUE NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    principal_name TEXT,
    total_students INTEGER DEFAULT 0,
    total_teachers INTEGER DEFAULT 0,
    performance_rating DECIMAL(3,2) CHECK (performance_rating >= 0 AND performance_rating <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    admission_number TEXT NOT NULL,
    grade_level INTEGER NOT NULL CHECK (grade_level >= 1 AND grade_level <= 12),
    stream TEXT,
    date_of_birth DATE,
    guardian_name TEXT,
    guardian_phone TEXT,
    guardian_email TEXT,
    emergency_contact TEXT,
    medical_conditions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(school_id, admission_number)
);

-- Teachers table
CREATE TABLE teachers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    employee_number TEXT NOT NULL,
    subjects TEXT[] NOT NULL,
    grade_levels INTEGER[] NOT NULL,
    department TEXT,
    qualification TEXT,
    years_experience INTEGER DEFAULT 0,
    is_head_teacher BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(school_id, employee_number)
);

-- Admins table
CREATE TABLE admins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    organization TEXT NOT NULL,
    position TEXT,
    permissions TEXT[] DEFAULT ARRAY['read'],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects table
CREATE TABLE subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    grade_levels INTEGER[] NOT NULL,
    is_core BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessments table
CREATE TABLE assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type assessment_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    answers JSONB,
    score DECIMAL(5,2),
    max_score DECIMAL(5,2) NOT NULL,
    status assessment_status DEFAULT 'pending',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES profiles(id),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance records table
CREATE TABLE performance_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS (ROUND((score / max_score) * 100, 2)) STORED,
    grade_level INTEGER NOT NULL,
    term INTEGER CHECK (term >= 1 AND term <= 3),
    year INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Career recommendations table
CREATE TABLE career_recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    career_title TEXT NOT NULL,
    match_percentage DECIMAL(5,2) NOT NULL CHECK (match_percentage >= 0 AND match_percentage <= 100),
    demand_level TEXT CHECK (demand_level IN ('Low', 'Medium', 'High', 'Very High')),
    salary_range TEXT,
    required_subjects TEXT[],
    recommended_courses TEXT[],
    skills_needed TEXT[],
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI interactions table (for chat history)
CREATE TABLE ai_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    response TEXT NOT NULL,
    context JSONB,
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_assessments_student_id ON assessments(student_id);
CREATE INDEX idx_assessments_status ON assessments(status);
CREATE INDEX idx_performance_records_student_id ON performance_records(student_id);
CREATE INDEX idx_performance_records_subject_id ON performance_records(subject_id);
CREATE INDEX idx_career_recommendations_student_id ON career_recommendations(student_id);
CREATE INDEX idx_ai_interactions_student_id ON ai_interactions(student_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_recommendations_updated_at BEFORE UPDATE ON career_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
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

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for schools table
CREATE POLICY "Anyone can view schools" ON schools FOR SELECT USING (true);
CREATE POLICY "Admins can manage schools" ON schools FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for students table
CREATE POLICY "Students can view their own data" ON students FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Teachers can view students in their school" ON students FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM teachers t
        JOIN profiles p ON t.user_id = p.id
        WHERE p.id = auth.uid() AND t.school_id = students.school_id
    )
);
CREATE POLICY "Admins can view all students" ON students FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Students can update their own data" ON students FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for assessments table
CREATE POLICY "Students can view their own assessments" ON assessments FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE id = assessments.student_id AND user_id = auth.uid())
);
CREATE POLICY "Students can update their own assessments" ON assessments FOR UPDATE USING (
    EXISTS (SELECT 1 FROM students WHERE id = assessments.student_id AND user_id = auth.uid())
);

-- Function to handle user profile creation
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
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
