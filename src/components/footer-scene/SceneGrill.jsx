import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneGrill Layer
 * Commercial charcoal grill corner on the left patio (curb at y: 445).
 * Features:
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
  offsetX = 0,
}) {
  const { grill } = FOOTER_SCENE_CONFIG;
  const [isFlipping, setIsFlipping] = useState(false);
  const [sparkBurst, setSparkBurst] = useState(false);
  const flipTimerRef = useRef(null);

  // Trigger patty flip and subsequent spark burst on landing
  const triggerFlip = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);

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

  // Calculate cursor attraction angle towards grill
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
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYTop slice"
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

        <g id="grill-scene-wrapper" transform={`translate(${offsetX}, 0)`}>
          {/* Ambient Warm Charcoal Hearth Glow */}
          <circle
            cx="485"
            cy="408"
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
            {/* Grill sturdy steel stand legs (reaching down to curb at y = 445) */}
            <line x1="452" y1="422" x2="442" y2="445" stroke="#1c120c" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="518" y1="422" x2="528" y2="445" stroke="#1c120c" strokeWidth="4.5" strokeLinecap="round" />
            {/* Lower shelf */}
            <line x1="447" y1="436" x2="523" y2="436" stroke="#251810" strokeWidth="2.5" />

            {/* Heavy steel firebox basin */}
            <path
              d="M 445 408 L 452 422 Q 485 426 518 422 L 525 408 Z"
              fill="#1e130c"
              stroke="#2b1a11"
              strokeWidth="1.5"
            />

            {/* Glowing charcoal coals bed */}
            <ellipse cx="485" cy="409" rx="34" ry="4" fill="#a52610" />
            <circle cx="468" cy="409" r="3" fill="#ff7a00" opacity="0.9" />
            <circle cx="482" cy="408" r="3.5" fill="#ffd166" opacity="0.95" />
            <circle cx="496" cy="409" r="2.8" fill="#e8700a" opacity="0.9" />
            <circle cx="506" cy="408" r="2.2" fill="#ff7a00" opacity="0.8" />

            {/* ============================================================ */}
            {/* FLAME TONGUES (Layered SVG with flicker & cursor lean)        */}
            {/* ============================================================ */}
            <g
              id="flames-group"
              style={{
                transform: `translate3d(${flameLean}px, 0, 0)`,
                transformOrigin: '485px 408px',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Outer Left Flame Tongue */}
              <path
                d="M 462 407 Q 458 393 464 383 Q 470 393 468 407 Z"
                fill="url(#flameOuterGrad)"
                opacity="0.85"
                style={{
                  animation: (!isReducedMotion && isPlaying)
                    ? 'flameFlickerLeft 0.38s ease-in-out infinite alternate'
                    : 'none',
                  transformOrigin: '465px 407px',
                }}
              />

              {/* Main Center Flame Tongue */}
              <path
                d="M 473 408 Q 468 388 485 367 Q 498 387 493 408 Z"
                fill="url(#flameOuterGrad)"
                style={{
                  animation: (!isReducedMotion && isPlaying)
                    ? 'flameFlickerCenter 0.28s ease-in-out infinite alternate'
                    : 'none',
                  transformOrigin: '485px 408px',
                }}
              />

              {/* Inner Center Flame Core (Yellow/White Hot) */}
              <path
                d="M 478 407 Q 476 393 485 377 Q 493 393 490 407 Z"
                fill="url(#flameCoreGrad)"
                style={{
                  animation: (!isReducedMotion && isPlaying)
                    ? 'flameFlickerCore 0.22s ease-in-out infinite alternate'
                    : 'none',
                  transformOrigin: '485px 407px',
                }}
              />

              {/* Outer Right Flame Tongue */}
              <path
                d="M 495 407 Q 502 395 506 385 Q 512 397 503 407 Z"
                fill="url(#flameOuterGrad)"
                opacity="0.88"
                style={{
                  animation: (!isReducedMotion && isPlaying)
                    ? 'flameFlickerRight 0.34s ease-in-out infinite alternate'
                    : 'none',
                  transformOrigin: '504px 407px',
                }}
              />
            </g>

            {/* Heavy Cast Iron Grill Grate Bars */}
            <g stroke="#3a2417" strokeWidth="2.2" strokeLinecap="round">
              <line x1="446" y1="406" x2="524" y2="406" strokeWidth="3" stroke="#2a180e" />
              <line x1="452" y1="403" x2="452" y2="409" />
              <line x1="462" y1="403" x2="462" y2="409" />
              <line x1="472" y1="403" x2="472" y2="409" />
              <line x1="482" y1="403" x2="482" y2="409" />
              <line x1="492" y1="403" x2="492" y2="409" />
              <line x1="502" y1="403" x2="502" y2="409" />
              <line x1="512" y1="403" x2="512" y2="409" />
              <line x1="518" y1="403" x2="518" y2="409" />
            </g>

            {/* ============================================================ */}
            {/* BURGER PATTY & ARC FLIP ANIMATION                           */}
            {/* ============================================================ */}
            <g
              id="burger-patty"
              style={{
                transformOrigin: '485px 403px',
                animation: (!isReducedMotion && isFlipping)
                  ? `pattyFlipArc ${grill.pattyFlipDuration}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`
                  : 'none',
              }}
            >
              {/* Patty meat body */}
              <ellipse cx="485" cy="403" rx="16" ry="4.5" fill="#3b2014" stroke="#22110a" strokeWidth="1" />
              {/* Char grill marks on patty */}
              <line x1="474" y1="402" x2="478" y2="404" stroke="#160904" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="481" y1="402" x2="485" y2="404" stroke="#160904" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="488" y1="402" x2="492" y2="404" stroke="#160904" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Sizzle Spark Burst on Landing */}
            {sparkBurst && !isReducedMotion && (
              <g className="sizzle-sparks">
                {sizzleSparks.map((s, idx) => (
                  <circle
                    key={idx}
                    cx={s.x}
                    cy="403"
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
                  d="M 480 401 Q 470 373 484 353 Q 498 333 488 313 Q 478 293 485 273"
                  fill="none"
                  stroke="url(#smokeGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{
                    animation: 'smokeWisp 4.5s ease-in-out infinite',
                  }}
                />
                <path
                  d="M 492 401 Q 504 378 494 358 Q 484 338 496 318"
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
            y="360"
            width="90"
            height="85"
            fill="transparent"
            tabIndex="-1"
            className="cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            onClick={triggerFlip}
            aria-label="Grill Easter Egg"
          />
        </g>
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
            transform: translateY(2px) scale(1.15, 0.85);
          }
          30% {
            transform: translateY(-24px) rotate(90deg) scale(0.9, 1.15);
          }
          55% {
            transform: translateY(-48px) rotate(180deg) scale(1, 1);
          }
          80% {
            transform: translateY(-16px) rotate(270deg) scale(0.92, 1.12);
          }
          92% {
            transform: translateY(0) rotate(360deg) scale(1.2, 0.8);
          }
          100% {
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
