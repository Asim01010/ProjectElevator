// AssignedProjects.jsx
import React, { useState } from 'react';

const AssignedProjects = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Pipeline of engineering designs committed to facility
  const projects = [
    {
      id: 'E-1042',
      name: 'Hilton Hotel Elevator Modernization',
      client: 'Hilton Hotels',
      facility: 'Main Plant - Building A',
      status: 'In Review',
      priority: 'High',
      stage: 'Engineering Design',
      assignedDate: '2026-06-15',
      deadline: '2026-08-15',
      progress: 65,
      engineer: 'Sarah Chen',
      specs: 12,
      drawings: 8,
      description: 'Complete overhaul of 4 passenger elevators with custom interior finishes'
    },
    {
      id: 'E-1045',
      name: 'City Tower Commercial Elevators',
      client: 'City Tower Management',
      facility: 'Plant 2 - Fabrication Line 3',
      status: 'In Production',
      priority: 'High',
      stage: 'Fabrication',
      assignedDate: '2026-06-20',
      deadline: '2026-07-28',
      progress: 45,
      engineer: 'Michael Rodriguez',
      specs: 18,
      drawings: 14,
      description: 'High-speed elevators for 35-story commercial building'
    },
    {
      id: 'E-1048',
      name: 'Green Valley Mall Escalators',
      client: 'Green Valley Properties',
      facility: 'Main Plant - Building B',
      status: 'Pricing',
      priority: 'Medium',
      stage: 'Quoting',
      assignedDate: '2026-07-01',
      deadline: '2026-09-01',
      progress: 20,
      engineer: 'Emily Watson',
      specs: 9,
      drawings: 6,
      description: 'Custom escalator installation with glass balustrades'
    },
    {
      id: 'E-1050',
      name: 'Sunset Residence Elevators',
      client: 'Sunset Development Group',
      facility: 'Plant 2 - Assembly Line 1',
      status: 'Completed',
      priority: 'Low',
      stage: 'Final Inspection',
      assignedDate: '2026-05-10',
      deadline: '2026-06-30',
      progress: 100,
      engineer: 'David Kim',
      specs: 15,
      drawings: 10,
      description: 'Luxury residential elevator with custom wood paneling'
    },
    {
      id: 'E-1053',
      name: 'Tech Hub Office Elevators',
      client: 'TechHub Inc.',
      facility: 'Main Plant - Building C',
      status: 'On Hold',
      priority: 'Medium',
      stage: 'Design Pending',
      assignedDate: '2026-07-05',
      deadline: '2026-09-15',
      progress: 10,
      engineer: 'Lisa Park',
      specs: 8,
      drawings: 4,
      description: 'Modern elevators with digital interfaces and smart features'
    },
  ];

  // Filter and search projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Status color mapping
  const statusColorMap = {
    'In Review': 'bg-amber-100 text-amber-700 border-amber-200',
    'In Production': 'bg-blue-100 text-blue-700 border-blue-200',
    'Pricing': 'bg-purple-100 text-purple-700 border-purple-200',
    'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'On Hold': 'bg-red-100 text-red-700 border-red-200',
  };

  const priorityColorMap = {
    'High': 'text-red-600 bg-red-50',
    'Medium': 'text-amber-600 bg-amber-50',
    'Low': 'text-emerald-600 bg-emerald-50',
  };

  // Get status count for filter badges
  const getStatusCount = (status) => {
    if (status === 'all') return projects.length;
    return projects.filter(p => p.status.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assigned Projects</h1>
          <p className="text-slate-500 text-sm mt-1">
            Pipeline of engineering designs committed to your facility
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm transition-all">
            <i className="fas fa-filter"></i>
            Filter
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30">
            <i className="fas fa-plus-circle"></i>
            New Project
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search projects by name, client, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50 text-sm"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'in review', 'in production', 'pricing', 'completed', 'on hold'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filter === status
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'All Projects' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${
                  filter === status ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                }`}>
                  {getStatusCount(status)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            {/* Project Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-600">{project.id}</span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColorMap[project.status]}`}>
                    {project.status}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${priorityColorMap[project.priority]}`}>
                    <i className={`fas fa-flag mr-1 ${
                      project.priority === 'High' ? 'text-red-500' :
                      project.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                    }`}></i>
                    {project.priority}
                  </span>
                </div>

                {/* lorem 1000
                 */}
                <h3 className="font-semibold text-slate-900 mt-1.5 text-lg">{project.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                  <span><i className="fas fa-building mr-1"></i>{project.client}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span><i className="fas fa-industry mr-1"></i>{project.facility}</span>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Project Details */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Stage</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{project.stage}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Engineer</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{project.engineer}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Specs</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{project.specs} documents</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">Drawings</div>
                <div className="font-medium text-sm text-slate-800 mt-0.5">{project.drawings} files</div>
              </div>
            </div>

            {/* Progress and Dates */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-slate-600">Progress</span>
                <span className="text-sm font-semibold text-slate-800">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    project.progress === 100 ? 'bg-emerald-500' :
                    project.progress > 70 ? 'bg-blue-500' :
                    project.progress > 40 ? 'bg-amber-500' : 'bg-red-400'
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                <span><i className="fas fa-calendar-plus mr-1"></i>Assigned: {project.assignedDate}</span>
                <span><i className="fas fa-calendar-check mr-1"></i>Deadline: {project.deadline}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                <i className="fas fa-eye"></i>
                View Details
              </button>
              <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                <i className="fas fa-edit"></i>
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-diagram-project text-3xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No projects found</h3>
          <p className="text-slate-500 text-sm mt-1">
            No projects match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      )}

      {/* Summary Footer */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Total Projects: <span className="font-semibold text-slate-800">{projects.length}</span></span>
            <span className="text-slate-500">Active: <span className="font-semibold text-blue-600">
              {projects.filter(p => p.status !== 'Completed' && p.status !== 'On Hold').length}
            </span></span>
            <span className="text-slate-500">Completed: <span className="font-semibold text-emerald-600">
              {projects.filter(p => p.status === 'Completed').length}
            </span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <i className="fas fa-sync-alt"></i>
            <span>Last updated: Today, 2:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedProjects;