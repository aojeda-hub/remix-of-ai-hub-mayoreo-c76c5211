ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS cargo text DEFAULT '';
ALTER TABLE iniciativas.initiatives ADD COLUMN IF NOT EXISTS supervisor text DEFAULT '';