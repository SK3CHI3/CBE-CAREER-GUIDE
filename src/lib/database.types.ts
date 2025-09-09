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
