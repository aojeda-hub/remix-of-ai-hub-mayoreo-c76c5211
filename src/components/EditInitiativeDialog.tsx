import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import bpaMayoreoImg from "@/assets/bpa-mayoreo.jpeg";
import {
  SILOS,
  getGroupsForSilo,
  getProcessesForSiloAndGroup,
  getActivitiesForProcess,
  getTasksForActivity,
} from "@/lib/bpa-data";

const STRATEGIC_OBJECTIVES = [
  "Maximizar la eficiencia",
  "Garantizar procesos",
  "Garantizar talento",
  "Maximizar la gestión comercial",
] as const;

const COMPANIES = [
  "Febeca", "Sillaca", "Beval", "Prisma", "Cofersa", "Mundial de partes", "OLO", "Mayoreo", "Mayoreo Global",
] as const;

const COUNTRIES = ["Venezuela", "Costa Rica", "Colombia", "Global"] as const;

const DEPARTMENTS = [
  "Gerencia", "Personal", "Comercial", "Control", "Compras", "Logística",
  "Servicios", "Operaciones", "Sistemas", "CEDI y Transporte", "Dirección",
  "Ventas", "Centro de Distribución", "Mercadeo", "Administración Comercial",
  "Desarrollo Humano", "Inteligencia Comercial", "Reposición", "Procesos",
  "Integridad de Datos", "Todos",
] as const;

const CLASSIFICATIONS = [
  { value: "Mejora de Proceso", description: "Cambia KPIs estratégicos, múltiples sistemas o roles." },
  { value: "Mejora de Actividad", description: "Rediseña 2 o más tareas." },
  { value: "Mejora de Tarea", description: "Una acción específica." },
] as const;

interface EditInitiativeDialogProps {
  initiative: any | null;
  onClose: () => void;
  invalidateKeys?: string[][];
}

// Extract metadata from description string
const META_PATTERNS = {
  classification: /\[Clasificación:\s*([^\]]+)\]/,
  bpa_group: /\[Grupo BPA:\s*([^\]]+)\]/,
  bpa_process: /\[Proceso:\s*([^\]]+)\]/,
  activity: /\[Actividad:\s*([^\]]+)\]/,
  task: /\[Tarea:\s*([^\]]+)\]/,
};

const extractMeta = (description: string) => {
  const result: Record<string, string> = {
    classification: "",
    bpa_group: "",
    bpa_process: "",
    activity: "",
    task: "",
  };
  if (!description) return { meta: result, cleanDescription: "" };
  let clean = description;
  for (const [key, pattern] of Object.entries(META_PATTERNS)) {
    const m = description.match(pattern);
    if (m) {
      result[key] = m[1].trim();
      clean = clean.replace(m[0], "");
    }
  }
  return { meta: result, cleanDescription: clean.trim() };
};

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

