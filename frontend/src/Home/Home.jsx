import React, { useState } from "react";
import { User, LogOut, Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
      }}
    >
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full flex items-start justify-between px-10 py-8 text-white">
        {/* LEFT HEADER */}
        <div>
          <h1 className="text-2xl tracking-[0.2em] font-light">
            ELEVATOR DESIGN STUDIO
          </h1>
          <p className="text-[11px] tracking-[0.15em] opacity-80 mt-1">
            A FORMS + SURFACES DESIGN TOOL
          </p>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6">
          <User
            className="cursor-pointer opacity-80 hover:opacity-100"
            size={30}
          />
          <LogOut
            className="cursor-pointer opacity-80 hover:opacity-100"
            size={30}
          />
          <Menu
            className="cursor-pointer opacity-80 hover:opacity-100"
            size={30}
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#EFEFEF] text-black/75 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <h2 className="text-lg font-semibold">MENU</h2>
          <X
            className="cursor-pointer hover:opacity-80"
            size={24}
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* MENU ITEMS */}
        <ul className="flex flex-col gap-1  text-base font-medium uppercase">
          <li
            className="cursor-pointer text-black border-b border-gray-300 px-6 py-3 
               hover:bg-gray-200 transition-colors duration-200"
          >
            Home
          </li>
          <li
            className="cursor-pointer text-black border-b border-gray-300 px-6 py-3 
               hover:bg-gray-200 transition-colors duration-200"
          >
            How Does It Work
          </li>
          <Link to="/profile">
            <li
              className="cursor-pointer text-black border-b border-gray-300 px-6 py-3 
               hover:bg-gray-200 transition-colors duration-200"
            >
              Portfolio
            </li>
          </Link>
          <li
            className="cursor-pointer text-black border-b border-gray-300 px-6 py-3 
               hover:bg-gray-200 transition-colors duration-200"
          >
            Contact Us
          </li>
          <li
            className="cursor-pointer text-black border-b border-gray-300 px-6 py-3 flex items-center gap-2
               hover:bg-[#7AC143] transition-colors duration-200"
          >
            <LogOut size={18} /> Logout
          </li>
        </ul>
      </div>

      {/* BOTTOM LEFT CTA */}
      <div className="absolute bottom-10 left-10">
        <button className="bg-[#7AC143] hover:bg-[#6AAD39] text-white px-7 py-3 text-sm tracking-wider transition">
          GO TO MY.EDS
        </button>
      </div>

      {/* DARK OVERLAY (optional) */}
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      {/* FOOTER */}
      <div className="w-full flex absolute bottom-1 justify-between text-white px-10">
        <p>©2026 Forms+Surfaces</p>
        <div className="flex gap-4 text-white">
          <FaFacebookF className="cursor-pointer hover:opacity-80" />
          <FaInstagram className="cursor-pointer hover:opacity-80" />
          <FaPinterestP className="cursor-pointer hover:opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default Home;
