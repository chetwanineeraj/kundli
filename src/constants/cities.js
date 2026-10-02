// Predefined cities with coordinates and timezones

export const POPULAR_CITIES = [
  { name: 'New Delhi, India', lat: 28.6139, lng: 77.2090, tz: '+05:30' },
  { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777, tz: '+05:30' },
  { name: 'Bengaluru, India', lat: 12.9716, lng: 77.5946, tz: '+05:30' },
  { name: 'Kolkata, India', lat: 22.5726, lng: 88.3639, tz: '+05:30' },
  { name: 'Chennai, India', lat: 13.0827, lng: 80.2707, tz: '+05:30' },
  { name: 'Hyderabad, India', lat: 17.3850, lng: 78.4867, tz: '+05:30' },
  { name: 'Ahmedabad, India', lat: 23.0225, lng: 72.5714, tz: '+05:30' },
  { name: 'Pune, India', lat: 18.5204, lng: 73.8567, tz: '+05:30' },
  { name: 'Jaipur, India', lat: 26.9124, lng: 75.7873, tz: '+05:30' },
  { name: 'Lucknow, India', lat: 26.8467, lng: 80.9462, tz: '+05:30' },
  { name: 'Varanasi, India', lat: 25.3176, lng: 82.9739, tz: '+05:30' },
  { name: 'Ujjain, India', lat: 23.1765, lng: 75.7885, tz: '+05:30' },
  { name: 'Haridwar, India', lat: 29.9457, lng: 78.1642, tz: '+05:30' },
  { name: 'Chandigarh, India', lat: 30.7333, lng: 76.7794, tz: '+05:30' },
  { name: 'London, United Kingdom', lat: 51.5074, lng: -0.1278, tz: '+00:00' },
  { name: 'New York, USA', lat: 40.7128, lng: -74.0060, tz: '-05:00' },
  { name: 'San Francisco, USA', lat: 37.7749, lng: -122.4194, tz: '-08:00' },
  { name: 'Chicago, USA', lat: 41.8781, lng: -87.6298, tz: '-06:00' },
  { name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, tz: '-05:00' },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, tz: '+04:00' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, tz: '+08:00' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, tz: '+09:00' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, tz: '+10:00' },
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522, tz: '+01:00' },
  { name: 'Berlin, Germany', lat: 52.5200, lng: 13.4050, tz: '+01:00' }
];

export function parseTzOffset(tzStr) {
  // e.g. "+05:30" or "-05:00"
  if (!tzStr) return 5.5;
  const match = tzStr.match(/^([+-]?)(\d{1,2}):?(\d{2})?$/);
  if (!match) return 0;
  const sign = match[1] === '-' ? -1 : 1;
  const hours = parseInt(match[2], 10) || 0;
  const mins = parseInt(match[3], 10) || 0;
  return sign * (hours + mins / 60);
}
