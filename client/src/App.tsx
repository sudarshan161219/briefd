import { Routes, Route } from "react-router-dom";
import { ViewBrief } from "@/pages/view/ViewBrief";
import { ClientForm } from "@/pages/client/ClientForm";
import { Home } from "@/pages/home/Home";
import { ModalManager } from "@/components/modals/modalManager/ModalManager";
import { ProtectedRoutes } from "@/routes/ProtectedRoutes";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { ClientBriefs } from "@/pages/clientBriefs/ClientBriefs";
import { Toaster } from "@/components/ui/sonner";
import styles from "./App.module.css";
import { useGetUser } from "./hooks/user/useGetUser";

export const App = () => {
  useGetUser();

  return (
    <div className={styles.app}>
      <Toaster richColors />
      <ModalManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/b/:id" element={<ClientForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients/:id" element={<ClientBriefs />} />
          <Route path="/brief/:id/view" element={<ViewBrief />} />
        </Route>
      </Routes>
    </div>
  );
};
