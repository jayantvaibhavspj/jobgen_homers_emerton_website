import React from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneShop Layer (Phase 1: Clearance & Cleanup)
 * Authentic Australian takeaway restaurant facade illustration.
 *
 * Rules:
 * - Roof parapet & cornice moulding: y = 34 to 95
 * - Glowing neon "HOMERS" fascia sign: y = 48 to 88 (cleanly on the roof parapet, ABOVE awning & text)
 * - Burnt-orange & charcoal striped canopy awning: y = 95 to 140
 * - Scalloped valance fringe: y = 140 to 152
 * - Festoon string lights: y = 136 to 146 (hangs in clearance gap, stops above text area)
 * - 40px empty clearance gap: y = 152 to 192
 * - BEHIND THE TEXT: Pure flat, dark, opaque wall color (#17100b).
 *   No window glass, no mullions, no amber window glow, no hanging pendant lamps.
 * - Outside text container on far right (x > 1320): complete clean door with glowing green neon "OPEN" board.
 */
export default function SceneShop({
  isPlaying = true,
  isReducedMotion = false,
  isMobile = false,
  hasEntered = true,
}) {
  const { shop } = FOOTER_SCENE_CONFIG;
  const bulbCount = isMobile ? 12 : 24;

  // Generate festoon string bulb coordinates draped along the awning valance (spanning x: 60 to 1380)
  const bulbs = Array.from({ length: bulbCount }, (_, i) => {
    const t = i / (bulbCount - 1); // 0 to 1
    const x = 60 + t * 1320;
    // Gentle catenary sag curve under awning valance (strictly above y = 150)
    const sag = Math.sin(t * Math.PI) * 7 + Math.sin(t * Math.PI * 3) * 1.5;
    const y = 138 + sag;
    return { id: i, x, y };
  });

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYTop slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shop brick wall base - flat, dark, opaque #17100b */}
          <linearGradient id="shopWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e140e" />
            <stop offset="25%" stopColor="#17100b" />
            <stop offset="100%" stopColor="#17100b" />
          </linearGradient>

          {/* Wall feTurbulence noise tile for plaster/brick texture at 7% opacity */}
          <filter id="wallPlasterNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0.95  0 1 0 0 0.90  0 0 1 0 0.85  0 0 0 0.07 0" />
          </filter>

          {/* Subtle architectural mortar lines pattern */}
          <pattern id="mortarPattern" width="160" height="28" patternUnits="userSpaceOnUse">
            <line x1="0" y1="27" x2="160" y2="27" stroke="#22160e" strokeWidth="1" strokeDasharray="38, 2, 48, 2, 68, 2" opacity="0.65" />
            <line x1="40" y1="0" x2="40" y2="27" stroke="#22160e" strokeWidth="0.8" opacity="0.45" />
            <line x1="120" y1="0" x2="120" y2="27" stroke="#22160e" strokeWidth="0.8" opacity="0.45" />
          </pattern>

          {/* Awning underside dark shadow band */}
          <linearGradient id="awningUndersideShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0503" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#0d0805" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#17100b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#17100b" stopOpacity="0" />
          </linearGradient>

          {/* Soft vignette gradients for left and right flanks */}
          <linearGradient id="wallVignetteL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#080402" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#17100b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#17100b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wallVignetteR" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#080402" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#17100b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#17100b" stopOpacity="0" />
          </linearGradient>

          {/* Warm diagonal light cones from exterior wall lamps */}
          <linearGradient id="leftLampConeGrad" x1="15%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe4b5" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#17100b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rightLampConeGrad" x1="85%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe4b5" stopOpacity="0.13" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#17100b" stopOpacity="0" />
          </linearGradient>

          {/* Awning stripes - iconic Homers burnt orange & dark charcoal */}
          <linearGradient id="awningStripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8700a" />
            <stop offset="2.5%" stopColor="#e8700a" />
            <stop offset="2.6%" stopColor="#180e08" />
            <stop offset="5%" stopColor="#180e08" />
            <stop offset="5.1%" stopColor="#e8700a" />
            <stop offset="7.5%" stopColor="#e8700a" />
            <stop offset="7.6%" stopColor="#180e08" />
            <stop offset="10%" stopColor="#180e08" />
            <stop offset="10.1%" stopColor="#e8700a" />
            <stop offset="12.5%" stopColor="#e8700a" />
            <stop offset="12.6%" stopColor="#180e08" />
            <stop offset="15%" stopColor="#180e08" />
            <stop offset="15.1%" stopColor="#e8700a" />
            <stop offset="17.5%" stopColor="#e8700a" />
            <stop offset="17.6%" stopColor="#180e08" />
            <stop offset="20%" stopColor="#180e08" />
            <stop offset="20.1%" stopColor="#e8700a" />
            <stop offset="22.5%" stopColor="#e8700a" />
            <stop offset="22.6%" stopColor="#180e08" />
            <stop offset="25%" stopColor="#180e08" />
            <stop offset="25.1%" stopColor="#e8700a" />
            <stop offset="27.5%" stopColor="#e8700a" />
            <stop offset="27.6%" stopColor="#180e08" />
            <stop offset="30%" stopColor="#180e08" />
            <stop offset="30.1%" stopColor="#e8700a" />
            <stop offset="32.5%" stopColor="#e8700a" />
            <stop offset="32.6%" stopColor="#180e08" />
            <stop offset="35%" stopColor="#180e08" />
            <stop offset="35.1%" stopColor="#e8700a" />
            <stop offset="37.5%" stopColor="#e8700a" />
            <stop offset="37.6%" stopColor="#180e08" />
            <stop offset="40%" stopColor="#180e08" />
            <stop offset="40.1%" stopColor="#e8700a" />
            <stop offset="42.5%" stopColor="#e8700a" />
            <stop offset="42.6%" stopColor="#180e08" />
            <stop offset="45%" stopColor="#180e08" />
            <stop offset="45.1%" stopColor="#e8700a" />
            <stop offset="47.5%" stopColor="#e8700a" />
            <stop offset="47.6%" stopColor="#180e08" />
            <stop offset="50%" stopColor="#180e08" />
            <stop offset="50.1%" stopColor="#e8700a" />
            <stop offset="52.5%" stopColor="#e8700a" />
            <stop offset="52.6%" stopColor="#180e08" />
            <stop offset="55%" stopColor="#180e08" />
            <stop offset="55.1%" stopColor="#e8700a" />
            <stop offset="57.5%" stopColor="#e8700a" />
            <stop offset="57.6%" stopColor="#180e08" />
            <stop offset="60%" stopColor="#180e08" />
            <stop offset="60.1%" stopColor="#e8700a" />
            <stop offset="62.5%" stopColor="#e8700a" />
            <stop offset="62.6%" stopColor="#180e08" />
            <stop offset="65%" stopColor="#180e08" />
            <stop offset="65.1%" stopColor="#e8700a" />
            <stop offset="67.5%" stopColor="#e8700a" />
            <stop offset="67.6%" stopColor="#180e08" />
            <stop offset="70%" stopColor="#180e08" />
            <stop offset="70.1%" stopColor="#e8700a" />
            <stop offset="72.5%" stopColor="#e8700a" />
            <stop offset="72.6%" stopColor="#180e08" />
            <stop offset="75%" stopColor="#180e08" />
            <stop offset="75.1%" stopColor="#e8700a" />
            <stop offset="77.5%" stopColor="#e8700a" />
            <stop offset="77.6%" stopColor="#180e08" />
            <stop offset="80%" stopColor="#180e08" />
            <stop offset="80.1%" stopColor="#e8700a" />
            <stop offset="82.5%" stopColor="#e8700a" />
            <stop offset="82.6%" stopColor="#180e08" />
            <stop offset="85%" stopColor="#180e08" />
            <stop offset="85.1%" stopColor="#e8700a" />
            <stop offset="87.5%" stopColor="#e8700a" />
            <stop offset="87.6%" stopColor="#180e08" />
            <stop offset="90%" stopColor="#180e08" />
            <stop offset="90.1%" stopColor="#e8700a" />
            <stop offset="92.5%" stopColor="#e8700a" />
            <stop offset="92.6%" stopColor="#180e08" />
            <stop offset="95%" stopColor="#180e08" />
            <stop offset="95.1%" stopColor="#e8700a" />
            <stop offset="97.5%" stopColor="#e8700a" />
            <stop offset="97.6%" stopColor="#180e08" />
            <stop offset="100%" stopColor="#e8700a" />
          </linearGradient>

          {/* Neon sign outer glow filter */}
          <filter id="neonSignGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Bulb warm glow */}
          <radialGradient id="bulbGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff7cc" stopOpacity="1" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e8700a" stopOpacity="0" />
          </radialGradient>

          {/* Door glass subtle glow outside text area */}
          <radialGradient id="doorGlassGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#ea580c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#17100b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================== */}
        {/* SHOP BUILDING STRUCTURE                                       */}
        {/* ============================================================== */}
        <g id="shop-building">
          
          {/* Upper Parapet Roofline (y: 35 to 95) */}
          <rect x="45" y="38" width="1350" height="57" rx="2" fill="url(#shopWallGrad)" />
          
          {/* Decorative roof trim cornice moulding */}
          <rect x="40" y="34" width="1360" height="7" rx="1" fill="#382116" stroke="#4d2f20" strokeWidth="1" />
          <line x1="40" y1="35" x2="1400" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="40" y1="41" x2="1400" y2="41" stroke="#140c07" strokeWidth="1.5" />

          {/* Ground Floor Main Wall - Base flat dark opaque #17100b */}
          <rect x="0" y="140" width="1440" height="380" fill="#17100b" />

          {/* Subtle architectural brick mortar lines */}
          <rect x="0" y="140" width="1440" height="380" fill="url(#mortarPattern)" />

          {/* Inline SVG feTurbulence plaster noise tile at 7% opacity */}
          <rect x="0" y="140" width="1440" height="380" filter="url(#wallPlasterNoise)" opacity="0.07" />

          {/* Awning underside dark shadow band (darkens top zone under scallops) */}
          <rect x="0" y="140" width="1440" height="75" fill="url(#awningUndersideShadow)" />

          {/* Soft vignette flanks */}
          <rect x="0" y="140" width="220" height="380" fill="url(#wallVignetteL)" />
          <rect x="1220" y="140" width="220" height="380" fill="url(#wallVignetteR)" />

          {/* Warm diagonal light cones from exterior wall lamps (max alpha 0.15 over text, subtle slow flicker) */}
          <polygon
            points="80,180 0,520 480,520"
            fill="url(#leftLampConeGrad)"
            className="lamp-light-cone"
            style={{
              animation: (!isReducedMotion && isPlaying) ? 'lampFlickerSlow 8s ease-in-out infinite alternate' : 'none',
            }}
          />
          <polygon
            points="1350,180 960,520 1440,520"
            fill="url(#rightLampConeGrad)"
            className="lamp-light-cone"
            style={{
              animation: (!isReducedMotion && isPlaying) ? 'lampFlickerSlow 9.5s ease-in-out infinite alternate' : 'none',
            }}
          />

          {/* ============================================================ */}
          {/* FAR LEFT PATIO: Outdoor Brass Wall Sconce (x: 85, outside text) */}
          {/* ============================================================ */}
          <g className="wall-lantern" opacity="0.85">
            <rect x="85" y="160" width="6" height="10" rx="1" fill="#4a2c18" stroke="#25160d" strokeWidth="0.8" />
            <path d="M 88 163 Q 88 174 80 176" stroke="#4a2c18" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 72 177 L 88 177 L 83 173 L 77 173 Z" fill="#8d572e" stroke="#25160d" strokeWidth="0.8" />
            <circle cx="80" cy="180" r="2.5" fill="#fff7cc" />
            <circle cx="80" cy="180" r="8" fill="url(#bulbGlowGrad)" opacity="0.75" />
          </g>

          {/* ============================================================ */}
          {/* FAR RIGHT EXTERIOR: Complete Glass Door with Green OPEN Sign */}
          {/* Situated strictly at x: 1335 to 1425 (OUTSIDE the text area) */}
          {/* ============================================================ */}
          <g className="shop-doorway-pane" id="exterior-door">
            {/* Complete timber door frame */}
            <rect x="1335" y="165" width="85" height="280" rx="3" fill="#170e09" stroke="#2d1c12" strokeWidth="3" />
            {/* Glass door panel */}
            <rect x="1345" y="178" width="65" height="200" rx="2" fill="url(#doorGlassGlow)" stroke="#2d1c12" strokeWidth="1.5" />
            {/* Brass push handle attached to door */}
            <line x1="1352" y1="275" x2="1352" y2="325" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
            <line x1="1350" y1="275" x2="1355" y2="275" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            <line x1="1350" y1="325" x2="1355" y2="325" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />

            {/* Glowing Green Neon "OPEN" Sign inside door transom */}
            <g className="neon-open-sign">
              <rect x="1345" y="186" width="65" height="32" rx="4" fill="#0d0805" stroke="#10b981" strokeWidth="1.6" opacity="0.95" />
              <text
                x="1377"
                y="207"
                textAnchor="middle"
                fill="#34d399"
                fontSize="13"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="3"
                style={{
                  filter: 'drop-shadow(0 0 6px #10b981) drop-shadow(0 0 14px #059669)',
                  animation: (!isReducedMotion && isPlaying)
                    ? `neonOpenBlink ${shop.openSignBlinkPeriod}s ease-in-out infinite`
                    : 'none',
                }}
              >
                OPEN
              </text>
            </g>
          </g>

          {/* ============================================================ */}
          {/* "HOMERS EMERTON" NEON FASCIA SIGN WITH OFFICIAL LOGO         */}
          {/* y: 44 to 92, perfectly centered at x: 720                    */}
          {/* ============================================================ */}
          <g id="shop-sign">
            {/* Sign board backing */}
            <rect
              x="545"
              y="44"
              width="350"
              height="48"
              rx="6"
              fill="#180e08"
              stroke="#e8700a"
              strokeWidth="2.2"
            />
            {/* Sign inner border */}
            <rect
              x="550"
              y="48"
              width="340"
              height="40"
              rx="5"
              fill="none"
              stroke="#ea580c"
              strokeWidth="1.0"
              opacity="0.75"
            />

            {/* Official Homers Logo Badge */}
            <image
              href="/logo.png"
              xlinkHref="/logo.png"
              x="584"
              y="50"
              width="36"
              height="36"
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: 'drop-shadow(0 0 6px rgba(232,112,10,0.7))' }}
            />

            {/* Glowing "HOMERS" Text in classic script */}
            <text
              x="691"
              y="74"
              textAnchor="middle"
              fill="#fff3e0"
              fontSize="23"
              fontWeight="bold"
              fontFamily="'Kaushan Script', 'Brush Script MT', cursive"
              letterSpacing="3"
              className="homers-neon-text"
              style={{
                filter: 'drop-shadow(0 0 6px #e8700a) drop-shadow(0 0 16px #ff8a1f)',
                animation: (!isReducedMotion && isPlaying)
                  ? 'neonHomersGlow 4.2s ease-in-out infinite'
                  : 'none',
              }}
            >
              HOMERS
            </text>

            {/* Glowing Separator Dot */}
            <circle
              cx="760"
              cy="68"
              r="2.5"
              fill="#f08a2c"
              style={{ filter: 'drop-shadow(0 0 4px #f08a2c)' }}
            />

            {/* Glowing "EMERTON" Suburb Mark */}
            <text
              x="816"
              y="72.5"
              textAnchor="middle"
              fill="#f08a2c"
              fontSize="12.5"
              fontWeight="bold"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              letterSpacing="3.5"
              style={{
                filter: 'drop-shadow(0 0 4px #e8700a) drop-shadow(0 0 10px #ff8a1f)',
              }}
            >
              EMERTON
            </text>
          </g>

          {/* ============================================================ */}
          {/* AWNING (Burnt Orange & Charcoal Stripes, Spans x: 25 to 1415)*/}
          {/* Positioned at y: 95 to 152 (Scallop ends at y: 152)         */}
          {/* ============================================================ */}
          <g id="shop-awning">
            {/* Angled canopy polygon */}
            <polygon
              points="40,95 1400,95 1418,140 22,140"
              fill="url(#awningStripeGrad)"
            />
            {/* Canopy top white fabric highlight seam */}
            <line x1="40" y1="95" x2="1400" y2="95" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" />

            {/* Awning wavy scalloped valance fringe (y: 140 to 152) */}
            <path
              d="M 22 140 Q 32 152 42 140 Q 52 152 62 140 Q 72 152 82 140 Q 92 152 102 140 Q 112 152 122 140 Q 132 152 142 140 Q 152 152 162 140 Q 172 152 182 140 Q 192 152 202 140 Q 212 152 222 140 Q 232 152 242 140 Q 252 152 262 140 Q 272 152 282 140 Q 292 152 302 140 Q 312 152 322 140 Q 332 152 342 140 Q 352 152 362 140 Q 372 152 382 140 Q 392 152 402 140 Q 412 152 422 140 Q 432 152 442 140 Q 452 152 462 140 Q 472 152 482 140 Q 492 152 502 140 Q 512 152 522 140 Q 532 152 542 140 Q 552 152 562 140 Q 572 152 582 140 Q 592 152 602 140 Q 612 152 622 140 Q 632 152 642 140 Q 652 152 662 140 Q 672 152 682 140 Q 692 152 702 140 Q 712 152 722 140 Q 732 152 742 140 Q 752 152 762 140 Q 772 152 782 140 Q 792 152 802 140 Q 812 152 822 140 Q 832 152 842 140 Q 852 152 862 140 Q 872 152 882 140 Q 892 152 902 140 Q 912 152 922 140 Q 932 152 942 140 Q 952 152 962 140 Q 972 152 982 140 Q 992 152 1002 140 Q 1012 152 1022 140 Q 1032 152 1042 140 Q 1052 152 1062 140 Q 1072 152 1082 140 Q 1092 152 1102 140 Q 1112 152 1122 140 Q 1132 152 1142 140 Q 1152 152 1162 140 Q 1172 152 1182 140 Q 1192 152 1202 140 Q 1212 152 1222 140 Q 1232 152 1242 140 Q 1252 152 1262 140 Q 1272 152 1282 140 Q 1292 152 1302 140 Q 1312 152 1322 140 Q 1332 152 1342 140 Q 1352 152 1362 140 Q 1372 152 1382 140 Q 1392 152 1402 140 Q 1410 152 1418 140 L 1418 138 L 22 138 Z"
              fill="#e8700a"
            />
            {/* Awning underside shadow */}
            <rect x="40" y="140" width="1360" height="12" fill="#100804" opacity="0.75" />
          </g>

          {/* ============================================================ */}
          {/* FESTOON STRING LIGHTS (Draped Under Awning Valance)          */}
          {/* Wire at y: 136 to 146, bulbs stop completely above y: 152    */}
          {/* ============================================================ */}
          <g id="shop-string-lights">
            <path
              d="M 50 136 Q 380 146 720 146 Q 1060 146 1390 136"
              fill="none"
              stroke="#2e1c12"
              strokeWidth="1.8"
            />

            {bulbs.map((bulb, i) => {
              const delay = hasEntered ? (i * 0.04) : 0;
              return (
                <g
                  key={bulb.id}
                  className="festoon-bulb"
                  style={{
                    opacity: hasEntered ? 1 : 0,
                    transition: `opacity 0.4s ease ${delay}s`,
                    animation: (!isReducedMotion && isPlaying && hasEntered)
                      ? `bulbTwinkle 3.2s ease-in-out ${delay + 0.4}s infinite alternate`
                      : 'none',
                  }}
                >
                  <circle cx={bulb.x} cy={bulb.y} r="7.5" fill="url(#bulbGlowGrad)" opacity="0.8" />
                  <rect x={bulb.x - 1.5} y={bulb.y - 3} width="3" height="3" fill="#1c120a" />
                  <circle cx={bulb.x} cy={bulb.y} r="2.5" fill="#fff7cc" />
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes neonOpenBlink {
          0%, 82%, 100% { opacity: 0.98; }
          86% { opacity: 0.2; }
          90% { opacity: 0.98; }
          94% { opacity: 0.35; }
        }
        @keyframes neonHomersGlow {
          0%, 100% {
            filter: drop-shadow(0 0 6px #e8700a) drop-shadow(0 0 16px #ff8a1f);
            opacity: 0.98;
          }
          45% {
            filter: drop-shadow(0 0 9px #ff8a1f) drop-shadow(0 0 24px #e8700a);
            opacity: 1;
          }
          88% {
            filter: drop-shadow(0 0 5px #e8700a) drop-shadow(0 0 10px #ea580c);
            opacity: 0.90;
          }
          91% {
            filter: drop-shadow(0 0 2px #e8700a) drop-shadow(0 0 6px #ea580c);
            opacity: 0.70;
          }
          93% {
            filter: drop-shadow(0 0 8px #ff8a1f) drop-shadow(0 0 20px #e8700a);
            opacity: 0.98;
          }
        }
        @keyframes bulbTwinkle {
          0% { opacity: 0.78; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.06); }
          100% { opacity: 0.85; transform: scale(0.98); }
        }
        @keyframes lampFlickerSlow {
          0% { opacity: 0.95; }
          40% { opacity: 1; }
          75% { opacity: 0.93; }
          100% { opacity: 0.98; }
        }
      `}</style>
    </div>
  );
}
