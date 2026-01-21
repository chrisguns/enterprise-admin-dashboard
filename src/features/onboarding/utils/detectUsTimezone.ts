// src/features/onboarding/utils/detectUsTimezone.ts
import { fallbackUsTimezone, isUsTimezone } from "../constants/usTimezones";

/**
 * Attempts to detect the user's IANA timezone from the browser.
 * Returns a US-only timezone if it matches our supported list,
 * otherwise returns a safe fallback.
 */
export function detectUsTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (isUsTimezone(tz)) return tz;
    return fallbackUsTimezone();
  } catch {
    return fallbackUsTimezone();
  }
}
