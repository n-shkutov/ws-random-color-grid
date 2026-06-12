import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import "normalize.css";
import "@app/styles/global.css";

const root = document.getElementById("root");

if (!root) throw new Error("Missing #root element in HTML");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
