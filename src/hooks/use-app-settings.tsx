import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppSettings {
  appName: string;
  logo: string | null;
  currency: string;
  theme: 'light' | 'dark' | 'system';
  emailTemplates: string;
  analyticsEnabled: boolean;
  language: 'fr' | 'en';
}

const defaultSettings: AppSettings = {
  appName: 'Zen Commerce',
  logo: null,
  currency: 'XOF',
  theme: 'system',
  emailTemplates: 'default',
  analyticsEnabled: true,
  language: 'fr'
};

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('appSettings', JSON.stringify(updated));
      return updated;
    });
  };

  const resetSettings = () => {
    localStorage.removeItem('appSettings');
    setSettings(defaultSettings);
  };

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
