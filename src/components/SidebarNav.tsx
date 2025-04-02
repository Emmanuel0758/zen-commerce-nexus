import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, Package, ShoppingCart, Users, Truck, BarChart2, 
  Settings, Megaphone, QrCode, Brain 
} from "lucide-react";
import { useAppSettings } from "@/hooks/use-app-settings";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const { settings } = useAppSettings();
  
  const items = [
    {
      title: "Tableau de bord",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Produits",
      href: "/produits",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Commandes",
      href: "/commandes",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Clients",
      href: "/clients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Logistique",
      href: "/logistique",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "Marketing",
      href: "/marketing",
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      title: "QR Code",
      href: "/qr-code",
      icon: <QrCode className="h-5 w-5" />,
    },
    {
      title: "Rapports",
      href: "/rapports",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Paramètres",
      href: "/parametres",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Assistant IA",
      href: "/ai-assistant",
      icon: <Brain className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="flex flex-col gap-6" {...props}>
      <div className="flex items-center gap-2 px-2 mb-6">
        {settings.logo ? (
          <img 
            src={settings.logo} 
            alt={settings.appName} 
            className="w-8 h-8 object-contain rounded" 
          />
        ) : (
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
            {settings.appName.substring(0, 1)}
          </div>
        )}
        <h2 className="text-lg font-semibold">{settings.appName}</h2>
      </div>
      
      <div className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default SidebarNav;
