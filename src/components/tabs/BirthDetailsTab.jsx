import React, { useState } from 'react';
import { POPULAR_CITIES } from '../../constants/cities';
import { calculateKundliFromBirthDetails } from '../../utils/vedicCalculator';
import { SIGNS, PLANETS } from '../../constants/astrologyData';
import { calculateNakshatra } from '../../utils/kundliCalculations';
import {
  Calendar,
  Clock,
  MapPin,
  Compass,
  Sparkles,
  CheckCircle2,
  Bookmark,
  BookmarkPlus,
  Trash2,
  FolderOpen,
  User,
  Search,
  RotateCcw,
  Check
} from 'lucide-react';

export default function BirthDetailsTab({
  onApplyCalculatedKundli,
  savedProfiles = [],
  onSaveProfile,
  onDeleteProfile
}) {
  const [activeProfileId, setActiveProfileId] = useState(null);
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
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [profileSearch, setProfileSearch] = useState('');

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

  // Run Vedic Calculation and apply to chart
  const executeCalculation = (calcData) => {
    try {
      const result = calculateKundliFromBirthDetails({
        date: calcData.date,
        time: calcData.time,
        lat: parseFloat(calcData.lat),
        lng: parseFloat(calcData.lng),
        tz: calcData.tz
      });

      setCalculationResult(result);
      setIsCalculated(true);

      // Apply calculated Lagna and Planets to the Kundli Chart!
      onApplyCalculatedKundli(result.lagnaSign, result.planets, {
        personName: calcData.name,
        date: calcData.date,
        time: calcData.time,
        city: calcData.city || (calcData.useCustomLocation ? 'Custom Coordinates' : selectedCity),
        metadata: result.metadata
      });

      return result;
    } catch (err) {
      console.error(err);
      alert('Error calculating Kundli: ' + err.message);
      return null;
    }
  };

  const handleCalculate = (e) => {
    e?.preventDefault();
    executeCalculation({
      name,
      date,
      time,
      lat,
      lng,
      tz,
      city: selectedCity,
      useCustomLocation
    });
  };

  // Load a saved profile into the form & immediately recalculate and draw
  const handleLoadProfile = (profile) => {
    setActiveProfileId(profile.id);
    setName(profile.name || '');
    setDate(profile.date);
    setTime(profile.time);
    if (profile.useCustomLocation) {
      setUseCustomLocation(true);
      setLat(profile.lat);
      setLng(profile.lng);
      setTz(profile.tz);
    } else {
      setUseCustomLocation(false);
      handleCitySelect(profile.city || POPULAR_CITIES[0].name);
    }

    // Automatically calculate & draw
    executeCalculation(profile);

    setFeedbackMsg(`Loaded & applied "${profile.name}"!`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // Save current details as a profile
  const handleSaveCurrent = (saveAsNew = false) => {
    const profileName = name.trim() || `Profile (${date})`;
    const idToUse = saveAsNew || !activeProfileId ? `profile-${Date.now()}` : activeProfileId;

    const profileData = {
      id: idToUse,
      name: profileName,
      date,
      time,
      city: useCustomLocation ? 'Custom' : selectedCity,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      tz,
      useCustomLocation
    };

    onSaveProfile?.(profileData);
    setActiveProfileId(profileData.id);
    setFeedbackMsg(`Saved "${profileName}" to profiles!`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // Reset form to start a new profile
  const handleResetForm = () => {
    setActiveProfileId(null);
    setName('');
    const now = new Date();
    setDate(now.toISOString().slice(0, 10));
    setTime(now.toTimeString().slice(0, 8));
    handleCitySelect(POPULAR_CITIES[0].name);
    setUseCustomLocation(false);
    setCalculationResult(null);
    setIsCalculated(false);
    setFeedbackMsg('Form reset for new profile.');
    setTimeout(() => setFeedbackMsg(''), 2500);
  };

  // Filtered saved profiles
  const filteredProfiles = savedProfiles.filter((p) => {
    if (!profileSearch.trim()) return true;
    const q = profileSearch.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.date && p.date.includes(q)) ||
      (p.city && p.city.toLowerCase().includes(q))
    );
  });

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
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Vedic Janma Kundli & Profiles</span>
        </div>
        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
          Enter birth details to compute the authentic Vedic horoscope via <strong>Lahiri (Chitra Paksha) Ayanamsha</strong>, or save and reload custom birth profiles anytime.
        </p>
      </div>

      {/* Temporary Feedback Notification */}
      {feedbackMsg && (
        <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Saved Profiles Section */}
      <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
              Saved Profiles
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
              {savedProfiles.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition"
            title="Clear form to enter a new profile"
          >
            <RotateCcw className="w-3 h-3" />
            <span>New Profile</span>
          </button>
        </div>

        {/* Search filter if more than 3 profiles */}
        {savedProfiles.length > 3 && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" />
            <input
              type="text"
              placeholder="Search saved profiles..."
              value={profileSearch}
              onChange={(e) => setProfileSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}

        {/* Profiles List */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {filteredProfiles.length === 0 ? (
            <div className="text-center py-4 text-slate-500 text-xs">
              No matching profiles found.
            </div>
          ) : (
            filteredProfiles.map((p) => {
              const isActive = activeProfileId === p.id;
              return (
                <div
                  key={p.id}
                  className={`p-2.5 rounded-lg border transition flex items-center justify-between gap-2 ${
                    isActive
                      ? 'bg-amber-500/10 border-amber-500/60 shadow-sm'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-100 truncate block">
                        {p.name}
                      </span>
                      {isActive && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[9px] font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-amber-400" />
                        {p.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-amber-400" />
                        {p.time}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-amber-400" />
                        {p.city || `${p.lat}°N, ${p.lng}°E`} ({p.tz})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleLoadProfile(p)}
                      className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow transition active:scale-95"
                      title="Load details and calculate chart"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Load & Draw</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete saved profile "${p.name}"?`)) {
                          onDeleteProfile?.(p.id);
                          if (activeProfileId === p.id) {
                            setActiveProfileId(null);
                          }
                        }
                      }}
                      className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                      title="Delete Profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleCalculate} className="space-y-3.5 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{activeProfileId ? 'Edit Profile Details' : 'Enter Birth Details'}</span>
          </span>
          {activeProfileId && (
            <span className="text-[10px] text-amber-300 font-mono">
              Profile ID: {activeProfileId.slice(0, 16)}...
            </span>
          )}
        </div>

        {/* Full Name / Profile Label */}
        <div>
          <label className="text-[10px] font-semibold text-slate-300 block mb-1">
            Profile / Person Name
          </label>
          <input
            type="text"
            placeholder="e.g. My Horoscope, Mahatma Gandhi"
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

        {/* Buttons Row */}
        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition active:scale-[0.99]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calculate & Draw Janma Kundli</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSaveCurrent(false)}
              className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeProfileId ? 'Update Saved Profile' : 'Save Current Profile'}</span>
            </button>

            {activeProfileId && (
              <button
                type="button"
                onClick={() => handleSaveCurrent(true)}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
                title="Save as a new separate profile"
              >
                <BookmarkPlus className="w-3.5 h-3.5 text-slate-400" />
                <span>Save as New</span>
              </button>
            )}
          </div>
        </div>
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
