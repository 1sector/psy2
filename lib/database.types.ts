export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          avatar_url: string | null
          role: "client" | "therapist" | "admin"
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name: string
          avatar_url?: string | null
          role: "client" | "therapist" | "admin"
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: "client" | "therapist" | "admin"
        }
      }
      therapist_clients: {
        Row: {
          id: string
          created_at: string
          therapist_id: string
          client_id: string
          status: "active" | "inactive" | "pending"
          diagnosis: string | null
          goals: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          therapist_id: string
          client_id: string
          status?: "active" | "inactive" | "pending"
          diagnosis?: string | null
          goals?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          therapist_id?: string
          client_id?: string
          status?: "active" | "inactive" | "pending"
          diagnosis?: string | null
          goals?: string[] | null
        }
      }
      sessions: {
        Row: {
          id: string
          created_at: string
          therapist_id: string
          client_id: string
          date: string
          time: string
          duration: number
          type: "online" | "in-person"
          status: "scheduled" | "completed" | "cancelled"
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          therapist_id: string
          client_id: string
          date: string
          time: string
          duration: number
          type: "online" | "in-person"
          status?: "scheduled" | "completed" | "cancelled"
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          therapist_id?: string
          client_id?: string
          date?: string
          time?: string
          duration?: number
          type?: "online" | "in-person"
          status?: "scheduled" | "completed" | "cancelled"
          notes?: string | null
        }
      }
      tests: {
        Row: {
          id: string
          created_at: string
          created_by: string
          title: string
          description: string
          questions: Json
        }
        Insert: {
          id?: string
          created_at?: string
          created_by: string
          title: string
          description: string
          questions: Json
        }
        Update: {
          id?: string
          created_at?: string
          created_by?: string
          title?: string
          description?: string
          questions?: Json
        }
      }
      assigned_tests: {
        Row: {
          id: string
          created_at: string
          test_id: string
          client_id: string
          therapist_id: string
          status: "pending" | "completed" | "expired"
          assigned_date: string
          completed_date: string | null
          results: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          test_id: string
          client_id: string
          therapist_id: string
          status?: "pending" | "completed" | "expired"
          assigned_date: string
          completed_date?: string | null
          results?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          test_id?: string
          client_id?: string
          therapist_id?: string
          status?: "pending" | "completed" | "expired"
          assigned_date?: string
          completed_date?: string | null
          results?: Json | null
        }
      }
      progress_records: {
        Row: {
          id: string
          created_at: string
          client_id: string
          therapist_id: string
          date: string
          anxiety_level: number
          sleep_quality: number
          mood_score: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          client_id: string
          therapist_id: string
          date: string
          anxiety_level: number
          sleep_quality: number
          mood_score: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          client_id?: string
          therapist_id?: string
          date?: string
          anxiety_level?: number
          sleep_quality?: number
          mood_score?: number
          notes?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          sender_id: string
          recipient_id: string
          content: string
          read: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          sender_id: string
          recipient_id: string
          content: string
          read?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          sender_id?: string
          recipient_id?: string
          content?: string
          read?: boolean
        }
      }
    }
  }
}

