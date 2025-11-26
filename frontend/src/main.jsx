import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // This is the correct import
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// 1. Get the root DOM element
const rootElement = document.getElementById("root");

// 2. Create a root
const root = createRoot(rootElement);

// 3. Render the app into the root
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
