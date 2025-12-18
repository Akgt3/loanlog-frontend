import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // to check current path

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dash" },
    { name: "Add Loan", path: "/addloan" },
    // { name: "Payments", path: "/payment" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // close mobile menu after click
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="./logo.png" alt="Logo" className="h-12" />
            <span className="text-1xl font-bold bg-gradient-to-r from-blue-400 to-teal-600 bg-clip-text text-transparent">
              LoanLog
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
