// src/components/common/Navbar.jsx
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link"; 
import podhublogo from '../../assets/image.png';

function Navbar() {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-white transition-colors duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <HashLink smooth to="/#home" className="flex items-center gap-2">
          <img src={podhublogo} alt="PodHub Logo" className="h-10 w-10" />
          <span className="font-bold text-lg text-gray-800">PodHub</span>
        </HashLink>

        {/* Center: Nav links */}
        <div className="hidden md:flex gap-6">
          <HashLink
            smooth
            to="/#home"
            className="hover:text-gray-900 text-gray-700"
          >
            Home
          </HashLink>
          <HashLink
            smooth
            to="/#about"
            className="hover:text-gray-900 text-gray-700"
          >
            About Us
          </HashLink>
        </div>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/login"
            className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-white font-medium shadow hover:bg-gray-900 transition-colors duration-200"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="text-sm px-4 py-2 rounded-lg bg-gray-700 text-white font-medium shadow hover:bg-gray-800 transition-colors duration-200"
          >
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
