// Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  // High-level operational metrics
  const operationalMetrics = [
    { 
      label: 'Active Projects', 
      value: '14', 
      change: '+2', 
      trend: 'up',
      icon: 'fa-diagram-project',
      color: 'blue',
      description: 'Currently in production pipeline'
    },
    { 
      label: 'Specs to Review', 
      value: '8', 
      change: '-3', 
      trend: 'down',
      icon: 'fa-clipboard-list',
      color: 'purple',
      description: 'Awaiting technical approval'
    },
    { 
      label: 'Pending Pricing', 
      value: '5', 
      change: '+1', 
      trend: 'up',
      icon: 'fa-tag',
      color: 'amber',
      description: 'Quotes to be submitted'
    },
    { 
      label: 'Production Progress', 
      value: '67%', 
      change: '+12%', 
      trend: 'up',
      icon: 'fa-industry',
      color: 'emerald',
      description: 'Overall manufacturing status'
    },
  ];

  // Performance metrics
  const performanceMetrics = [
    { label: 'On-Time Delivery', value: '94%', change: '+2%', trend: 'up' },
    { label: 'Quality Rate', value: '98.5%', change: '+0.5%', trend: 'up' },
    { label: 'Avg. Review Time', value: '2.4 hrs', change: '-0.8 hrs', trend: 'down' },
    { label: 'Project Completion', value: '76%', change: '+8%', trend: 'up' },
  ];

  // Recent actions requiring attention
  const pendingActions = [
    { id: 1, task: 'Review specifications for Project E-1042', priority: 'high', deadline: 'Today' },
    { id: 2, task: 'Submit pricing for Green Valley Mall', priority: 'medium', deadline: 'Tomorrow' },
    { id: 3, task: 'Update shop drawings for Elevator #12', priority: 'high', deadline: 'Today' },
    { id: 4, task: 'Confirm production schedule for City Tower', priority: 'low', deadline: 'Jul 25' },
  ];

  // Production status updates
  const productionUpdates = [
    { project: 'Hilton Hotel', stage: 'Assembly', progress: 75, status: 'On Track' },
    { project: 'City Tower', stage: 'Fabrication', progress: 45, status: 'In Progress' },
    { project: 'Green Valley Mall', stage: 'Design Review', progress: 20, status: 'Pending' },
  ];

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  const priorityColorMap = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };

  const statusColorMap = {
    'On Track': 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="p-8 space-y-7">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fabrication Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            High-level metric summary of operational performance and actions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm transition-all">
            <i className="fas fa-file-export"></i>
            Export Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30">
            <i className="fas fa-plus-circle"></i>
            New Project
          </button>
        </div>
      </div>

      {/* Operational Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {operationalMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
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
            <i className="fas fa-chart-line text-blue-600"></i>
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
                <span className={`text-xs font-medium ${
                  metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  <i className={`fas fa-arrow-${metric.trend} mr-0.5`}></i>
                  {metric.change}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, parseInt(metric.value))}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Actions & Production */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <i className="fas fa-clock text-amber-500"></i>
              Pending Actions
            </h3>
            <span className="text-xs text-slate-400">{pendingActions.length} items</span>
          </div>
          <div className="space-y-3">
            {pendingActions.map((action) => (
              <div key={action.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer">
                <div className={`w-2 h-2 rounded-full ${
                  action.priority === 'high' ? 'bg-red-500' : 
                  action.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{action.task}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColorMap[action.priority]}`}>
                      {action.priority}
                    </span>
                    <span className="text-xs text-slate-400">
                      <i className="fas fa-calendar-alt mr-1"></i>
                      {action.deadline}
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Review</button>
              </div>
            ))}
          </div>
        </div>

        {/* Production Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <i className="fas fa-industry text-blue-600"></i>
              Production Status
            </h3>
            <a href="#" className="text-sm text-blue-600 font-medium hover:underline">View all</a>
          </div>
          <div className="space-y-4">
            {productionUpdates.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-sm font-medium text-slate-700">{item.project}</span>
                    <span className="text-xs text-slate-400 ml-2">{item.stage}</span>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColorMap[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span><i className="fas fa-check-circle text-emerald-500 mr-1"></i> 3 completed this week</span>
              <span><i className="fas fa-clock text-amber-500 mr-1"></i> 2 behind schedule</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;