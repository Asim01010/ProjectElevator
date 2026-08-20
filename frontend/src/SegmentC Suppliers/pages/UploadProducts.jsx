// UploadProducts.jsx
import React, { useState } from 'react';

const UploadProducts = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Wall Panel Finish',
    material: '',
    finish: '',
    pattern: '',
    price: '',
    unit: 'sq ft',
    leadTime: '',
    description: '',
  });

  const [specs, setSpecs] = useState([{ key: '', value: '' }]);
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const recentUploads = [
    { name: 'Fused Graphite — Diamond', category: 'Wall Panel Finish', status: 'Live', date: '2026-07-05' },
    { name: 'Black Anodized Aluminum', category: 'Corner Reveal', status: 'In Review', date: '2026-07-08' },
    { name: 'Satin Stainless Crash Rail', category: 'Crash Rail', status: 'Live', date: '2026-06-30' },
  ];

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSpecChange = (idx, field, value) => {
    setSpecs((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const addSpecRow = () => setSpecs((prev) => [...prev, { key: '', value: '' }]);
  const removeSpecRow = (idx) => setSpecs((prev) => prev.filter((_, i) => i !== idx));

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    setImages(files.map((f) => ({ name: f.name, size: (f.size / 1024).toFixed(0) + ' KB' })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const statusColorMap = {
    Live: 'bg-emerald-100 text-emerald-700',
    'In Review': 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Upload Products</h1>
        <p className="text-slate-500 text-sm mt-1">Add raw components, finishes, and technical metrics to your catalog</p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl text-sm flex items-center gap-2">
          <i className="fas fa-circle-check"></i>
          Product submitted for review — it'll appear in your catalog once approved.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-tag text-emerald-600"></i>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Fused Nickel Bronze"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white"
                >
                  {['Wall Panel Finish', 'Handrail', 'Corner Reveal', 'Panel Frame', 'Crash Rail', 'Ceiling'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => handleChange('material', e.target.value)}
                  placeholder="e.g. Fused Metal"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Finish</label>
                <input
                  type="text"
                  value={formData.finish}
                  onChange={(e) => handleChange('finish', e.target.value)}
                  placeholder="e.g. Sandstone"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Pattern</label>
                <input
                  type="text"
                  value={formData.pattern}
                  onChange={(e) => handleChange('pattern', e.target.value)}
                  placeholder="e.g. No Pattern"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-sack-dollar text-emerald-600"></i>
              Pricing & Lead Time
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="48.00"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white"
                >
                  {['sq ft', 'linear ft', 'unit', 'panel'].map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Lead Time (days)</label>
                <input
                  type="number"
                  value={formData.leadTime}
                  onChange={(e) => handleChange('leadTime', e.target.value)}
                  placeholder="14"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <i className="fas fa-ruler-combined text-emerald-600"></i>
                Technical Metrics
              </h3>
              <button type="button" onClick={addSpecRow} className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                <i className="fas fa-plus mr-1"></i>Add Row
              </button>
            </div>
            <div className="space-y-2">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="e.g. Thickness"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="e.g. 0.05 in"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {specs.length > 1 && (
                    <button type="button" onClick={() => removeSpecRow(idx)} className="text-slate-400 hover:text-red-500 px-2">
                      <i className="fas fa-trash-can"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-images text-emerald-600"></i>
              Product Images
            </h3>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl py-8 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all">
              <i className="fas fa-cloud-arrow-up text-2xl text-slate-400"></i>
              <span className="text-sm text-slate-500">Click to upload or drag & drop (up to 6 images)</span>
              <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>
            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600">
                    <i className="fas fa-image text-slate-400"></i>
                    <span className="truncate flex-1">{img.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pt-6 border-t border-slate-100">
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe finish characteristics, ideal applications, maintenance notes..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-y"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-3 rounded-lg text-sm shadow-lg shadow-emerald-600/20 transition-all">
              <i className="fas fa-cloud-arrow-up mr-2"></i>
              Submit for Review
            </button>
            <button type="button" className="px-5 py-3 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">
              Save as Draft
            </button>
          </div>
        </form>

        {/* Recent Uploads Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-clock-rotate-left text-emerald-600"></i>
            Recent Uploads
          </h3>
          <div className="space-y-3">
            {recentUploads.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColorMap[item.status]}`}>{item.status}</span>
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                </div>
                <div className="text-sm font-medium text-slate-700 mt-2">{item.name}</div>
                <div className="text-xs text-slate-400">{item.category}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700 leading-relaxed">
            <i className="fas fa-circle-info mr-1"></i>
            New submissions are typically reviewed within 1–2 business days before going live in the catalog.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProducts;
