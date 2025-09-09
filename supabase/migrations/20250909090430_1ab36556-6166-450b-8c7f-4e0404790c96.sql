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