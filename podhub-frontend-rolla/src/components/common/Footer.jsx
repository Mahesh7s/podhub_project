// src/components/common/Footer.jsx

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="mb-4">
          © {new Date().getFullYear()} <span className="font-semibold">PodHub</span>. 
          All rights reserved.
        </p>
        <p className="mb-6">
          Discover, learn, and grow through 3-minute podcasts for education, entertainment, and life lessons.
        </p>
        <Link
          to="/register"
          className="inline-block px-6 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark transition"
        >
          Get Started
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
