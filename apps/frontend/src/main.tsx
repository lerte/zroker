import "./style.css";
import App from "./App";
import React from "react";
import "@radix-ui/themes/styles.css";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
