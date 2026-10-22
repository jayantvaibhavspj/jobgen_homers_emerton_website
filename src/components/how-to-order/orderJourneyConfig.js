/**
 * ORDER JOURNEY CONFIGURATION
 * -----------------------------------------------------------------
 * Central configuration object for all timeline timings, travel speeds,
 * micro-animation delays, particle counts, and bonus feature toggles.
 */
export const ORDER_JOURNEY_CONFIG = {
  // Timeline Orchestration (High-speed snappy delivery)
  triggerStart: 'top 82%',            // Starts promptly when section scrolls into view
  totalDuration: 1.8,                 // Total journey animation duration ~1.8s (was 4.5s)
  cardEntranceDuration: 0.32,         // Punchy spring entrance (was 0.65s)
  tokenTravelDuration: 0.36,          // Fast, dynamic order token transit (was 0.85s)
  
  // Card Visual States
  cardActiveLift: -6,                 // Card Y lift (px) when active
  cardHoverLift: -4,                  // Card Y lift (px) on hover
  maxTiltDeg: 4,                      // Max desktop 3D cursor tilt angle (deg)
  
  // Ambient Loops
  energyPulseInterval: 3.0,           // Seconds between subtle connector line energy waves
  phoneRingInterval: 2.8,             // Seconds between subtle phone wiggles
  
  // Feature Toggles (Bonuses)
  features: {
    enableOpenClosedAwareness: true,  // Bonus A: Reads live Sydney operating hours for Step 3
    enableKitchenTicket: true,        // Bonus B: Thermal receipt printing animation below cards
    enableEnergyPulse: true,          // Subtle traveling glow along path after completion
    enableCard3DTilt: true,           // Desktop cursor-follow 3D tilt
    enableHighlightSweep: true,       // Orange marker underline on "middleman markup"
  },
};
