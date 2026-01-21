import * as React from "react";

export type ThemeMode = "light" | "dark";

export type BusinessSettings = {
  // Branding / theming
  mode: ThemeMode;
  primaryColor: string;

  // Business identity + onboarding
  businessName: string;
  timezone: string;
  hoursHint: string;
  onboardingComplete: boolean;
};

type SettingsContextValue = {
  settings: BusinessSettings;
  updateSettings: (patch: Partial<BusinessSettings>) => void;
  resetSettings: () => void;
};

const STORAGE_KEY = "app.settings.v1";

const DEFAULT_SETTINGS: BusinessSettings = {
  mode: "light",
  primaryColor: "#1976d2",

  businessName: "Schedule",
  timezone: "America/Chicago",
  hoursHint: "Mon–Fri 9:00 AM–6:00 PM",
  onboardingComplete: false,
};

const SettingsContext = React.createContext<SettingsContextValue | null>(null);

function safeParse(json: string | null) {
  if (!json) return null;
  try {
    return JSON.parse(json) as Partial<BusinessSettings>;
  } catch {
    return null;
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<BusinessSettings>(() => {
    const saved = safeParse(localStorage.getItem(STORAGE_KEY));
    return {
      ...DEFAULT_SETTINGS,
      ...(saved ?? {}),
    };
  });

  // Persist to localStorage on changes
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = React.useCallback((patch: Partial<BusinessSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...patch,
    }));
  }, []);

  const resetSettings = React.useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
  }, []);

  const value: SettingsContextValue = React.useMemo(
    () => ({ settings, updateSettings, resetSettings }),
    [settings, updateSettings, resetSettings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
