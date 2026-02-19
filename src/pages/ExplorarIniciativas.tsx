import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useInitiatives, useFavorites, useToggleFavorite } from "@/hooks/use-initiatives";
import { useAuth } from "@/lib/auth";
import { useRole } from "@/hooks/use-role";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Search, Heart, User, CalendarIcon, Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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
  const { isAdmin } = useRole();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");
  const [onlyMine, setOnlyMine] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);

  const { data: initiatives = [], isLoading } = useInitiatives();
  const { data: favorites = [] } = useFavorites(user?.id);
  const toggleFavMutation = useToggleFavorite(user?.id);

  // Edit state
  const [editingInitiative, setEditingInitiative] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Delete state
  const [deletingInitiative, setDeletingInitiative] = useState<any>(null);

  const isOwner = (i: any) => i.created_by === user?.id;
  const canEditDelete = (i: any) => isAdmin || isOwner(i);

  const handleToggleFav = (initId: string) => {
    toggleFavMutation.mutate({
      initiativeId: initId,
      isFavorite: favorites.includes(initId)
    });
  };

  const openEdit = (initiative: any) => {
    setEditForm({
      project: initiative.project || "",
      technology: initiative.technology || "",
      responsible: initiative.responsible || "",
      department: initiative.department || "",
      country: initiative.country || "",
      company: initiative.company || "",
      description: initiative.description || "",
      problem: initiative.problem || "",
      ai_solution: initiative.ai_solution || "",
      link: initiative.link || "",
    });
    setEditingInitiative(initiative);
  };

  const handleSaveEdit = async () => {
    try {
      const { error } = await (supabase as any)
        .from("initiatives")
        .update(editForm)
        .eq("id", editingInitiative.id);
      if (error) throw error;
      toast.success("Iniciativa actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["initiatives"] });
      setEditingInitiative(null);
    } catch (err: any) {
      toast.error("Error al actualizar: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await (supabase as any)
        .from("initiatives")
        .delete()
        .eq("id", deletingInitiative.id);
      if (error) throw error;
      toast.success("Iniciativa eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: ["initiatives"] });
      setDeletingInitiative(null);
    } catch (err: any) {
      toast.error("Error al eliminar: " + err.message);
    }
  };

  const updateEditField = (field: string, value: string) => setEditForm((f: any) => ({ ...f, [field]: value }));

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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover z-50">
                          {canEditDelete(i) && (
                            <>
                              <DropdownMenuItem onClick={() => openEdit(i)} className="gap-2">
                                <Pencil className="h-4 w-4" />
                                Modificar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setDeletingInitiative(i)} className="gap-2 text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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

      {/* Edit Dialog */}
      <Dialog open={!!editingInitiative} onOpenChange={(open) => { if (!open) setEditingInitiative(null); }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modificar Iniciativa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Proyecto</Label>
                <Input value={editForm.project} onChange={(e) => updateEditField("project", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tecnología</Label>
                <Input value={editForm.technology} onChange={(e) => updateEditField("technology", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Responsable</Label>
                <Input value={editForm.responsible} onChange={(e) => updateEditField("responsible", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Select value={editForm.department} onValueChange={(v) => updateEditField("department", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-60">
                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>País</Label>
                <Select value={editForm.country} onValueChange={(v) => updateEditField("country", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Compañía</Label>
                <Input value={editForm.company} onChange={(e) => updateEditField("company", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea value={editForm.description} onChange={(e) => updateEditField("description", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Problema</Label>
              <Textarea value={editForm.problem} onChange={(e) => updateEditField("problem", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Solución con IA</Label>
              <Textarea value={editForm.ai_solution} onChange={(e) => updateEditField("ai_solution", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input value={editForm.link} onChange={(e) => updateEditField("link", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingInitiative(null)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deletingInitiative} onOpenChange={(open) => { if (!open) setDeletingInitiative(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar iniciativa?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la iniciativa "{deletingInitiative?.project}". No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
