// src/features/onboarding/constants/usTimezones.ts
export type UsTimezoneOption = {
    value: string; // IANA timezone
    label: string;
  };
  
  // US-only time zones (IANA). Kept intentionally small + user-friendly.
  // If you want more granular options later (e.g., Indiana variants), we can expand.
  export const US_TIMEZONES: UsTimezoneOption[] = [
    { value: "America/New_York", label: "Eastern (New York)" },
    { value: "America/Chicago", label: "Central (Chicago)" },
    { value: "America/Denver", label: "Mountain (Denver)" },
    { value: "America/Phoenix", label: "Arizona (Phoenix)" }, // no DST
    { value: "America/Los_Angeles", label: "Pacific (Los Angeles)" },
    { value: "America/Anchorage", label: "Alaska (Anchorage)" },
    { value: "America/Adak", label: "Aleutian (Adak)" },
    { value: "Pacific/Honolulu", label: "Hawaii (Honolulu)" },
  ];
  
  // Quick lookup helpers
  export const US_TIMEZONE_VALUES = new Set(US_TIMEZONES.map((t) => t.value));
  
  export function isUsTimezone(tz: string | null | undefined): tz is string {
    return !!tz && US_TIMEZONE_VALUES.has(tz);
  }
  
  export function fallbackUsTimezone(): string {
    return "America/Chicago";
  }
  