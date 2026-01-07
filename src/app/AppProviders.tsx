import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SettingsProvider, useSettings } from "../core/settings/SettingsProvider";
import { createAppTheme } from "./theme/createAppTheme";

function Themed({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  const theme = React.useMemo(() => createAppTheme(settings), [settings]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <Themed>{children}</Themed>
    </SettingsProvider>
  );
}
