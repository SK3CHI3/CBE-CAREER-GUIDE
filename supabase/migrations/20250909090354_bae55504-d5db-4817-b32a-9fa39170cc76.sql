-- Fix security warnings by updating functions with proper search_path

-- Drop and recreate the handle_new_user function with security settings
DROP FUNCTION IF EXISTS public.handle_new_user();
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop and recreate the update function with security settings
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add missing RLS policies for tables that need them
-- Performance records policies
CREATE POLICY "Students can view their own performance" ON public.performance_records 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.students WHERE id = performance_records.student_id AND user_id = auth.uid())
);

CREATE POLICY "Service role can insert performance records" ON public.performance_records 
FOR INSERT WITH CHECK (true);

-- Admins policies
CREATE POLICY "Admins can view their own data" ON public.admins 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can update their own data" ON public.admins 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Service role can insert admins" ON public.admins 
FOR INSERT WITH CHECK (true);