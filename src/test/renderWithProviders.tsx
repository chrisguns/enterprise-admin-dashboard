import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../app/theme/theme";

export function renderWithProviders(ui: ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );
}
