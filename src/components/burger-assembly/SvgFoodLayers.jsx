import React from 'react';

/**
 * APPETIZING POLISHED SVG FOOD LAYERS
 * -------------------------------------------------------------
 * Hand-crafted with rich gradients, organic curved silhouettes,
 * highlights, and subtle drop-shadows. Provides 100% clean silhouettes
 * without any rectangular bitmap clipping artifacts.
 */

// 1. Bottom Brioche Bun
export function SvgBunBottom({ className = '' }) {
  return (
    <svg viewBox="0 0 320 90" className={`w-full h-auto filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] ${className}`} fill="none">
      <defs>
        <linearGradient id="bunBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="25%" stopColor="#d97706" />
          <stop offset="80%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <path
        d="M 25 25 Q 160 12, 295 25 Q 305 60, 275 80 Q 160 92, 45 80 Q 15 60, 25 25 Z"
        fill="url(#bunBottomGrad)"
      />
      {/* Golden crumb rim highlight */}
      <path
        d="M 30 28 Q 160 18, 290 28"
        stroke="#fde68a"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

// 2. Crisp Curly Lettuce & House Sauce
export function SvgLettuce({ className = '' }) {
  return (
    <svg viewBox="0 0 340 70" className={`w-full h-auto filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)] ${className}`} fill="none">
      <defs>
        <linearGradient id="lettuceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="60%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>
      {/* Creamy House Mayo Dollops */}
      <ellipse cx="90" cy="22" rx="28" ry="8" fill="#fef9c3" opacity="0.9" />
      <ellipse cx="170" cy="20" rx="34" ry="9" fill="#fef9c3" opacity="0.95" />
      <ellipse cx="250" cy="24" rx="26" ry="8" fill="#fef9c3" opacity="0.9" />
      {/* Ruffled Lettuce Leaves */}
      <path
        d="M 15 32 Q 40 18, 70 30 Q 100 15, 130 28 Q 170 12, 210 28 Q 245 15, 275 30 Q 305 20, 325 35 Q 310 62, 260 58 Q 210 68, 160 60 Q 110 68, 60 60 Q 25 58, 15 32 Z"
        fill="url(#lettuceGrad)"
      />
      {/* Leaf ribs and textures */}
      <path d="M 60 30 Q 90 45, 120 38" stroke="#86efac" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M 160 28 Q 185 46, 220 38" stroke="#86efac" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// 3. Ripe Tomatoes & Pickles
export function SvgTomatoPickle({ className = '' }) {
  return (
    <svg viewBox="0 0 330 65" className={`w-full h-auto filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)] ${className}`} fill="none">
      <defs>
        <linearGradient id="tomatoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="60%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="pickleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#4d7c0f" />
        </linearGradient>
      </defs>
      {/* Left Crinkle-Cut Pickle Slice */}
      <ellipse cx="65" cy="32" rx="42" ry="16" fill="url(#pickleGrad)" stroke="#365314" strokeWidth="2" />
      <circle cx="65" cy="32" r="3" fill="#bef264" opacity="0.7" />
      {/* Right Pickle Slice */}
      <ellipse cx="265" cy="34" rx="40" ry="16" fill="url(#pickleGrad)" stroke="#365314" strokeWidth="2" />
      {/* Center Juicy Red Tomato Slice */}
      <rect x="75" y="16" width="180" height="34" rx="17" fill="url(#tomatoGrad)" />
      {/* Tomato Gel and Seed Chambers */}
      <ellipse cx="120" cy="33" rx="18" ry="8" fill="#fca5a5" opacity="0.75" />
      <ellipse cx="165" cy="33" rx="20" ry="9" fill="#fca5a5" opacity="0.8" />
      <ellipse cx="210" cy="33" rx="18" ry="8" fill="#fca5a5" opacity="0.75" />
    </svg>
  );
}

// 4. Flame-Grilled Angus Patty
export function SvgPatty({ id = '1', className = '' }) {
  return (
    <svg viewBox="0 0 330 75" className={`w-full h-auto filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)] ${className}`} fill="none">
      <defs>
        <linearGradient id={`pattyGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#57361e" />
          <stop offset="30%" stopColor="#3d2110" />
          <stop offset="70%" stopColor="#24140a" />
          <stop offset="100%" stopColor="#140a05" />
        </linearGradient>
      </defs>
      {/* Angus Patty Body */}
      <rect x="15" y="12" width="300" height="52" rx="22" fill={`url(#pattyGrad-${id})`} />
      {/* Charred Grill Marks */}
      <path d="M 50 16 L 85 58" stroke="#000000" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <path d="M 105 16 L 140 58" stroke="#000000" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <path d="M 160 16 L 195 58" stroke="#000000" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <path d="M 215 16 L 250 58" stroke="#000000" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <path d="M 270 16 L 295 52" stroke="#000000" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      {/* Sizzle Glisten Highlight */}
      <ellipse cx="165" cy="22" rx="110" ry="4" fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}

// 5. Woodfired Crispy Bacon
export function SvgBacon({ className = '' }) {
  return (
    <svg viewBox="0 0 350 70" className={`w-full h-auto filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)] ${className}`} fill="none">
      <defs>
        <linearGradient id="baconGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="25%" stopColor="#b91c1c" />
          <stop offset="45%" stopColor="#fecaca" />
          <stop offset="60%" stopColor="#991b1b" />
          <stop offset="85%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>
      </defs>
      {/* Rasher 1 */}
      <path
        d="M 15 28 Q 65 8, 120 32 Q 180 50, 240 25 Q 295 8, 335 32 Q 295 48, 240 38 Q 180 62, 120 44 Q 65 24, 15 42 Z"
        fill="url(#baconGrad)"
      />
      {/* Rasher 2 with crispy charred curls */}
      <path
        d="M 35 38 Q 85 18, 140 40 Q 200 60, 260 35 Q 310 18, 340 42 Q 300 58, 250 48 Q 190 70, 135 52 Q 80 32, 35 50 Z"
        fill="url(#baconGrad)"
        opacity="0.9"
      />
    </svg>
  );
}

// 6. Top Sesame Seed Brioche Bun
export function SvgBunTop({ className = '' }) {
  return (
    <svg viewBox="0 0 330 180" className={`w-full h-auto filter drop-shadow-[0_16px_25px_rgba(0,0,0,0.5)] ${className}`} fill="none">
      <defs>
        <radialGradient id="bunTopGrad" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="35%" stopColor="#d97706" />
          <stop offset="75%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
        <linearGradient id="bunHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>
      {/* Tall Glossy Brioche Dome */}
      <path
        d="M 20 150 C 15 30, 315 30, 310 150 C 270 172, 60 172, 20 150 Z"
        fill="url(#bunTopGrad)"
      />
      {/* Glossy Specular Sheen */}
      <ellipse cx="140" cy="65" rx="90" ry="26" fill="url(#bunHighlight)" transform="rotate(-6 140 65)" />
      {/* Toasted Sesame Seeds */}
      {[
        [90, 55], [130, 42], [165, 40], [205, 52], [245, 75],
        [75, 80], [110, 68], [150, 60], [185, 62], [225, 80],
        [95, 105], [135, 92], [175, 88], [215, 102], [255, 115],
        [60, 118], [115, 125], [160, 118], [200, 122], [240, 132],
      ].map(([cx, cy], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="3.5"
          ry="2"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="0.8"
          transform={`rotate(${((cx * 7) % 60) - 30} ${cx} ${cy})`}
        />
      ))}
    </svg>
  );
}

// 7. Dark Ceramic Plate Base
export function SvgPlateBase({ className = '' }) {
  return (
    <svg viewBox="0 0 500 420" className={`w-full h-full filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)] ${className}`} fill="none">
      <defs>
        <radialGradient id="plateCeramic" cx="48%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#26211d" />
          <stop offset="65%" stopColor="#1a1613" />
          <stop offset="92%" stopColor="#110d0b" />
          <stop offset="100%" stopColor="#2e2722" />
        </radialGradient>
        <linearGradient id="plateRimBevel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#574d44" />
          <stop offset="40%" stopColor="#38312b" />
          <stop offset="80%" stopColor="#17120e" />
          <stop offset="100%" stopColor="#453c34" />
        </linearGradient>
      </defs>
      {/* Outer Ceramic Plate */}
      <ellipse cx="250" cy="210" rx="230" ry="190" fill="url(#plateRimBevel)" />
      {/* Plate Interior Basin */}
      <ellipse cx="250" cy="210" rx="205" ry="168" fill="url(#plateCeramic)" />
      {/* Upper Specular Light Rim */}
      <path
        d="M 55 170 Q 250 40, 445 170"
        stroke="rgba(255, 255, 255, 0.22)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
