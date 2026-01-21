import React, { useState } from "react";
import {
  User,
  LogOut,
  Menu,
  X,
  Palette,
  UserCircle,
  Edit3,
  HelpCircle,
  LogIn,
  UserPlus,
  ChevronRight,
  Home as HomeIcon,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userReset } from "../redux/features/Register/registerSlice"; // adjust path if needed
// Optional: import { clearProfile } from "../redux/features/Profile/profileSlice";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

const dispatch = useDispatch();
  const menuItems = [
    { id: "home", label: "Home", icon: <HomeIcon size={18} />, path: "/" },
    {
      id: "design",
      label: "Design",
      icon: <Palette size={18} />,
      path: "/design",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <UserCircle size={18} />,
      path: "/profile",
    },
    {
      id: "profile-edit",
      label: "Profile Edit",
      icon: <Edit3 size={18} />,
      path: "/profile-edit",
    },
    {
      id: "how-does-it-work",
      label: "How Does It Work",
      icon: <HelpCircle size={18} />,
      path: "/how-does-it-work",
    },
    { id: "login", label: "Login", icon: <LogIn size={18} />, path: "/login" },
    {
      id: "register",
      label: "Register",
      icon: <UserPlus size={18} />,
      path: "/register",
    },
  ];

const handleLogout = () => {
  console.log("Logging out...");

  // 1. Clear authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");

  // 2. Reset Redux state (very important!)
  dispatch(userReset()); // clears user + status flags
  // dispatch(clearProfile()); // optional – if you want to clear profile slice too

  // 3. Close sidebar if open
  setIsSidebarOpen(false);

  // 4. Redirect to login
  navigate("/login", { replace: true });
};

  return (
    <>
      {/* NAVBAR - fixed at top */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-1 bg-gray-50 text-gray-800 shadow-md z-50 border-b border-gray-300">
        {/* LEFT HEADER - Clickable Logo to Home */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl md:text-2xl tracking-[0.2em] font-light text-gray-800">
              ELEVATOR DESIGN STUDIO
            </h1>
            <p className="text-[10px] md:text-[11px] tracking-[0.15em] text-gray-800 mt-1">
              A FORMS + SURFACES DESIGN TOOL
            </p>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8DC63F] to-emerald-600 flex items-center justify-center">
              <Palette size={18} />
            </div>
            <span className="text-sm font-medium text-gray-800">EDS</span>
          </div>
        </Link>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* Profile Icon linking to Profile page */}
          <Link to="/profile" className="relative group">
            <User
              className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
              size={22}
            />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Profile
            </div>
          </Link>
         
          {/* Logout Icon – NOW CLICKABLE */}
          <button
            onClick={handleLogout}
            className="relative group p-1 rounded-full hover:bg-gray-200 transition-colors"
            title="Logout"
          >
            <IoMdLogOut
              className="cursor-pointer text-gray-700 hover:text-black transition-colors"
              size={24}
            />
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Logout
            </div>
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="relative group p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Menu
              className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
              size={22}
            />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Menu
            </div>
          </button>
        </div>
      </nav>

      {/* SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-scroll ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8DC63F] to-emerald-600 flex items-center justify-center">
              <Palette size={22} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                Navigation
              </h2>
              <p className="text-xs text-gray-600">Elevator Design Studio</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X size={22} className="text-gray-700" />
          </button>
        </div>

        {/* USER PROFILE SECTION */}
        <div className="p-6 border-b border-gray-300">
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8DC63F] to-emerald-600 flex items-center justify-center">
              <UserCircle size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Welcome, Designer</h3>
              <p className="text-sm text-gray-600">Premium Member</p>
            </div>
          </Link>
        </div>

        {/* MENU ITEMS */}
        <div className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  window.location.pathname === item.path
                    ? "bg-gradient-to-r from-[#8DC63F]/20 to-emerald-500/10 border-l-4 border-[#8DC63F]"
                    : "hover:bg-gray-300/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      window.location.pathname === item.path
                        ? "bg-[#8DC63F] text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-800">
                    {item.label}
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className={`transition-transform ${
                    window.location.pathname === item.path
                      ? "text-[#8DC63F]"
                      : "text-gray-500"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Additional Project Detail Link (if needed) */}
          <Link
            to="/project-detail"
            onClick={() => setIsSidebarOpen(false)}
            className={`mt-4 w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
              window.location.pathname === "/project-detail"
                ? "bg-gradient-to-r from-[#8DC63F]/20 to-emerald-500/10 border-l-4 border-[#8DC63F]"
                : "hover:bg-gray-300/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  window.location.pathname === "/project-detail"
                    ? "bg-[#8DC63F] text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                <Palette size={18} />
              </div>
              <span className="font-medium text-gray-800">Project Details</span>
            </div>
            <ChevronRight
              size={18}
              className={`transition-transform ${
                window.location.pathname === "/project-detail"
                  ? "text-[#8DC63F]"
                  : "text-gray-500"
              }`}
            />
          </Link>

          {/* LOGOUT BUTTON - SEPARATED */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 border border-red-300 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200">
                  <LogOut size={18} />
                </div>
                <span className="font-medium text-red-700">Logout</span>
              </div>
              <ChevronRight size={18} className="text-red-600" />
            </button>
          </div>
        </div>

        {/* FOOTER INSIDE SIDEBAR */}
        <div className="absolute bottom-0 left-0 right-0  border-t border-gray-300 bg-gray-100/80 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-600">©2026 Forms+Surfaces</p>
              <p className="text-[10px] text-gray-500 mt-1">Version 2.1.0</p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
              >
                <FaFacebookF size={14} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
              >
                <FaInstagram size={14} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
              >
                <FaPinterestP size={14} className="text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER - fixed at bottom */}
      <footer className="fixed bottom-0 left-0 w-full flex justify-between items-center px-6 py-1 md:px-10 bg-[#58595B] text-gray-800  z-40">
        <Link
          to="/"
          className="text-xs md:text-sm text-gray-100 hover:text-gray-200 transition-colors"
        >
          ©2026 Forms+Surfaces
        </Link>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-gray-100 hover:text-[#8DC63F] transition-colors"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href="#"
            className="text-gray-100 hover:text-[#8DC63F] transition-colors"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="#"
            className="text-gray-100 hover:text-[#8DC63F] transition-colors"
          >
            <FaPinterestP size={16} />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
