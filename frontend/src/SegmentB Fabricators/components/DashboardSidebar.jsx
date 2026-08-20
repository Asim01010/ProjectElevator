// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = () => {
 const navItems = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard_fabricator', icon: 'fa-gauge-high' },
  { key: 'assignedProjects', label: 'Assigned Projects', path: '/assignedprojects', icon: 'fa-diagram-project' },
  { key: 'reviewSpecs', label: 'Review Specifications', path: '/reviewspecifications', icon: 'fa-clipboard-list' },
  { key: 'submitPricing', label: 'Submit Pricing', path: '/submitpricing', icon: 'fa-tag' },
  { key: 'shopDrawings', label: 'Shop Drawings', path: '/shopdrawings', icon: 'fa-draw-polygon' },
  { key: 'productionStatus', label: 'Production Status', path: '/productionstatus', icon: 'fa-industry' },
  { key: 'messages', label: 'Messages', path: '/messages', icon: 'fa-envelope' },
];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 sticky top-0 overflow-y-auto p-6 border-r border-slate-800">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
          <i className="fas fa-elevator"></i>
        </div>
        <span className="text-white font-bold text-xl tracking-tight">
          Elevator<span className="text-blue-400">Eco</span>
        </span>
      </div>

      {/* Role Badge */}
      <div className="bg-slate-800 rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm font-medium text-slate-300 mb-7 w-fit border border-slate-700">
        <i className="fas fa-industry text-blue-400"></i>
        <span>Fabricator</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`
            }
          >
            <i className={`fas ${item.icon} w-5 text-center text-base`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-all">
          <i className="fas fa-circle-question w-5 text-center"></i>
          <span>Help & Support</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-all">
          <i className="fas fa-arrow-right-from-bracket w-5 text-center"></i>
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;