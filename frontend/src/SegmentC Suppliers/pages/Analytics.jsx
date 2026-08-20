// Analytics.jsx
import React, { useState } from 'react';

const Analytics = () => {
  const [range, setRange] = useState('30d');

  const summary = [
    { label: 'Catalog Views', value: '4,820', change: '+18.2%', trend: 'up', icon: 'fa-eye', color: 'blue' },
    { label: 'Click-Through Rate', value: '6.4%', change: '+0.8%', trend: 'up', icon: 'fa-arrow-pointer', color: 'purple' },
    { label: 'Spec Sheet Downloads', value: '312', change: '+11%', trend: 'up', icon: 'fa-file-arrow-down', color: 'emerald' },
    { label: 'Lead Conversion', value: '32%', change: '-2%', trend: 'down', icon: 'fa-bullseye', color: 'amber' },
  ];

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  // Weekly views trend (simple bar chart, no external library)
  const weeklyViews = [
    { label: 'Wk 1', value: 620 },
    { label: 'Wk 2', value: 780 },
    { label: 'Wk 3', value: 690 },
    { label: 'Wk 4', value: 910 },
    { label: 'Wk 5', value: 845 },
    { label: 'Wk 6', value: 975 },
  ];
  const maxViews = Math.max(...weeklyViews.map((w) => w.value));

  const topViewedProducts = [
    { name: 'Fused Nickel Bronze', category: 'Wall Panel Finish', views: 612, ctr: '7.2%' },
    { name: 'Polished Bronze Handrail', category: 'Handrail', views: 480, ctr: '6.8%' },
    { name: 'Black Anodized Aluminum', category: 'Corner Reveal', views: 355, ctr: '4.1%' },
    { name: 'Fused Graphite — Diamond', category: 'Wall Panel Finish', views: 298, ctr: '5.9%' },
    { name: 'Fused Nickel Silver', category: 'Wall Panel Finish', views: 271, ctr: '5.3%' },
  ];

  const trafficSources = [
    { label: 'Design Studio Recommendations', value: 48, color: 'bg-emerald-500' },
    { label: 'Direct Catalog Search', value: 27, color: 'bg-blue-500' },
    { label: 'Architect Shared Links', value: 15, color: 'bg-purple-500' },
    { label: 'Other', value: 10, color: 'bg-slate-400' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Visibility trends, click-through frequency, and specification metrics</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1">
          {['7d', '30d', '90d'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                range === r ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summary.map((s, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${colorMap[s.color]}`}>
                <i className={`fas ${s.icon}`}></i>
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                s.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                <i className={`fas fa-arrow-${s.trend}`}></i>
                <span>{s.change}</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-sm font-medium text-slate-600 mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Views Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <i className="fas fa-chart-column text-emerald-600"></i>
              Catalog Views — Weekly Trend
            </h3>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {weeklyViews.map((w, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-40">
                  <div
                    className="w-full max-w-[36px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all"
                    style={{ height: `${(w.value / maxViews) * 100}%` }}
                    title={`${w.value} views`}
                  ></div>
                </div>
                <span className="text-xs text-slate-500">{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-5">
            <i className="fas fa-diagram-project text-purple-500"></i>
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {trafficSources.map((source, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-slate-600">{source.label}</span>
                  <span className="text-xs font-semibold text-slate-800">{source.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${source.color} h-2 rounded-full transition-all`} style={{ width: `${source.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Viewed Products */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <i className="fas fa-ranking-star text-amber-500"></i>
            Top Viewed Products
          </h3>
        </div>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Views</th>
              <th className="px-6 py-3">Click-Through Rate</th>
            </tr>
          </thead>
          <tbody>
            {topViewedProducts.map((p, idx) => (
              <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-all">
                <td className="px-6 py-3 font-medium text-slate-800">{p.name}</td>
                <td className="px-6 py-3 text-slate-500">{p.category}</td>
                <td className="px-6 py-3 text-slate-600">{p.views}</td>
                <td className="px-6 py-3">
                  <span className="text-emerald-600 font-medium">{p.ctr}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
