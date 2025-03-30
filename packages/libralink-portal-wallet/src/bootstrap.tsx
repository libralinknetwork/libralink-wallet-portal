import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter } from "react-router-dom";

// @ts-ignore
import { GlobalStateProvider } from "libralink-portal-shared/lib/global";
// @ts-ignore
import { SecurityProvider } from "libralink-portal-shared/lib/auth";
// @ts-ignore
import theme from "libralink-portal-shared/theme";
// @ts-ignore
import { SnackbarProvider } from "libralink-portal-shared/lib/snackbar";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <GlobalStateProvider>
      <SecurityProvider>
        <BrowserRouter>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SnackbarProvider maxSnack={3}>
                <App />
              </SnackbarProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </BrowserRouter>
      </SecurityProvider>
    </GlobalStateProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
