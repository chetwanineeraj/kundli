// 12 Zodiac Signs data
export const SIGNS = [
  {
    id: 1,
    en: 'Aries',
    hi: 'मेष',
    sanskrit: 'Mesha',
    lord: 'Mars',
    lordHi: 'मंगल',
    element: 'Fire (Agni)',
    modality: 'Movable (Chara)',
    symbol: 'Ram',
    color: '#ef4444',
    description: 'Energetic, pioneering, courageous, dynamic and confident. Symbolized by the fiery Ram.'
  },
  {
    id: 2,
    en: 'Taurus',
    hi: 'वृषभ',
    sanskrit: 'Vrishabha',
    lord: 'Venus',
    lordHi: 'शुक्र',
    element: 'Earth (Prithvi)',
    modality: 'Fixed (Sthira)',
    symbol: 'Bull',
    color: '#10b981',
    description: 'Patient, reliable, grounded, artistic, fond of comfort and luxury. Symbolized by the sturdy Bull.'
  },
  {
    id: 3,
    en: 'Gemini',
    hi: 'मिथुन',
    sanskrit: 'Mithuna',
    lord: 'Mercury',
    lordHi: 'बुध',
    element: 'Air (Vayu)',
    modality: 'Dual (Dvisvabhava)',
    symbol: 'Twins',
    color: '#eab308',
    description: 'Curious, versatile, communicative, intellectual and witty. Symbolized by the Twins.'
  },
  {
    id: 4,
    en: 'Cancer',
    hi: 'कर्क',
    sanskrit: 'Karka',
    lord: 'Moon',
    lordHi: 'चन्द्र',
    element: 'Water (Jala)',
    modality: 'Movable (Chara)',
    symbol: 'Crab',
    color: '#06b6d4',
    description: 'Nuturing, deeply emotional, intuitive, protective, family-oriented. Symbolized by the Crab.'
  },
  {
    id: 5,
    en: 'Leo',
    hi: 'सिंह',
    sanskrit: 'Simha',
    lord: 'Sun',
    lordHi: 'सूर्य',
    element: 'Fire (Agni)',
    modality: 'Fixed (Sthira)',
    symbol: 'Lion',
    color: '#f97316',
    description: 'Regal, charismatic, courageous, generous, commanding and noble. Symbolized by the majestic Lion.'
  },
  {
    id: 6,
    en: 'Virgo',
    hi: 'कन्या',
    sanskrit: 'Kanya',
    lord: 'Mercury',
    lordHi: 'बुध',
    element: 'Earth (Prithvi)',
    modality: 'Dual (Dvisvabhava)',
    symbol: 'Maiden',
    color: '#84cc16',
    description: 'Analytical, meticulous, service-minded, practical, detail-oriented. Symbolized by the pure Maiden.'
  },
  {
    id: 7,
    en: 'Libra',
    hi: 'तुला',
    sanskrit: 'Tula',
    lord: 'Venus',
    lordHi: 'शुक्र',
    element: 'Air (Vayu)',
    modality: 'Movable (Chara)',
    symbol: 'Scales',
    color: '#ec4899',
    description: 'Harmonious, diplomatic, balanced, charming, lover of justice and beauty. Symbolized by the balanced Scales.'
  },
  {
    id: 8,
    en: 'Scorpio',
    hi: 'वृश्चिक',
    sanskrit: 'Vrishchika',
    lord: 'Mars',
    lordHi: 'मंगल',
    element: 'Water (Jala)',
    modality: 'Fixed (Sthira)',
    symbol: 'Scorpion',
    color: '#991b1b',
    description: 'Intense, transformative, investigative, mysterious, powerful. Symbolized by the occult Scorpion.'
  },
  {
    id: 9,
    en: 'Sagittarius',
    hi: 'धनु',
    sanskrit: 'Dhanu',
    lord: 'Jupiter',
    lordHi: 'गुरु',
    element: 'Fire (Agni)',
    modality: 'Dual (Dvisvabhava)',
    symbol: 'Archer',
    color: '#8b5cf6',
    description: 'Philosophical, optimistic, truth-seeking, expansive, generous. Symbolized by the centaur Archer.'
  },
  {
    id: 10,
    en: 'Capricorn',
    hi: 'मकर',
    sanskrit: 'Makara',
    lord: 'Saturn',
    lordHi: 'शनि',
    element: 'Earth (Prithvi)',
    modality: 'Movable (Chara)',
    symbol: 'Sea-Goat',
    color: '#64748b',
    description: 'Disciplined, ambitious, perseverant, structured, patient builder. Symbolized by the Sea-Goat.'
  },
  {
    id: 11,
    en: 'Aquarius',
    hi: 'कुम्भ',
    sanskrit: 'Kumbha',
    lord: 'Saturn',
    lordHi: 'शनि',
    element: 'Air (Vayu)',
    modality: 'Fixed (Sthira)',
    symbol: 'Water Bearer',
    color: '#3b82f6',
    description: 'Humanitarian, innovative, visionary, independent, eccentric thinker. Symbolized by the Water-Bearer.'
  },
  {
    id: 12,
    en: 'Pisces',
    hi: 'मीन',
    sanskrit: 'Meena',
    lord: 'Jupiter',
    lordHi: 'गुरु',
    element: 'Water (Jala)',
    modality: 'Dual (Dvisvabhava)',
    symbol: 'Two Fishes',
    color: '#a855f7',
    description: 'Compassionate, imaginative, mystical, empathetic, spiritual seeker. Symbolized by two Fishes swimming in opposite directions.'
  }
];

