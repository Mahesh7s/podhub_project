import { Menu } from "lucide-react";

function Topbar({ user, onMenuToggle }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow">
      {/* Hamburger Menu (visible only on small screens) */}
      <button
        className="md:hidden text-gray-800 dark:text-gray-200"
        onClick={onMenuToggle}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Responsive Title */}
      <h1 className="font-bold text-gray-800 dark:text-gray-100 text-xl md:text-2xl lg:text-3xl text-center flex-1">
        PodHub {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel
      </h1>
    </header>
  );
}

export default Topbar;
