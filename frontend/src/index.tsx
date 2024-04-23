import { Container, createRoot } from "react-dom/client";
import { App } from "./App";
import React from "react";

const container = document.getElementById("root");

const root = createRoot(container as Container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
