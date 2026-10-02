import * as Astronomy from 'astronomy-engine';
import { parseTzOffset } from '../constants/cities';

/**
 * Calculates Lahiri (Chitra Paksha) Ayanamsha for a given Julian Day
 * At J2000.0 (JD 2451545.0), Lahiri Ayanamsha = 23° 51' 25.53" = 23.857092°
 * Precession rate = 5029.0966" / century = 1.396971° / century
 */
export function calculateLahiriAyanamsha(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  return 23.857092 + 1.396971 * T - 0.000308 * T * T;
}

/**
 * Calculates Sidereal Ascendant (Lagna) given UTC Date, Latitude, Longitude, and Ayanamsha
 */
export function calculateAscendant(utcDate, lat, lng, ayanamsha) {
  const gmst = Astronomy.SiderealTime(utcDate); // in hours 0..24
  const ramc = ((gmst * 15.0 + lng) % 360.0 + 360.0) % 360.0; // in degrees

  const jd = (utcDate.getTime() / 86400000.0) + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  const eps = (23.4392911 - 0.0130042 * T) * (Math.PI / 180.0);

  const ramcRad = ramc * (Math.PI / 180.0);
  const latRad = lat * (Math.PI / 180.0);

  const y = Math.cos(ramcRad);
  const x = -Math.sin(ramcRad) * Math.cos(eps) - Math.tan(latRad) * Math.sin(eps);

  let tropicalAsc = Math.atan2(y, x) * (180.0 / Math.PI);
  if (tropicalAsc < 0) tropicalAsc += 360.0;

  const siderealAsc = ((tropicalAsc - ayanamsha) % 360.0 + 360.0) % 360.0;
  return {
    longitude: siderealAsc,
    tropicalLongitude: tropicalAsc,
    sign: Math.floor(siderealAsc / 30.0) + 1,
    degree: Math.floor(siderealAsc % 30.0),
    minute: Math.floor(((siderealAsc % 30.0) - Math.floor(siderealAsc % 30.0)) * 60.0)
  };
}

/**
 * Calculates Mean Lunar Node (Rahu) and Ketu (Rahu + 180°)
 */
export function calculateRahuKetu(jd, ayanamsha) {
  const T = (jd - 2451545.0) / 36525.0;
  // Mean longitude of ascending node (Tropical)
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000.0;
  omega = ((omega % 360.0) + 360.0) % 360.0;

  const siderealRahu = ((omega - ayanamsha) % 360.0 + 360.0) % 360.0;
  const siderealKetu = (siderealRahu + 180.0) % 360.0;

  const getDegMin = (lon) => {
    const degInSign = lon % 30.0;
    const deg = Math.floor(degInSign);
    const min = Math.floor((degInSign - deg) * 60.0);
    return {
      longitude: lon,
      sign: Math.floor(lon / 30.0) + 1,
      degree: deg,
      minute: min,
      isRetrograde: true
    };
  };

  return {
    rahu: getDegMin(siderealRahu),
    ketu: getDegMin(siderealKetu)
  };
}

/**
 * Main Vedic birth chart calculation from Date, Time, Place (Lat, Lng), Timezone
 *
 * @param {Object} birthParams
 * @param {string} birthParams.date - YYYY-MM-DD
 * @param {string} birthParams.time - HH:MM or HH:MM:SS
 * @param {number} birthParams.lat - Latitude (-90 to +90)
 * @param {number} birthParams.lng - Longitude (-180 to +180)
 * @param {string|number} birthParams.tz - Timezone string (e.g. "+05:30") or offset in hours (e.g. 5.5)
 */
