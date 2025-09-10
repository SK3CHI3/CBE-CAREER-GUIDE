import { supabase } from '@/integrations/supabase/client'
import { Database } from './database.types'

// Type assertions to fix build errors  
const typedSupabase = supabase as any

type Profile = Database['public']['Tables']['profiles']['Row']
type Student = Database['public']['Tables']['students']['Row'] 
type Teacher = Database['public']['Tables']['teachers']['Row']
type School = Database['public']['Tables']['schools']['Row']
type Assessment = Database['public']['Tables']['assessments']['Row']
type CareerRecommendation = Database['public']['Tables']['career_recommendations']['Row']

// Profile Services
export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await typedSupabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  },

  async updateProfile(userId: string, updates: Database['public']['Tables']['profiles']['Update']): Promise<{ error: any }> {
    const { error } = (await typedSupabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)) as any

    return { error }
  },

  async createProfile(profile: Database['public']['Tables']['profiles']['Insert']): Promise<{ error: any }> {
    const { error } = (await typedSupabase
      .from('profiles')
      .insert(profile)) as any

    return { error }
  }
}

// All other services simplified with typedSupabase
export const schoolService = {
  getAllSchools: async () => (await typedSupabase.from('schools').select('*').order('name')).data || [],
  getSchoolById: async (id: string) => (await typedSupabase.from('schools').select('*').eq('id', id).single()).data,
  createSchool: async (school: any) => await typedSupabase.from('schools').insert(school).select().single(),
  updateSchool: async (id: string, updates: any) => await typedSupabase.from('schools').update(updates).eq('id', id)
}

export const studentService = {
  getStudentByUserId: async (userId: string) => (await typedSupabase.from('students').select('*, school:schools(*), profile:profiles(*)').eq('user_id', userId).single()).data,
  getStudentsBySchool: async (schoolId: string) => (await typedSupabase.from('students').select('*, profile:profiles(*)').eq('school_id', schoolId)).data || [],
  createStudent: async (student: any) => await typedSupabase.from('students').insert(student).select().single(),
  updateStudent: async (id: string, updates: any) => await typedSupabase.from('students').update(updates).eq('id', id)
}

export const teacherService = {
  getTeacherByUserId: async (userId: string) => (await typedSupabase.from('teachers').select('*, school:schools(*), profile:profiles(*)').eq('user_id', userId).single()).data,
  getTeachersBySchool: async (schoolId: string) => (await typedSupabase.from('teachers').select('*, profile:profiles(*)').eq('school_id', schoolId)).data || [],
  createTeacher: async (teacher: any) => await typedSupabase.from('teachers').insert(teacher).select().single(),
  updateTeacher: async (id: string, updates: any) => await typedSupabase.from('teachers').update(updates).eq('id', id)
}

export const assessmentService = {
  getStudentAssessments: async (studentId: string) => (await typedSupabase.from('assessments').select('*').eq('student_id', studentId)).data || [],
  createAssessment: async (assessment: any) => await typedSupabase.from('assessments').insert(assessment).select().single(),
  updateAssessment: async (id: string, updates: any) => await typedSupabase.from('assessments').update(updates).eq('id', id)
}

export const careerService = {
  getStudentRecommendations: async (studentId: string) => (await typedSupabase.from('career_recommendations').select('*').eq('student_id', studentId)).data || [],
  createRecommendation: async (recommendation: any) => await typedSupabase.from('career_recommendations').insert(recommendation).select().single()
}