import { createTheme } from "@mui/material/styles";

export type BrandSettings = {
  businessName: string;
  mode: "light" | "dark";
  primaryColor: string; // hex string
};

export const defaultBrand: BrandSettings = {
  businessName: "Schedule",
  mode: "dark",
  primaryColor: "#FFFFFF", // Tesla-style: white accent
};

// Safety: MUI will crash if primaryColor is undefined/empty.
// This keeps your app alive even if localStorage has junk.
function safeColor(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

export function createAppTheme(brand: BrandSettings) {
  const mode = brand?.mode ?? defaultBrand.mode;
  const primaryMain = safeColor(brand?.primaryColor, defaultBrand.primaryColor);

  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: primaryMain },
      background: {
        default: isDark ? "#0B0D10" : "#F6F7F9",
        paper: isDark ? "#12151B" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#F8FAFC" : "#0B0D10",
        secondary: isDark ? "#9CA3AF" : "#4B5563",
      },
      divider: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    },

    shape: { borderRadius: 18 },

    typography: {
      fontFamily: [
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Arial",
        "sans-serif",
      ].join(","),
      h1: { fontWeight: 900, letterSpacing: -1.2 },
      h2: { fontWeight: 900, letterSpacing: -1.0 },
      h3: { fontWeight: 800, letterSpacing: -0.8 },
      h4: { fontWeight: 800, letterSpacing: -0.5 },
      button: { fontWeight: 700, textTransform: "none", letterSpacing: 0.2 },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#0B0D10" : "#F6F7F9",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 18,
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            backgroundImage: "none",
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
    },
  });
}
