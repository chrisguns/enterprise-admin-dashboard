import * as React from "react";
import type { BusinessSettings } from "./businessSettings";
import { loadSettings, saveSettings } from "./settingsStore";

type Ctx = {
  settings: BusinessSettings;
  updateSettings: (updater: (prev: BusinessSettings) => BusinessSettings) => void;
};

const SettingsContext = React.createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<BusinessSettings>(() => loadSettings());

  const updateSettings: Ctx["updateSettings"] = (updater) => {
    setSettings((prev) => {
      const next = updater(prev);
      saveSettings(next);
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
