import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/supplier/dashboard", label: "Dashboard", icon: "fa-gauge-high", end: true },
  { to: "/supplier/catalog", label: "Product Catalog", icon: "fa-boxes-stacked" },
  { to: "/supplier/upload", label: "Upload Products", icon: "fa-cloud-arrow-up" },
  { to: "/supplier/leads", label: "Lead Requests", icon: "fa-bullseye", badge: 5 },
  { to: "/supplier/samples", label: "Sample Requests", icon: "fa-box-open", badge: 3 },
  { to: "/supplier/analytics", label: "Analytics", icon: "fa-chart-line" },
  { to: "/supplier/subscription", label: "Subscription Management", icon: "fa-credit-card" },
];

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 flex flex-col w-64 shrink-0 h-screen bg-slate-900 text-slate-300 border-r border-slate-800 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <i className="fas fa-industry text-sm"></i>
          </div>
          <div className="leading-tight flex-1 min-w-0">
            <div className="text-sm font-bold text-white tracking-wide">Elevator Interior Ecosystem</div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Supplier Panel</div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white">
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Marketplace
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="flex items-center gap-3">
                <i className={`fas ${item.icon} w-4 text-center`}></i>
                {item.label}
              </span>
              {item.badge ? (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        {/* Supplier profile footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800 transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              MS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">Meridian Surfaces Co.</div>
              <div className="text-xs text-slate-500 truncate">Verified Supplier</div>
            </div>
            <button title="Sign out" className="text-slate-500 hover:text-red-400 transition-colors">
              <i className="fas fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
