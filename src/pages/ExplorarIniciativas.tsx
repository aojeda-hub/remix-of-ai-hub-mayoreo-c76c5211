import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useInitiatives, useFavorites, useToggleFavorite } from "@/hooks/use-initiatives";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search, Mail, Heart, User, Pencil, CalendarIcon, Download } from "lucide-react";

import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const DEPARTMENTS = [
  "Gerencia", "Personal", "Comercial", "Control", "Compras", "Logística",
  "Servicios", "Operaciones", "Sistemas", "CEDI y Transporte", "Dirección",
  "Ventas", "Centro de Distribución", "Mercadeo", "Administración Comercial",
  "Desarrollo Humano", "Inteligencia Comercial", "Reposición", "Procesos",
  "Integridad de Datos",
] as const;

const COUNTRIES = ["Venezuela", "Costa Rica", "Colombia"] as const;

export default function ExplorarIniciativas() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");
  const [onlyMine, setOnlyMine] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);

  const { data: initiatives = [], isLoading } = useInitiatives();
  const { data: favorites = [] } = useFavorites(user?.id);
  const toggleFavMutation = useToggleFavorite(user?.id);

  const handleToggleFav = (initId: string) => {
    toggleFavMutation.mutate({
      initiativeId: initId,
      isFavorite: favorites.includes(initId)
    });
  };


  const filtered = initiatives.filter((i: any) => {
    if (onlyMine && i.created_by !== user?.id) return false;
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
      Utilidad: i.ai_solution || "",

      Tecnología: i.technology || "",
      Fecha: i.created_at ? format(new Date(i.created_at), "dd/MM/yyyy") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Iniciativas");
    XLSX.writeFile(wb, "iniciativas.xlsx");
    toast.success("Archivo exportado correctamente");
  };


  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Explorar Iniciativas</h2>

      {/* Search and filters */}
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
            <Button
              variant="outline"
              className={cn(
                "w-[160px] justify-start text-left font-normal",
                !filterDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterDate ? format(filterDate, "dd/MM/yyyy") : <span>Fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filterDate}
              onSelect={(d) => setFilterDate(d)}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        {filterDate && (
          <Button variant="ghost" size="sm" onClick={() => setFilterDate(undefined)}>
            Limpiar fecha
          </Button>
        )}
        {user && (
          <Button
            variant={onlyMine ? "default" : "outline"}
            onClick={() => setOnlyMine(!onlyMine)}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            Mis Iniciativas
          </Button>
        )}
        <Button variant="outline" onClick={exportToExcel} className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Excel
        </Button>
      </div>
      {/* Results */}
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
                <TableHead>Utilidad</TableHead>
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
                  <TableCell className="max-w-[200px] truncate">{i.ai_solution || "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {i.created_by === user?.id && (
                        <Link to={`/initiative/${i.id}`} title="Editar iniciativa">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      {i.email && (
                        <a href={`mailto:${i.email}`} title="Escribir correo al autor">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${favorites.includes(i.id) ? "text-red-500" : ""}`}
                        title="Guardar en favoritos"
                        onClick={() => handleToggleFav(i.id)}
                      >
                        <Heart className="h-4 w-4" fill={favorites.includes(i.id) ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">No se encontraron iniciativas</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
