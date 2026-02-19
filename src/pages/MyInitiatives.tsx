import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyInitiatives() {
  const { user } = useAuth();

  const { data: initiatives = [], isLoading } = useQuery({
    queryKey: ["my-initiatives", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("initiatives")
        .select("*")
        .eq("created_by", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mis Iniciativas</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proyecto</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initiatives.map((i: any) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.project || "—"}</TableCell>
                  <TableCell>{i.department || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(i.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link to={`/initiative/${i.id}`} className="text-primary hover:text-primary/80">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {initiatives.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No has registrado iniciativas aún
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
