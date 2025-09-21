// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData?.token) {
    // Already logged in → redirect to dashboard based on role
    if (userData.role === "admin") return <Navigate to="/dashboard/admin" replace />;
    if (userData.role === "creator") return <Navigate to="/dashboard/creator" replace />;
    return <Navigate to="/dashboard/user" replace />;
  }

  return children;
}

export default PublicRoute;
