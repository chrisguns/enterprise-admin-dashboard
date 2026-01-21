export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type DayHours =
  | { closed: true }
  | { closed: false; open: string; close: string }; // "09:00" "17:30"

export type SchedulingRules = {
  slotIntervalMinutes: 15 | 30;
  bufferMinutes: 0 | 5 | 10 | 15;
  minAdvanceMinutes: 0 | 60 | 120 | 240;
  maxAdvanceDays: 7 | 14 | 30 | 60;
};

export type ThemePrefs = {
  mode: "light" | "dark";
  primary: string; // hex
  accent: string;  // hex
};

export type BusinessSettings = {
  businessName: string;
  businessHours: string;
  theme: ThemePrefs;
  hours: Record<DayKey, DayHours>;
  rules: SchedulingRules;
  mode?: string;
  primaryColor?: string; // Added primaryColor property
  timezone?: string;
  hoursHint?: string;
  onboardingComplete?: boolean;
};

export const defaultBusinessSettings: BusinessSettings = {
  businessName: "Stylist Studio",
  businessHours: "09:00 - 19:00", // Added businessHours property
  theme: {
    mode: "light",
    primary: "#1E5EFF",
    accent: "#6E59F9",
  },
  hours: {
    mon: { closed: false, open: "09:00", close: "17:00" },
    tue: { closed: false, open: "09:00", close: "17:00" },
    wed: { closed: false, open: "09:00", close: "17:00" },
    thu: { closed: false, open: "09:00", close: "19:00" },
    fri: { closed: false, open: "09:00", close: "19:00" },
    sat: { closed: false, open: "10:00", close: "15:00" },
    sun: { closed: true },
  },
  rules: {
    slotIntervalMinutes: 15,
    bufferMinutes: 10,
    minAdvanceMinutes: 120,
    maxAdvanceDays: 30,
  },
};
