import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import { useAuthStore } from "./store/user/useAuthStore";

const ProtectedRoutes = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // Redirect them to the home page (or login page) if not logged in
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Renders the child routes if authenticated
};

export const App = () => {
  return (
    <div className={styles.app}>
      <Toaster richColors />
      <ModalManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brief/:id" element={<ClientForm />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients/:id" element={<ClientBriefs />} />
            <Route path="/brief/:id/view" element={<ViewBrief />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
