import { DashboardNavbar } from "@/components/dashboardNavbar/DashboardNavbar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      {/* The New Clean Navbar */}
      <DashboardNavbar />

      {/* Page Content */}
      <main className="animate-in fade-in duration-500">
        <Outlet />
      </main>
    </div>
  );
};
