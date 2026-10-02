import React from 'react';
import { Eye, Languages, Compass, Hash } from 'lucide-react';
import { SIGNS } from '../constants/astrologyData';

export default function DisplayToolbar({
  planetDisplayMode,
  setPlanetDisplayMode,
  signDisplayMode,
  setSignDisplayMode,
  showDegrees,
  setShowDegrees,
  lagnaSign,
  onLagnaChange
}) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
      {/* Lagna (Ascendant) Sign Fast Selector */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-amber-400 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-amber-500" />
          Lagna (House 1):
        </span>
        <select
          value={lagnaSign}
          onChange={(e) => onLagnaChange(Number(e.target.value))}
          className="bg-slate-800 text-amber-300 font-medium border border-amber-500/40 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none cursor-pointer"
        >
          {SIGNS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id}. {s.en} ({s.hi})
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        {/* Planet Display Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg p-1">
          <span className="text-[11px] font-medium text-slate-400 px-1.5">Planets:</span>
          <button
            onClick={() => setPlanetDisplayMode('icon')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${
              planetDisplayMode === 'icon'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display Planet SVG Icons"
          >
            Icon
          </button>
          <button
            onClick={() => setPlanetDisplayMode('english')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${
              planetDisplayMode === 'english'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display English Planet Names (e.g. Su, Mo, Ma)"
          >
            English
          </button>
          <button
            onClick={() => setPlanetDisplayMode('hindi')}
            className={`px-2 py-0.5 rounded text-xs font-medium font-devanagari transition ${
              planetDisplayMode === 'hindi'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display Hindi Planet Names (e.g. सू, चं, मं)"
          >
            हिंदी
          </button>
          <button
            onClick={() => setPlanetDisplayMode('both')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${
              planetDisplayMode === 'both'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display Icon + Name"
          >
            Icon+Name
          </button>
        </div>

        {/* Sign Display Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg p-1">
          <span className="text-[11px] font-medium text-slate-400 px-1.5">Signs:</span>
          <button
            onClick={() => setSignDisplayMode('number')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${
              signDisplayMode === 'number'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display Traditional Sign Number (1-12)"
          >
            1–12
          </button>
          <button
            onClick={() => setSignDisplayMode('icon')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${
              signDisplayMode === 'icon'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display Zodiac SVG Glyph"
          >
            Icon
          </button>
          <button
            onClick={() => setSignDisplayMode('english')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition ${
              signDisplayMode === 'english'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display English Zodiac Name"
          >
            English
          </button>
          <button
            onClick={() => setSignDisplayMode('hindi')}
            className={`px-2 py-0.5 rounded text-xs font-medium font-devanagari transition ${
              signDisplayMode === 'hindi'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Display Hindi Zodiac Name"
          >
            हिंदी
          </button>
        </div>

        {/* Degrees Toggle */}
        <button
          onClick={() => setShowDegrees(!showDegrees)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition ${
            showDegrees
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
          title="Toggle visibility of planet degrees (°)"
        >
          <Hash className="w-3.5 h-3.5" />
          <span>Degrees ({showDegrees ? 'ON' : 'OFF'})</span>
        </button>
      </div>
    </div>
  );
}
