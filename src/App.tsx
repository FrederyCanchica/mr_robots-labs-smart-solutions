import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TattooDemo from "./pages/demos/TattooDemo.tsx";
import BarberDemo from "./pages/demos/BarberDemo.tsx";
import LocalDemo from "./pages/demos/LocalDemo.tsx";
import MechanicDemo from "./pages/demos/MechanicDemo.tsx";
import LegalDemo from "./pages/demos/LegalDemo.tsx";
import ClinicDemo from "./pages/demos/ClinicDemo.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demos/tattoo" element={<TattooDemo />} />
            <Route path="/demos/barber" element={<BarberDemo />} />
            <Route path="/demos/local" element={<LocalDemo />} />
            <Route path="/demos/taller-mecanico" element={<MechanicDemo />} />
            <Route path="/demos/gestoria-pro" element={<LegalDemo />} />
            <Route path="/demos/clinica-vital" element={<ClinicDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
