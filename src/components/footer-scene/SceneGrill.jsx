import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneGrill Layer
 * Commercial charcoal grill corner with:
 * - Multi-layered flickering flame tongues
 * - Glowing charcoal bed & rising smoke wisps
 * - Periodic burger patty flip (~7.5s arc with squash & stretch and sizzle sparks)
 * - Cursor interaction: flames lean towards cursor
 * - Easter egg: clicking grill triggers immediate patty flip & spark burst
 */
export default function SceneGrill({
  isPlaying = true,
  isReducedMotion = false,
  isMobile = false,
  mousePos = { x: 0, y: 0 },
}) {
  const { grill } = FOOTER_SCENE_CONFIG;
  const [isFlipping, setIsFlipping] = useState(false);
  const [sparkBurst, setSparkBurst] = useState(false);
  const flipTimerRef = useRef(null);

  // Trigger patty flip and subsequent spark burst on landing
  const triggerFlip = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);

    // After flip duration, land patty and trigger sizzle spark burst
    setTimeout(() => {
      setSparkBurst(true);
      setTimeout(() => {
        setSparkBurst(false);
        setIsFlipping(false);
      }, 700);
    }, grill.pattyFlipDuration * 1000);
  }, [isFlipping, grill.pattyFlipDuration]);

  // Periodic patty flip loop
  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    flipTimerRef.current = setInterval(() => {
      triggerFlip();
    }, grill.pattyFlipInterval);

    return () => {
      if (flipTimerRef.current) clearInterval(flipTimerRef.current);
    };
  }, [isPlaying, isReducedMotion, triggerFlip, grill.pattyFlipInterval]);

  // Calculate cursor attraction angle towards grill (grill center in normalized coords: approx -0.3)
  const flameLean = isMobile || isReducedMotion
    ? 0
    : Math.max(-grill.flameLeanMaxPx, Math.min(grill.flameLeanMaxPx, (mousePos.x + 0.3) * 12));

  // Pre-generate spark burst particle paths
  const sizzleSparks = [
    { x: 472, dx: -22, dy: -38, r: 1.8, dur: 0.5 },
    { x: 478, dx: -12, dy: -46, r: 2.2, dur: 0.55 },
    { x: 485, dx: 0, dy: -52, r: 1.6, dur: 0.6 },
    { x: 492, dx: 14, dy: -44, r: 2.0, dur: 0.52 },
    { x: 498, dx: 24, dy: -36, r: 1.8, dur: 0.48 },
    { x: 480, dx: -8, dy: -32, r: 1.4, dur: 0.45 },
    { x: 490, dx: 18, dy: -28, r: 1.5, dur: 0.42 },
  ];

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
          {/* Charcoal fire radial glow */}
          <radialGradient id="grillGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#e8700a" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#a52610" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#17110d" stopOpacity="0" />
          </radialGradient>

          {/* Flame outer orange gradient */}
          <linearGradient id="flameOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#c7341c" />
            <stop offset="50%" stopColor="#e8700a" />
            <stop offset="100%" stopColor="#ff9d42" />
          </linearGradient>

          {/* Flame inner core gradient */}
          <linearGradient id="flameCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff8a1f" />
            <stop offset="60%" stopColor="#ffd166" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Smoke linear gradient */}
          <linearGradient id="smokeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4a372d" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#3d2a20" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#251a14" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Warm Charcoal Hearth Glow */}
        <circle
          cx="485"
          cy="255"
          r="95"
          fill="url(#grillGlowGrad)"
          style={{
            animation: (!isReducedMotion && isPlaying)
              ? 'grillGlowPulse 2.8s ease-in-out infinite alternate'
              : 'none',
          }}
        />

        {/* ============================================================== */}
        {/* CHARCOAL BBQ GRILL STAND                                       */}
        {/* ============================================================== */}
        <g id="grill-body">
          {/* Grill sturdy steel stand legs */}
          <line x1="452" y1="268" x2="442" y2="295" stroke="#1c120c" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="518" y1="268" x2="528" y2="295" stroke="#1c120c" strokeWidth="4.5" strokeLinecap="round" />
          {/* Lower shelf */}
          <line x1="447" y1="284" x2="523" y2="284" stroke="#251810" strokeWidth="2.5" />

          {/* Heavy steel firebox basin */}
          <path
            d="M 445 255 L 452 268 Q 485 272 518 268 L 525 255 Z"
            fill="#1e130c"
            stroke="#2b1a11"
            strokeWidth="1.5"
          />

          {/* Glowing charcoal coals bed */}
          <ellipse cx="485" cy="256" rx="34" ry="4" fill="#a52610" />
          <circle cx="468" cy="256" r="3" fill="#ff7a00" opacity="0.9" />
          <circle cx="482" cy="255" r="3.5" fill="#ffd166" opacity="0.95" />
          <circle cx="496" cy="256" r="2.8" fill="#e8700a" opacity="0.9" />
          <circle cx="506" cy="255" r="2.2" fill="#ff7a00" opacity="0.8" />

          {/* ============================================================ */}
          {/* FLAME TONGUES (Layered SVG with flicker & cursor lean)        */}
          {/* ============================================================ */}
          <g
            id="flames-group"
            style={{
              transform: `translate3d(${flameLean}px, 0, 0)`,
              transformOrigin: '485px 255px',
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Outer Left Flame Tongue */}
            <path
              d="M 462 254 Q 458 240 464 230 Q 470 240 468 254 Z"
              fill="url(#flameOuterGrad)"
              opacity="0.85"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? 'flameFlickerLeft 0.38s ease-in-out infinite alternate'
                  : 'none',
                transformOrigin: '465px 254px',
              }}
            />

            {/* Main Center Flame Tongue */}
            <path
              d="M 473 255 Q 468 235 485 214 Q 498 234 493 255 Z"
              fill="url(#flameOuterGrad)"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? 'flameFlickerCenter 0.28s ease-in-out infinite alternate'
                  : 'none',
                transformOrigin: '485px 255px',
              }}
            />

            {/* Inner Center Flame Core (Yellow/White Hot) */}
            <path
              d="M 478 254 Q 476 240 485 224 Q 493 240 490 254 Z"
              fill="url(#flameCoreGrad)"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? 'flameFlickerCore 0.22s ease-in-out infinite alternate'
                  : 'none',
                transformOrigin: '485px 254px',
              }}
            />

            {/* Outer Right Flame Tongue */}
            <path
              d="M 495 254 Q 502 242 506 232 Q 512 244 503 254 Z"
              fill="url(#flameOuterGrad)"
              opacity="0.88"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? 'flameFlickerRight 0.34s ease-in-out infinite alternate'
                  : 'none',
                transformOrigin: '504px 254px',
              }}
            />
          </g>

          {/* Heavy Cast Iron Grill Grate Bars */}
          <g stroke="#3a2417" strokeWidth="2.2" strokeLinecap="round">
            <line x1="446" y1="253" x2="524" y2="253" strokeWidth="3" stroke="#2a180e" />
            <line x1="452" y1="250" x2="452" y2="256" />
            <line x1="462" y1="250" x2="462" y2="256" />
            <line x1="472" y1="250" x2="472" y2="256" />
            <line x1="482" y1="250" x2="482" y2="256" />
            <line x1="492" y1="250" x2="492" y2="256" />
            <line x1="502" y1="250" x2="502" y2="256" />
            <line x1="512" y1="250" x2="512" y2="256" />
            <line x1="518" y1="250" x2="518" y2="256" />
          </g>

          {/* ============================================================ */}
          {/* BURGER PATTY & ARC FLIP ANIMATION                           */}
          {/* ============================================================ */}
          <g
            id="burger-patty"
            style={{
              transformOrigin: '485px 250px',
              animation: (!isReducedMotion && isFlipping)
                ? `pattyFlipArc ${grill.pattyFlipDuration}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`
                : 'none',
            }}
          >
            {/* Patty meat body */}
            <ellipse cx="485" cy="250" rx="16" ry="4.5" fill="#3b2014" stroke="#22110a" strokeWidth="1" />
            {/* Char grill marks on patty */}
            <line x1="474" y1="249" x2="478" y2="251" stroke="#160904" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="481" y1="249" x2="485" y2="251" stroke="#160904" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="488" y1="249" x2="492" y2="251" stroke="#160904" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Sizzle Spark Burst on Landing */}
          {sparkBurst && !isReducedMotion && (
            <g className="sizzle-sparks">
              {sizzleSparks.map((s, idx) => (
                <circle
                  key={idx}
                  cx={s.x}
                  cy="250"
                  r={s.r}
                  fill="#ffd166"
                  style={{
                    filter: 'drop-shadow(0 0 3px #ff8a1f)',
                    animation: `sparkShot ${s.dur}s ease-out forwards`,
                    '--dx': `${s.dx}px`,
                    '--dy': `${s.dy}px`,
                  }}
                />
              ))}
            </g>
          )}

          {/* Rising Smoke Wisps */}
          {!isReducedMotion && isPlaying && (
            <g opacity="0.45">
              <path
                d="M 480 248 Q 470 220 484 200 Q 498 180 488 160 Q 478 140 485 120"
                fill="none"
                stroke="url(#smokeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{
                  animation: 'smokeWisp 4.5s ease-in-out infinite',
                }}
              />
              <path
                d="M 492 248 Q 504 225 494 205 Q 484 185 496 165"
                fill="none"
                stroke="url(#smokeGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  animation: 'smokeWisp 5.2s ease-in-out 1.2s infinite',
                }}
              />
            </g>
          )}
        </g>

        {/* Easter Egg Trigger: Transparent hit area over grill */}
        <rect
          x="440"
          y="210"
          width="90"
          height="85"
          fill="transparent"
          tabIndex="-1"
          className="cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          onClick={triggerFlip}
          aria-label="Grill Easter Egg"
        />
      </svg>

      {/* Embedded CSS for Grill & Flame Animations */}
      <style>{`
        @keyframes grillGlowPulse {
          0% { opacity: 0.55; transform: scale(0.96); }
          100% { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes flameFlickerCenter {
          0% { transform: scaleY(0.92) scaleX(1.03) skewX(2deg); }
          50% { transform: scaleY(1.12) scaleX(0.96) skewX(-2deg); }
          100% { transform: scaleY(0.96) scaleX(1.02) skewX(1deg); }
        }
        @keyframes flameFlickerLeft {
          0% { transform: scaleY(0.9) skewX(-3deg); }
          100% { transform: scaleY(1.15) skewX(2deg); }
        }
        @keyframes flameFlickerRight {
          0% { transform: scaleY(1.12) skewX(3deg); }
          100% { transform: scaleY(0.88) skewX(-2deg); }
        }
        @keyframes flameFlickerCore {
          0% { transform: scaleY(0.95); opacity: 0.9; }
          100% { transform: scaleY(1.08); opacity: 1; }
        }
        @keyframes pattyFlipArc {
          0% {
            transform: translateY(0) rotate(0deg) scale(1, 1);
          }
          15% {
            /* Squash on launch prep */
            transform: translateY(2px) scale(1.15, 0.85);
          }
          30% {
            /* Launch stretch */
            transform: translateY(-24px) rotate(90deg) scale(0.9, 1.15);
          }
          55% {
            /* Apex of arc */
            transform: translateY(-48px) rotate(180deg) scale(1, 1);
          }
          80% {
            /* Descent */
            transform: translateY(-16px) rotate(270deg) scale(0.92, 1.12);
          }
          92% {
            /* Touchdown squash */
            transform: translateY(0) rotate(360deg) scale(1.2, 0.8);
          }
          100% {
            /* Rebound to normal */
            transform: translateY(0) rotate(360deg) scale(1, 1);
          }
        }
        @keyframes sparkShot {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) scale(0.2);
          }
        }
        @keyframes smokeWisp {
          0% {
            opacity: 0.1;
            transform: translateY(0) scaleX(0.9);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-18px) scaleX(1.1);
          }
          100% {
            opacity: 0;
            transform: translateY(-38px) scaleX(1.25);
          }
        }
      `}</style>
    </div>
  );
}
