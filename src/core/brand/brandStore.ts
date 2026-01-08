import { type BrandSettings, defaultBrand } from "../../app/theme/createAppTheme";

const KEY = "brand_settings_v1";

export function loadBrand(): BrandSettings {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BrandSettings) : defaultBrand;
  } catch {
    return defaultBrand;
  }
}

export function saveBrand(brand: BrandSettings) {
  localStorage.setItem(KEY, JSON.stringify(brand));
}
