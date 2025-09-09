import { supabase } from './supabase'
import { Database } from './database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type Student = Database['public']['Tables']['students']['Row']
type Teacher = Database['public']['Tables']['teachers']['Row']
type School = Database['public']['Tables']['schools']['Row']

// Profile Services
export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
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

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<{ error: any }> {
    const { error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)

    return { error }
  },

  async createProfile(profile: Database['public']['Tables']['profiles']['Insert']): Promise<{ error: any }> {
    const { error } = await supabase
      .from('profiles')
      .insert(profile)

    return { error }
  }
}

// School Services
export const schoolService = {
  async getAllSchools(): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching schools:', error)
      return []
    }

    return data || []
  },

  async getSchoolById(schoolId: string): Promise<School | null> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', schoolId)
      .single()

    if (error) {
      console.error('Error fetching school:', error)
      return null
    }

    return data
  },

  async createSchool(school: Database['public']['Tables']['schools']['Insert']): Promise<{ data: School | null, error: any }> {
    const { data, error } = await supabase
      .from('schools')
      .insert(school)
      .select()
      .single()

    return { data, error }
  },

  async updateSchool(schoolId: string, updates: Partial<School>): Promise<{ error: any }> {
    const { error } = await supabase
      .from('schools')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', schoolId)

    return { error }
  }
}

// Student Services
export const studentService = {
  async getStudentByUserId(userId: string): Promise<Student | null> {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        school:schools(*),
        profile:profiles(*)
      `)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching student:', error)
      return null
    }

    return data
  },

  async getStudentsBySchool(schoolId: string): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profile:profiles(*)
      `)
      .eq('school_id', schoolId)
      .order('grade_level', { ascending: true })

    if (error) {
      console.error('Error fetching students:', error)
      return []
    }

    return data || []
  },

  async createStudent(student: Database['public']['Tables']['students']['Insert']): Promise<{ data: Student | null, error: any }> {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single()

    return { data, error }
  },

  async updateStudent(studentId: string, updates: Partial<Student>): Promise<{ error: any }> {
    const { error } = await supabase
      .from('students')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', studentId)

    return { error }
  }
}

// Teacher Services
export const teacherService = {
  async getTeacherByUserId(userId: string): Promise<Teacher | null> {
    const { data, error } = await supabase
      .from('teachers')
      .select(`
        *,
        school:schools(*),
        profile:profiles(*)
      `)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching teacher:', error)
      return null
    }

    return data
  },

  async getTeachersBySchool(schoolId: string): Promise<Teacher[]> {
    const { data, error } = await supabase
      .from('teachers')
      .select(`
        *,
        profile:profiles(*)
      `)
      .eq('school_id', schoolId)
      .order('department')

    if (error) {
      console.error('Error fetching teachers:', error)
      return []
    }

    return data || []
  },

  async createTeacher(teacher: Database['public']['Tables']['teachers']['Insert']): Promise<{ data: Teacher | null, error: any }> {
    const { data, error } = await supabase
      .from('teachers')
      .insert(teacher)
      .select()
      .single()

    return { data, error }
  },

  async updateTeacher(teacherId: string, updates: Partial<Teacher>): Promise<{ error: any }> {
    const { error } = await supabase
      .from('teachers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', teacherId)

    return { error }
  }
}

// Assessment Services
export const assessmentService = {
  async getStudentAssessments(studentId: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching assessments:', error)
      return []
    }

    return data || []
  },

  async createAssessment(assessment: Database['public']['Tables']['assessments']['Insert']) {
    const { data, error } = await supabase
      .from('assessments')
      .insert(assessment)
      .select()
      .single()

    return { data, error }
  },

  async updateAssessment(assessmentId: string, updates: any) {
    const { error } = await supabase
      .from('assessments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', assessmentId)

    return { error }
  }
}

// Career Recommendations Services
export const careerService = {
  async getStudentRecommendations(studentId: string) {
    const { data, error } = await supabase
      .from('career_recommendations')
      .select('*')
      .eq('student_id', studentId)
      .order('match_percentage', { ascending: false })

    if (error) {
      console.error('Error fetching career recommendations:', error)
      return []
    }

    return data || []
  },

  async createRecommendation(recommendation: Database['public']['Tables']['career_recommendations']['Insert']) {
    const { data, error } = await supabase
      .from('career_recommendations')
      .insert(recommendation)
      .select()
      .single()

    return { data, error }
  }
}
