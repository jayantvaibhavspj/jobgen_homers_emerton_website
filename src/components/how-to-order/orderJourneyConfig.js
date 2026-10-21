/**
 * ORDER JOURNEY CONFIGURATION
 * -----------------------------------------------------------------
 * Central configuration object for all timeline timings, travel speeds,
 * micro-animation delays, particle counts, and bonus feature toggles.
 */
export const ORDER_JOURNEY_CONFIG = {
  // Timeline Orchestration
  triggerStart: 'top 65%',            // When the section becomes ~35% visible
  totalDuration: 4.5,                 // Total journey animation duration (seconds)
  cardEntranceDuration: 0.65,         // Duration for each card to spring up
  tokenTravelDuration: 0.85,          // Time for order token to travel from card to card
  
  // Card Visual States
  cardActiveLift: -6,                 // Card Y lift (px) when active
  cardHoverLift: -4,                  // Card Y lift (px) on hover
  maxTiltDeg: 4,                      // Max desktop 3D cursor tilt angle (deg)
  
  // Ambient Loops
  energyPulseInterval: 6.0,           // Seconds between subtle connector line energy waves
  phoneRingInterval: 4.5,             // Seconds between subtle phone wiggles
  
  // Feature Toggles (Bonuses)
  features: {
    enableOpenClosedAwareness: true,  // Bonus A: Reads live Sydney operating hours for Step 3
    enableKitchenTicket: true,        // Bonus B: Thermal receipt printing animation below cards
    enableEnergyPulse: true,          // Subtle traveling glow along path after completion
    enableCard3DTilt: true,           // Desktop cursor-follow 3D tilt
    enableHighlightSweep: true,       // Orange marker underline on "middleman markup"
  },
};
