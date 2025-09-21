import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

function CreatorDashboard() {
  return (
    <DashboardLayout>
      {/* Nested creator pages will render here */}
      <Outlet />
    </DashboardLayout>
  );
}

export default CreatorDashboard;
