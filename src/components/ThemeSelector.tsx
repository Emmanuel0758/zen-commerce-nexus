
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Palette, Cloud, Sunset, Paintbrush } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeOptionProps {
  value: "light" | "dark" | "purple" | "teal" | "midnight" | "sunset";
  label: string;
  icon: React.ReactNode;
  onClick: (theme: "light" | "dark" | "purple" | "teal" | "midnight" | "sunset") => void;
  active: boolean;
}

const ThemeOption = ({ value, label, icon, onClick, active }: ThemeOptionProps) => {
  return (
    <DropdownMenuItem 
      className={cn(
        "flex items-center gap-2 cursor-pointer", 
        active && "bg-accent"
      )}
      onClick={() => onClick(value)}
    >
      {icon}
      <span>{label}</span>
    </DropdownMenuItem>
  );
};

export function ThemeSelector({ variant = "ghost", floating = false }: { variant?: "ghost" | "outline"; floating?: boolean }) {
  const { theme, setTheme } = useTheme();
  
  const floatingClass = floating ? "fixed bottom-4 left-4 z-50 shadow-lg rounded-full" : "";
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon" aria-label="Change theme" className={floatingClass}>
          {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "purple" && <Palette className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "teal" && <Paintbrush className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "midnight" && <Cloud className="h-[1.2rem] w-[1.2rem] text-primary" />}
          {theme === "sunset" && <Sunset className="h-[1.2rem] w-[1.2rem] text-primary" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeOption
          value="light"
          label="Clair"
          icon={<Sun className="h-4 w-4" />}
          onClick={setTheme}
          active={theme === "light"}
        />
        <ThemeOption
          value="dark"
          label="Sombre"
          icon={<Moon className="h-4 w-4" />}
          onClick={setTheme}
          active={theme === "dark"}
        />
        <ThemeOption
          value="purple"
          label="Violet"
          icon={<Palette className="h-4 w-4" />}
          onClick={setTheme}
          active={theme === "purple"}
        />
        <ThemeOption
          value="teal"
          label="Turquoise"
          icon={<Paintbrush className="h-4 w-4" />}
          onClick={setTheme}
          active={theme === "teal"}
        />
        <ThemeOption
          value="midnight"
          label="Minuit"
          icon={<Cloud className="h-4 w-4" />}
          onClick={setTheme}
          active={theme === "midnight"}
        />
        <ThemeOption
          value="sunset"
          label="Coucher de soleil"
          icon={<Sunset className="h-4 w-4" />}
          onClick={setTheme}
          active={theme === "sunset"}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeSelector;