export default function EditInitiativeDialog({ initiative, onClose, invalidateKeys = [] }: EditInitiativeDialogProps) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [forceProcess, setForceProcess] = useState(false);

  const [form, setForm] = useState<any>({
    project: "",
    technology: "",
    responsible: "",
    strategic_objective: "",
    department: "",
    country: "",
    company: "",
    silo: "",
    bpa_group: "",
    bpa_process: "",
    activity: "",
    task: "",
    classification: "",
    description: "",
    problem: "",
    ai_solution: "",
    link: "",
  });

  // Initialize form when initiative changes
  useEffect(() => {
    if (!initiative) return;
    const { meta, cleanDescription } = extractMeta(initiative.description || "");
    setForm({
      project: initiative.project || "",
      technology: initiative.technology || "",
      responsible: initiative.responsible || "",
      strategic_objective: initiative.strategic_objective || "",
      department: initiative.department || "",
      country: initiative.country || "",
      company: initiative.company || "",
      silo: initiative.silo ? capitalize(initiative.silo) : "",
      bpa_group: meta.bpa_group,
      bpa_process: meta.bpa_process,
      activity: meta.activity,
      task: meta.task,
      classification: meta.classification,
      description: cleanDescription,
      problem: initiative.problem || "",
      ai_solution: initiative.ai_solution || "",
      link: initiative.link || "",
    });
    setForceProcess(meta.classification === "Mejora de Proceso" && !meta.activity && !meta.task);
  }, [initiative]);

  // Auto-classify based on BPA hierarchy
  useEffect(() => {
    let next = form.classification;
    if (forceProcess) next = "Mejora de Proceso";
    else if (form.task) next = "Mejora de Tarea";
    else if (form.activity) next = "Mejora de Actividad";
    else if (form.bpa_process) next = "Mejora de Proceso";
    if (next !== form.classification) {
      setForm((f: any) => ({ ...f, classification: next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.task, form.activity, form.bpa_process, forceProcess]);

  const update = (field: string, value: string) =>
    setForm((f: any) => {
      if (field === "silo") return { ...f, silo: value, bpa_group: "", bpa_process: "", activity: "", task: "" };
      if (field === "bpa_group") return { ...f, bpa_group: value, bpa_process: "", activity: "", task: "" };
      if (field === "bpa_process") return { ...f, bpa_process: value, activity: "", task: "" };
      if (field === "activity") return { ...f, activity: value, task: "" };
      return { ...f, [field]: value };
    });

  const availableGroups = useMemo(() => (form.silo ? getGroupsForSilo(form.silo) : []), [form.silo]);
  const availableProcesses = useMemo(
    () => (form.silo && form.bpa_group ? getProcessesForSiloAndGroup(form.silo, form.bpa_group) : []),
    [form.silo, form.bpa_group],
  );
  const availableActivities = useMemo(
    () => (form.silo && form.bpa_process ? getActivitiesForProcess(form.silo, form.bpa_process) : []),
    [form.silo, form.bpa_process],
  );
  const availableTasks = useMemo(
    () => (form.silo && form.bpa_process && form.activity ? getTasksForActivity(form.silo, form.bpa_process, form.activity) : []),
    [form.silo, form.bpa_process, form.activity],
  );

  const handleSave = async () => {
    if (!form.link) {
      toast.error("El campo Link es obligatorio");
      return;
    }
    try {
      new URL(form.link);
    } catch {
      toast.error("El Link debe ser una URL válida (https://...)");
      return;
    }

    setSaving(true);
    const meta = [
      form.classification ? `[Clasificación: ${form.classification}]` : "",
      form.bpa_group ? `[Grupo BPA: ${form.bpa_group}]` : "",
      form.bpa_process ? `[Proceso: ${form.bpa_process}]` : "",
      form.activity ? `[Actividad: ${form.activity}]` : "",
      form.task ? `[Tarea: ${form.task}]` : "",
    ].filter(Boolean).join(" ");
    const composedDescription = [meta, form.description].filter(Boolean).join(" ").trim();

    const payload: any = {
      project: form.project,
      technology: form.technology,
      responsible: form.responsible,
      strategic_objective: form.strategic_objective,
      department: form.department,
      country: form.country,
      company: form.company,
      silo: form.silo ? form.silo.toLowerCase() : null,
      problem: form.problem,
      ai_solution: form.ai_solution,
      description: composedDescription,
      link: form.link,
    };

    const { error } = await (supabase as any).from("initiatives").update(payload).eq("id", initiative.id);
    setSaving(false);
    if (error) {
      toast.error("Error al actualizar: " + error.message);
      return;
    }
    toast.success("Iniciativa actualizada correctamente");
    invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
    onClose();
  };

  return (
    <Dialog open={!!initiative} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modificar Iniciativa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Datos de la Iniciativa</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Proyecto</Label>
              <Input value={form.project} onChange={(e) => update("project", e.target.value)} placeholder="Nombre del proyecto" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Tecnología</Label>
              <Input value={form.technology} onChange={(e) => update("technology", e.target.value)} placeholder="Ej: GPT-4, LangChain" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Responsable</Label>
              <Input value={form.responsible} onChange={(e) => update("responsible", e.target.value)} placeholder="Nombre del responsable" />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Objetivo Estratégico al que impacta *</Label>
            <Select value={form.strategic_objective} onValueChange={(v) => update("strategic_objective", v)}>
              <SelectTrigger><SelectValue placeholder="Seleccionar objetivo" /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {STRATEGIC_OBJECTIVES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Compañía *</Label>
              <Select value={form.company} onValueChange={(v) => update("company", v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar compañía" /></SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {COMPANIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">País *</Label>
              <Select value={form.country} onValueChange={(v) => update("country", v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar país" /></SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Departamento *</Label>
              <Select value={form.department} onValueChange={(v) => update("department", v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar departamento" /></SelectTrigger>
                <SelectContent className="bg-popover z-50 max-h-60">
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Silo *</Label>
            <Select value={form.silo} onValueChange={(v) => update("silo", v)}>
              <SelectTrigger><SelectValue placeholder="Seleccionar silo" /></SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-60">
                {SILOS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label className="text-xs">Grupo BPA *</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      aria-label="Ver mapa BPA Mayoreo"
                      title="Ver mapa BPA Mayoreo"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-input text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                      <Eye className="h-3 w-3" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl">
                    <DialogHeader>
                      <DialogTitle>BPA Mayoreo — Mapa de procesos</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-auto max-h-[80vh]">
                      <img src={bpaMayoreoImg} alt="BPA Mayoreo" className="w-full h-auto" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Select value={form.bpa_group} onValueChange={(v) => update("bpa_group", v)} disabled={!form.silo}>
                <SelectTrigger>
                  <SelectValue placeholder={form.silo ? "Seleccionar grupo BPA" : "Selecciona primero un silo"} />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {availableGroups.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Proceso BPA *</Label>
              <Select value={form.bpa_process} onValueChange={(v) => update("bpa_process", v)} disabled={!form.bpa_group}>
                <SelectTrigger>
                  <SelectValue placeholder={form.bpa_group ? (availableProcesses.length ? "Seleccionar proceso" : "Sin procesos para este grupo") : "Selecciona primero un grupo"} />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50 max-h-60">
                  {availableProcesses.map((p) => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Actividad *</Label>
              <Select value={form.activity} onValueChange={(v) => update("activity", v)} disabled={!form.bpa_process}>
                <SelectTrigger>
                  <SelectValue placeholder={form.bpa_process ? "Seleccionar actividad" : "Selecciona primero un proceso"} />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50 max-h-60">
                  {availableActivities.map((a) => <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Tarea *</Label>
              <Select value={form.task} onValueChange={(v) => update("task", v)} disabled={!form.activity}>
                <SelectTrigger>
                  <SelectValue placeholder={form.activity ? "Seleccionar tarea" : "Selecciona primero una actividad"} />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50 max-h-60">
                  {availableTasks.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Clasificación de la Iniciativa</Label>
            <div
              aria-readonly="true"
              className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-sm text-foreground"
            >
              {form.classification || (
                <span className="text-muted-foreground">
                  Se asigna automáticamente según la selección de Proceso, Actividad o Tarea
                </span>
              )}
            </div>
            {form.classification && (
              <p className="text-xs text-muted-foreground">
                {CLASSIFICATIONS.find((c) => c.value === form.classification)?.description}
              </p>
            )}
            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="edit-force-process"
                checked={forceProcess}
                onCheckedChange={(v) => setForceProcess(v === true)}
              />
              <Label htmlFor="edit-force-process" className="text-xs font-normal leading-relaxed cursor-pointer">
                Marcar como <span className="font-medium">Mejora de Proceso</span> (sobrescribe la regla automática, úsalo si la iniciativa abarca múltiples actividades o tareas).
              </Label>
            </div>
          </div>

          <div className="border-t pt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Problema u oportunidad</Label>
              <Textarea value={form.problem} onChange={(e) => update("problem", e.target.value)} rows={3} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Solución con IA</Label>
              <Textarea value={form.ai_solution} onChange={(e) => update("ai_solution", e.target.value)} rows={3} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Descripción breve del proceso</Label>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Link *</Label>
              <Input value={form.link} onChange={(e) => update("link", e.target.value)} type="url" required placeholder="https://..." />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
