// ProductCatalog.jsx
import React, { useState } from 'react';

const ProductCatalog = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid');

  const products = [
    {
      id: 'MAT-0142',
      name: 'Fused Nickel Bronze',
      category: 'Wall Panel Finish',
      finish: 'Sandstone',
      pattern: 'No Pattern',
      status: 'Active',
      price: '$48 / sq ft',
      views: 612,
      leads: 24,
      updated: '2026-07-02',
      thumbnailColor: '#8a7150',
    },
    {
      id: 'MAT-0158',
      name: 'Fused Nickel Silver',
      category: 'Wall Panel Finish',
      finish: 'Sandstone',
      pattern: 'No Pattern',
      status: 'Active',
      price: '$44 / sq ft',
      views: 401,
      leads: 15,
      updated: '2026-06-28',
      thumbnailColor: '#b8b3a8',
    },
    {
      id: 'MAT-0163',
      name: 'Fused Graphite',
      category: 'Wall Panel Finish',
      finish: 'Diamond',
      pattern: 'Diamond Weave',
      status: 'Active',
      price: '$52 / sq ft',
      views: 298,
      leads: 9,
      updated: '2026-07-05',
      thumbnailColor: '#3f3d3a',
    },
    {
      id: 'MAT-0201',
      name: 'Polished Bronze Handrail',
      category: 'Handrail',
      finish: 'Polished',
      pattern: 'Round — 1.25"',
      status: 'Active',
      price: '$36 / linear ft',
      views: 480,
      leads: 19,
      updated: '2026-06-30',
      thumbnailColor: '#c98f4e',
    },
    {
      id: 'MAT-0212',
      name: 'Black Anodized Aluminum',
      category: 'Corner Reveal',
      finish: 'Black Anodized',
      pattern: '—',
      status: 'Draft',
      price: '$18 / linear ft',
      views: 88,
      leads: 2,
      updated: '2026-07-08',
      thumbnailColor: '#1c1c1c',
    },
    {
      id: 'MAT-0084',
      name: 'Antique Bronze Panel Frame',
      category: 'Panel Frame',
      finish: 'Antique Bronze Anodized',
      pattern: 'Minimal',
      status: 'Out of Stock',
      price: '$22 / linear ft',
      views: 210,
      leads: 6,
      updated: '2026-05-18',
      thumbnailColor: '#6b5a3d',
    },
  ];

  const categories = ['all', 'wall panel finish', 'handrail', 'corner reveal', 'panel frame'];

  const filteredProducts = products.filter((p) => {
    const matchesFilter = filter === 'all' || p.category.toLowerCase() === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColorMap = {
    Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Draft: 'bg-slate-100 text-slate-600 border-slate-200',
    'Out of Stock': 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Catalog</h1>
          <p className="text-slate-500 text-sm mt-1">Internal library of your active materials & configurations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${view === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
            >
              <i className="fas fa-grip"></i>
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${view === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-lg shadow-emerald-600/20 transition-all">
            <i className="fas fa-plus"></i>
            Add Product
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-slate-50 text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filter === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="h-32 flex items-center justify-center relative" style={{ backgroundColor: p.thumbnailColor }}>
                <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColorMap[p.status]} bg-white/90`}>
                  {p.status}
                </span>
                <i className="fas fa-swatchbook text-3xl text-white/40"></i>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600">{p.id}</span>
                  <span className="text-xs text-slate-400">{p.updated}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mt-1">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{p.category} · {p.finish}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">{p.price}</span>
                  <div className="flex items-center gap-3">
                    <span><i className="fas fa-eye mr-1"></i>{p.views}</span>
                    <span><i className="fas fa-inbox mr-1"></i>{p.leads}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                  <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium px-3 py-2 rounded-lg text-xs transition-all">
                    <i className="fas fa-pen mr-1.5"></i>Edit
                  </button>
                  <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-3 py-2 rounded-lg text-xs transition-all">
                    <i className="fas fa-eye mr-1.5"></i>Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Views</th>
                <th className="px-5 py-3">Leads</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg shrink-0" style={{ backgroundColor: p.thumbnailColor }}></div>
                      <div>
                        <div className="font-medium text-slate-800">{p.name}</div>
                        <div className="text-xs text-slate-400">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{p.category}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColorMap[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-700 font-medium">{p.price}</td>
                  <td className="px-5 py-3 text-slate-500">{p.views}</td>
                  <td className="px-5 py-3 text-slate-500">{p.leads}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-boxes-stacked text-3xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No products found</h3>
          <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
