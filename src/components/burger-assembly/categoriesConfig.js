/**
 * FOOD CATEGORIES SHOWCASE CONFIGURATION
 * -------------------------------------------------------------
 * Defines the complete interactive scroll-assembly experience for all
 * restaurant categories.
 * 
 * Requirement:
 * - First initial visit MUST start with Fish & Chips ("aur ha first me suuraat fish food aur chips se hoo")
 * - Every subsequent visit or reload cycles to the next category ("jab es page pe aau har baar naya categories mile")
 * - Interactive pills allow manual toggling anytime
 */

export const FOOD_CATEGORIES = [
  // 1. FISH & CHIPS (MUST BE FIRST / DEFAULT)
  {
    id: 'fish-chips',
    name: 'Fish & Chips',
    label: 'Fish & Chips',
    emoji: '🐟',
    tagline: 'Wild Ocean Catch & Golden Chips',
    badge: 'Aussie Seafood Tradition',
    badgeIcon: 'Fish',
    headlineLine1: 'Wild-Caught to',
    headlineLine2: 'Crispy Perfection.',
    underlineColor: '#0284c7',
    description:
      'Fresh wild-caught ocean fillets hand-crumbed in seasoned golden panko and fried to crunchy, flaky perfection. Served with daily hand-cut chips dusted in chicken salt, house-made tartare, and fresh lemon wedges.',
    chips: [
      { text: '🌊 Wild Ocean Catch', icon: '🌊' },
      { text: '🥔 Hand-Cut Chips', icon: '🥔' },
      { text: '🍋 House Tartare & Lemon', icon: '🍋' },
    ],
    heroPhoto: '/menu/plate-fish-and-chips.png',
    glassPill: 'Fried crispy to order',
    ctaPrimary: { text: 'Order Fish & Chips', link: '/menu' },
    ctaSecondary: { text: 'Explore All Seafood', link: '/menu' },
    accentColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.25)',
  },

  // 2. FLAME-GRILLED BURGERS
  {
    id: 'burgers',
    name: 'Flame Burgers',
    label: 'Flame Burgers',
    emoji: '🍔',
    tagline: 'Angus Beef & Melted Cheddar',
    badge: 'The Emerton Crown Jewel',
    badgeIcon: 'Flame',
    headlineLine1: 'Flame-Grilled to',
    headlineLine2: 'Golden Perfection.',
    underlineColor: '#e8700a',
    description:
      'Every morning our kitchen grinds 100% grass-fed Angus beef and hand-cuts daily potatoes. Sizzling hot off the open flame with double melted American cheddar, crispy woodfired bacon, and our famous secret chicken salt seasoning.',
    chips: [
      { text: '🔥 100% Open Flame', icon: '🔥' },
      { text: '🥔 Secret Chicken Salt', icon: '🥔' },
      { text: '🇦🇺 Australian Raised', icon: '🇦🇺' },
    ],
    heroPhoto: '/plate.png',
    glassPill: 'Cooked fresh to order',
    ctaPrimary: { text: 'Build your own burger', link: '/burger-builder' },
    ctaSecondary: { text: 'See full menu', link: '/menu' },
    accentColor: '#e8700a',
    glowColor: 'rgba(232, 112, 10, 0.25)',
  },

  // 3. HOT ROASTS & CARVERY
  {
    id: 'hot-roasts',
    name: 'Hot Roasts',
    label: 'Hot Roasts',
    emoji: '🍖',
    tagline: 'Slow Carvery & Pan Gravy',
    badge: 'Homers Carvery Tradition',
    badgeIcon: 'Utensils',
    headlineLine1: 'Slow-Roasted to',
    headlineLine2: 'Tender Perfection.',
    underlineColor: '#ea580c',
    description:
      'Cooked low and slow for four hours in our rotisserie carvery until melt-in-your-mouth tender. Served with crispy roasted potatoes, sweet pumpkin wedges, tender garden peas, and our signature rich pan gravy.',
    chips: [
      { text: '🍗 4-Hour Slow Roast', icon: '🍗' },
      { text: '🥔 Golden Roast Vegies', icon: '🥔' },
      { text: '🥣 Rich House Pan Gravy', icon: '🥣' },
    ],
    heroPhoto: '/menu/plate-hot-roasts.png',
    glassPill: 'Carved hot from the oven',
    ctaPrimary: { text: 'Order Hot Roast Dinner', link: '/menu' },
    ctaSecondary: { text: 'View Catering Trays', link: '/catering' },
    accentColor: '#c2410c',
    glowColor: 'rgba(194, 65, 12, 0.25)',
  },

  // 4. AROMATIC CURRIES
  {
    id: 'curries',
    name: 'Aromatic Curries',
    label: 'Aromatic Curries',
    emoji: '🍛',
    tagline: 'Butter Chicken & Garlic Naan',
    badge: 'Homers Slow-Cooked Spices',
    badgeIcon: null,
    headlineLine1: 'Simmered with',
    headlineLine2: 'Aromatic Spices.',
    underlineColor: '#d97706',
    description:
      'Tender marinated chicken simmered in a velvety sauce of ripe tomatoes, butter, cashew cream, and fragrant house-ground spices. Served alongside fluffy basmati rice and warm, blistered garlic naan.',
    chips: [
      { text: '🌿 Hand-Ground Spices', icon: '🌿' },
      { text: '🍚 Fluffy Basmati Rice', icon: '🍚' },
      { text: '🫓 Warm Garlic Naan', icon: '🫓' },
    ],
    heroPhoto: '/menu/plate-butter-chicken.png',
    glassPill: 'Slow-simmered daily',
    ctaPrimary: { text: 'Order Curries & Naan', link: '/menu' },
    ctaSecondary: { text: 'See Full Menu', link: '/menu' },
    accentColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.25)',
  },

  // 5. CHARCOAL ROTISSERIE CHICKEN
  {
    id: 'chickens',
    name: 'Charcoal Chicken',
    label: 'Charcoal Chicken',
    emoji: '🍗',
    tagline: 'Whole Rotisserie & Chips',
    badge: 'Real Charcoal Rotisserie',
    badgeIcon: 'Flame',
    headlineLine1: 'Rotisserie Spun to',
    headlineLine2: 'Crispy & Juicy.',
    underlineColor: '#f97316',
    description:
      'Fresh Australian chicken seasoned in Homer\'s secret herbs, slow-spun over natural glowing charcoal embers until the skin is golden and crisp, while the meat stays succulent and bursting with flavour.',
    chips: [
      { text: '🔥 Real Charcoal Spun', icon: '🔥' },
      { text: '🍟 Mountain of Hot Chips', icon: '🍟' },
      { text: '🧄 Creamy Garlic Toum', icon: '🧄' },
    ],
    heroPhoto: '/menu/plate-charcoal-chicken.png',
    glassPill: 'Spun fresh on charcoal',
    ctaPrimary: { text: 'Order Charcoal Chicken', link: '/menu' },
    ctaSecondary: { text: 'View Family Deals', link: '/menu' },
    accentColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.25)',
  },
];
