import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRole } from "@/hooks/use-role";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

interface UserWithRole {
  user_id: string;
  full_name: string;
  email: string;
  role: string;
  role_id: string | null;
}

export default function AdminRoles() {
  const { isAdmin, loading: roleLoading } = useRole();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);

    // Get profiles
    const { data: profiles } = await (supabase as any)
      .from("profiles")
      .select("user_id, full_name");

    // Get roles
    const { data: roles } = await (supabase as any)
      .from("user_roles")
      .select("id, user_id, role");

    if (profiles) {
      const merged: UserWithRole[] = profiles.map((p: any) => {
        const userRole = roles?.find((r: any) => r.user_id === p.user_id);
        return {
          user_id: p.user_id,
          full_name: p.full_name || "Sin nombre",
          email: "",
          role: (userRole as any)?.role ?? "colaborador",
          role_id: (userRole as any)?.id ?? null,
        };
      });
      setUsers(merged);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!roleLoading && isAdmin) {
      fetchUsers();
    }
  }, [roleLoading, isAdmin]);

  const handleRoleChange = async (userId: string, newRole: string, currentRoleId: string | null) => {
    if (currentRoleId) {
      const { error } = await (supabase as any)
        .from("user_roles")
        .update({ role: newRole })
        .eq("id", currentRoleId);

      if (error) {
        toast.error("Error al actualizar rol: " + error.message);
        return;
      }
    } else {
      const { error } = await (supabase as any)
        .from("user_roles")
        .insert({ user_id: userId, role: newRole });

      if (error) {
        toast.error("Error al asignar rol: " + error.message);
        return;
      }
    }

    toast.success("Rol actualizado correctamente");
    fetchUsers();
  };

  if (roleLoading) {
    return <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">Cargando...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground gap-4">
        <ShieldAlert className="h-12 w-12" />
        <p className="text-lg">No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Gestión de Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Cargando usuarios...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol Actual</TableHead>
                  <TableHead>Cambiar Rol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.user_id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{u.full_name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={u.role}
                        onValueChange={(v) => handleRoleChange(u.user_id, v, u.role_id)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="director">Director</SelectItem>
                          <SelectItem value="gerente">Gerente</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="colaborador">Colaborador</SelectItem>
                          <SelectItem value="invitado">Invitado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
