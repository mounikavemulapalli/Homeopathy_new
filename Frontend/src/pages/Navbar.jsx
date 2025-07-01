import React from "react";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <nav className="max-w-7xl mx-auto px-10 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <h1 className="text-xl font-bold text-blue-600">COMPANY</h1>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <li><a href="#" className="hover:text-blue-600">About</a></li>
          <li><a href="#" className="hover:text-blue-600">Services</a></li>
          <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          <li><a href="#" className="hover:text-blue-600">Community</a></li>
          <li>
            <button className="bg-white border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-100 transition">
              Sign up
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
