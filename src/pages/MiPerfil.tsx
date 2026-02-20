import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/use-profile";
import { useCompanies } from "@/hooks/use-companies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, User } from "lucide-react";

export default function MiPerfil() {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { companies, loading: companiesLoading, getCountryByCompany } = useCompanies();
  const [loading, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    company_id: "",
    cargo: "",
    supervisor: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        company_id: profile.company_id || "",
        cargo: (profile as any).cargo || "",
        supervisor: (profile as any).supervisor || "",
      });
    }
  }, [profile]);

  // Derive country from selected company_id
  const selectedCompany = companies.find((c) => c.id === form.company_id);
  const derivedCountry = selectedCompany?.country || "";

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await (supabase as any).from("profiles").upsert(
      {
        user_id: user.id,
        full_name: form.full_name,
        email: user.email,
        company_id: form.company_id || null,
        company: selectedCompany?.name || null,
        country: derivedCountry || null,
        cargo: form.cargo,
        supervisor: form.supervisor,
      },
      { onConflict: "user_id" }
    );
    if (error) {
      toast.error("Error al guardar: " + error.message);
    } else {
      toast.success("Perfil actualizado correctamente");
    }
    setSaving(false);
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Mi Perfil</CardTitle>
              <CardDescription>Edita tu información personal. El país se asigna automáticamente según tu compañía.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Email (solo lectura) */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs">Correo electrónico</Label>
            <p className="text-sm font-medium bg-muted/40 rounded-md px-3 py-2 border border-border/50">
              {user?.email || "—"}
            </p>
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="full_name">Nombre completo</Label>
            <Input
              id="full_name"
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              maxLength={100}
              placeholder="Tu nombre completo"
            />
          </div>

          {/* Compañía + País derivado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Compañía</Label>
              <Select
                value={form.company_id}
                onValueChange={(v) => setForm((f) => ({ ...f, company_id: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar compañía" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {companiesLoading
                    ? <SelectItem value="_loading" disabled>Cargando...</SelectItem>
                    : companies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">País (automático)</Label>
              <p className="text-sm font-medium bg-muted/40 rounded-md px-3 py-2 border border-border/50 h-10 flex items-center">
                {derivedCountry || "Selecciona una compañía"}
              </p>
            </div>
          </div>

          {/* Cargo y Supervisor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                value={form.cargo}
                onChange={(e) => setForm((f) => ({ ...f, cargo: e.target.value }))}
                maxLength={200}
                placeholder="Tu cargo en la empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisor">Supervisor Inmediato</Label>
              <Input
                id="supervisor"
                value={form.supervisor}
                onChange={(e) => setForm((f) => ({ ...f, supervisor: e.target.value }))}
                maxLength={200}
                placeholder="Nombre del supervisor"
              />
            </div>
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
