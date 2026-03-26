import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import { AppLayout } from "@/components/AppLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import MyInitiatives from "./pages/MyInitiatives";
import InitiativeDetail from "./pages/InitiativeDetail";
import ExplorarIniciativas from "./pages/ExplorarIniciativas";
import ComunidadIA from "./pages/ComunidadIA";
import BibliotecaIA from "./pages/BibliotecaIA";
import IniciativasEnDesarrollo from "./pages/IniciativasEnDesarrollo";
import TopIniciativas from "./pages/TopIniciativas";
import Tendencia from "./pages/Tendencia";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Cargando...</div>;
  if (!session) return <Navigate to="/auth" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AuthRoute() {
  const { session, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Cargando...</div>;
  if (session) return <Navigate to="/" replace />;
  return <Auth />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthRoute />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
            <Route path="/my-initiatives" element={<ProtectedRoute><MyInitiatives /></ProtectedRoute>} />
            <Route path="/initiative/:id" element={<ProtectedRoute><InitiativeDetail /></ProtectedRoute>} />
            <Route path="/explorar" element={<ProtectedRoute><ExplorarIniciativas /></ProtectedRoute>} />
            <Route path="/comunidad" element={<ProtectedRoute><ComunidadIA /></ProtectedRoute>} />
            <Route path="/biblioteca" element={<ProtectedRoute><BibliotecaIA /></ProtectedRoute>} />
            <Route path="/en-desarrollo" element={<ProtectedRoute><IniciativasEnDesarrollo /></ProtectedRoute>} />
            <Route path="/top-iniciativas" element={<ProtectedRoute><TopIniciativas /></ProtectedRoute>} />
            <Route path="/tendencia" element={<ProtectedRoute><Tendencia /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
