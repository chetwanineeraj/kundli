import { NAKSHATRAS, SIGNS, PLANETS } from '../constants/astrologyData';

// Geometry of the 12 houses in a 600x600 viewBox North Indian Kundli chart
export const HOUSE_POLYGONS = {
  1: {
    id: 1,
    // Top diamond
    points: '300,0 450,150 300,300 150,150',
    center: { x: 300, y: 150 },
    signPos: { x: 300, y: 65 },
    contentArea: { x: 300, y: 165, width: 140, height: 120 }
  },
  2: {
    id: 2,
    // Top-left triangle
    points: '0,0 300,0 150,150',
    center: { x: 150, y: 55 },
    signPos: { x: 150, y: 25 },
    contentArea: { x: 150, y: 75, width: 140, height: 70 }
  },
  3: {
    id: 3,
    // Upper-left triangle
    points: '0,0 150,150 0,300',
    center: { x: 55, y: 150 },
    signPos: { x: 25, y: 150 },
    contentArea: { x: 70, y: 150, width: 70, height: 140 }
  },
  4: {
    id: 4,
    // Left diamond
    points: '0,300 150,150 300,300 150,450',
    center: { x: 150, y: 300 },
    signPos: { x: 65, y: 300 },
    contentArea: { x: 165, y: 300, width: 120, height: 140 }
  },
  5: {
    id: 5,
    // Lower-left triangle
    points: '0,300 150,450 0,600',
    center: { x: 55, y: 450 },
    signPos: { x: 25, y: 450 },
    contentArea: { x: 70, y: 450, width: 70, height: 140 }
  },
  6: {
    id: 6,
    // Bottom-left triangle
    points: '0,600 150,450 300,600',
    center: { x: 150, y: 545 },
    signPos: { x: 150, y: 575 },
    contentArea: { x: 150, y: 525, width: 140, height: 70 }
  },
  7: {
    id: 7,
    // Bottom diamond
    points: '150,450 300,300 450,450 300,600',
    center: { x: 300, y: 450 },
    signPos: { x: 300, y: 535 },
    contentArea: { x: 300, y: 435, width: 140, height: 120 }
  },
  8: {
    id: 8,
    // Bottom-right triangle
    points: '300,600 450,450 600,600',
    center: { x: 450, y: 545 },
    signPos: { x: 450, y: 575 },
    contentArea: { x: 450, y: 525, width: 140, height: 70 }
  },
  9: {
    id: 9,
    // Lower-right triangle
    points: '450,450 600,300 600,600',
    center: { x: 545, y: 450 },
    signPos: { x: 575, y: 450 },
    contentArea: { x: 530, y: 450, width: 70, height: 140 }
  },
  10: {
    id: 10,
    // Right diamond
    points: '300,300 450,150 600,300 450,450',
    center: { x: 450, y: 300 },
    signPos: { x: 535, y: 300 },
    contentArea: { x: 435, y: 300, width: 120, height: 140 }
  },
  11: {
    id: 11,
    // Upper-right triangle
    points: '600,0 600,300 450,150',
    center: { x: 545, y: 150 },
    signPos: { x: 575, y: 150 },
    contentArea: { x: 530, y: 150, width: 70, height: 140 }
  },
  12: {
    id: 12,
    // Top-right triangle
    points: '300,0 600,0 450,150',
    center: { x: 450, y: 55 },
    signPos: { x: 450, y: 25 },
    contentArea: { x: 450, y: 75, width: 140, height: 70 }
  }
};

/**
 * Calculates sign number for each house (1 to 12) counter-clockwise based on Lagna sign.
 * House 1 = lagnaSign
 * House 2 = (lagnaSign % 12) + 1
 * House h = ((lagnaSign + h - 2) % 12) + 1
 */
export function calculateHouseSigns(lagnaSign = 1) {
  const signs = {};
  for (let house = 1; house <= 12; house++) {
    signs[house] = ((lagnaSign + house - 2) % 12) + 1;
  }
  return signs;
}

