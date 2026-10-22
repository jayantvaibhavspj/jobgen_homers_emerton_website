/**
 * ============================================================================
 * HOMERS EMERTON - FOOTER MOTION-GRAPHIC SCENE CONFIGURATION
 * ============================================================================
 * "A night at the grill: the shop is alive, orders are going out"
 * All tweakable values (timings, particle counts, parallax factors, opacities)
 * are centralized in this single configuration object.
 */

export const FOOTER_SCENE_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. DIMENSIONS, HEIGHT & LAYOUT
  // --------------------------------------------------------------------------
  dimensions: {
    heightPercentDesktop: 100, // 100% full footer coverage
    heightPercentTablet: 100,
    heightPercentMobile: 100,
    maxHeightDesktopPx: null,
    minHeightDesktopPx: null,
    maxHeightMobilePx: null,
    // Gentle gradient mask at very top so it blends smoothly under road ticker
    maskStopSolid: '85%',     // Fully visible up to 85% height
    maskStopMid: '95%',       // Soft fade near top
    maskStopTop: '100%',      // Blends into charcoal top border
  },
  sceneOpacity: 0.95, // Rich, vibrant shopfront visibility

  // --------------------------------------------------------------------------
  // 2. PALETTE & LIGHTING TOKENS
  // --------------------------------------------------------------------------
  palette: {
    charcoalBg: '#17110d',
    deepBrown: '#241812',
    silhouetteDark: '#120c09',
    skyTop: '#0a0807',
    skyBottom: '#1a130e',
    amberGlow: '#fbbf24',
    orangeBurnt: '#e8700a',
    orangeGlow: '#ff8a1f',
    flameYellow: '#ffd166',
    flameCore: '#ffffff',
    cream: '#fbf6f0',
    windowWarmth: '#f59e0b',
    neonOpenGreen: '#10b981',
    scooterHeadlight: '#fff4cc',
  },

  // --------------------------------------------------------------------------
  // 3. PARALLAX STRENGTHS (pixels displaced under full mouse swing, desktop only)
  // --------------------------------------------------------------------------
  parallax: {
    sky: 2.5,        // distant stars, moon & clouds
    skyline: 5.0,    // far suburban rooftops & water tank
    shop: 8.5,       // shopfront, awning, windows
    grill: 11.0,     // grill corner, flames, counter
    foreground: 13.0,// road, scooter, salt shaker
    smoothing: 0.08, // spring lerp factor
  },

  // --------------------------------------------------------------------------
  // 4. SKY & CELESTIAL
  // --------------------------------------------------------------------------
  sky: {
    starCountDesktop: 34,
    starCountTablet: 22,
    starCountMobile: 12,
    starTwinkleMinDuration: 1.8, // seconds
    starTwinkleMaxDuration: 4.5,
    moonDriftDuration: 48,       // seconds for gentle lunar float
    cloudDriftDuration: 65,      // seconds for cloud pass
    cloudOpacity: 0.18,
  },

  // --------------------------------------------------------------------------
  // 5. FAR SUBURBAN SKYLINE
  // --------------------------------------------------------------------------
  skyline: {
    windowCount: 8,
    windowToggleInterval: 2600, // ms between a random window switching on/off
    wireSwayDuration: 6,        // seconds
  },

  // --------------------------------------------------------------------------
  // 6. HOMERS SHOPFRONT & SIGNS
  // --------------------------------------------------------------------------
  shop: {
    stringLightCount: 14,
    stringLightStagger: 0.09,   // seconds delay between each bulb lighting up
    signNeonGlowMin: 0.75,
    signNeonGlowMax: 1.0,
    signFlickerChance: 0.08,    // occasional neon micro-flicker
    openSignBlinkPeriod: 2.4,   // seconds per soft blink
    windowGlowIntensity: 0.85,
  },

  // --------------------------------------------------------------------------
  // 7. CHARCOAL GRILL & BURGER PATTY FLIP
  // --------------------------------------------------------------------------
  grill: {
    flameFlickerSpeed: 0.16,    // seconds for organic flame morph
    emberCountDesktop: 14,
    emberCountMobile: 5,
    emberFloatSpeed: 0.7,
    pattyFlipInterval: 7500,    // ms (~7.5s loop)
    pattyFlipDuration: 1.35,    // seconds in the air
    pattyFlipArcHeight: 48,     // px upward arc
    sizzleSparkBurstCount: 10,  // sparks that burst on patty landing
    flameLeanMaxPx: 12,         // flame lean displacement towards cursor
  },

  // --------------------------------------------------------------------------
  // 8. CHICKEN-SALT SEASONING CHIPS
  // --------------------------------------------------------------------------
  seasoning: {
    interval: 9800,             // ms (~10s loop)
    shakeDuration: 1.8,         // seconds of tilt and shake
    speckCount: 16,             // golden salt grains raining down
    basketWarmth: 0.9,
  },

  // --------------------------------------------------------------------------
  // 9. ROAD & DELIVERY SCOOTER
  // --------------------------------------------------------------------------
  delivery: {
    forwardInterval: 8200,      // ms between outbound delivery runs
    forwardDuration: 6.8,       // seconds to cross the screen
    returnInterval: 17500,      // ms between return runs (opposite direction)
    returnDuration: 7.2,        // seconds
    headlightBeamAngle: 35,     // degrees
    headlightBeamOpacity: 0.35,
    dottedRouteGlowDuration: 3, // seconds
  },

  // --------------------------------------------------------------------------
  // 10. FLOATING ORDER TICKETS
  // --------------------------------------------------------------------------
  tickets: {
    countDesktop: 4,
    countMobile: 2,
    floatDurationMin: 5.0,      // seconds
    floatDurationMax: 8.0,
    opacity: 0.28,              // low opacity so it never distracts
  },

  // --------------------------------------------------------------------------
  // 11. AMBIENT LIGHTING & DAY/NIGHT BREATHING
  // --------------------------------------------------------------------------
  lighting: {
    radialGlowMin: 0.24,
    radialGlowMax: 0.42,
    radialGlowPeriod: 5.2,      // seconds loop
    dayNightCyclePeriod: 58,    // seconds slow cycle
    scrimOverlayDarkness: 0.22, // balanced scrim so the shop artwork shines through cleanly
  },

  // --------------------------------------------------------------------------
  // 12. ENTRANCE & ACCESSIBILITY
  // --------------------------------------------------------------------------
  entrance: {
    duration: 1.2,              // seconds for initial reveal when scrolled into view
    riseDistance: 35,           // px rise from bottom
  },
  accessibility: {
    reducedMotionOpacity: 0.38, // static snapshot opacity for prefers-reduced-motion
  },
};
