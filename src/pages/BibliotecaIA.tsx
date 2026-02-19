import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLibraryResources } from "@/hooks/use-library";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useRole } from "@/hooks/use-role";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, FileText, Video, Download, ExternalLink, BookOpen, Target, Zap, GraduationCap, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const CATEGORIES = [
  { value: "guia", label: "Guía uso responsable IA", icon: BookOpen },
  { value: "prompts", label: "Prompts validados Mayoreo", icon: Zap },
  { value: "casos", label: "Casos explicados paso a paso", icon: FileText },
  { value: "videos", label: "Videos cortos internos", icon: Video },
  { value: "plantillas", label: "Plantillas descargables", icon: Download },
  { value: "retos", label: "Retos mensuales activos", icon: Target },
  { value: "capacitacion", label: "Capacitación", icon: GraduationCap },
];

const CAT_LABELS: Record<string, string> = Object.fromEntries(CATEGORIES.map(c => [c.value, c.label]));

export default function BibliotecaIA() {
  const { user } = useAuth();
  const { isAdmin } = useRole();
  const queryClient = useQueryClient();
  const [filterCat, setFilterCat] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [newResource, setNewResource] = useState({ title: "", description: "", category: "guia", link: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Edit state
  const [editingResource, setEditingResource] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Delete state
  const [deletingResource, setDeletingResource] = useState<any>(null);

  const { data: resources = [], isLoading } = useLibraryResources();

  const isOwner = (r: any) => r.user_id === user?.id;
  const canEditDelete = (r: any) => isAdmin || isOwner(r);

  const createResource = useMutation({
    mutationFn: async () => {
      setUploading(true);
      let fileUrl = "";
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("library").upload(path, file);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("library").getPublicUrl(path);
        fileUrl = urlData.publicUrl;
      }
      const { error } = await (supabase as any).from("library_resources").insert({
        user_id: user!.id,
        title: newResource.title,
        description: newResource.description,
        category: newResource.category,
        file_url: fileUrl || null,
        link: newResource.link || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library_resources"] });
      setShowNew(false);
      setNewResource({ title: "", description: "", category: "guia", link: "" });
      setFile(null);
      setUploading(false);
      toast.success("Recurso agregado");
    },
    onError: (e: any) => { setUploading(false); toast.error(e.message); },
  });

  const openEdit = (r: any) => {
    setEditForm({
      title: r.title || "",
      description: r.description || "",
      category: r.category || "guia",
      link: r.link || "",
    });
    setEditingResource(r);
  };

  const handleSaveEdit = async () => {
    try {
      const { error } = await (supabase as any)
        .from("library_resources")
        .update(editForm)
        .eq("id", editingResource.id);
      if (error) throw error;
      toast.success("Recurso actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["library_resources"] });
      setEditingResource(null);
    } catch (err: any) {
      toast.error("Error al actualizar: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await (supabase as any)
        .from("library_resources")
        .delete()
        .eq("id", deletingResource.id);
      if (error) throw error;
      toast.success("Recurso eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["library_resources"] });
      setDeletingResource(null);
    } catch (err: any) {
      toast.error("Error al eliminar: " + err.message);
    }
  };

  const filtered = filterCat === "all" ? resources : resources.filter((r: any) => r.category === filterCat);

  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Biblioteca IA</h2>
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Agregar Recurso</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nuevo Recurso</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select value={newResource.category} onValueChange={(v) => setNewResource(p => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={newResource.title} onChange={(e) => setNewResource(p => ({ ...p, title: e.target.value }))} placeholder="Título del recurso" />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea value={newResource.description} onChange={(e) => setNewResource(p => ({ ...p, description: e.target.value }))} placeholder="Descripción del recurso" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Archivo (opcional)</Label>
                <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </div>
              <div className="space-y-2">
                <Label>Link externo (opcional)</Label>
                <Input value={newResource.link} onChange={(e) => setNewResource(p => ({ ...p, link: e.target.value }))} placeholder="https://..." />
              </div>
              <Button onClick={() => createResource.mutate()} disabled={!newResource.title || uploading} className="w-full">
                {uploading ? "Subiendo..." : "Agregar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={filterCat === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setFilterCat("all")}>Todos</Badge>
        {CATEGORIES.map(c => (
          <Badge key={c.value} variant={filterCat === c.value ? "default" : "outline"} className="cursor-pointer" onClick={() => setFilterCat(c.value)}>{c.label}</Badge>
        ))}
      </div>

      {/* Resources grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r: any) => {
          const CatIcon = CATEGORIES.find(c => c.value === r.category)?.icon || FileText;
          return (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CatIcon className="h-5 w-5 text-primary" />
                    <Badge variant="outline" className="text-xs">{CAT_LABELS[r.category] || r.category}</Badge>
                  </div>
                  {canEditDelete(r) && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(r)} title="Modificar">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeletingResource(r)} title="Eliminar">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardTitle className="text-sm mt-2">{r.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {r.description && <p className="text-sm text-muted-foreground mb-3">{r.description}</p>}
                <div className="flex gap-2">
                  {r.file_url && (
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm"><Download className="mr-1 h-3 w-3" />Descargar</Button>
                    </a>
                  )}
                  {r.link && (
                    <a href={r.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm"><ExternalLink className="mr-1 h-3 w-3" />Ver</Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card className="col-span-full"><CardContent className="py-8 text-center text-muted-foreground">No hay recursos aún</CardContent></Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingResource} onOpenChange={(open) => { if (!open) setEditingResource(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Modificar Recurso</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select value={editForm.category} onValueChange={(v) => setEditForm((f: any) => ({ ...f, category: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={editForm.title} onChange={(e) => setEditForm((f: any) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea value={editForm.description} onChange={(e) => setEditForm((f: any) => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Link externo</Label>
              <Input value={editForm.link} onChange={(e) => setEditForm((f: any) => ({ ...f, link: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingResource(null)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deletingResource} onOpenChange={(open) => { if (!open) setDeletingResource(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar recurso?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el recurso "{deletingResource?.title}". No se puede deshacer.
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
