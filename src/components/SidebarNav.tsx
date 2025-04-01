
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, ChevronLeft, ChevronRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    title: "Tableau de bord",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    title: "Produits",
    href: "/produits",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-package"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    title: "Commandes",
    href: "/commandes",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-cart"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
  {
    title: "Clients",
    href: "/clients",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-users"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "QR Code",
    href: "/qr-code",
    icon: <QrCode />,
  },
  {
    title: "Logistique",
    href: "/logistique",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-truck"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18h2a1 1 0 0 0 1-1v-3h3.4a1 1 0 0 0 .8-.4l2.8-3.4a1 1 0 0 0 .2-.6V8a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v9Z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Marketing",
    href: "/marketing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-megaphone"
      >
        <path d="m3 11 18-5v12L3 13Z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  },
  {
    title: "Rapports",
    href: "/rapports",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-pie-chart"
      >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  {
    title: "Paramètres",
    href: "/parametres",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-settings"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export function SidebarNav() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen border-r bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div 
          className={cn(
            "flex items-center gap-2 border-b px-4 py-5", 
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-zen-500 flex items-center justify-center text-white font-bold">
                Z
              </div>
              <h2 className="text-lg font-bold">Zen Commerce</h2>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-full bg-zen-500 flex items-center justify-center text-white font-bold">
              Z
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
        <nav className="flex-1 overflow-auto px-3 py-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "text-sidebar-foreground"
                  )}
                >
                  <span className="mr-3 h-5 w-5">{item.icon}</span>
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={cn("p-4 border-t", collapsed ? "flex justify-center" : "")}>
          <Button 
            variant="outline" 
            size={collapsed ? "icon" : "default"} 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {!collapsed && <span className="ml-2">{theme === "dark" ? "Mode Clair" : "Mode Sombre"}</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
