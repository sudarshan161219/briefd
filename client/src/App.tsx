import { Routes, Route } from "react-router-dom";
import { ViewBrief } from "@/pages/view/ViewBrief";
import { ClientForm } from "@/pages/client/ClientForm";
import { Home } from "@/pages/home/Home";
import { ModalManager } from "@/components/modals/modalManager/ModalManager";
import { DashboardLayout } from "@/layout/dashboardLayout/DashboardLayout";
import { useGetUser } from "@/hooks/user/useGetUser";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { ClientBriefs } from "@/pages/clientBriefs/ClientBriefs";
import { Toaster } from "@/components/ui/sonner";
import styles from "./App.module.css";

export const App = () => {
  useGetUser();
  return (
    <div className={styles.app}>
      <Toaster richColors />
      <ModalManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brief/:id" element={<ClientForm />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients/:id" element={<ClientBriefs />} />
          <Route path="/brief/:id/view" element={<ViewBrief />} />
        </Route>
      </Routes>
    </div>
  );
};
