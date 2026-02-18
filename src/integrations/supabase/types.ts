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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      addp_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      addp_posicion_usuarios: {
        Row: {
          chat_id: string
          estado: string | null
          nombre: string | null
          vendedor: string
        }
        Insert: {
          chat_id: string
          estado?: string | null
          nombre?: string | null
          vendedor: string
        }
        Update: {
          chat_id?: string
          estado?: string | null
          nombre?: string | null
          vendedor?: string
        }
        Relationships: []
      }
      agent_analysts: {
        Row: {
          analyst_name: string
          analyst_photo_url: string | null
          assigned_agents: string[]
          contact_info: Json | null
          created_at: string
          id: string
          is_active: boolean
          position: string | null
          updated_at: string
        }
        Insert: {
          analyst_name: string
          analyst_photo_url?: string | null
          assigned_agents: string[]
          contact_info?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          position?: string | null
          updated_at?: string
        }
        Update: {
          analyst_name?: string
          analyst_photo_url?: string | null
          assigned_agents?: string[]
          contact_info?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          position?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      aida_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      aida_json_histories: {
        Row: {
          correo: string
          created_at: string
          id: number
          json: Json | null
        }
        Insert: {
          correo: string
          created_at?: string
          id?: number
          json?: Json | null
        }
        Update: {
          correo?: string
          created_at?: string
          id?: number
          json?: Json | null
        }
        Relationships: []
      }
      api_configurations: {
        Row: {
          config_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          url: string
        }
        Insert: {
          config_type: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          url: string
        }
        Update: {
          config_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      aranceles_importacion: {
        Row: {
          arancel_base: string | null
          categoria_degravacion: string | null
          codigo_arancelario: string | null
          descripcion: string | null
        }
        Insert: {
          arancel_base?: string | null
          categoria_degravacion?: string | null
          codigo_arancelario?: string | null
          descripcion?: string | null
        }
        Update: {
          arancel_base?: string | null
          categoria_degravacion?: string | null
          codigo_arancelario?: string | null
          descripcion?: string | null
        }
        Relationships: []
      }
      articulos_beval_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      articulos_febeca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      articulos_push_money: {
        Row: {
          cantidad: number | null
          cedula_juridica: string
          codigo_art_cliente: string | null
          codigo_art_cofersa: string | null
          created_at: string | null
          desc_art_cliente: string | null
          desc_art_cofersa: string | null
          id: string
          ingreso_manual: boolean | null
          monto_push_money_art: number | null
          nro_factura: string
        }
        Insert: {
          cantidad?: number | null
          cedula_juridica: string
          codigo_art_cliente?: string | null
          codigo_art_cofersa?: string | null
          created_at?: string | null
          desc_art_cliente?: string | null
          desc_art_cofersa?: string | null
          id?: string
          ingreso_manual?: boolean | null
          monto_push_money_art?: number | null
          nro_factura: string
        }
        Update: {
          cantidad?: number | null
          cedula_juridica?: string
          codigo_art_cliente?: string | null
          codigo_art_cofersa?: string | null
          created_at?: string | null
          desc_art_cliente?: string | null
          desc_art_cofersa?: string | null
          id?: string
          ingreso_manual?: boolean | null
          monto_push_money_art?: number | null
          nro_factura?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_factura"
            columns: ["nro_factura", "cedula_juridica"]
            isOneToOne: false
            referencedRelation: "facturas_push_money"
            referencedColumns: ["nro_factura", "cedula_juridica"]
          },
        ]
      }
      articulos_sillaca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      asistente_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          record_id: string
          table_name: string
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id: string
          table_name: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string
          table_name?: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      brand_managers: {
        Row: {
          brands: string[]
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          manager_name: string
          phone: string | null
          photo_url: string | null
          position: string | null
          updated_at: string
        }
        Insert: {
          brands: string[]
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          manager_name: string
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          updated_at?: string
        }
        Update: {
          brands?: string[]
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          manager_name?: string
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          target_audience: string | null
          tone_of_voice: string | null
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          target_audience?: string | null
          tone_of_voice?: string | null
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          target_audience?: string | null
          tone_of_voice?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      calculated_prices: {
        Row: {
          calculated_at: string
          calculated_price: number
          factors_applied: Json | null
          id: string
          price_list_id: string
          product_id: string
        }
        Insert: {
          calculated_at?: string
          calculated_price: number
          factors_applied?: Json | null
          id?: string
          price_list_id: string
          product_id: string
        }
        Update: {
          calculated_at?: string
          calculated_price?: number
          factors_applied?: Json | null
          id?: string
          price_list_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculated_prices_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calculated_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          brand_id: string
          business_goals: string | null
          content_ideas: string | null
          created_at: string
          description: string | null
          id: string
          status: string
          target_audience: string | null
          title: string
          updated_at: string
          webhook_response: Json | null
        }
        Insert: {
          brand_id: string
          business_goals?: string | null
          content_ideas?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          target_audience?: string | null
          title: string
          updated_at?: string
          webhook_response?: Json | null
        }
        Update: {
          brand_id?: string
          business_goals?: string | null
          content_ideas?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          target_audience?: string | null
          title?: string
          updated_at?: string
          webhook_response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string
          cv_file_id: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          photo_url: string | null
          process_id: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cv_file_id: string
          email?: string | null
          full_name: string
          id?: string
          phone?: string | null
          photo_url?: string | null
          process_id: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cv_file_id?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          photo_url?: string | null
          process_id?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_cv_file_id_fkey"
            columns: ["cv_file_id"]
            isOneToOne: false
            referencedRelation: "cv_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "recruitment_processes"
            referencedColumns: ["id"]
          },
        ]
      }
      change_requests: {
        Row: {
          approver_id: string | null
          change_type: string
          created_at: string
          description: string
          id: string
          implementation_date: string | null
          priority: string
          reason: string | null
          requester_id: string
          status: string
          system_id: string
          title: string
          updated_at: string
        }
        Insert: {
          approver_id?: string | null
          change_type: string
          created_at?: string
          description: string
          id?: string
          implementation_date?: string | null
          priority?: string
          reason?: string | null
          requester_id: string
          status?: string
          system_id: string
          title: string
          updated_at?: string
        }
        Update: {
          approver_id?: string | null
          change_type?: string
          created_at?: string
          description?: string
          id?: string
          implementation_date?: string | null
          priority?: string
          reason?: string | null
          requester_id?: string
          status?: string
          system_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_requests_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "systems"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversacional: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      chat_memories: {
        Row: {
          created_at: string
          id: number
          memory: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          memory?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          memory?: string | null
          user?: string | null
        }
        Relationships: []
      }
      cliente: {
        Row: {
          Activo: string | null
          AgrupacionCliente: string | null
          CategoriaCliente: string | null
          CategoriaComercial: string | null
          Ciudad: string | null
          CodCliente: string | null
          CodCobrador: string | null
          CodVendedor: string | null
          ContribuyenteTipo: string | null
          CorreoElectronico: string | null
          Descuento: string | null
          DimensionCliente: string | null
          DivGeo1: string | null
          DivGeo2: string | null
          DivGeo3: string | null
          DivGeo4: string | null
          Estado: string | null
          FechaCreacion: string | null
          LimiteCredito: string | null
          Municipio: string | null
          NivelPrecioCliente: string | null
          NombreComercial: string | null
          NombreRegion: string | null
          NombreSupervisor: string | null
          NombreVendedor: string | null
          Pais: string | null
          RazonSocial: string | null
          Region: string | null
          RolVendedor: string | null
          Ruta: number | null
          SegmentoCliente: string | null
          SegmentoNaturaleza: string | null
          StatusVendedor: string | null
          Supervisor: string | null
          Zona: string | null
        }
        Insert: {
          Activo?: string | null
          AgrupacionCliente?: string | null
          CategoriaCliente?: string | null
          CategoriaComercial?: string | null
          Ciudad?: string | null
          CodCliente?: string | null
          CodCobrador?: string | null
          CodVendedor?: string | null
          ContribuyenteTipo?: string | null
          CorreoElectronico?: string | null
          Descuento?: string | null
          DimensionCliente?: string | null
          DivGeo1?: string | null
          DivGeo2?: string | null
          DivGeo3?: string | null
          DivGeo4?: string | null
          Estado?: string | null
          FechaCreacion?: string | null
          LimiteCredito?: string | null
          Municipio?: string | null
          NivelPrecioCliente?: string | null
          NombreComercial?: string | null
          NombreRegion?: string | null
          NombreSupervisor?: string | null
          NombreVendedor?: string | null
          Pais?: string | null
          RazonSocial?: string | null
          Region?: string | null
          RolVendedor?: string | null
          Ruta?: number | null
          SegmentoCliente?: string | null
          SegmentoNaturaleza?: string | null
          StatusVendedor?: string | null
          Supervisor?: string | null
          Zona?: string | null
        }
        Update: {
          Activo?: string | null
          AgrupacionCliente?: string | null
          CategoriaCliente?: string | null
          CategoriaComercial?: string | null
          Ciudad?: string | null
          CodCliente?: string | null
          CodCobrador?: string | null
          CodVendedor?: string | null
          ContribuyenteTipo?: string | null
          CorreoElectronico?: string | null
          Descuento?: string | null
          DimensionCliente?: string | null
          DivGeo1?: string | null
          DivGeo2?: string | null
          DivGeo3?: string | null
          DivGeo4?: string | null
          Estado?: string | null
          FechaCreacion?: string | null
          LimiteCredito?: string | null
          Municipio?: string | null
          NivelPrecioCliente?: string | null
          NombreComercial?: string | null
          NombreRegion?: string | null
          NombreSupervisor?: string | null
          NombreVendedor?: string | null
          Pais?: string | null
          RazonSocial?: string | null
          Region?: string | null
          RolVendedor?: string | null
          Ruta?: number | null
          SegmentoCliente?: string | null
          SegmentoNaturaleza?: string | null
          StatusVendedor?: string | null
          Supervisor?: string | null
          Zona?: string | null
        }
        Relationships: []
      }
      clientes_beval_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      clientes_cofersa_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      clientes_febeca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      clientes_sillaca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      code_reviews: {
        Row: {
          change_request_id: string
          comments: string | null
          created_at: string
          id: string
          reviewed_at: string | null
          reviewer_id: string
          status: string
        }
        Insert: {
          change_request_id: string
          comments?: string | null
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewer_id: string
          status: string
        }
        Update: {
          change_request_id?: string
          comments?: string | null
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "code_reviews_change_request_id_fkey"
            columns: ["change_request_id"]
            isOneToOne: false
            referencedRelation: "change_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      cofersa_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      commercial_documents: {
        Row: {
          category_id: string
          created_at: string
          created_by: string | null
          description: string | null
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          is_active: boolean
          thumbnail_path: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          is_active?: boolean
          thumbnail_path?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          is_active?: boolean
          thumbnail_path?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commercial_documents_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "document_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          code: string
          country_id: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          country_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          country_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      config_links: {
        Row: {
          created_at: string | null
          glosario_url: string | null
          id: string
          sim_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          glosario_url?: string | null
          id?: string
          sim_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          glosario_url?: string | null
          id?: string
          sim_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cotizador_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      cultura_cards: {
        Row: {
          company: string
          created_at: string | null
          description: string | null
          icon_color: string
          icon_name: string
          id: string
          is_favorite: boolean | null
          last_accessed: string | null
          title: string
          updated_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string | null
          description?: string | null
          icon_color: string
          icon_name: string
          id?: string
          is_favorite?: boolean | null
          last_accessed?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string | null
          icon_color?: string
          icon_name?: string
          id?: string
          is_favorite?: boolean | null
          last_accessed?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      culture_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      culture_embeddings2: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      customer_service_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      cv_files: {
        Row: {
          file_name: string
          file_path: string
          file_size: number
          id: string
          process_id: string
          uploaded_at: string
        }
        Insert: {
          file_name: string
          file_path: string
          file_size: number
          id?: string
          process_id: string
          uploaded_at?: string
        }
        Update: {
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          process_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_files_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "recruitment_processes"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_cards: {
        Row: {
          created_at: string | null
          department: string
          description: string | null
          icon_name: string
          id: string
          is_favorite: boolean | null
          last_accessed: string | null
          level: string
          title: string
          updated_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department: string
          description?: string | null
          icon_name: string
          id?: string
          is_favorite?: boolean | null
          last_accessed?: string | null
          level: string
          title: string
          updated_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string
          description?: string | null
          icon_name?: string
          id?: string
          is_favorite?: boolean | null
          last_accessed?: string | null
          level?: string
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      delivery_routes: {
        Row: {
          areas_covered: string[] | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          responsible_person: string | null
          route_code: string | null
          route_name: string
          schedule_info: string | null
          updated_at: string
        }
        Insert: {
          areas_covered?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          responsible_person?: string | null
          route_code?: string | null
          route_name: string
          schedule_info?: string | null
          updated_at?: string
        }
        Update: {
          areas_covered?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          responsible_person?: string | null
          route_code?: string | null
          route_name?: string
          schedule_info?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          company_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      dependencias_etiquetas_glosario: {
        Row: {
          created_at: string
          etiqueta_principal_id: string
          etiqueta_secundaria_id: string
          id: string
        }
        Insert: {
          created_at?: string
          etiqueta_principal_id: string
          etiqueta_secundaria_id: string
          id?: string
        }
        Update: {
          created_at?: string
          etiqueta_principal_id?: string
          etiqueta_secundaria_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dependencias_etiquetas_glosario_etiqueta_principal_id_fkey"
            columns: ["etiqueta_principal_id"]
            isOneToOne: false
            referencedRelation: "etiquetas_principales_glosario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dependencias_etiquetas_glosario_etiqueta_secundaria_id_fkey"
            columns: ["etiqueta_secundaria_id"]
            isOneToOne: false
            referencedRelation: "etiquetas_secundarias_glosario"
            referencedColumns: ["id"]
          },
        ]
      }
      division_geografica1: {
        Row: {
          division_geografica1: string
          nombre: string | null
        }
        Insert: {
          division_geografica1: string
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string
          nombre?: string | null
        }
        Relationships: []
      }
      division_geografica2: {
        Row: {
          division_geografica1: string | null
          division_geografica2: string | null
          nombre: string | null
        }
        Insert: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          nombre?: string | null
        }
        Relationships: []
      }
      division_geografica3: {
        Row: {
          division_geografica1: string | null
          division_geografica2: string | null
          division_geografica3: string | null
          nombre: string | null
        }
        Insert: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          nombre?: string | null
        }
        Relationships: []
      }
      division_geografica4: {
        Row: {
          division_geografica1: string | null
          division_geografica2: string | null
          division_geografica3: string | null
          division_geografica4: string | null
          nombre: string | null
        }
        Insert: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          division_geografica4?: string | null
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          division_geografica4?: string | null
          nombre?: string | null
        }
        Relationships: []
      }
      document_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      documentos_aida: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_logistica: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_mayoreo: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_olo: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_personal: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      education: {
        Row: {
          candidate_id: string
          created_at: string
          degree: string
          end_date: string | null
          field_of_study: string | null
          id: string
          institution: string
          is_current: boolean | null
          start_date: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          degree: string
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution: string
          is_current?: boolean | null
          start_date?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          degree?: string
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string
          is_current?: boolean | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      EMPLEADO_QA: {
        Row: {
          ACTIVO: string
          ASEGURADO: string | null
          BENEFICIO_COLECTIVO: string | null
          BONO_DECRETO: number
          CENTRO_COSTO: string
          CLASE_SEGURO: string | null
          CreateDate: string | null
          CreatedBy: string | null
          CTA_ELECTRONICA: string | null
          CUENTA_ENTIDAD: string | null
          DEPARTAMENTO: string
          DEPENDIENTES: number | null
          DETALLE_DIR_HAB: number | null
          DETALLE_DIR_POSTAL: number | null
          DIAS_DISP_INCAP: number | null
          DIRECCION_HAB: string | null
          DIRECCION_POSTAL: string | null
          DIVISION_GEOGRAFICA1: string | null
          DIVISION_GEOGRAFICA2: string | null
          E_MAIL: string | null
          EMPLEADO: string
          ENTIDAD_FINANCIERA: string | null
          ESTADO_CIVIL: string
          ESTADO_EMPLEADO: string
          FCH_HORA_ULT_MOD: string | null
          FECHA_ANTIG_EMP: string | null
          FECHA_ANTIG_GOB: string | null
          FECHA_HORA_CREACION: string | null
          FECHA_INGRESO: string
          FECHA_NACIMIENTO: string
          FECHA_NO_PAGO: string
          FECHA_PROX_EVAL: string | null
          FECHA_SALIDA: string | null
          FORMA_PAGO: string
          FORMA_PAGO_NE: string | null
          FOTOGRAFIA: string | null
          HORARIO: string
          IDENTIFICACION: string | null
          MEDIO_PAGO_NE: string | null
          NIT: string | null
          NOMBRE: string | null
          NOMBRE_PILA: string | null
          NOMINA: string
          NOTAS_TEL1: string | null
          NOTAS_TEL2: string | null
          NOTAS_TEL3: string | null
          NoteExistsFlag: number | null
          PAIS: string
          PAIS_DIREC: string | null
          PASAPORTE: string | null
          PERMISO_CONDUCIR: string | null
          PERMISO_SALUD: string | null
          PLAZA: string
          PRIMER_APELLIDO: string | null
          PUESTO: string
          RecordDate: string | null
          RowPointer: string | null
          RUBRO1: string | null
          RUBRO10: string | null
          RUBRO11: string | null
          RUBRO12: string | null
          RUBRO13: string | null
          RUBRO14: string | null
          RUBRO15: string | null
          RUBRO16: string | null
          RUBRO17: string | null
          RUBRO18: string | null
          RUBRO19: string | null
          RUBRO2: string | null
          RUBRO20: string | null
          RUBRO21: string | null
          RUBRO22: string | null
          RUBRO23: string | null
          RUBRO24: string | null
          RUBRO25: string | null
          RUBRO3: string | null
          RUBRO4: string | null
          RUBRO5: string | null
          RUBRO6: string | null
          RUBRO7: string | null
          RUBRO8: string | null
          RUBRO9: string | null
          SALARIO_DIARIO_INT: number | null
          SALARIO_REFERENCIA: number
          SALARIOPD_DOLAR: number | null
          SALARIOPD_LOCAL: number | null
          SALARIOPD_NOMINA: number | null
          SEGUNDO_APELLIDO: string | null
          SEXO: string
          SUBTIPO_TRABAJADOR_NE: string | null
          TELEFONO1: string | null
          TELEFONO2: string | null
          TELEFONO3: string | null
          TIPO_CUENTA_ENTIDAD: string | null
          TIPO_MEDIDAS_CERTIFICADAS: number | null
          TIPO_NIVEL_EDUCATIVO: number | null
          TIPO_SALARIO: string | null
          TIPO_SALARIO_AUMEN: string
          TIPO_SANGRE: string | null
          TIPO_TRABAJADOR_NE: string | null
          U_COD_SUCURSAL: string | null
          U_COMPANIA: string
          U_ERROR: string | null
          U_ESTADO_WEB: string | null
          U_FUERA_ESCALA: string
          U_NIVEL_ORGANIZACIONAL: string | null
          U_PASO_SALARIAL: string | null
          U_PS_BIOGRAFIA: string | null
          U_PS_DESARROLLO: number | null
          U_PS_ESTADO_WEB: string | null
          U_PS_MOVILIDAD: number | null
          U_PS_PASO1: string | null
          U_PS_PASO2: string | null
          U_PS_PASO3: string | null
          U_PS_RAMO: string | null
          U_PS_SILO: string | null
          U_TDEP: string | null
          U_TIPO_ESCALA: string | null
          U_TIPO_PLANILLA: string | null
          UBICACION: string
          UpdatedBy: string | null
          USUARIO_CREACION: string | null
          USUARIO_ULT_MOD: string | null
          VACS_ADICIONALES: number
          VACS_PENDIENTES: number
          VACS_ULT_CALCULO: string
        }
        Insert: {
          ACTIVO: string
          ASEGURADO?: string | null
          BENEFICIO_COLECTIVO?: string | null
          BONO_DECRETO: number
          CENTRO_COSTO: string
          CLASE_SEGURO?: string | null
          CreateDate?: string | null
          CreatedBy?: string | null
          CTA_ELECTRONICA?: string | null
          CUENTA_ENTIDAD?: string | null
          DEPARTAMENTO: string
          DEPENDIENTES?: number | null
          DETALLE_DIR_HAB?: number | null
          DETALLE_DIR_POSTAL?: number | null
          DIAS_DISP_INCAP?: number | null
          DIRECCION_HAB?: string | null
          DIRECCION_POSTAL?: string | null
          DIVISION_GEOGRAFICA1?: string | null
          DIVISION_GEOGRAFICA2?: string | null
          E_MAIL?: string | null
          EMPLEADO: string
          ENTIDAD_FINANCIERA?: string | null
          ESTADO_CIVIL: string
          ESTADO_EMPLEADO: string
          FCH_HORA_ULT_MOD?: string | null
          FECHA_ANTIG_EMP?: string | null
          FECHA_ANTIG_GOB?: string | null
          FECHA_HORA_CREACION?: string | null
          FECHA_INGRESO: string
          FECHA_NACIMIENTO: string
          FECHA_NO_PAGO: string
          FECHA_PROX_EVAL?: string | null
          FECHA_SALIDA?: string | null
          FORMA_PAGO: string
          FORMA_PAGO_NE?: string | null
          FOTOGRAFIA?: string | null
          HORARIO: string
          IDENTIFICACION?: string | null
          MEDIO_PAGO_NE?: string | null
          NIT?: string | null
          NOMBRE?: string | null
          NOMBRE_PILA?: string | null
          NOMINA: string
          NOTAS_TEL1?: string | null
          NOTAS_TEL2?: string | null
          NOTAS_TEL3?: string | null
          NoteExistsFlag?: number | null
          PAIS: string
          PAIS_DIREC?: string | null
          PASAPORTE?: string | null
          PERMISO_CONDUCIR?: string | null
          PERMISO_SALUD?: string | null
          PLAZA: string
          PRIMER_APELLIDO?: string | null
          PUESTO: string
          RecordDate?: string | null
          RowPointer?: string | null
          RUBRO1?: string | null
          RUBRO10?: string | null
          RUBRO11?: string | null
          RUBRO12?: string | null
          RUBRO13?: string | null
          RUBRO14?: string | null
          RUBRO15?: string | null
          RUBRO16?: string | null
          RUBRO17?: string | null
          RUBRO18?: string | null
          RUBRO19?: string | null
          RUBRO2?: string | null
          RUBRO20?: string | null
          RUBRO21?: string | null
          RUBRO22?: string | null
          RUBRO23?: string | null
          RUBRO24?: string | null
          RUBRO25?: string | null
          RUBRO3?: string | null
          RUBRO4?: string | null
          RUBRO5?: string | null
          RUBRO6?: string | null
          RUBRO7?: string | null
          RUBRO8?: string | null
          RUBRO9?: string | null
          SALARIO_DIARIO_INT?: number | null
          SALARIO_REFERENCIA: number
          SALARIOPD_DOLAR?: number | null
          SALARIOPD_LOCAL?: number | null
          SALARIOPD_NOMINA?: number | null
          SEGUNDO_APELLIDO?: string | null
          SEXO: string
          SUBTIPO_TRABAJADOR_NE?: string | null
          TELEFONO1?: string | null
          TELEFONO2?: string | null
          TELEFONO3?: string | null
          TIPO_CUENTA_ENTIDAD?: string | null
          TIPO_MEDIDAS_CERTIFICADAS?: number | null
          TIPO_NIVEL_EDUCATIVO?: number | null
          TIPO_SALARIO?: string | null
          TIPO_SALARIO_AUMEN: string
          TIPO_SANGRE?: string | null
          TIPO_TRABAJADOR_NE?: string | null
          U_COD_SUCURSAL?: string | null
          U_COMPANIA: string
          U_ERROR?: string | null
          U_ESTADO_WEB?: string | null
          U_FUERA_ESCALA: string
          U_NIVEL_ORGANIZACIONAL?: string | null
          U_PASO_SALARIAL?: string | null
          U_PS_BIOGRAFIA?: string | null
          U_PS_DESARROLLO?: number | null
          U_PS_ESTADO_WEB?: string | null
          U_PS_MOVILIDAD?: number | null
          U_PS_PASO1?: string | null
          U_PS_PASO2?: string | null
          U_PS_PASO3?: string | null
          U_PS_RAMO?: string | null
          U_PS_SILO?: string | null
          U_TDEP?: string | null
          U_TIPO_ESCALA?: string | null
          U_TIPO_PLANILLA?: string | null
          UBICACION: string
          UpdatedBy?: string | null
          USUARIO_CREACION?: string | null
          USUARIO_ULT_MOD?: string | null
          VACS_ADICIONALES: number
          VACS_PENDIENTES: number
          VACS_ULT_CALCULO: string
        }
        Update: {
          ACTIVO?: string
          ASEGURADO?: string | null
          BENEFICIO_COLECTIVO?: string | null
          BONO_DECRETO?: number
          CENTRO_COSTO?: string
          CLASE_SEGURO?: string | null
          CreateDate?: string | null
          CreatedBy?: string | null
          CTA_ELECTRONICA?: string | null
          CUENTA_ENTIDAD?: string | null
          DEPARTAMENTO?: string
          DEPENDIENTES?: number | null
          DETALLE_DIR_HAB?: number | null
          DETALLE_DIR_POSTAL?: number | null
          DIAS_DISP_INCAP?: number | null
          DIRECCION_HAB?: string | null
          DIRECCION_POSTAL?: string | null
          DIVISION_GEOGRAFICA1?: string | null
          DIVISION_GEOGRAFICA2?: string | null
          E_MAIL?: string | null
          EMPLEADO?: string
          ENTIDAD_FINANCIERA?: string | null
          ESTADO_CIVIL?: string
          ESTADO_EMPLEADO?: string
          FCH_HORA_ULT_MOD?: string | null
          FECHA_ANTIG_EMP?: string | null
          FECHA_ANTIG_GOB?: string | null
          FECHA_HORA_CREACION?: string | null
          FECHA_INGRESO?: string
          FECHA_NACIMIENTO?: string
          FECHA_NO_PAGO?: string
          FECHA_PROX_EVAL?: string | null
          FECHA_SALIDA?: string | null
          FORMA_PAGO?: string
          FORMA_PAGO_NE?: string | null
          FOTOGRAFIA?: string | null
          HORARIO?: string
          IDENTIFICACION?: string | null
          MEDIO_PAGO_NE?: string | null
          NIT?: string | null
          NOMBRE?: string | null
          NOMBRE_PILA?: string | null
          NOMINA?: string
          NOTAS_TEL1?: string | null
          NOTAS_TEL2?: string | null
          NOTAS_TEL3?: string | null
          NoteExistsFlag?: number | null
          PAIS?: string
          PAIS_DIREC?: string | null
          PASAPORTE?: string | null
          PERMISO_CONDUCIR?: string | null
          PERMISO_SALUD?: string | null
          PLAZA?: string
          PRIMER_APELLIDO?: string | null
          PUESTO?: string
          RecordDate?: string | null
          RowPointer?: string | null
          RUBRO1?: string | null
          RUBRO10?: string | null
          RUBRO11?: string | null
          RUBRO12?: string | null
          RUBRO13?: string | null
          RUBRO14?: string | null
          RUBRO15?: string | null
          RUBRO16?: string | null
          RUBRO17?: string | null
          RUBRO18?: string | null
          RUBRO19?: string | null
          RUBRO2?: string | null
          RUBRO20?: string | null
          RUBRO21?: string | null
          RUBRO22?: string | null
          RUBRO23?: string | null
          RUBRO24?: string | null
          RUBRO25?: string | null
          RUBRO3?: string | null
          RUBRO4?: string | null
          RUBRO5?: string | null
          RUBRO6?: string | null
          RUBRO7?: string | null
          RUBRO8?: string | null
          RUBRO9?: string | null
          SALARIO_DIARIO_INT?: number | null
          SALARIO_REFERENCIA?: number
          SALARIOPD_DOLAR?: number | null
          SALARIOPD_LOCAL?: number | null
          SALARIOPD_NOMINA?: number | null
          SEGUNDO_APELLIDO?: string | null
          SEXO?: string
          SUBTIPO_TRABAJADOR_NE?: string | null
          TELEFONO1?: string | null
          TELEFONO2?: string | null
          TELEFONO3?: string | null
          TIPO_CUENTA_ENTIDAD?: string | null
          TIPO_MEDIDAS_CERTIFICADAS?: number | null
          TIPO_NIVEL_EDUCATIVO?: number | null
          TIPO_SALARIO?: string | null
          TIPO_SALARIO_AUMEN?: string
          TIPO_SANGRE?: string | null
          TIPO_TRABAJADOR_NE?: string | null
          U_COD_SUCURSAL?: string | null
          U_COMPANIA?: string
          U_ERROR?: string | null
          U_ESTADO_WEB?: string | null
          U_FUERA_ESCALA?: string
          U_NIVEL_ORGANIZACIONAL?: string | null
          U_PASO_SALARIAL?: string | null
          U_PS_BIOGRAFIA?: string | null
          U_PS_DESARROLLO?: number | null
          U_PS_ESTADO_WEB?: string | null
          U_PS_MOVILIDAD?: number | null
          U_PS_PASO1?: string | null
          U_PS_PASO2?: string | null
          U_PS_PASO3?: string | null
          U_PS_RAMO?: string | null
          U_PS_SILO?: string | null
          U_TDEP?: string | null
          U_TIPO_ESCALA?: string | null
          U_TIPO_PLANILLA?: string | null
          UBICACION?: string
          UpdatedBy?: string | null
          USUARIO_CREACION?: string | null
          USUARIO_ULT_MOD?: string | null
          VACS_ADICIONALES?: number
          VACS_PENDIENTES?: number
          VACS_ULT_CALCULO?: string
        }
        Relationships: []
      }
      EMPLEADO_QA_dbo: {
        Row: {
          ACTIVO: string
          ASEGURADO: string | null
          BENEFICIO_COLECTIVO: string | null
          BONO_DECRETO: number
          CENTRO_COSTO: string
          CLASE_SEGURO: string | null
          CreateDate: string | null
          CreatedBy: string | null
          CTA_ELECTRONICA: string | null
          CUENTA_ENTIDAD: string | null
          DEPARTAMENTO: string
          DEPENDIENTES: number | null
          DETALLE_DIR_HAB: number | null
          DETALLE_DIR_POSTAL: number | null
          DIAS_DISP_INCAP: number | null
          DIRECCION_HAB: string | null
          DIRECCION_POSTAL: string | null
          DIVISION_GEOGRAFICA1: string | null
          DIVISION_GEOGRAFICA2: string | null
          E_MAIL: string | null
          EMPLEADO: string
          ENTIDAD_FINANCIERA: string | null
          ESTADO_CIVIL: string
          ESTADO_EMPLEADO: string
          FCH_HORA_ULT_MOD: string | null
          FECHA_ANTIG_EMP: string | null
          FECHA_ANTIG_GOB: string | null
          FECHA_HORA_CREACION: string | null
          FECHA_INGRESO: string
          FECHA_NACIMIENTO: string
          FECHA_NO_PAGO: string
          FECHA_PROX_EVAL: string | null
          FECHA_SALIDA: string | null
          FORMA_PAGO: string
          FORMA_PAGO_NE: string | null
          FOTOGRAFIA: string | null
          HORARIO: string
          IDENTIFICACION: string | null
          MEDIO_PAGO_NE: string | null
          NIT: string | null
          NOMBRE: string | null
          NOMBRE_PILA: string | null
          NOMINA: string
          NOTAS_TEL1: string | null
          NOTAS_TEL2: string | null
          NOTAS_TEL3: string | null
          NoteExistsFlag: number | null
          PAIS: string
          PAIS_DIREC: string | null
          PASAPORTE: string | null
          PERMISO_CONDUCIR: string | null
          PERMISO_SALUD: string | null
          PLAZA: string
          PRIMER_APELLIDO: string | null
          PUESTO: string
          RecordDate: string | null
          RowPointer: string | null
          RUBRO1: string | null
          RUBRO10: string | null
          RUBRO11: string | null
          RUBRO12: string | null
          RUBRO13: string | null
          RUBRO14: string | null
          RUBRO15: string | null
          RUBRO16: string | null
          RUBRO17: string | null
          RUBRO18: string | null
          RUBRO19: string | null
          RUBRO2: string | null
          RUBRO20: string | null
          RUBRO21: string | null
          RUBRO22: string | null
          RUBRO23: string | null
          RUBRO24: string | null
          RUBRO25: string | null
          RUBRO3: string | null
          RUBRO4: string | null
          RUBRO5: string | null
          RUBRO6: string | null
          RUBRO7: string | null
          RUBRO8: string | null
          RUBRO9: string | null
          SALARIO_DIARIO_INT: number | null
          SALARIO_REFERENCIA: number
          SALARIOPD_DOLAR: number | null
          SALARIOPD_LOCAL: number | null
          SALARIOPD_NOMINA: number | null
          SEGUNDO_APELLIDO: string | null
          SEXO: string
          SUBTIPO_TRABAJADOR_NE: string | null
          TELEFONO1: string | null
          TELEFONO2: string | null
          TELEFONO3: string | null
          TIPO_CUENTA_ENTIDAD: string | null
          TIPO_MEDIDAS_CERTIFICADAS: number | null
          TIPO_NIVEL_EDUCATIVO: number | null
          TIPO_SALARIO: string | null
          TIPO_SALARIO_AUMEN: string
          TIPO_SANGRE: string | null
          TIPO_TRABAJADOR_NE: string | null
          U_COD_SUCURSAL: string | null
          U_COMPANIA: string
          U_ERROR: string | null
          U_ESTADO_WEB: string | null
          U_FUERA_ESCALA: string
          U_NIVEL_ORGANIZACIONAL: string | null
          U_PASO_SALARIAL: string | null
          U_PS_BIOGRAFIA: string | null
          U_PS_DESARROLLO: number | null
          U_PS_ESTADO_WEB: string | null
          U_PS_MOVILIDAD: number | null
          U_PS_PASO1: string | null
          U_PS_PASO2: string | null
          U_PS_PASO3: string | null
          U_PS_RAMO: string | null
          U_PS_SILO: string | null
          U_TDEP: string | null
          U_TIPO_ESCALA: string | null
          U_TIPO_PLANILLA: string | null
          UBICACION: string
          UpdatedBy: string | null
          USUARIO_CREACION: string | null
          USUARIO_ULT_MOD: string | null
          VACS_ADICIONALES: number
          VACS_PENDIENTES: number
          VACS_ULT_CALCULO: string
        }
        Insert: {
          ACTIVO: string
          ASEGURADO?: string | null
          BENEFICIO_COLECTIVO?: string | null
          BONO_DECRETO: number
          CENTRO_COSTO: string
          CLASE_SEGURO?: string | null
          CreateDate?: string | null
          CreatedBy?: string | null
          CTA_ELECTRONICA?: string | null
          CUENTA_ENTIDAD?: string | null
          DEPARTAMENTO: string
          DEPENDIENTES?: number | null
          DETALLE_DIR_HAB?: number | null
          DETALLE_DIR_POSTAL?: number | null
          DIAS_DISP_INCAP?: number | null
          DIRECCION_HAB?: string | null
          DIRECCION_POSTAL?: string | null
          DIVISION_GEOGRAFICA1?: string | null
          DIVISION_GEOGRAFICA2?: string | null
          E_MAIL?: string | null
          EMPLEADO: string
          ENTIDAD_FINANCIERA?: string | null
          ESTADO_CIVIL: string
          ESTADO_EMPLEADO: string
          FCH_HORA_ULT_MOD?: string | null
          FECHA_ANTIG_EMP?: string | null
          FECHA_ANTIG_GOB?: string | null
          FECHA_HORA_CREACION?: string | null
          FECHA_INGRESO: string
          FECHA_NACIMIENTO: string
          FECHA_NO_PAGO: string
          FECHA_PROX_EVAL?: string | null
          FECHA_SALIDA?: string | null
          FORMA_PAGO: string
          FORMA_PAGO_NE?: string | null
          FOTOGRAFIA?: string | null
          HORARIO: string
          IDENTIFICACION?: string | null
          MEDIO_PAGO_NE?: string | null
          NIT?: string | null
          NOMBRE?: string | null
          NOMBRE_PILA?: string | null
          NOMINA: string
          NOTAS_TEL1?: string | null
          NOTAS_TEL2?: string | null
          NOTAS_TEL3?: string | null
          NoteExistsFlag?: number | null
          PAIS: string
          PAIS_DIREC?: string | null
          PASAPORTE?: string | null
          PERMISO_CONDUCIR?: string | null
          PERMISO_SALUD?: string | null
          PLAZA: string
          PRIMER_APELLIDO?: string | null
          PUESTO: string
          RecordDate?: string | null
          RowPointer?: string | null
          RUBRO1?: string | null
          RUBRO10?: string | null
          RUBRO11?: string | null
          RUBRO12?: string | null
          RUBRO13?: string | null
          RUBRO14?: string | null
          RUBRO15?: string | null
          RUBRO16?: string | null
          RUBRO17?: string | null
          RUBRO18?: string | null
          RUBRO19?: string | null
          RUBRO2?: string | null
          RUBRO20?: string | null
          RUBRO21?: string | null
          RUBRO22?: string | null
          RUBRO23?: string | null
          RUBRO24?: string | null
          RUBRO25?: string | null
          RUBRO3?: string | null
          RUBRO4?: string | null
          RUBRO5?: string | null
          RUBRO6?: string | null
          RUBRO7?: string | null
          RUBRO8?: string | null
          RUBRO9?: string | null
          SALARIO_DIARIO_INT?: number | null
          SALARIO_REFERENCIA: number
          SALARIOPD_DOLAR?: number | null
          SALARIOPD_LOCAL?: number | null
          SALARIOPD_NOMINA?: number | null
          SEGUNDO_APELLIDO?: string | null
          SEXO: string
          SUBTIPO_TRABAJADOR_NE?: string | null
          TELEFONO1?: string | null
          TELEFONO2?: string | null
          TELEFONO3?: string | null
          TIPO_CUENTA_ENTIDAD?: string | null
          TIPO_MEDIDAS_CERTIFICADAS?: number | null
          TIPO_NIVEL_EDUCATIVO?: number | null
          TIPO_SALARIO?: string | null
          TIPO_SALARIO_AUMEN: string
          TIPO_SANGRE?: string | null
          TIPO_TRABAJADOR_NE?: string | null
          U_COD_SUCURSAL?: string | null
          U_COMPANIA: string
          U_ERROR?: string | null
          U_ESTADO_WEB?: string | null
          U_FUERA_ESCALA: string
          U_NIVEL_ORGANIZACIONAL?: string | null
          U_PASO_SALARIAL?: string | null
          U_PS_BIOGRAFIA?: string | null
          U_PS_DESARROLLO?: number | null
          U_PS_ESTADO_WEB?: string | null
          U_PS_MOVILIDAD?: number | null
          U_PS_PASO1?: string | null
          U_PS_PASO2?: string | null
          U_PS_PASO3?: string | null
          U_PS_RAMO?: string | null
          U_PS_SILO?: string | null
          U_TDEP?: string | null
          U_TIPO_ESCALA?: string | null
          U_TIPO_PLANILLA?: string | null
          UBICACION: string
          UpdatedBy?: string | null
          USUARIO_CREACION?: string | null
          USUARIO_ULT_MOD?: string | null
          VACS_ADICIONALES: number
          VACS_PENDIENTES: number
          VACS_ULT_CALCULO: string
        }
        Update: {
          ACTIVO?: string
          ASEGURADO?: string | null
          BENEFICIO_COLECTIVO?: string | null
          BONO_DECRETO?: number
          CENTRO_COSTO?: string
          CLASE_SEGURO?: string | null
          CreateDate?: string | null
          CreatedBy?: string | null
          CTA_ELECTRONICA?: string | null
          CUENTA_ENTIDAD?: string | null
          DEPARTAMENTO?: string
          DEPENDIENTES?: number | null
          DETALLE_DIR_HAB?: number | null
          DETALLE_DIR_POSTAL?: number | null
          DIAS_DISP_INCAP?: number | null
          DIRECCION_HAB?: string | null
          DIRECCION_POSTAL?: string | null
          DIVISION_GEOGRAFICA1?: string | null
          DIVISION_GEOGRAFICA2?: string | null
          E_MAIL?: string | null
          EMPLEADO?: string
          ENTIDAD_FINANCIERA?: string | null
          ESTADO_CIVIL?: string
          ESTADO_EMPLEADO?: string
          FCH_HORA_ULT_MOD?: string | null
          FECHA_ANTIG_EMP?: string | null
          FECHA_ANTIG_GOB?: string | null
          FECHA_HORA_CREACION?: string | null
          FECHA_INGRESO?: string
          FECHA_NACIMIENTO?: string
          FECHA_NO_PAGO?: string
          FECHA_PROX_EVAL?: string | null
          FECHA_SALIDA?: string | null
          FORMA_PAGO?: string
          FORMA_PAGO_NE?: string | null
          FOTOGRAFIA?: string | null
          HORARIO?: string
          IDENTIFICACION?: string | null
          MEDIO_PAGO_NE?: string | null
          NIT?: string | null
          NOMBRE?: string | null
          NOMBRE_PILA?: string | null
          NOMINA?: string
          NOTAS_TEL1?: string | null
          NOTAS_TEL2?: string | null
          NOTAS_TEL3?: string | null
          NoteExistsFlag?: number | null
          PAIS?: string
          PAIS_DIREC?: string | null
          PASAPORTE?: string | null
          PERMISO_CONDUCIR?: string | null
          PERMISO_SALUD?: string | null
          PLAZA?: string
          PRIMER_APELLIDO?: string | null
          PUESTO?: string
          RecordDate?: string | null
          RowPointer?: string | null
          RUBRO1?: string | null
          RUBRO10?: string | null
          RUBRO11?: string | null
          RUBRO12?: string | null
          RUBRO13?: string | null
          RUBRO14?: string | null
          RUBRO15?: string | null
          RUBRO16?: string | null
          RUBRO17?: string | null
          RUBRO18?: string | null
          RUBRO19?: string | null
          RUBRO2?: string | null
          RUBRO20?: string | null
          RUBRO21?: string | null
          RUBRO22?: string | null
          RUBRO23?: string | null
          RUBRO24?: string | null
          RUBRO25?: string | null
          RUBRO3?: string | null
          RUBRO4?: string | null
          RUBRO5?: string | null
          RUBRO6?: string | null
          RUBRO7?: string | null
          RUBRO8?: string | null
          RUBRO9?: string | null
          SALARIO_DIARIO_INT?: number | null
          SALARIO_REFERENCIA?: number
          SALARIOPD_DOLAR?: number | null
          SALARIOPD_LOCAL?: number | null
          SALARIOPD_NOMINA?: number | null
          SEGUNDO_APELLIDO?: string | null
          SEXO?: string
          SUBTIPO_TRABAJADOR_NE?: string | null
          TELEFONO1?: string | null
          TELEFONO2?: string | null
          TELEFONO3?: string | null
          TIPO_CUENTA_ENTIDAD?: string | null
          TIPO_MEDIDAS_CERTIFICADAS?: number | null
          TIPO_NIVEL_EDUCATIVO?: number | null
          TIPO_SALARIO?: string | null
          TIPO_SALARIO_AUMEN?: string
          TIPO_SANGRE?: string | null
          TIPO_TRABAJADOR_NE?: string | null
          U_COD_SUCURSAL?: string | null
          U_COMPANIA?: string
          U_ERROR?: string | null
          U_ESTADO_WEB?: string | null
          U_FUERA_ESCALA?: string
          U_NIVEL_ORGANIZACIONAL?: string | null
          U_PASO_SALARIAL?: string | null
          U_PS_BIOGRAFIA?: string | null
          U_PS_DESARROLLO?: number | null
          U_PS_ESTADO_WEB?: string | null
          U_PS_MOVILIDAD?: number | null
          U_PS_PASO1?: string | null
          U_PS_PASO2?: string | null
          U_PS_PASO3?: string | null
          U_PS_RAMO?: string | null
          U_PS_SILO?: string | null
          U_TDEP?: string | null
          U_TIPO_ESCALA?: string | null
          U_TIPO_PLANILLA?: string | null
          UBICACION?: string
          UpdatedBy?: string | null
          USUARIO_CREACION?: string | null
          USUARIO_ULT_MOD?: string | null
          VACS_ADICIONALES?: number
          VACS_PENDIENTES?: number
          VACS_ULT_CALCULO?: string
        }
        Relationships: []
      }
      empleados: {
        Row: {
          activo: boolean | null
          cedula: string
          created_at: string | null
          departamento: string | null
          email: string | null
          empresa: string | null
          fecha_contratacion: string | null
          firma_url: string | null
          foto_url: string | null
          id: string
          nombre: string
          puesto: string | null
          rol: string | null
          supervisor: string | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          cedula: string
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          empresa?: string | null
          fecha_contratacion?: string | null
          firma_url?: string | null
          foto_url?: string | null
          id?: string
          nombre: string
          puesto?: string | null
          rol?: string | null
          supervisor?: string | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          cedula?: string
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          empresa?: string | null
          fecha_contratacion?: string | null
          firma_url?: string | null
          foto_url?: string | null
          id?: string
          nombre?: string
          puesto?: string | null
          rol?: string | null
          supervisor?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      empleados_info_basica: {
        Row: {
          cedula: string | null
          created_at: string | null
          departamento: string | null
          email: string | null
          empleado_id: string | null
          fecha_contratacion: string | null
          id: string
          nombre: string | null
          puesto: string | null
          supervisor: string | null
          updated_at: string | null
        }
        Insert: {
          cedula?: string | null
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          empleado_id?: string | null
          fecha_contratacion?: string | null
          id?: string
          nombre?: string | null
          puesto?: string | null
          supervisor?: string | null
          updated_at?: string | null
        }
        Update: {
          cedula?: string | null
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          empleado_id?: string | null
          fecha_contratacion?: string | null
          id?: string
          nombre?: string | null
          puesto?: string | null
          supervisor?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          area: string
          company_id: string | null
          country_id: string | null
          created_at: string
          department_id: string | null
          employee_code: string
          full_name: string
          id: string
          is_active: boolean
          level: number
          manager_id: string | null
          photo_url: string | null
          position: string
          step: number
          updated_at: string
        }
        Insert: {
          area: string
          company_id?: string | null
          country_id?: string | null
          created_at?: string
          department_id?: string | null
          employee_code: string
          full_name: string
          id?: string
          is_active?: boolean
          level?: number
          manager_id?: string | null
          photo_url?: string | null
          position: string
          step?: number
          updated_at?: string
        }
        Update: {
          area?: string
          company_id?: string | null
          country_id?: string | null
          created_at?: string
          department_id?: string | null
          employee_code?: string
          full_name?: string
          id?: string
          is_active?: boolean
          level?: number
          manager_id?: string | null
          photo_url?: string | null
          position?: string
          step?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      errores_vectorizados: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      errors: {
        Row: {
          created_at: string | null
          created_by: string
          description: string
          error_type: string
          files: Json | null
          id: string
          priority: string
          solutions: string[] | null
          status: string
          technology: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description: string
          error_type: string
          files?: Json | null
          id?: string
          priority?: string
          solutions?: string[] | null
          status?: string
          technology?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string
          error_type?: string
          files?: Json | null
          id?: string
          priority?: string
          solutions?: string[] | null
          status?: string
          technology?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "errors_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_management"
            referencedColumns: ["email"]
          },
        ]
      }
      etiquetas_principales_glosario: {
        Row: {
          activo: boolean
          created_at: string
          id: string
          nombre: string
          orden: number
          updated_at: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          id?: string
          nombre: string
          orden?: number
          updated_at?: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          id?: string
          nombre?: string
          orden?: number
          updated_at?: string
        }
        Relationships: []
      }
      etiquetas_secundarias_glosario: {
        Row: {
          activo: boolean
          created_at: string
          id: string
          nombre: string
          orden: number
          updated_at: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          id?: string
          nombre: string
          orden?: number
          updated_at?: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          id?: string
          nombre?: string
          orden?: number
          updated_at?: string
        }
        Relationships: []
      }
      evaluaciones: {
        Row: {
          anio: number
          comentario_colaborador: string | null
          created_at: string | null
          descripcion: string | null
          empleado_id: string | null
          estado: string | null
          fecha_emision: string | null
          fecha_llenado: string | null
          firma_colaborador: string | null
          firma_rrhh: string | null
          firma_supervisor: string | null
          id: string
          mes: number
          objetivo_estrategico: string | null
          objetivos_departamento: string | null
          template_id: string | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          anio: number
          comentario_colaborador?: string | null
          created_at?: string | null
          descripcion?: string | null
          empleado_id?: string | null
          estado?: string | null
          fecha_emision?: string | null
          fecha_llenado?: string | null
          firma_colaborador?: string | null
          firma_rrhh?: string | null
          firma_supervisor?: string | null
          id: string
          mes: number
          objetivo_estrategico?: string | null
          objetivos_departamento?: string | null
          template_id?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          anio?: number
          comentario_colaborador?: string | null
          created_at?: string | null
          descripcion?: string | null
          empleado_id?: string | null
          estado?: string | null
          fecha_emision?: string | null
          fecha_llenado?: string | null
          firma_colaborador?: string | null
          firma_rrhh?: string | null
          firma_supervisor?: string | null
          id?: string
          mes?: number
          objetivo_estrategico?: string | null
          objetivos_departamento?: string | null
          template_id?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      evidencias_comportamiento: {
        Row: {
          areas_mejora: string | null
          calificacion: string | null
          comportamiento: string
          created_at: string | null
          descripcion: string | null
          descripcion_detallada: Json | null
          evaluacion_id: string | null
          evidencia: string | null
          fortalezas: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          areas_mejora?: string | null
          calificacion?: string | null
          comportamiento: string
          created_at?: string | null
          descripcion?: string | null
          descripcion_detallada?: Json | null
          evaluacion_id?: string | null
          evidencia?: string | null
          fortalezas?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          areas_mejora?: string | null
          calificacion?: string | null
          comportamiento?: string
          created_at?: string | null
          descripcion?: string | null
          descripcion_detallada?: Json | null
          evaluacion_id?: string | null
          evidencia?: string | null
          fortalezas?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidencias_comportamiento_evaluacion_id_fkey"
            columns: ["evaluacion_id"]
            isOneToOne: false
            referencedRelation: "evaluaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      factor_price_list_relations: {
        Row: {
          created_at: string
          factor_id: string
          id: string
          price_list_id: string
        }
        Insert: {
          created_at?: string
          factor_id: string
          id?: string
          price_list_id: string
        }
        Update: {
          created_at?: string
          factor_id?: string
          id?: string
          price_list_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "factor_price_list_relations_factor_id_fkey"
            columns: ["factor_id"]
            isOneToOne: false
            referencedRelation: "pricing_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "factor_price_list_relations_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      facturas_2025: {
        Row: {
          cliente: string | null
          division_geografica1: string | null
          division_geografica2: string | null
          FECHA: string | null
          invoice_number: string
          PEDIDO: string | null
          RUTA: string | null
          vendedor: string | null
          zona: string | null
        }
        Insert: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FECHA?: string | null
          invoice_number: string
          PEDIDO?: string | null
          RUTA?: string | null
          vendedor?: string | null
          zona?: string | null
        }
        Update: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FECHA?: string | null
          invoice_number?: string
          PEDIDO?: string | null
          RUTA?: string | null
          vendedor?: string | null
          zona?: string | null
        }
        Relationships: []
      }
      facturas_proveedores_olo: {
        Row: {
          created_at: string
          descripcion: string | null
          fecha_factura: string | null
          id: number
          impuesto: number | null
          monto_factura: number | null
          numero_factura: string | null
          orden_compra: string | null
          proveedor: string | null
          usuario: string | null
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          orden_compra?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          orden_compra?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Relationships: []
      }
      facturas_push_money: {
        Row: {
          aprobado: boolean | null
          cedula_juridica: string
          chat_id: string | null
          created_at: string | null
          fecha: string | null
          foto_factura: string | null
          monto_push_money_fact: number | null
          nro_factura: string
          revisado: boolean | null
          updated_at: string | null
        }
        Insert: {
          aprobado?: boolean | null
          cedula_juridica: string
          chat_id?: string | null
          created_at?: string | null
          fecha?: string | null
          foto_factura?: string | null
          monto_push_money_fact?: number | null
          nro_factura: string
          revisado?: boolean | null
          updated_at?: string | null
        }
        Update: {
          aprobado?: boolean | null
          cedula_juridica?: string
          chat_id?: string | null
          created_at?: string | null
          fecha?: string | null
          foto_factura?: string | null
          monto_push_money_fact?: number | null
          nro_factura?: string
          revisado?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      facturas_pushmoney: {
        Row: {
          antiguedad: number
          ced_juridica_cliente: string
          created_at: string
          documento_adjunto: string
          empresa: string
          fecha_factura: string
          id: string
          monto_asignado: number
          numero_factura: string
          vendedor: string
        }
        Insert: {
          antiguedad: number
          ced_juridica_cliente: string
          created_at?: string
          documento_adjunto: string
          empresa: string
          fecha_factura: string
          id: string
          monto_asignado: number
          numero_factura: string
          vendedor: string
        }
        Update: {
          antiguedad?: number
          ced_juridica_cliente?: string
          created_at?: string
          documento_adjunto?: string
          empresa?: string
          fecha_factura?: string
          id?: string
          monto_asignado?: number
          numero_factura?: string
          vendedor?: string
        }
        Relationships: []
      }
      fichas: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      fichas_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      fichas_tecnicas: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      flujos: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      flujos_local: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      generated_posts: {
        Row: {
          created_at: string
          file_path: string
          file_type: string
          id: string
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string
          file_path: string
          file_type: string
          id?: string
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string
          file_path?: string
          file_type?: string
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      github_commits: {
        Row: {
          author_email: string
          author_name: string
          branch_name: string | null
          change_request_id: string | null
          commit_date: string
          commit_hash: string
          commit_message: string
          commit_url: string | null
          created_at: string
          files_modified: Json | null
          id: string
          system_id: string
        }
        Insert: {
          author_email: string
          author_name: string
          branch_name?: string | null
          change_request_id?: string | null
          commit_date: string
          commit_hash: string
          commit_message: string
          commit_url?: string | null
          created_at?: string
          files_modified?: Json | null
          id?: string
          system_id: string
        }
        Update: {
          author_email?: string
          author_name?: string
          branch_name?: string | null
          change_request_id?: string | null
          commit_date?: string
          commit_hash?: string
          commit_message?: string
          commit_url?: string | null
          created_at?: string
          files_modified?: Json | null
          id?: string
          system_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_commits_change_request_id_fkey"
            columns: ["change_request_id"]
            isOneToOne: false
            referencedRelation: "change_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "github_commits_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "systems"
            referencedColumns: ["id"]
          },
        ]
      }
      global_factors: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      glosario: {
        Row: {
          Definición: string
          "Etiqueta Principal": string
          "Etiqueta Secundaria": string | null
          id: string
          Término: string
        }
        Insert: {
          Definición: string
          "Etiqueta Principal": string
          "Etiqueta Secundaria"?: string | null
          id?: string
          Término: string
        }
        Update: {
          Definición?: string
          "Etiqueta Principal"?: string
          "Etiqueta Secundaria"?: string | null
          id?: string
          Término?: string
        }
        Relationships: []
      }
      importaciones_cofersa: {
        Row: {
          ADUANA: string | null
          AGENTE: string | null
          "CANTIDAD BULTOS": string | null
          "CANTIDAD PRODUCTO UNIDAD COMERCIAL": string | null
          "CANTIDAD UNIDAD COMERCIAL": number | null
          "CANTIDAD UNIDAD F�SICA": string | null
          "CONDICI�N DE VENTA FACTURA": string | null
          DECLARANTE: string | null
          "DESCRIPCI�N": string | null
          "DESCRIPCI�N ALMAC�N": string | null
          "DESCRIPCI�N DE LA POSICION": string | null
          DESPACHO: string | null
          "ESTADO MERCADER�A": string | null
          FACTURA: string | null
          "FACTURA NRO ENV�O": string | null
          "FACTURA VALOR FOB": string | null
          FECHA: string | null
          "FECHA EMBARQUE FACTURA": string | null
          ITEM: string | null
          "L�NEA FACTURA": number | null
          MARCA: string | null
          MEDIO: string | null
          MODALIDAD: string | null
          MODELO: string | null
          MONEDA: string | null
          "MONEDA FACTURA": string | null
          "MONTO FACTURA": string | null
          "OTROS GASTOS": string | null
          "PA�S DE ADQUISICI�N": string | null
          "PA�S DE ORIGEN": string | null
          "PA�S ENTREGA FACTURA": string | null
          "PESO BRUTO": string | null
          "PESO NETO": string | null
          "POSICI�N ARANCELARIA": string | null
          "PRECIO UNITARIO U$S": string | null
          precio_unidad_mercancia: string | null
          PROVEEDOR: string | null
          "PUERTO EMBARQUE": string | null
          "RUC DEL IMPORTADOR": string | null
          "R�GIMEN": string | null
          "TIPO AFORO": string | null
          "TIPO BULTO": string | null
          "TIPO CAMBIO": string | null
          "TIPO CAMBIO FACTURA": string | null
          "TIPO CAMBIO VENTA": string | null
          "TIPO CARGA": string | null
          "TIPO DUA": string | null
          "TIPO UNIDAD COMERCIAL": string | null
          "TIPO UNIDAD F�SICA": string | null
          "TOTAL FACTURAS": string | null
          "VALOR CIF U$S": string | null
          "VALOR FLETE U$S": string | null
          "VALOR FOB U$S": string | null
          "VALOR MEDIO PORTADOR": string | null
          "VALOR SEGURO U$S": string | null
        }
        Insert: {
          ADUANA?: string | null
          AGENTE?: string | null
          "CANTIDAD BULTOS"?: string | null
          "CANTIDAD PRODUCTO UNIDAD COMERCIAL"?: string | null
          "CANTIDAD UNIDAD COMERCIAL"?: number | null
          "CANTIDAD UNIDAD F�SICA"?: string | null
          "CONDICI�N DE VENTA FACTURA"?: string | null
          DECLARANTE?: string | null
          "DESCRIPCI�N"?: string | null
          "DESCRIPCI�N ALMAC�N"?: string | null
          "DESCRIPCI�N DE LA POSICION"?: string | null
          DESPACHO?: string | null
          "ESTADO MERCADER�A"?: string | null
          FACTURA?: string | null
          "FACTURA NRO ENV�O"?: string | null
          "FACTURA VALOR FOB"?: string | null
          FECHA?: string | null
          "FECHA EMBARQUE FACTURA"?: string | null
          ITEM?: string | null
          "L�NEA FACTURA"?: number | null
          MARCA?: string | null
          MEDIO?: string | null
          MODALIDAD?: string | null
          MODELO?: string | null
          MONEDA?: string | null
          "MONEDA FACTURA"?: string | null
          "MONTO FACTURA"?: string | null
          "OTROS GASTOS"?: string | null
          "PA�S DE ADQUISICI�N"?: string | null
          "PA�S DE ORIGEN"?: string | null
          "PA�S ENTREGA FACTURA"?: string | null
          "PESO BRUTO"?: string | null
          "PESO NETO"?: string | null
          "POSICI�N ARANCELARIA"?: string | null
          "PRECIO UNITARIO U$S"?: string | null
          precio_unidad_mercancia?: string | null
          PROVEEDOR?: string | null
          "PUERTO EMBARQUE"?: string | null
          "RUC DEL IMPORTADOR"?: string | null
          "R�GIMEN"?: string | null
          "TIPO AFORO"?: string | null
          "TIPO BULTO"?: string | null
          "TIPO CAMBIO"?: string | null
          "TIPO CAMBIO FACTURA"?: string | null
          "TIPO CAMBIO VENTA"?: string | null
          "TIPO CARGA"?: string | null
          "TIPO DUA"?: string | null
          "TIPO UNIDAD COMERCIAL"?: string | null
          "TIPO UNIDAD F�SICA"?: string | null
          "TOTAL FACTURAS"?: string | null
          "VALOR CIF U$S"?: string | null
          "VALOR FLETE U$S"?: string | null
          "VALOR FOB U$S"?: string | null
          "VALOR MEDIO PORTADOR"?: string | null
          "VALOR SEGURO U$S"?: string | null
        }
        Update: {
          ADUANA?: string | null
          AGENTE?: string | null
          "CANTIDAD BULTOS"?: string | null
          "CANTIDAD PRODUCTO UNIDAD COMERCIAL"?: string | null
          "CANTIDAD UNIDAD COMERCIAL"?: number | null
          "CANTIDAD UNIDAD F�SICA"?: string | null
          "CONDICI�N DE VENTA FACTURA"?: string | null
          DECLARANTE?: string | null
          "DESCRIPCI�N"?: string | null
          "DESCRIPCI�N ALMAC�N"?: string | null
          "DESCRIPCI�N DE LA POSICION"?: string | null
          DESPACHO?: string | null
          "ESTADO MERCADER�A"?: string | null
          FACTURA?: string | null
          "FACTURA NRO ENV�O"?: string | null
          "FACTURA VALOR FOB"?: string | null
          FECHA?: string | null
          "FECHA EMBARQUE FACTURA"?: string | null
          ITEM?: string | null
          "L�NEA FACTURA"?: number | null
          MARCA?: string | null
          MEDIO?: string | null
          MODALIDAD?: string | null
          MODELO?: string | null
          MONEDA?: string | null
          "MONEDA FACTURA"?: string | null
          "MONTO FACTURA"?: string | null
          "OTROS GASTOS"?: string | null
          "PA�S DE ADQUISICI�N"?: string | null
          "PA�S DE ORIGEN"?: string | null
          "PA�S ENTREGA FACTURA"?: string | null
          "PESO BRUTO"?: string | null
          "PESO NETO"?: string | null
          "POSICI�N ARANCELARIA"?: string | null
          "PRECIO UNITARIO U$S"?: string | null
          precio_unidad_mercancia?: string | null
          PROVEEDOR?: string | null
          "PUERTO EMBARQUE"?: string | null
          "RUC DEL IMPORTADOR"?: string | null
          "R�GIMEN"?: string | null
          "TIPO AFORO"?: string | null
          "TIPO BULTO"?: string | null
          "TIPO CAMBIO"?: string | null
          "TIPO CAMBIO FACTURA"?: string | null
          "TIPO CAMBIO VENTA"?: string | null
          "TIPO CARGA"?: string | null
          "TIPO DUA"?: string | null
          "TIPO UNIDAD COMERCIAL"?: string | null
          "TIPO UNIDAD F�SICA"?: string | null
          "TOTAL FACTURAS"?: string | null
          "VALOR CIF U$S"?: string | null
          "VALOR FLETE U$S"?: string | null
          "VALOR FOB U$S"?: string | null
          "VALOR MEDIO PORTADOR"?: string | null
          "VALOR SEGURO U$S"?: string | null
        }
        Relationships: []
      }
      imprenta_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      indicadores_objetivos: {
        Row: {
          clave: string
          created_at: string | null
          evaluacion_id: string | null
          id: string
          indicador: string | null
          logro: number | null
          meta: number | null
          minimo: number | null
          peso: number | null
          resultado: number | null
          resultado_ponderado: number | null
          updated_at: string | null
        }
        Insert: {
          clave: string
          created_at?: string | null
          evaluacion_id?: string | null
          id?: string
          indicador?: string | null
          logro?: number | null
          meta?: number | null
          minimo?: number | null
          peso?: number | null
          resultado?: number | null
          resultado_ponderado?: number | null
          updated_at?: string | null
        }
        Update: {
          clave?: string
          created_at?: string | null
          evaluacion_id?: string | null
          id?: string
          indicador?: string | null
          logro?: number | null
          meta?: number | null
          minimo?: number | null
          peso?: number | null
          resultado?: number | null
          resultado_ponderado?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "indicadores_objetivos_evaluacion_id_fkey"
            columns: ["evaluacion_id"]
            isOneToOne: false
            referencedRelation: "evaluaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      indice_documentos_aida: {
        Row: {
          empresa: string
          estatus: string
          fechaModificacion: string
          id: number
          link: string
          nombre: string
          silo: string
          tipoDoc: string
        }
        Insert: {
          empresa: string
          estatus: string
          fechaModificacion: string
          id?: number
          link: string
          nombre: string
          silo: string
          tipoDoc: string
        }
        Update: {
          empresa?: string
          estatus?: string
          fechaModificacion?: string
          id?: number
          link?: string
          nombre?: string
          silo?: string
          tipoDoc?: string
        }
        Relationships: []
      }
      indice_documentos_visual: {
        Row: {
          empresa: string | null
          estatus: string | null
          fechaModificacion: string | null
          link: string
          nombre: string
          silo: string | null
          tipoDoc: string | null
        }
        Insert: {
          empresa?: string | null
          estatus?: string | null
          fechaModificacion?: string | null
          link: string
          nombre: string
          silo?: string | null
          tipoDoc?: string | null
        }
        Update: {
          empresa?: string | null
          estatus?: string | null
          fechaModificacion?: string | null
          link?: string
          nombre?: string
          silo?: string | null
          tipoDoc?: string | null
        }
        Relationships: []
      }
      info_categorizacion_epa: {
        Row: {
          categoria: string | null
          codigo_arancelario: string
          descripcion_larga: string | null
          familia: string | null
          linea: string | null
          nombre_categoria: string | null
          subfamilia: string | null
        }
        Insert: {
          categoria?: string | null
          codigo_arancelario: string
          descripcion_larga?: string | null
          familia?: string | null
          linea?: string | null
          nombre_categoria?: string | null
          subfamilia?: string | null
        }
        Update: {
          categoria?: string | null
          codigo_arancelario?: string
          descripcion_larga?: string | null
          familia?: string | null
          linea?: string | null
          nombre_categoria?: string | null
          subfamilia?: string | null
        }
        Relationships: []
      }
      instagram_posts: {
        Row: {
          campaign_id: string | null
          caption: string
          created_at: string
          id: string
          image_url: string
        }
        Insert: {
          campaign_id?: string | null
          caption: string
          created_at?: string
          id?: string
          image_url: string
        }
        Update: {
          campaign_id?: string | null
          caption?: string
          created_at?: string
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_posts_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      job_descriptions: {
        Row: {
          company_name: string | null
          country_name: string | null
          created_at: string
          department_name: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          requirements: string | null
          responsibilities: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          country_name?: string | null
          created_at?: string
          department_name?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          requirements?: string | null
          responsibilities?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          country_name?: string | null
          created_at?: string
          department_name?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          requirements?: string | null
          responsibilities?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      manager_goals: {
        Row: {
          confidence: number | null
          created_at: string
          evidence_quotes: string[] | null
          id: string
          key_reasons: string[] | null
          objective: string
          profile_id: string | null
          risks: string[] | null
          suggested_actions: string[] | null
          trend: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          evidence_quotes?: string[] | null
          id?: string
          key_reasons?: string[] | null
          objective: string
          profile_id?: string | null
          risks?: string[] | null
          suggested_actions?: string[] | null
          trend?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string
          evidence_quotes?: string[] | null
          id?: string
          key_reasons?: string[] | null
          objective?: string
          profile_id?: string | null
          risks?: string[] | null
          suggested_actions?: string[] | null
          trend?: string | null
        }
        Relationships: []
      }
      mayoreo_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      module_permissions: {
        Row: {
          can_create: boolean | null
          can_delete: boolean | null
          can_edit: boolean | null
          can_view: boolean | null
          created_at: string | null
          id: string
          module_name: string
          role: string
        }
        Insert: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          id?: string
          module_name: string
          role: string
        }
        Update: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          id?: string
          module_name?: string
          role?: string
        }
        Relationships: []
      }
      monitors: {
        Row: {
          auth_header_name: string | null
          auth_type: string | null
          auth_value: string | null
          created_at: string
          description: string | null
          endpoint: string
          http_method: string
          id: string
          params: Json
          post_body: Json | null
          status: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auth_header_name?: string | null
          auth_type?: string | null
          auth_value?: string | null
          created_at?: string
          description?: string | null
          endpoint: string
          http_method?: string
          id?: string
          params?: Json
          post_body?: Json | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auth_header_name?: string | null
          auth_type?: string | null
          auth_value?: string | null
          created_at?: string
          description?: string | null
          endpoint?: string
          http_method?: string
          id?: string
          params?: Json
          post_body?: Json | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories_grupo_marca: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories_pushmoney: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories_viaticos: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          config: Json | null
          created_at: string | null
          enabled: boolean | null
          id: string
          name: string
          triggers: Json | null
          type: string
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          name: string
          triggers?: Json | null
          type: string
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          name?: string
          triggers?: Json | null
          type?: string
        }
        Relationships: []
      }
      nps_analyses: {
        Row: {
          company_id: string | null
          created_at: string
          error_message: string | null
          file_name: string
          file_size: number | null
          id: string
          processed_rows: number
          processing_completed_at: string | null
          processing_started_at: string | null
          status: string
          summary_stats: Json | null
          total_rows: number
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          error_message?: string | null
          file_name: string
          file_size?: number | null
          id?: string
          processed_rows?: number
          processing_completed_at?: string | null
          processing_started_at?: string | null
          status?: string
          summary_stats?: Json | null
          total_rows?: number
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          error_message?: string | null
          file_name?: string
          file_size?: number | null
          id?: string
          processed_rows?: number
          processing_completed_at?: string | null
          processing_started_at?: string | null
          status?: string
          summary_stats?: Json | null
          total_rows?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nps_analyses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "nps_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      nps_brands: {
        Row: {
          aliases: string[] | null
          company_id: string | null
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          aliases?: string[] | null
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          aliases?: string[] | null
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nps_brands_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "nps_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      nps_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      nps_comment_types: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      nps_companies: {
        Row: {
          code: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      nps_responses: {
        Row: {
          ai_confidence: number | null
          ai_reasoning: string | null
          analysis_id: string
          category_id: string | null
          comment_type_id: string | null
          created_at: string
          csat_score: number | null
          detected_brands: string[] | null
          id: string
          nps_score: number | null
          original_question: string | null
          original_suggestion: string | null
          response_date: string | null
          row_number: number
          sentiment_id: string | null
        }
        Insert: {
          ai_confidence?: number | null
          ai_reasoning?: string | null
          analysis_id: string
          category_id?: string | null
          comment_type_id?: string | null
          created_at?: string
          csat_score?: number | null
          detected_brands?: string[] | null
          id?: string
          nps_score?: number | null
          original_question?: string | null
          original_suggestion?: string | null
          response_date?: string | null
          row_number: number
          sentiment_id?: string | null
        }
        Update: {
          ai_confidence?: number | null
          ai_reasoning?: string | null
          analysis_id?: string
          category_id?: string | null
          comment_type_id?: string | null
          created_at?: string
          csat_score?: number | null
          detected_brands?: string[] | null
          id?: string
          nps_score?: number | null
          original_question?: string | null
          original_suggestion?: string | null
          response_date?: string | null
          row_number?: number
          sentiment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nps_responses_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "nps_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nps_responses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "nps_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nps_responses_comment_type_id_fkey"
            columns: ["comment_type_id"]
            isOneToOne: false
            referencedRelation: "nps_comment_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nps_responses_sentiment_id_fkey"
            columns: ["sentiment_id"]
            isOneToOne: false
            referencedRelation: "nps_sentiments"
            referencedColumns: ["id"]
          },
        ]
      }
      nps_sentiments: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      nps_suggested_actions: {
        Row: {
          action_text: string
          analysis_id: string
          category_id: string | null
          comment_type_id: string | null
          created_at: string
          frequency: number | null
          id: string
          priority: number | null
          related_brands: string[] | null
        }
        Insert: {
          action_text: string
          analysis_id: string
          category_id?: string | null
          comment_type_id?: string | null
          created_at?: string
          frequency?: number | null
          id?: string
          priority?: number | null
          related_brands?: string[] | null
        }
        Update: {
          action_text?: string
          analysis_id?: string
          category_id?: string | null
          comment_type_id?: string | null
          created_at?: string
          frequency?: number | null
          id?: string
          priority?: number | null
          related_brands?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "nps_suggested_actions_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "nps_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nps_suggested_actions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "nps_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nps_suggested_actions_comment_type_id_fkey"
            columns: ["comment_type_id"]
            isOneToOne: false
            referencedRelation: "nps_comment_types"
            referencedColumns: ["id"]
          },
        ]
      }
      olo_chat_histories: {
        Row: {
          created_at: string
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      olo_web_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      opinions: {
        Row: {
          category: string | null
          content: string
          created_at: string
          department: string
          enviado: string
          id: string
          plan: string | null
          sentiment: string
          summary: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          department: string
          enviado?: string
          id?: string
          plan?: string | null
          sentiment?: string
          summary?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          department?: string
          enviado?: string
          id?: string
          plan?: string | null
          sentiment?: string
          summary?: string | null
        }
        Relationships: []
      }
      order_lines: {
        Row: {
          created_at: string | null
          discount_amount: number
          discount_percentage: number
          id: string
          line_total: number
          order_id: string
          product_code: string
          product_id: string
          product_name: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number
          discount_percentage?: number
          id?: string
          line_total?: number
          order_id: string
          product_code: string
          product_id: string
          product_name: string
          quantity?: number
          unit_price?: number
        }
        Update: {
          created_at?: string | null
          discount_amount?: number
          discount_percentage?: number
          id?: string
          line_total?: number
          order_id?: string
          product_code?: string
          product_id?: string
          product_name?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_lines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_lines_sillaca: {
        Row: {
          created_at: string | null
          discount_amount: number
          discount_percentage: number
          id: string
          line_total: number
          order_id: string
          product_code: string
          product_id: string
          product_name: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number
          discount_percentage?: number
          id?: string
          line_total?: number
          order_id: string
          product_code: string
          product_id: string
          product_name: string
          quantity?: number
          unit_price?: number
        }
        Update: {
          created_at?: string | null
          discount_amount?: number
          discount_percentage?: number
          id?: string
          line_total?: number
          order_id?: string
          product_code?: string
          product_id?: string
          product_name?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_lines_sillaca_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string
          customer_rif: string
          discount_total: number
          id: string
          order_number: string
          processed: boolean | null
          processed_at: string | null
          processed_by: string | null
          promotion_id: string | null
          status: string
          subtotal: number
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_name: string
          customer_rif: string
          discount_total?: number
          id?: string
          order_number: string
          processed?: boolean | null
          processed_at?: string | null
          processed_by?: string | null
          promotion_id?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_name?: string
          customer_rif?: string
          discount_total?: number
          id?: string
          order_number?: string
          processed?: boolean | null
          processed_at?: string | null
          processed_by?: string | null
          promotion_id?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_sillaca: {
        Row: {
          created_at: string
          customer_name: string
          customer_rif: string
          discount_total: number
          id: string
          order_number: string
          processed: boolean | null
          processed_at: string | null
          processed_by: string | null
          promotion_id: string | null
          status: string
          subtotal: number
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_name: string
          customer_rif: string
          discount_total?: number
          id?: string
          order_number: string
          processed?: boolean | null
          processed_at?: string | null
          processed_by?: string | null
          promotion_id?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_name?: string
          customer_rif?: string
          discount_total?: number
          id?: string
          order_number?: string
          processed?: boolean | null
          processed_at?: string | null
          processed_by?: string | null
          promotion_id?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_sillaca_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      org_charts: {
        Row: {
          country_id: string | null
          created_at: string
          created_by: string | null
          department_id: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          root_employee_id: string | null
          updated_at: string
        }
        Insert: {
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          root_employee_id?: string | null
          updated_at?: string
        }
        Update: {
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          root_employee_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_charts_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_charts_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_charts_root_employee_id_fkey"
            columns: ["root_employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      personnel_requisitions: {
        Row: {
          created_at: string
          created_by: string | null
          form_data: Json
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          form_data: Json
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          form_data?: Json
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      phases: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          color: string
          created_at?: string
          id?: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      plantillas_evaluacion: {
        Row: {
          anio: number
          created_at: string | null
          descripcion: string | null
          empleado_id: string | null
          estado: string | null
          fecha_emision: string | null
          id: string
          mes: number
          nombre_gerente_rrhh: string | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          anio: number
          created_at?: string | null
          descripcion?: string | null
          empleado_id?: string | null
          estado?: string | null
          fecha_emision?: string | null
          id: string
          mes: number
          nombre_gerente_rrhh?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          anio?: number
          created_at?: string | null
          descripcion?: string | null
          empleado_id?: string | null
          estado?: string | null
          fecha_emision?: string | null
          id?: string
          mes?: number
          nombre_gerente_rrhh?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      position_levels: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          level: string
          position_id: string
          step: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          level: string
          position_id: string
          step: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          level?: string
          position_id?: string
          step?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "position_levels_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      positions: {
        Row: {
          created_at: string
          department_id: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      price_approval_items: {
        Row: {
          approval_request_id: string
          created_at: string
          current_price: number
          factors_applied: Json | null
          id: string
          new_price: number
          price_list_id: string
          product_id: string
        }
        Insert: {
          approval_request_id: string
          created_at?: string
          current_price: number
          factors_applied?: Json | null
          id?: string
          new_price: number
          price_list_id: string
          product_id: string
        }
        Update: {
          approval_request_id?: string
          created_at?: string
          current_price?: number
          factors_applied?: Json | null
          id?: string
          new_price?: number
          price_list_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_approval_items_approval_request_id_fkey"
            columns: ["approval_request_id"]
            isOneToOne: false
            referencedRelation: "price_approval_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_approval_items_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_approval_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      price_approval_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          id: string
          rejected_at: string | null
          rejection_reason: string | null
          request_type: string
          requested_by: string | null
          status: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          request_type?: string
          requested_by?: string | null
          status?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          request_type?: string
          requested_by?: string | null
          status?: string
        }
        Relationships: []
      }
      price_change_results: {
        Row: {
          change_percentage: number
          created_at: string
          current_price: number
          factors_applied: string[] | null
          id: string
          is_decrease: boolean
          new_price: number
          price_list_id: string
          product_id: string
        }
        Insert: {
          change_percentage: number
          created_at?: string
          current_price: number
          factors_applied?: string[] | null
          id?: string
          is_decrease?: boolean
          new_price: number
          price_list_id: string
          product_id: string
        }
        Update: {
          change_percentage?: number
          created_at?: string
          current_price?: number
          factors_applied?: string[] | null
          id?: string
          is_decrease?: boolean
          new_price?: number
          price_list_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_change_results_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_change_results_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      price_lists: {
        Row: {
          base_type: string
          based_on: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
          variation_percent: number | null
          zone_type: string | null
        }
        Insert: {
          base_type: string
          based_on?: string | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          variation_percent?: number | null
          zone_type?: string | null
        }
        Update: {
          base_type?: string
          based_on?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          variation_percent?: number | null
          zone_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_lists_based_on_fkey"
            columns: ["based_on"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      pricing_factors: {
        Row: {
          created_at: string
          id: string
          name: string
          operation: string
          scope: string
          type: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          operation: string
          scope: string
          type: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          operation?: string
          scope?: string
          type?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      pricing_products: {
        Row: {
          brand: string | null
          code: string
          cost: number
          created_at: string
          description: string
          factors: Json | null
          id: string
          imported: boolean
          margin: number
          origin: string | null
          supplier: string | null
          updated_at: string
        }
        Insert: {
          brand?: string | null
          code: string
          cost: number
          created_at?: string
          description: string
          factors?: Json | null
          id?: string
          imported?: boolean
          margin: number
          origin?: string | null
          supplier?: string | null
          updated_at?: string
        }
        Update: {
          brand?: string | null
          code?: string
          cost?: number
          created_at?: string
          description?: string
          factors?: Json | null
          id?: string
          imported?: boolean
          margin?: number
          origin?: string | null
          supplier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      process_phases: {
        Row: {
          phase_id: string
          process_id: string
        }
        Insert: {
          phase_id: string
          process_id: string
        }
        Update: {
          phase_id?: string
          process_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_phases_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_phases_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
        ]
      }
      processes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_factors: {
        Row: {
          created_at: string
          factor_id: string
          id: string
          product_id: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          factor_id: string
          id?: string
          product_id: string
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          factor_id?: string
          id?: string
          product_id?: string
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_factors_factor_id_fkey"
            columns: ["factor_id"]
            isOneToOne: false
            referencedRelation: "pricing_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_factors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      profile_systems: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          profile_id: string
          system_code: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          profile_id: string
          system_code: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          profile_id?: string
          system_code?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          country_id: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          position: string | null
          razon_social: string | null
          rif: string | null
          supervisor: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          country_id?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          position?: string | null
          razon_social?: string | null
          rif?: string | null
          supervisor?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          country_id?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          position?: string | null
          razon_social?: string | null
          rif?: string | null
          supervisor?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      promotion_products: {
        Row: {
          base_price: number | null
          created_at: string | null
          discount_condition: string
          id: string
          is_active: boolean | null
          product_code: string
          product_name: string
          promotion_id: string
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          created_at?: string | null
          discount_condition: string
          id?: string
          is_active?: boolean | null
          product_code: string
          product_name: string
          promotion_id: string
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          created_at?: string | null
          discount_condition?: string
          id?: string
          is_active?: boolean | null
          product_code?: string
          product_name?: string
          promotion_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotion_products_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_products_sillaca: {
        Row: {
          base_price: number | null
          created_at: string | null
          discount_condition: string
          id: string
          is_active: boolean | null
          product_code: string
          product_name: string
          promotion_id: string
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          created_at?: string | null
          discount_condition: string
          id?: string
          is_active?: boolean | null
          product_code: string
          product_name: string
          promotion_id: string
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          created_at?: string | null
          discount_condition?: string
          id?: string
          is_active?: boolean | null
          product_code?: string
          product_name?: string
          promotion_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotion_products_sillaca_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions: {
        Row: {
          brand: string
          category: string | null
          created_at: string
          description: string | null
          discount_percentage: number
          id: string
          image_url: string | null
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          brand: string
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          brand?: string
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions_sillaca: {
        Row: {
          brand: string
          category: string | null
          created_at: string
          description: string | null
          discount_percentage: number
          id: string
          image_url: string | null
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          brand: string
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          brand?: string
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      proyectos_cards: {
        Row: {
          company_logo: string
          created_at: string | null
          department: string
          description: string | null
          icon_color: string
          id: string
          is_favorite: boolean | null
          last_accessed: string | null
          title: string
          type: string
          updated_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          company_logo: string
          created_at?: string | null
          department: string
          description?: string | null
          icon_color: string
          id?: string
          is_favorite?: boolean | null
          last_accessed?: string | null
          title: string
          type: string
          updated_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          company_logo?: string
          created_at?: string | null
          department?: string
          description?: string | null
          icon_color?: string
          id?: string
          is_favorite?: boolean | null
          last_accessed?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      recruitment_processes: {
        Row: {
          created_at: string
          google_drive_folder: string | null
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          google_drive_folder?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          google_drive_folder?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      reference_files: {
        Row: {
          campaign_id: string | null
          created_at: string
          file_path: string
          file_type: string
          id: string
          title: string
          url: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          file_path: string
          file_type: string
          id?: string
          title: string
          url?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          file_path?: string
          file_type?: string
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reference_files_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      registro_venezuela: {
        Row: {
          cedula: string
          chat_id: string
          codigo: string | null
          correo: string
          empresa: string
          estado: string | null
          fecha_creacion: string
          id: number
          nombre: string
          rol: string
          telefono: string
        }
        Insert: {
          cedula: string
          chat_id: string
          codigo?: string | null
          correo: string
          empresa: string
          estado?: string | null
          fecha_creacion?: string
          id?: number
          nombre: string
          rol: string
          telefono: string
        }
        Update: {
          cedula?: string
          chat_id?: string
          codigo?: string | null
          correo?: string
          empresa?: string
          estado?: string | null
          fecha_creacion?: string
          id?: number
          nombre?: string
          rol?: string
          telefono?: string
        }
        Relationships: []
      }
      requisition_phases: {
        Row: {
          created_at: string
          id: string
          phase_id: string
          requisition_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          phase_id: string
          requisition_id: string
        }
        Update: {
          created_at?: string
          id?: string
          phase_id?: string
          requisition_id?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          departamentos: string[] | null
          description: string | null
          empresas: string[] | null
          id: string
          name: string
          tipos_documento: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          departamentos?: string[] | null
          description?: string | null
          empresas?: string[] | null
          id?: string
          name: string
          tipos_documento?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          departamentos?: string[] | null
          description?: string | null
          empresas?: string[] | null
          id?: string
          name?: string
          tipos_documento?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rutas: {
        Row: {
          DESCRIPCION: string | null
          FECHA_CREACION: string | null
          RUTA: string
        }
        Insert: {
          DESCRIPCION?: string | null
          FECHA_CREACION?: string | null
          RUTA: string
        }
        Update: {
          DESCRIPCION?: string | null
          FECHA_CREACION?: string | null
          RUTA?: string
        }
        Relationships: []
      }
      site_config: {
        Row: {
          config_key: string
          config_value: Json | null
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          config_key: string
          config_value?: Json | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          config_key?: string
          config_value?: Json | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      strategic_initiatives: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          level: string
          parent_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level: string
          parent_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: string
          parent_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "strategic_initiatives_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategic_initiatives_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "strategic_initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_goals: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      strategy_initiatives: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          is_important: boolean | null
          is_urgent: boolean | null
          macro_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string
          is_important?: boolean | null
          is_urgent?: boolean | null
          macro_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          is_important?: boolean | null
          is_urgent?: boolean | null
          macro_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_initiatives_macro_id_fkey"
            columns: ["macro_id"]
            isOneToOne: false
            referencedRelation: "strategy_macro_initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_kpis: {
        Row: {
          created_at: string | null
          id: string
          initiative_id: string
          metric: string
          target: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          initiative_id: string
          metric: string
          target?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          initiative_id?: string
          metric?: string
          target?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_kpis_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "strategy_initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_macro_initiatives: {
        Row: {
          created_at: string | null
          goal_id: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          goal_id: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          goal_id?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_macro_initiatives_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "strategy_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_actions: {
        Row: {
          action_text: string
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          due_date: string | null
          id: string
          organization_id: string
          priority: string | null
          response_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          action_text: string
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          id?: string
          organization_id: string
          priority?: string | null
          response_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          action_text?: string
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          id?: string
          organization_id?: string
          priority?: string | null
          response_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_actions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_actions_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_batches: {
        Row: {
          created_at: string
          created_by: string | null
          file_name: string | null
          id: string
          name: string
          organization_id: string
          processed_responses: number | null
          status: string | null
          total_responses: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_name?: string | null
          id?: string
          name: string
          organization_id: string
          processed_responses?: number | null
          status?: string | null
          total_responses?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_name?: string | null
          id?: string
          name?: string
          organization_id?: string
          processed_responses?: number | null
          status?: string | null
          total_responses?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_batches_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_brands: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_brands_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          keywords: string[] | null
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_categories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_classification_history: {
        Row: {
          action_type: string
          created_at: string
          id: string
          new_category_id: string | null
          new_confidence: number | null
          new_subcategory_id: string | null
          organization_id: string
          performed_by: string | null
          previous_category_id: string | null
          previous_confidence: number | null
          previous_subcategory_id: string | null
          response_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          id?: string
          new_category_id?: string | null
          new_confidence?: number | null
          new_subcategory_id?: string | null
          organization_id: string
          performed_by?: string | null
          previous_category_id?: string | null
          previous_confidence?: number | null
          previous_subcategory_id?: string | null
          response_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          id?: string
          new_category_id?: string | null
          new_confidence?: number | null
          new_subcategory_id?: string | null
          organization_id?: string
          performed_by?: string | null
          previous_category_id?: string | null
          previous_confidence?: number | null
          previous_subcategory_id?: string | null
          response_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_classification_history_new_category_id_fkey"
            columns: ["new_category_id"]
            isOneToOne: false
            referencedRelation: "survey_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_classification_history_new_subcategory_id_fkey"
            columns: ["new_subcategory_id"]
            isOneToOne: false
            referencedRelation: "survey_subcategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_classification_history_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_classification_history_previous_category_id_fkey"
            columns: ["previous_category_id"]
            isOneToOne: false
            referencedRelation: "survey_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_classification_history_previous_subcategory_id_fkey"
            columns: ["previous_subcategory_id"]
            isOneToOne: false
            referencedRelation: "survey_subcategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_classification_history_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_organizations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      survey_product_categories: {
        Row: {
          brand_id: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          brand_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          brand_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_product_categories_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "survey_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_product_categories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          organization_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          organization_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          organization_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          batch_id: string | null
          brand_id: string | null
          category_id: string | null
          classification_status: string | null
          confidence_score: number | null
          created_at: string
          created_by: string | null
          flagged_for_review: boolean | null
          id: string
          is_manually_edited: boolean | null
          metadata: Json | null
          organization_id: string
          original_date: string | null
          product_category_id: string | null
          response_text: string
          sentiment: string | null
          subcategory_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          batch_id?: string | null
          brand_id?: string | null
          category_id?: string | null
          classification_status?: string | null
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          flagged_for_review?: boolean | null
          id?: string
          is_manually_edited?: boolean | null
          metadata?: Json | null
          organization_id: string
          original_date?: string | null
          product_category_id?: string | null
          response_text: string
          sentiment?: string | null
          subcategory_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          batch_id?: string | null
          brand_id?: string | null
          category_id?: string | null
          classification_status?: string | null
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          flagged_for_review?: boolean | null
          id?: string
          is_manually_edited?: boolean | null
          metadata?: Json | null
          organization_id?: string
          original_date?: string | null
          product_category_id?: string | null
          response_text?: string
          sentiment?: string | null
          subcategory_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "survey_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "survey_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "survey_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_product_category_id_fkey"
            columns: ["product_category_id"]
            isOneToOne: false
            referencedRelation: "survey_product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "survey_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_subcategories: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          keywords: string[] | null
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "survey_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_subcategories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_user_roles: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["org_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["org_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["org_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "survey_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sysdiagrams_dbo: {
        Row: {
          definition: string | null
          diagram_id: number
          name: string
          principal_id: number
          version: number | null
        }
        Insert: {
          definition?: string | null
          diagram_id: number
          name: string
          principal_id: number
          version?: number | null
        }
        Update: {
          definition?: string | null
          diagram_id?: number
          name?: string
          principal_id?: number
          version?: number | null
        }
        Relationships: []
      }
      system_users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_active?: boolean | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      systems: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          github_repo_url: string | null
          id: string
          is_active: boolean
          name: string
          provider: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          github_repo_url?: string | null
          id?: string
          is_active?: boolean
          name: string
          provider?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          github_repo_url?: string | null
          id?: string
          is_active?: boolean
          name?: string
          provider?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tabla_sillaca_gm: {
        Row: {
          Columnas: string | null
          Escala: string | null
          Longitud: string | null
          PermiteNulos: string | null
          Precision: string | null
          Tablas: string | null
          TipoDatos: string | null
        }
        Insert: {
          Columnas?: string | null
          Escala?: string | null
          Longitud?: string | null
          PermiteNulos?: string | null
          Precision?: string | null
          Tablas?: string | null
          TipoDatos?: string | null
        }
        Update: {
          Columnas?: string | null
          Escala?: string | null
          Longitud?: string | null
          PermiteNulos?: string | null
          Precision?: string | null
          Tablas?: string | null
          TipoDatos?: string | null
        }
        Relationships: []
      }
      tariff_categories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      tariff_classifications: {
        Row: {
          categoria: string
          created_at: string
          descripcion_mercaderia: string | null
          id: string
          identifier: string
          identifier_item: string
          posicion_arancelaria: string | null
          reasoning: string | null
          subcategoria: string
          updated_at: string
        }
        Insert: {
          categoria: string
          created_at?: string
          descripcion_mercaderia?: string | null
          id?: string
          identifier: string
          identifier_item: string
          posicion_arancelaria?: string | null
          reasoning?: string | null
          subcategoria: string
          updated_at?: string
        }
        Update: {
          categoria?: string
          created_at?: string
          descripcion_mercaderia?: string | null
          id?: string
          identifier?: string
          identifier_item?: string
          posicion_arancelaria?: string | null
          reasoning?: string | null
          subcategoria?: string
          updated_at?: string
        }
        Relationships: []
      }
      tariff_subcategories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      task_links: {
        Row: {
          change_request_id: string
          created_at: string
          external_system: string
          external_task_id: string
          id: string
          task_title: string | null
          task_url: string | null
        }
        Insert: {
          change_request_id: string
          created_at?: string
          external_system: string
          external_task_id: string
          id?: string
          task_title?: string | null
          task_url?: string | null
        }
        Update: {
          change_request_id?: string
          created_at?: string
          external_system?: string
          external_task_id?: string
          id?: string
          task_title?: string | null
          task_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_links_change_request_id_fkey"
            columns: ["change_request_id"]
            isOneToOne: false
            referencedRelation: "change_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_attachments: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          ticket_id: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          ticket_id: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          ticket_id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_attachments_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_audit_log: {
        Row: {
          action: string
          id: string
          new_value: string | null
          old_value: string | null
          ticket_id: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          ticket_id: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          ticket_id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_audit_log_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ticket_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_responses: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_internal: boolean | null
          ticket_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          ticket_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_responses_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_statuses: {
        Row: {
          color: string
          created_at: string | null
          id: string
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string
          created_at?: string | null
          id?: string
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assigned_at: string | null
          assigned_to: string | null
          category_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          extracted_data: Json | null
          id: string
          priority: string
          resolved_at: string | null
          source: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_to?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          extracted_data?: Json | null
          id?: string
          priority?: string
          resolved_at?: string | null
          source?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_to?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          extracted_data?: Json | null
          id?: string
          priority?: string
          resolved_at?: string | null
          source?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ticket_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ubicaciones_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      user_company_access: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_company_access_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_country_access: {
        Row: {
          country_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          country_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          country_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_country_access_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_management: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          dm_rol_id: number | null
          dm_usuario: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dm_rol_id?: number | null
          dm_usuario?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          dm_rol_id?: number | null
          dm_usuario?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_visual: {
        Row: {
          Administrador: boolean | null
          created_at: string
          department: string | null
          email: string
          encrypted_password: string | null
          full_name: string
          id: string
          is_active: boolean
          last_login: string | null
          role: string
          roles: string[] | null
          updated_at: string
        }
        Insert: {
          Administrador?: boolean | null
          created_at?: string
          department?: string | null
          email: string
          encrypted_password?: string | null
          full_name: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          role?: string
          roles?: string[] | null
          updated_at?: string
        }
        Update: {
          Administrador?: boolean | null
          created_at?: string
          department?: string | null
          email?: string
          encrypted_password?: string | null
          full_name?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          role?: string
          roles?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      user_visual_fav_docs: {
        Row: {
          created_at: string | null
          documento_empresa: string | null
          documento_link: string
          documento_nombre: string
          documento_silo: string | null
          documento_tipo: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          documento_empresa?: string | null
          documento_link: string
          documento_nombre: string
          documento_silo?: string | null
          documento_tipo?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          documento_empresa?: string | null
          documento_link?: string
          documento_nombre?: string
          documento_silo?: string | null
          documento_tipo?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_visual_last_docs: {
        Row: {
          accessed_at: string | null
          documento_empresa: string | null
          documento_link: string
          documento_nombre: string
          documento_silo: string | null
          documento_tipo: string | null
          id: string
          user_id: string
        }
        Insert: {
          accessed_at?: string | null
          documento_empresa?: string | null
          documento_link: string
          documento_nombre: string
          documento_silo?: string | null
          documento_tipo?: string | null
          id?: string
          user_id: string
        }
        Update: {
          accessed_at?: string | null
          documento_empresa?: string | null
          documento_link?: string
          documento_nombre?: string
          documento_silo?: string | null
          documento_tipo?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_visual_roles: {
        Row: {
          created_at: string
          description: string | null
          empresas: string[] | null
          id: string
          name: string
          silos: string[] | null
          tipos_doc: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          empresas?: string[] | null
          id?: string
          name: string
          silos?: string[] | null
          tipos_doc?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          empresas?: string[] | null
          id?: string
          name?: string
          silos?: string[] | null
          tipos_doc?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string | null
          name?: string | null
        }
        Relationships: []
      }
      v_apply_all_steps: {
        Row: {
          apply_all_steps: boolean | null
        }
        Insert: {
          apply_all_steps?: boolean | null
        }
        Update: {
          apply_all_steps?: boolean | null
        }
        Relationships: []
      }
      v_monthly_data: {
        Row: {
          activated_customers: number | null
          activated_skus: number | null
          base_salary: number | null
          codigo_vendedor: string | null
          collaborator_id: string | null
          collected_0_30_usd: number | null
          collected_31_45_usd: number | null
          collected_45_plus_usd: number | null
          collection_budget: number | null
          collection_percentage: number | null
          end_date: string | null
          lines_sold: number | null
          period_id: number | null
          period_name: string | null
          sales_budget: number | null
          sales_percentage: number | null
          start_date: string | null
          superavit: number | null
          total_collected_local: number | null
          total_collected_usd: number | null
          total_sales_usd: number | null
          units_sold: number | null
        }
        Insert: {
          activated_customers?: number | null
          activated_skus?: number | null
          base_salary?: number | null
          codigo_vendedor?: string | null
          collaborator_id?: string | null
          collected_0_30_usd?: number | null
          collected_31_45_usd?: number | null
          collected_45_plus_usd?: number | null
          collection_budget?: number | null
          collection_percentage?: number | null
          end_date?: string | null
          lines_sold?: number | null
          period_id?: number | null
          period_name?: string | null
          sales_budget?: number | null
          sales_percentage?: number | null
          start_date?: string | null
          superavit?: number | null
          total_collected_local?: number | null
          total_collected_usd?: number | null
          total_sales_usd?: number | null
          units_sold?: number | null
        }
        Update: {
          activated_customers?: number | null
          activated_skus?: number | null
          base_salary?: number | null
          codigo_vendedor?: string | null
          collaborator_id?: string | null
          collected_0_30_usd?: number | null
          collected_31_45_usd?: number | null
          collected_45_plus_usd?: number | null
          collection_budget?: number | null
          collection_percentage?: number | null
          end_date?: string | null
          lines_sold?: number | null
          period_id?: number | null
          period_name?: string | null
          sales_budget?: number | null
          sales_percentage?: number | null
          start_date?: string | null
          superavit?: number | null
          total_collected_local?: number | null
          total_collected_usd?: number | null
          total_sales_usd?: number | null
          units_sold?: number | null
        }
        Relationships: []
      }
      v_rule_version: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string | null
          is_active: boolean | null
          name: string | null
          rule_id: string | null
          updated_at: string | null
          version_number: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string | null
          is_active?: boolean | null
          name?: string | null
          rule_id?: string | null
          updated_at?: string | null
          version_number?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string | null
          is_active?: boolean | null
          name?: string | null
          rule_id?: string | null
          updated_at?: string | null
          version_number?: number | null
        }
        Relationships: []
      }
      v_variable: {
        Row: {
          variable: string | null
        }
        Insert: {
          variable?: string | null
        }
        Update: {
          variable?: string | null
        }
        Relationships: []
      }
      vendor_tracking_accompaniments: {
        Row: {
          accompaniment_date: string
          areas_to_improve: string | null
          catalog_item_id: string | null
          clients_visited: number | null
          commitments: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          location: string | null
          objectives_met: boolean | null
          observations: string | null
          strengths: string | null
          supervisor_id: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          accompaniment_date: string
          areas_to_improve?: string | null
          catalog_item_id?: string | null
          clients_visited?: number | null
          commitments?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          location?: string | null
          objectives_met?: boolean | null
          observations?: string | null
          strengths?: string | null
          supervisor_id?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          accompaniment_date?: string
          areas_to_improve?: string | null
          catalog_item_id?: string | null
          clients_visited?: number | null
          commitments?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          location?: string | null
          objectives_met?: boolean | null
          observations?: string | null
          strengths?: string | null
          supervisor_id?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_tracking_accompaniments_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_accompaniments_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_accompaniments_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_tracking_catalog_items: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          type: Database["public"]["Enums"]["catalog_item_type"]
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          type: Database["public"]["Enums"]["catalog_item_type"]
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          type?: Database["public"]["Enums"]["catalog_item_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_tracking_catalog_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_tracking_companies: {
        Row: {
          created_at: string
          id: string
          logo: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      vendor_tracking_meetings: {
        Row: {
          catalog_item_id: string | null
          commitments: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          meeting_date: string
          notes: string | null
          objectives: string | null
          objectives_met: boolean | null
          supervisor_id: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          catalog_item_id?: string | null
          commitments?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          meeting_date: string
          notes?: string | null
          objectives?: string | null
          objectives_met?: boolean | null
          supervisor_id?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          catalog_item_id?: string | null
          commitments?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          meeting_date?: string
          notes?: string | null
          objectives?: string | null
          objectives_met?: boolean | null
          supervisor_id?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_tracking_meetings_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_meetings_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_meetings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_tracking_phase_requirements: {
        Row: {
          catalog_item_id: string
          created_at: string
          id: string
          is_blocking: boolean
          phase_id: string
          target_quantity: number
          updated_at: string
          weight: number
        }
        Insert: {
          catalog_item_id: string
          created_at?: string
          id?: string
          is_blocking?: boolean
          phase_id: string
          target_quantity?: number
          updated_at?: string
          weight?: number
        }
        Update: {
          catalog_item_id?: string
          created_at?: string
          id?: string
          is_blocking?: boolean
          phase_id?: string
          target_quantity?: number
          updated_at?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "vendor_tracking_phase_requirements_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_phase_requirements_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_tracking_phases: {
        Row: {
          company_id: string
          created_at: string
          day_end: number
          day_start: number
          id: string
          name: string
          sort_order: number
          target_score_green: number
          target_score_yellow: number
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          day_end: number
          day_start: number
          id?: string
          name: string
          sort_order?: number
          target_score_green?: number
          target_score_yellow?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          day_end?: number
          day_start?: number
          id?: string
          name?: string
          sort_order?: number
          target_score_green?: number
          target_score_yellow?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_tracking_phases_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_tracking_trainings: {
        Row: {
          catalog_item_id: string
          completed_at: string | null
          created_at: string
          description: string | null
          evidence_url: string | null
          id: string
          passed: boolean | null
          score: number | null
          title: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          catalog_item_id: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          evidence_url?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          title: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          catalog_item_id?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          evidence_url?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          title?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_tracking_trainings_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_trainings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_tracking_vendor_progress: {
        Row: {
          actual_value: number | null
          catalog_item_id: string
          completed_at: string
          completed_quantity: number
          created_at: string
          id: string
          notes: string | null
          phase_id: string
          target_value: number | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          actual_value?: number | null
          catalog_item_id: string
          completed_at?: string
          completed_quantity?: number
          created_at?: string
          id?: string
          notes?: string | null
          phase_id: string
          target_value?: number | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          actual_value?: number | null
          catalog_item_id?: string
          completed_at?: string
          completed_quantity?: number
          created_at?: string
          id?: string
          notes?: string | null
          phase_id?: string
          target_value?: number | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_tracking_vendor_progress_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_vendor_progress_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_vendor_progress_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_tracking_vendors: {
        Row: {
          avatar: string | null
          company_id: string
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          name: string
          start_date: string
          supervisor_id: string | null
          supervisor_name: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          company_id: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          start_date?: string
          supervisor_id?: string | null
          supervisor_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          company_id?: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          start_date?: string
          supervisor_id?: string | null
          supervisor_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_supervisor"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_tracking_vendors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "vendor_tracking_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ventas_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      viaticos_olo: {
        Row: {
          clasificacion: string | null
          created_at: string
          descripcion: string | null
          fecha_factura: string | null
          id: number
          impuesto: number | null
          monto_factura: number | null
          numero_factura: string | null
          proveedor: string | null
          usuario: string | null
        }
        Insert: {
          clasificacion?: string | null
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Update: {
          clasificacion?: string | null
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Relationships: []
      }
      VIEW_OBT_EMPLEADOS_MUNDIAL: {
        Row: {
          ACTIVO: string | null
          ANIOS_ORGANIZACION: number | null
          CIA: string | null
          CIA_CODIGO: string | null
          DEPARTAMENTO: string | null
          DEPARTAMENTO_DESCRIPCION: string | null
          E_MAIL: string | null
          EDAD: number | null
          EMPLEADO: string | null
          FECHA_INGRESO: string | null
          FECHA_NACIMIENTO: string | null
          FOTOGRAFIA: string | null
          IDENTIFICACION: string | null
          NOMBRE: string | null
          NOMBRE_PILA: string | null
          PAIS: string | null
          PAIS_CODIGO: string | null
          PRIMER_APELLIDO: string | null
          PUESTO: string | null
          PUESTO_DESCRIPCION: string | null
          SEGUNDO_APELLIDO: string | null
          SEXO: string | null
          U_ESTADO_WEB: string | null
          U_NIVEL_ORGANIZACIONAL: string | null
          U_PASO_SALARIAL: string | null
          U_PS_BIOGRAFIA: string | null
          U_PS_DESARROLLO: number | null
          U_PS_MOVILIDAD: number | null
          U_PS_PASO1: string | null
          U_PS_PASO2: string | null
          U_PS_PASO3: string | null
          U_PS_RAMO: string | null
          U_PS_SILO: string | null
        }
        Insert: {
          ACTIVO?: string | null
          ANIOS_ORGANIZACION?: number | null
          CIA?: string | null
          CIA_CODIGO?: string | null
          DEPARTAMENTO?: string | null
          DEPARTAMENTO_DESCRIPCION?: string | null
          E_MAIL?: string | null
          EDAD?: number | null
          EMPLEADO?: string | null
          FECHA_INGRESO?: string | null
          FECHA_NACIMIENTO?: string | null
          FOTOGRAFIA?: string | null
          IDENTIFICACION?: string | null
          NOMBRE?: string | null
          NOMBRE_PILA?: string | null
          PAIS?: string | null
          PAIS_CODIGO?: string | null
          PRIMER_APELLIDO?: string | null
          PUESTO?: string | null
          PUESTO_DESCRIPCION?: string | null
          SEGUNDO_APELLIDO?: string | null
          SEXO?: string | null
          U_ESTADO_WEB?: string | null
          U_NIVEL_ORGANIZACIONAL?: string | null
          U_PASO_SALARIAL?: string | null
          U_PS_BIOGRAFIA?: string | null
          U_PS_DESARROLLO?: number | null
          U_PS_MOVILIDAD?: number | null
          U_PS_PASO1?: string | null
          U_PS_PASO2?: string | null
          U_PS_PASO3?: string | null
          U_PS_RAMO?: string | null
          U_PS_SILO?: string | null
        }
        Update: {
          ACTIVO?: string | null
          ANIOS_ORGANIZACION?: number | null
          CIA?: string | null
          CIA_CODIGO?: string | null
          DEPARTAMENTO?: string | null
          DEPARTAMENTO_DESCRIPCION?: string | null
          E_MAIL?: string | null
          EDAD?: number | null
          EMPLEADO?: string | null
          FECHA_INGRESO?: string | null
          FECHA_NACIMIENTO?: string | null
          FOTOGRAFIA?: string | null
          IDENTIFICACION?: string | null
          NOMBRE?: string | null
          NOMBRE_PILA?: string | null
          PAIS?: string | null
          PAIS_CODIGO?: string | null
          PRIMER_APELLIDO?: string | null
          PUESTO?: string | null
          PUESTO_DESCRIPCION?: string | null
          SEGUNDO_APELLIDO?: string | null
          SEXO?: string | null
          U_ESTADO_WEB?: string | null
          U_NIVEL_ORGANIZACIONAL?: string | null
          U_PASO_SALARIAL?: string | null
          U_PS_BIOGRAFIA?: string | null
          U_PS_DESARROLLO?: number | null
          U_PS_MOVILIDAD?: number | null
          U_PS_PASO1?: string | null
          U_PS_PASO2?: string | null
          U_PS_PASO3?: string | null
          U_PS_RAMO?: string | null
          U_PS_SILO?: string | null
        }
        Relationships: []
      }
      work_experience: {
        Row: {
          candidate_id: string
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          position: string
          start_date: string | null
        }
        Insert: {
          candidate_id: string
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position: string
          start_date?: string | null
        }
        Update: {
          candidate_id?: string
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_experience_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_regla_maestro: {
        Args: { p_rule_id: string; p_user_email: string }
        Returns: boolean
      }
      assign_regla_to_empleados: {
        Args: {
          p_compania: string
          p_empleado_codigos: string[]
          p_fecha_fin_vigencia?: string
          p_fecha_inicio_vigencia?: string
          p_regla_id: string
          p_usuario_asignacion?: string
        }
        Returns: number
      }
      create_indicador: {
        Args: {
          p_activo?: boolean
          p_categoria: string
          p_codigo: string
          p_descripcion: string
          p_nombre: string
          p_tipo_dato: string
        }
        Returns: string
      }
      create_regla_completa: {
        Args: {
          p_acciones: Json
          p_compania: string
          p_condiciones: Json
          p_created_by: string
          p_descripcion: string
          p_nombre: string
        }
        Returns: string
      }
      create_regla_con_componentes: {
        Args: {
          p_acciones?: Json
          p_compania: string
          p_componentes: Json
          p_condiciones?: Json
          p_created_by?: string
          p_descripcion: string
          p_nombre: string
        }
        Returns: string
      }
      create_regla_maestro:
        | {
            Args: {
              p_calculos: Json
              p_compania: string
              p_condicion_1: Json
              p_created_by: string
              p_descripcion: string
              p_nombre: string
            }
            Returns: string
          }
        | {
            Args: {
              p_compania: string
              p_condicion_1: string
              p_condicion_2: string
              p_created_by: string
              p_descripcion: string
              p_nombre: string
            }
            Returns: string
          }
      create_user_admin:
        | {
            Args: {
              p_department?: string
              p_email: string
              p_full_name: string
              p_password: string
              p_role: string
            }
            Returns: string
          }
        | {
            Args: {
              p_administrador?: boolean
              p_department?: string
              p_email: string
              p_full_name: string
              p_password: string
              p_role: string
            }
            Returns: string
          }
      delete_indicador: { Args: { p_id: string }; Returns: boolean }
      exec_sql: { Args: { query: string }; Returns: undefined }
      generate_order_number: { Args: never; Returns: string }
      get_all_management_users: {
        Args: never
        Returns: {
          department: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          is_approved: boolean
          permissions: string[]
          role: string
        }[]
      }
      get_colaboradores_data: {
        Args: never
        Returns: {
          activo: boolean
          codigo: string
          departamento: string
          email: string
          fecha_ingreso: string
          id: string
          nombre_completo: string
          puesto: string
        }[]
      }
      get_current_user_role: { Args: never; Returns: string }
      get_dm_rol_id: { Args: { _user_id: string }; Returns: number }
      get_dm_usuario: { Args: { _user_id: string }; Returns: string }
      get_indicadores_activos: {
        Args: never
        Returns: {
          activo: boolean
          categoria: string
          codigo: string
          descripcion: string
          id: string
          nombre: string
          tipo_dato: string
        }[]
      }
      get_regla_completa: { Args: { p_regla_id: string }; Returns: Json }
      get_regla_con_componentes: { Args: { p_regla_id: string }; Returns: Json }
      get_reglas_asignadas: {
        Args: never
        Returns: {
          compania: string
          empleado_codigo: string
          estado: string
          fecha_asignacion: string
          fecha_fin_vigencia: string
          fecha_inicio_vigencia: string
          id: string
          observaciones: string
          regla_nombre: string
          regla_version: string
          regla_version_id: string
          usuario_asignacion: string
        }[]
      }
      get_reglas_maestro: {
        Args: never
        Returns: {
          created_at: string
          descripcion: string
          estado: string
          fecha_vigencia_fin: string
          fecha_vigencia_inicio: string
          id: string
          nombre: string
          prioridad: number
          version: string
        }[]
      }
      get_survey_user_org_id: { Args: never; Returns: string }
      get_user_by_auth_id: {
        Args: { user_auth_id: string }
        Returns: {
          department: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          is_approved: boolean
          permissions: string[]
          role: string
        }[]
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      get_users_by_emails: {
        Args: { emails: string[] }
        Returns: {
          email: string
          id: string
        }[]
      }
      get_vendedores_data: {
        Args: never
        Returns: {
          ACTIVO: string
          COMPANIA: string
          DEPARTAMENTO: number
          E_MAIL: string
          EMPLEADO: number
          FECHA_INGRESO: string
          FECHA_NACIMIENTO: string
          FECHA_SALIDA: string
          IDENTIFICACION: number
          MONEDA: string
          NOMBRE_PILA: string
          NOMINA: string
          PAIS: number
          PRIMER_APELLIDO: string
          SALARIO_REFERENCIA: number
          SEGUNDO_APELLIDO: string
          SEXO: string
          U_TIPO_ESCALA: string
          UBICACION: string
        }[]
      }
      has_module_permission: {
        Args: { _module: string; _permission: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_survey_org_admin: { Args: { target_org_id: string }; Returns: boolean }
      is_survey_org_member: {
        Args: { target_org_id: string }
        Returns: boolean
      }
      match_articulos_beval: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_articulos_febeca: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_articulos_sillaca: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_beval: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_cofersa: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_febeca: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_sillaca: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_culture: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_culture2: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_aida: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_aida_test: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_logistica: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_mayoreo: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_olo: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_personal: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_errores_vectorizados: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_fichas: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_fichas_tecnicas: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_flujos: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_flujos_local: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_product_images: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      remove_regla_asignacion: {
        Args: { p_assignment_id: string }
        Returns: boolean
      }
      sync_dm_user_role: {
        Args: never
        Returns: {
          dm_rol_id: number
          dm_usuario: string
          role: Database["public"]["Enums"]["app_role"]
        }[]
      }
      update_indicador: {
        Args: {
          p_activo: boolean
          p_categoria: string
          p_codigo: string
          p_descripcion: string
          p_id: string
          p_nombre: string
          p_tipo_dato: string
        }
        Returns: boolean
      }
      update_user_department: {
        Args: { new_department: string; user_id: string }
        Returns: boolean
      }
      update_user_role: {
        Args: { new_role: string; user_id: string }
        Returns: boolean
      }
      update_user_status: {
        Args: { field_name: string; field_value: boolean; user_id: string }
        Returns: boolean
      }
      user_has_company_access: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      user_has_country_access: {
        Args: { _country_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "administracion_ventas"
        | "cliente"
        | "personal"
        | "gerente_ventas"
        | "super_admin"
        | "admin_basico"
        | "gerente"
        | "jefe"
        | "evaluador"
      approval_status: "pending" | "approved" | "rejected"
      catalog_item_type:
        | "training"
        | "meeting"
        | "accompaniment"
        | "kpi"
        | "test"
      order_status: "pending" | "approved" | "rejected" | "partial_approval"
      org_role: "admin" | "user"
      permission_type: "read" | "write" | "admin"
      resource_type: "application" | "report" | "norm" | "process"
      survey_sentiment: "positive" | "negative" | "neutral" | "mixed"
      traffic_light_status: "green" | "yellow" | "red"
      user_role:
        | "director"
        | "compras"
        | "gerente"
        | "supervisor"
        | "admin"
        | "responsable_comercial"
        | "usuario"
        | "admin_ventas"
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
      app_role: [
        "admin",
        "administracion_ventas",
        "cliente",
        "personal",
        "gerente_ventas",
        "super_admin",
        "admin_basico",
        "gerente",
        "jefe",
        "evaluador",
      ],
      approval_status: ["pending", "approved", "rejected"],
      catalog_item_type: [
        "training",
        "meeting",
        "accompaniment",
        "kpi",
        "test",
      ],
      order_status: ["pending", "approved", "rejected", "partial_approval"],
      org_role: ["admin", "user"],
      permission_type: ["read", "write", "admin"],
      resource_type: ["application", "report", "norm", "process"],
      survey_sentiment: ["positive", "negative", "neutral", "mixed"],
      traffic_light_status: ["green", "yellow", "red"],
      user_role: [
        "director",
        "compras",
        "gerente",
        "supervisor",
        "admin",
        "responsable_comercial",
        "usuario",
        "admin_ventas",
      ],
    },
  },
} as const
