import type { BusinessSettings } from "./businessSettings";
import { defaultBusinessSettings } from "./businessSettings";

const KEY = "businessSettings:v1";

export function loadSettings(): BusinessSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultBusinessSettings;
    return { ...defaultBusinessSettings, ...JSON.parse(raw) };
  } catch {
    return defaultBusinessSettings;
  }
}

export function saveSettings(next: BusinessSettings) {
  localStorage.setItem(KEY, JSON.stringify(next));
}
