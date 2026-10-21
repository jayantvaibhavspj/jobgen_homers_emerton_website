import React from 'react';

/**
 * MELTING CHEESE SVG COMPONENT
 * -------------------------------------------------------------
 * Provides an organic melted American cheddar slice with 3 dripping tears
 * that slump over the hot Angus beef patty edges upon impact.
 */
export default function MeltingCheese({ id, className = '', isSecondLayer = false }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 380 95"
        className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(217,119,6,0.4)]"
        fill="none"
      >
        <defs>
          <linearGradient id={`cheeseGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id={`glossGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
        </defs>

        {/* Melted Cheese Blanket with Organic Drips */}
        <path
          id={`cheese-body-${id}`}
          d={
            isSecondLayer
              ? "M 15 15 Q 60 10, 110 18 Q 150 5, 200 16 Q 260 8, 310 18 Q 360 12, 370 28 Q 365 55, 335 48 Q 295 72, 275 88 Q 255 70, 220 52 Q 170 82, 140 85 Q 115 56, 80 50 Q 45 74, 25 65 Q 10 45, 15 15 Z"
              : "M 10 18 Q 50 12, 100 20 Q 160 8, 220 18 Q 280 10, 330 22 Q 370 18, 375 32 Q 360 62, 330 52 Q 290 85, 265 92 Q 240 68, 195 54 Q 150 86, 120 88 Q 95 60, 60 52 Q 30 76, 15 62 Q 8 40, 10 18 Z"
          }
          fill={`url(#cheeseGrad-${id})`}
        />

        {/* Glossy Top Specular Highlight */}
        <path
          d="M 25 22 Q 100 15, 200 22 Q 300 16, 360 26 C 330 35, 250 30, 200 32 C 140 32, 60 36, 25 22 Z"
          fill={`url(#glossGrad-${id})`}
          opacity="0.75"
        />

        {/* Droplet 1 Tip Glow */}
        <ellipse cx={isSecondLayer ? "140" : "120"} cy={isSecondLayer ? "82" : "85"} rx="6" ry="7" fill="#fbbf24" />
        {/* Droplet 2 Tip Glow */}
        <ellipse cx={isSecondLayer ? "275" : "265"} cy={isSecondLayer ? "85" : "89"} rx="7" ry="8" fill="#f59e0b" />
      </svg>
    </div>
  );
}
