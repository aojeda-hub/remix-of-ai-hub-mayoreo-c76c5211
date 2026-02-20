import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import logoMayoreo from "@/assets/Logo_Mayoreo_Isotipo.png";
import { useCompanies } from "@/hooks/use-companies";

export default function Auth() {
  const { companies, loading: companiesLoading, getCountryByCompany } = useCompanies();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedCompany = companies.find((c) => c.id === companyId);
  const derivedCountry = selectedCompany?.country || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    } else {
      if (!companyId) {
        toast.error("Selecciona tu compañía");
        setLoading(false);
        return;
      }
      const country = derivedCountry;
      const companyName = selectedCompany?.name || "";
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, company: companyName, country },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error(error.message);
      } else {
        if (data.user) {
          await (supabase as any).from("profiles").upsert({
            user_id: data.user.id,
            full_name: fullName,
            email,
            company_id: companyId,
            country,
          }, { onConflict: "user_id" });
        }
        toast.success("Revisa tu correo para confirmar tu cuenta");
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <img src={logoMayoreo} alt="Logo Mayoreo" className="h-20 w-auto object-contain mx-auto" />
          </div>
          <CardTitle className="text-2xl">Iniciativas IA</CardTitle>
          <CardDescription>
            {isLogin ? "Inicia sesión para continuar" : "Crea tu cuenta"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    maxLength={100}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Compañía</Label>
                  <Select value={companyId} onValueChange={setCompanyId}>
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
                {derivedCountry && (
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">País (automático)</Label>
                    <p className="text-sm font-medium bg-muted/40 rounded-md px-3 py-2 border border-border/50">
                      {derivedCountry}
                    </p>
                  </div>
                )}
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              className="text-primary underline-offset-4 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
