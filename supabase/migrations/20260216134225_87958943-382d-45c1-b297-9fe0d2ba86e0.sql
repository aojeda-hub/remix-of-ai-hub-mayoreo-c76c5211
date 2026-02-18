
-- Add email and phone columns to profiles
ALTER TABLE iniciativas.profiles ADD COLUMN IF NOT EXISTS email text DEFAULT '';
ALTER TABLE iniciativas.profiles ADD COLUMN IF NOT EXISTS phone text DEFAULT '';
