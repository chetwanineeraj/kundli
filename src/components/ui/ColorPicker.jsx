import React from 'react';

const PRESET_COLORS = [
  '#0f172a', '#1e293b', '#334155', '#1e1b4b', '#311042',
  '#3b1812', '#451a03', '#14532d', '#064e3b', '#0c4a6e',
  '#d97706', '#f59e0b', '#ea580c', '#ef4444', '#ec4899',
  '#a855f7', '#6366f1', '#3b82f6', '#06b6d4', '#10b981'
];

export default function ColorPicker({ label, value, onChange, className = '' }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="text-xs font-medium text-slate-300 block">{label}</label>}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value || '#1e293b'}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded border border-slate-600 cursor-pointer bg-transparent p-0 overflow-hidden"
          />
        </div>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#1e293b"
          className="flex-1 px-2.5 py-1 text-xs bg-slate-900 border border-slate-700 rounded text-slate-200 font-mono focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-1 pt-1">
        {PRESET_COLORS.slice(0, 10).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className="w-4 h-4 rounded-full border border-slate-700 transition hover:scale-125"
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </div>
    </div>
  );
}
