/**
 * PARTNER PAGE MOTION & TIMING CONFIGURATION
 * -------------------------------------------------------------
 * Centralized easing, durations, and animation variants.
 * Uses the site-wide easing: cubic-bezier(0.22, 1, 0.36, 1)
 */

export const PARTNER_EASE = [0.22, 1, 0.36, 1];

export const MOTION_CONFIG = {
  ease: PARTNER_EASE,
  sectionEntranceDuration: 0.6,
  staggerDelay: 0.08,
  
  // Floating phone mockup
  mockupFloat: {
    y: [-10, 10, -10],
    duration: 7,
  },
  
  // Character portraits soft bob
  jennyBob: {
    y: [-6, 6, -6],
    duration: 5.5,
  },
  oliviaBob: {
    y: [6, -6, 6],
    duration: 5.8,
  },
  
  // Ambient radial glow breathing
  radialGlow: {
    opacity: [0.3, 0.5, 0.3],
    scale: [0.96, 1.04, 0.96],
    duration: 6,
  },
  
  // Card hover
  hoverCard: {
    y: -6,
    transition: { duration: 0.3, ease: PARTNER_EASE },
  },
  
  // Image hover zoom
  hoverImage: {
    scale: 1.05,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Section Reveal Variants for Framer Motion
export const sectionFadeUp = (shouldReduceMotion = false, delay = 0) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, margin: '-40px' },
      transition: { duration: 0.4 },
    };
  }
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: {
      duration: MOTION_CONFIG.sectionEntranceDuration,
      delay,
      ease: PARTNER_EASE,
    },
  };
};

export const staggerContainer = (staggerChildren = 0.08) => ({
  initial: {},
  whileInView: {
    transition: {
      staggerChildren,
    },
  },
  viewport: { once: true, margin: '-40px' },
});

export const childCardReveal = (shouldReduceMotion = false) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    };
  }
  return {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: PARTNER_EASE },
  };
};
