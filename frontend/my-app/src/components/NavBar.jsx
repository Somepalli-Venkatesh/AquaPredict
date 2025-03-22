import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Mail,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Menu,
  X,
  Info,
  MapPin,
} from "lucide-react";
import logo from "../assets/waterlogo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Hide NavBar on login or register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.info("Logged out successfully!", { position: "top-center" });
    navigate("/");
  };

  const MenuItems = () => (
    <>
      <Link
        to="/"
        className="group relative flex flex-col items-center gap-1 text-gray-100 py-2 transition-colors ease-in-out duration-300 hover:text-blue-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="flex items-center gap-1">
          <Home size={16} />
          <span>Home</span>
        </div>
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
      </Link>

      <Link
        to="/about"
        className="group relative flex flex-col items-center gap-1 text-gray-100 py-2 transition-colors ease-in-out duration-300 hover:text-blue-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="flex items-center gap-1">
          <Info size={16} />
          <span>About</span>
        </div>
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
      </Link>

      <Link
        to="/contact"
        className="group relative flex flex-col items-center gap-1 text-gray-100 py-2 transition-colors ease-in-out duration-300 hover:text-blue-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="flex items-center gap-1">
          <Mail size={16} />
          <span>Contact</span>
        </div>
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
      </Link>

      <Link
        to="/villagesurvey"
        className="group relative flex flex-col items-center gap-1 text-gray-100 py-2 transition-colors ease-in-out duration-300 hover:text-blue-300"
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span>Village Survey</span>
        </div>
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
      </Link>

      {username ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="group relative flex flex-col items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-gray-800 border border-white/10 transition-transform duration-300 transform hover:scale-105 w-full text-left md:w-auto"
          >
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-100" />
              <span className="text-gray-100">{username}</span>
            </div>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
          </button>
          {dropdownOpen && (
            <div className="mt-2 w-full bg-white dark:bg-gray-800 border border-white/10 rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut size={16} className="text-gray-800" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2">
          <Link
            to="/login"
            className="group relative flex flex-col items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 transition-transform duration-300 transform hover:scale-105 hover:bg-white/20 hover:text-white text-gray-300 overflow-hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            <div className="relative z-10 flex items-center gap-2">
              <LogIn size={16} />
              <span>Login</span>
            </div>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            to="/register"
            className="group relative flex flex-col items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 transition-transform duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-teal-600 text-white overflow-hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            <div className="relative z-10 flex items-center gap-2">
              <UserPlus size={16} />
              <span>Register</span>
            </div>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 bg-opacity-95 backdrop-blur-md z-50 border-b border-teal-600 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link
          to="/"
          className="group flex items-center gap-2 text-2xl font-bold relative overflow-hidden p-2 rounded-lg transition-all duration-300"
        >
          <img src={logo} alt="Logo" className="h-12 w-auto relative z-10" />
          <span className="font-serif tracking-wider relative z-10 bg-gradient-to-r from-teal-200 via-blue-300 to-white bg-clip-text text-transparent transition-all duration-500 group-hover:tracking-widest">
            AquaPredict
          </span>
          <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <MenuItems />
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none transition-transform duration-300 transform hover:scale-110"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-teal-500 to-blue-500 bg-opacity-95 backdrop-blur-md border-t border-teal-600 shadow-lg px-4 pb-4">
          <MenuItems />
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={5000} />
    </nav>
  );
}

export default NavBar;
