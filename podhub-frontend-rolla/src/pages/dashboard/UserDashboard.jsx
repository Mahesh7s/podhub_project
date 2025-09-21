import DashboardLayout from "./DashboardLayout";
import { Outlet } from "react-router-dom";

export default function UserDashboard() {
  return (
    <DashboardLayout>
      {/* Nested routes will render here */}
      <Outlet />
    </DashboardLayout>
  );
}
