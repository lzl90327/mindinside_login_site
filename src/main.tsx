import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LOGIN_PATHS } from "./config/routes";
import "./index.css";
import { AMSLoginPage } from "./pages/AMSLoginPage";
import { BMSLoginPage } from "./pages/BMSLoginPage";
import { CRMLoginPage } from "./pages/CRMLoginPage";
import { HRLoginPage } from "./pages/HRLoginPage";
import { MasterLoginPage } from "./pages/MasterLoginPage";
import { TMSLoginPage } from "./pages/TMSLoginPage";
import { WMSLoginPage } from "./pages/WMSLoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PATHS.wms} element={<WMSLoginPage />} />
        <Route path={LOGIN_PATHS.tms} element={<TMSLoginPage />} />
        <Route path={LOGIN_PATHS.crm} element={<CRMLoginPage />} />
        <Route path={LOGIN_PATHS.bms} element={<BMSLoginPage />} />
        <Route path={LOGIN_PATHS.hr} element={<HRLoginPage />} />
        <Route path={LOGIN_PATHS.asset} element={<AMSLoginPage />} />
        <Route path={LOGIN_PATHS.master} element={<MasterLoginPage />} />
        <Route path="/" element={<Navigate to={LOGIN_PATHS.wms} replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
