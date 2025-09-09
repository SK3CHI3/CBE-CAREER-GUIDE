export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          id: string
          organization: string
          permissions: string[] | null
          position: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization: string
          permissions?: string[] | null
          position: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization?: string
          permissions?: string[] | null
          position?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_interactions: {
        Row: {
          context: Json | null
          created_at: string
          id: string
          question: string
          rating: number | null
          response: string
          student_id: string
          updated_at: string
        }
        Insert: {
          context?: Json | null
          created_at?: string
          id?: string
          question: string
          rating?: number | null
          response: string
          student_id: string
          updated_at?: string
        }
        Update: {
          context?: Json | null
          created_at?: string
          id?: string
          question?: string
          rating?: number | null
          response?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          max_score: number | null
          questions: Json | null
          responses: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          score: number | null
          status: Database["public"]["Enums"]["assessment_status"] | null
          student_id: string
          title: string
          type: Database["public"]["Enums"]["assessment_type"]
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          max_score?: number | null
          questions?: Json | null
          responses?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number | null
          status?: Database["public"]["Enums"]["assessment_status"] | null
          student_id: string
          title: string
          type: Database["public"]["Enums"]["assessment_type"]
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          max_score?: number | null
          questions?: Json | null
          responses?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number | null
          status?: Database["public"]["Enums"]["assessment_status"] | null
          student_id?: string
          title?: string
          type?: Database["public"]["Enums"]["assessment_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      career_recommendations: {
        Row: {
          ai_generated: boolean | null
          career_title: string
          created_at: string
          demand_level: string | null
          description: string | null
          id: string
          match_percentage: number
          recommended_courses: string[] | null
          required_subjects: string[] | null
          salary_range: string | null
          skills_needed: string[] | null
          student_id: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          career_title: string
          created_at?: string
          demand_level?: string | null
          description?: string | null
          id?: string
          match_percentage: number
          recommended_courses?: string[] | null
          required_subjects?: string[] | null
          salary_range?: string | null
          skills_needed?: string[] | null
          student_id: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          career_title?: string
          created_at?: string
          demand_level?: string | null
          description?: string | null
          id?: string
          match_percentage?: number
          recommended_courses?: string[] | null
          required_subjects?: string[] | null
          salary_range?: string | null
          skills_needed?: string[] | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_recommendations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_records: {
        Row: {
          created_at: string
          grade_level: number
          id: string
          max_score: number | null
          score: number
          student_id: string
          subject_id: string
          term: number
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          grade_level: number
          id?: string
          max_score?: number | null
          score: number
          student_id: string
          subject_id: string
          term: number
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          grade_level?: number
          id?: string
          max_score?: number | null
          score?: number
          student_id?: string
          subject_id?: string
          term?: number
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_records_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          county: string
          created_at: string
          id: string
          location: string
          name: string
          performance_rating: number | null
          principal_name: string | null
          registration_number: string
          total_students: number | null
          total_teachers: number | null
          type: string
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          county: string
          created_at?: string
          id?: string
          location: string
          name: string
          performance_rating?: number | null
          principal_name?: string | null
          registration_number: string
          total_students?: number | null
          total_teachers?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          county?: string
          created_at?: string
          id?: string
          location?: string
          name?: string
          performance_rating?: number | null
          principal_name?: string | null
          registration_number?: string
          total_students?: number | null
          total_teachers?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          admission_number: string
          created_at: string
          date_of_birth: string | null
          emergency_contact: string | null
          grade_level: number
          guardian_email: string | null
          guardian_name: string | null
          guardian_phone: string | null
          id: string
          medical_conditions: string | null
          school_id: string
          stream: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admission_number: string
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: string | null
          grade_level: number
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          medical_conditions?: string | null
          school_id: string
          stream?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admission_number?: string
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: string | null
          grade_level?: number
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          medical_conditions?: string | null
          school_id?: string
          stream?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          code: string
          created_at: string
          description: string | null
          grade_levels: number[]
          id: string
          is_core: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          grade_levels?: number[]
          id?: string
          is_core?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          grade_levels?: number[]
          id?: string
          is_core?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          created_at: string
          department: string
          employee_number: string
          id: string
          qualification: string | null
          school_id: string
          subjects_taught: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          department: string
          employee_number: string
          id?: string
          qualification?: string | null
          school_id: string
          subjects_taught?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          department?: string
          employee_number?: string
          id?: string
          qualification?: string | null
          school_id?: string
          subjects_taught?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      assessment_status: "pending" | "in_progress" | "completed" | "reviewed"
      assessment_type: "quick" | "comprehensive" | "subject_specific"
      user_role: "student" | "teacher" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_status: ["pending", "in_progress", "completed", "reviewed"],
      assessment_type: ["quick", "comprehensive", "subject_specific"],
      user_role: ["student", "teacher", "admin"],
    },
  },
} as const
