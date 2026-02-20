import { LayoutDashboard, PlusCircle, Search, Users, BookOpen, Trophy, LogOut, Shield, TrendingUp, Rocket, UserCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/lib/auth";
import { useRole } from "@/hooks/use-role";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Inicio", url: "/", icon: LayoutDashboard },
  { title: "Registrar Iniciativa", url: "/register", icon: PlusCircle },
  { title: "Explorar Iniciativas", url: "/explorar", icon: Search },
  { title: "Comunidad IA Mayoreo", url: "/comunidad", icon: Users },
  { title: "Biblioteca IA", url: "/biblioteca", icon: BookOpen },
  { title: "Iniciativas en Desarrollo", url: "/en-desarrollo", icon: Rocket },
  { title: "Iniciativas Destacadas", url: "/top-iniciativas", icon: Trophy },
  { title: "Indicadores de Gestión", url: "/tendencia", icon: TrendingUp },
];

export function AppSidebar() {
  const { signOut, user } = useAuth();
  const { isAdmin } = useRole();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider">
            Iniciativas IA
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {isAdmin && (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/admin"
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Administración del Sistema</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/mi-perfil"
                className="hover:bg-sidebar-accent"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              >
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <p className="text-xs text-sidebar-foreground/60 truncate mt-3 mb-2">{user?.email}</p>
        <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/70" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
