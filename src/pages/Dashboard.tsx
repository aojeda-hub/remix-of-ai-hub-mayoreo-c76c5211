import { useState, useMemo } from "react";
import { useInitiatives } from "@/hooks/use-initiatives";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  Building2,
  CircleDot,
  Globe2,
  Users,
} from "lucide-react";

const COMPANIES = ["Febeca", "Sillaca", "Beval", "Cofersa", "Mundial de partes", "Mayoreo"];
const COMPANY_TARGET = 50;
const GLOBAL_TARGET = COMPANIES.length * COMPANY_TARGET;
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2025 + 1 }, (_, i) => 2025 + i);

function extractClassification(description?: string | null): string | null {
  if (!description) return null;
  const m = description.match(/^\[Clasificación:\s*([^\]]+)\]/i);
  return m ? m[1].trim() : null;
}

export default function Dashboard() {
  const { data: initiatives = [], isLoading } = useInitiatives();
  const [filterYear, setFilterYear] = useState<string>(String(CURRENT_YEAR));

  const countableInitiatives = useMemo(() => {
    const base = initiatives.filter((i: any) => i.source !== "seguimiento");
    if (filterYear === "all") return base;
    return base.filter(
      (i: any) => new Date(i.created_at).getFullYear() === Number(filterYear),
    );
  }, [initiatives, filterYear]);

  const totalGlobal = countableInitiatives.length;
  const avancePct = GLOBAL_TARGET > 0 ? Math.round((totalGlobal / GLOBAL_TARGET) * 100) : 0;

  // Sub-tipos por clasificación
  const subTypes = useMemo(() => {
    const counts = {
      proceso: 0,
      actividad: 0,
      tarea: 0,
    };
    countableInitiatives.forEach((i: any) => {
      const cls = (extractClassification(i.description) || "").toLowerCase();
      if (cls.includes("proceso")) counts.proceso += 1;
      else if (cls.includes("actividad")) counts.actividad += 1;
      else if (cls.includes("tarea")) counts.tarea += 1;
    });
    return [
      {
        label: "Mejoran Procesos",
        value: counts.proceso,
        icon: Award,
        accent: {
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-600",
          cardBorder: "border-emerald-200/70",
          cardBg: "bg-gradient-to-br from-emerald-50/70 to-transparent",
        },
      },
      {
        label: "Mejoran Actividades",
        value: counts["Mejora de Actividad"],
        icon: Users,
        accent: {
          iconBg: "bg-amber-50",
          iconColor: "text-amber-600",
          cardBorder: "border-amber-200/70",
          cardBg: "bg-gradient-to-br from-amber-50/70 to-transparent",
        },
      },
      {
        label: "Mejoran Tareas",
        value: counts["Mejora de Tarea"],
        icon: CircleDot,
        accent: {
          iconBg: "bg-blue-50",
          iconColor: "text-blue-600",
          cardBorder: "border-blue-200/70",
          cardBg: "bg-gradient-to-br from-blue-50/70 to-transparent",
        },
      },
    ];
  }, [countableInitiatives]);

  // Meta por compañía
  const companyMeta = useMemo(() => {
    const counts: Record<string, number> = {};
    countableInitiatives.forEach((i: any) => {
      let c = i.company || "Sin compañía";
      if (c === "Prisma") c = "Mayoreo";
      counts[c] = (counts[c] || 0) + 1;
    });
    return COMPANIES.map((c) => ({ company: c, count: counts[c] || 0, target: COMPANY_TARGET }));
  }, [countableInitiatives]);

  // Departamento más activo
  const topDept = useMemo(() => {
    const counts: Record<string, number> = {};
    countableInitiatives.forEach((i: any) => {
      const d = i.department || "Sin departamento";
      counts[d] = (counts[d] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    return sorted[0] ? { name: sorted[0][0], count: sorted[0][1] } : null;
  }, [countableInitiatives]);

  // País más activo
  const topCountry = useMemo(() => {
    const counts: Record<string, number> = {};
    countableInitiatives.forEach((i: any) => {
      const c = i.country || "Sin país";
      counts[c] = (counts[c] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    return sorted[0] ? { name: sorted[0][0], count: sorted[0][1] } : null;
  }, [countableInitiatives]);

  // Top 3 iniciativas
  const top3 = useMemo(() => {
    return countableInitiatives.slice(0, 3).map((i: any, idx: number) => ({
      rank: idx + 1,
      id: i.id,
      title: i.project || "Sin nombre",
      company: i.company || "—",
    }));
  }, [countableInitiatives]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Cargando...
      </div>
    );
  }

  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Dashboard de Indicadores
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Resumen general de iniciativas IA registradas
          </p>
        </div>
        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger className="h-9 w-28 bg-card text-xs font-normal">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-popover">
            <SelectItem value="all">Todos</SelectItem>
            {YEARS.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Layout principal: 2 columnas (8/4) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Columna izquierda */}
        <Card className="rounded-3xl border-border/70 shadow-sm lg:col-span-2">
          <CardContent className="space-y-6 p-6">
            {/* Total Global */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total iniciativas Global</p>
                  <p className="mt-1 text-7xl font-extrabold tracking-tight text-foreground">
                    {totalGlobal}
                  </p>
                </div>
                <Link
                  to="/explorar"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                  aria-label="Ver detalle"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  {avancePct}%
                </span>
                <span className="text-sm text-muted-foreground">
                  de {GLOBAL_TARGET} iniciativas objetivo
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, avancePct)}%`,
                    background: "linear-gradient(90deg, #15276b 0%, #3b6fa0 100%)",
                  }}
                />
              </div>
            </div>

            {/* Sub-tipos */}
            <div className="grid grid-cols-1 gap-3 border-t border-border/60 pt-6 sm:grid-cols-3">
              {subTypes.map(({ label, value, icon: Icon, accent }) => {
                const pct = totalGlobal > 0 ? Math.round((value / totalGlobal) * 100) : 0;
                return (
                  <div
                    key={label}
                    className={`rounded-2xl border p-4 ${accent.cardBorder} ${accent.cardBg}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`rounded-md p-1.5 ${accent.iconBg}`}>
                        <Icon className={`h-3.5 w-3.5 ${accent.iconColor}`} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-extrabold tracking-tight text-foreground">
                          {value}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          iniciativas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-extrabold tracking-tight text-foreground">
                          {pct}%
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          del total
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Meta por Compañía */}
            <div className="border-t border-border/60 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-foreground">Meta por Compañía</h2>
                  <p className="text-xs text-muted-foreground">
                    Avance hacia {COMPANY_TARGET} iniciativas
                  </p>
                </div>
                <Link
                  to="/explorar"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Ver todas
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {companyMeta.map(({ company, count, target }) => {
                  const pct =
                    target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 0;
                  return (
                    <div
                      key={company}
                      className="rounded-xl border border-border/60 bg-card p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50">
                            <Building2 className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <span className="truncate text-sm font-semibold text-foreground">
                            {company}
                          </span>
                        </div>
                        <span className="shrink-0 text-xs font-medium text-muted-foreground">
                          {count}/{target}
                        </span>
                      </div>
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background:
                              "linear-gradient(90deg, #15276b 0%, #3b6fa0 100%)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna derecha */}
        <div className="space-y-4">
          {/* Departamento más activo */}
          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Departamento más activo
                  </p>
                  <p className="truncate text-lg font-bold text-foreground">
                    {topDept?.name ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {topDept ? `${topDept.count} iniciativas` : "Sin datos"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* País más activo */}
          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Globe2 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    País más activo
                  </p>
                  <p className="truncate text-lg font-bold text-foreground">
                    {topCountry?.name ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {topCountry ? `${topCountry.count} iniciativas` : "Sin datos"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top 3 Iniciativas */}
          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Top 3 Iniciativas
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Iniciativas destacadas
                  </p>
                </div>
              </div>
              {top3.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {top3.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-3 py-2.5"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                        {item.rank}
                      </span>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/initiative/${item.id}`}
                          className="block truncate text-sm font-semibold text-foreground hover:text-blue-600"
                        >
                          {item.title}
                        </Link>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.company}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">Sin iniciativas registradas</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
