// Chart Presets and Theme Presets

export const THEME_PRESETS = [
  {
    id: 'vedic-gold',
    name: 'Vedic Royal Gold',
    description: 'Traditional deep navy and rich gold accents inspired by ancient sacred manuscripts.',
    bg: '#0a0f1d',
    cardBg: '#111827',
    border: '#d97706',
    houseColors: [
      '#1e1b4b', '#0f172a', '#1e293b', '#1e1b4b',
      '#1e293b', '#0f172a', '#1e1b4b', '#0f172a',
      '#1e293b', '#1e1b4b', '#1e293b', '#0f172a'
    ],
    borderColors: [
      '#f59e0b', '#d97706', '#b45309', '#f59e0b',
      '#d97706', '#b45309', '#f59e0b', '#d97706',
      '#b45309', '#f59e0b', '#d97706', '#b45309'
    ]
  },
  {
    id: 'temple-terracotta',
    name: 'Temple Terracotta & Saffron',
    description: 'Warm earth tones, saffron, and aged temple sanctum colors.',
    bg: '#1c100a',
    cardBg: '#2a1810',
    border: '#ea580c',
    houseColors: [
      '#3b1812', '#2a120d', '#3b1812', '#451a03',
      '#3b1812', '#2a120d', '#451a03', '#2a120d',
      '#3b1812', '#451a03', '#3b1812', '#2a120d'
    ],
    borderColors: [
      '#f97316', '#ea580c', '#c2410c', '#f97316',
      '#ea580c', '#c2410c', '#f97316', '#ea580c',
      '#c2410c', '#f97316', '#ea580c', '#c2410c'
    ]
  },
  {
    id: 'midnight-celestial',
    name: 'Midnight Celestial',
    description: 'Stellar obsidian and luminous cyan/violet nebula hues.',
    bg: '#030712',
    cardBg: '#0f172a',
    border: '#38bdf8',
    houseColors: [
      '#0f172a', '#020617', '#0f172a', '#172554',
      '#0f172a', '#020617', '#172554', '#020617',
      '#0f172a', '#172554', '#0f172a', '#020617'
    ],
    borderColors: [
      '#38bdf8', '#818cf8', '#a855f7', '#38bdf8',
      '#818cf8', '#a855f7', '#38bdf8', '#818cf8',
      '#a855f7', '#38bdf8', '#818cf8', '#a855f7'
    ]
  },
  {
    id: 'antique-parchment',
    name: 'Antique Vedic Parchment',
    description: 'Light parchment and sepia tones reminiscent of traditional palm-leaf horoscopes.',
    bg: '#fdf6e2',
    cardBg: '#fef9c3',
    border: '#78350f',
    textColor: '#451a03',
    houseColors: [
      '#fef08a', '#fef9c3', '#fef08a', '#fde047',
      '#fef08a', '#fef9c3', '#fde047', '#fef9c3',
      '#fef08a', '#fde047', '#fef08a', '#fef9c3'
    ],
    borderColors: [
      '#92400e', '#78350f', '#92400e', '#b45309',
      '#92400e', '#78350f', '#b45309', '#78350f',
      '#92400e', '#b45309', '#92400e', '#78350f'
    ]
  }
];

export const BACKGROUND_PATTERNS = [
  {
    id: 'stars',
    name: 'Cosmic Nebula',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=70'
  },
  {
    id: 'gold-mandala',
    name: 'Sacred Mandala',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=70'
  },
  {
    id: 'parchment',
    name: 'Ancient Parchment',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=70'
  },
  {
    id: 'aurora',
    name: 'Celestial Aurora',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=70'
  }
];

export const SAMPLE_CHARTS = [
  {
    id: 'kaal-purusha',
    name: 'Aries Lagna (Kaal Purusha Standard)',
    lagnaSign: 1,
    planets: {
      sun: { house: 1, sign: 1, degree: 10, minute: 0, isRetrograde: false },
      moon: { house: 4, sign: 4, degree: 14, minute: 20, isRetrograde: false },
      mars: { house: 10, sign: 10, degree: 28, minute: 0, isRetrograde: false },
      mercury: { house: 6, sign: 6, degree: 15, minute: 45, isRetrograde: false },
      jupiter: { house: 9, sign: 9, degree: 12, minute: 10, isRetrograde: false },
      venus: { house: 12, sign: 12, degree: 27, minute: 30, isRetrograde: false },
      saturn: { house: 7, sign: 7, degree: 20, minute: 0, isRetrograde: false },
      rahu: { house: 2, sign: 2, degree: 18, minute: 15, isRetrograde: true },
      ketu: { house: 8, sign: 8, degree: 18, minute: 15, isRetrograde: true },
      uranus: { house: 11, sign: 11, degree: 5, minute: 40, isRetrograde: false },
      neptune: { house: 12, sign: 12, degree: 18, minute: 12, isRetrograde: false },
      pluto: { house: 10, sign: 10, degree: 2, minute: 50, isRetrograde: false },
      ascendant: { house: 1, sign: 1, degree: 15, minute: 0, isRetrograde: false }
    }
  },
  {
    id: 'shree-rama',
    name: 'Lord Rama\'s Horoscopic Chart (Cancer Lagna)',
    lagnaSign: 4,
    planets: {
      ascendant: { house: 1, sign: 4, degree: 12, minute: 0, isRetrograde: false },
      jupiter: { house: 1, sign: 4, degree: 5, minute: 0, isRetrograde: false },
      moon: { house: 1, sign: 4, degree: 18, minute: 0, isRetrograde: false },
      saturn: { house: 4, sign: 7, degree: 20, minute: 0, isRetrograde: false },
      mars: { house: 7, sign: 10, degree: 28, minute: 0, isRetrograde: false },
      venus: { house: 9, sign: 12, degree: 27, minute: 0, isRetrograde: false },
      sun: { house: 10, sign: 1, degree: 10, minute: 0, isRetrograde: false },
      mercury: { house: 11, sign: 2, degree: 8, minute: 30, isRetrograde: false },
      rahu: { house: 6, sign: 9, degree: 15, minute: 0, isRetrograde: true },
      ketu: { house: 12, sign: 3, degree: 15, minute: 0, isRetrograde: true },
      uranus: { house: 8, sign: 11, degree: 4, minute: 20, isRetrograde: false },
      neptune: { house: 5, sign: 8, degree: 19, minute: 10, isRetrograde: false },
      pluto: { house: 3, sign: 6, degree: 1, minute: 45, isRetrograde: false }
    }
  }
];
