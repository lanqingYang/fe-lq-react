import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 路由使用history模式 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
