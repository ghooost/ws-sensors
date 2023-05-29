import React from "react";
import ReactDOM from "react-dom/client";
import { SensorsPage } from "@components/SensorsPage/SensorsPage.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SensorsPage />
  </React.StrictMode>
);
