import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Send, CalendarIcon, Eye } from "lucide-react";
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
  "Febeca",
  "Sillaca",
  "Beval",
  "Prisma",
  "Cofersa",
  "Mundial de partes",
  "Mayoreo",
] as const;

const COUNTRIES = ["Venezuela", "Costa Rica", "Colombia"] as const;

const DEPARTMENTS = [
  "Gerencia",
  "Personal",
  "Comercial",
  "Control",
  "Compras",
  "Logística",
  "Servicios",
  "Operaciones",
  "Sistemas",
  "CEDI y Transporte",
  "Dirección",
  "Ventas",
  "Centro de Distribución",
  "Mercadeo",
  "Administración Comercial",
  "Desarrollo Humano",
  "Inteligencia Comercial",
  "Reposición",
  "Procesos",
  "Integridad de Datos",
  "Todos",
] as const;

const CLASSIFICATIONS = [
  {
    value: "Mejora de Proceso",
    label: "Mejora de Proceso",
    description:
      "Cambia KPIs estratégicos, múltiples sistemas o roles. Ej: Centro de Control de Cobranza",
  },
  {
    value: "Mejora de Actividad",
    label: "Mejora de Actividad (Procedimiento)",
    description:
      "Rediseña 2 o más tareas. Ej: Asistente de reabastecimiento entre bodegas",
  },
  {
    value: "Mejora de Tarea",
    label: "Mejora de Tarea",
    description: "Una acción específica. Ej: Notificación automática de factura vencida",
  },
] as const;

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [forceProcess, setForceProcess] = useState(false);
  const [requestHelp, setRequestHelp] = useState(false);

  // Mapeo fijo de responsable de métodos por silo
  const METHODS_RESPONSIBLE: Record<string, { name: string; email: string }> = {
    Logística: { name: "Stephanie Araya", email: "saraya@mayoreo.biz" },
    Logistica: { name: "Stephanie Araya", email: "saraya@mayoreo.biz" },
    Personal: { name: "Angely Ojeda", email: "aojeda@mayoreo.biz" },
    Compras: { name: "Ambar Pulido", email: "apulido@mayoreo.biz" },
    Ventas: { name: "Mayte Zarraga", email: "mzarraga@mayoreo.biz" },
    Mercadeo: { name: "Mayte Zarraga", email: "mzarraga@mayoreo.biz" },
    Control: { name: "Paola Rodriguez", email: "prodriguez@mayoreo.biz" },
    Sistemas: { name: "Edgar Monagas", email: "emonagas@mayoreo.biz" },
  };

  const [form, setForm] = useState({
    registrant_name: "",
    cargo: "",
    registrant_email: "",
    supervisor: "",
    project: "",
    technology: "",
    responsible: "",
    strategic_objective: "",
    company: "",
    country: "",
    department: "",
    silo: "",
    bpa_group: "",
    bpa_process: "",
    activity: "",
    task: "",
    classification: "",
    problem: "",
    ai_solution: "",
    description: "",
    link: "",
  });

  // Autoselección de Clasificación según jerarquía BPA seleccionada
  useEffect(() => {
    let next = "";
    if (forceProcess) {
      next = "Mejora de Proceso";
    } else if (form.task) {
      next = "Mejora de Tarea";
    } else if (form.activity) {
      next = "Mejora de Actividad";
    } else if (form.bpa_process) {
      next = "Mejora de Proceso";
    }
    setForm((f) => (f.classification === next ? f : { ...f, classification: next }));
  }, [form.task, form.activity, form.bpa_process, forceProcess]);

  const update = (field: string, value: string) =>
    setForm((f) => {
      if (field === "silo") {
        return { ...f, silo: value, bpa_group: "", bpa_process: "", activity: "", task: "" };
      }
      if (field === "bpa_group") {
        return { ...f, bpa_group: value, bpa_process: "", activity: "", task: "" };
      }
      if (field === "bpa_process") {
        return { ...f, bpa_process: value, activity: "", task: "" };
      }
      if (field === "activity") {
        return { ...f, activity: value, task: "" };
      }
      return { ...f, [field]: value };
    });

  const availableGroups = form.silo ? getGroupsForSilo(form.silo) : [];
  const availableProcesses =
    form.silo && form.bpa_group
      ? getProcessesForSiloAndGroup(form.silo, form.bpa_group)
      : [];
  const availableActivities =
    form.silo && form.bpa_process
      ? getActivitiesForProcess(form.silo, form.bpa_process)
      : [];
  const availableTasks =
    form.silo && form.bpa_process && form.activity
      ? getTasksForActivity(form.silo, form.bpa_process, form.activity)
      : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.registrant_name ||
      !form.registrant_email ||
      !form.strategic_objective ||
      !form.department ||
      !form.company ||
      !form.country ||
      !form.silo ||
      !form.bpa_group ||
      !form.bpa_process ||
      !form.activity ||
      !form.task ||
      !form.link
    ) {
      toast.error(
        "Completa todos los campos obligatorios (incluye Silo, Grupo, Proceso, Actividad, Tarea y Link)",
      );
      return;
    }
    // Validar formato de URL
    try {
      new URL(form.link);
    } catch {
      toast.error("El Link debe ser una URL válida (https://...)");
      return;
    }
    setLoading(true);

    // Componer descripción enriquecida con metadatos no persistidos como columna
    const meta = [
      form.classification ? `[Clasificación: ${form.classification}]` : "",
      form.bpa_group ? `[Grupo BPA: ${form.bpa_group}]` : "",
      form.bpa_process ? `[Proceso: ${form.bpa_process}]` : "",
      form.activity ? `[Actividad: ${form.activity}]` : "",
      form.task ? `[Tarea: ${form.task}]` : "",
    ]
      .filter(Boolean)
      .join(" ");
    const composedDescription = [meta, form.description].filter(Boolean).join(" ").trim();

    const { error } = await (supabase as any).from("initiatives").insert({
      project: form.project,
      technology: form.technology,
      responsible: form.registrant_name || form.responsible,
      email: form.registrant_email,
      strategic_objective: form.strategic_objective,
      company: form.company,
      country: form.country,
      department: form.department,
      silo: form.silo.toLowerCase() as any,
      impact: "medium" as any,
      problem: form.problem,
      ai_solution: form.ai_solution,
      description: composedDescription,
      link: form.link,
      created_by: user?.id,
      source: "manual",
      status: "en_revision" as any,
    });

    if (error) {
      toast.error("Error al registrar: " + error.message);
    } else {
      // Si el usuario solicitó ayuda al responsable de métodos, crear notificación
      if (requestHelp) {
        const responsible = METHODS_RESPONSIBLE[form.silo];
        if (responsible) {
          const { error: notifError } = await (supabase as any).from("notifications").insert({
            user_email: responsible.email,
            from_user_name: form.registrant_name,
            initiative_name: form.project || "Iniciativa sin nombre",
            message: `${form.registrant_name} (${form.registrant_email}) solicita apoyo para clasificar una iniciativa registrada en el silo ${form.silo}.`,
            type: "classification_help",
            read: false,
          });
          if (notifError) {
            toast.warning("Iniciativa registrada, pero no se pudo notificar al responsable: " + notifError.message);
          } else {
            toast.success(`Se notificó a ${responsible.name} para apoyo de clasificación`);
          }
        }
      }
      toast.success("Iniciativa registrada en revisión");
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Registrar Iniciativa</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Registra la iniciativa de IA si has podido aplicar una mejora a los procesos
                de la compañía, haciendo uso de nuevas tecnologías o inteligencia artificial.
                Todas las ideas suman.
              </p>
            </div>
            <div className="space-y-1 shrink-0 ml-4">
              <Label className="text-xs">Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[160px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Seleccionar</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Datos del Colaborador */}
            <div className="space-y-1 mb-2">
              <h3 className="text-sm font-semibold text-foreground">Datos del Colaborador</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input
                  value={form.registrant_name}
                  onChange={(e) => update("registrant_name", e.target.value)}
                  maxLength={200}
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="space-y-2">
                <Label>Cargo</Label>
                <Input
                  value={form.cargo}
                  onChange={(e) => update("cargo", e.target.value)}
                  maxLength={200}
                  placeholder="Tu cargo en la empresa"
                />
              </div>
              <div className="space-y-2">
                <Label>Correo *</Label>
                <Input
                  value={form.registrant_email}
                  onChange={(e) => update("registrant_email", e.target.value)}
                  maxLength={200}
                  placeholder="tu@correo.com"
                  type="email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Supervisor Inmediato</Label>
                <Input
                  value={form.supervisor}
                  onChange={(e) => update("supervisor", e.target.value)}
                  maxLength={200}
                  placeholder="Nombre del supervisor"
                />
              </div>
            </div>

            {/* Datos de la Iniciativa */}
            <div className="border-t pt-4 space-y-1 mb-2">
              <h3 className="text-sm font-semibold text-foreground">Datos de la Iniciativa</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Proyecto</Label>
                <Input
                  value={form.project}
                  onChange={(e) => update("project", e.target.value)}
                  maxLength={200}
                  placeholder="Nombre del proyecto"
                />
              </div>
              <div className="space-y-2">
                <Label>Tecnología</Label>
                <Input
                  value={form.technology}
                  onChange={(e) => update("technology", e.target.value)}
                  maxLength={200}
                  placeholder="Ej: GPT-4, LangChain"
                />
              </div>
              <div className="space-y-2">
                <Label>Responsable</Label>
                <Input
                  value={form.responsible}
                  onChange={(e) => update("responsible", e.target.value)}
                  maxLength={200}
                  placeholder="Nombre del responsable"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Objetivo Estratégico al que impacta *</Label>
              <Select
                value={form.strategic_objective}
                onValueChange={(v) => update("strategic_objective", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar objetivo" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {STRATEGIC_OBJECTIVES.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Compañía *</Label>
                <Select value={form.company} onValueChange={(v) => update("company", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar compañía" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {COMPANIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>País *</Label>
                <Select value={form.country} onValueChange={(v) => update("country", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar país" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Departamento *</Label>
                <Select value={form.department} onValueChange={(v) => update("department", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-60">
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Silo *</Label>
              <Select value={form.silo} onValueChange={(v) => update("silo", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar silo" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50 max-h-60">
                  {SILOS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Grupo BPA *</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        aria-label="Ver mapa BPA Mayoreo"
                        title="Ver mapa BPA Mayoreo"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-input text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl">
                      <DialogHeader>
                        <DialogTitle>BPA Mayoreo — Mapa de procesos</DialogTitle>
                      </DialogHeader>
                      <div className="overflow-auto max-h-[80vh]">
                        <img
                          src={bpaMayoreoImg}
                          alt="BPA Mayoreo - Mapa completo de procesos"
                          className="w-full h-auto"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Select
                  value={form.bpa_group}
                  onValueChange={(v) => update("bpa_group", v)}
                  disabled={!form.silo}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.silo ? "Seleccionar grupo BPA" : "Selecciona primero un silo"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {availableGroups.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Proceso BPA *</Label>
                <Select
                  value={form.bpa_process}
                  onValueChange={(v) => update("bpa_process", v)}
                  disabled={!form.bpa_group}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.bpa_group
                          ? availableProcesses.length
                            ? "Seleccionar proceso"
                            : "Sin procesos para este grupo"
                          : "Selecciona primero un grupo"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-60">
                    {availableProcesses.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Actividad *</Label>
                <Select
                  value={form.activity}
                  onValueChange={(v) => update("activity", v)}
                  disabled={!form.bpa_process}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.bpa_process
                          ? "Seleccionar actividad"
                          : "Selecciona primero un proceso"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-60">
                    {availableActivities.map((a) => (
                      <SelectItem key={a.name} value={a.name}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tarea *</Label>
                <Select
                  value={form.task}
                  onValueChange={(v) => update("task", v)}
                  disabled={!form.activity}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.activity
                          ? "Seleccionar tarea"
                          : "Selecciona primero una actividad"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-60">
                    {availableTasks.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Clasificación de la Iniciativa</Label>
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
                  {
                    CLASSIFICATIONS.find((c) => c.value === form.classification)
                      ?.description
                  }
                </p>
              )}
              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  id="force-process"
                  checked={forceProcess}
                  onCheckedChange={(v) => setForceProcess(v === true)}
                />
                <Label
                  htmlFor="force-process"
                  className="text-xs font-normal leading-relaxed cursor-pointer"
                >
                  Marcar como <span className="font-medium">Mejora de Proceso</span>{" "}
                  (sobrescribe la regla automática, úsalo si la iniciativa abarca múltiples
                  actividades o tareas).
                </Label>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  id="request-help"
                  checked={requestHelp}
                  onCheckedChange={(v) => setRequestHelp(v === true)}
                />
                <Label
                  htmlFor="request-help"
                  className="text-xs font-normal leading-relaxed cursor-pointer"
                >
                  ✅ <span className="font-medium">No sé clasificar esta iniciativa</span> – Solicitar apoyo al responsable de métodos del silo
                  {form.silo && METHODS_RESPONSIBLE[form.silo] && (
                    <span className="block text-muted-foreground mt-0.5">
                      Se notificará a {METHODS_RESPONSIBLE[form.silo].name} ({METHODS_RESPONSIBLE[form.silo].email})
                    </span>
                  )}
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Problema u oportunidad abordada</Label>
                <Textarea
                  value={form.problem}
                  onChange={(e) => update("problem", e.target.value)}
                  maxLength={1000}
                  placeholder="Describe el problema u oportunidad"
                />
              </div>
              <div className="space-y-2">
                <Label>Solución con IA implementada</Label>
                <Textarea
                  value={form.ai_solution}
                  onChange={(e) => update("ai_solution", e.target.value)}
                  maxLength={1000}
                  placeholder="Describe la solución con IA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Descripción breve del proceso</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  maxLength={2000}
                  placeholder="Descripción breve del proceso"
                />
              </div>
              <div className="space-y-2">
                <Label>Link *</Label>
                <Input
                  value={form.link}
                  onChange={(e) => update("link", e.target.value)}
                  maxLength={500}
                  placeholder="https://..."
                  type="url"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Registrando..." : "Registrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
