
import React from "react";
import SidebarNav from "./SidebarNav";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useAppSettings } from "@/hooks/use-app-settings";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const { theme, setTheme } = useTheme();
  const { settings } = useAppSettings();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
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
