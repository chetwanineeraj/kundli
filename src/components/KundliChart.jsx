import React, { forwardRef } from 'react';
import HousePolygon from './HousePolygon';

const KundliChart = forwardRef(function KundliChart(
  {
    houses,
    houseSigns,
    planets,
    planetDisplayMode,
    signDisplayMode,
    showDegrees,
    planetIcons,
    signIcons,
    onHouseClick,
    onPlanetClick,
    onSignClick
  },
  ref
) {
  // Group planets by house (1-12)
  const planetsByHouse = {};
  for (let h = 1; h <= 12; h++) {
    planetsByHouse[h] = [];
  }

  Object.entries(planets).forEach(([id, data]) => {
    if (data.house && planetsByHouse[data.house]) {
      planetsByHouse[data.house].push({ id, ...data });
    }
  });

  return (
    <div className="relative w-full aspect-square max-w-[620px] mx-auto select-none">
      <svg
        ref={ref}
        viewBox="0 0 600 600"
        className="w-full h-full drop-shadow-2xl overflow-hidden rounded-2xl bg-slate-950 border border-amber-900/40"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG Definitions for House Background Images and Filters */}
        <defs>
          {houses.map((h) => {
            if (!h.bgImage) return null;
            return (
              <pattern
                key={h.id}
                id={`house-pattern-${h.id}`}
                patternUnits="userSpaceOnUse"
                width="600"
                height="600"
              >
                <image
                  href={h.bgImage}
                  x="0"
                  y="0"
                  width="600"
                  height="600"
                  preserveAspectRatio="xMidYMid slice"
                  opacity="0.4"
                />
                <rect
                  width="600"
                  height="600"
                  fill={h.color || '#0f172a'}
                  fillOpacity="0.75"
                />
              </pattern>
            );
          })}

          {/* Golden radial gradient for center and corner accents */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Chart Background Glow */}
        <rect width="600" height="600" fill="#090d16" />
        <circle cx="300" cy="300" r="180" fill="url(#centerGlow)" />

        {/* 12 House Polygons */}
        {houses.map((h) => (
          <HousePolygon
            key={h.id}
            houseId={h.id}
            houseData={h}
            signId={houseSigns[h.id] || h.id}
            planetsInHouse={planetsByHouse[h.id]}
            planetDisplayMode={planetDisplayMode}
            signDisplayMode={signDisplayMode}
            showDegrees={showDegrees}
            planetIcons={planetIcons}
            signIcons={signIcons}
            onHouseClick={onHouseClick}
            onPlanetClick={onPlanetClick}
            onSignClick={onSignClick}
          />
        ))}

        {/* Subtle decorative center bindu / point */}
        <circle cx="300" cy="300" r="3" fill="#f59e0b" opacity="0.6" />

        {/* Ornate Outer Border Frame */}
        <rect
          x="1"
          y="1"
          width="598"
          height="598"
          fill="none"
          stroke="#b45309"
          strokeWidth="3"
          rx="12"
          className="pointer-events-none"
        />
        <rect
          x="6"
          y="6"
          width="588"
          height="588"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeOpacity="0.4"
          rx="8"
          className="pointer-events-none"
        />

        {/* Corner corner Vedic decorative markers */}
        <g stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" className="pointer-events-none">
          <path d="M12 18 L18 12 M12 24 L24 12" />
          <path d="M588 18 L582 12 M588 24 L576 12" />
          <path d="M12 582 L18 588 M12 576 L24 588" />
          <path d="M588 582 L582 588 M588 576 L576 588" />
        </g>
      </svg>
    </div>
  );
});

export default KundliChart;
