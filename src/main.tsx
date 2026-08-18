import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/noto-sans-sc";
import "material-symbols/outlined.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../tokens.css";
import "./styles/global.css";
import "./styles/cosmic-redesign.css";
import { App } from "./App";

if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
