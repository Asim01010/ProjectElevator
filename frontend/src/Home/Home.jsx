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

    </div>
  );
};

export default Home;
