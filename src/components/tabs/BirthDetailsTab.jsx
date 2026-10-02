import React, { useState } from 'react';
import { POPULAR_CITIES } from '../../constants/cities';
import { calculateKundliFromBirthDetails } from '../../utils/vedicCalculator';
import { SIGNS, PLANETS } from '../../constants/astrologyData';
import { calculateNakshatra } from '../../utils/kundliCalculations';
import { Calendar, Clock, MapPin, Compass, Sparkles, CheckCircle2, ChevronDown, Globe } from 'lucide-react';

export default function BirthDetailsTab({
  onApplyCalculatedKundli
}) {
  const today = new Date().toISOString().slice(0, 10);

  const [name, setName] = useState('');
  const [date, setDate] = useState('2000-01-01');
  const [time, setTime] = useState('12:00:00');
  const [selectedCity, setSelectedCity] = useState(POPULAR_CITIES[0].name);
  const [lat, setLat] = useState(POPULAR_CITIES[0].lat);
  const [lng, setLng] = useState(POPULAR_CITIES[0].lng);
  const [tz, setTz] = useState(POPULAR_CITIES[0].tz);
  const [useCustomLocation, setUseCustomLocation] = useState(false);

  const [calculationResult, setCalculationResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // Handle city selection
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    const city = POPULAR_CITIES.find((c) => c.name === cityName);
    if (city) {
      setLat(city.lat);
      setLng(city.lng);
      setTz(city.tz);
    }
  };

  // Quick preset profiles
  const applyPresetProfile = (preset) => {
    setName(preset.name);
    setDate(preset.date);
    setTime(preset.time);
    handleCitySelect(preset.city);
    if (preset.useCustom) {
      setUseCustomLocation(true);
      setLat(preset.lat);
      setLng(preset.lng);
      setTz(preset.tz);
    }
  };

  const handleCalculate = (e) => {
    e?.preventDefault();
    try {
      const result = calculateKundliFromBirthDetails({
        date,
        time,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        tz
      });

      setCalculationResult(result);
      setIsCalculated(true);

      // Apply calculated Lagna and Planets to the Kundli Chart!
      onApplyCalculatedKundli(result.lagnaSign, result.planets, {
        personName: name,
        date,
        time,
        city: selectedCity,
        metadata: result.metadata
      });
    } catch (err) {
      console.error(err);
      alert('Error calculating Kundli: ' + err.message);
    }
  };

  // Calculate live preview stats if result exists
  const moonPlanet = calculationResult?.planets?.moon;
  const moonSign = moonPlanet ? SIGNS.find((s) => s.id === moonPlanet.sign) : null;
  const moonNakshatra = moonPlanet
    ? calculateNakshatra(moonPlanet.sign, moonPlanet.degree, moonPlanet.minute)
    : null;

  const sunPlanet = calculationResult?.planets?.sun;
  const sunSign = sunPlanet ? SIGNS.find((s) => s.id === sunPlanet.sign) : null;

  const ascSign = calculationResult?.lagnaSign
    ? SIGNS.find((s) => s.id === calculationResult.lagnaSign)
    : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Vedic Janma Kundli Calculator</span>
        </div>
        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
          Enter date, time, and location of birth. The astronomical engine uses <strong>Lahiri (Chitra Paksha) Ayanamsha</strong> to accurately calculate the Ascendant (Lagna), all 12 planetary longitudes, signs, houses, degrees, and retrograde states!
        </p>
      </div>

      {/* Quick Profile Samples */}
      <div className="space-y-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase">
          Quick Samples:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() =>
              applyPresetProfile({
                name: 'India Independence',
                date: '1947-08-15',
                time: '00:00:00',
                city: 'New Delhi, India'
              })
            }
            className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-amber-300 border border-slate-700 transition"
          >
            🇮🇳 India (15 Aug 1947)
          </button>
          <button
            type="button"
            onClick={() => {
              const now = new Date();
              const nowTime = now.toTimeString().slice(0, 8);
              applyPresetProfile({
                name: 'Current Moment',
                date: now.toISOString().slice(0, 10),
                time: nowTime,
                city: 'New Delhi, India'
              });
            }}
            className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-amber-300 border border-slate-700 transition"
          >
            ⏱️ Current Moment (Now)
          </button>
          <button
            type="button"
            onClick={() =>
              applyPresetProfile({
                name: 'Steve Jobs',
                date: '1955-02-24',
                time: '19:15:00',
                city: 'San Francisco, USA'
              })
            }
            className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-amber-300 border border-slate-700 transition"
          >
            🍎 Steve Jobs (1955)
          </button>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleCalculate} className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        {/* Full Name */}
        <div>
          <label className="text-[10px] font-semibold text-slate-300 block mb-1">
            Full Name (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Aryabhata, John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-semibold text-slate-300 flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Date of Birth
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-300 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Time of Birth
            </label>
            <input
              type="time"
              step="1"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Place of Birth */}
        <div className="space-y-2 pt-1 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-semibold text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Place of Birth
            </label>
            <button
              type="button"
              onClick={() => setUseCustomLocation(!useCustomLocation)}
              className="text-[10px] text-amber-400 hover:underline"
            >
              {useCustomLocation ? 'Select from City List' : 'Enter Custom Coordinates'}
            </button>
          </div>

          {!useCustomLocation ? (
            <select
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.tz})
                </option>
              ))}
            </select>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[9px] text-slate-400 block mb-0.5">Latitude (°N)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="28.6139"
                  className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-400 block mb-0.5">Longitude (°E)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="77.2090"
                  className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-400 block mb-0.5">Timezone (e.g. +05:30)</label>
                <input
                  type="text"
                  value={tz}
                  onChange={(e) => setTz(e.target.value)}
                  placeholder="+05:30"
                  className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition active:scale-[0.99] mt-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculate & Draw Janma Kundli</span>
        </button>
      </form>

      {/* Live Calculated Summary Card */}
      {isCalculated && calculationResult && (
        <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-amber-300">
                Kundli Calculated & Applied to Chart!
              </h4>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Ayanamsha: {calculationResult.metadata?.ayanamsha}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Lagna / Ascendant */}
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                Lagna (Ascendant)
              </span>
              <span className="text-xs font-bold text-amber-300 block mt-0.5">
                {ascSign?.en} ({ascSign?.hi})
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {calculationResult.metadata?.ascendantDeg}
              </span>
            </div>

            {/* Moon Sign (Rashi) */}
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                Moon Sign (Rashi)
              </span>
              <span className="text-xs font-bold text-cyan-300 block mt-0.5">
                {moonSign?.en} ({moonSign?.hi})
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {moonPlanet?.degree}° {moonPlanet?.minute}'
              </span>
            </div>

            {/* Sun Sign */}
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                Sun Sign (Surya)
              </span>
              <span className="text-xs font-bold text-orange-400 block mt-0.5">
                {sunSign?.en} ({sunSign?.hi})
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {sunPlanet?.degree}° {sunPlanet?.minute}'
              </span>
            </div>
          </div>

          {/* Nakshatra details */}
          {moonNakshatra && (
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Janma Nakshatra (Birth Star):</span>
                <span className="font-bold text-slate-200">
                  {moonNakshatra.name} (Pada {moonNakshatra.pada})
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Nakshatra Lord:</span>
                <span className="font-bold text-amber-400">{moonNakshatra.ruler}</span>
              </div>
            </div>
          )}

          <p className="text-[10px] text-emerald-400 text-center font-medium">
            ✓ All 13 planetary bodies, degrees, houses, and signs are now rendered on the Kundli canvas.
          </p>
        </div>
      )}
    </div>
  );
}
