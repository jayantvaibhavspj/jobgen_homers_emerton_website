import React, { useState, useEffect, useRef } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneSeasoning Layer
 * Classic Aussie takeaway chicken-salt seasoning ritual:
 * - Every ~10 seconds, a stainless/aluminium seasoning shaker tilts
 * - Shakes over a wire basket of hot golden chips
 * - Rains a short shower of golden chicken-salt specks
 * - Returns gently to upright resting position
 */
export default function SceneSeasoning({
  isPlaying = true,
  isReducedMotion = false,
  isMobile = false,
  offsetX = 0,
}) {
  const { seasoning } = FOOTER_SCENE_CONFIG;
  const [isShaking, setIsShaking] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    const triggerShake = () => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, seasoning.shakeDuration * 1000);
    };

    const initialTimeout = setTimeout(() => {
      triggerShake();
      timerRef.current = setInterval(triggerShake, seasoning.interval);
    }, 3500);

    return () => {
      clearTimeout(initialTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isReducedMotion, seasoning.interval, seasoning.shakeDuration]);

  // Generate deterministic falling chicken-salt specks around counter height (y ~ 405)
  const saltSpecks = [
    { x: 630, y: 405, r: 1.0, delay: 0.1, color: '#f59e0b' },
    { x: 633, y: 406, r: 0.8, delay: 0.15, color: '#fffbeb' },
    { x: 627, y: 405, r: 1.1, delay: 0.22, color: '#fbbf24' },
    { x: 631, y: 407, r: 0.9, delay: 0.28, color: '#f59e0b' },
    { x: 635, y: 405, r: 1.2, delay: 0.35, color: '#fffbeb' },
    { x: 629, y: 406, r: 0.8, delay: 0.42, color: '#fbbf24' },
    { x: 632, y: 405, r: 1.0, delay: 0.50, color: '#f59e0b' },
    { x: 628, y: 407, r: 0.9, delay: 0.58, color: '#fffbeb' },
    { x: 634, y: 406, r: 1.1, delay: 0.65, color: '#fbbf24' },
    { x: 630, y: 405, r: 0.8, delay: 0.72, color: '#f59e0b' },
    { x: 626, y: 407, r: 1.0, delay: 0.80, color: '#fbbf24' },
    { x: 633, y: 405, r: 0.9, delay: 0.88, color: '#fffbeb' },
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
          {/* Shaker brushed stainless steel gradient */}
          <linearGradient id="shakerMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a372d" />
            <stop offset="35%" stopColor="#8d6e5c" />
            <stop offset="70%" stopColor="#bfa595" />
            <stop offset="100%" stopColor="#3d2c23" />
          </linearGradient>

          {/* Chips golden glow */}
          <radialGradient id="chipsGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#d97706" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#17110d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Counter area (x: 612 to 670, y: 405 to 445) */}
        <g id="seasoning-station" transform={`translate(${offsetX}, 0)`}>
          {/* Dedicated Prep Table Stand (Legs down to curb at y: 445) */}
          <g id="prep-table">
            <rect x="612" y="429" width="56" height="3" rx="1" fill="#2d1c13" stroke="#422a1d" strokeWidth="0.8" />
            <line x1="616" y1="432" x2="614" y2="445" stroke="#1c120c" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="664" y1="432" x2="666" y2="445" stroke="#1c120c" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="615" y1="439" x2="665" y2="439" stroke="#251810" strokeWidth="1.5" />
          </g>

          {/* Wire Basket of Fresh Hot Chips */}
          <g id="chips-basket">
            {/* Ambient warmth */}
            <circle cx="628" cy="420" r="14" fill="url(#chipsGlowGrad)" />

            {/* Wire basket frame */}
            <rect x="618" y="415" width="22" height="14" rx="2" fill="#22160e" stroke="#523929" strokeWidth="1" />
            {/* Basket wire grid mesh */}
            <line x1="623" y1="415" x2="623" y2="429" stroke="#523929" strokeWidth="0.8" />
            <line x1="629" y1="415" x2="629" y2="429" stroke="#523929" strokeWidth="0.8" />
            <line x1="635" y1="415" x2="635" y2="429" stroke="#523929" strokeWidth="0.8" />
            {/* Basket upright wire handle (self-contained, does not poke towards grill) */}
            <path d="M 618 418 Q 613 414 615 408" fill="none" stroke="#523929" strokeWidth="1.2" strokeLinecap="round" />

            {/* Golden Cut Hot Chips popping out */}
            <g strokeLinecap="round">
              <line x1="621" y1="415" x2="623" y2="407" stroke="#f59e0b" strokeWidth="2.4" />
              <line x1="625" y1="416" x2="627" y2="404" stroke="#fbbf24" strokeWidth="2.2" />
              <line x1="629" y1="415" x2="631" y2="406" stroke="#f59e0b" strokeWidth="2.4" />
              <line x1="633" y1="416" x2="636" y2="408" stroke="#fbbf24" strokeWidth="2.2" />
              <line x1="627" y1="413" x2="634" y2="410" stroke="#d97706" strokeWidth="2" />
            </g>
          </g>

          {/* Aussie Chicken-Salt Shaker (spaced comfortably away from the chips basket) */}
          <g
            id="salt-shaker"
            style={{
              transformOrigin: '654px 421px',
              animation: (!isReducedMotion && isShaking)
                ? 'shakerTiltShake 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                : 'none',
            }}
          >
            {/* Shaker body */}
            <rect x="649" y="405" width="11" height="18" rx="2" fill="url(#shakerMetalGrad)" stroke="#2d1c13" strokeWidth="0.8" />
            {/* Domed perforated shaker lid */}
            <path d="M 649 405 Q 654.5 400 660 405 Z" fill="#bfa595" stroke="#2d1c13" strokeWidth="0.8" />
            {/* Shaker handle loop */}
            <path d="M 660 408 Q 664 414 660 419" fill="none" stroke="#8d6e5c" strokeWidth="1" />
          </g>

          {/* Raining Salt Specks Shower */}
          {isShaking && !isReducedMotion && (
            <g className="salt-shower">
              {saltSpecks.map((speck, idx) => (
                <circle
                  key={idx}
                  cx={speck.x}
                  cy={speck.y}
                  r={speck.r}
                  fill={speck.color}
                  style={{
                    animation: `saltFall 0.75s ease-in ${speck.delay}s forwards`,
                  }}
                />
              ))}
            </g>
          )}
        </g>
      </svg>

      {/* Embedded CSS for Shaker tilt & salt falling */}
      <style>{`
        @keyframes shakerTiltShake {
          0% {
            transform: rotate(0deg) translate(0, 0);
          }
          20% {
            transform: rotate(-44deg) translate(-14px, -6px);
          }
          32% {
            transform: rotate(-52deg) translate(-16px, -8px);
          }
          44% {
            transform: rotate(-40deg) translate(-13px, -5px);
          }
          56% {
            transform: rotate(-50deg) translate(-16px, -7px);
          }
          68% {
            transform: rotate(-42deg) translate(-13px, -5px);
          }
          85% {
            transform: rotate(-10deg) translate(-3px, -1px);
          }
          100% {
            transform: rotate(0deg) translate(0, 0);
          }
        }

        @keyframes saltFall {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
          }
          85% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translateY(14px);
          }
        }
      `}</style>
    </div>
  );
}
