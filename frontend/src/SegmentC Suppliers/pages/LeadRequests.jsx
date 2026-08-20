// LeadRequests.jsx
import React, { useState } from 'react';

const LeadRequests = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const leads = [
    {
      id: 'LR-3081',
      project: 'Hilton Hotel Elevator Modernization',
      client: 'Hilton Hotels',
      location: 'Chicago, IL',
      materialRequested: 'Fused Nickel Bronze — Sandstone',
      quantityEst: '~480 sq ft',
      status: 'New',
      priority: 'High',
      deadline: '2026-07-18',
      received: '2026-07-08',
      matchScore: 94,
    },
    {
      id: 'LR-3079',
      project: 'City Tower Commercial Elevators',
      client: 'City Tower Management',
      location: 'Austin, TX',
      materialRequested: 'Brushed Stainless Panels',
      quantityEst: '~1,200 sq ft',
      status: 'Quoted',
      priority: 'High',
      deadline: '2026-07-22',
      received: '2026-07-05',
      matchScore: 88,
    },
    {
      id: 'LR-3074',
      project: 'Green Valley Mall Escalators',
      client: 'Green Valley Properties',
      location: 'Denver, CO',
      materialRequested: 'Anodized Aluminum Corner Reveals',
      quantityEst: '~340 linear ft',
      status: 'New',
      priority: 'Medium',
      deadline: '2026-08-01',
      received: '2026-07-08',
      matchScore: 76,
    },
    {
      id: 'LR-3061',
      project: 'Sunset Residence Elevators',
      client: 'Sunset Development Group',
      location: 'Miami, FL',
      materialRequested: 'Polished Bronze Round Handrail',
      quantityEst: '~90 linear ft',
      status: 'Won',
      priority: 'Low',
      deadline: '2026-06-30',
      received: '2026-06-10',
      matchScore: 91,
    },
    {
      id: 'LR-3052',
      project: 'Tech Hub Office Elevators',
      client: 'TechHub Inc.',
      location: 'Seattle, WA',
      materialRequested: 'Fused Graphite — Diamond',
      quantityEst: '~560 sq ft',
      status: 'Lost',
      priority: 'Medium',
      deadline: '2026-07-01',
      received: '2026-06-18',
      matchScore: 68,
    },
  ];

  const statusColorMap = {
    New: 'bg-blue-100 text-blue-700 border-blue-200',
    Quoted: 'bg-purple-100 text-purple-700 border-purple-200',
    Won: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Lost: 'bg-red-100 text-red-700 border-red-200',
  };

  const priorityColorMap = {
    High: 'text-red-600 bg-red-50',
    Medium: 'text-amber-600 bg-amber-50',
    Low: 'text-emerald-600 bg-emerald-50',
  };

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = filter === 'all' || l.status.toLowerCase() === filter;
    const matchesSearch =
      l.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusCount = (status) => {
    if (status === 'all') return leads.length;
    return leads.filter((l) => l.status.toLowerCase() === status).length;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Requests</h1>
          <p className="text-slate-500 text-sm mt-1">High-intent platform projects requiring material matching</p>
        </div>
        <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm transition-all">
          <i className="fas fa-sliders"></i>
          Matching Preferences
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search by project, client, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-slate-50 text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'new', 'quoted', 'won', 'lost'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filter === status ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'All Leads' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${filter === status ? 'bg-white/20 text-white' : 'bg-white text-slate-600'}`}>
                  {getStatusCount(status)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-emerald-600">{lead.id}</span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColorMap[lead.status]}`}>{lead.status}</span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${priorityColorMap[lead.priority]}`}>
                    <i className={`fas fa-flag mr-1 ${lead.priority === 'High' ? 'text-red-500' : lead.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}></i>
                    {lead.priority}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mt-1.5 text-lg">{lead.project}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 flex-wrap">
                  <span><i className="fas fa-building mr-1"></i>{lead.client}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span><i className="fas fa-location-dot mr-1"></i>{lead.location}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400">Match Score</div>
                <div className="text-xl font-bold text-emerald-600">{lead.matchScore}%</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Material Requested</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{lead.materialRequested}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Est. Quantity</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{lead.quantityEst}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Received</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{lead.received}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Quote Deadline</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{lead.deadline}</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
              <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                <i className="fas fa-file-invoice-dollar"></i>
                Submit Pricing
              </button>
              <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                <i className="fas fa-eye"></i>
                View Full Spec
              </button>
              <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                <i className="fas fa-comment-dots"></i>
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-bullseye text-3xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No lead requests found</h3>
          <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default LeadRequests;
