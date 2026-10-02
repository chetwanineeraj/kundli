// 12 Astrological Houses (Bhavas) Significations, Default Colors and Descriptions

export const DEFAULT_HOUSES = [
  {
    id: 1,
    sanskrit: 'Tanu Bhava (तनु भाव)',
    name: '1st House - Ascendant / Self',
    hindiName: 'प्रथम भाव - लग्न',
    category: 'Kendra & Trikona (Lagna)',
    rulingSign: 1, // natural 1st sign
    karakas: ['Sun', 'Mars'],
    bodyParts: 'Head, brain, complexion, physical constitution, vitality',
    domains: 'Self, personality, physical body, appearance, character, lifespan, overall destiny',
    significations: [
      'Physical stature, health and vitality',
      'Personality, self-confidence and life direction',
      'Beginning of life and childhood temperament',
      'General fame, respect and mental stability'
    ],
    defaultColor: '#1e293b', // slate-800
    color: '#1e293b',
    borderColor: '#d97706', // gold border
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60',
    notes: 'The Lagna is the cornerstone of the chart, representing the physical vessel and soul direction.'
  },
  {
    id: 2,
    sanskrit: 'Dhana Bhava (धन भाव)',
    name: '2nd House - Wealth & Speech',
    hindiName: 'द्वितीय भाव - धन',
    category: 'Maraka (Death-inflicting) & Panaphara',
    rulingSign: 2,
    karakas: ['Jupiter', 'Mercury'],
    bodyParts: 'Face, eyes (right eye), mouth, teeth, tongue, throat',
    domains: 'Accumulated wealth, liquid assets, family lineage, speech, early education, food habits',
    significations: [
      'Financial reserves, savings, gems and bullion',
      'Speech eloquence, vocal talent and tone',
      'Immediate family lineage (Kutumba)',
      'Dietary intake and truthfulness'
    ],
    defaultColor: '#0f172a',
    color: '#0f172a',
    borderColor: '#ca8a04',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
    notes: 'House of treasure and oral articulation. Influences financial sustenance and family heritage.'
  },
  {
    id: 3,
    sanskrit: 'Sahaja Bhava (सहज भाव)',
    name: '3rd House - Courage & Siblings',
    hindiName: 'तृतीय भाव - सहज / पराक्रम',
    category: 'Upachaya (Growth) & Apoklima',
    rulingSign: 3,
    karakas: ['Mars'],
    bodyParts: 'Arms, shoulders, hands, collarbones, upper respiratory tract, ears (right ear)',
    domains: 'Valour, courage, younger brothers/sisters, communication, short journeys, manual skills, writing',
    significations: [
      'Prowess, determination, willpower and initiative',
      'Younger siblings and their relationship',
      'Writing, hobbies, artistic dexterity with hands',
      'Short distance travels and correspondence'
    ],
    defaultColor: '#1e293b',
    color: '#1e293b',
    borderColor: '#f59e0b',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=500&auto=format&fit=crop&q=60',
    notes: 'House of self-effort (Parakrama) and perseverance.'
  },
  {
    id: 4,
    sanskrit: 'Sukha Bhava (सुख भाव)',
    name: '4th House - Mother & Home',
    hindiName: 'चतुर्थ भाव - सुख / मातृ',
    category: 'Kendra (Moksha Triad)',
    rulingSign: 4,
    karakas: ['Moon', 'Venus', 'Mars'],
    bodyParts: 'Chest, breasts, lungs, heart, diaphragm',
    domains: 'Inner peace (Sukha), mother, real estate, vehicles, ancestral lands, formal education, emotional foundations',
    significations: [
      'Mother and maternal bond',
      'Properties, home environment, conveyances (Vahana)',
      'Heartfelt happiness and emotional security',
      'Primary schooling and academic degree foundations'
    ],
    defaultColor: '#0f172a',
    color: '#0f172a',
    borderColor: '#38bdf8',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60',
    notes: 'The deepest foundation of inner contentment and maternal nourishment.'
  },
  {
    id: 5,
    sanskrit: 'Putra Bhava (पुत्र भाव)',
    name: '5th House - Intellect & Progeny',
    hindiName: 'पञ्चम भाव - पुत्र / बुद्धि',
    category: 'Trikona (Dharma Triad)',
    rulingSign: 5,
    karakas: ['Jupiter'],
    bodyParts: 'Stomach, belly, upper abdomen, liver, spine',
    domains: 'Past-life merits (Purva Punya), intelligence, children, creativity, romance, speculation, mantras',
    significations: [
      'Creative genius and intellectual brilliance',
      'Children and relationship with offspring',
      'Speculative investments, stock market, gaming',
      'Mantra chanting, devotion and spiritual intuition'
    ],
    defaultColor: '#1e293b',
    color: '#1e293b',
    borderColor: '#fbbf24',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60',
    notes: 'House of divine grace, creative inspiration and auspicious blessings earned across lifetimes.'
  },
  {
    id: 6,
    sanskrit: 'Ari / Shatru Bhava (शत्रु भाव)',
    name: '6th House - Obstacles & Service',
    hindiName: 'षष्ठ भाव - रोग / ऋण / शत्रु',
    category: 'Dusthana (Difficult) & Upachaya (Growth)',
    rulingSign: 6,
    karakas: ['Mars', 'Saturn'],
    bodyParts: 'Lower abdomen, intestines, kidneys, digestive tract',
    domains: 'Diseases (Roga), debts (Rina), adversaries (Shatru), daily routine work, litigation, pets, service',
    significations: [
      'Capacity to overcome competition and rivals',
      'Health challenges, acute illness and recovery',
      'Debts, financial liabilities, loans',
      'Service industry, maternal uncle, legal conflicts'
    ],
    defaultColor: '#0f172a',
    color: '#0f172a',
    borderColor: '#f43f5e',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60',
    notes: 'Though a difficult house, planets here grant fighting grit and victory in disputes over time.'
  },
  {
    id: 7,
    sanskrit: 'Yuvati / Kalatra Bhava (कलत्र भाव)',
    name: '7th House - Spouse & Partnerships',
    hindiName: 'सप्तम भाव - विवाह / साझेदारी',
    category: 'Kendra & Maraka',
    rulingSign: 7,
    karakas: ['Venus', 'Jupiter'],
    bodyParts: 'Pelvis, internal sexual organs, bladder, groin',
    domains: 'Legal spouse, marriage partner, business partnerships, public interactions, foreign residence, contracts',
    significations: [
      'Marital compatibility, life partner qualities',
      'Business alliances, joint ventures and clients',
      'Public dealings and social diplomacy',
      'Foreign travel and settlement'
    ],
    defaultColor: '#1e293b',
    color: '#1e293b',
    borderColor: '#ec4899',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60',
    notes: 'The Western horizon. Mirror to the self, governing intimate companionship and contracts.'
  },
  {
    id: 8,
    sanskrit: 'Randhra / Ayur Bhava (आयु भाव)',
    name: '8th House - Longevity & Occult',
    hindiName: 'अष्टम भाव - आयु / गुप्त विद्या',
    category: 'Dusthana (Difficult) & Moksha',
    rulingSign: 8,
    karakas: ['Saturn'],
    bodyParts: 'External genitalia, excretory organs, perineum',
    domains: 'Longevity (Ayushya), sudden windfalls/losses, inheritance, occult sciences, research, transformations, mysteries',
    significations: [
      'Span of life, mode of mortality and hazards',
      'Unearned wealth, inheritance, insurance, wills',
      'Astrology, esoteric knowledge, deep research',
      'Sudden upheavals, scandals and regeneration'
    ],
    defaultColor: '#0f172a',
    color: '#0f172a',
    borderColor: '#a855f7',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=500&auto=format&fit=crop&q=60',
    notes: 'House of the unseen, psychological rebirth, kundalini awakening and secret assets.'
  },
  {
    id: 9,
    sanskrit: 'Dharma Bhava (धर्म भाव)',
    name: '9th House - Fortune & Dharma',
    hindiName: 'नवम भाव - भाग्य / धर्म',
    category: 'Trikona (Dharma Triad - Most Auspicious)',
    rulingSign: 9,
    karakas: ['Jupiter', 'Sun'],
    bodyParts: 'Thighs, hips, femoral arteries',
    domains: 'Dharma, good fortune (Bhagya), father, spiritual preceptors (Gurus), pilgrimages, higher philosophy, laws',
    significations: [
      'Providential grace, supreme luck and virtue',
      'Father and relationship with mentors/gurus',
      'Long-distance sacred journeys and temple visits',
      'Moral code, ethics, theology and higher education'
    ],
    defaultColor: '#1e293b',
    color: '#1e293b',
    borderColor: '#eab308',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60',
    notes: 'The apex of dharma and highest fortune in the natal chart.'
  },
  {
    id: 10,
    sanskrit: 'Karma Bhava (कर्म भाव)',
    name: '10th House - Career & Status',
    hindiName: 'दशम भाव - कर्म / व्यवसाय',
    category: 'Kendra (Strongest Quadrant)',
    rulingSign: 10,
    karakas: ['Sun', 'Mercury', 'Jupiter', 'Saturn'],
    bodyParts: 'Knees, joints, kneecaps, bones',
    domains: 'Profession, career achievement, public honor, government authority, leadership, social reputation',
    significations: [
      'Vocational prestige, leadership responsibilities',
      'Recognition from authorities and society',
      'Public duties, social impact and legacy',
      'Paternal influence and administrative success'
    ],
    defaultColor: '#0f172a',
    color: '#0f172a',
    borderColor: '#10b981',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60',
    notes: 'Midheaven (zenith). Governs career summit and societal standing.'
  },
  {
    id: 11,
    sanskrit: 'Labha Bhava (लाभ भाव)',
    name: '11th House - Gains & Aspirations',
    hindiName: 'एकादश भाव - लाभ / आय',
    category: 'Upachaya (Growth) & Panaphara',
    rulingSign: 11,
    karakas: ['Jupiter'],
    bodyParts: 'Shins, calves, ankles, left ear',
    domains: 'Revenues, gains (Labha), fulfillment of desires, elder siblings, network circles, social influence',
    significations: [
      'Inflow of profits, bonus revenues and dividends',
      'Accomplishment of cherished dreams and goals',
      'Elder brothers/sisters and loyal friendships',
      'Community networks, societies and patrons'
    ],
    defaultColor: '#1e293b',
    color: '#1e293b',
    borderColor: '#06b6d4',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60',
    notes: 'House of wish fulfillment. Auspicious for all natural planets to reside in.'
  },
  {
    id: 12,
    sanskrit: 'Vyaya Bhava (व्यय भाव)',
    name: '12th House - Liberation & Expenses',
    hindiName: 'द्वादश भाव - व्यय / मोक्ष',
    category: 'Dusthana & Moksha',
    rulingSign: 12,
    karakas: ['Saturn', 'Ketu'],
    bodyParts: 'Feet, toes, left eye, lymphatic system',
    domains: 'Spiritual liberation (Moksha), expenditures, foreign lands, isolation, meditation, sleep pleasures, hospitals/ashrams',
    significations: [
      'Final spiritual emancipation (Moksha)',
      'Expenditures, philanthropy and charitable spending',
      'Travel to distant overseas realms or foreign stay',
      'Sleep sanctuary, dreams, subconscious depths'
    ],
    defaultColor: '#0f172a',
    color: '#0f172a',
    borderColor: '#8b5cf6',
    bgImage: '',
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=500&auto=format&fit=crop&q=60',
    notes: 'The threshold to transcendence, solitude, deep meditation and letting go.'
  }
];
