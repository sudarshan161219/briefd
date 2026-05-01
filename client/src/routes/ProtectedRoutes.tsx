import { Navigate } from "react-router-dom";
import { useGetUser } from "@/hooks/user/useGetUser";
import { DashboardLayout } from "@/layout/dashboardLayout/DashboardLayout";

export const ProtectedRoutes = () => {
  const { data, isLoading } = useGetUser();

  if (isLoading) return <h1>Loading....</h1>;

  return data ? <DashboardLayout /> : <Navigate to="/" />;
};
