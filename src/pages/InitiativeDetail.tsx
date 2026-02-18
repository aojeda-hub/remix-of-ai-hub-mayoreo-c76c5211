import { useParams, useNavigate } from "react-router-dom";
import { useInitiative, useUpdateInitiative } from "@/hooks/use-initiatives";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";



export default function InitiativeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: initiative, isLoading } = useInitiative(id!);


  const [editFields, setEditFields] = useState({ problem: "", description: "", link: "", hours_saved: "0" });
  const isOwner = initiative?.created_by === user?.id;

  useEffect(() => {
    if (initiative) {
      setEditFields({
        problem: initiative.problem || "",
        description: initiative.description || "",
        link: initiative.link || "",
        hours_saved: String(initiative.hours_saved || 0),
      });
    }
  }, [initiative]);

  const updateMutation = useUpdateInitiative();

  const handleSave = () => {
    updateMutation.mutate({
      id: id!,
      problem: editFields.problem,
      description: editFields.description,
      link: editFields.link,
      hours_saved: Number(editFields.hours_saved) || 0,
    });
  };




  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;
  if (!initiative) return <div className="text-center py-12 text-muted-foreground">Iniciativa no encontrada</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{initiative.project || "Sin nombre"}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Read-only fields */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Tecnología</p>
              <p className="font-medium">{initiative.technology || "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Responsable</p>
              <p className="font-medium">{initiative.responsible || "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Departamento</p>
              <p className="font-medium">{initiative.department || "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Compañía</p>
              <p className="font-medium">{initiative.company || "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">País</p>
              <p className="font-medium">{initiative.country || "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Objetivo Estratégico</p>
              <p className="font-medium">{initiative.strategic_objective || "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Fecha</p>
              <p className="font-medium">{new Date(initiative.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Editable optional fields */}
          {isOwner && (
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label>Problema</Label>
                <Textarea
                  value={editFields.problem}
                  onChange={(e) => setEditFields((f) => ({ ...f, problem: e.target.value }))}
                  maxLength={1000}
                />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                  value={editFields.description}
                  onChange={(e) => setEditFields((f) => ({ ...f, description: e.target.value }))}
                  maxLength={2000}
                />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input
                  value={editFields.link}
                  onChange={(e) => setEditFields((f) => ({ ...f, link: e.target.value }))}
                  maxLength={500}
                  type="url"
                />
              </div>
              <Button onClick={handleSave} disabled={updateMutation.isPending}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          )}

          {!isOwner && (initiative.problem || initiative.description || initiative.link) && (
            <div className="border-t pt-4 space-y-3 text-sm">
              {initiative.problem && <div><p className="text-muted-foreground">Problema</p><p>{initiative.problem}</p></div>}
              {initiative.description && <div><p className="text-muted-foreground">Descripción</p><p>{initiative.description}</p></div>}
              {initiative.link && (
                <div>
                  <p className="text-muted-foreground">Link</p>
                  <a href={initiative.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{initiative.link}</a>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
