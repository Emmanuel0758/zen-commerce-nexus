
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AppSettingsProvider } from "@/hooks/use-app-settings";

import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import ClientsPage from "./pages/ClientsPage";
import LogisticsPage from "./pages/LogisticsPage";
import MarketingPage from "./pages/MarketingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import QRCodePage from "./pages/QRCodePage";
import AIAssistantPage from "./pages/AIAssistantPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppSettingsProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/qr-code" element={<QRCodePage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/produits" element={<ProductsPage />} />
              <Route path="/commandes" element={<OrdersPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/logistique" element={<LogisticsPage />} />
              <Route path="/marketing" element={<MarketingPage />} />
              <Route path="/projets" element={<ProjectsPage />} />
              <Route path="/rapports" element={<ReportsPage />} />
              <Route path="/parametres" element={<SettingsPage />} />
              {/* Routes futures */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AppSettingsProvider>
  </QueryClientProvider>
);

export default App;
