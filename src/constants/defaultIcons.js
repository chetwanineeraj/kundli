// Default SVG Icons for Planets and Signs
// Stored as raw SVG string / inner elements so users can customize them in Settings!

export const DEFAULT_PLANET_ICONS = {
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/><path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/><path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>`,

  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>`,

  mars: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="10" cy="14" r="5"/>
    <path d="m14 10 7-7"/>
    <path d="M16 3h5v5"/>
  </svg>`,

  mercury: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 3a3 3 0 0 0 6 0"/>
    <circle cx="12" cy="10" r="4"/>
    <path d="M12 14v8"/>
    <path d="M9 18h6"/>
  </svg>`,

  jupiter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 5a4 4 0 0 1 4 4v9"/>
    <path d="M6 14h12"/>
    <path d="M14 6v12"/>
  </svg>`,

  venus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="9" r="5"/>
    <path d="M12 14v8"/>
    <path d="M9 18h6"/>
  </svg>`,

  saturn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 4v16"/>
    <path d="M4 8h6"/>
    <path d="M7 13a4 4 0 0 1 5-2c3 0 5 2 5 5 0 2-1 4-4 4"/>
  </svg>`,

  rahu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="8" cy="14" r="3"/>
    <circle cx="16" cy="14" r="3"/>
    <path d="M8 11a4 4 0 0 1 8 0"/>
    <path d="M11 14h2"/>
    <path d="M12 5v4"/>
  </svg>`,

  ketu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="8" cy="9" r="3"/>
    <circle cx="16" cy="9" r="3"/>
    <path d="M8 12a4 4 0 0 0 8 0"/>
    <path d="M11 9h2"/>
    <path d="M12 15v4"/>
  </svg>`,

  uranus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="16" r="3"/>
    <path d="M12 13V5"/>
    <path d="M6 5v8"/>
    <path d="M18 5v8"/>
    <path d="M6 9h12"/>
  </svg>`,

  neptune: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
    <path d="M12 4v16"/>
    <path d="M9 17h6"/>
  </svg>`,

  pluto: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7" r="3"/>
    <path d="M7 10a5 5 0 0 0 10 0"/>
    <path d="M12 14v7"/>
    <path d="M9 18h6"/>
  </svg>`,

  ascendant: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 19 21 12 17 5 21 12 2"/>
  </svg>`
};

export const DEFAULT_SIGN_ICONS = {
  1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 7a4 4 0 0 1 8 0v13"/>
    <path d="M20 7a4 4 0 0 0-8 0"/>
  </svg>`, // Aries

  2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 4a4 4 0 0 1 7 4 4 4 0 0 1 7-4"/>
    <circle cx="12" cy="14" r="6"/>
  </svg>`, // Taurus

  3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 4h14"/>
    <path d="M5 20h14"/>
    <path d="M9 4v16"/>
    <path d="M15 4v16"/>
  </svg>`, // Gemini

  4: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="8" cy="8" r="3"/>
    <circle cx="16" cy="16" r="3"/>
    <path d="M11 8c3-3 7-1 7 3"/>
    <path d="M13 16c-3 3-7 1-7-3"/>
  </svg>`, // Cancer

  5: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="7" cy="16" r="3"/>
    <path d="M9 14a6 6 0 1 1 8-7 4 4 0 0 1 4 4c0 3-2 6-4 9"/>
  </svg>`, // Leo

  6: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 6v10a3 3 0 0 0 6 0V6"/>
    <path d="M10 11a3 3 0 0 1 6 0v7a2 2 0 0 0 4 0"/>
    <path d="M18 15l2 3"/>
  </svg>`, // Virgo

  7: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19h16"/>
    <path d="M4 15h4a4 4 0 0 1 8 0h4"/>
  </svg>`, // Libra

  8: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 6v10a3 3 0 0 0 6 0V6"/>
    <path d="M10 11a3 3 0 0 1 6 0v8l3-3"/>
    <path d="M19 16l-3 3"/>
  </svg>`, // Scorpio

  9: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 19 19 5"/>
    <path d="M13 5h6v6"/>
    <path d="m8 14 3 3"/>
  </svg>`, // Sagittarius

  10: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 6v10a2 2 0 0 0 4 0V6"/>
    <path d="M9 13a4 4 0 0 1 7-2 3 3 0 1 1-3 5 4 4 0 0 1-2 4"/>
  </svg>`, // Capricorn

  11: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 8l3-3 4 4 4-4 4 4 3-3"/>
    <path d="M4 16l3-3 4 4 4-4 4 4 3-3"/>
  </svg>`, // Aquarius

  12: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 4a12 12 0 0 1 0 16"/>
    <path d="M18 4a12 12 0 0 0 0 16"/>
    <path d="M4 12h16"/>
  </svg>` // Pisces
};
