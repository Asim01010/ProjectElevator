import React from "react";
import { User, LogOut, Menu } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      {/* NAVBAR - fixed at top */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-2 bg-gray-100 shadow-md z-50">
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
        <div className="flex items-center gap-4">
          <User
            className="cursor-pointer opacity-80 hover:opacity-100 text-gray-500"
            size={24}
          />
          <LogOut
            className="cursor-pointer opacity-80 hover:opacity-100 text-gray-500"
            size={24}
          />
          <Menu
            className="cursor-pointer opacity-80 hover:opacity-100 text-gray-500"
            size={24}
          />
        </div>
      </nav>

      {/* FOOTER - fixed at bottom */}
      <footer className="fixed bottom-0 left-0 w-full flex text-white justify-between items-center px-10 py-1 bg-black/70 border-t border-gray-300 z-50">
        <p className="text-white p-0 m-0 text-sm">©2026 Forms+Surfaces</p>
        <div className="flex gap-4 text-white">
          <FaFacebookF className="cursor-pointer hover:opacity-80" />
          <FaInstagram className="cursor-pointer hover:opacity-80" />
          <FaPinterestP className="cursor-pointer hover:opacity-80" />
        </div>
      </footer>
    </>
  );
};

export default Navbar;
