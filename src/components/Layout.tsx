
import React from "react";
import SidebarNav from "./SidebarNav";
import { useTheme } from "@/hooks/use-theme";
import ThemeSelector from "./ThemeSelector";
import { Button } from "./ui/button";
import { useAppSettings } from "@/hooks/use-app-settings";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const { theme } = useTheme();
  const { settings } = useAppSettings();

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col w-64 border-r px-4 py-6">
        <SidebarNav />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:hidden">
            {settings.logo ? (
              <img 
                src={settings.logo} 
                alt={settings.appName} 
                className="w-7 h-7 object-contain rounded" 
              />
            ) : (
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
                {settings.appName.substring(0, 1)}
              </div>
            )}
            <h2 className="font-semibold text-md">{settings.appName}</h2>
          </div>
          <h1 className="text-xl font-bold hidden md:block">{title}</h1>
          <div className="flex items-center gap-4">
            <ThemeSelector />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="md:hidden mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
