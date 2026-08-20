// SampleRequests.jsx
import React, { useState } from 'react';

const SampleRequests = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sampleRequests = [
    {
      id: 'SR-2041',
      requester: 'Sarah Chen, AIA',
      firm: 'Chen & Partners Architecture',
      project: 'Hilton Hotel Elevator Modernization',
      materials: ['Fused Nickel Bronze — Sandstone', 'Polished Bronze Handrail'],
      shipTo: '450 N Michigan Ave, Chicago, IL 60611',
      status: 'Pending',
      requested: '2026-07-08',
      trackingNumber: null,
    },
    {
      id: 'SR-2038',
      requester: 'Michael Rodriguez',
      firm: 'City Tower Management',
      project: 'City Tower Commercial Elevators',
      materials: ['Brushed Stainless Panel Sample'],
      shipTo: '900 Congress Ave, Austin, TX 78701',
      status: 'Shipped',
      requested: '2026-07-04',
      trackingNumber: '1Z999AA10123456784',
    },
    {
      id: 'SR-2035',
      requester: 'Emily Watson',
      firm: 'Green Valley Properties',
      project: 'Green Valley Mall Escalators',
      materials: ['Black Anodized Aluminum Reveal', 'Silver Reveal Trim'],
      shipTo: '1200 16th St, Denver, CO 80202',
      status: 'Delivered',
      requested: '2026-06-28',
      trackingNumber: '1Z999AA10987654321',
    },
    {
      id: 'SR-2029',
      requester: 'David Kim',
      firm: 'Sunset Development Group',
      project: 'Sunset Residence Elevators',
      materials: ['Fused Graphite — Diamond Sample'],
      shipTo: '2200 Biscayne Blvd, Miami, FL 33137',
      status: 'Delivered',
      requested: '2026-06-15',
      trackingNumber: '1Z999AA10555444333',
    },
  ];

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-emerald-100 text-emerald-700',
  };

  const filteredRequests = sampleRequests.filter((r) => {
    const matchesStatus = filterStatus === 'all' || r.status.toLowerCase() === filterStatus;
    const matchesSearch =
      r.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: sampleRequests.length,
    pending: sampleRequests.filter((r) => r.status === 'Pending').length,
    shipped: sampleRequests.filter((r) => r.status === 'Shipped').length,
    delivered: sampleRequests.filter((r) => r.status === 'Delivered').length,
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sample Requests</h1>
          <p className="text-sm text-slate-500">Physical sample dispatches for architectural design reviews</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <i className="fas fa-plus"></i> Log Manual Request
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">
              <i className="fas fa-box-open"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Total Requests</div>
              <div className="text-xl font-bold">{stats.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Pending</div>
              <div className="text-xl font-bold">{stats.pending}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <i className="fas fa-truck-fast"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Shipped</div>
              <div className="text-xl font-bold">{stats.shipped}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Delivered</div>
              <div className="text-xl font-bold">{stats.delivered}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search by project, requester, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'shipped', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                  filterStatus === status ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-emerald-600">{r.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[r.status]}`}>{r.status}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mt-1">{r.project}</h3>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 flex-wrap">
                  <span><i className="fas fa-user mr-1"></i>{r.requester}</span>
                  <span>•</span>
                  <span>{r.firm}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400">Requested</div>
                <div className="font-medium text-sm text-slate-700">{r.requested}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {r.materials.map((m, idx) => (
                <span key={idx} className="text-xs bg-slate-50 px-2.5 py-1 rounded border border-slate-200 text-slate-600">
                  <i className="fas fa-swatchbook mr-1 text-emerald-500"></i>
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-3 text-xs text-slate-500">
              <i className="fas fa-location-dot mr-1"></i>Ship to: {r.shipTo}
            </div>

            {r.trackingNumber && (
              <div className="mt-2 text-xs text-slate-500">
                <i className="fas fa-barcode mr-1"></i>Tracking: <span className="font-medium text-slate-700">{r.trackingNumber}</span>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end gap-2">
              {r.status === 'Pending' && (
                <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100">
                  <i className="fas fa-truck-fast mr-1.5"></i>Mark as Shipped
                </button>
              )}
              {r.status === 'Shipped' && (
                <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100">
                  <i className="fas fa-location-crosshairs mr-1.5"></i>Track Package
                </button>
              )}
              <button className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-box-open text-2xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No sample requests</h3>
          <p className="text-sm text-slate-500">No requests match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default SampleRequests;
