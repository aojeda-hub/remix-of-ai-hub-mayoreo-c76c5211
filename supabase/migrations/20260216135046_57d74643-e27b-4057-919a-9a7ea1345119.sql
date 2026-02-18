
-- Re-create triggers that were missing
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION iniciativas.handle_new_user();

CREATE OR REPLACE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION iniciativas.handle_new_user_role();

-- Backfill profiles for existing users who don't have one
INSERT INTO iniciativas.profiles (user_id, full_name, email)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', ''),
  COALESCE(u.email, '')
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM iniciativas.profiles p WHERE p.user_id = u.id
);

-- Backfill roles for existing users who don't have one
INSERT INTO iniciativas.user_roles (user_id, role)
SELECT 
  u.id,
  'colaborador'::app_role
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM iniciativas.user_roles r WHERE r.user_id = u.id
);
