-- =============================================
-- Security definer function to check admin role
-- (Avoids RLS recursion on user_roles)
-- =============================================
CREATE OR REPLACE FUNCTION iniciativas.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM iniciativas.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- =============================================
-- PROFILES RLS Policies
-- =============================================

-- Admins can update any profile
DROP POLICY IF EXISTS "Admins can update any profile" ON iniciativas.profiles;
CREATE POLICY "Admins can update any profile" ON iniciativas.profiles
FOR UPDATE TO authenticated
USING (iniciativas.is_admin(auth.uid()));

-- Admins can delete any profile
DROP POLICY IF EXISTS "Admins can delete profiles" ON iniciativas.profiles;
CREATE POLICY "Admins can delete profiles" ON iniciativas.profiles
FOR DELETE TO authenticated
USING (iniciativas.is_admin(auth.uid()));

-- =============================================
-- INITIATIVES RLS Policies (admin overrides)
-- =============================================

-- Admins can update any initiative
DROP POLICY IF EXISTS "Admins can update any initiative" ON iniciativas.initiatives;
CREATE POLICY "Admins can update any initiative" ON iniciativas.initiatives
FOR UPDATE TO authenticated
USING (iniciativas.is_admin(auth.uid()));

-- Admins can delete any initiative
DROP POLICY IF EXISTS "Admins can delete any initiative" ON iniciativas.initiatives;
CREATE POLICY "Admins can delete any initiative" ON iniciativas.initiatives
FOR DELETE TO authenticated
USING (iniciativas.is_admin(auth.uid()));
