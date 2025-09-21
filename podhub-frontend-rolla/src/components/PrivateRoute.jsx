// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ role }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("PrivateRoute userData:", userData);
  if (!userData?.token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && userData.role !== role) {
    // Role mismatch → redirect them to their own dashboard
    if (userData.role === "admin") return <Navigate to="/dashboard/admin" replace />;
    if (userData.role === "creator") return <Navigate to="/dashboard/creator" replace />;
    return <Navigate to="/dashboard/user" replace />;
  }

  // ✅ Important: use Outlet so nested routes work
  return <Outlet />;
}

export default PrivateRoute;
