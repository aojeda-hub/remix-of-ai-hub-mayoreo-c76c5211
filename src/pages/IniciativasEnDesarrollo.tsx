import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Search, HandHelping, CalendarIcon, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import * as XLSX from "xlsx";

const DEPARTMENTS = [
  "Gerencia", "Personal", "Comercial", "Control", "Compras", "Logística",
  "Servicios", "Operaciones", "Sistemas", "CEDI y Transporte", "Dirección",
  "Ventas", "Centro de Distribución", "Mercadeo", "Administración Comercial",
  "Desarrollo Humano", "Inteligencia Comercial", "Reposición", "Procesos",
  "Integridad de Datos",
] as const;

const COUNTRIES = ["Venezuela", "Costa Rica", "Colombia"] as const;

export default function IniciativasEnDesarrollo() {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);

  const { data: initiatives = [], isLoading } = useQuery({
    queryKey: ["initiatives-en-desarrollo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("initiatives")
        .select("*")
        .eq("status", "en_progreso")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const [selectedInitiative, setSelectedInitiative] = useState<any>(null);
  const [helpText, setHelpText] = useState("");

  const { user } = useAuth();

  const handleOfferHelp = async () => {
    if (!helpText.trim()) {
      toast.error("Por favor escribe un mensaje sobre la ayuda que ofreces.");
      return;
    }

    try {
      // Get the current user's profile name
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user?.id ?? "")
        .single();

      const fromName = profile?.full_name || user?.email || "Un colaborador";

      // Insert in-app notification
      await supabase.from("notifications").insert({
        user_email: selectedInitiative?.email || "",
        initiative_id: selectedInitiative?.id,
        initiative_name: selectedInitiative?.project || "",
        from_user_id: user?.id,
        from_user_name: fromName,
        message: helpText,
        type: "help_offer",
      } as any);

      // Trigger email notification via edge function
      supabase.functions.invoke("notify-help-offer", {
        body: {
          initiative_id: selectedInitiative?.id,
          initiative_name: selectedInitiative?.project,
          responsible_email: selectedInitiative?.email,
          from_user_name: fromName,
          message: helpText,
        },
      });

      toast.success(`Tu oferta de ayuda para "${selectedInitiative?.project}" ha sido registrada. El responsable será notificado.`);
    } catch (err) {
      toast.error("Error al enviar la notificación.");
    }

    setSelectedInitiative(null);
    setHelpText("");
  };

  const filtered = initiatives.filter((i: any) => {
    if (search && !i.project?.toLowerCase().includes(search.toLowerCase()) && !i.technology?.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterDept !== "all" && i.department !== filterDept) return false;
    if (filterCountry !== "all" && i.country !== filterCountry) return false;
    if (filterDate) {
      const initDate = new Date(i.created_at);
      if (initDate.toDateString() !== filterDate.toDateString()) return false;
    }
    return true;
  });

  const exportToExcel = () => {
    const rows = filtered.map((i: any) => ({
      Iniciativa: i.project || "",
      Responsable: i.responsible || "",
      Departamento: i.department || "",
      País: i.country || "",
      Descripción: i.description || "",
      Tecnología: i.technology || "",
      Fecha: i.created_at ? format(new Date(i.created_at), "dd/MM/yyyy") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "En Desarrollo");
    XLSX.writeFile(wb, "iniciativas_en_desarrollo.xlsx");
    toast.success("Archivo exportado correctamente");
  };

  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Iniciativas en Desarrollo</h2>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre o tecnología..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterDept} onValueChange={setFilterDept}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Departamento" /></SelectTrigger>
          <SelectContent className="bg-popover z-50 max-h-60">
            <SelectItem value="all">Todos los departamentos</SelectItem>
            {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterCountry} onValueChange={setFilterCountry}>
          <SelectTrigger className="w-40"><SelectValue placeholder="País" /></SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">Todos los países</SelectItem>
            {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-[160px] justify-start text-left font-normal", !filterDate && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterDate ? format(filterDate, "dd/MM/yyyy") : <span>Fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={filterDate} onSelect={(d) => setFilterDate(d)} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
        {filterDate && (
          <Button variant="ghost" size="sm" onClick={() => setFilterDate(undefined)}>Limpiar fecha</Button>
        )}
        <Button variant="outline" onClick={exportToExcel} className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Excel
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Iniciativa</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Tecnología</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i: any) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">
                    <Link to={`/initiative/${i.id}`} className="text-primary hover:underline">{i.project || "—"}</Link>
                  </TableCell>
                  <TableCell>{i.responsible || "—"}</TableCell>
                  <TableCell>{i.department || "—"}</TableCell>
                  <TableCell>{i.country || "—"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{i.description || "—"}</TableCell>
                  <TableCell>{i.technology || "—"}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => setSelectedInitiative(i)}>
                      <HandHelping className="h-4 w-4" />
                      Ofrecer Ayuda
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">No hay iniciativas en desarrollo actualmente.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedInitiative} onOpenChange={(open) => { if (!open) { setSelectedInitiative(null); setHelpText(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ofrecer Ayuda — {selectedInitiative?.project}</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Describe cómo puedes ayudar con esta iniciativa..."
            value={helpText}
            onChange={(e) => setHelpText(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setSelectedInitiative(null); setHelpText(""); }}>Cancelar</Button>
            <Button onClick={handleOfferHelp} className="gap-1">
              <HandHelping className="h-4 w-4" />
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
