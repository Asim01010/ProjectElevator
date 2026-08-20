// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {
  return (
    <header className="bg-white px-8 py-3.5 flex items-center justify-between border-b border-slate-200 h-[72px] flex-shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <div className="bg-slate-100 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs font-medium text-slate-700">
          <i className="fas fa-industry text-blue-600"></i>
          <span>Fabricator ·</span>
          <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide">Live</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center bg-slate-50 rounded-full px-4 py-1.5 gap-2 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <i className="fas fa-search text-slate-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search projects, specs..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-48 placeholder:text-slate-400"
          />
        </div>

        {/* Notification Button */}
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all">
          <i className="fas fa-bell text-lg"></i>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Messages Button */}
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all">
          <i className="fas fa-envelope text-lg"></i>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            JD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm text-slate-800">John Doe</span>
            <span className="text-xs text-slate-500">Fabricator</span>
          </div>
          <Link to="/" className="bg-amber-500 px-10 py-2">
        <button>User</button>
        </Link>
          <i className="fas fa-chevron-down text-slate-400 text-xs ml-1"></i>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;