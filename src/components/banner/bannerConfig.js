/**
 * PAGE BANNER MOTION & AMBIENCE CONFIGURATION
 * -------------------------------------------------------------
 * Centralized design and motion tunables for all 6 page-header banners.
 */

export const BANNER_CONFIG = {
  // Common Reveal & Timing
  reveal: {
    badgeSlideDuration: 0.5,
    wordDuration: 0.65,
    wordStagger: 0.08,
    orderDelay: 0.6,
    subtitleDelay: 0.45,
    decorEntranceDelay: 0.65,
    lightSweepDelay: 0.75,
    ease: [0.22, 1, 0.36, 1],
  },

  // Layer 0: Background Photo & Breathing Radial Glow
  background: {
    kenBurnsScale: [1.0, 1.06, 1.0],
    kenBurnsDuration: 20,
    radialGlowDuration: 5,
    glowOpacityMin: 0.25,
    glowOpacityMax: 0.45,
    glowColor: 'rgba(232, 112, 10, 0.35)',
  },

  // Layer 1: Ambient Embers Particle Field
  embers: {
    desktopCount: 14,
    mobileCount: 6,
    minRadius: 1.2,
    maxRadius: 2.8,
    minSpeed: 0.25,
    maxSpeed: 0.65,
    baseAlphaMin: 0.08,
    baseAlphaMax: 0.22,
    colors: ['#ea580c', '#f97316', '#fb923c', '#fbbf24'],
  },

  // Mouse Parallax (Desktop Only)
  parallax: {
    strength: 14,
    smoothing: 0.07,
  },

  // Variant 1: Menu Showcase
  menu: {
    floatY: 14,
    floatRotate: 3,
    burgerDuration: 7.2,
    curryDuration: 6.8,
    fishDuration: 7.6,
    chickenDuration: 6.4,
  },

  // Variant 2: Burger Builder
  builder: {
    layerStagger: 0.1,
    dropDuration: 0.55,
    bounceStiffness: 450,
    bounceDamping: 22,
    wobbleDuration: 4.2,
  },

  // Variant 3: Catering
  catering: {
    lidLiftInterval: 4.5,
    confettiCount: 16,
    noticePulseDuration: 3.0,
  },

  // Variant 4: Order Online
  order: {
    scooterDuration: 5.5,
    scooterInterval: 7.0,
    rippleInterval: 2.6,
    bagBounceDuration: 3.4,
  },

  // Variant 5: Our Story
  story: {
    flameDuration: 1.8,
    countUpDuration: 1.2,
    saltGrainCount: 12,
  },

  // Variant 6: Contact
  contact: {
    pinDropDuration: 0.8,
    phoneWiggleInterval: 5.0,
    rippleDuration: 2.8,
  },
};
