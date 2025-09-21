import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

function AdminDashboard() {
  return (
    <DashboardLayout>
      {/* Nested creator pages will render here */}
      <Outlet />
    </DashboardLayout>
  );
}

export default AdminDashboard;
