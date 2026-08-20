// ReviewSpecifications.jsx
import React, { useState } from 'react';

const ReviewSpecifications = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Technical specifications data
  const specifications = [
    {
      id: 'SPC-1042-01',
      projectId: 'E-1042',
      projectName: 'Hilton Hotel Elevator Modernization',
      client: 'Hilton Hotels',
      type: 'Elevator Interior',
      status: 'Pending Review',
      priority: 'High',
      submittedDate: '2026-07-01',
      reviewDeadline: '2026-07-08',
      components: [
        { name: 'Cabin Walls', material: 'Stainless Steel', grade: '304', thickness: '1.5mm', finish: 'Brushed' },
        { name: 'Flooring', material: 'Marble', grade: 'Premium', thickness: '12mm', finish: 'Polished' },
        { name: 'Ceiling', material: 'Aluminum', grade: '6061', thickness: '2mm', finish: 'Powder Coated' },
        { name: 'Handrails', material: 'Stainless Steel', grade: '316', thickness: '2mm', finish: 'Mirror' },
      ],
      compliance: {
        fireRating: 'Class A',
        loadCapacity: '1800 kg',
        speed: '2.5 m/s',
        safetyStandards: ['EN 81-20', 'ASME A17.1', 'ISO 18738'],
        certifications: ['CE Marked', 'UL Listed']
      },
      materialBounds: {
        maxWeight: '2000 kg',
        minClearance: '2200 mm',
        maxDimensions: '1800 x 1500 x 2800 mm',
        temperatureRange: '0°C to 40°C'
      },
      notes: 'Review required for custom panel alignment and fire rating compliance',
      reviewer: 'Sarah Chen',
      attachments: 6
    },
    {
      id: 'SPC-1045-02',
      projectId: 'E-1045',
      projectName: 'City Tower Commercial Elevators',
      client: 'City Tower Management',
      type: 'High-Speed Elevator',
      status: 'In Review',
      priority: 'High',
      submittedDate: '2026-07-03',
      reviewDeadline: '2026-07-10',
      components: [
        { name: 'Cabin Walls', material: 'Glass', grade: 'Tempered', thickness: '10mm', finish: 'Clear' },
        { name: 'Flooring', material: 'Granite', grade: 'Commercial', thickness: '15mm', finish: 'Honed' },
        { name: 'Ceiling', material: 'LED Panel', grade: 'Premium', thickness: '8mm', finish: 'White' },
        { name: 'Control Panel', material: 'Stainless Steel', grade: '304', thickness: '1.2mm', finish: 'Satin' },
      ],
      compliance: {
        fireRating: 'Class B',
        loadCapacity: '2500 kg',
        speed: '4.0 m/s',
        safetyStandards: ['EN 81-20', 'ASME A17.1', 'ISO 18738'],
        certifications: ['CE Marked', 'UL Listed']
      },
      materialBounds: {
        maxWeight: '2800 kg',
        minClearance: '2400 mm',
        maxDimensions: '2000 x 1700 x 3000 mm',
        temperatureRange: '0°C to 45°C'
      },
      notes: 'High-speed requirements - verify braking system and glass integrity',
      reviewer: 'Michael Rodriguez',
      attachments: 9
    },
    {
      id: 'SPC-1048-03',
      projectId: 'E-1048',
      projectName: 'Green Valley Mall Escalators',
      client: 'Green Valley Properties',
      type: 'Escalator System',
      status: 'Pending Review',
      priority: 'Medium',
      submittedDate: '2026-07-05',
      reviewDeadline: '2026-07-12',
      components: [
        { name: 'Steps', material: 'Aluminum', grade: '6061', thickness: '4mm', finish: 'Anodized' },
        { name: 'Handrails', material: 'Rubber', grade: 'Industrial', thickness: '6mm', finish: 'Black' },
        { name: 'Balustrades', material: 'Glass', grade: 'Tempered', thickness: '12mm', finish: 'Clear' },
        { name: 'Flooring', material: 'Rubber', grade: 'Commercial', thickness: '8mm', finish: 'Textured' },
      ],
      compliance: {
        fireRating: 'Class C',
        loadCapacity: '1200 kg',
        speed: '0.5 m/s',
        safetyStandards: ['EN 115', 'ASME A17.1'],
        certifications: ['CE Marked']
      },
      materialBounds: {
        maxWeight: '1500 kg',
        minClearance: '2000 mm',
        maxDimensions: '1200 x 1400 x 2200 mm',
        temperatureRange: '-5°C to 35°C'
      },
      notes: 'Escalator specific requirements - check step clearance and handrail tension',
      reviewer: 'Emily Watson',
      attachments: 4
    },
    {
      id: 'SPC-1050-04',
      projectId: 'E-1050',
      projectName: 'Sunset Residence Elevators',
      client: 'Sunset Development Group',
      type: 'Residential Elevator',
      status: 'Approved',
      priority: 'Low',
      submittedDate: '2026-06-28',
      reviewDeadline: '2026-07-05',
      components: [
        { name: 'Cabin Walls', material: 'Wood', grade: 'Walnut', thickness: '18mm', finish: 'Varnished' },
        { name: 'Flooring', material: 'Hardwood', grade: 'Oak', thickness: '14mm', finish: 'Matte' },
        { name: 'Ceiling', material: 'Gypsum', grade: 'Fire Rated', thickness: '12mm', finish: 'Painted' },
        { name: 'Handrails', material: 'Brass', grade: 'C37700', thickness: '1.5mm', finish: 'Polished' },
      ],
      compliance: {
        fireRating: 'Class A',
        loadCapacity: '1200 kg',
        speed: '1.5 m/s',
        safetyStandards: ['EN 81-20', 'ASME A17.1'],
        certifications: ['CE Marked', 'UL Listed']
      },
      materialBounds: {
        maxWeight: '1500 kg',
        minClearance: '2000 mm',
        maxDimensions: '1500 x 1400 x 2400 mm',
        temperatureRange: '5°C to 35°C'
      },
      notes: 'Approved with minor modifications to wood grain alignment',
      reviewer: 'David Kim',
      attachments: 7
    },
    {
      id: 'SPC-1053-05',
      projectId: 'E-1053',
      projectName: 'Tech Hub Office Elevators',
      client: 'TechHub Inc.',
      type: 'Smart Elevator',
      status: 'Rejected',
      priority: 'High',
      submittedDate: '2026-07-02',
      reviewDeadline: '2026-07-09',
      components: [
        { name: 'Cabin Walls', material: 'Composite', grade: 'Advanced', thickness: '8mm', finish: 'Smooth' },
        { name: 'Flooring', material: 'Vinyl', grade: 'Commercial', thickness: '6mm', finish: 'Patterned' },
        { name: 'Ceiling', material: 'LED Smart Panel', grade: 'Premium', thickness: '6mm', finish: 'White' },
        { name: 'Control Panel', material: 'Touchscreen', grade: 'Industrial', thickness: '4mm', finish: 'Glossy' },
      ],
      compliance: {
        fireRating: 'Class B',
        loadCapacity: '2000 kg',
        speed: '3.0 m/s',
        safetyStandards: ['EN 81-20', 'ASME A17.1', 'ISO 18738'],
        certifications: ['CE Marked']
      },
      materialBounds: {
        maxWeight: '2200 kg',
        minClearance: '2300 mm',
        maxDimensions: '1800 x 1600 x 2700 mm',
        temperatureRange: '0°C to 40°C'
      },
      notes: 'Rejected - Smart panel interface not compatible with existing building systems. Requires redesign.',
      reviewer: 'Lisa Park',
      attachments: 11
    },
  ];

  // Filter and search
  const filteredSpecs = specifications.filter(spec => {
    const matchesStatus = filterStatus === 'all' || spec.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = spec.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spec.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status badge color
  const statusColorMap = {
    'Pending Review': 'bg-amber-100 text-amber-700 border-amber-200',
    'In Review': 'bg-blue-100 text-blue-700 border-blue-200',
    'Approved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-red-100 text-red-700 border-red-200',
  };

  const priorityColorMap = {
    'High': 'text-red-600 bg-red-50 border-red-200',
    'Medium': 'text-amber-600 bg-amber-50 border-amber-200',
    'Low': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Review Specifications</h1>
          <p className="text-slate-500 text-sm mt-1">
            Technical component sheets, material bounds, and compliance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm transition-all">
            <i className="fas fa-download"></i>
            Export Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20 transition-all">
            <i className="fas fa-plus-circle"></i>
            New Specification
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search specifications by project, ID, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50 text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'pending review', 'in review', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'All Specs' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${
                  filterStatus === status ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                }`}>
                  {specifications.filter(s => status === 'all' || s.status.toLowerCase() === status.toLowerCase()).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications List */}
      <div className="space-y-5">
        {filteredSpecs.map((spec) => (
          <div
            key={spec.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-bold text-blue-600">{spec.id}</span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColorMap[spec.status]}`}>
                    {spec.status}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${priorityColorMap[spec.priority]}`}>
                    <i className={`fas fa-flag mr-1 ${
                      spec.priority === 'High' ? 'text-red-500' :
                      spec.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                    }`}></i>
                    {spec.priority} Priority
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mt-1.5 text-lg">{spec.projectName}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                  <span><i className="fas fa-building mr-1"></i>{spec.client}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span><i className="fas fa-tag mr-1"></i>{spec.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <i className="fas fa-paperclip"></i>
                <span>{spec.attachments} attachments</span>
              </div>
            </div>

            {/* Spec Details Grid */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Component Sheet */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fas fa-cubes mr-1"></i> Components
                </h4>
                <div className="space-y-1.5">
                  {spec.components.slice(0, 3).map((comp, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-medium text-slate-700">{comp.name}:</span>
                      <span className="text-slate-600 ml-1">{comp.material} ({comp.grade})</span>
                    </div>
                  ))}
                  {spec.components.length > 3 && (
                    <span className="text-xs text-blue-600 font-medium">+{spec.components.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Material Bounds */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fas fa-ruler-combined mr-1"></i> Material Bounds
                </h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>
                    <span className="text-slate-500">Max Weight:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.materialBounds.maxWeight}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Clearance:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.materialBounds.minClearance}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Max Dims:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.materialBounds.maxDimensions}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Temp Range:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.materialBounds.temperatureRange}</span>
                  </div>
                </div>
              </div>

              {/* Compliance Metrics */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fas fa-clipboard-check mr-1"></i> Compliance Metrics
                </h4>
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-slate-500">Fire Rating:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.compliance.fireRating}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Load Capacity:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.compliance.loadCapacity}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Speed:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.compliance.speed}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Safety Standards:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.compliance.safetyStandards.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Certifications:</span>
                    <span className="font-medium text-slate-700 ml-1">{spec.compliance.certifications.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Actions */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1">
                    <i className="fas fa-sticky-note mr-1"></i> Notes
                  </div>
                  <p className="text-sm text-slate-700">{spec.notes}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span><i className="fas fa-user mr-1"></i>{spec.reviewer}</span>
                  <span className="w-px h-4 bg-slate-200"></span>
                  <span><i className="fas fa-calendar-alt mr-1"></i>Submitted: {spec.submittedDate}</span>
                  <span className={`font-medium ${
                    new Date(spec.reviewDeadline) < new Date() ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    <i className="fas fa-clock mr-1"></i>Due: {spec.reviewDeadline}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-eye"></i>
                View Full Specs
              </button>
              {spec.status === 'Pending Review' || spec.status === 'In Review' && (
                <>
                  <button className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                    <i className="fas fa-check"></i>
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                    <i className="fas fa-times"></i>
                    Reject
                  </button>
                </>
              )}
              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-edit"></i>
                Add Comment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSpecs.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-clipboard-list text-3xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No specifications found</h3>
          <p className="text-slate-500 text-sm mt-1">
            No technical specifications match your current filters.
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Total Specs: <span className="font-semibold text-slate-800">{specifications.length}</span></span>
            <span className="text-slate-500">Pending Review: <span className="font-semibold text-amber-600">
              {specifications.filter(s => s.status === 'Pending Review').length}
            </span></span>
            <span className="text-slate-500">In Review: <span className="font-semibold text-blue-600">
              {specifications.filter(s => s.status === 'In Review').length}
            </span></span>
            <span className="text-slate-500">Approved: <span className="font-semibold text-emerald-600">
              {specifications.filter(s => s.status === 'Approved').length}
            </span></span>
            <span className="text-slate-500">Rejected: <span className="font-semibold text-red-600">
              {specifications.filter(s => s.status === 'Rejected').length}
            </span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <i className="fas fa-sync-alt"></i>
            <span>Last updated: Today, 3:15 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSpecifications;