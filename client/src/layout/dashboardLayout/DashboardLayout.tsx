import { DashboardNavbar } from "@/components/dashboardNavbar/DashboardNavbar";
import { Dashboard } from "@/pages/dashboard/Dashboard";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      {/* The New Clean Navbar */}
      <DashboardNavbar />

      {/* Page Content */}
      <main className="animate-in fade-in duration-500">
        <Dashboard />
      </main>
    </div>
  );
};
