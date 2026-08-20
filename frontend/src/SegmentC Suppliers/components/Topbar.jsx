import React from "react";
import { Link, useLocation } from "react-router-dom";

const titleMap = {
  "/": { title: "Dashboard", subtitle: "Sales tracking, distribution insights & inquiry overview" },
  "/product-catalog": { title: "Product Catalog", subtitle: "Manage your active materials & configurations" },
  "/upload-products": { title: "Upload Products", subtitle: "Add raw components, finishes & technical metrics" },
  "/lead-requests": { title: "Lead Requests", subtitle: "High-intent projects requiring material matching" },
  "/sample-requests": { title: "Sample Requests", subtitle: "Physical sample dispatches for design reviews" },
  "/analytics": { title: "Analytics", subtitle: "Visibility trends, click-through & specification metrics" },
  "/subscription": { title: "Subscription Management", subtitle: "Merchant account status & commercial tier" },
};

const Topbar = ({ onMenuClick }) => {
  const location = useLocation();
  const page = titleMap[location.pathname] || { title: "Supplier Panel", subtitle: "" };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 sm:px-6 bg-white/90 backdrop-blur border-b border-slate-200">
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className="min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">{page.title}</h2>
        <p className="hidden sm:block text-xs text-slate-500 truncate">{page.subtitle}</p>
      </div>

      <div className="flex-1" />

      <div className="hidden md:block relative w-64">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        <input
          type="text"
          placeholder="Search products, leads, samples..."
          className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-transparent rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
        />
      </div>

      <button className="relative w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center">
        <i className="fas fa-bell"></i>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
      </button>

      <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-semibold text-sm">
          MS
        </div>
        <div className="hidden sm:block leading-tight">
          <div className="text-sm font-semibold text-slate-800">Meridian Surfaces Co.</div>
          <div className="text-[11px] text-slate-400">Verified Supplier</div>
        </div>
        <Link to="/" className="bg-amber-500 px-10 py-2">
        <button>User</button>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
