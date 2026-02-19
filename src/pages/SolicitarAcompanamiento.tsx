import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeadphonesIcon, Send, Clock } from "lucide-react";
import { toast } from "sonner";

const PRIORITY_LABELS: Record<string, string> = { alta: "Alta", media: "Media", baja: "Baja" };
const STATUS_LABELS: Record<string, string> = { pendiente: "Pendiente", en_proceso: "En Proceso", resuelto: "Resuelto" };
const STATUS_COLORS: Record<string, string> = {
  pendiente: "bg-warning/10 text-warning border-warning/20",
  en_proceso: "bg-blue-100 text-blue-700 border-blue-200",
  resuelto: "bg-green-100 text-green-700 border-green-200",
};

export default function SolicitarAcompanamiento() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ subject: "", description: "", area: "", priority: "media" });

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["accompaniment_requests", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("accompaniment_requests").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createRequest = useMutation({
    mutationFn: async () => {
      const { error } = await (supabase as any).from("accompaniment_requests").insert({
        user_id: user!.id,
        subject: form.subject,
        description: form.description,
        area: form.area,
        priority: form.priority,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accompaniment_requests"] });
      setForm({ subject: "", description: "", area: "", priority: "media" });
      toast.success("Solicitud enviada correctamente");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold">Solicitar Acompañamiento</h2>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HeadphonesIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Nueva Solicitud</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Asunto *</Label>
              <Input value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="¿En qué necesitas ayuda?" maxLength={200} />
            </div>
            <div className="space-y-2">
              <Label>Descripción *</Label>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe en detalle lo que necesitas" rows={4} maxLength={2000} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Departamento o tema</Label>
                <Input value={form.area} onChange={(e) => update("area", e.target.value)} placeholder="Ej: Automatización, Prompts, etc." maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select value={form.priority} onValueChange={(v) => update("priority", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => createRequest.mutate()} disabled={!form.subject || !form.description} className="w-full">
              <Send className="mr-2 h-4 w-4" />Enviar Solicitud
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My requests */}
      {requests.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Mis Solicitudes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {requests.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{r.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
                    <Badge variant="outline" className="text-xs">{PRIORITY_LABELS[r.priority] || r.priority}</Badge>
                  </div>
                </div>
                <Badge variant="outline" className={STATUS_COLORS[r.status] || ""}>{STATUS_LABELS[r.status] || r.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
