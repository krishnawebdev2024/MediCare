import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <nav className=" fixed top-0 z-50 w-full bg-blue-600 dark:bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold" onClick={closeMobileMenu}>
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="w-12 h-12" />
            <p className="text-white ">Medicare</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About Us
          </Link>
          <Link to="/services" className="hover:text-gray-300">
            Services
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link to="/admindashboard" className="hover:text-gray-300">
            admin
          </Link>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"
        >
          {isDarkMode ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* User Links */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Custom Dropdown for Login Options */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Login
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-10">
                <li>
                  <Link
                    to="/admin-login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={closeDropdown}
                  >
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctor-login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={closeDropdown}
                  >
                    Doctor Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/patient-login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={closeDropdown}
                  >
                    Patient Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <Link
            to="/patient-signup"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Patient Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-gray-800">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <Link
            to="/services"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            Services
          </Link>
          {/* Login Dropdown in Mobile View */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="bg-white text-blue-600 px-4 py-2 m-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Login
            </button>
            {isDropdownOpen && (
              <ul className="mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-10">
                <li>
                  <Link
                    to="/doctor-login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={closeMobileMenu}
                  >
                    Doctor Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/patient-login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={closeMobileMenu}
                  >
                    Patient Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={closeMobileMenu}
                  >
                    Admin Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <Link
            to="/signup"
            className="block bg-white text-blue-600 px-4 py-2 my-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:text-white"
            onClick={closeMobileMenu}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
