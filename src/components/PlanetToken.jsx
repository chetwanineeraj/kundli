import React from 'react';
import { PLANETS, SIGNS } from '../constants/astrologyData';
import { getPlanetDignity } from '../utils/kundliCalculations';

export default function PlanetToken({
  planetId,
  planetData,
  displayMode = 'icon',
  showDegrees = true,
  customIcon,
  coords,
  onClick
}) {
  const planetDef = PLANETS.find((p) => p.id === planetId);
  if (!planetDef) return null;

  const sign = SIGNS.find((s) => s.id === planetData.sign);
  const dignity = getPlanetDignity(planetId, planetData.sign);

  const degreeStr = `${planetData.degree || 0}°${
    planetData.minute !== undefined && planetData.minute !== null && planetData.minute !== 0
      ? `${planetData.minute}'`
      : ''
  }`;

  const isRetro = planetData.isRetrograde;
  const isExalted = dignity?.status?.includes('Exalted');
  const isDebilitated = dignity?.status?.includes('Debilitated');

  // SVG badge styling
  let badgeColor = planetDef.color || '#fbbf24';
  if (isExalted) badgeColor = '#34d399';
  if (isDebilitated) badgeColor = '#f87171';

  return (
    <g
      transform={`translate(${coords.x}, ${coords.y})`}
      className="cursor-pointer group select-none transition-all"
      onClick={(e) => {
        e.stopPropagation();
        onClick(planetId);
      }}
    >
      {/* Background pill / aura for readability */}
      <rect
        x="-24"
        y="-12"
        width="48"
        height={showDegrees ? "24" : "20"}
        rx="6"
        fill="#090d16"
        fillOpacity="0.75"
        stroke={badgeColor}
        strokeWidth="1.2"
        strokeOpacity="0.8"
        className="group-hover:stroke-amber-400 group-hover:fill-opacity-95 group-hover:stroke-2 transition-all filter drop-shadow-md"
      />

      {/* Main Content based on displayMode */}
      {displayMode === 'icon' && (
        <g transform="translate(-8, -9)">
          <foreignObject width="16" height="16">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ color: badgeColor }}
              dangerouslySetInnerHTML={{ __html: customIcon }}
            />
          </foreignObject>
        </g>
      )}

      {displayMode === 'english' && (
        <text
          x="0"
          y={showDegrees ? "-1" : "3"}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={badgeColor}
          fontFamily="system-ui, sans-serif"
        >
          {planetDef.enAbbr}
        </text>
      )}

      {displayMode === 'hindi' && (
        <text
          x="0"
          y={showDegrees ? "-1" : "3"}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill={badgeColor}
          fontFamily="'Noto Sans Devanagari', sans-serif"
        >
          {planetDef.hiAbbr}
        </text>
      )}

      {displayMode === 'both' && (
        <g transform="translate(-16, -9)">
          <foreignObject width="14" height="14">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ color: badgeColor }}
              dangerouslySetInnerHTML={{ __html: customIcon }}
            />
          </foreignObject>
          <text
            x="22"
            y="10"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill={badgeColor}
          >
            {planetDef.enAbbr}
          </text>
        </g>
      )}

      {/* Retrograde Indicator */}
      {isRetro && (
        <text
          x="19"
          y="-3"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ef4444"
          className="animate-pulse"
        >
          R
        </text>
      )}

      {/* Degree Label below */}
      {showDegrees && (
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontSize="8"
          fill="#94a3b8"
          fontWeight="500"
          fontFamily="monospace"
        >
          {degreeStr}
        </text>
      )}

      {/* Dignity small dot (Green for Exalted, Red for Debilitated) */}
      {(isExalted || isDebilitated) && (
        <circle
          cx="-18"
          cy="-6"
          r="2.5"
          fill={isExalted ? '#10b981' : '#ef4444'}
          stroke="#090d16"
          strokeWidth="0.5"
        />
      )}
    </g>
  );
}
