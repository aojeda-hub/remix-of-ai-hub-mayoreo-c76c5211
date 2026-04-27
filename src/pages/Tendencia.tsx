import { useState, useMemo } from "react";
import { useInitiatives } from "@/hooks/use-initiatives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, ChevronDown, Filter, Check } from "lucide-react";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const ALL_COMPANIES = ["Febeca", "Sillaca", "Beval", "Mundial de partes", "Cofersa", "Mayoreo"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2025 + 1 }, (_, i) => 2025 + i);

type FilterKey = "all" | "tareas" | "actividades" | "procesos";

const filterOptions: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Todas las iniciativas" },
  { key: "tareas", label: "Iniciativas que mejoran tareas" },
  { key: "actividades", label: "Iniciativas que mejoran actividades" },
  { key: "procesos", label: "Iniciativas que mejoran procesos" },
];

type Accent = {
  cardBorder: string;
  cardBg: string;
  headerBg: string;
  headerText: string;
  totalRowBg: string;
  totalText: string;
  cellText: string;
};

const accents: Record<"tareas" | "actividades" | "procesos", Accent> = {
  tareas: {
    cardBorder: "border-blue-200/70",
    cardBg: "bg-gradient-to-br from-blue-50/60 to-transparent",
    headerBg: "bg-blue-50",
    headerText: "text-blue-700",
    totalRowBg: "bg-blue-100/60",
    totalText: "text-blue-800",
    cellText: "text-blue-700",
  },
  actividades: {
    cardBorder: "border-amber-200/70",
    cardBg: "bg-gradient-to-br from-amber-50/60 to-transparent",
    headerBg: "bg-amber-50",
    headerText: "text-amber-700",
    totalRowBg: "bg-amber-100/60",
    totalText: "text-amber-800",
    cellText: "text-amber-700",
  },
  procesos: {
    cardBorder: "border-emerald-200/70",
    cardBg: "bg-gradient-to-br from-emerald-50/60 to-transparent",
    headerBg: "bg-emerald-50",
    headerText: "text-emerald-700",
    totalRowBg: "bg-emerald-100/60",
    totalText: "text-emerald-800",
    cellText: "text-emerald-700",
  },
};

function getAccent(type: string): Accent {
  const lower = type.toLowerCase();
  if (lower.includes("tarea")) return accents.tareas;
  if (lower.includes("actividad")) return accents.actividades;
  return accents.procesos;
}

function extractClassification(description?: string | null): string | null {
  if (!description) return null;
  const m = description.match(/^\[Clasificación:\s*([^\]]+)\]/i);
  return m ? m[1].trim() : null;
}

function classificationToKey(cls: string | null): "tareas" | "actividades" | "procesos" | null {
  if (!cls) return null;
  const l = cls.toLowerCase();
  if (l.includes("tarea")) return "tareas";
  if (l.includes("actividad")) return "actividades";
  if (l.includes("proceso")) return "procesos";
  return null;
}

