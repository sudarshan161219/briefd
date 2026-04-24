import { Routes, Route } from "react-router-dom";
import { ViewBrief } from "@/pages/view/ViewBrief";
import { ClientForm } from "@/pages/client/ClientForm";
import { Home } from "@/pages/home/Home";
import { ModalManager } from "@/components/modals/modalManager/ModalManager";
import { DashboardLayout } from "@/layout/dashboardLayout/DashboardLayout";
import { useGetUser } from "@/hooks/user/useGetUser";
import styles from "./App.module.css";

export const App = () => {
  useGetUser();
  return (
    <div className={styles.app}>
      <ModalManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/brief/:id" element={<ClientForm />} />
        <Route path="/brief/:id/view" element={<ViewBrief />} />
      </Routes>
    </div>
  );
};
