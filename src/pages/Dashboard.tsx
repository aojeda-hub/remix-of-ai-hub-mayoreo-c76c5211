import { useInitiatives } from "@/hooks/use-initiatives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle, MapPin, Lightbulb, Target, Users } from "lucide-react";
import { useMemo } from "react";


const COMPANIES = ["Febeca", "Sillaca", "Beval", "Prisma", "Cofersa", "Mundial de partes", "OLO"];

export default function Dashboard() {
  const { data: initiatives = [], isLoading } = useInitiatives();


  const totalCount = initiatives.length;

  const activeCount = initiatives.filter((i: any) => ["en_progreso", "aprobado", "en_desarrollo", "en_pruebas"].includes(i.status)).length;

  // Meta por compañía
  const COMPANY_TARGETS: Record<string, number> = {
    Prisma: 100,
    Febeca: 50,
    Sillaca: 50,
    Beval: 50,
    Cofersa: 50,
    "Mundial de partes": 50,
    OLO: 50,
  };
  const companyMeta = useMemo(() => {
    const counts: Record<string, number> = {};
    initiatives.forEach((i: any) => {
      const c = i.company || "Sin compañía";
      counts[c] = (counts[c] || 0) + 1;
    });
    return COMPANIES.map(c => ({ company: c, count: counts[c] || 0 }));
  }, [initiatives]);

  // Top 3 del mes
  const top3 = useMemo(() => {
    const now = new Date();
    const thisMonth = initiatives.filter((i: any) => {
      const d = new Date(i.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    return thisMonth.slice(0, 3);
  }, [initiatives]);

  // Área más activa
  const topDept = useMemo(() => {
    const counts: Record<string, number> = {};
    initiatives.forEach((i: any) => {
      const d = i.department || "Sin departamento";
      counts[d] = (counts[d] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    return sorted[0]?.[0] || "—";
  }, [initiatives]);

  // País más activo
  const topCountry = useMemo(() => {
    const counts: Record<string, number> = {};
    initiatives.forEach((i: any) => {
      const c = i.country || "Sin país";
      counts[c] = (counts[c] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    return sorted[0]?.[0] || "—";
  }, [initiatives]);




  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Inicio</h2>

      {/* KPIs Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Target className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Iniciativas</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Activity className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Proyectos Activos</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10"><AlertCircle className="h-5 w-5 text-warning" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Reto Activo del Mes</p>
                <p className="text-sm font-medium">Automatizar 1 proceso</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Users className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Departamento más activo</p>
                <p className="text-base font-semibold truncate">{topDept}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">País más activo</p>
                <p className="text-base font-semibold">{topCountry}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Lightbulb className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Iniciativas Replicadas</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meta por compañía */}
      <Card>
        <CardHeader><CardTitle className="text-base">Meta por Compañía</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {companyMeta.map(({ company, count }) => (
              <div key={company} className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm font-medium truncate">{company}</span>
                <Badge variant="secondary">{count} / {COMPANY_TARGETS[company] || 50}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top 3 del mes */}
      <Card>
        <CardHeader><CardTitle className="text-base">Iniciativas Destacadas</CardTitle></CardHeader>
        <CardContent>
          {top3.length > 0 ? (
            <div className="space-y-2">
              {top3.map((i: any, idx: number) => (
                <div key={i.id} className="flex items-center gap-3 p-2 rounded-lg border">
                  <span className="text-lg font-bold text-primary">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{i.project || "Sin nombre"}</p>
                    <p className="text-sm text-muted-foreground">{i.company} — {i.department}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin iniciativas este mes</p>
          )}
        </CardContent>
      </Card>



    </div>
  );
}
