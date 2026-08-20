// SubmitPricing.jsx
import React, { useState } from 'react';

const SubmitPricing = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Pricing data
  const pricingRequests = [
    {
      id: 'PR-1042-01',
      projectId: 'E-1042',
      projectName: 'Hilton Hotel Elevator Modernization',
      client: 'Hilton Hotels',
      type: 'Elevator Interior',
      status: 'Pending Quote',
      priority: 'High',
      requestDate: '2026-07-01',
      dueDate: '2026-07-08',
      estimatedValue: '$245,000 - $280,000',
      scope: 'Full interior modernization for 4 passenger elevators',
      requirements: [
        'Stainless steel cabin walls (304 grade, brushed finish)',
        'Marble flooring (premium grade, polished)',
        'LED lighting system with dimming controls',
        'Custom handrails (316 stainless steel)',
        'Fire-rated ceiling panels'
      ],
      materials: {
        steel: '500 sq ft',
        marble: '300 sq ft',
        lighting: '48 fixtures',
        hardware: '16 sets'
      },
      submittedQuote: null,
      notes: 'Client requesting premium finishes. Competitive bidding expected.',
      contactPerson: 'Jennifer Adams',
      contactEmail: 'j.adams@hiltonhotels.com'
    },
    {
      id: 'PR-1045-02',
      projectId: 'E-1045',
      projectName: 'City Tower Commercial Elevators',
      client: 'City Tower Management',
      type: 'High-Speed Elevator',
      status: 'In Progress',
      priority: 'High',
      requestDate: '2026-07-03',
      dueDate: '2026-07-10',
      estimatedValue: '$380,000 - $420,000',
      scope: '4 high-speed elevators for 35-story commercial building',
      requirements: [
        'Tempered glass cabin walls (10mm)',
        'Granite flooring (commercial grade, honed)',
        'Smart control panel with touchscreen',
        'Advanced safety systems (EN 81-20 compliant)',
        'Emergency communication system'
      ],
      materials: {
        glass: '800 sq ft',
        granite: '450 sq ft',
        controls: '4 systems',
        safety: '4 units'
      },
      submittedQuote: {
        amount: '$395,000',
        breakdown: 'Materials: $185,000, Labor: $120,000, Installation: $90,000',
        submittedDate: '2026-07-05'
      },
      notes: 'Technical specifications reviewed. Quote submitted with competitive pricing.',
      contactPerson: 'Robert Thompson',
      contactEmail: 'r.thompson@citytower.com'
    },
    {
      id: 'PR-1048-03',
      projectId: 'E-1048',
      projectName: 'Green Valley Mall Escalators',
      client: 'Green Valley Properties',
      type: 'Escalator System',
      status: 'Pending Quote',
      priority: 'Medium',
      requestDate: '2026-07-05',
      dueDate: '2026-07-12',
      estimatedValue: '$180,000 - $220,000',
      scope: '2 custom escalators with glass balustrades',
      requirements: [
        'Aluminum steps (6061 grade, anodized)',
        'Rubber handrails (industrial grade)',
        'Tempered glass balustrades (12mm)',
        'Variable speed control system',
        'Safety sensors and emergency stops'
      ],
      materials: {
        aluminum: '400 sq ft',
        rubber: '300 linear ft',
        glass: '500 sq ft',
        electronics: '2 systems'
      },
      submittedQuote: null,
      notes: 'Escalator-specific requirements. Need to verify step clearance.',
      contactPerson: 'Maria Garcia',
      contactEmail: 'm.garcia@greenvalley.com'
    },
    {
      id: 'PR-1050-04',
      projectId: 'E-1050',
      projectName: 'Sunset Residence Elevators',
      client: 'Sunset Development Group',
      type: 'Residential Elevator',
      status: 'Awarded',
      priority: 'Low',
      requestDate: '2026-06-25',
      dueDate: '2026-07-02',
      estimatedValue: '$95,000 - $120,000',
      scope: 'Luxury residential elevator with custom finishes',
      requirements: [
        'Walnut wood cabin walls (18mm, varnished)',
        'Oak hardwood flooring (14mm, matte)',
        'Brass handrails (polished)',
        'Custom ceiling with integrated lighting',
        'Keyless entry system'
      ],
      materials: {
        wood: '200 sq ft',
        hardwood: '150 sq ft',
        brass: '60 linear ft',
        lighting: '12 fixtures'
      },
      submittedQuote: {
        amount: '$108,000',
        breakdown: 'Materials: $52,000, Labor: $34,000, Installation: $22,000',
        submittedDate: '2026-06-28'
      },
      notes: 'Quote accepted. Project awarded to our company.',
      contactPerson: 'Thomas Wilson',
      contactEmail: 't.wilson@sunsetdev.com'
    },
    {
      id: 'PR-1053-05',
      projectId: 'E-1053',
      projectName: 'Tech Hub Office Elevators',
      client: 'TechHub Inc.',
      type: 'Smart Elevator',
      status: 'Revision Required',
      priority: 'High',
      requestDate: '2026-07-02',
      dueDate: '2026-07-09',
      estimatedValue: '$320,000 - $360,000',
      scope: '3 smart elevators with digital interfaces',
      requirements: [
        'Composite cabin walls (advanced grade)',
        'Commercial vinyl flooring (patterned)',
        'LED smart panels with touch controls',
        'IoT integration for building management',
        'Mobile app connectivity'
      ],
      materials: {
        composite: '500 sq ft',
        vinyl: '300 sq ft',
        smartPanels: '3 units',
        iotComponents: '3 systems'
      },
      submittedQuote: {
        amount: '$340,000',
        breakdown: 'Materials: $160,000, Labor: $100,000, Installation: $80,000',
        submittedDate: '2026-07-06'
      },
      notes: 'Quote requires revision - Smart panel interface needs update.',
      contactPerson: 'David Chen',
      contactEmail: 'd.chen@techhub.com'
    },
  ];

  // Filter and search
  const filteredPricing = pricingRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status.toLowerCase().replace(' ', '') === filterStatus.toLowerCase().replace(' ', '');
    const matchesSearch = request.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Status color mapping
  const statusColorMap = {
    'Pending Quote': 'bg-amber-100 text-amber-700 border-amber-200',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
    'Revision Required': 'bg-purple-100 text-purple-700 border-purple-200',
    'Awarded': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const priorityColorMap = {
    'High': 'text-red-600 bg-red-50 border-red-200',
    'Medium': 'text-amber-600 bg-amber-50 border-amber-200',
    'Low': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  };

  // Get status count
  const getStatusCount = (status) => {
    if (status === 'all') return pricingRequests.length;
    return pricingRequests.filter(r => r.status.toLowerCase().replace(' ', '') === status.toLowerCase().replace(' ', '')).length;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Submit Pricing</h1>
          <p className="text-slate-500 text-sm mt-1">
            Bidding, quoting, and commercial proposal gateways
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm transition-all">
            <i className="fas fa-file-export"></i>
            Export Quotes
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20 transition-all">
            <i className="fas fa-plus-circle"></i>
            New Quote
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Pending Quotes</div>
              <div className="text-xl font-bold text-slate-900">
                {pricingRequests.filter(r => r.status === 'Pending Quote').length}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <i className="fas fa-spinner"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">In Progress</div>
              <div className="text-xl font-bold text-slate-900">
                {pricingRequests.filter(r => r.status === 'In Progress').length}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <i className="fas fa-edit"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Revision Required</div>
              <div className="text-xl font-bold text-slate-900">
                {pricingRequests.filter(r => r.status === 'Revision Required').length}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div className="text-xs text-slate-500">Awarded</div>
              <div className="text-xl font-bold text-slate-900">
                {pricingRequests.filter(r => r.status === 'Awarded').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search pricing requests by project, ID, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50 text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'pendingquote', 'inprogress', 'revisionrequired', 'awarded'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'All Requests' : 
                  status === 'pendingquote' ? 'Pending Quote' :
                  status === 'inprogress' ? 'In Progress' :
                  status === 'revisionrequired' ? 'Revision Required' : 'Awarded'}
                <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${
                  filterStatus === status ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                }`}>
                  {getStatusCount(status)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing List */}
      <div className="space-y-5">
        {filteredPricing.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-bold text-blue-600">{request.id}</span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColorMap[request.status]}`}>
                    {request.status}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${priorityColorMap[request.priority]}`}>
                    <i className={`fas fa-flag mr-1 ${
                      request.priority === 'High' ? 'text-red-500' :
                      request.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                    }`}></i>
                    {request.priority} Priority
                  </span>
                  <span className="text-xs text-slate-500">
                    <i className="fas fa-dollar-sign mr-1"></i>
                    {request.estimatedValue}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mt-1.5 text-lg">{request.projectName}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                  <span><i className="fas fa-building mr-1"></i>{request.client}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span><i className="fas fa-tag mr-1"></i>{request.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  <i className="fas fa-envelope mr-1"></i>
                  Contact
                </button>
              </div>
            </div>

            {/* Scope and Requirements */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fas fa-bullseye mr-1"></i> Scope
                </h4>
                <p className="text-sm text-slate-700">{request.scope}</p>
                <div className="mt-2">
                  <h5 className="text-xs font-medium text-slate-500 mb-1">Requirements:</h5>
                  <ul className="space-y-0.5">
                    {request.requirements.slice(0, 3).map((req, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <i className="fas fa-check-circle text-emerald-500 mt-0.5 text-[10px]"></i>
                        <span>{req}</span>
                      </li>
                    ))}
                    {request.requirements.length > 3 && (
                      <li className="text-xs text-blue-600 font-medium">+{request.requirements.length - 3} more requirements</li>
                    )}
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fas fa-cubes mr-1"></i> Material Requirements
                </h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(request.materials).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 rounded-lg px-3 py-1.5">
                      <span className="text-slate-500 capitalize">{key}:</span>
                      <span className="font-medium text-slate-700 ml-1">{value}</span>
                    </div>
                  ))}
                </div>
                {request.submittedQuote && (
                  <div className="mt-3 bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-500">Submitted Quote</span>
                        <div className="font-bold text-slate-900">{request.submittedQuote.amount}</div>
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">
                        <i className="fas fa-check mr-1"></i>
                        Submitted: {request.submittedQuote.submittedDate}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {request.submittedQuote.breakdown}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes and Dates */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1">
                    <i className="fas fa-sticky-note mr-1"></i> Notes
                  </div>
                  <p className="text-sm text-slate-700">{request.notes}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span><i className="fas fa-user mr-1"></i>{request.contactPerson}</span>
                  <span className="w-px h-4 bg-slate-200"></span>
                  <span><i className="fas fa-calendar-alt mr-1"></i>Requested: {request.requestDate}</span>
                  <span className={`font-medium ${
                    new Date(request.dueDate) < new Date() ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    <i className="fas fa-clock mr-1"></i>Due: {request.dueDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-eye"></i>
                View Details
              </button>
              {request.status === 'Pending Quote' && (
                <button className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                  <i className="fas fa-file-signature"></i>
                  Submit Quote
                </button>
              )}
              {request.status === 'Revision Required' && (
                <button className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                  <i className="fas fa-edit"></i>
                  Revise Quote
                </button>
              )}
              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-download"></i>
                Download RFP
              </button>
              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm transition-all flex items-center gap-2">
                <i className="fas fa-print"></i>
                Print
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPricing.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-tag text-3xl text-slate-400"></i>
          </div>
          <h3 className="font-semibold text-slate-800">No pricing requests found</h3>
          <p className="text-slate-500 text-sm mt-1">
            No bidding or quoting requests match your current filters.
          </p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-slate-500">Total Requests: <span className="font-semibold text-slate-800">{pricingRequests.length}</span></span>
            <span className="text-slate-500">Pending: <span className="font-semibold text-amber-600">
              {pricingRequests.filter(r => r.status === 'Pending Quote').length}
            </span></span>
            <span className="text-slate-500">In Progress: <span className="font-semibold text-blue-600">
              {pricingRequests.filter(r => r.status === 'In Progress').length}
            </span></span>
            <span className="text-slate-500">Revision Required: <span className="font-semibold text-purple-600">
              {pricingRequests.filter(r => r.status === 'Revision Required').length}
            </span></span>
            <span className="text-slate-500">Awarded: <span className="font-semibold text-emerald-600">
              {pricingRequests.filter(r => r.status === 'Awarded').length}
            </span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <i className="fas fa-sync-alt"></i>
            <span>Last updated: Today, 4:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPricing;