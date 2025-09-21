import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

// Admin section pages
import AdminHome from "./admin/Dashboard";
import Users from "./admin/Users";
import Episodes from "./admin/Episodes";
import AdminComments from "./admin/Comments";
import Settings from "./admin/Settings";

export default function AdminDashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="dashboard" element={<AdminHome />} />
        <Route path="users" element={<Users />} />
        <Route path="episodes" element={<Episodes />} />
        <Route path="comments" element={<AdminComments />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
