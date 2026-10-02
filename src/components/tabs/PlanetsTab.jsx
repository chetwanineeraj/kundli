import React, { useState } from 'react';
import { PLANETS, SIGNS } from '../../constants/astrologyData';
import { calculateNakshatra, getPlanetDignity } from '../../utils/kundliCalculations';
import SvgIcon from '../ui/SvgIcon';
import { Search, Sparkles } from 'lucide-react';

export default function PlanetsTab({
  planets,
  houseSigns,
  planetIcons,
  onUpdatePlanet
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlanets = PLANETS.filter(
    (p) =>
      p.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hi.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      {/* Search & Overview Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search planets (e.g. Jupiter, Mars)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
          />
        </div>
        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
          {PLANETS.length} Bodies
        </span>
      </div>

      {/* Planets List */}
      <div className="space-y-2.5 max-h-[calc(100vh-270px)] overflow-y-auto pr-1">
        {filteredPlanets.map((planetDef) => {
          const pData = planets[planetDef.id] || {
            house: 1,
            sign: houseSigns[1] || 1,
            degree: 0,
            minute: 0,
            isRetrograde: false
          };

          const dignity = getPlanetDignity(planetDef.id, pData.sign);
          const nakshatra = calculateNakshatra(pData.sign, pData.degree || 0, pData.minute || 0);

          return (
            <div
              key={planetDef.id}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
            >
              {/* Top Row: Icon, Name, Hindi, Dignity Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                    <SvgIcon svgString={planetIcons[planetDef.id]} className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200">
                      {planetDef.en}
                    </span>
                    <span className="text-xs font-devanagari text-slate-400 ml-1.5">
                      {planetDef.hi}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {dignity && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-current opacity-90"
                      style={{ color: dignity.color }}
                    >
                      {dignity.status.split(' ')[0]}
                    </span>
                  )}

                  {/* Retrograde toggle (not applicable to Sun/Moon) */}
                  {planetDef.id !== 'sun' && planetDef.id !== 'moon' && planetDef.id !== 'ascendant' && (
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pData.isRetrograde || false}
                        onChange={(e) =>
                          onUpdatePlanet(planetDef.id, { isRetrograde: e.target.checked })
                        }
                        className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-800 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-slate-400">Vakri [R]</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Input Grid: House, Sign, Degree, Minute */}
              <div className="grid grid-cols-4 gap-2 text-xs">
                {/* House Selector */}
                <div>
                  <label className="text-[10px] text-slate-400 font-medium block mb-1">
                    House (1-12)
                  </label>
                  <select
                    value={pData.house}
                    onChange={(e) => {
                      const h = Number(e.target.value);
                      // Auto-update sign based on house resident sign unless overridden
                      const suggestedSign = houseSigns[h] || h;
                      onUpdatePlanet(planetDef.id, { house: h, sign: suggestedSign });
                    }}
                    className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300 font-semibold text-xs focus:border-amber-500 focus:outline-none"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                      <option key={h} value={h}>
                        House {h}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sign Selector */}
                <div>
                  <label className="text-[10px] text-slate-400 font-medium block mb-1">
                    Sign (1-12)
                  </label>
                  <select
                    value={pData.sign}
                    onChange={(e) =>
                      onUpdatePlanet(planetDef.id, { sign: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                  >
                    {SIGNS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.id}. {s.en.slice(0, 4)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Degree Input */}
                <div>
                  <label className="text-[10px] text-slate-400 font-medium block mb-1">
                    Degree (0-29°)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="29"
                    value={pData.degree ?? 0}
                    onChange={(e) => {
                      let val = parseInt(e.target.value, 10);
                      if (isNaN(val)) val = 0;
                      val = Math.max(0, Math.min(29, val));
                      onUpdatePlanet(planetDef.id, { degree: val });
                    }}
                    className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Minute Input */}
                <div>
                  <label className="text-[10px] text-slate-400 font-medium block mb-1">
                    Minute (0-59')
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={pData.minute ?? 0}
                    onChange={(e) => {
                      let val = parseInt(e.target.value, 10);
                      if (isNaN(val)) val = 0;
                      val = Math.max(0, Math.min(59, val));
                      onUpdatePlanet(planetDef.id, { minute: val });
                    }}
                    className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Nakshatra & Pada Footer */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>
                  Nakshatra: <strong className="text-slate-300">{nakshatra.name}</strong> (Pada {nakshatra.pada})
                </span>
                <span>
                  Lord: <strong className="text-slate-300">{nakshatra.ruler}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
