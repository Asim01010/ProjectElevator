// SubscriptionManagement.jsx
import React, { useState } from 'react';

const SubscriptionManagement = () => {
  const [currentPlan] = useState('Professional');

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/mo',
      description: 'For suppliers testing the marketplace',
      features: ['Up to 15 active listings', 'Standard search placement', 'Email support', '1 team seat'],
      highlight: false,
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/mo',
      description: 'For growing suppliers with steady lead flow',
      features: [
        'Up to 150 active listings',
        'Priority search placement',
        'Lead & sample request automation',
        'Analytics dashboard',
        '5 team seats',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For manufacturers with high-volume catalogs',
      features: [
        'Unlimited active listings',
        'Featured placement across the platform',
        'Dedicated account manager',
        'API catalog sync',
        'Unlimited team seats',
      ],
      highlight: false,
    },
  ];

  const usage = [
    { label: 'Active Listings', used: 128, limit: 150 },
    { label: 'Team Seats', used: 3, limit: 5 },
    { label: 'Monthly Lead Requests', used: 17, limit: 999, unlimited: false, note: 'Unlimited on Professional+' },
  ];

  const billingHistory = [
    { id: 'INV-08213', date: '2026-07-01', amount: '$149.00', status: 'Paid' },
    { id: 'INV-08109', date: '2026-06-01', amount: '$149.00', status: 'Paid' },
    { id: 'INV-08004', date: '2026-05-01', amount: '$149.00', status: 'Paid' },
    { id: 'INV-07891', date: '2026-04-01', amount: '$149.00', status: 'Paid' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subscription Management</h1>
        <p className="text-slate-500 text-sm mt-1">Merchant account status and commercial tier selection</p>
      </div>

      {/* Current Plan Summary */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg shadow-emerald-600/20">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-100">Current Plan</span>
            <h2 className="text-2xl font-bold mt-1">{currentPlan}</h2>
            <p className="text-emerald-100 text-sm mt-1">Renews on August 1, 2026 · $149.00/mo</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium transition-all">
              Manage Payment Method
            </button>
            <button className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
              Upgrade to Enterprise
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
          <i className="fas fa-gauge-high text-emerald-600"></i>
          Plan Usage
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {usage.map((u, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-slate-600">{u.label}</span>
                <span className="text-sm font-semibold text-slate-800">
                  {u.used} / {u.limit >= 999 ? '∞' : u.limit}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${u.limit >= 999 ? 10 : Math.min(100, (u.used / u.limit) * 100)}%` }}
                ></div>
              </div>
              {u.note && <p className="text-xs text-slate-400 mt-1.5">{u.note}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fas fa-layer-group text-emerald-600"></i>
          Available Plans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border shadow-sm transition-all relative ${
                plan.highlight ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-600/10 ring-2 ring-emerald-500' : 'border-slate-200 bg-white'
              }`}
            >
              {plan.name === currentPlan && (
                <span className="absolute -top-3 left-6 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  Current Plan
                </span>
              )}
              <h4 className="font-bold text-slate-900 text-lg">{plan.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-500">{plan.period}</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <i className="fas fa-check text-emerald-600 mt-0.5"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={plan.name === currentPlan}
                className={`w-full mt-6 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  plan.name === currentPlan
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : plan.highlight
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {plan.name === currentPlan ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : `Switch to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 pb-0 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <i className="fas fa-receipt text-emerald-600"></i>
            Billing History
          </h3>
          <button className="text-sm text-emerald-600 font-medium hover:underline">Download all invoices</button>
        </div>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3">Invoice</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((b) => (
              <tr key={b.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-all">
                <td className="px-6 py-3 font-medium text-slate-800">{b.id}</td>
                <td className="px-6 py-3 text-slate-500">{b.date}</td>
                <td className="px-6 py-3 text-slate-700">{b.amount}</td>
                <td className="px-6 py-3">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{b.status}</span>
                </td>
                <td className="px-6 py-3 text-right">
                  <button className="text-emerald-600 hover:text-emerald-700 text-xs font-medium">
                    <i className="fas fa-download mr-1"></i>PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
