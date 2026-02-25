import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo } from "react";

const ALL_COMPANIES = ["Prisma", "Febeca", "Sillaca", "Beval", "Mundial de Partes", "Cofersa", "OLO", "Mayoreo"];

const MONTH_NAMES: Record<number, string> = {
  1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr",
  5: "May", 6: "Jun", 7: "Jul", 8: "Ago",
  9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic",
};

export default function Tendencia() {
  const { data: initiatives = [], isLoading } = useQuery({
    queryKey: ["initiatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("initiatives")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const now = new Date();
  const currentYear = now.getFullYear();

  const trendData = useMemo(() => {
    const companies = new Map<string, Map<string, number>>();
    const countable = initiatives.filter((i: any) => i.source !== "seguimiento");

    countable.forEach((i: any) => {
      const d = new Date(i.created_at);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const company = i.company || "Sin compañía";
      if (!companies.has(company)) companies.set(company, new Map());
      const monthMap = companies.get(company)!;
      monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
    });

    const months: string[] = [];
    for (let m = 1; m <= 12; m++) {
      months.push(`2026-${String(m).padStart(2, "0")}`);
    }

    ALL_COMPANIES.forEach((c) => {
      if (!companies.has(c)) companies.set(c, new Map());
    });

    return { companies, months };
  }, [initiatives]);

  const monthTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    trendData.months.forEach((m) => { totals[m] = 0; });
    ALL_COMPANIES.forEach((company) => {
      const monthMap = trendData.companies.get(company);
      if (!monthMap) return;
      monthMap.forEach((count, month) => {
        if (totals[month] !== undefined) totals[month] += count;
      });
    });
    return totals;
  }, [trendData]);

  const formatMonth = (key: string) => {
    const [, m] = key.split("-").map(Number);
    return MONTH_NAMES[m];
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full">
        <h2 className="text-2xl font-bold">Cuadro de tendencia Iniciativas Mayoreo</h2>
      </div>

      <Card className="w-full max-w-5xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Cuadro de tendencia Iniciativas Mayoreo</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-background z-10 min-w-[130px] font-semibold border-r py-2 px-3">Compañía</TableHead>
                {trendData.months.map((m) => (
                  <TableHead key={m} className="text-center min-w-[60px] font-semibold py-2 px-2">{formatMonth(m)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ALL_COMPANIES.map((company) => {
                const monthMap = trendData.companies.get(company)!;
                return (
                  <TableRow key={company}>
                    <TableCell className="font-medium sticky left-0 bg-background z-10 border-r py-1.5 px-3">{company}</TableCell>
                    {trendData.months.map((m) => (
                      <TableCell key={m} className="text-center font-semibold py-1.5 px-2">
                        {monthMap.get(m) || 0}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              <TableRow className="bg-muted/50 border-t-2">
                <TableCell className="font-bold sticky left-0 bg-muted/50 z-10 border-r py-1.5 px-3">Total</TableCell>
                {trendData.months.map((m) => (
                  <TableCell key={m} className="text-center font-bold py-1.5 px-2">
                    {monthTotals[m] || 0}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
