import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SettingsProvider, useSettings } from "../core/settings/SettingsProvider";
import { AuthProvider } from "../core/auth/AuthProvider";
import { createAppTheme } from "./theme/createAppTheme";

function Themed({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();

  const theme = React.useMemo(() => {
    const brandSettings = {
      ...settings,
      mode: (settings.mode as "light" | "dark") || "light",
      primaryColor: settings.primaryColor || "#1976d2",
    };
    return createAppTheme(brandSettings);
  }, [settings]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Themed>{children}</Themed>
      </SettingsProvider>
    </AuthProvider>
  );
}
