-- CBE Career Guide Database Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE assessment_type AS ENUM ('quick', 'comprehensive', 'subject_specific');
CREATE TYPE assessment_status AS ENUM ('pending', 'in_progress', 'completed', 'reviewed');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

-- Create schools table
CREATE TABLE public.schools (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    county TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('primary', 'secondary', 'mixed')),
    registration_number TEXT NOT NULL UNIQUE,
    contact_email TEXT,
    contact_phone TEXT,
    principal_name TEXT,
    total_students INTEGER DEFAULT 0,
    total_teachers INTEGER DEFAULT 0,
    performance_rating DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

-- Create students table
CREATE TABLE public.students (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES public.schools(id),
    admission_number TEXT NOT NULL,
    grade_level INTEGER NOT NULL CHECK (grade_level >= 1 AND grade_level <= 12),
    stream TEXT,
    date_of_birth DATE,
    guardian_name TEXT,
    guardian_phone TEXT,
    guardian_email TEXT,
    emergency_contact TEXT,
    medical_conditions TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(user_id),
    UNIQUE(school_id, admission_number)
);

-- Create teachers table
CREATE TABLE public.teachers (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES public.schools(id),
    employee_number TEXT NOT NULL,
    department TEXT NOT NULL,
    subjects_taught TEXT[] DEFAULT '{}',
    qualification TEXT,
    years_experience INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(user_id),
    UNIQUE(school_id, employee_number)
);

-- Create admins table
CREATE TABLE public.admins (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization TEXT NOT NULL,
    position TEXT NOT NULL,
    permissions TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(user_id)
);

-- Create subjects table
CREATE TABLE public.subjects (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    grade_levels INTEGER[] NOT NULL DEFAULT '{}',
    is_core BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

-- Create assessments table
CREATE TABLE public.assessments (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    type assessment_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB,
    responses JSONB,
    score DECIMAL(5,2),
    max_score DECIMAL(5,2) DEFAULT 100.0,
    status assessment_status DEFAULT 'pending',
    completed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.teachers(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

-- Create performance_records table
CREATE TABLE public.performance_records (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id),
    score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) DEFAULT 100.0,
    grade_level INTEGER NOT NULL,
    term INTEGER NOT NULL CHECK (term >= 1 AND term <= 3),
    year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

-- Create career_recommendations table
CREATE TABLE public.career_recommendations (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    career_title TEXT NOT NULL,
    match_percentage DECIMAL(5,2) NOT NULL,
    demand_level TEXT,
    salary_range TEXT,
    required_subjects TEXT[] DEFAULT '{}',
    recommended_courses TEXT[] DEFAULT '{}',
    skills_needed TEXT[] DEFAULT '{}',
    description TEXT,
    ai_generated BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

-- Create ai_interactions table
CREATE TABLE public.ai_interactions (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    response TEXT NOT NULL,
    context JSONB,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_interactions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles 
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles 
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can insert profiles" ON public.profiles 
FOR INSERT WITH CHECK (true);

-- Schools policies (public read access)
CREATE POLICY "Anyone can view schools" ON public.schools 
FOR SELECT USING (true);

-- Students policies
CREATE POLICY "Students can view their own data" ON public.students 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students can update their own data" ON public.students 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Service role can insert students" ON public.students 
FOR INSERT WITH CHECK (true);

-- Teachers policies
CREATE POLICY "Teachers can view their own data" ON public.teachers 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Service role can insert teachers" ON public.teachers 
FOR INSERT WITH CHECK (true);

-- Subjects policies (public read access)
CREATE POLICY "Anyone can view subjects" ON public.subjects 
FOR SELECT USING (true);

-- Assessments policies
CREATE POLICY "Students can view their own assessments" ON public.assessments 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.students WHERE id = assessments.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can insert their own assessments" ON public.assessments 
FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.students WHERE id = assessments.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can update their own assessments" ON public.assessments 
FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.students WHERE id = assessments.student_id AND user_id = auth.uid())
);

-- Career recommendations policies
CREATE POLICY "Students can view their own recommendations" ON public.career_recommendations 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.students WHERE id = career_recommendations.student_id AND user_id = auth.uid())
);

CREATE POLICY "Service role can insert recommendations" ON public.career_recommendations 
FOR INSERT WITH CHECK (true);

-- AI interactions policies
CREATE POLICY "Students can view their own AI interactions" ON public.ai_interactions 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.students WHERE id = ai_interactions.student_id AND user_id = auth.uid())
);

CREATE POLICY "Students can insert their own AI interactions" ON public.ai_interactions 
FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.students WHERE id = ai_interactions.student_id AND user_id = auth.uid())
);

-- Create function to handle new user profile creation
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

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON public.subjects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_performance_records_updated_at BEFORE UPDATE ON public.performance_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_career_recommendations_updated_at BEFORE UPDATE ON public.career_recommendations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ai_interactions_updated_at BEFORE UPDATE ON public.ai_interactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();