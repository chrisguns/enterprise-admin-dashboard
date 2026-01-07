import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1E5EFF" },   // crisp enterprise blue
    secondary: { main: "#6E59F9" }, // subtle accent
    background: {
      default: "#F6F7FB",
      paper: "#FFFFFF",
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial"].join(","),
    h3: { fontWeight: 800, letterSpacing: -0.6 },
    h4: { fontWeight: 800, letterSpacing: -0.4 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid rgba(0,0,0,0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

