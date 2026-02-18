
-- Add new columns to initiatives table
ALTER TABLE iniciativas.initiatives
  ADD COLUMN strategic_objective text NOT NULL DEFAULT '',
  ADD COLUMN company text NOT NULL DEFAULT '',
  ADD COLUMN country text NOT NULL DEFAULT '',
  ADD COLUMN department text NOT NULL DEFAULT '',
  ADD COLUMN ai_solution text DEFAULT '';