// Planets data (Traditional Navagraha + Uranus, Neptune, Pluto + Ascendant)
export const PLANETS = [
  {
    id: 'sun',
    en: 'Sun',
    hi: 'सूर्य',
    enAbbr: 'Su',
    hiAbbr: 'सू',
    color: '#f59e0b',
    karaka: 'Soul (Atma), Father, Vitality, Authority, Government',
    exaltedSign: 1, // Aries 10°
    debilitatedSign: 7, // Libra 10°
    ownSigns: [5], // Leo
    friendlySigns: [1, 8, 4, 9, 12],
    neutralSigns: [3, 6],
    enemySigns: [2, 7, 10, 11]
  },
  {
    id: 'moon',
    en: 'Moon',
    hi: 'चन्द्र',
    enAbbr: 'Mo',
    hiAbbr: 'चं',
    color: '#e2e8f0',
    karaka: 'Mind (Manas), Mother, Emotions, Fluidity, Nurturing',
    exaltedSign: 2, // Taurus 3°
    debilitatedSign: 8, // Scorpio 3°
    ownSigns: [4], // Cancer
    friendlySigns: [5, 3, 6],
    neutralSigns: [1, 8, 9, 12, 10, 11],
    enemySigns: []
  },
  {
    id: 'mars',
    en: 'Mars',
    hi: 'मंगल',
    enAbbr: 'Ma',
    hiAbbr: 'मं',
    color: '#ef4444',
    karaka: 'Courage, Younger Siblings, Land, Energy, Action, Passion',
    exaltedSign: 10, // Capricorn 28°
    debilitatedSign: 4, // Cancer 28°
    ownSigns: [1, 8], // Aries, Scorpio
    friendlySigns: [5, 4, 9, 12],
    neutralSigns: [2, 7, 10, 11],
    enemySigns: [3, 6]
  },
  {
    id: 'mercury',
    en: 'Mercury',
    hi: 'बुध',
    enAbbr: 'Me',
    hiAbbr: 'बु',
    color: '#22c55e',
    karaka: 'Intellect (Buddhi), Speech, Trade, Logic, Learning',
    exaltedSign: 6, // Virgo 15°
    debilitatedSign: 12, // Pisces 15°
    ownSigns: [3, 6], // Gemini, Virgo
    friendlySigns: [5, 2, 7],
    neutralSigns: [1, 8, 9, 12, 10, 11],
    enemySigns: [4]
  },
  {
    id: 'jupiter',
    en: 'Jupiter',
    hi: 'गुरु',
    enAbbr: 'Ju',
    hiAbbr: 'गु',
    color: '#fbbf24',
    karaka: 'Wisdom (Guru), Children, Wealth, Higher Knowledge, Dharma',
    exaltedSign: 4, // Cancer 5°
    debilitatedSign: 10, // Capricorn 5°
    ownSigns: [9, 12], // Sagittarius, Pisces
    friendlySigns: [5, 4, 1, 8],
    neutralSigns: [10, 11],
    enemySigns: [3, 6, 2, 7]
  },
  {
    id: 'venus',
    en: 'Venus',
    hi: 'शुक्र',
    enAbbr: 'Ve',
    hiAbbr: 'शु',
    color: '#f472b6',
    karaka: 'Love, Beauty, Marriage, Luxury, Vehicles, Fine Arts',
    exaltedSign: 12, // Pisces 27°
    debilitatedSign: 6, // Virgo 27°
    ownSigns: [2, 7], // Taurus, Libra
    friendlySigns: [3, 6, 10, 11],
    neutralSigns: [1, 8, 9, 12],
    enemySigns: [5, 4]
  },
  {
    id: 'saturn',
    en: 'Saturn',
    hi: 'शनि',
    enAbbr: 'Sa',
    hiAbbr: 'श',
    color: '#64748b',
    karaka: 'Longevity, Discipline, Labor, Karma, Delays, Solitude',
    exaltedSign: 7, // Libra 20°
    debilitatedSign: 1, // Aries 20°
    ownSigns: [10, 11], // Capricorn, Aquarius
    friendlySigns: [3, 6, 2, 7],
    neutralSigns: [9, 12],
    enemySigns: [5, 4, 1, 8]
  },
  {
    id: 'rahu',
    en: 'Rahu',
    hi: 'राहु',
    enAbbr: 'Ra',
    hiAbbr: 'रा',
    color: '#6366f1',
    karaka: 'Ambition, Worldly Desires, Foreign Things, Illusion, Tech',
    exaltedSign: 2, // Taurus / Gemini
    debilitatedSign: 8, // Scorpio / Sagittarius
    ownSigns: [11], // Co-ruler Aquarius
    friendlySigns: [2, 7, 3, 6, 10, 11],
    neutralSigns: [9, 12],
    enemySigns: [5, 4, 1, 8]
  },
  {
    id: 'ketu',
    en: 'Ketu',
    hi: 'केतु',
    enAbbr: 'Ke',
    hiAbbr: 'के',
    color: '#a1a1aa',
    karaka: 'Moksha, Spirituality, Detachment, Intuition, Renunciation',
    exaltedSign: 8, // Scorpio / Sagittarius
    debilitatedSign: 2, // Taurus / Gemini
    ownSigns: [8], // Co-ruler Scorpio
    friendlySigns: [1, 8, 9, 12],
    neutralSigns: [3, 6, 10, 11],
    enemySigns: [5, 4, 2, 7]
  },
  {
    id: 'uranus',
    en: 'Uranus',
    hi: 'अरुण',
    enAbbr: 'Ur',
    hiAbbr: 'अ',
    color: '#38bdf8',
    karaka: 'Revolution, Sudden Enlightenment, Breakthroughs, Originality',
    exaltedSign: 8,
    debilitatedSign: 2,
    ownSigns: [11],
    friendlySigns: [],
    neutralSigns: [],
    enemySigns: []
  },
  {
    id: 'neptune',
    en: 'Neptune',
    hi: 'वरुण',
    enAbbr: 'Ne',
    hiAbbr: 'व',
    color: '#2dd4bf',
    karaka: 'Mysticism, Illusions, Dreams, Ocean, Transcendent Creativity',
    exaltedSign: 5,
    debilitatedSign: 11,
    ownSigns: [12],
    friendlySigns: [],
    neutralSigns: [],
    enemySigns: []
  },
  {
    id: 'pluto',
    en: 'Pluto',
    hi: 'यम',
    enAbbr: 'Pl',
    hiAbbr: 'य',
    color: '#c084fc',
    karaka: 'Rebirth, Subconscious Power, Metamorphosis, Deep Secrets',
    exaltedSign: 1,
    debilitatedSign: 7,
    ownSigns: [8],
    friendlySigns: [],
    neutralSigns: [],
    enemySigns: []
  },
  {
    id: 'ascendant',
    en: 'Ascendant',
    hi: 'लग्न',
    enAbbr: 'Asc',
    hiAbbr: 'ल',
    color: '#f43f5e',
    karaka: 'The Self, Physical Appearance, Vital Energy, Destiny Path',
    exaltedSign: null,
    debilitatedSign: null,
    ownSigns: [],
    friendlySigns: [],
    neutralSigns: [],
    enemySigns: []
  }
];

