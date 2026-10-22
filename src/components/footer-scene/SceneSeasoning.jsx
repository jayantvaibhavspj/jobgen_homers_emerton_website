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
}) {
  const { seasoning } = FOOTER_SCENE_CONFIG;
  const [isShaking, setIsShaking] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    // Trigger seasoning shake
    const triggerShake = () => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, seasoning.shakeDuration * 1000);
    };

    // Stagger initial shake slightly so it doesn't align identically with patty flip
    const initialTimeout = setTimeout(() => {
      triggerShake();
      timerRef.current = setInterval(triggerShake, seasoning.interval);
    }, 3500);

    return () => {
      clearTimeout(initialTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isReducedMotion, seasoning.interval, seasoning.shakeDuration]);

  // Generate deterministic falling chicken-salt specks
  const saltSpecks = [
    { x: 630, y: 250, r: 1.0, delay: 0.1, color: '#f59e0b' },
    { x: 633, y: 251, r: 0.8, delay: 0.15, color: '#fffbeb' },
    { x: 627, y: 250, r: 1.1, delay: 0.22, color: '#fbbf24' },
    { x: 631, y: 252, r: 0.9, delay: 0.28, color: '#f59e0b' },
    { x: 635, y: 250, r: 1.2, delay: 0.35, color: '#fffbeb' },
    { x: 629, y: 251, r: 0.8, delay: 0.42, color: '#fbbf24' },
    { x: 632, y: 250, r: 1.0, delay: 0.50, color: '#f59e0b' },
    { x: 628, y: 252, r: 0.9, delay: 0.58, color: '#fffbeb' },
    { x: 634, y: 251, r: 1.1, delay: 0.65, color: '#fbbf24' },
    { x: 630, y: 250, r: 0.8, delay: 0.72, color: '#f59e0b' },
    { x: 626, y: 252, r: 1.0, delay: 0.80, color: '#fbbf24' },
    { x: 633, y: 250, r: 0.9, delay: 0.88, color: '#fffbeb' },
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

        {/* Counter area (x: 615 to 660, y: 255 to 276) */}
        <g id="seasoning-station">
          {/* Wire Basket of Fresh Hot Chips */}
          <g id="chips-basket">
            {/* Ambient warmth */}
            <circle cx="628" cy="265" r="14" fill="url(#chipsGlowGrad)" />

            {/* Wire basket frame */}
            <rect x="618" y="260" width="22" height="14" rx="2" fill="#22160e" stroke="#523929" strokeWidth="1" />
            {/* Basket wire grid mesh */}
            <line x1="623" y1="260" x2="623" y2="274" stroke="#523929" strokeWidth="0.8" />
            <line x1="629" y1="260" x2="629" y2="274" stroke="#523929" strokeWidth="0.8" />
            <line x1="635" y1="260" x2="635" y2="274" stroke="#523929" strokeWidth="0.8" />
            {/* Basket handle */}
            <line x1="618" y1="262" x2="611" y2="258" stroke="#523929" strokeWidth="1.2" strokeLinecap="round" />

            {/* Golden Cut Hot Chips popping out */}
            <g strokeLinecap="round">
              <line x1="621" y1="260" x2="623" y2="252" stroke="#f59e0b" strokeWidth="2.4" />
              <line x1="625" y1="261" x2="627" y2="249" stroke="#fbbf24" strokeWidth="2.2" />
              <line x1="629" y1="260" x2="631" y2="251" stroke="#f59e0b" strokeWidth="2.4" />
              <line x1="633" y1="261" x2="636" y2="253" stroke="#fbbf24" strokeWidth="2.2" />
              <line x1="627" y1="258" x2="634" y2="255" stroke="#d97706" strokeWidth="2" />
            </g>
          </g>

          {/* Aussie Chicken-Salt Shaker */}
          <g
            id="salt-shaker"
            style={{
              transformOrigin: '646px 266px',
              animation: (!isReducedMotion && isShaking)
                ? 'shakerTiltShake 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                : 'none',
            }}
          >
            {/* Shaker body */}
            <rect x="642" y="250" width="11" height="18" rx="2" fill="url(#shakerMetalGrad)" stroke="#2d1c13" strokeWidth="0.8" />
            {/* Domed perforated shaker lid */}
            <path d="M 642 250 Q 647.5 245 653 250 Z" fill="#bfa595" stroke="#2d1c13" strokeWidth="0.8" />
            {/* Shaker handle loop */}
            <path d="M 653 253 Q 657 259 653 264" fill="none" stroke="#8d6e5c" strokeWidth="1" />
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
            /* Tilt over basket */
            transform: rotate(-44deg) translate(-10px, -6px);
          }
          32% {
            /* Shake 1 */
            transform: rotate(-52deg) translate(-12px, -8px);
          }
          44% {
            /* Rebound */
            transform: rotate(-40deg) translate(-9px, -5px);
          }
          56% {
            /* Shake 2 */
            transform: rotate(-50deg) translate(-12px, -7px);
          }
          68% {
            /* Shake 3 */
            transform: rotate(-42deg) translate(-9px, -5px);
          }
          85% {
            /* Returning */
            transform: rotate(-10deg) translate(-2px, -1px);
          }
          100% {
            /* Upright resting */
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
