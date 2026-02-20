import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/use-profile";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { toast } from "sonner";

const STRATEGIC_OBJECTIVES = [
  "Maximizar la eficiencia",
  "Garantizar procesos",
  "Garantizar talento",
] as const;

const DEPARTMENTS = [
  "Gerencia", "Personal", "Comercial", "Control", "Compras", "Logística",
  "Servicios", "Operaciones", "Sistemas", "CEDI y Transporte", "Dirección",
  "Ventas", "Centro de Distribución", "Mercadeo", "Administración Comercial",
  "Desarrollo Humano", "Inteligencia Comercial", "Reposición", "Procesos",
  "Integridad de Datos",
] as const;

const SILOS = [
  "Control", "Personal", "Compras", "Ventas", "Mercadeo", "Sistemas", "Logística",
] as const;

interface RegisterInitiativeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invalidateQueryKey?: string[];
}

const INITIAL_FORM = {
  cargo: "",
  supervisor: "",
  project: "",
  technology: "",
  responsible: "",
  strategic_objective: "",
  department: "",
  silo: "",
  impact: "medium",
  problem: "",
  ai_solution: "",
  description: "",
  link: "",
};

export default function RegisterInitiativeDialog({ open, onOpenChange, invalidateQueryKey }: RegisterInitiativeDialogProps) {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ ...INITIAL_FORM });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.strategic_objective || !form.department || !form.silo) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }
    setLoading(true);

    const { error } = await (supabase as any).from("initiatives").insert({
      project: form.project,
      technology: form.technology,
      responsible: profile?.full_name || "",
      email: profile?.email || user?.email || "",
      strategic_objective: form.strategic_objective,
      company: profile?.company || "",
      country: profile?.country || "",
      department: form.department,
      silo: form.silo.toLowerCase() as any,
      impact: form.impact as any,
      problem: form.problem,
      ai_solution: form.ai_solution,
      description: form.description,
      link: form.link,
      created_by: user?.id,
      source: "seguimiento",
      status: "en_progreso" as any,
    });

    if (error) {
      toast.error("Error al registrar: " + error.message);
    } else {
      toast.success("Iniciativa registrada correctamente");
      setForm({ ...INITIAL_FORM });
      if (invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
      }
      onOpenChange(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Iniciativa</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Registra la iniciativa de IA si has podido aplicar una mejora a los procesos de la compañía.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Datos del Colaborador</h3>

          {/* Datos precargados del perfil */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-muted/40 rounded-md border border-border/50">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Nombre</Label>
              <p className="text-sm font-medium">{profileLoading ? "Cargando..." : profile?.full_name || user?.email || "—"}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Correo</Label>
              <p className="text-sm font-medium">{profileLoading ? "..." : profile?.email || user?.email || "—"}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Compañía</Label>
              <p className="text-sm font-medium">{profileLoading ? "..." : profile?.company || "—"}</p>
            </div>
          </div>

          {/* Cargo y Supervisor (deben digitarse) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Cargo</Label>
              <Input value={form.cargo} onChange={(e) => update("cargo", e.target.value)} maxLength={200} placeholder="Tu cargo en la empresa" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Supervisor Inmediato</Label>
              <Input value={form.supervisor} onChange={(e) => update("supervisor", e.target.value)} maxLength={200} placeholder="Nombre del supervisor" />
            </div>
          </div>

          <div className="border-t pt-3">
            <h3 className="text-sm font-semibold text-foreground">Datos de la Iniciativa</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Proyecto</Label>
              <Input value={form.project} onChange={(e) => update("project", e.target.value)} maxLength={200} placeholder="Nombre del proyecto" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Tecnología</Label>
              <Input value={form.technology} onChange={(e) => update("technology", e.target.value)} maxLength={200} placeholder="Ej: GPT-4, LangChain" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Responsable</Label>
              <Input value={form.responsible} onChange={(e) => update("responsible", e.target.value)} maxLength={200} placeholder="Nombre del responsable" />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Objetivo Estratégico *</Label>
            <Select value={form.strategic_objective} onValueChange={(v) => update("strategic_objective", v)}>
              <SelectTrigger><SelectValue placeholder="Seleccionar objetivo" /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {STRATEGIC_OBJECTIVES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Departamento *</Label>
              <Select value={form.department} onValueChange={(v) => update("department", v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent className="bg-popover z-50 max-h-60">
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Silo *</Label>
              <Select value={form.silo} onValueChange={(v) => update("silo", v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar silo" /></SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {SILOS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Problema u oportunidad</Label>
              <Textarea value={form.problem} onChange={(e) => update("problem", e.target.value)} maxLength={1000} placeholder="Describe el problema" rows={3} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Solución con IA</Label>
              <Textarea value={form.ai_solution} onChange={(e) => update("ai_solution", e.target.value)} maxLength={1000} placeholder="Describe la solución" rows={3} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Descripción</Label>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} maxLength={2000} placeholder="Descripción breve" rows={3} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Link</Label>
              <Input value={form.link} onChange={(e) => update("link", e.target.value)} maxLength={500} placeholder="https://..." type="url" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Registrando..." : "Registrar Iniciativa"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
