
-- Community posts table
CREATE TABLE iniciativas.community_posts (
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
CREATE POLICY "Anyone authenticated can view posts" ON iniciativas.community_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create posts" ON iniciativas.community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON iniciativas.community_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON iniciativas.community_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Community comments
CREATE TABLE iniciativas.community_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES iniciativas.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE iniciativas.community_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view comments" ON iniciativas.community_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create comments" ON iniciativas.community_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON iniciativas.community_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Community reactions
CREATE TABLE iniciativas.community_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES iniciativas.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reaction TEXT NOT NULL DEFAULT '👍',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id, reaction)
);
ALTER TABLE iniciativas.community_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view reactions" ON iniciativas.community_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create reactions" ON iniciativas.community_reactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own reactions" ON iniciativas.community_reactions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Favorites
CREATE TABLE iniciativas.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  initiative_id UUID REFERENCES iniciativas.initiatives(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, initiative_id)
);
ALTER TABLE iniciativas.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own favorites" ON iniciativas.favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON iniciativas.favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON iniciativas.favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Library resources
CREATE TABLE iniciativas.library_resources (
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
CREATE POLICY "Anyone authenticated can view resources" ON iniciativas.library_resources FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create resources" ON iniciativas.library_resources FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resources" ON iniciativas.library_resources FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resources" ON iniciativas.library_resources FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Accompaniment requests
CREATE TABLE iniciativas.accompaniment_requests (
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
CREATE POLICY "Users can view own requests" ON iniciativas.accompaniment_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create requests" ON iniciativas.accompaniment_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own requests" ON iniciativas.accompaniment_requests FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Storage bucket for library files
INSERT INTO storage.buckets (id, name, public) VALUES ('library', 'library', true);
CREATE POLICY "Anyone can view library files" ON storage.objects FOR SELECT USING (bucket_id = 'library');
CREATE POLICY "Authenticated users can upload library files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'library');
