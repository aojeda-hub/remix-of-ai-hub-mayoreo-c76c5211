
-- Tallas y Tipos (Idempotent creation)
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

-- Profiles Table
CREATE TABLE IF NOT EXISTS iniciativas.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE iniciativas.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view all profiles" ON iniciativas.profiles;
    CREATE POLICY "Users can view all profiles" ON iniciativas.profiles FOR SELECT TO authenticated USING (true);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can update own profile" ON iniciativas.profiles;
    CREATE POLICY "Users can update own profile" ON iniciativas.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can insert own profile" ON iniciativas.profiles;
    CREATE POLICY "Users can insert own profile" ON iniciativas.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END $$;

-- Auto-create profile function
CREATE OR REPLACE FUNCTION iniciativas.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO iniciativas.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION iniciativas.handle_new_user();

-- Initiatives Table
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
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add missing columns if table already existed (Migration 20260211115033)
DO $$ BEGIN
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS strategic_objective text NOT NULL DEFAULT '';
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS company text NOT NULL DEFAULT '';
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS country text NOT NULL DEFAULT '';
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS department text NOT NULL DEFAULT '';
    ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS ai_solution text DEFAULT '';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

ALTER TABLE iniciativas.initiatives ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone authenticated can view initiatives" ON iniciativas.initiatives;
    CREATE POLICY "Anyone authenticated can view initiatives" ON iniciativas.initiatives FOR SELECT TO authenticated USING (true);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can create initiatives" ON iniciativas.initiatives;
    CREATE POLICY "Users can create initiatives" ON iniciativas.initiatives FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can update own initiatives" ON iniciativas.initiatives;
    CREATE POLICY "Users can update own initiatives" ON iniciativas.initiatives FOR UPDATE TO authenticated USING (auth.uid() = created_by);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can delete own initiatives" ON iniciativas.initiatives;
    CREATE POLICY "Users can delete own initiatives" ON iniciativas.initiatives FOR DELETE TO authenticated USING (auth.uid() = created_by);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Webhook can insert initiatives" ON iniciativas.initiatives;
    CREATE POLICY "Webhook can insert initiatives" ON iniciativas.initiatives FOR INSERT TO anon WITH CHECK (source = 'webhook');
END $$;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION iniciativas.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON iniciativas.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON iniciativas.profiles FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();

DROP TRIGGER IF EXISTS update_initiatives_updated_at ON iniciativas.initiatives;
CREATE TRIGGER update_initiatives_updated_at BEFORE UPDATE ON iniciativas.initiatives FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();

-- Community Posts
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

ALTER TABLE iniciativas.community_posts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone authenticated can view posts" ON iniciativas.community_posts;
    CREATE POLICY "Anyone authenticated can view posts" ON iniciativas.community_posts FOR SELECT TO authenticated USING (true);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can create posts" ON iniciativas.community_posts;
    CREATE POLICY "Users can create posts" ON iniciativas.community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can update own posts" ON iniciativas.community_posts;
    CREATE POLICY "Users can update own posts" ON iniciativas.community_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can delete own posts" ON iniciativas.community_posts;
    CREATE POLICY "Users can delete own posts" ON iniciativas.community_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);
END $$;

-- Community Comments
CREATE TABLE IF NOT EXISTS iniciativas.community_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES iniciativas.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE iniciativas.community_comments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone authenticated can view comments" ON iniciativas.community_comments;
    CREATE POLICY "Anyone authenticated can view comments" ON iniciativas.community_comments FOR SELECT TO authenticated USING (true);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can create comments" ON iniciativas.community_comments;
    CREATE POLICY "Users can create comments" ON iniciativas.community_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can delete own comments" ON iniciativas.community_comments;
    CREATE POLICY "Users can delete own comments" ON iniciativas.community_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);
END $$;

-- Community Reactions
CREATE TABLE IF NOT EXISTS iniciativas.community_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES iniciativas.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reaction TEXT NOT NULL DEFAULT '👍',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id, reaction)
);

ALTER TABLE iniciativas.community_reactions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone authenticated can view reactions" ON iniciativas.community_reactions;
    CREATE POLICY "Anyone authenticated can view reactions" ON iniciativas.community_reactions FOR SELECT TO authenticated USING (true);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can create reactions" ON iniciativas.community_reactions;
    CREATE POLICY "Users can create reactions" ON iniciativas.community_reactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can delete own reactions" ON iniciativas.community_reactions;
    CREATE POLICY "Users can delete own reactions" ON iniciativas.community_reactions FOR DELETE TO authenticated USING (auth.uid() = user_id);
END $$;

-- Favorites
CREATE TABLE IF NOT EXISTS iniciativas.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  initiative_id UUID REFERENCES iniciativas.initiatives(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, initiative_id)
);

ALTER TABLE iniciativas.favorites ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view own favorites" ON iniciativas.favorites;
    CREATE POLICY "Users can view own favorites" ON iniciativas.favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can add favorites" ON iniciativas.favorites;
    CREATE POLICY "Users can add favorites" ON iniciativas.favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can remove favorites" ON iniciativas.favorites;
    CREATE POLICY "Users can remove favorites" ON iniciativas.favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);
END $$;

-- Library Resources
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

ALTER TABLE iniciativas.library_resources ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone authenticated can view resources" ON iniciativas.library_resources;
    CREATE POLICY "Anyone authenticated can view resources" ON iniciativas.library_resources FOR SELECT TO authenticated USING (true);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can create resources" ON iniciativas.library_resources;
    CREATE POLICY "Users can create resources" ON iniciativas.library_resources FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can update own resources" ON iniciativas.library_resources;
    CREATE POLICY "Users can update own resources" ON iniciativas.library_resources FOR UPDATE TO authenticated USING (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can delete own resources" ON iniciativas.library_resources;
    CREATE POLICY "Users can delete own resources" ON iniciativas.library_resources FOR DELETE TO authenticated USING (auth.uid() = user_id);
END $$;

-- Accompaniment Requests
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

ALTER TABLE iniciativas.accompaniment_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view own requests" ON iniciativas.accompaniment_requests;
    CREATE POLICY "Users can view own requests" ON iniciativas.accompaniment_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can create requests" ON iniciativas.accompaniment_requests;
    CREATE POLICY "Users can create requests" ON iniciativas.accompaniment_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can update own requests" ON iniciativas.accompaniment_requests;
    CREATE POLICY "Users can update own requests" ON iniciativas.accompaniment_requests FOR UPDATE TO authenticated USING (auth.uid() = user_id);
END $$;

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('library', 'library', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone can view library files" ON storage.objects;
    CREATE POLICY "Anyone can view library files" ON storage.objects FOR SELECT USING (bucket_id = 'library');
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Authenticated users can upload library files" ON storage.objects;
    CREATE POLICY "Authenticated users can upload library files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'library');
END $$;
