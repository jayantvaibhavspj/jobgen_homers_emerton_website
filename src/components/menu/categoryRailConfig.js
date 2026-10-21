/**
 * CATEGORY CARD RAIL - MOTION & DESIGN TUNABLES
 * -------------------------------------------------------------
 * All sizing, animation springs, lift heights, and glow settings
 * are gathered here for easy creative tuning.
 */

export const CATEGORY_RAIL_CONFIG = {
  // Sizing tokens (desktop & mobile)
  dimensions: {
    desktopWidth: 140, // Width in pixels (128-150px range)
    desktopHeight: 180, // Height in pixels (170-190px range)
    mobileWidth: 108, // Width in pixels for ~2.3 visible cards on mobile
    mobileHeight: 145, // Height in pixels for mobile
    borderRadius: '24px',
    imageOverflowDesktop: '-22px', // 3D overflow pop-out height
    imageOverflowMobile: '-16px',
  },

  // Motion & spring physics
  springs: {
    activeGlider: {
      type: 'spring',
      stiffness: 420,
      damping: 32,
      mass: 0.8,
    },
    hoverCard: {
      type: 'spring',
      stiffness: 360,
      damping: 24,
    },
    imagePop: {
      type: 'spring',
      stiffness: 440,
      damping: 22,
    },
    gridItem: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  // Hover & Active States
  interactions: {
    hoverLiftY: -6, // Pixels to lift on hover
    hoverImageScale: 1.08, // Image scale on hover
    hoverImageRotate: 3, // Degrees tilt on hover
    activeImageScale: 1.12, // Image scale when selected (spring pop)
    pressScale: 0.97, // Active press feedback scale
  },

  // Colors & Glow Accents (matching brand tokens)
  accents: {
    orangeRing: '#e8700a',
    orangeRingWidth: '2px',
    activeGlow: '0 8px 24px -2px rgba(232, 112, 10, 0.28)',
    activeBackground: 'linear-gradient(180deg, #fffaf5 0%, #ffffff 50%, #fff2e5 100%)',
    inactiveBackground: '#ffffff',
  },

  // Rail Scroll Configuration
  rail: {
    scrollCardCount: 3, // Number of cards to jump per arrow click
    edgeFadeWidth: '36px', // Soft gradient mask width on left/right edges
    staggerDelay: 0.05, // Stagger interval for entrance
  },
};
