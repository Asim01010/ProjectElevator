// Dashboard.jsx
import React from 'react';

const SupplierDashboard = () => {
  const metrics = [
    {
      label: 'Total Revenue (30d)',
      value: '$84,250',
      change: '+12.4%',
      trend: 'up',
      icon: 'fa-sack-dollar',
      color: 'emerald',
      description: 'Across all fulfilled material orders',
    },
    {
      label: 'Active Listings',
      value: '128',
      change: '+6',
      trend: 'up',
      icon: 'fa-boxes-stacked',
      color: 'blue',
      description: 'Materials currently live in catalog',
    },
    {
      label: 'New Lead Requests',
      value: '17',
      change: '+5',
      trend: 'up',
      icon: 'fa-bullseye',
      color: 'purple',
      description: 'Projects awaiting a material match',
    },
    {
      label: 'Sample Requests',
      value: '9',
      change: '-2',
      trend: 'down',
      icon: 'fa-box-open',
      color: 'amber',
      description: 'Pending dispatch to design teams',
    },
  ];

  const performanceMetrics = [
    { label: 'Catalog Views', value: '4,820', change: '+18%', trend: 'up' },
    { label: 'Lead Conversion', value: '32%', change: '+3%', trend: 'up' },
    { label: 'Avg. Response Time', value: '3.1 hrs', change: '-0.6 hrs', trend: 'down' },
    { label: 'Repeat Buyers', value: '58%', change: '+4%', trend: 'up' },
  ];

  const recentLeads = [
    { id: 1, project: 'Hilton Hotel Elevator Modernization', material: 'Fused Nickel Bronze — Sandstone', priority: 'high', received: 'Today' },
    { id: 2, project: 'City Tower Commercial Elevators', material: 'Brushed Stainless Panels', priority: 'medium', received: 'Yesterday' },
    { id: 3, project: 'Green Valley Mall Escalators', material: 'Anodized Aluminum Reveals', priority: 'high', received: 'Today' },
    { id: 4, project: 'Tech Hub Office Elevators', material: 'Fused Graphite — Diamond', priority: 'low', received: 'Jul 25' },
  ];

  const topProducts = [
    { name: 'Fused Nickel Bronze', category: 'Wall Panel Finish', views: 612, requests: 24 },
    { name: 'Polished Bronze Round Handrail', category: 'Handrail', views: 480, requests: 19 },
    { name: 'Black Anodized Aluminum', category: 'Corner Reveal', views: 355, requests: 12 },
    { name: 'Fused Graphite — Diamond', category: 'Wall Panel Finish', views: 298, requests: 9 },
  ];

  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  const priorityColorMap = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div className="p-8 space-y-7">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Supplier Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Sales tracking, component distribution insights, and inquiry overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm transition-all">
            <i className="fas fa-file-export"></i>
            Export Report
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-lg shadow-emerald-600/20 transition-all hover:shadow-emerald-600/30">
            <i className="fas fa-cloud-arrow-up"></i>
            Upload Product
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${colorMap[metric.color]}`}>
                <i className={`fas ${metric.icon}`}></i>
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                metric.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                <i className={`fas fa-arrow-${metric.trend}`}></i>
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</div>
              <div className="text-sm font-medium text-slate-600 mt-0.5">{metric.label}</div>
              <div className="text-xs text-slate-400 mt-1">{metric.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <i className="fas fa-chart-line text-emerald-600"></i>
            Performance Metrics
          </h3>
          <span className="text-xs text-slate-400">Last 30 days</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-medium text-slate-500">{metric.label}</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-slate-900">{metric.value}</span>
                <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  <i className={`fas fa-arrow-${metric.trend} mr-0.5`}></i>
                  {metric.change}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, parseInt(metric.value) || 60)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Leads & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lead Requests */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <i className="fas fa-bullseye text-purple-500"></i>
              Recent Lead Requests
            </h3>
            <a href="#/lead-requests" className="text-sm text-emerald-600 font-medium hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer">
                <div className={`w-2 h-2 rounded-full ${
                  lead.priority === 'high' ? 'bg-red-500' : lead.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{lead.project}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priorityColorMap[lead.priority]}`}>
                      {lead.priority}
                    </span>
                    <span className="text-xs text-slate-400 truncate">{lead.material}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{lead.received}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <i className="fas fa-star text-amber-500"></i>
              Top Performing Products
            </h3>
            <a href="#/analytics" className="text-sm text-emerald-600 font-medium hover:underline">View analytics</a>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-700 truncate">{product.name}</div>
                  <div className="text-xs text-slate-400">{product.category}</div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                  <span><i className="fas fa-eye mr-1"></i>{product.views}</span>
                  <span><i className="fas fa-inbox mr-1"></i>{product.requests}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span><i className="fas fa-check-circle text-emerald-500 mr-1"></i> 4 samples shipped this week</span>
              <span><i className="fas fa-clock text-amber-500 mr-1"></i> 2 quotes overdue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
