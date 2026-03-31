import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface BulkUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COLUMN_MAP: Record<string, string> = {
  "proyecto": "project",
  "iniciativa": "project",
  "tecnología": "technology",
  "tecnologia": "technology",
  "responsable": "responsible",
  "correo": "email",
  "email": "email",
  "departamento": "department",
  "país": "country",
  "pais": "country",
  "compañía": "company",
  "compania": "company",
  "empresa": "company",
  "descripción": "description",
  "descripcion": "description",
  "problema": "problem",
  "solución con ia": "ai_solution",
  "solucion con ia": "ai_solution",
  "solución ia": "ai_solution",
  "solucion ia": "ai_solution",
  "utilidad": "ai_solution",
  "link": "link",
  "enlace": "link",
  "objetivo estratégico": "strategic_objective",
  "objetivo estrategico": "strategic_objective",
  "silo": "silo",
  "impacto": "impact",
};

export default function BulkUploadDialog({ open, onOpenChange }: BulkUploadDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: number; errors: number } | null>(null);

  const reset = () => {
    setFile(null);
    setPreview([]);
    setColumns([]);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target?.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json<any>(ws);

      if (json.length === 0) {
        toast.error("El archivo está vacío");
        return;
      }

      setColumns(Object.keys(json[0]));
      setPreview(json.slice(0, 5));
    };
    reader.readAsBinaryString(f);
  };

  const mapRow = (row: any) => {
    const mapped: any = {};
    for (const [key, value] of Object.entries(row)) {
      const normalized = key.toLowerCase().trim();
      const dbField = COLUMN_MAP[normalized];
      if (dbField) {
        mapped[dbField] = String(value || "").trim();
      }
    }
    mapped.created_by = user?.id;
    mapped.source = "manual";
    mapped.status = "en_revision";
    mapped.created_at = new Date("2025-06-01T00:00:00Z").toISOString();
    if (mapped.silo) mapped.silo = mapped.silo.toLowerCase();
    if (mapped.impact) mapped.impact = mapped.impact.toLowerCase();
    return mapped;
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      const data: any[] = await new Promise((resolve) => {
        reader.onload = (evt) => {
          const wb = XLSX.read(evt.target?.result, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          resolve(XLSX.utils.sheet_to_json<any>(ws));
        };
        reader.readAsBinaryString(file);
      });

      let success = 0;
      let errors = 0;
      const BATCH_SIZE = 50;

      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE).map(mapRow);
        const validBatch = batch.filter((r) => r.project);

        if (validBatch.length > 0) {
          const { error } = await (supabase as any)
            .from("initiatives")
            .insert(validBatch);
          if (error) {
            errors += validBatch.length;
            console.error("Batch error:", error);
          } else {
            success += validBatch.length;
          }
        }
        errors += batch.length - validBatch.length;
      }

      setResult({ success, errors });
      if (success > 0) {
        queryClient.invalidateQueries({ queryKey: ["initiatives"] });
        toast.success(`${success} iniciativas cargadas correctamente`);
      }
      if (errors > 0) {
        toast.error(`${errors} filas con errores o sin nombre de proyecto`);
      }
    } catch (err: any) {
      toast.error("Error al procesar el archivo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Carga Masiva de Iniciativas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFile}
              className="hidden"
            />
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-2">
              Arrastra o selecciona un archivo Excel (.xlsx, .xls, .csv)
            </p>
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              Seleccionar archivo
            </Button>
            {file && (
              <p className="mt-2 text-sm font-medium text-foreground">{file.name}</p>
            )}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground text-sm mb-2">Columnas reconocidas:</p>
            <p>Proyecto/Iniciativa, Tecnología, Responsable, Correo/Email, Departamento, País, Compañía/Empresa, Descripción, Problema, Solución con IA/Utilidad, Link, Objetivo Estratégico, Silo, Impacto</p>
            <p className="mt-2 text-destructive">* La columna "Proyecto" o "Iniciativa" es obligatoria.</p>
          </div>

          {preview.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Vista previa ({preview.length} de {columns.length > 0 ? "las primeras filas" : ""})</p>
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted">
                      {columns.map((col) => (
                        <th key={col} className="px-3 py-2 text-left font-medium whitespace-nowrap">
                          {col}
                          {COLUMN_MAP[col.toLowerCase().trim()] && (
                            <span className="text-primary ml-1">✓</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, idx) => (
                      <tr key={idx} className="border-t">
                        {columns.map((col) => (
                          <td key={col} className="px-3 py-1.5 max-w-[200px] truncate">
                            {String(row[col] ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result && (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              {result.success > 0 && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  {result.success} cargadas
                </div>
              )}
              {result.errors > 0 && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {result.errors} errores
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => { reset(); onOpenChange(false); }}>
            Cerrar
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || uploading || preview.length === 0}
          >
            {uploading ? "Cargando..." : "Cargar Iniciativas"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
