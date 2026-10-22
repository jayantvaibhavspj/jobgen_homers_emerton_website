import React from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneShop Layer
 * The heart of the scene: Homers Emerton takeaway shopfront.
 * Lit awning, glowing takeaway windows with soft warm flicker,
 * glowing "HOMERS" neon sign, softly blinking "OPEN" neon sign,
 * and festoon string lights turning on in sequence from left to right.
 */
export default function SceneShop({
  isPlaying = true,
  isReducedMotion = false,
  isMobile = false,
  hasEntered = true,
}) {
  const { shop } = FOOTER_SCENE_CONFIG;
  const bulbCount = isMobile ? 8 : shop.stringLightCount;

  // Generate festoon string bulb coordinates along a gentle drape curve
  const bulbs = Array.from({ length: bulbCount }, (_, i) => {
    const t = i / (bulbCount - 1); // 0 to 1
    const x = 540 + t * 360;       // spans shopfront from 540 to 900
    // Drape curve (parabola sag)
    const sag = Math.sin(t * Math.PI) * 12;
    const y = 176 + sag;
    return { id: i, x, y };
  });

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYBottom slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shop brick wall gradient */}
          <linearGradient id="shopWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c1a11" />
            <stop offset="50%" stopColor="#22140d" />
            <stop offset="100%" stopColor="#180e08" />
          </linearGradient>

          {/* Awning stripes */}
          <linearGradient id="awningStripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8700a" />
            <stop offset="14%" stopColor="#e8700a" />
            <stop offset="14.1%" stopColor="#1e130c" />
            <stop offset="28%" stopColor="#1e130c" />
            <stop offset="28.1%" stopColor="#e8700a" />
            <stop offset="42%" stopColor="#e8700a" />
            <stop offset="42.1%" stopColor="#1e130c" />
            <stop offset="56%" stopColor="#1e130c" />
            <stop offset="56.1%" stopColor="#e8700a" />
            <stop offset="70%" stopColor="#e8700a" />
            <stop offset="70.1%" stopColor="#1e130c" />
            <stop offset="84%" stopColor="#1e130c" />
            <stop offset="84.1%" stopColor="#e8700a" />
            <stop offset="100%" stopColor="#e8700a" />
          </linearGradient>

          {/* Window warm interior glow */}
          <radialGradient id="shopWinGlow" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffe4a0" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#ea580c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#20120a" stopOpacity="0.2" />
          </radialGradient>

          {/* Neon sign outer glow */}
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
            <stop offset="0%" stopColor="#fff3b0" stopOpacity="1" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e8700a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================== */}
        {/* SHOP BUILDING STRUCTURE                                       */}
        {/* ============================================================== */}

        {/* Main shop building block (x: 520 to 920, ground at 290) */}
        <g id="shop-building">
          {/* Parapet Roofline / Upper Facade */}
          <rect x="520" y="132" width="400" height="48" rx="2" fill="url(#shopWallGrad)" />
          {/* Decorative roof trim cornice */}
          <rect x="515" y="128" width="410" height="6" rx="1" fill="#351f15" stroke="#4a2c1d" strokeWidth="0.8" />

          {/* Ground floor wall */}
          <rect x="525" y="180" width="390" height="110" fill="url(#shopWallGrad)" />

          {/* ============================================================ */}
          {/* ILLUMINATED SHOPFRONT WINDOWS                                */}
          {/* ============================================================ */}

          {/* Main Counter Window (Left pane) */}
          <g className="shop-window-pane">
            <rect
              x="545"
              y="196"
              width="155"
              height="80"
              rx="3"
              fill="url(#shopWinGlow)"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? 'windowWarmFlicker 4s ease-in-out infinite'
                  : 'none',
              }}
            />
            {/* Window frame mullions */}
            <rect x="545" y="196" width="155" height="80" rx="3" fill="none" stroke="#25160d" strokeWidth="3" />
            <line x1="622" y1="196" x2="622" y2="276" stroke="#25160d" strokeWidth="2.5" />
            {/* Interior takeaway counter silhouette */}
            <rect x="550" y="252" width="145" height="24" fill="#2d1a0f" opacity="0.85" />
            {/* Hanging heat lamp fixtures silhouette */}
            <circle cx="585" cy="214" r="5" fill="#180e08" />
            <line x1="585" y1="196" x2="585" y2="210" stroke="#180e08" strokeWidth="1.5" />
            <circle cx="660" cy="214" r="5" fill="#180e08" />
            <line x1="660" y1="196" x2="660" y2="210" stroke="#180e08" strokeWidth="1.5" />
            {/* Small takeaway menu board silhouette inside */}
            <rect x="670" y="206" width="22" height="30" rx="1" fill="#180e08" opacity="0.75" />
            <line x1="673" y1="213" x2="689" y2="213" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
            <line x1="673" y1="219" x2="689" y2="219" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
            <line x1="673" y1="225" x2="685" y2="225" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
          </g>

          {/* Takeaway Doorway & Secondary Window (Right pane) */}
          <g className="shop-door-pane">
            <rect
              x="725"
              y="196"
              width="85"
              height="80"
              rx="3"
              fill="url(#shopWinGlow)"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? 'windowWarmFlicker 4.8s ease-in-out infinite'
                  : 'none',
              }}
            />
            <rect x="725" y="196" width="85" height="80" rx="3" fill="none" stroke="#25160d" strokeWidth="3" />

            {/* Glass Entrance Door */}
            <rect x="830" y="196" width="70" height="92" rx="2" fill="#1a100a" stroke="#2d1c12" strokeWidth="2.5" />
            {/* Door glass pane with warm back-glow */}
            <rect x="838" y="206" width="54" height="48" rx="2" fill="url(#shopWinGlow)" opacity="0.6" />
            {/* Door push handle */}
            <line x1="844" y1="238" x2="844" y2="254" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* ============================================================ */}
          {/* "OPEN" NEON SIGN                                             */}
          {/* ============================================================ */}
          <g className="neon-open-sign">
            {/* Sign board box */}
            <rect x="742" y="210" width="48" height="24" rx="4" fill="#0d0805" stroke="#10b981" strokeWidth="1.2" opacity="0.9" />
            {/* Neon glowing text "OPEN" */}
            <text
              x="766"
              y="226"
              textAnchor="middle"
              fill="#34d399"
              fontSize="12"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="2.5"
              style={{
                filter: 'drop-shadow(0 0 4px #10b981) drop-shadow(0 0 10px #059669)',
                animation: (!isReducedMotion && isPlaying)
                  ? `neonOpenBlink ${shop.openSignBlinkPeriod}s ease-in-out infinite`
                  : 'none',
              }}
            >
              OPEN
            </text>
          </g>

          {/* ============================================================ */}
          {/* AWNING                                                       */}
          {/* ============================================================ */}
          <g id="shop-awning">
            {/* Angled canopy */}
            <polygon
              points="510,180 930,180 945,198 495,198"
              fill="url(#awningStripeGrad)"
            />
            {/* Awning wavy scalloped valance fringe */}
            <path
              d="M 495 198 Q 505 206 515 198 Q 525 206 535 198 Q 545 206 555 198 Q 565 206 575 198 Q 585 206 595 198 Q 605 206 615 198 Q 625 206 635 198 Q 645 206 655 198 Q 665 206 675 198 Q 685 206 695 198 Q 705 206 715 198 Q 725 206 735 198 Q 745 206 755 198 Q 765 206 775 198 Q 785 206 795 198 Q 805 206 815 198 Q 825 206 835 198 Q 845 206 855 198 Q 865 206 875 198 Q 885 206 895 198 Q 905 206 915 198 Q 925 206 935 198 Q 940 206 945 198 L 945 196 L 495 196 Z"
              fill="#e8700a"
            />
            {/* Awning underside shadow */}
            <rect x="525" y="198" width="390" height="5" fill="#140a05" opacity="0.6" />
          </g>

          {/* ============================================================ */}
          {/* "HOMERS" NEON FASCIA SIGN                                    */}
          {/* ============================================================ */}
          <g id="shop-sign">
            {/* Sign board backing */}
            <rect
              x="620"
              y="140"
              width="200"
              height="34"
              rx="5"
              fill="#180e08"
              stroke="#e8700a"
              strokeWidth="1.5"
            />
            {/* Sign inner border */}
            <rect
              x="624"
              y="144"
              width="192"
              height="26"
              rx="3"
              fill="none"
              stroke="#ea580c"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* Glowing "HOMERS" Text */}
            <text
              x="720"
              y="164"
              textAnchor="middle"
              fill="#fff3e0"
              fontSize="21"
              fontWeight="bold"
              fontFamily="'Kaushan Script', 'Brush Script MT', cursive"
              letterSpacing="2"
              filter="url(#neonSignGlow)"
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
          </g>

          {/* ============================================================ */}
          {/* FESTOON STRING LIGHTS (Sequential Turn-on on entrance)        */}
          {/* ============================================================ */}
          <g id="shop-string-lights">
            {/* Wire */}
            <path
              d="M 535 174 Q 630 190 720 190 Q 810 190 905 174"
              fill="none"
              stroke="#2e1c12"
              strokeWidth="1.5"
            />

            {/* Bulbs with sequential entrance delay and gentle twinkle */}
            {bulbs.map((bulb, i) => {
              const delay = hasEntered ? (i * shop.stringLightStagger) : 0;
              return (
                <g
                  key={bulb.id}
                  className="festoon-bulb"
                  style={{
                    opacity: hasEntered ? 1 : 0,
                    transition: `opacity 0.4s ease ${delay}s`,
                    animation: (!isReducedMotion && isPlaying && hasEntered)
                      ? `bulbTwinkle 3.2s ease-in-out ${delay + 0.5}s infinite alternate`
                      : 'none',
                  }}
                >
                  {/* Outer warm glow */}
                  <circle cx={bulb.x} cy={bulb.y} r="10" fill="url(#bulbGlowGrad)" opacity="0.65" />
                  {/* Socket */}
                  <rect x={bulb.x - 1.5} y={bulb.y - 4} width="3" height="3" fill="#1c120a" />
                  {/* Bulb core */}
                  <circle cx={bulb.x} cy={bulb.y} r="3" fill="#fff7cc" />
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Embedded Keyframes for Shop Animations */}
      <style>{`
        @keyframes windowWarmFlicker {
          0%, 100% { opacity: 0.88; }
          25% { opacity: 0.94; }
          48% { opacity: 0.82; }
          52% { opacity: 0.90; }
          75% { opacity: 0.85; }
        }
        @keyframes neonOpenBlink {
          0%, 82%, 100% { opacity: 0.95; }
          86% { opacity: 0.2; }
          90% { opacity: 0.95; }
          94% { opacity: 0.35; }
        }
        @keyframes neonHomersGlow {
          0%, 100% {
            filter: drop-shadow(0 0 5px #e8700a) drop-shadow(0 0 14px #ff8a1f);
            opacity: 0.96;
          }
          45% {
            filter: drop-shadow(0 0 8px #ff8a1f) drop-shadow(0 0 22px #e8700a);
            opacity: 1;
          }
          88% {
            filter: drop-shadow(0 0 4px #e8700a) drop-shadow(0 0 10px #ea580c);
            opacity: 0.88;
          }
          91% {
            filter: drop-shadow(0 0 2px #e8700a) drop-shadow(0 0 6px #ea580c);
            opacity: 0.65;
          }
          93% {
            filter: drop-shadow(0 0 7px #ff8a1f) drop-shadow(0 0 18px #e8700a);
            opacity: 0.98;
          }
        }
        @keyframes bulbTwinkle {
          0% { opacity: 0.75; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 0.82; transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
}
