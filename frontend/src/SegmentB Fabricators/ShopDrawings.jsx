// ShopDrawings.jsx
import React, { useState } from 'react';

const ShopDrawings = () => {
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Shop drawings data
  const shopDrawings = [
    {
      id: 'SD-1042-01',
      projectId: 'E-1042',
      projectName: 'Hilton Hotel Elevator Modernization',
      client: 'Hilton Hotels',
      title: 'Elevator Cabin Layout - Main Lobby',
      type: 'CAD Drawing',
      status: 'Approved',
      version: 'v2.3',
      submittedDate: '2026-06-28',
      approvedDate: '2026-07-02',
      revisionDue: '2026-07-15',
      category: 'Architectural',
      scale: '1:20',
      sheetCount: 12,
      description: 'Complete cabin layout including wall panels, flooring, ceiling, and handrail placement for main lobby elevators.',
      files: [
        { name: 'E-1042_LAYOUT_MAIN.dwg', size: '4.2 MB', type: 'DWG' },
        { name: 'E-1042_LAYOUT_MAIN.pdf', size: '2.8 MB', type: 'PDF' },
        { name: 'E-1042_SECTION_AA.pdf', size: '1.5 MB', type: 'PDF' }
      ],
      reviewer: 'Sarah Chen',
      notes: 'Approved with minor adjustments to handrail height. Proceed to fabrication.',
      revisions: [
        { version: 'v2.2', date: '2026-06-30', changes: 'Adjusted handrail height per client request' },
        { version: 'v2.1', date: '2026-06-28', changes: 'Added detailed callouts for panel joints' },
        { version: 'v2.0', date: '2026-06-25', changes: 'Initial submission' }
      ]
    },
    {
      id: 'SD-1042-02',
      projectId: 'E-1042',
      projectName: 'Hilton Hotel Elevator Modernization',
      client: 'Hilton Hotels',
      title: 'Panel Fabrication Details - Stainless Steel',
      type: 'Manufacturing Drawing',
      status: 'In Review',
      version: 'v1.5',
      submittedDate: '2026-07-01',
      approvedDate: null,
      revisionDue: '2026-07-10',
      category: 'Fabrication',
      scale: '1:5',
      sheetCount: 8,
      description: 'Detailed fabrication drawings for stainless steel wall panels including bend radii, weld points, and surface finish requirements.',
      files: [
        { name: 'E-1042_PANEL_DETAILS.dwg', size: '6.8 MB', type: 'DWG' },
        { name: 'E-1042_PANEL_DETAILS.pdf', size: '3.2 MB', type: 'PDF' },
        { name: 'E-1042_BOM_PANELS.xlsx', size: '1.1 MB', type: 'XLSX' }
      ],
      reviewer: 'Michael Rodriguez',
      notes: 'Under review. Check bend radii against material specifications.',
      revisions: [
        { version: 'v1.5', date: '2026-07-01', changes: 'Updated bend radii per material specs' },
        { version: 'v1.4', date: '2026-06-29', changes: 'Added welding symbols' },
        { version: 'v1.3', date: '2026-06-27', changes: 'Initial fabrication details' }
      ]
    },
    {
      id: 'SD-1045-03',
      projectId: 'E-1045',
      projectName: 'City Tower Commercial Elevators',
      client: 'City Tower Management',
      title: 'High-Speed Elevator Mechanical Assembly',
      type: 'CAD Drawing',
      status: 'Pending Approval',
      version: 'v3.0',
      submittedDate: '2026-07-03',
      approvedDate: null,
      revisionDue: '2026-07-12',
      category: 'Mechanical',
      scale: '1:10',
      sheetCount: 15,
      description: 'Mechanical assembly drawings for high-speed elevator system including motor mounting, brake systems, and counterweight arrangement.',
      files: [
        { name: 'E-1045_MECH_ASSEMBLY.dwg', size: '8.5 MB', type: 'DWG' },
        { name: 'E-1045_MECH_ASSEMBLY.pdf', size: '4.1 MB', type: 'PDF' },
        { name: 'E-1045_MECH_SPECS.pdf', size: '2.3 MB', type: 'PDF' }
      ],
      reviewer: 'Emily Watson',
      notes: 'Ready for client approval. All mechanical specifications verified.',
      revisions: [
        { version: 'v3.0', date: '2026-07-03', changes: 'Final assembly drawings' },
        { version: 'v2.8', date: '2026-06-30', changes: 'Updated brake system specifications' },
        { version: 'v2.5', date: '2026-06-28', changes: 'Initial mechanical design' }
      ]
    },
    {
      id: 'SD-1048-04',
      projectId: 'E-1048',
      projectName: 'Green Valley Mall Escalators',
      client: 'Green Valley Properties',
      title: 'Escalator Step and Handrail System',
      type: 'Manufacturing Drawing',
      status: 'Revision Required',
      version: 'v2.1',
      submittedDate: '2026-07-02',
      approvedDate: null,
      revisionDue: '2026-07-08',
      category: 'Fabrication',
      scale: '1:4',
      sheetCount: 10,
      description: 'Manufacturing drawings for escalator step system and handrail assembly with detailed component specifications.',
      files: [
        { name: 'E-1048_ESCALATOR_STEP.dwg', size: '5.7 MB', type: 'DWG' },
        { name: 'E-1048_ESCALATOR_STEP.pdf', size: '3.6 MB', type: 'PDF' },
        { name: 'E-1048_HANDRAIL.pdf', size: '2.1 MB', type: 'PDF' }
      ],
      reviewer: 'David Kim',
      notes: 'Revision required: Step clearance needs adjustment. Update handrail tension specifications.',
      revisions: [
        { version: 'v2.1', date: '2026-07-02', changes: 'Updated step dimensions' },
        { version: 'v2.0', date: '2026-06-29', changes: 'Complete manufacturing set' },
        { version: 'v1.5', date: '2026-06-26', changes: 'Initial conceptual drawings' }
      ]
    },
    {
      id: 'SD-1050-05',
      projectId: 'E-1050',
      projectName: 'Sunset Residence Elevators',
      client: 'Sunset Development Group',
      title: 'Luxury Cabin Interior - Wood Paneling',
      type: 'CAD Drawing',
      status: 'Approved',
      version: 'v1.8',
      submittedDate: '2026-06-20',
      approvedDate: '2026-06-25',
      revisionDue: '2026-07-20',
      category: 'Architectural',
      scale: '1:10',
      sheetCount: 6,
      description: 'Detailed interior drawings for walnut wood paneling with integrated lighting and brass handrail details.',
      files: [
        { name: 'E-1050_CABIN_INTERIOR.dwg', size: '3.8 MB', type: 'DWG' },
        { name: 'E-1050_CABIN_INTERIOR.pdf', size: '2.4 MB', type: 'PDF' },
        { name: 'E-1050_WOOD_PANEL_DETAILS.pdf', size: '1.8 MB', type: 'PDF' }
      ],
      reviewer: 'Lisa Park',
      notes: 'Fully approved. All details verified for production.',
      revisions: [
        { version: 'v1.8', date: '2026-06-20', changes: 'Final approved version' },
        { version: 'v1.6', date: '2026-06-18', changes: 'Adjusted panel alignment' },
        { version: 'v1.0', date: '2026-06-15', changes: 'Initial submission' }
      ]
    },
    {
      id: 'SD-1053-06',
      projectId: 'E-1053',
      projectName: 'Tech Hub Office Elevators',
      client: 'TechHub Inc.',
      title: 'Smart Control System Integration',
      type: 'Manufacturing Drawing',
      status: 'Pending Approval',
      version: 'v3.5',
      submittedDate: '2026-07-04',
      approvedDate: null,
      revisionDue: '2026-07-11',
      category: 'Electrical',
      scale: 'N/A',
      sheetCount: 20,
      description: 'Electrical and control system integration drawings for smart elevator interfaces, touch panels, and IoT connectivity.',
      files: [
        { name: 'E-1053_CONTROL_SYSTEM.dwg', size: '9.2 MB', type: 'DWG' },
        { name: 'E-1053_CONTROL_SYSTEM.pdf', size: '5.6 MB', type: 'PDF' },
        { name: 'E-1053_WIRING_DIAGRAM.pdf', size: '4.3 MB', type: 'PDF' },
        { name: 'E-1053_IOT_SPECS.pdf', size: '2.8 MB', type: 'PDF' }
      ],
      reviewer: 'Sarah Chen',
      notes: 'Awaiting final approval from client engineering team. All technical specifications included.',
      revisions: [
        { version: 'v3.5', date: '2026-07-04', changes: 'Updated IoT connectivity specs' },
        { version: 'v3.2', date: '2026-07-01', changes: 'Added touch panel integration' },
        { version: 'v3.0', date: '2026-06-28', changes: 'Complete control system design' }
      ]
    }
  ];

  // Filter and search
  const filteredDrawings = shopDrawings.filter(drawing => {
    const matchesStatus = filterStatus === 'all' || drawing.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === 'all' || drawing.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch = drawing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drawing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drawing.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drawing.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  // Status color mapping
  const statusColorMap = {
    'Approved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'In Review': 'bg-blue-100 text-blue-700 border-blue-200',
    'Pending Approval': 'bg-amber-100 text-amber-700 border-amber-200',
    'Revision Required': 'bg-red-100 text-red-700 border-red-200',
  };

  const typeColorMap = {
    'CAD Drawing': 'bg-blue-50 text-blue-600 border-blue-200',
    'Manufacturing Drawing': 'bg-purple-50 text-purple-600 border-purple-200',
  };

  // Get counts for stats
  const getTypeCount = (type) => {
    if (type === 'all') return shopDrawings.length;
    return shopDrawings.filter(d => d.type.toLowerCase() === type.toLowerCase()).length;
  };

  const getStatusCount = (status) => {
    if (status === 'all') return shopDrawings.length;
    return shopDrawings.filter(d => d.status.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Shop Drawings</h1>
          <p className="text-slate-500 text-sm mt-1">
            Blueprints, CAD submittals, and manufacturing documentation tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm transition-all">
            <i className="fas fa-upload"></i>
            Upload Drawing
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20 transition-all">
            <i className="fas fa-plus-circle"></i>
            New Drawing
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <i className="fas fa-file"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Total Drawings</div>
              <div className="text-xl font-bold text-slate-900">{shopDrawings.length}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Approved</div>
              <div className="text-xl font-bold text-slate-900">
                {shopDrawings.filter(d => d.status === 'Approved').length}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Pending Review</div>
              <div className="text-xl font-bold text-slate-900">
                {shopDrawings.filter(d => d.status === 'Pending Approval' || d.status === 'In Review').length}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
              <i className="fas fa-edit"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Revision Required</div>
              <div className="text-xl font-bold text-slate-900">
                {shopDrawings.filter(d => d.status === 'Revision Required').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search drawings by title, ID, project, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-medium text-slate-500 self-center">Status:</span>
              {['all', 'approved', 'in review', 'pending approval', 'revision required'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${
                    filterStatus === status ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                  }`}>
                    {getStatusCount(status)}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-medium text-slate-500 self-center">Type:</span>
              {['all', 'cad drawing', 'manufacturing drawing'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    filterType === type
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${
                    filterType === type ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                  }`}>
                    {getTypeCount(type)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drawings Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredDrawings.map((drawing) => (
          <div
            key={drawing.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-blue-600">{drawing.id}</span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColorMap[drawing.status]}`}>
                    {drawing.status}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${typeColorMap[drawing.type]}`}>
                    {drawing.type}
                  </span>
                  <span className="text-xs text-slate-400">v{drawing.version}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mt-1.5">{drawing.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span><i className="fas fa-building mr-1"></i>{drawing.client}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span><i className="fas fa-tag mr-1"></i>{drawing.category}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span><i className="fas fa-layer-group mr-1"></i>{drawing.sheetCount} sheets</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Scale: {drawing.scale}</span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-slate-600">{drawing.description}</p>

            {/* File List */}
            <div className="mt-3 bg-slate-50 rounded-xl p-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <i className="fas fa-paperclip"></i>
                <span>Attached Files ({drawing.files.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {drawing.files.map((file, idx) => (
                  <div key={idx} className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 text-xs">
                    <i className={`fas ${
                      file.type === 'DWG' ? 'fa-cube' :
                      file.type === 'PDF' ? 'fa-file-pdf' : 'fa-file-excel'
                    } text-blue-600`}></i>
                    <span className="text-slate-700">{file.name}</span>
                    <span className="text-slate-400">({file.size})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Info */}
            <div className="mt-3 flex flex-wrap justify-between items-center text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span><i className="fas fa-user mr-1"></i>Reviewer: {drawing.reviewer}</span>
                <span className="w-px h-4 bg-slate-200"></span>
                <span><i className="fas fa-calendar-alt mr-1"></i>Submitted: {drawing.submittedDate}</span>
                {drawing.approvedDate && (
                  <>
                    <span className="w-px h-4 bg-slate-200"></span>
                    <span className="text-emerald-600"><i className="fas fa-check mr-1"></i>Approved: {drawing.approvedDate}</span>
                  </>
                )}
              </div>
              <span className={`font-medium ${
                drawing.status === 'Approved' ? 'text-emerald-600' :
                drawing.status === 'Revision Required' ? 'text-red-600' : 'text-amber-600'
              }`}>
                <i className="fas fa-clock mr-1"></i>Revision Due: {drawing.revisionDue}
              </span>
            </div>

            {/* Revision History */}
            {drawing.revisions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <i className="fas fa-history"></i>
                  <span>Recent Revisions</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {drawing.revisions.slice(0, 2).map((rev, idx) => (
                    <div key={idx} className="text-xs bg-slate-50 px-2.5 py-1 rounded-lg">
                      <span className="font-medium text-slate-700">{rev.version}</span>
                      <span className="text-slate-400 mx-1">·</span>
                      <span className="text-slate-500">{rev.date}</span>
                      <span className="text-slate-500 ml-1">- {rev.changes}</span>
                    </div>
                  ))}
                  {drawing.revisions.length > 2 && (
                    <span className="text-xs text-blue-600 font-medium">+{drawing.revisions.length - 2} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="mt-3 bg-amber-50 rounded-xl p-3 border border-amber-200">
              <div className="flex items-start gap-2">
                <i className="fas fa-sticky-note text-amber-600 mt-0.5"></i>
                <span className="text-sm text-amber-800">{drawing.notes}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-eye"></i>
                Preview
              </button>
              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-download"></i>
                Download All
              </button>
              {drawing.status === 'In Review' && (
                <button className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                  <i className="fas fa-check"></i>
                  Approve
                </button>
              )}
              {drawing.status === 'Pending Approval' && (
                <button className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                  <i className="fas fa-clock"></i>
                  Start Review
                </button>
              )}
              {drawing.status === 'Revision Required' && (
                <button className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                  <i className="fas fa-edit"></i>
                  Revise Drawing
                </button>
              )}
              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-share-alt"></i>
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDrawings.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-draw-polygon text-3xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No drawings found</h3>
          <p className="text-slate-500 text-sm mt-1">
            No shop drawings match your current filters.
          </p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-slate-500">Total Drawings: <span className="font-semibold text-slate-800">{shopDrawings.length}</span></span>
            <span className="text-slate-500">CAD Drawings: <span className="font-semibold text-blue-600">
              {shopDrawings.filter(d => d.type === 'CAD Drawing').length}
            </span></span>
            <span className="text-slate-500">Manufacturing: <span className="font-semibold text-purple-600">
              {shopDrawings.filter(d => d.type === 'Manufacturing Drawing').length}
            </span></span>
            <span className="text-slate-500">Total Sheets: <span className="font-semibold text-slate-800">
              {shopDrawings.reduce((acc, d) => acc + d.sheetCount, 0)}
            </span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <i className="fas fa-sync-alt"></i>
            <span>Last updated: Today, 5:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDrawings;