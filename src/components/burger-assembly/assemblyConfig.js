/**
 * BURGER ASSEMBLY CINEMATIC TIMELINE CONFIGURATION
 * -------------------------------------------------------------
 * All timing progress ranges, drop physics, bounce strengths, and particle counts.
 * Tweak any value here to adjust the speed or feel of the scroll-scrubbed sequence.
 */
export const ASSEMBLY_CONFIG = {
  // Pin & Scrub Tuning
  pinLength: '+=260%',            // Scroll distance while pinned (260% of viewport)
  scrubSmoothness: 0.6,          // ScrollTrigger scrub smoothing lag (seconds)
  dropDistance: -750,            // Starting Y offset for falling burger layers (px)
  mobilePinDuration: 1.8,        // Mobile autoplay duration in seconds if triggered

  // Timeline Progress Windows (0.00 -> 1.00)
  timeline: {
    plateEnter:   [0.00, 0.10],   // Empty plate slides in + shadow grows
    bunBottom:    [0.10, 0.16],   // Bottom toasted brioche bun lands
    lettuce:      [0.16, 0.22],   // Crisp curly lettuce & house mayo
    tomatoPickle: [0.22, 0.28],   // Sliced tomato, onion rings & pickle
    patty1:       [0.28, 0.34],   // First flame-grilled Angus patty
    cheese1:      [0.34, 0.40],   // First melted American cheddar drip
    bacon:        [0.40, 0.46],   // Crispy woodfired bacon strips
    patty2:       [0.46, 0.52],   // Second Angus beef patty
    cheese2:      [0.52, 0.57],   // Second cheddar melt slump
    bunTop:       [0.57, 0.63],   // Top sesame seed bun with squash/stretch
    friesPour:    [0.63, 0.73],   // Golden chips cascade into bowl
    lemonParsley: [0.70, 0.76],   // Lemon wedge and parsley garnish drop
    chickenSalt:  [0.73, 0.78],   // Chicken salt specks rain over chips
    crossfade:    [0.78, 0.85],   // Crossfade to real photo with warm flash
    textReveal:   [0.82, 1.00],   // Right column story card reveals
  },

  // Layer Physics & Bounces
  physics: {
    squashY: 0.92,
    stretchY: 1.03,
    topBunSquashY: 0.88,
    topBunStretchY: 1.05,
    stackCompressionPx: 3,
    plateMicroShakePx: 2.5,
  },

  // Particle Counts
  particles: {
    chickenSaltDesktop: 30,
    chickenSaltMobile: 12,
    impactCrumbs: 8,
    sizzleEmbers: 6,
  },

  // Feature Toggles (Bonus Features)
  features: {
    enableBrandedByFire: true,         // White-hot heat bloom on "Golden Perfection." cooling to charcoal
    enableCheeseDripTransition: true,   // SVG melted cheese drip divider at section top
    enableMouseTilt: true,              // Subtle 3D mouse parallax tilt after sequence completion
    maxMouseTiltDeg: 6,
  },
};
