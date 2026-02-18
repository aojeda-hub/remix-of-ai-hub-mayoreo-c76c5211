-- Create Schema if not exists
CREATE SCHEMA IF NOT EXISTS iniciativas;

-- Types (Idempotent creation)
DO $$ BEGIN
    CREATE TYPE iniciativas.initiative_status AS ENUM ('en_revision', 'aprobado', 'en_progreso', 'completado', 'rechazado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE iniciativas.initiative_impact AS ENUM ('high', 'medium', 'low');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE iniciativas.initiative_silo AS ENUM ('compras', 'control', 'logistica', 'ventas', 'mercadeo', 'personal', 'sistemas');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Countries Table (Normalized)
CREATE TABLE IF NOT EXISTS iniciativas.countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Companies Table (Normalized)
CREATE TABLE IF NOT EXISTS iniciativas.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Profiles Table
CREATE TABLE IF NOT EXISTS iniciativas.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Initiatives Table (Normalized)
CREATE TABLE IF NOT EXISTS iniciativas.initiatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project TEXT NOT NULL DEFAULT '',
  technology TEXT NOT NULL DEFAULT '',
  responsible TEXT NOT NULL DEFAULT '',
  silo iniciativas.initiative_silo NOT NULL,
  impact iniciativas.initiative_impact NOT NULL,
  status iniciativas.initiative_status NOT NULL DEFAULT 'en_revision',
  effort iniciativas.initiative_impact DEFAULT NULL,
  hours_saved NUMERIC DEFAULT 0,
  problem TEXT DEFAULT '',
  description TEXT DEFAULT '',
  link TEXT DEFAULT '',
  source TEXT NOT NULL DEFAULT 'manual',
  strategic_objective TEXT NOT NULL DEFAULT '',
  department TEXT NOT NULL DEFAULT '',
  ai_solution TEXT DEFAULT '',
  company_id UUID REFERENCES iniciativas.companies(id) ON DELETE SET NULL,
  country_id UUID REFERENCES iniciativas.countries(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ensure columns exist in case table was created by a previous migration without them
DO $$ BEGIN
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES iniciativas.companies(id) ON DELETE SET NULL;
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES iniciativas.countries(id) ON DELETE SET NULL;
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS strategic_objective TEXT NOT NULL DEFAULT '';
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS department TEXT NOT NULL DEFAULT '';
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS ai_solution TEXT DEFAULT '';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;


-- 5. Accompaniment Requests
CREATE TABLE IF NOT EXISTS iniciativas.accompaniment_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'media',
  status TEXT NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Community Posts
CREATE TABLE IF NOT EXISTS iniciativas.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL DEFAULT 'preguntas_tecnicas',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Community Comments
CREATE TABLE IF NOT EXISTS iniciativas.community_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES iniciativas.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. Community Reactions
CREATE TABLE IF NOT EXISTS iniciativas.community_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES iniciativas.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reaction TEXT NOT NULL DEFAULT '👍',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id, reaction)
);

-- 9. Favorites
CREATE TABLE IF NOT EXISTS iniciativas.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  initiative_id UUID REFERENCES iniciativas.initiatives(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, initiative_id)
);

-- 10. Library Resources
CREATE TABLE IF NOT EXISTS iniciativas.library_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'guia',
  file_url TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 11. Notifications
CREATE TABLE IF NOT EXISTS iniciativas.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  initiative_id UUID REFERENCES iniciativas.initiatives(id) ON DELETE CASCADE,
  initiative_name TEXT NOT NULL DEFAULT '',
  from_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  from_user_name TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'help_offer',
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for all tables
ALTER TABLE iniciativas.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.accompaniment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.community_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.library_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas.notifications ENABLE ROW LEVEL SECURITY;

-- 12. Updated_at trigger function
CREATE OR REPLACE FUNCTION iniciativas.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON iniciativas.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON iniciativas.profiles FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();

DROP TRIGGER IF EXISTS update_initiatives_updated_at ON iniciativas.initiatives;
CREATE TRIGGER update_initiatives_updated_at BEFORE UPDATE ON iniciativas.initiatives FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();

DROP TRIGGER IF EXISTS update_accompaniment_requests_updated_at ON iniciativas.accompaniment_requests;
CREATE TRIGGER update_accompaniment_requests_updated_at BEFORE UPDATE ON iniciativas.accompaniment_requests FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();

DROP TRIGGER IF EXISTS update_community_posts_updated_at ON iniciativas.community_posts;
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON iniciativas.community_posts FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();

-- 13. Row Level Security Policies

-- Countries/Companies: Read for all authenticated
CREATE POLICY "Anyone authenticated can view countries" ON iniciativas.countries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone authenticated can view companies" ON iniciativas.companies FOR SELECT TO authenticated USING (true);

-- Profiles
CREATE POLICY "Users can view all profiles" ON iniciativas.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON iniciativas.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON iniciativas.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Initiatives
CREATE POLICY "Anyone authenticated can view initiatives" ON iniciativas.initiatives FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create initiatives" ON iniciativas.initiatives FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own initiatives" ON iniciativas.initiatives FOR UPDATE TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "Users can delete own initiatives" ON iniciativas.initiatives FOR DELETE TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "Webhook can insert initiatives" ON iniciativas.initiatives FOR INSERT TO anon WITH CHECK (source = 'webhook');

-- Community Posts
CREATE POLICY "Anyone authenticated can view posts" ON iniciativas.community_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create posts" ON iniciativas.community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON iniciativas.community_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON iniciativas.community_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Community Comments
CREATE POLICY "Anyone authenticated can view comments" ON iniciativas.community_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create comments" ON iniciativas.community_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON iniciativas.community_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Community Reactions
CREATE POLICY "Anyone authenticated can view reactions" ON iniciativas.community_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create reactions" ON iniciativas.community_reactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own reactions" ON iniciativas.community_reactions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Favorites
CREATE POLICY "Users can view own favorites" ON iniciativas.favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON iniciativas.favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON iniciativas.favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Library Resources
CREATE POLICY "Anyone authenticated can view resources" ON iniciativas.library_resources FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create resources" ON iniciativas.library_resources FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resources" ON iniciativas.library_resources FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resources" ON iniciativas.library_resources FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Accompaniment Requests
CREATE POLICY "Users can view own requests" ON iniciativas.accompaniment_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create requests" ON iniciativas.accompaniment_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own requests" ON iniciativas.accompaniment_requests FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON iniciativas.notifications FOR SELECT TO authenticated USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));
CREATE POLICY "Users can update own notifications" ON iniciativas.notifications FOR UPDATE TO authenticated USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));
CREATE POLICY "Authenticated users can create notifications" ON iniciativas.notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = from_user_id);

-- 14. Storage bucket for library files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('library', 'library', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view library files" ON storage.objects FOR SELECT USING (bucket_id = 'library');
CREATE POLICY "Authenticated users can upload library files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'library');

-- Seed initial data for countries and companies (optional but helpful)
INSERT INTO iniciativas.countries (name) VALUES 
('Costa Rica'), ('Colombia'), ('Venezuela')
ON CONFLICT (name) DO NOTHING;

INSERT INTO iniciativas.companies (name) VALUES 
('Febeca'), ('Sillaca'), ('Beval'), ('Cofersa'), ('Mundipartes'), ('OLO')
ON CONFLICT (name) DO NOTHING;