export function calculateKundliFromBirthDetails({ date, time, lat, lng, tz }) {
  const [yearStr, monthStr, dayStr] = date.split('-');
  const [hourStr, minStr, secStr] = (time || '12:00:00').split(':');

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1; // 0-indexed
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10) || 0;
  const min = parseInt(minStr, 10) || 0;
  const sec = parseInt(secStr, 10) || 0;

  const tzOffsetHours = typeof tz === 'number' ? tz : parseTzOffset(tz);

  // Convert local date/time to UTC timestamp
  // UTC = LocalTime - tzOffsetHours
  const localMs = Date.UTC(year, month, day, hour, min, sec);
  const utcMs = localMs - tzOffsetHours * 3600 * 1000;
  const utcDate = new Date(utcMs);

  const jd = (utcMs / 86400000.0) + 2440587.5;
  const ayanamsha = calculateLahiriAyanamsha(jd);

  // 1. Calculate Ascendant (Lagna)
  const ascData = calculateAscendant(utcDate, lat, lng, ayanamsha);
  const lagnaSign = ascData.sign;

  // 2. Planets configuration mapping
  const bodyMap = [
    { id: 'sun', body: Astronomy.Body.Sun, isNeverRetro: true },
    { id: 'moon', body: Astronomy.Body.Moon, isNeverRetro: true },
    { id: 'mars', body: Astronomy.Body.Mars },
    { id: 'mercury', body: Astronomy.Body.Mercury },
    { id: 'jupiter', body: Astronomy.Body.Jupiter },
    { id: 'venus', body: Astronomy.Body.Venus },
    { id: 'saturn', body: Astronomy.Body.Saturn },
    { id: 'uranus', body: Astronomy.Body.Uranus },
    { id: 'neptune', body: Astronomy.Body.Neptune },
    { id: 'pluto', body: Astronomy.Body.Pluto }
  ];

  const calculatedPlanets = {};

  // Next hour date for retrograde motion detection
  const nextDate = new Date(utcMs + 3600 * 1000);
  const nextJd = (nextDate.getTime() / 86400000.0) + 2440587.5;
  const nextAyanamsha = calculateLahiriAyanamsha(nextJd);

  bodyMap.forEach(({ id, body, isNeverRetro }) => {
    // Current position
    const vec = Astronomy.GeoVector(body, utcDate, true);
    const ecl = Astronomy.Ecliptic(vec);
    const tropicalLon = ecl.elon;
    const siderealLon = ((tropicalLon - ayanamsha) % 360.0 + 360.0) % 360.0;

    // Sign (1-12)
    const sign = Math.floor(siderealLon / 30.0) + 1;
    const degInSign = siderealLon % 30.0;
    const degree = Math.floor(degInSign);
    const minute = Math.floor((degInSign - degree) * 60.0);

    // House relative to Ascendant (Lagna)
    const house = ((sign - lagnaSign + 12) % 12) + 1;

    // Retrograde check
    let isRetrograde = false;
    if (!isNeverRetro) {
      const vecNext = Astronomy.GeoVector(body, nextDate, true);
      const eclNext = Astronomy.Ecliptic(vecNext);
      const siderealLonNext = ((eclNext.elon - nextAyanamsha) % 360.0 + 360.0) % 360.0;

      let diff = siderealLonNext - siderealLon;
      if (diff < -180.0) diff += 360.0;
      if (diff > 180.0) diff -= 360.0;

      isRetrograde = diff < 0.0;
    }

    calculatedPlanets[id] = {
      house,
      sign,
      degree,
      minute,
      isRetrograde,
      siderealLongitude: siderealLon
    };
  });

  // 3. Rahu and Ketu
  const nodes = calculateRahuKetu(jd, ayanamsha);
  calculatedPlanets['rahu'] = {
    house: ((nodes.rahu.sign - lagnaSign + 12) % 12) + 1,
    sign: nodes.rahu.sign,
    degree: nodes.rahu.degree,
    minute: nodes.rahu.minute,
    isRetrograde: true,
    siderealLongitude: nodes.rahu.longitude
  };

  calculatedPlanets['ketu'] = {
    house: ((nodes.ketu.sign - lagnaSign + 12) % 12) + 1,
    sign: nodes.ketu.sign,
    degree: nodes.ketu.degree,
    minute: nodes.ketu.minute,
    isRetrograde: true,
    siderealLongitude: nodes.ketu.longitude
  };

  // 4. Ascendant point
  calculatedPlanets['ascendant'] = {
    house: 1,
    sign: lagnaSign,
    degree: ascData.degree,
    minute: ascData.minute,
    isRetrograde: false,
    siderealLongitude: ascData.longitude
  };

  return {
    lagnaSign,
    planets: calculatedPlanets,
    metadata: {
      utcTime: utcDate.toISOString(),
      julianDay: jd.toFixed(4),
      ayanamsha: `${Math.floor(ayanamsha)}° ${Math.floor((ayanamsha % 1) * 60)}'`,
      ascendantDeg: `${ascData.degree}° ${ascData.minute}'`
    }
  };
}
