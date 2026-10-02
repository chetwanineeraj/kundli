import React, { useState } from 'react';
import BirthDetailsTab from './tabs/BirthDetailsTab';
import PlanetsTab from './tabs/PlanetsTab';
import HousesTab from './tabs/HousesTab';
import IconsTab from './tabs/IconsTab';
import ThemesTab from './tabs/ThemesTab';
import { Calendar, Sparkles, Home, Palette, Settings } from 'lucide-react';

export default function EditPanel({
  activeTab = 'birth',
  setActiveTab,
  planets,
  houses,
  houseSigns,
  planetIcons,
  signIcons,
  planetDescriptions = {},
  signDescriptions = {},
  houseDescriptions = {},
  onApplyCalculatedKundli,
  onUpdatePlanet,
  onUpdatePlanetDescription,
  onResetPlanetDescription,
  onUpdateHouse,
  onUpdateHouseDescription,
  onResetHouseDescription,
  onResetHouseNotes,
  onApplyThemeToAllHouses,
  onUpdateHouseSign,
  onUpdateSignDescription,
  onResetSignDescription,
  onApplyTheme,
  onUpdatePlanetIcon,
  onUpdateSignIcon,
  onResetPlanetIcon,
  onResetSignIcon,
  onExportPng,
  onExportSvg,
  onExportJson
}) {
  const tabs = [
    { id: 'birth', label: 'Birth Details', icon: Calendar },
    { id: 'planets', label: 'Planets', icon: Sparkles },
    { id: 'houses', label: 'Houses', icon: Home },
    { id: 'icons', label: 'Icons', icon: Settings },
    { id: 'themes', label: 'Themes', icon: Palette }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800/80 mb-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'birth' && (
          <BirthDetailsTab
            onApplyCalculatedKundli={onApplyCalculatedKundli}
          />
        )}

        {activeTab === 'planets' && (
          <PlanetsTab
            planets={planets}
            houseSigns={houseSigns}
            planetIcons={planetIcons}
            planetDescriptions={planetDescriptions}
            onUpdatePlanet={onUpdatePlanet}
            onUpdatePlanetDescription={onUpdatePlanetDescription}
            onResetPlanetDescription={onResetPlanetDescription}
          />
        )}

        {activeTab === 'houses' && (
          <HousesTab
            houses={houses}
            houseDescriptions={houseDescriptions}
            onUpdateHouse={onUpdateHouse}
            onUpdateHouseDescription={onUpdateHouseDescription}
            onResetHouseDescription={onResetHouseDescription}
            onApplyThemeToAllHouses={onApplyThemeToAllHouses}
          />
        )}

        {activeTab === 'icons' && (
          <IconsTab
            planetIcons={planetIcons}
            signIcons={signIcons}
            onUpdatePlanetIcon={onUpdatePlanetIcon}
            onUpdateSignIcon={onUpdateSignIcon}
            onResetPlanetIcon={onResetPlanetIcon}
            onResetSignIcon={onResetSignIcon}
          />
        )}

        {activeTab === 'themes' && (
          <ThemesTab
            houseSigns={houseSigns}
            signDescriptions={signDescriptions}
            onUpdateHouseSign={onUpdateHouseSign}
            onUpdateSignDescription={onUpdateSignDescription}
            onResetSignDescription={onResetSignDescription}
            onApplyTheme={onApplyTheme}
            onExportPng={onExportPng}
            onExportSvg={onExportSvg}
            onExportJson={onExportJson}
          />
        )}
      </div>
    </div>
  );
}
