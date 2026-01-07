import { createTheme } from "@mui/material/styles";
import type { BusinessSettings } from "../../core/settings/businessSettings";

export function createAppTheme(settings: BusinessSettings) {
  const { mode, primary, accent } = settings.theme;

  return createTheme({
    palette: {
      mode,
      primary: { main: primary },
      secondary: { main: accent },
      background: {
        default: mode === "dark" ? "#0B0F1A" : "#F6F7FB",
        paper: mode === "dark" ? "#101829" : "#FFFFFF",
      },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial"].join(","),
      h3: { fontWeight: 800, letterSpacing: -0.6 },
      h6: { fontWeight: 800 },
      button: { textTransform: "none", fontWeight: 800 },
    },
    components: {
      MuiCard: { defaultProps: { elevation: 0 } },
      MuiPaper: { defaultProps: { elevation: 0 } },
      MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
    },
  });
}
