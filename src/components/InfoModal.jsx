import React from 'react';
import { X, Sparkles, Compass, BookOpen, Layers, Edit3, Image as ImageIcon } from 'lucide-react';
import { SIGNS, PLANETS } from '../constants/astrologyData';
import { calculateNakshatra, getPlanetDignity } from '../utils/kundliCalculations';
import SvgIcon from './ui/SvgIcon';

export default function InfoModal({
  infoData,
  onClose,
  houses = [],
  houseDescriptions = {},
  onUpdateHouseDescription,
  onResetHouseDescription,
  onUpdateHouseNotes,
  onResetHouseNotes,
  onUpdateHouseImage,
  planetDescriptions = {},
  signDescriptions = {},
  onUpdatePlanetDescription,
  onResetPlanetDescription,
  onUpdateSignDescription,
  onResetSignDescription,
  planetIcons,
  signIcons,
  onQuickEdit
}) {
  if (!infoData) return null;

  const { type, id, data, houseSigns, planets } = infoData;
  const currentHouse = (houses && houses.find((h) => h.id === id)) || data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-950/40 overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              {type === 'house' && <Compass className="w-5 h-5" />}
              {type === 'planet' && <Sparkles className="w-5 h-5" />}
              {type === 'sign' && <Layers className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400">
                {type.toUpperCase()} DETAILS
              </span>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                {type === 'house' && data.name}
                {type === 'planet' && `${data.en} (${data.hi})`}
                {type === 'sign' && `${data.id}. ${data.en} (${data.hi})`}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* HOUSE VIEW */}
          {type === 'house' && (
            <>
              {/* House Configured Image */}
              {data.image && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-amber-200">
                    <span className="font-devanagari font-bold">{data.sanskrit}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur text-[10px] border border-amber-500/20">
                      {data.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Resident Sign & Occupants */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Resident Sign
                  </span>
                  <p className="text-sm font-bold text-amber-300 mt-0.5">
                    {houseSigns[data.id]} - {SIGNS.find((s) => s.id === houseSigns[data.id])?.en} (
                    {SIGNS.find((s) => s.id === houseSigns[data.id])?.hi})
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    House Karakas
                  </span>
                  <p className="text-sm font-bold text-slate-200 mt-0.5">
                    {data.karakas?.join(', ') || 'None'}
                  </p>
                </div>
              </div>

              {/* Occupant Planets in this house */}
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-1">
                  Planets in this House
                </span>
                {Object.entries(planets).filter(([_, p]) => p.house === data.id).length === 0 ? (
                  <p className="text-slate-400 italic">No planets currently placed here.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(planets)
                      .filter(([_, p]) => p.house === data.id)
                      .map(([pId, pData]) => {
                        const pDef = PLANETS.find((p) => p.id === pId);
                        const dignity = getPlanetDignity(pId, pData.sign);
                        return (
                          <div
                            key={pId}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 flex items-center gap-1.5"
                          >
                            <SvgIcon svgString={planetIcons[pId]} className="w-3.5 h-3.5 text-amber-400" />
                            <span className="font-semibold text-slate-200">{pDef?.en}</span>
                            <span className="text-slate-400 text-[10px] font-mono">
                              {pData.degree}°
                            </span>
                            {dignity && (
                              <span
                                className="text-[9px] px-1 rounded font-medium"
                                style={{ color: dignity.color }}
                              >
                                {dignity.status.split(' ')[0]}
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Significations & Domains */}
              <div className="space-y-1.5">
                <h4 className="font-semibold text-slate-300 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Key Significations (Karakatvas):
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1 leading-relaxed">
                  {data.significations?.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Anatomy / Body Parts */}
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Body Parts:</span>
                <p className="text-slate-300">{data.bodyParts}</p>
              </div>

              {/* Configurable House Image URL */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <label className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  Configured House Image URL:
                </label>
                <input
                  type="text"
                  value={currentHouse.image || ''}
                  onChange={(e) => onUpdateHouseImage(data.id, e.target.value)}
                  placeholder="https://example.com/house-image.jpg"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Configurable Notes & Description */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    Configurable Notes & Description:
                  </label>
                  <button
                    type="button"
                    onClick={() => onResetHouseDescription?.(data.id)}
                    className="text-[10px] text-slate-400 hover:text-amber-400 transition"
                  >
                    Reset Default
                  </button>
                </div>
                <textarea
                  rows="3"
                  value={houseDescriptions[data.id] ?? currentHouse.description ?? currentHouse.notes ?? ''}
                  onChange={(e) => onUpdateHouseDescription?.(data.id, e.target.value)}
                  placeholder="Add custom notes, interpretations, or reminders for this house..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </>
          )}

          {/* PLANET VIEW */}
          {type === 'planet' && (
            <>
              {/* Planet Quick Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400">
                    <SvgIcon svgString={planetIcons[id]} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Placement
                    </span>
                    <span className="font-bold text-amber-300">
                      House {data.house} • {SIGNS.find((s) => s.id === data.sign)?.en} ({data.sign})
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Degree & State
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-base font-bold text-slate-200">
                      {data.degree || 0}°{data.minute ? `${data.minute}'` : ''}
                    </span>
                    {data.isRetrograde && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold">
                        VAKRI [R]
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dignity and Nakshatra */}
              {(() => {
                const dignity = getPlanetDignity(id, data.sign);
                const nakshatra = calculateNakshatra(data.sign, data.degree || 0, data.minute || 0);

                return (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                        Planetary Dignity
                      </span>
                      <p
                        className="font-bold text-sm mt-0.5"
                        style={{ color: dignity?.color || '#94a3b8' }}
                      >
                        {dignity?.status || 'Neutral'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                        Nakshatra & Pada
                      </span>
                      <p className="font-bold text-sm text-slate-200 mt-0.5">
                        {nakshatra.name} (Pada {nakshatra.pada})
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Lord: {nakshatra.ruler} • Deity: {nakshatra.deity}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Configurable Planet Description & Karakatva */}
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    Configurable Description & Significations:
                  </span>
                  <button
                    type="button"
                    onClick={() => onResetPlanetDescription?.(id)}
                    className="text-[10px] text-slate-400 hover:text-amber-400 transition"
                  >
                    Reset Default
                  </button>
                </div>
                <textarea
                  rows="3"
                  value={planetDescriptions[id] ?? PLANETS.find((p) => p.id === id)?.karaka ?? ''}
                  onChange={(e) => onUpdatePlanetDescription?.(id, e.target.value)}
                  placeholder="Enter custom description or astrological significations for this planet..."
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onQuickEdit('planets');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition"
                >
                  Edit in Planet Panel →
                </button>
              </div>
            </>
          )}

          {/* SIGN VIEW */}
          {type === 'sign' && (
            <>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <SvgIcon svgString={signIcons[data.id]} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-300">
                    {data.id}. {data.en} ({data.hi})
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Sanskrit: <span className="font-devanagari font-semibold">{data.sanskrit}</span> • Symbol: {data.symbol}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 block uppercase">Lord (Ruler)</span>
                  <span className="font-bold text-slate-200">{data.lord}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 block uppercase">Element</span>
                  <span className="font-bold text-slate-200">{data.element}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 block uppercase">Modality</span>
                  <span className="font-bold text-slate-200">{data.modality.split(' ')[0]}</span>
                </div>
              </div>

              {/* Configurable Sign Description & Characteristics */}
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    Configurable Description & Characteristics:
                  </span>
                  <button
                    type="button"
                    onClick={() => onResetSignDescription?.(data.id)}
                    className="text-[10px] text-slate-400 hover:text-amber-400 transition"
                  >
                    Reset Default
                  </button>
                </div>
                <textarea
                  rows="3"
                  value={signDescriptions[data.id] ?? data.description ?? ''}
                  onChange={(e) => onUpdateSignDescription?.(data.id, e.target.value)}
                  placeholder="Enter custom characteristics or description for this sign..."
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
