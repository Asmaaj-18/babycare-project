import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("accessToken");

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Si pas de user ET pas de token → retourne login
  if (!user && !token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;