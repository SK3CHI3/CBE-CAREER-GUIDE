export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'student' | 'teacher' | 'admin'
export type AssessmentType = 'quick' | 'comprehensive' | 'subject_specific'
export type AssessmentStatus = 'pending' | 'in_progress' | 'completed' | 'reviewed'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: UserRole
          first_name: string
          last_name: string
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: UserRole
          first_name: string
          last_name: string
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: UserRole
          first_name?: string
          last_name?: string
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teachers: {
        Row: {
          id: string
          user_id: string
          school_id: string
          employee_number: string
          department: string
          subjects_taught: string[]
          qualification: string | null
          years_experience: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          school_id: string
          employee_number: string
          department: string
          subjects_taught?: string[]
          qualification?: string | null
          years_experience?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          school_id?: string
          employee_number?: string
          department?: string
          subjects_taught?: string[]
          qualification?: string | null
          years_experience?: number
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          user_id: string
          organization: string
          position: string
          permissions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization: string
          position: string
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization?: string
          position?: string
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          code: string
          description: string | null
          grade_levels: number[]
          is_core: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          description?: string | null
          grade_levels: number[]
          is_core?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          description?: string | null
          grade_levels?: number[]
          is_core?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          student_id: string
          type: AssessmentType
          title: string
          description: string | null
          questions: Json | null
          responses: Json | null
          score: number | null
          max_score: number
          status: AssessmentStatus
          completed_at: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          type: AssessmentType
          title: string
          description?: string | null
          questions?: Json | null
          responses?: Json | null
          score?: number | null
          max_score?: number
          status?: AssessmentStatus
          completed_at?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          type?: AssessmentType
          title?: string
          description?: string | null
          questions?: Json | null
          responses?: Json | null
          score?: number | null
          max_score?: number
          status?: AssessmentStatus
          completed_at?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      performance_records: {
        Row: {
          id: string
          student_id: string
          subject_id: string
          score: number
          max_score: number
          grade_level: number
          term: number
          year: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          subject_id: string
          score: number
          max_score?: number
          grade_level: number
          term: number
          year: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          subject_id?: string
          score?: number
          max_score?: number
          grade_level?: number
          term?: number
          year?: number
          created_at?: string
          updated_at?: string
        }
      }
      career_recommendations: {
        Row: {
          id: string
          student_id: string
          career_title: string
          match_percentage: number
          demand_level: string | null
          salary_range: string | null
          required_subjects: string[]
          recommended_courses: string[]
          skills_needed: string[]
          description: string | null
          ai_generated: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          career_title: string
          match_percentage: number
          demand_level?: string | null
          salary_range?: string | null
          required_subjects?: string[]
          recommended_courses?: string[]
          skills_needed?: string[]
          description?: string | null
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          career_title?: string
          match_percentage?: number
          demand_level?: string | null
          salary_range?: string | null
          required_subjects?: string[]
          recommended_courses?: string[]
          skills_needed?: string[]
          description?: string | null
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_interactions: {
        Row: {
          id: string
          student_id: string
          question: string
          response: string
          context: Json | null
          rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          question: string
          response: string
          context?: Json | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          question?: string
          response?: string
          context?: Json | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          location: string
          county: string
          type: 'primary' | 'secondary' | 'mixed'
          registration_number: string
          contact_email: string | null
          contact_phone: string | null
          principal_name: string | null
          total_students: number
          total_teachers: number
          performance_rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          county: string
          type: 'primary' | 'secondary' | 'mixed'
          registration_number: string
          contact_email?: string | null
          contact_phone?: string | null
          principal_name?: string | null
          total_students?: number
          total_teachers?: number
          performance_rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          county?: string
          type?: 'primary' | 'secondary' | 'mixed'
          registration_number?: string
          contact_email?: string | null
          contact_phone?: string | null
          principal_name?: string | null
          total_students?: number
          total_teachers?: number
          performance_rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          user_id: string
          school_id: string
          admission_number: string
          grade_level: number
          stream: string | null
          date_of_birth: string | null
          guardian_name: string | null
          guardian_phone: string | null
          guardian_email: string | null
          emergency_contact: string | null
          medical_conditions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          school_id: string
          admission_number: string
          grade_level: number
          stream?: string | null
          date_of_birth?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_email?: string | null
          emergency_contact?: string | null
          medical_conditions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          school_id?: string
          admission_number?: string
          grade_level?: number
          stream?: string | null
          date_of_birth?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_email?: string | null
          emergency_contact?: string | null
          medical_conditions?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      assessment_type: AssessmentType
      assessment_status: AssessmentStatus
    }
  }
}
