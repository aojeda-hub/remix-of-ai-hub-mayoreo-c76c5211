
-- Create role enum
CREATE TYPE iniciativas.app_role AS ENUM ('administrador', 'colaborador');

-- Create user_roles table
CREATE TABLE iniciativas.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'colaborador',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE iniciativas.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION iniciativas.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM iniciativas.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: Everyone authenticated can view roles
CREATE POLICY "Authenticated can view roles"
ON iniciativas.user_roles FOR SELECT
TO authenticated
USING (true);

-- RLS: Only admins can insert roles
CREATE POLICY "Admins can insert roles"
ON iniciativas.user_roles FOR INSERT
TO authenticated
WITH CHECK (iniciativas.has_role(auth.uid(), 'administrador'));

-- RLS: Only admins can update roles
CREATE POLICY "Admins can update roles"
ON iniciativas.user_roles FOR UPDATE
TO authenticated
USING (iniciativas.has_role(auth.uid(), 'administrador'));

-- RLS: Only admins can delete roles
CREATE POLICY "Admins can delete roles"
ON iniciativas.user_roles FOR DELETE
TO authenticated
USING (iniciativas.has_role(auth.uid(), 'administrador'));

-- Auto-assign 'colaborador' role on new user signup
CREATE OR REPLACE FUNCTION iniciativas.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO iniciativas.user_roles (user_id, role)
  VALUES (NEW.id, 'colaborador');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION iniciativas.handle_new_user_role();
