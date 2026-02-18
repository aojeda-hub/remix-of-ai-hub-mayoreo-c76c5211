import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NotificationBell } from "@/components/NotificationBell";
import logoMayoreo from "@/assets/Logo_Mayoreo_Isotipo.png";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b px-4 bg-card">
            <SidebarTrigger />
            <img src={logoMayoreo} alt="Logo Mayoreo" className="h-9 w-auto object-contain ml-3" />
            <h1 className="ml-3 text-lg font-semibold text-foreground">Gestión de Iniciativas IA</h1>
            <div className="ml-auto">
              <NotificationBell />
            </div>
          </header>
          <div className="flex-1 p-6 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
