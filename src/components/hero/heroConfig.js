/**
 * HOMERS EMERTON - HERO CONFIGURATION
 * Single source of truth for all hero copy, playlist clips, layout breakpoints, and motion settings.
 */

// =========================================================================
// 1. EDITABLE HERO CONTENT (SINGLE OBJECT FOR ALL HERO TEXT & COPY)
// =========================================================================
export const heroContent = {
  logo: {
    src: "/logo.png",
    alt: "Homers Emerton Official Logo",
  },
  lunchPill: {
    anchor: "Lunch specials from $12.90",
    subtext: "100% Australian Beef & Seafood",
    pingColor: "#e8700a",
  },
  headline: {
    line1: ["Hot", "&", "fresh,"],
    line2: ["Made", "to"],
    signature: "order.",
    words: ["Hot", "&", "fresh,", "Made", "to"],
  },
  weather: {
    defaultText: "21°C · Emerton Takeaway",
    tagline: "Hot & ready in 15 mins",
  },
  ctas: {
    primary: {
      text: "See the menu",
      link: "/menu",
    },
    secondary: {
      text: "Order Delivery",
      badge: "UberEats",
      link: "https://www.ubereats.com/au/store/homers-emerton/PRuaVD1CQkiuOPbaFMDu4Q",
    },
  },
  stats: [
    { title: "Flame-Grilled", subtitle: "Premium Angus Patties" },
    { title: "Fresh Daily", subtitle: "Crumbed Fish & Salads", hasBorder: true },
    { title: "10+ Years", subtitle: "Family-Run in Emerton", countUpTarget: 10, suffix: "+ Years" },
  ],
  scrollCue: {
    text: "Scroll to taste",
    targetId: "plate-rise",
  },
};

// =========================================================================
// 2. HERO CLIPS PLAYLIST (DYNAMIC PLAYLIST CONFIGURATION)
// =========================================================================
export const VIDEO_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_HERO_VIDEO_BASE) || "";

export const heroClips = [
  {
    id: "clip-01",
    originalPrefix: "Cook_grilling_burgers_",
    video1080: `${VIDEO_BASE_URL}/hero/clip-01.mp4`,
    video720: `${VIDEO_BASE_URL}/hero/clip-01-720.mp4`,
    poster: `${VIDEO_BASE_URL}/hero/clip-01-poster.webp`,
    caption: "Flame-Grilled Burger",
    menuLink: "/menu#burgers",
    duration: 10,
  },
  {
    id: "clip-02",
    originalPrefix: "Cook_carving_roasted_chicken_",
    video1080: `${VIDEO_BASE_URL}/hero/clip-02.mp4`,
    video720: `${VIDEO_BASE_URL}/hero/clip-02-720.mp4`,
    poster: `${VIDEO_BASE_URL}/hero/clip-02-poster.webp`,
    caption: "Hot Roast Chicken",
    menuLink: "/menu#chickens",
    duration: 10,
  },
  {
    id: "clip-03",
    originalPrefix: "Cook_preparing_curry_in_kitchen_",
    video1080: `${VIDEO_BASE_URL}/hero/clip-03.mp4`,
    video720: `${VIDEO_BASE_URL}/hero/clip-03-720.mp4`,
    poster: `${VIDEO_BASE_URL}/hero/clip-03-poster.webp`,
    caption: "Aromatic Curry",
    menuLink: "/menu#curries",
    duration: 10,
  },
  {
    id: "clip-04",
    originalPrefix: "Cook_preparing_chips_and_milkshake_",
    video1080: `${VIDEO_BASE_URL}/hero/clip-04.mp4`,
    video720: `${VIDEO_BASE_URL}/hero/clip-04-720.mp4`,
    poster: `${VIDEO_BASE_URL}/hero/clip-04-poster.webp`,
    caption: "Chips & Shakes",
    menuLink: "/menu#sides",
    duration: 10,
  },
  {
    id: "clip-05",
    originalPrefix: "Cook_grilling_steak_and_eggs_",
    video1080: `${VIDEO_BASE_URL}/hero/clip-05.mp4`,
    video720: `${VIDEO_BASE_URL}/hero/clip-05-720.mp4`,
    poster: `${VIDEO_BASE_URL}/hero/clip-05-poster.webp`,
    caption: null, // "Steak & Eggs" dropped: no matching dish or category in menu data
    menuLink: null,
    duration: 10,
  },
  {
    id: "clip-06",
    originalPrefix: "Cook_prepares_breakfast_on_griddle_",
    video1080: `${VIDEO_BASE_URL}/hero/clip-06.mp4`,
    video720: `${VIDEO_BASE_URL}/hero/clip-06-720.mp4`,
    poster: `${VIDEO_BASE_URL}/hero/clip-06-poster.webp`,
    caption: null, // "Big Breakfast" dropped: no matching dish or category in menu data
    menuLink: null,
    duration: 10,
  },
  {
    id: "clip-07",
    originalPrefix: "Cook_making_chocolate_milkshake_",
    video1080: `${VIDEO_BASE_URL}/hero/clip-07.mp4`,
    video720: `${VIDEO_BASE_URL}/hero/clip-07-720.mp4`,
    poster: `${VIDEO_BASE_URL}/hero/clip-07-poster.webp`,
    caption: "Chocolate Milkshake",
    menuLink: "/menu#drinks",
    duration: 10,
  },
];

