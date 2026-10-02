import React, { useState } from 'react';
import ColorPicker from '../ui/ColorPicker';
import { BACKGROUND_PATTERNS } from '../../constants/presets';
import { Image as ImageIcon, Sparkles, Paintbrush, Layers, Info } from 'lucide-react';

export default function HousesTab({
  houses,
  houseDescriptions = {},
  onUpdateHouse,
  onUpdateHouseDescription,
  onResetHouseDescription,
  onApplyThemeToAllHouses
}) {
  const [selectedHouseId, setSelectedHouseId] = useState(1);

  const selectedHouse = houses.find((h) => h.id === selectedHouseId) || houses[0];

  return (
    <div className="space-y-4">
      {/* 12 House Selector Pills */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
          Select House to Customize (1–12)
        </label>
        <div className="grid grid-cols-6 gap-1.5">
          {houses.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHouseId(h.id)}
              className={`py-1.5 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedHouseId === h.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-950/30'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>H{h.id}</span>
              <span className="w-2.5 h-1 rounded-full mt-0.5" style={{ backgroundColor: h.color }} />
            </button>
          ))}
        </div>
      </div>

      {/* Active House Configuration Panel */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div>
            <h3 className="text-sm font-bold text-amber-300">
              {selectedHouse.name}
            </h3>
            <p className="text-[11px] font-devanagari text-slate-400">
              {selectedHouse.sanskrit} • {selectedHouse.category}
            </p>
          </div>
        </div>

        {/* Colors Section */}
        <div className="grid grid-cols-2 gap-3">
          <ColorPicker
            label="House Background Fill Color"
            value={selectedHouse.color}
            onChange={(val) => onUpdateHouse(selectedHouse.id, { color: val })}
          />
          <ColorPicker
            label="House Border Color"
            value={selectedHouse.borderColor}
            onChange={(val) => onUpdateHouse(selectedHouse.id, { borderColor: val })}
          />
        </div>

        {/* House Background Texture / Pattern */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Paintbrush className="w-3.5 h-3.5 text-amber-400" />
              House Background Theme Image:
            </label>
            {selectedHouse.bgImage && (
              <button
                onClick={() => onUpdateHouse(selectedHouse.id, { bgImage: '' })}
                className="text-[10px] text-red-400 hover:underline"
              >
                Clear Background
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Paste image URL (e.g. cosmic, marble, texture)..."
            value={selectedHouse.bgImage || ''}
            onChange={(e) => onUpdateHouse(selectedHouse.id, { bgImage: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
          />

          {/* Quick preset background textures */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400">Sample Textures:</span>
            <div className="flex flex-wrap gap-1.5">
              {BACKGROUND_PATTERNS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onUpdateHouse(selectedHouse.id, { bgImage: p.url })}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 border border-slate-700 transition"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Apply to all button */}
          {selectedHouse.bgImage && (
            <button
              onClick={() => onApplyThemeToAllHouses(selectedHouse.bgImage)}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium underline block pt-1"
            >
              Apply this background texture to all 12 houses →
            </button>
          )}
        </div>

        {/* House Tooltip Image */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            House Information Tooltip Image:
          </label>
          <input
            type="text"
            placeholder="Image URL shown in house info popup..."
            value={selectedHouse.image || ''}
            onChange={(e) => onUpdateHouse(selectedHouse.id, { image: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
          />
          {selectedHouse.image && (
            <div className="w-full h-24 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 mt-1">
              <img
                src={selectedHouse.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* House Custom Notes & Description */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              Custom Description & Meaning:
            </label>
            <button
              type="button"
              onClick={() => onResetHouseDescription?.(selectedHouse.id)}
              className="text-[10px] text-slate-400 hover:text-amber-400 transition"
            >
              Reset Default
            </button>
          </div>
          <textarea
            rows="3"
            value={houseDescriptions[selectedHouse.id] ?? selectedHouse.description ?? selectedHouse.notes ?? ''}
            onChange={(e) => onUpdateHouseDescription?.(selectedHouse.id, e.target.value)}
            placeholder="Write custom notes and description for this house..."
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
