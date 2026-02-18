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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      accompaniment_requests: {
        Row: {
          area: string
          created_at: string
          description: string
          id: string
          priority: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          area?: string
          created_at?: string
          description: string
          id?: string
          priority?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          area?: string
          created_at?: string
          description?: string
          id?: string
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_reactions: {
        Row: {
          created_at: string
          id: string
          post_id: string
          reaction: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          reaction?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          reaction?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          initiative_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          initiative_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          initiative_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      initiatives: {
        Row: {
          ai_solution: string | null
          cargo: string | null
          company: string
          country: string
          created_at: string
          created_by: string | null
          department: string
          description: string | null
          effort: Database["public"]["Enums"]["initiative_impact"] | null
          email: string | null
          hours_saved: number | null
          id: string
          impact: Database["public"]["Enums"]["initiative_impact"]
          link: string | null
          problem: string | null
          project: string
          responsible: string
          silo: Database["public"]["Enums"]["initiative_silo"]
          source: string
          status: Database["public"]["Enums"]["initiative_status"]
          strategic_objective: string
          supervisor: string | null
          technology: string
          updated_at: string
        }
        Insert: {
          ai_solution?: string | null
          cargo?: string | null
          company?: string
          country?: string
          created_at?: string
          created_by?: string | null
          department?: string
          description?: string | null
          effort?: Database["public"]["Enums"]["initiative_impact"] | null
          email?: string | null
          hours_saved?: number | null
          id?: string
          impact: Database["public"]["Enums"]["initiative_impact"]
          link?: string | null
          problem?: string | null
          project?: string
          responsible?: string
          silo: Database["public"]["Enums"]["initiative_silo"]
          source?: string
          status?: Database["public"]["Enums"]["initiative_status"]
          strategic_objective?: string
          supervisor?: string | null
          technology?: string
          updated_at?: string
        }
        Update: {
          ai_solution?: string | null
          cargo?: string | null
          company?: string
          country?: string
          created_at?: string
          created_by?: string | null
          department?: string
          description?: string | null
          effort?: Database["public"]["Enums"]["initiative_impact"] | null
          email?: string | null
          hours_saved?: number | null
          id?: string
          impact?: Database["public"]["Enums"]["initiative_impact"]
          link?: string | null
          problem?: string | null
          project?: string
          responsible?: string
          silo?: Database["public"]["Enums"]["initiative_silo"]
          source?: string
          status?: Database["public"]["Enums"]["initiative_status"]
          strategic_objective?: string
          supervisor?: string | null
          technology?: string
          updated_at?: string
        }
        Relationships: []
      }
      library_resources: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          link: string | null
          title: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          link?: string | null
          title: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          link?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          from_user_id: string | null
          from_user_name: string
          id: string
          initiative_id: string | null
          initiative_name: string
          message: string
          read: boolean
          type: string
          user_email: string
        }
        Insert: {
          created_at?: string
          from_user_id?: string | null
          from_user_name?: string
          id?: string
          initiative_id?: string | null
          initiative_name?: string
          message: string
          read?: boolean
          type?: string
          user_email: string
        }
        Update: {
          created_at?: string
          from_user_id?: string | null
          from_user_name?: string
          id?: string
          initiative_id?: string | null
          initiative_name?: string
          message?: string
          read?: boolean
          type?: string
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "administrador" | "colaborador"
      initiative_impact: "high" | "medium" | "low"
      initiative_silo:
        | "compras"
        | "control"
        | "logistica"
        | "ventas"
        | "mercadeo"
        | "personal"
        | "sistemas"
      initiative_status:
        | "en_revision"
        | "aprobado"
        | "en_progreso"
        | "completado"
        | "rechazado"
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
      app_role: ["administrador", "colaborador"],
      initiative_impact: ["high", "medium", "low"],
      initiative_silo: [
        "compras",
        "control",
        "logistica",
        "ventas",
        "mercadeo",
        "personal",
        "sistemas",
      ],
      initiative_status: [
        "en_revision",
        "aprobado",
        "en_progreso",
        "completado",
        "rechazado",
      ],
    },
  },
} as const
