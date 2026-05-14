import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, ShoppingCart, Settings, MapPin, Building2 } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function TopIniciativas() {
  const { data: initiatives = [], isLoading } = useQuery({
    queryKey: ["initiatives"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("initiatives").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("profiles").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Most replicated → destacada (placeholder - using high impact as proxy)

  const countableInitiatives = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return initiatives.filter((i: any) => {
      if (i.source === "seguimiento") return false;
      const initiativeYear = new Date(i.created_at).getFullYear();
      return initiativeYear === currentYear;
    });
  }, [initiatives]);

  // Best commercial (department contains "Comercial" or "Ventas")
  const topCommercial = useMemo(() => {
    return countableInitiatives.find((i: any) => i.department?.toLowerCase().includes("comercial") || i.department?.toLowerCase().includes("ventas"));
  }, [countableInitiatives]);

  // Best operational (department contains "Operaciones" or "Logística" or "Procesos")
  const topOperational = useMemo(() => {
    return countableInitiatives.find((i: any) => i.department?.toLowerCase().includes("operacion") || i.department?.toLowerCase().includes("logística") || i.department?.toLowerCase().includes("procesos"));
  }, [countableInitiatives]);

  // Most collaborative user
  const topCollaborator = useMemo(() => {
    const counts: Record<string, number> = {};
    countableInitiatives.forEach((i: any) => {
      if (i.created_by) counts[i.created_by] = (counts[i.created_by] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    if (!sorted.length) return null;
    const [userId, count] = sorted[0];
    const profile = profiles.find((p: any) => p.user_id === userId);
    return { name: profile?.full_name || "Usuario", count };
  }, [countableInitiatives, profiles]);

  // Most replicated (placeholder - using high impact as proxy)
  const topReplicated = useMemo(() => {
    const specificApp = countableInitiatives.find((i: any) => 
      (i.project || "").trim().toLowerCase() === "app de negociaciones especiales"
    );
    if (specificApp) return specificApp;

    return countableInitiatives.find((i: any) => i.impact === "high");
  }, [countableInitiatives]);

  // Top initiative per country
  const topByCountry = useMemo(() => {
    const countryMap: Record<string, any[]> = {};
    countableInitiatives.forEach((i: any) => {
      const c = i.country || "Sin país";
      if (!countryMap[c]) countryMap[c] = [];
      countryMap[c].push(i);
    });
    return Object.entries(countryMap).map(([country, items]) => ({
      country,
      initiative: items[0],
      count: items.length,
    }));
  }, [countableInitiatives]);

  // Department with most initiatives
  const topDepartment = useMemo(() => {
    const counts: Record<string, number> = {};
    countableInitiatives.forEach((i: any) => {
      const d = i.department || "Sin departamento";
      counts[d] = (counts[d] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    return sorted[0] ? { department: sorted[0][0], count: sorted[0][1] } : null;
  }, [countableInitiatives]);

  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  const cards = [
    {
      title: "Iniciativa más destacada",
      icon: Trophy,
      initiative: topReplicated,
      color: "text-yellow-500",
    },
    {
      title: "Mejor iniciativa comercial",
      icon: ShoppingCart,
      initiative: topCommercial,
      color: "text-green-600",
    },
    {
      title: "Mejor iniciativa operativa",
      icon: Settings,
      initiative: topOperational,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">🏆 Iniciativas Destacadas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map(({ title, icon: Icon, initiative, color }) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${color}`} />
                <CardTitle className="text-base">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {initiative ? (
                <div className="space-y-1">
                  <Link to={`/initiative/${initiative.id}`} className="font-medium text-primary hover:underline">
                    {initiative.project || "Sin nombre"}
                  </Link>
                  <p className="text-sm text-muted-foreground">{initiative.company} — {initiative.department}</p>
                  
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Sin datos disponibles</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>




      {/* Department with most initiatives */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent-foreground" />
            <CardTitle className="text-base">Departamento con mayor número de iniciativas</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {topDepartment ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                🏢
              </div>
              <div>
                <p className="font-medium">{topDepartment.department}</p>
                <p className="text-sm text-muted-foreground">{topDepartment.count} iniciativas registradas</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin datos disponibles</p>
          )}
        </CardContent>
      </Card>

      {/* Top initiative by country */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Iniciativa destacada por país</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {topByCountry.length > 0 ? (
            <div className="space-y-3">
              {topByCountry.map(({ country, initiative, count }) => (
                <div key={country} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                    🌎
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{country} ({count} iniciativas)</p>
                    <Link to={`/initiative/${initiative.id}`} className="font-medium text-primary hover:underline truncate block">
                      {initiative.project || "Sin nombre"}
                    </Link>
                    <p className="text-sm text-muted-foreground">{initiative.company} — {initiative.department}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin datos disponibles</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
