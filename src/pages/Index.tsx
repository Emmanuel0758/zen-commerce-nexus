import { useEffect, useState } from "react";
import { SidebarNav } from "@/components/SidebarNav";
import { StatCard } from "@/components/StatCard";
import { SalesChart } from "@/components/SalesChart";
import { LatestOrdersCard } from "@/components/LatestOrdersCard";
import { ProductInventoryCard } from "@/components/ProductInventoryCard";
import { DeliveryMapCard } from "@/components/DeliveryMapCard";
import { useAppSettings } from "@/hooks/use-app-settings";

// Translations for the dashboard
const translations = {
  fr: {
    dashboard: "Tableau de bord",
    welcome: "Bienvenue dans votre espace",
    salesTitle: "Ventes Aujourd'hui",
    pendingOrdersTitle: "Commandes En Attente",
    lowStockTitle: "Stock Bas (Zen Classic)",
    deliveriesTitle: "Livraisons En Cours",
    units: "unités"
  },
  en: {
    dashboard: "Dashboard",
    welcome: "Welcome to your workspace",
    salesTitle: "Today's Sales",
    pendingOrdersTitle: "Pending Orders",
    lowStockTitle: "Low Stock (Zen Classic)",
    deliveriesTitle: "Active Deliveries",
    units: "units"
  }
};

export default function Index() {
  const { settings } = useAppSettings();
  const { currency, language } = settings;
  
  // Add fallback to 'fr' if language is not in translations
  const t = translations[language as keyof typeof translations] || translations.fr;
  
  // Toujours retourner CFA pour l'affichage
  const currencySymbol = "CFA";

  // Add console logs to help debug future issues
  console.log("Current language:", language);
  console.log("Available translations:", Object.keys(translations));
  console.log("Using translations:", t ? "Found" : "Not found");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav />
      <div className="flex-1 overflow-y-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t.dashboard}</h1>
          <p className="text-muted-foreground">
            {t.welcome} {settings.appName}
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title={t.salesTitle}
            value={`1 250 ${currencySymbol}`}
            trend={8.2}
            type="sales"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zen-700 dark:text-zen-300"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
            }
          />
          <StatCard
            title={t.pendingOrdersTitle}
            value="15"
            type="orders"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-700 dark:text-blue-300"
              >
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            }
          />
          <StatCard
            title={t.lowStockTitle}
            value={`85 ${t.units}`}
            trend={-12.7}
            type="inventory"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-700 dark:text-amber-300"
              >
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                <path d="M16 8h4" />
                <path d="M18 6v4" />
                <path d="M16 16h4" />
                <path d="M8 14h0" />
                <path d="M8 10h0" />
              </svg>
            }
          />
          <StatCard
            title={t.deliveriesTitle}
            value="8"
            type="delivery"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-700 dark:text-green-300"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18h2a1 1 0 0 0 1-1v-3h3.4a1 1 0 0 0 .8-.4l2.8-3.4a1 1 0 0 0 .2-.6V8a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v9Z" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
              </svg>
            }
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SalesChart />
          <LatestOrdersCard />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProductInventoryCard />
          <DeliveryMapCard />
        </section>
      </div>
    </div>
  );
}
