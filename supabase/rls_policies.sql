-- Permitir a usuarios autenticados leer iniciativas
CREATE POLICY "Allow authenticated users to read initiatives"
ON public.initiatives FOR SELECT
TO authenticated
USING (true);

-- Si no existe, también agregar policy de INSERT
CREATE POLICY "Allow authenticated users to insert initiatives"
ON public.initiatives FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);
