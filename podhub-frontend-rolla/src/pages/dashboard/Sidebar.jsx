import { NavLink } from "react-router-dom";
import {
  Home, User, Headphones, Users,
  FileAudio, MessageSquare, Settings, Link as LinkIcon, LogOut, X
} from "lucide-react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

function Sidebar({ role, isOpen, onClose }) {
  const navigate = useNavigate();

  const menu = {
    user: [
      { to: "profile", label: "Profile", icon: User },
      { to: "episodes", label: "My Episodes", icon: Headphones },
      { to: "subscriptions", label: "Subscriptions", icon: FileAudio },
      { to: "comments", label: "Comments", icon: MessageSquare },
    ],
    creator: [
      { to: "home", label: "Home", icon: Home },
      { to: "profile", label: "Profile", icon: User },
      { to: "episodes", label: "My Episodes", icon: FileAudio },
      { to: "subscribers", label: "Subscribers", icon: Users },
      { to: "comments", label: "Comments", icon: MessageSquare },
      { to: "subscription-links", label: "Subscription Links", icon: LinkIcon },
    ],
    admin: [
      { to: "dashboard", label: "Home", icon: Home },
      { to: "users", label: "Manage Users", icon: Users },
      { to: "episodes", label: "Manage Episodes", icon: FileAudio },
      { to: "comments", label: "Manage Comments", icon: MessageSquare },
      { to: "settings", label: "Settings", icon: Settings },
    ],
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-md p-4 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close button for small screens */}
        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </button>
        </div>

        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
          Dashboard
        </h2>
        <nav className="space-y-1">
          {menu[role]?.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                ${
                  isActive
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600"
                }`
              }
              onClick={onClose}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Logout button as last item */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-2 mt-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
