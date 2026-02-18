
-- Create profiles table
CREATE TABLE iniciativas.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE iniciativas.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON iniciativas.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON iniciativas.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON iniciativas.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION iniciativas.handle_new_user();

-- Create initiatives table
CREATE TYPE iniciativas.initiative_status AS ENUM ('en_revision', 'aprobado', 'en_progreso', 'completado', 'rechazado');
CREATE TYPE iniciativas.initiative_impact AS ENUM ('high', 'medium', 'low');
CREATE TYPE iniciativas.initiative_silo AS ENUM ('compras', 'control', 'logistica', 'ventas', 'mercadeo', 'personal', 'sistemas');

CREATE TABLE iniciativas.initiatives (
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

ALTER TABLE iniciativas.initiatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view initiatives" ON iniciativas.initiatives FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create initiatives" ON iniciativas.initiatives FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own initiatives" ON iniciativas.initiatives FOR UPDATE TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "Users can delete own initiatives" ON iniciativas.initiatives FOR DELETE TO authenticated USING (auth.uid() = created_by);

-- Webhook inserts (no auth)
CREATE POLICY "Webhook can insert initiatives" ON iniciativas.initiatives FOR INSERT TO anon WITH CHECK (source = 'webhook');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION iniciativas.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON iniciativas.profiles FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();
CREATE TRIGGER update_initiatives_updated_at BEFORE UPDATE ON iniciativas.initiatives FOR EACH ROW EXECUTE FUNCTION iniciativas.update_updated_at_column();
