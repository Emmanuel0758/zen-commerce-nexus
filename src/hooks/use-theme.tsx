
import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "purple" | "teal" | "midnight" | "sunset";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const storedTheme = window.localStorage.getItem("theme") as Theme;
    if (storedTheme && ["light", "dark", "purple", "teal", "midnight", "sunset"].includes(storedTheme)) {
      return storedTheme;
    }
    
    // Check system preference for dark/light
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light", "dark", "purple", "teal", "midnight", "sunset");
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Store in localStorage
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
