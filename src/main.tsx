import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { colors } from "./constants/theme";
import "./index.css";
import App from "./App.tsx";

const rootStyle = document.documentElement.style;
rootStyle.setProperty("--color-background", colors.background);
rootStyle.setProperty("--color-surface", colors.surface);
rootStyle.setProperty("--color-surface-elevated", colors.surfaceElevated);
rootStyle.setProperty("--color-text-primary", colors.text.primary);
rootStyle.setProperty("--color-text-secondary", colors.text.secondary);
rootStyle.setProperty("--color-text-muted", colors.text.muted);
rootStyle.setProperty("--color-accent", colors.accent);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
