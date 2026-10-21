import React from 'react';

/**
 * FRIES POUR COMPONENT
 * -------------------------------------------------------------
 * 12 individual golden fry pieces that pour and cascade into the bowl
 * with staggered gravity drops and rotational settling.
 */
const FRY_VARIANTS = [
  { img: '/feature-burger/fry-1.webp', x: 25, y: 75, rot: -22, w: 90, h: 28 },
  { img: '/feature-burger/fry-2.webp', x: 40, y: 60, rot: -8, w: 105, h: 36 },
  { img: '/feature-burger/fry-3.webp', x: 75, y: 55, rot: 14, w: 98, h: 32 },
  { img: '/feature-burger/fry-4.webp', x: 110, y: 65, rot: 28, w: 75, h: 30 },
  { img: '/feature-burger/fry-1.webp', x: 30, y: 45, rot: -35, w: 95, h: 30 },
  { img: '/feature-burger/fry-2.webp', x: 60, y: 40, rot: -12, w: 100, h: 34 },
  { img: '/feature-burger/fry-3.webp', x: 95, y: 35, rot: 8, w: 102, h: 33 },
  { img: '/feature-burger/fry-4.webp', x: 125, y: 45, rot: 32, w: 78, h: 30 },
  { img: '/feature-burger/fry-2.webp', x: 45, y: 25, rot: -18, w: 108, h: 36 },
  { img: '/feature-burger/fry-3.webp', x: 80, y: 20, rot: -2, w: 105, h: 34 },
  { img: '/feature-burger/fry-1.webp', x: 115, y: 25, rot: 20, w: 96, h: 30 },
  { img: '/feature-burger/fry-4.webp', x: 70, y: 12, rot: 5, w: 85, h: 28 },
];

export default function FriesPour({ bowlRef, fryItemsRef, className = '' }) {
  return (
    <div className={`relative w-[230px] h-[190px] pointer-events-none select-none ${className}`}>
      {/* Rustic Small Ceramic Bowl */}
      <div
        ref={bowlRef}
        className="absolute bottom-0 left-0 w-full h-[140px] z-10"
      >
        <svg viewBox="0 0 240 140" className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#44403c" />
              <stop offset="60%" stopColor="#292524" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
            <linearGradient id="bowlRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78716c" />
              <stop offset="50%" stopColor="#a8a29e" />
              <stop offset="100%" stopColor="#57534e" />
            </linearGradient>
          </defs>
          {/* Bowl Body */}
          <path d="M 20 50 Q 30 135, 120 135 Q 210 135, 220 50 Z" fill="url(#bowlGrad)" />
          {/* Inner Cavity */}
          <ellipse cx="120" cy="50" rx="100" ry="24" fill="#1c1917" />
          {/* Top Rim Highlight */}
          <ellipse cx="120" cy="50" rx="98" ry="22" fill="none" stroke="url(#bowlRim)" strokeWidth="3" />
        </svg>
      </div>

      {/* Cascading Golden Fries Container */}
      <div className="absolute inset-0 z-20 overflow-visible">
        {FRY_VARIANTS.map((fry, idx) => (
          <div
            key={idx}
            ref={(el) => (fryItemsRef.current[idx] = el)}
            className="absolute will-change-transform filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.35)]"
            style={{
              left: `${fry.x}px`,
              top: `${fry.y}px`,
              width: `${fry.w}px`,
              height: `${fry.h}px`,
              transform: `translateY(-350px) rotate(${fry.rot * 2}deg)`,
              opacity: 0,
            }}
          >
            <img
              src={fry.img}
              alt=""
              className="w-full h-full object-contain pointer-events-none"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
