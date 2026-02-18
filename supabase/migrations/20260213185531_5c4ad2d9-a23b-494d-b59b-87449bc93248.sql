
-- Fix community_posts policies: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone authenticated can view posts" ON iniciativas.community_posts;
DROP POLICY IF EXISTS "Users can create posts" ON iniciativas.community_posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON iniciativas.community_posts;
DROP POLICY IF EXISTS "Users can update own posts" ON iniciativas.community_posts;

CREATE POLICY "Anyone authenticated can view posts"
ON iniciativas.community_posts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create posts"
ON iniciativas.community_posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
ON iniciativas.community_posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
ON iniciativas.community_posts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Fix community_comments policies too
DROP POLICY IF EXISTS "Anyone authenticated can view comments" ON iniciativas.community_comments;
DROP POLICY IF EXISTS "Users can create comments" ON iniciativas.community_comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON iniciativas.community_comments;

CREATE POLICY "Anyone authenticated can view comments"
ON iniciativas.community_comments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create comments"
ON iniciativas.community_comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
ON iniciativas.community_comments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Fix community_reactions policies too
DROP POLICY IF EXISTS "Anyone authenticated can view reactions" ON iniciativas.community_reactions;
DROP POLICY IF EXISTS "Users can create reactions" ON iniciativas.community_reactions;
DROP POLICY IF EXISTS "Users can delete own reactions" ON iniciativas.community_reactions;

CREATE POLICY "Anyone authenticated can view reactions"
ON iniciativas.community_reactions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create reactions"
ON iniciativas.community_reactions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reactions"
ON iniciativas.community_reactions FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
