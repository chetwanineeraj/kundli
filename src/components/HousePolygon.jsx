import React from 'react';
import { HOUSE_POLYGONS, getPlanetCoordinates } from '../utils/kundliCalculations';
import { SIGNS } from '../constants/astrologyData';
import PlanetToken from './PlanetToken';

export default function HousePolygon({
  houseId,
  houseData,
  signId,
  planetsInHouse = [],
  planetDisplayMode,
  signDisplayMode,
  showDegrees,
  planetIcons,
  signIcons,
  onHouseClick,
  onPlanetClick,
  onSignClick
}) {
  const geom = HOUSE_POLYGONS[houseId];
  if (!geom) return null;

  const sign = SIGNS.find((s) => s.id === signId) || SIGNS[0];
  const customSignIcon = signIcons[signId];

  const hasBgImage = Boolean(houseData?.bgImage);
  const fillStyle = hasBgImage ? `url(#house-pattern-${houseId})` : (houseData?.color || '#0f172a');
  const strokeColor = houseData?.borderColor || '#d97706';

  return (
    <g className="transition-all duration-200">
      {/* House Polygon Area */}
      <polygon
        points={geom.points}
        fill={fillStyle}
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
        className="cursor-pointer transition-all duration-300 hover:brightness-125"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
        }}
        onClick={(e) => {
          e.stopPropagation();
          onHouseClick(houseId);
        }}
      />

      {/* House Number subtle watermark watermark in diamond houses */}
      <text
        x={geom.center.x}
        y={geom.center.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="34"
        fontWeight="bold"
        fill="#ffffff"
        fillOpacity="0.04"
        className="pointer-events-none select-none font-cinzel"
      >
        H{houseId}
      </text>

      {/* Sign Label / Glyph at signPos */}
      <g
        transform={`translate(${geom.signPos.x}, ${geom.signPos.y})`}
        className="cursor-pointer group select-none"
        onClick={(e) => {
          e.stopPropagation();
          onSignClick(signId);
        }}
      >
        {signDisplayMode === 'number' && (
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#f59e0b"
            className="group-hover:fill-amber-300 transition filter drop-shadow font-sans"
          >
            {signId}
          </text>
        )}

        {signDisplayMode === 'icon' && (
          <g transform="translate(-8, -8)">
            <foreignObject width="16" height="16">
              <div
                className="w-full h-full flex items-center justify-center text-amber-400 group-hover:text-amber-200 transition"
                dangerouslySetInnerHTML={{ __html: customSignIcon }}
              />
            </foreignObject>
          </g>
        )}

        {signDisplayMode === 'english' && (
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#f59e0b"
            className="group-hover:fill-amber-200 uppercase tracking-tighter"
          >
            {sign.en.slice(0, 3)}
          </text>
        )}

        {signDisplayMode === 'hindi' && (
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="#f59e0b"
            className="group-hover:fill-amber-200 font-devanagari"
          >
            {sign.hi}
          </text>
        )}
      </g>

      {/* Planets inside this house */}
      {planetsInHouse.map((p, idx) => {
        const coords = getPlanetCoordinates(houseId, idx, planetsInHouse.length);
        return (
          <PlanetToken
            key={p.id}
            planetId={p.id}
            planetData={p}
            displayMode={planetDisplayMode}
            showDegrees={showDegrees}
            customIcon={planetIcons[p.id]}
            coords={coords}
            onClick={onPlanetClick}
          />
        );
      })}
    </g>
  );
}
