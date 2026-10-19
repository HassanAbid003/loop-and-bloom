import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function ProtectedRoute() {
  const { token } = useAdminAuth();

  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Otherwise, render the admin layout (sidebar + page)
  return <Outlet />;
}