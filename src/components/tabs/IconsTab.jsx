import React, { useState } from 'react';
import { PLANETS, SIGNS } from '../../constants/astrologyData';
import { DEFAULT_PLANET_ICONS, DEFAULT_SIGN_ICONS } from '../../constants/defaultIcons';
import SvgIcon from '../ui/SvgIcon';
import { RotateCcw, Check, Code, Image as ImageIcon } from 'lucide-react';

export default function IconsTab({
  planetIcons,
  signIcons,
  onUpdatePlanetIcon,
  onUpdateSignIcon,
  onResetPlanetIcon,
  onResetSignIcon
}) {
  const [activeType, setActiveType] = useState('planets'); // 'planets' | 'signs'
  const [selectedId, setSelectedId] = useState('sun');
  const [customSvgInput, setCustomSvgInput] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const isPlanet = activeType === 'planets';
  const currentIcon = isPlanet ? planetIcons[selectedId] : signIcons[selectedId];

  const handleSelect = (id) => {
    setSelectedId(id);
    setCustomSvgInput(isPlanet ? planetIcons[id] || '' : signIcons[id] || '');
  };

  const handleApply = () => {
    if (isPlanet) {
      onUpdatePlanetIcon(selectedId, customSvgInput);
    } else {
      onUpdateSignIcon(selectedId, customSvgInput);
    }
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleReset = () => {
    if (isPlanet) {
      onResetPlanetIcon(selectedId);
      setCustomSvgInput(DEFAULT_PLANET_ICONS[selectedId] || '');
    } else {
      onResetSignIcon(selectedId);
      setCustomSvgInput(DEFAULT_SIGN_ICONS[selectedId] || '');
    }
  };

  return (
    <div className="space-y-4">
      {/* Type Switcher: Planets vs Signs */}
      <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
        <button
          onClick={() => {
            setActiveType('planets');
            setSelectedId('sun');
            setCustomSvgInput(planetIcons['sun'] || '');
          }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeType === 'planets'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Planet Icons (13)
        </button>
        <button
          onClick={() => {
            setActiveType('signs');
            setSelectedId(1);
            setCustomSvgInput(signIcons[1] || '');
          }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeType === 'signs'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Zodiac Sign Icons (12)
        </button>
      </div>

      {/* Grid of entities to pick from */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {isPlanet
          ? PLANETS.map((p) => {
              const isSelected = selectedId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <SvgIcon svgString={planetIcons[p.id]} className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] font-semibold">{p.enAbbr}</span>
                </button>
              );
            })
          : SIGNS.map((s) => {
              const isSelected = Number(selectedId) === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s.id)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <SvgIcon svgString={signIcons[s.id]} className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] font-semibold">{s.id}. {s.en.slice(0, 3)}</span>
                </button>
              );
            })}
      </div>

      {/* Active Icon Editor */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <SvgIcon svgString={customSvgInput || currentIcon} className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">
                {isPlanet
                  ? PLANETS.find((p) => p.id === selectedId)?.en
                  : `${selectedId}. ${SIGNS.find((s) => s.id === Number(selectedId))?.en}`}
              </h4>
              <p className="text-[10px] text-slate-400">
                Edit SVG code or provide image URL below
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700 transition"
            title="Reset to default icon"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Code / URL Editor */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-amber-400" />
              SVG Markup or Image URL:
            </span>
          </label>
          <textarea
            rows="5"
            value={customSvgInput || currentIcon || ''}
            onChange={(e) => setCustomSvgInput(e.target.value)}
            placeholder="<svg viewBox='0 0 24 24'>...</svg> or https://..."
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 font-mono text-[11px] focus:border-amber-500 focus:outline-none resize-none"
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-500">
            Accepts raw &lt;svg&gt; tags, data URLs, or HTTP image links.
          </span>
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{copiedNotification ? 'Saved!' : 'Save Icon'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