// 27 Nakshatras list
export const NAKSHATRAS = [
  { name: 'Ashwini', ruler: 'Ketu', deity: 'Ashwini Kumaras' },
  { name: 'Bharani', ruler: 'Venus', deity: 'Yama' },
  { name: 'Krittika', ruler: 'Sun', deity: 'Agni' },
  { name: 'Rohini', ruler: 'Moon', deity: 'Brahma' },
  { name: 'Mrigashira', ruler: 'Mars', deity: 'Soma' },
  { name: 'Ardra', ruler: 'Rahu', deity: 'Rudra' },
  { name: 'Punarvasu', ruler: 'Jupiter', deity: 'Aditi' },
  { name: 'Pushya', ruler: 'Saturn', deity: 'Brihaspati' },
  { name: 'Ashlesha', ruler: 'Mercury', deity: 'Nagas' },
  { name: 'Magha', ruler: 'Ketu', deity: 'Pitris' },
  { name: 'Purva Phalguni', ruler: 'Venus', deity: 'Bhaga' },
  { name: 'Uttara Phalguni', ruler: 'Sun', deity: 'Aryaman' },
  { name: 'Hasta', ruler: 'Moon', deity: 'Savitr' },
  { name: 'Chitra', ruler: 'Mars', deity: 'Vishwakarma' },
  { name: 'Swati', ruler: 'Rahu', deity: 'Vayu' },
  { name: 'Vishakha', ruler: 'Jupiter', deity: 'Indragni' },
  { name: 'Anuradha', ruler: 'Saturn', deity: 'Mitra' },
  { name: 'Jyeshtha', ruler: 'Mercury', deity: 'Indra' },
  { name: 'Mula', ruler: 'Ketu', deity: 'Nirriti' },
  { name: 'Purva Ashadha', ruler: 'Venus', deity: 'Apas' },
  { name: 'Uttara Ashadha', ruler: 'Sun', deity: 'Vishwadevas' },
  { name: 'Shravana', ruler: 'Moon', deity: 'Vishnu' },
  { name: 'Dhanishta', ruler: 'Mars', deity: 'Ashta Vasus' },
  { name: 'Shatabhisha', ruler: 'Rahu', deity: 'Varuna' },
  { name: 'Purva Bhadrapada', ruler: 'Jupiter', deity: 'Aja Ekapada' },
  { name: 'Uttara Bhadrapada', ruler: 'Saturn', deity: 'Ahirbudhnya' },
  { name: 'Revati', ruler: 'Mercury', deity: 'Pushan' }
];

export const SIGN_MAP = Object.fromEntries(SIGNS.map(s => [s.id, s]));
export const PLANET_MAP = Object.fromEntries(PLANETS.map(p => [p.id, p]));

export const DEFAULT_PLANET_DESCRIPTIONS = Object.fromEntries(
  PLANETS.map((p) => [p.id, p.karaka])
);

export const DEFAULT_SIGN_DESCRIPTIONS = Object.fromEntries(
  SIGNS.map((s) => [s.id, s.description])
);
