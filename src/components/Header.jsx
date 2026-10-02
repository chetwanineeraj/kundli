import React, { useRef } from 'react';
import { Download, Upload, RotateCcw, Sparkles, Image as ImageIcon, FileCode } from 'lucide-react';
import { SAMPLE_CHARTS, THEME_PRESETS } from '../constants/presets';

export default function Header({
  onOpenBirthDetails,
  onLoadPresetChart,
  onApplyTheme,
  onExportJson,
  onImportJson,
  onExportPng,
  onExportSvg,
  onReset
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      e.target.value = '';
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/40 border border-amber-400/40">
            <span className="font-devanagari text-xl font-bold text-slate-950">ॐ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-cinzel tracking-wider text-amber-300">
                KUNDLI INTERACTIVE
              </h1>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                North Indian
              </span>
            </div>
            <p className="text-xs text-slate-400 font-devanagari">
              वैदिक जन्म कुण्डली चक्र • Scalable AstroChart Studio
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Birth Details Button */}
          <button
            onClick={onOpenBirthDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold transition shadow-md shadow-amber-950/30"
            title="Set chart using Date, Time, and Place of Birth"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Birth Details (Janma Kundli)</span>
          </button>

          {/* Preset Chart Dropdown */}
          <div className="relative">
            <select
              aria-label="Preset Chart"
              onChange={(e) => {
                if (e.target.value) {
                  onLoadPresetChart(e.target.value);
                  e.target.value = '';
                }
              }}
              className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer transition text-xs"
              defaultValue=""
            >
              <option value="" disabled>📋 Sample Charts...</option>
              {SAMPLE_CHARTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Preset Theme Dropdown */}
          <div className="relative">
            <select
              aria-label="Preset Theme"
              onChange={(e) => {
                if (e.target.value) {
                  onApplyTheme(e.target.value);
                  e.target.value = '';
                }
              }}
              className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer transition text-xs"
              defaultValue=""
            >
              <option value="" disabled>🎨 Color Themes...</option>
              {THEME_PRESETS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Export / Import Dropdowns */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={onExportPng}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition font-medium"
              title="Download High-Res PNG Chart Image"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>PNG</span>
            </button>
            <button
              onClick={onExportSvg}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Download Scalable SVG Chart"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>SVG</span>
            </button>
          </div>

          {/* JSON Save/Load */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={onExportJson}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Export Full Chart & Settings (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Import Chart & Settings (JSON)"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={onReset}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-700 transition"
              title="Reset Chart to Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
