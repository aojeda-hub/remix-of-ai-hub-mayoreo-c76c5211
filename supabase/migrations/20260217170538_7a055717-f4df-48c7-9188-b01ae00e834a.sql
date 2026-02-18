
-- Create notifications table
CREATE TABLE iniciativas.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  initiative_id UUID REFERENCES iniciativas.initiatives(id) ON DELETE CASCADE,
  initiative_name TEXT NOT NULL DEFAULT '',
  from_user_id UUID,
  from_user_name TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'help_offer',
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE iniciativas.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view notifications addressed to their email
CREATE POLICY "Users can view own notifications"
ON iniciativas.notifications
FOR SELECT
USING (
  user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Users can update (mark as read) their own notifications
CREATE POLICY "Users can update own notifications"
ON iniciativas.notifications
FOR UPDATE
USING (
  user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Authenticated users can create notifications
CREATE POLICY "Authenticated users can create notifications"
ON iniciativas.notifications
FOR INSERT
WITH CHECK (auth.uid() = from_user_id);
