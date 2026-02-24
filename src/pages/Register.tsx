import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Send, CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const STRATEGIC_OBJECTIVES = [
  "Maximizar la eficiencia",
  "Garantizar procesos",
  "Garantizar talento",
] as const;

const COMPANIES = [
  "Febeca", "Sillaca", "Beval", "Prisma", "Cofersa", "Mundial de partes", "OLO",
] as const;

const COUNTRIES = [
  "Venezuela", "Costa Rica", "Colombia",
] as const;

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
] as const;

const SILOS = [
  "Control", "Personal", "Compras", "Ventas", "Mercadeo", "Sistemas", "Logística",
] as const;

const INITIATIVE_TYPES = [
  "En Desarrollo", "En Calidad", "En Productivo",
] as const;


export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const [form, setForm] = useState({
    // Datos del registrante
    registrant_name: "",
    cargo: "",
    registrant_email: "",
    supervisor: "",
    // Datos de la iniciativa
    project: "",
    technology: "",
    responsible: "",
    strategic_objective: "",
    company: "",
    country: "",
    department: "",
    silo: "",
    impact: "medium" as string,
    initiative_type: "",
    problem: "",
    ai_solution: "",
    description: "",
    link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.registrant_name || !form.registrant_email || !form.strategic_objective || !form.department || !form.silo || !form.company || !form.country) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }
    setLoading(true);

    // Mapear tipo de iniciativa al status de la BD
    const statusMap: Record<string, string> = {
      "En Desarrollo": "en_progreso",
      "En Calidad": "en_revision",
      "En Productivo": "completado",
    };
    const mappedStatus = statusMap[form.initiative_type] || "en_revision";

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
      impact: form.impact as any,
      problem: form.problem,
      ai_solution: form.ai_solution,
      description: form.description,
      link: form.link,
      created_by: user?.id,
      source: "manual",
      status: mappedStatus as any,
    });

    if (error) {
      toast.error("Error al registrar: " + error.message);
    } else {
      toast.success("Iniciativa registrada en revisión");
      navigate("/");
    }
    setLoading(false);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Registrar Iniciativa</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Registra la iniciativa de IA si has podido aplicar una mejora a los procesos de la compañía, haciendo uso de nuevas tecnologías o inteligencia artificial. Todas las ideas suman.
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
                      !date && "text-muted-foreground"
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
            {/* Sección: Datos del registrante */}
            <div className="space-y-1 mb-2">
              <h3 className="text-sm font-semibold text-foreground">Datos del Colaborador</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input value={form.registrant_name} onChange={(e) => update("registrant_name", e.target.value)} maxLength={200} placeholder="Tu nombre completo" />
              </div>
              <div className="space-y-2">
                <Label>Cargo</Label>
                <Input value={form.cargo} onChange={(e) => update("cargo", e.target.value)} maxLength={200} placeholder="Tu cargo en la empresa" />
              </div>
              <div className="space-y-2">
                <Label>Correo *</Label>
                <Input value={form.registrant_email} onChange={(e) => update("registrant_email", e.target.value)} maxLength={200} placeholder="tu@correo.com" type="email" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Supervisor Inmediato</Label>
                <Input value={form.supervisor} onChange={(e) => update("supervisor", e.target.value)} maxLength={200} placeholder="Nombre del supervisor" />
              </div>
            </div>

            <div className="border-t pt-4 space-y-1 mb-2">
              <h3 className="text-sm font-semibold text-foreground">Datos de la Iniciativa</h3>
            </div>

            {/* Row 1: Proyecto, Tecnología, Responsable */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Proyecto</Label>
                <Input value={form.project} onChange={(e) => update("project", e.target.value)} maxLength={200} placeholder="Nombre del proyecto" />
              </div>
              <div className="space-y-2">
                <Label>Tecnología</Label>
                <Input value={form.technology} onChange={(e) => update("technology", e.target.value)} maxLength={200} placeholder="Ej: GPT-4, LangChain" />
              </div>
              <div className="space-y-2">
                <Label>Responsable</Label>
                <Input value={form.responsible} onChange={(e) => update("responsible", e.target.value)} maxLength={200} placeholder="Nombre del responsable" />
              </div>
            </div>

            {/* Row 2: Objetivo Estratégico */}
            <div className="space-y-2">
              <Label>Objetivo Estratégico al que impacta *</Label>
              <Select value={form.strategic_objective} onValueChange={(v) => update("strategic_objective", v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar objetivo" /></SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {STRATEGIC_OBJECTIVES.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 3: Compañía, País, Departamento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Compañía *</Label>
                <Select value={form.company} onValueChange={(v) => update("company", v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar compañía" /></SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {COMPANIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>País *</Label>
                <Select value={form.country} onValueChange={(v) => update("country", v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar país" /></SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Departamento *</Label>
                <Select value={form.department} onValueChange={(v) => update("department", v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar departamento" /></SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-60">
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 4: Silo */}
            <div className="space-y-2">
              <Label>Silo *</Label>
              <Select value={form.silo} onValueChange={(v) => update("silo", v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar silo" /></SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {SILOS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            {/* Row 5: Problema y Solución IA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Problema u oportunidad abordada</Label>
                <Textarea value={form.problem} onChange={(e) => update("problem", e.target.value)} maxLength={1000} placeholder="Describe el problema u oportunidad" />
              </div>
              <div className="space-y-2">
                <Label>Solución con IA implementada</Label>
                <Textarea value={form.ai_solution} onChange={(e) => update("ai_solution", e.target.value)} maxLength={1000} placeholder="Describe la solución con IA" />
              </div>
            </div>

            {/* Row 6: Descripción y Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Descripción breve del proceso</Label>
                <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} maxLength={2000} placeholder="Descripción breve del proceso" />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input value={form.link} onChange={(e) => update("link", e.target.value)} maxLength={500} placeholder="https://..." type="url" />
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
