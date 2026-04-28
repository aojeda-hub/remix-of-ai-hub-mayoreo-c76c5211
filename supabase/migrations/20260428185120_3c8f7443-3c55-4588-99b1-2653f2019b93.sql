
UPDATE iniciativas.initiatives
SET description = '[Clasificación: Mejora de Tarea]'
  || CASE
       WHEN COALESCE(NULLIF(regexp_replace(COALESCE(description,''), '^\s*\[Clasificación:\s*[^\]]+\]\s*', ''), ''), '') = '' THEN ''
       ELSE ' ' || regexp_replace(COALESCE(description,''), '^\s*\[Clasificación:\s*[^\]]+\]\s*', '')
     END
WHERE source = 'manual'
  AND (description IS NULL OR description !~ '\[Clasificación:');