function InitiativeTypeTable({ type, values }: { type: string; values: number[] }) {
  const total = values.reduce((s, v) => s + v, 0);
  const accent = getAccent(type);
  return (
    <Card className={`w-full max-w-5xl ${accent.cardBorder} ${accent.cardBg}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-base ${accent.headerText}`}>{type}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <table className="w-full min-w-[850px] text-xs">
          <thead>
            <tr className={`border-b ${accent.headerBg}`}>
              <th className={`sticky left-0 z-10 min-w-[220px] border-r px-3 py-2 text-left font-semibold ${accent.headerBg} ${accent.headerText}`}>
                {type}
              </th>
              {MONTHS.map((m) => (
                <th key={m} className={`min-w-[60px] px-2 py-2 text-center font-semibold ${accent.headerText}`}>
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="sticky left-0 z-10 border-r bg-background px-3 py-2 font-medium">Total iniciativas</td>
              {values.map((v, i) => (
                <td key={i} className={`px-2 py-2 text-center font-semibold ${v > 0 ? accent.cellText : "text-muted-foreground"}`}>
                  {v}
                </td>
              ))}
            </tr>
            <tr className={`border-t-2 ${accent.totalRowBg}`}>
              <td className={`sticky left-0 z-10 border-r px-3 py-2 font-bold ${accent.totalRowBg} ${accent.totalText}`}>Total</td>
              <td colSpan={MONTHS.length} className={`px-2 py-2 text-center font-bold ${accent.totalText}`}>
                {total}
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default function Tendencia() {
  const { data: initiatives = [], isLoading } = useInitiatives();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [filterYear, setFilterYear] = useState<string>(String(CURRENT_YEAR));

  const selectedYear = filterYear === "all" ? null : Number(filterYear);

  // Filtrado base
  const filtered = useMemo(() => {
    let arr = (initiatives as any[]).filter((i) => i.source !== "seguimiento");
    if (selectedYear) {
      arr = arr.filter((i) => new Date(i.created_at).getFullYear() === selectedYear);
    }
    if (filter !== "all") {
      arr = arr.filter((i) => classificationToKey(extractClassification(i.description)) === filter);
    }
    return arr;
  }, [initiatives, selectedYear, filter]);

  // Matriz por compañía x mes
  const companyMatrix = useMemo(() => {
    const map: Record<string, number[]> = {};
    ALL_COMPANIES.forEach((c) => (map[c] = Array(12).fill(0)));
    filtered.forEach((i: any) => {
      let c = i.company || "Sin compañía";
      if (c === "Prisma") c = "Mayoreo";
      if (!map[c]) return;
      const month = new Date(i.created_at).getMonth();
      map[c][month] += 1;
    });
    return map;
  }, [filtered]);

  const monthTotals = useMemo(() => {
    const totals = Array(12).fill(0);
    ALL_COMPANIES.forEach((c) => {
      companyMatrix[c].forEach((v, idx) => (totals[idx] += v));
    });
    return totals;
  }, [companyMatrix]);

  // Filas por tipo de iniciativa
  const initiativeTypeRows = useMemo(() => {
    const types = [
      { key: "tareas" as const, type: "Iniciativas que mejoran tareas" },
      { key: "actividades" as const, type: "Iniciativas que mejoran actividades" },
      { key: "procesos" as const, type: "Iniciativas que mejoran procesos" },
    ];
    // Para tipo, partimos de iniciativas filtradas por año (sin filtro de tipo)
    let base = (initiatives as any[]).filter((i) => i.source !== "seguimiento");
    if (selectedYear) {
      base = base.filter((i) => new Date(i.created_at).getFullYear() === selectedYear);
    }
    return types.map(({ key, type }) => {
      const values = Array(12).fill(0);
      base.forEach((i: any) => {
        const k = classificationToKey(extractClassification(i.description));
        if (k === key) {
          values[new Date(i.created_at).getMonth()] += 1;
        }
      });
      return { key, type, values };
    });
  }, [initiatives, selectedYear]);

  const visibleTypeRows =
    filter === "all" ? initiativeTypeRows : initiativeTypeRows.filter((r) => r.key === filter);

  const currentFilterLabel =
    filterOptions.find((o) => o.key === filter)?.label ?? "Todas las iniciativas";

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">Cargando...</div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center space-y-6">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary/10 p-2">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Cuadro de tendencia Iniciativas Mayoreo
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Filter className="h-4 w-4" />
                <span className="max-w-[220px] truncate">{currentFilterLabel}</span>
                <ChevronDown className="h-4 w-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-50 w-64 bg-popover">
              <DropdownMenuLabel>Filtrar por tipo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.key}
                  onClick={() => setFilter(option.key)}
                  className="flex items-center justify-between gap-2"
                >
                  <span>{option.label}</span>
                  {filter === option.key && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="h-9 w-24 bg-card text-sm">
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
      </div>

      {filter === "all" && (
        <Card className="w-full max-w-5xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Cuadro de tendencia Iniciativas Mayoreo</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[850px] text-xs">
              <thead>
                <tr className="border-b">
                  <th className="sticky left-0 z-10 min-w-[150px] border-r bg-background px-3 py-2 text-left font-semibold">
                    Compañía
                  </th>
                  {MONTHS.map((m) => (
                    <th key={m} className="min-w-[60px] px-2 py-2 text-center font-semibold">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_COMPANIES.map((company) => (
                  <tr key={company} className="border-b">
                    <td className="sticky left-0 z-10 border-r bg-background px-3 py-2 font-medium">
                      {company}
                    </td>
                    {companyMatrix[company].map((v, i) => (
                      <td key={i} className="px-2 py-2 text-center font-semibold">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t-2 bg-muted/50">
                  <td className="sticky left-0 z-10 border-r bg-muted px-3 py-2 font-bold">Total</td>
                  {monthTotals.map((v, i) => (
                    <td key={i} className="px-2 py-2 text-center font-bold">
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {filter !== "all" &&
        visibleTypeRows.map((row) => (
          <InitiativeTypeTable key={row.key} type={row.type} values={row.values} />
        ))}
    </main>
  );
}
