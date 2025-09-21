import { useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getCurrentUser } from "../../services/auth.service";

function DashboardLayout() {
  const location = useLocation();
  const user = getCurrentUser() || { role: "user", email: "guest@example.com" };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar for mobile
  const handleMenuToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar role={user.role} isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar user={user} onMenuToggle={handleMenuToggle} />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