/**
 * Calculates positions for multiple planets in a house
 */
export function getPlanetCoordinates(houseId, index, totalCount) {
  const house = HOUSE_POLYGONS[houseId];
  if (!house) return { x: 300, y: 300 };

  const center = house.contentArea;
  if (totalCount === 1) {
    return { x: center.x, y: center.y };
  }

  // Diamond houses (1, 4, 7, 10) have more vertical/horizontal room
  const isDiamond = [1, 4, 7, 10].includes(houseId);

  if (isDiamond) {
    if (totalCount === 2) {
      const offsets = [-20, 20];
      return { x: center.x + offsets[index], y: center.y };
    }
    if (totalCount === 3) {
      const coords = [
        { x: center.x, y: center.y - 22 },
        { x: center.x - 28, y: center.y + 16 },
        { x: center.x + 28, y: center.y + 16 }
      ];
      return coords[index] || { x: center.x, y: center.y };
    }
    if (totalCount === 4) {
      const coords = [
        { x: center.x - 26, y: center.y - 18 },
        { x: center.x + 26, y: center.y - 18 },
        { x: center.x - 26, y: center.y + 20 },
        { x: center.x + 26, y: center.y + 20 }
      ];
      return coords[index] || { x: center.x, y: center.y };
    }
    // 5 or more
    const cols = 2;
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = center.x - 28 + col * 56;
    const y = center.y - 30 + row * 24;
    return { x, y };
  } else {
    // Triangle houses
    if (totalCount === 2) {
      return {
        x: center.x + (index === 0 ? -22 : 22),
        y: center.y
      };
    }
    if (totalCount === 3) {
      const coords = [
        { x: center.x - 24, y: center.y },
        { x: center.x, y: center.y },
        { x: center.x + 24, y: center.y }
      ];
      return coords[index] || { x: center.x, y: center.y };
    }
    // 4 or more
    const cols = 2;
    const col = index % cols;
    const row = Math.floor(index / cols);
    return {
      x: center.x - 24 + col * 48,
      y: center.y - 16 + row * 24
    };
  }
}

/**
 * Calculates Nakshatra and Pada given Sign number (1-12) and degree/minute (0-29°)
 */
export function calculateNakshatra(signId, degree = 0, minute = 0) {
  const totalDegrees = (signId - 1) * 30 + degree + minute / 60;
  const nakshatraSpan = 360 / 27; // 13.33333°
  const padaSpan = nakshatraSpan / 4; // 3.33333°

  const nakshatraIndex = Math.min(26, Math.floor(totalDegrees / nakshatraSpan));
  const pada = Math.min(4, Math.floor((totalDegrees % nakshatraSpan) / padaSpan) + 1);

  const nakshatra = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  return {
    name: nakshatra.name,
    pada,
    ruler: nakshatra.ruler,
    deity: nakshatra.deity,
    index: nakshatraIndex + 1
  };
}

/**
 * Determines planetary dignity (Exalted, Debilitated, Own Sign, Friendly, Neutral, Enemy)
 */
export function getPlanetDignity(planetId, signId) {
  const planet = PLANETS.find(p => p.id === planetId);
  if (!planet) return null;

  if (planet.exaltedSign === signId) {
    return { status: 'Exalted (उच्च)', color: '#10b981', isAuspicious: true };
  }
  if (planet.debilitatedSign === signId) {
    return { status: 'Debilitated (नीच)', color: '#ef4444', isAuspicious: false };
  }
  if (planet.ownSigns?.includes(signId)) {
    return { status: 'Own Sign (स्वग्रही)', color: '#3b82f6', isAuspicious: true };
  }
  if (planet.friendlySigns?.includes(signId)) {
    return { status: 'Friendly (मित्र)', color: '#06b6d4', isAuspicious: true };
  }
  if (planet.enemySigns?.includes(signId)) {
    return { status: 'Enemy Sign (शत्रु)', color: '#f97316', isAuspicious: false };
  }
  return { status: 'Neutral (सम)', color: '#94a3b8', isAuspicious: null };
}
