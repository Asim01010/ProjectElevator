// ProductionStatus.jsx
import React, { useState } from 'react';

const ProductionStatus = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Production data
  const productionItems = [
    {
      id: 'PS-1042-01',
      projectName: 'Hilton Hotel Elevator Modernization',
      client: 'Hilton Hotels',
      assemblyLine: 'Line A - Main Plant',
      status: 'Assembly',
      progress: 75,
      stage: 'Panel Fabrication',
      startDate: '2026-07-01',
      estimatedCompletion: '2026-07-20',
      milestones: ['Material Procurement ✓', 'Cutting & Forming ✓', 'Panel Assembly ⟳'],
      team: ['Robert Johnson', 'Maria Santos', 'James Wilson'],
      issues: [],
      notes: 'Panel fabrication progressing well. Ahead of schedule.',
      priority: 'High',
      defects: 0,
      efficiency: 92
    },
    {
      id: 'PS-1045-02',
      projectName: 'City Tower Commercial Elevators',
      client: 'City Tower Management',
      assemblyLine: 'Line B - Fabrication Plant 2',
      status: 'Fabrication',
      progress: 45,
      stage: 'Component Fabrication',
      startDate: '2026-06-25',
      estimatedCompletion: '2026-08-10',
      milestones: ['Material Procurement ✓', 'Cutting & Forming ⟳', 'Welding & Assembly ⏳'],
      team: ['Michael Chen', 'Patricia Brown', 'Thomas Anderson'],
      issues: [{ severity: 'Medium', description: 'Material delivery delay' }],
      notes: 'Slight delay due to material shipment.',
      priority: 'High',
      defects: 1,
      efficiency: 78
    },
    {
      id: 'PS-1048-03',
      projectName: 'Green Valley Mall Escalators',
      client: 'Green Valley Properties',
      assemblyLine: 'Line C - Escalator Assembly',
      status: 'Design Review',
      progress: 20,
      stage: 'Engineering Verification',
      startDate: '2026-07-03',
      estimatedCompletion: '2026-08-25',
      milestones: ['Design Approval ⟳', 'Material Sourcing ⏳', 'Component Fabrication ⏳'],
      team: ['Lisa Martinez', 'David Lee'],
      issues: [],
      notes: 'Awaiting client approvals on specifications.',
      priority: 'Medium',
      defects: 0,
      efficiency: 95
    },
    {
      id: 'PS-1050-04',
      projectName: 'Sunset Residence Elevators',
      client: 'Sunset Development Group',
      assemblyLine: 'Line A - Main Plant',
      status: 'Completed',
      progress: 100,
      stage: 'Ready for Shipping',
      startDate: '2026-06-10',
      estimatedCompletion: '2026-07-05',
      milestones: ['All Milestones Completed ✓'],
      team: ['Andrew Park', 'Samantha Reed', 'Kevin Miller'],
      issues: [],
      notes: 'Completed ahead of schedule.',
      priority: 'Low',
      defects: 0,
      efficiency: 98
    },
    {
      id: 'PS-1053-05',
      projectName: 'Tech Hub Office Elevators',
      client: 'TechHub Inc.',
      assemblyLine: 'Line D - Smart Systems Assembly',
      status: 'Quality Check',
      progress: 85,
      stage: 'Final Testing',
      startDate: '2026-07-05',
      estimatedCompletion: '2026-07-18',
      milestones: ['Material Procurement ✓', 'Component Fabrication ✓', 'System Assembly ✓', 'Software Integration ⟳'],
      team: ['Jennifer Wong', 'Mark Taylor', 'Rachel Green'],
      issues: [{ severity: 'Low', description: 'Minor software bug' }],
      notes: 'One minor bug identified and being resolved.',
      priority: 'High',
      defects: 1,
      efficiency: 82
    }
  ];

  // Filter
  const filteredItems = productionItems.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Status colors
  const statusColors = {
    'Assembly': 'bg-blue-100 text-blue-700',
    'Fabrication': 'bg-purple-100 text-purple-700',
    'Design Review': 'bg-amber-100 text-amber-700',
    'Completed': 'bg-emerald-100 text-emerald-700',
    'Quality Check': 'bg-indigo-100 text-indigo-700',
  };

  const priorityColors = {
    'High': 'text-red-600',
    'Medium': 'text-amber-600',
    'Low': 'text-emerald-600',
  };

  // Stats
  const stats = {
    total: productionItems.length,
    active: productionItems.filter(item => item.status !== 'Completed').length,
    completed: productionItems.filter(item => item.status === 'Completed').length,
    issues: productionItems.reduce((acc, item) => acc + item.issues.length, 0),
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Production Status</h1>
          <p className="text-sm text-slate-500">Real-time assembly line staging and milestone updates</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <i className="fas fa-plus"></i> Add Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <i className="fas fa-industry"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Total Items</div>
              <div className="text-xl font-bold">{stats.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Completed</div>
              <div className="text-xl font-bold">{stats.completed}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Active</div>
              <div className="text-xl font-bold">{stats.active}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Issues</div>
              <div className="text-xl font-bold">{stats.issues}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'assembly', 'fabrication', 'design review', 'quality check', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Production Cards */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition">
            {/* Header Row */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600">{item.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                  <span className={`text-xs font-medium ${priorityColors[item.priority]}`}>
                    <i className={`fas fa-flag mr-1 ${
                      item.priority === 'High' ? 'text-red-500' :
                      item.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                    }`}></i>
                    {item.priority}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mt-1">{item.projectName}</h3>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
                  <span>{item.client}</span>
                  <span>•</span>
                  <span>{item.assemblyLine}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Efficiency</div>
                <div className="font-bold text-slate-800">{item.efficiency}%</div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>{item.stage}</span>
                <span>{item.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    item.progress === 100 ? 'bg-emerald-500' :
                    item.progress > 70 ? 'bg-blue-500' :
                    item.progress > 40 ? 'bg-amber-500' : 'bg-red-400'
                  }`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Milestones */}
            <div className="mt-3 flex flex-wrap gap-2">
              {item.milestones.map((milestone, idx) => (
                <span key={idx} className="text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200">
                  {milestone}
                </span>
              ))}
            </div>

            {/* Dates */}
            <div className="mt-3 flex gap-4 text-xs text-slate-500">
              <span><i className="fas fa-calendar-plus mr-1"></i>Start: {item.startDate}</span>
              <span><i className="fas fa-calendar-check mr-1"></i>
                {item.status === 'Completed' ? 'Completed' : 'Est. Completion: ' + item.estimatedCompletion}
              </span>
            </div>

            {/* Team */}
            <div className="mt-3 flex flex-wrap gap-1">
              <span className="text-xs text-slate-500 mr-1">Team:</span>
              {item.team.map((member, idx) => (
                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                  {member}
                </span>
              ))}
            </div>

            {/* Issues */}
            {item.issues.length > 0 && (
              <div className="mt-2 flex gap-2">
                {item.issues.map((issue, idx) => (
                  <span key={idx} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-200">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {issue.description}
                  </span>
                ))}
              </div>
            )}

            {/* Notes & Actions */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
              <p className="text-sm text-slate-600">{item.notes}</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100">
                  View
                </button>
                {item.status !== 'Completed' && (
                  <button className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100">
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-industry text-2xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No production items</h3>
          <p className="text-sm text-slate-500">No items match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductionStatus;