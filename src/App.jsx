import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DisplayToolbar from './components/DisplayToolbar';
import KundliChart from './components/KundliChart';
import EditPanel from './components/EditPanel';
import InfoModal from './components/InfoModal';

import { DEFAULT_HOUSES } from './constants/houseSignifications';
import { DEFAULT_PLANET_ICONS, DEFAULT_SIGN_ICONS } from './constants/defaultIcons';
import { SAMPLE_CHARTS, THEME_PRESETS } from './constants/presets';
import { calculateHouseSigns } from './utils/kundliCalculations';
import {
  loadSavedState,
  saveStateToStorage,
  exportStateToJson,
  importStateFromJson
} from './utils/storage';
import { exportSvgToPng, exportSvgToFile } from './utils/svgExporter';
import { PLANETS, SIGNS } from './constants/astrologyData';

export default function App() {
  const chartSvgRef = useRef(null);

  // Initial State setup (check localStorage first)
  const savedState = loadSavedState();

  const [lagnaSign, setLagnaSign] = useState(savedState?.lagnaSign ?? 1);
  const [houseSigns, setHouseSigns] = useState(
    savedState?.houseSigns ?? calculateHouseSigns(savedState?.lagnaSign ?? 1)
  );

  const [planets, setPlanets] = useState(
    savedState?.planets ?? SAMPLE_CHARTS[0].planets
  );

  const [houses, setHouses] = useState(savedState?.houses ?? DEFAULT_HOUSES);

  const [planetIcons, setPlanetIcons] = useState(
    savedState?.planetIcons ?? DEFAULT_PLANET_ICONS
  );
  const [signIcons, setSignIcons] = useState(
    savedState?.signIcons ?? DEFAULT_SIGN_ICONS
  );

  // Display modes
  const [planetDisplayMode, setPlanetDisplayMode] = useState(
    savedState?.planetDisplayMode ?? 'both'
  );
  const [signDisplayMode, setSignDisplayMode] = useState(
    savedState?.signDisplayMode ?? 'number'
  );
  const [showDegrees, setShowDegrees] = useState(
    savedState?.showDegrees ?? true
  );

  // Active Control Tab & Info Modal
  const [activeTab, setActiveTab] = useState('planets');
  const [infoModalData, setInfoModalData] = useState(null);

  // Sync to LocalStorage on state changes
  useEffect(() => {
    saveStateToStorage({
      lagnaSign,
      houseSigns,
      planets,
      houses,
      planetIcons,
      signIcons,
      planetDisplayMode,
      signDisplayMode,
      showDegrees
    });
  }, [
    lagnaSign,
    houseSigns,
    planets,
    houses,
    planetIcons,
    signIcons,
    planetDisplayMode,
    signDisplayMode,
    showDegrees
  ]);

  // Handle Lagna sign change (recalculates counter-clockwise house signs)
  const handleLagnaChange = (newSign) => {
    setLagnaSign(newSign);
    const newSigns = calculateHouseSigns(newSign);
    setHouseSigns(newSigns);

    // Also update ascendant planet token sign & house
    setPlanets((prev) => ({
      ...prev,
      ascendant: {
        ...(prev.ascendant || { degree: 0, minute: 0, isRetrograde: false }),
        house: 1,
        sign: newSign
      }
    }));
  };

  // Update a single planet's attributes
  const handleUpdatePlanet = (planetId, updates) => {
    setPlanets((prev) => ({
      ...prev,
      [planetId]: {
        ...(prev[planetId] || { house: 1, sign: 1, degree: 0, minute: 0, isRetrograde: false }),
        ...updates
      }
    }));
  };

  // Update a house's attributes (color, borderColor, bgImage, image, notes)
  const handleUpdateHouse = (houseId, updates) => {
    setHouses((prev) =>
      prev.map((h) => (h.id === houseId ? { ...h, ...updates } : h))
    );
  };

  // Apply a background image/texture across all 12 houses
  const handleApplyThemeToAllHouses = (bgImage) => {
    setHouses((prev) => prev.map((h) => ({ ...h, bgImage })));
  };

  // Manual sign override for an individual house
  const handleUpdateHouseSign = (houseId, signId) => {
    setHouseSigns((prev) => ({
      ...prev,
      [houseId]: signId
    }));
  };

  // 1-Click Aesthetic Color Theme
  const handleApplyTheme = (themeId) => {
    const theme = THEME_PRESETS.find((t) => t.id === themeId);
    if (!theme) return;

    setHouses((prev) =>
      prev.map((h, idx) => ({
        ...h,
        color: theme.houseColors[idx] || h.color,
        borderColor: theme.borderColors[idx] || h.borderColor
      }))
    );
  };

  // Load a preset sample chart (Aries Kaal Purusha or Lord Rama)
  const handleLoadPresetChart = (chartId) => {
    const preset = SAMPLE_CHARTS.find((c) => c.id === chartId);
    if (!preset) return;

    handleLagnaChange(preset.lagnaSign);
    setPlanets(preset.planets);
  };

  // Apply calculated Kundli from Birth Details
  const handleApplyCalculatedKundli = (newLagnaSign, newPlanets) => {
    handleLagnaChange(newLagnaSign);
    setPlanets(newPlanets);
  };

  // Reset to default factory state
  const handleReset = () => {
    if (window.confirm('Reset the Kundli chart and all custom configurations to default?')) {
      const defaultLagna = 1;
      setLagnaSign(defaultLagna);
      setHouseSigns(calculateHouseSigns(defaultLagna));
      setPlanets(SAMPLE_CHARTS[0].planets);
      setHouses(DEFAULT_HOUSES);
      setPlanetIcons(DEFAULT_PLANET_ICONS);
      setSignIcons(DEFAULT_SIGN_ICONS);
      setPlanetDisplayMode('both');
      setSignDisplayMode('number');
      setShowDegrees(true);
      localStorage.removeItem('kundli_app_state_v1');
    }
  };

  // Export / Import
  const handleExportJson = () => {
    const fullState = {
      lagnaSign,
      houseSigns,
      planets,
      houses,
      planetIcons,
      signIcons,
      planetDisplayMode,
      signDisplayMode,
      showDegrees,
      exportTimestamp: new Date().toISOString()
    };
    exportStateToJson(fullState, `kundli-chart-${new Date().toISOString().slice(0, 10)}.json`);
  };

  const handleImportJson = async (file) => {
    try {
      const imported = await importStateFromJson(file);
      if (imported.lagnaSign) setLagnaSign(imported.lagnaSign);
      if (imported.houseSigns) setHouseSigns(imported.houseSigns);
      if (imported.planets) setPlanets(imported.planets);
      if (imported.houses) setHouses(imported.houses);
      if (imported.planetIcons) setPlanetIcons(imported.planetIcons);
      if (imported.signIcons) setSignIcons(imported.signIcons);
      if (imported.planetDisplayMode) setPlanetDisplayMode(imported.planetDisplayMode);
      if (imported.signDisplayMode) setSignDisplayMode(imported.signDisplayMode);
      if (imported.showDegrees !== undefined) setShowDegrees(imported.showDegrees);
      alert('Chart and custom settings successfully imported!');
    } catch (err) {
      alert('Failed to import file: ' + err.message);
    }
  };

  const handleExportPng = () => {
    if (chartSvgRef.current) {
      exportSvgToPng(chartSvgRef.current, 'kundli-chart.png', 2);
    }
  };

  const handleExportSvg = () => {
    if (chartSvgRef.current) {
      exportSvgToFile(chartSvgRef.current, 'kundli-chart.svg');
    }
  };

  // On-Chart Click Interactions
  const handleHouseClick = (houseId) => {
    const house = houses.find((h) => h.id === houseId);
    if (house) {
      setInfoModalData({
        type: 'house',
        id: houseId,
        data: house,
        houseSigns,
        planets
      });
    }
  };

  const handlePlanetClick = (planetId) => {
    const planetDef = PLANETS.find((p) => p.id === planetId);
    const pData = planets[planetId] || { house: 1, sign: 1, degree: 0, minute: 0 };
    if (planetDef) {
      setInfoModalData({
        type: 'planet',
        id: planetId,
        data: { ...planetDef, ...pData },
        houseSigns,
        planets
      });
    }
  };

  const handleSignClick = (signId) => {
    const signDef = SIGNS.find((s) => s.id === signId);
    if (signDef) {
      setInfoModalData({
        type: 'sign',
        id: signId,
        data: signDef,
        houseSigns,
        planets
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        onOpenBirthDetails={() => setActiveTab('birth')}
        onLoadPresetChart={handleLoadPresetChart}
        onApplyTheme={handleApplyTheme}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onExportPng={handleExportPng}
        onExportSvg={handleExportSvg}
        onReset={handleReset}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Display Toolbar & Scalable SVG Kundli Chart */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <DisplayToolbar
            planetDisplayMode={planetDisplayMode}
            setPlanetDisplayMode={setPlanetDisplayMode}
            signDisplayMode={signDisplayMode}
            setSignDisplayMode={setSignDisplayMode}
            showDegrees={showDegrees}
            setShowDegrees={setShowDegrees}
            lagnaSign={lagnaSign}
            onLagnaChange={handleLagnaChange}
          />

          <KundliChart
            ref={chartSvgRef}
            houses={houses}
            houseSigns={houseSigns}
            planets={planets}
            planetDisplayMode={planetDisplayMode}
            signDisplayMode={signDisplayMode}
            showDegrees={showDegrees}
            planetIcons={planetIcons}
            signIcons={signIcons}
            onHouseClick={handleHouseClick}
            onPlanetClick={handlePlanetClick}
            onSignClick={handleSignClick}
          />

          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>💡 Click empty space in any house to view house significations & images.</span>
            <span>Click planets or signs for details.</span>
          </div>
        </section>

        {/* Right Column: Interactive Edit & Inspector Panel */}
        <section className="lg:col-span-5 h-[calc(100vh-140px)] sticky top-20">
          <EditPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            planets={planets}
            houses={houses}
            houseSigns={houseSigns}
            planetIcons={planetIcons}
            signIcons={signIcons}
            onApplyCalculatedKundli={handleApplyCalculatedKundli}
            onUpdatePlanet={handleUpdatePlanet}
            onUpdateHouse={handleUpdateHouse}
            onApplyThemeToAllHouses={handleApplyThemeToAllHouses}
            onUpdateHouseSign={handleUpdateHouseSign}
            onApplyTheme={handleApplyTheme}
            onUpdatePlanetIcon={(id, val) =>
              setPlanetIcons((prev) => ({ ...prev, [id]: val }))
            }
            onUpdateSignIcon={(id, val) =>
              setSignIcons((prev) => ({ ...prev, [id]: val }))
            }
            onResetPlanetIcon={(id) =>
              setPlanetIcons((prev) => ({ ...prev, [id]: DEFAULT_PLANET_ICONS[id] }))
            }
            onResetSignIcon={(id) =>
              setSignIcons((prev) => ({ ...prev, [id]: DEFAULT_SIGN_ICONS[id] }))
            }
            onExportPng={handleExportPng}
            onExportSvg={handleExportSvg}
            onExportJson={handleExportJson}
          />
        </section>
      </main>

      {/* Rich Tooltip / Contextual Modal */}
      <InfoModal
        infoData={infoModalData}
        onClose={() => setInfoModalData(null)}
        onUpdateHouseNotes={(houseId, notes) => handleUpdateHouse(houseId, { notes })}
        onUpdateHouseImage={(houseId, image) => handleUpdateHouse(houseId, { image })}
        planetIcons={planetIcons}
        signIcons={signIcons}
        onQuickEdit={(tab) => {
          setActiveTab(tab);
          setInfoModalData(null);
        }}
      />
    </div>
  );
}