// =========================================================================
// 3. LAYOUT, ASPECT RATIO & ADAPTIVE CONTRAST TUNABLES
// =========================================================================
export const heroSettings = {
  // Breakpoint for overlaying text block on video vs moving text into solid section below video.
  // >= 1100px: Video is exact 16:9; headline & CTAs sit on video; info strip sits below.
  // < 1100px: Video is exact 16:9; all text & CTAs sit cleanly below video in solid dark section.
  BREAKPOINT_OVERLAY: 1100,

  // Full-Frame 16:9 fit mode: video container is strictly width: 100%; aspect-ratio: 16/9;
  // Guaranteed zero top/bottom cropping and zero side cropping at any viewport width.
  FIT: "full-frame",

  // Zero zoom / Ken Burns (0 = OFF; no scale transform applied, zero zoom cropping)
  KEN_BURNS: 0,

  // Scrim strength overlay (0 = NONE; completely deleted/rendered null, raw video colors only)
  SCRIM_STRENGTH: 0,

  // Text alignment: "left" | "center" (default "left")
  TEXT_ALIGN: "left",

  // Crossfade transition duration between clips (seconds)
  CROSSFADE_DURATION: 0.9,

  // Adaptive shadow (samples video luminance to dynamically scale text shadow without any video overlay)
  ADAPTIVE_SHADOW: true,
  SHADOW_MIN: 0.6,
  SHADOW_MAX: 1.4,

  // Feature toggles
  SHOW_HERO_LOGO_DESKTOP: false, // Desktop already has logo badge in floating navbar; keep hero clean
  CAPTION_ENABLED: true,
  PROGRESS_ENABLED: true,
  EMBERS_ENABLED: false,

  // Ambient backdrop and edge fade settings for wide screens
  SIDE_FILL: "none", // "none" | "solid" (no side fill needed as video is 100% full-width)
  EDGE_FADE: 0, // 0 = full edge-to-edge, zero side mask
  AMBIENT_BLUR: 0,
  TEXT_Y: 78, // vertical placement percentage (lower position)

  // Poster slideshow interval for data-saver / slow connections (seconds)
  POSTER_SLIDESHOW_INTERVAL: 4,

  // Self-contained glass background styling for pills and secondary CTA
  PILL_GLASS_STYLE: {
    background: "rgba(18, 12, 8, 0.78)",
    backdropFilter: "blur(10px) saturate(1.1)",
    WebkitBackdropFilter: "blur(10px) saturate(1.1)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
  },

  // Color for the signature word "order." (bright, on-brand warm gold-orange)
  SIGNATURE_COLOR: "#ff9a3d",
};
