import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { type BrandSettings, createAppTheme } from "../../app/theme/createAppTheme";
import { loadBrand, saveBrand } from "./brandStore";

type BrandContextValue = {
  brand: BrandSettings;
  setBrand: (next: BrandSettings) => void;
};

const BrandContext = React.createContext<BrandContextValue | null>(null);

export function useBrand() {
  const ctx = React.useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used inside BrandProvider");
  return ctx;
}

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrandState] = React.useState<BrandSettings>(() => loadBrand());

  const setBrand = (next: BrandSettings) => {
    setBrandState(next);
    saveBrand(next);
  };

  const theme = React.useMemo(() => createAppTheme(brand), [brand]);

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </BrandContext.Provider>
  );
}
