import React from 'react';
import { THEME_PRESETS } from '../../constants/presets';
import { SIGNS } from '../../constants/astrologyData';
import { Palette, Download, FileCode, Image as ImageIcon, Sliders } from 'lucide-react';

export default function ThemesTab({
  houseSigns,
  onUpdateHouseSign,
  onApplyTheme,
  onExportPng,
  onExportSvg,
  onExportJson
}) {
  return (
    <div className="space-y-5">
      {/* 1-Click Color Themes */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          Aesthetic Color Themes
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {THEME_PRESETS.map((t) => (
            <button
              key={t.id}
              onClick={() => onApplyTheme(t.id)}
              className="p-3 rounded-xl border border-slate-800 hover:border-amber-500/50 bg-slate-900/80 hover:bg-slate-900 text-left transition group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                  {t.name}
                </span>
                <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: t.border }} />
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2">
                {t.description}
              </p>
              <div className="flex gap-1">
                {t.houseColors.slice(0, 6).map((c, i) => (
                  <span
                    key={i}
                    className="flex-1 h-2 rounded-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Sign Override per House */}
      <div className="space-y-2.5 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            House Sign Assignment (Manual Override)
          </label>
        </div>
        <p className="text-[11px] text-slate-400">
          Signs rotate automatically counter-clockwise from Lagna. You can also customize individual house signs here:
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <div key={h} className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 block">House {h}</span>
              <select
                value={houseSigns[h] || h}
                onChange={(e) => onUpdateHouseSign(h, Number(e.target.value))}
                className="w-full px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
              >
                {SIGNS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}. {s.en.slice(0, 3)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Download & Export Section */}
      <div className="space-y-2.5 pt-3 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5 text-amber-400" />
          Export Chart & Data
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onExportPng}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-200 transition gap-1.5"
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">PNG Image</span>
            <span className="text-[9px] text-slate-400">High-Res Print</span>
          </button>
          <button
            onClick={onExportSvg}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-200 transition gap-1.5"
          >
            <FileCode className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">Vector SVG</span>
            <span className="text-[9px] text-slate-400">Lossless Vector</span>
          </button>
          <button
            onClick={onExportJson}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-200 transition gap-1.5"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">JSON File</span>
            <span className="text-[9px] text-slate-400">Full Backup</span>
          </button>
        </div>
      </div>
    </div>
  );
}
