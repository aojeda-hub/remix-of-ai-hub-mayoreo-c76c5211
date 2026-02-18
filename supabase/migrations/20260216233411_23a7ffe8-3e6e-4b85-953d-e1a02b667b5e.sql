-- Allow admins to delete profiles
CREATE POLICY "Admins can delete profiles"
ON iniciativas.profiles
FOR DELETE
USING (has_role(auth.uid(), 'administrador'::app_role));