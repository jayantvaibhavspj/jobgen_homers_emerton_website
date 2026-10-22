import React from 'react';
import {
  SvgBunBottom,
  SvgLettuce,
  SvgTomatoPickle,
  SvgPatty,
  SvgBacon,
  SvgBunTop,
  SvgPlateBase,
} from './SvgFoodLayers';

// Re-export original burger components for backward compatibility
export {
  SvgBunBottom,
  SvgLettuce,
  SvgTomatoPickle,
  SvgPatty,
  SvgBacon,
  SvgBunTop,
  SvgPlateBase,
};

// ========================================================
// 1. FISH & CHIPS FOOD LAYERS
// ========================================================

/**
 * Greaseproof Deli Paper Liner (resting on plate)
 */
export function SvgDeliPaper({ className = '' }) {
  return (
    <svg viewBox="0 0 380 260" className={`w-full h-auto filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] ${className}`} fill="none">
      <defs>
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fafaf9" />
          <stop offset="50%" stopColor="#f5f5f4" />
          <stop offset="100%" stopColor="#e7e5e4" />
        </linearGradient>
      </defs>
      {/* Folded / Crinkled deli paper */}
      <polygon
        points="30,40 350,20 370,210 210,250 20,220"
        fill="url(#paperGrad)"
        stroke="#d6d3d1"
        strokeWidth="1.5"
      />
      {/* Paper fold creases */}
      <line x1="30" y1="40" x2="210" y2="250" stroke="#d6d3d1" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="350" y1="20" x2="20" y2="220" stroke="#d6d3d1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      {/* Vintage watermark stamp */}
      <text
        x="180"
        y="140"
        fill="#a8a29e"
        fontSize="12"
        fontFamily="serif"
        fontWeight="bold"
        letterSpacing="2"
        transform="rotate(-12 180 140)"
        opacity="0.35"
      >
        HOMERS FRESH SEAFOOD
      </text>
    </svg>
  );
}

/**
 * Crispy Golden Crumbed Fish Fillet
 */
export function SvgFishFillet({ id = '1', className = '' }) {
  return (
    <svg viewBox="0 0 320 130" className={`w-full h-auto filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)] ${className}`} fill="none">
      <defs>
        <radialGradient id={`filletGrad-${id}`} cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="65%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <linearGradient id={`pankoHighlight-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Crunchy Organic Fillet Silhouette */}
      <path
        d="M 25 70 Q 20 25, 100 15 Q 220 8, 295 40 Q 315 75, 270 105 Q 180 125, 80 115 Q 30 110, 25 70 Z"
        fill={`url(#filletGrad-${id})`}
      />
      {/* Crispy Jagged Panko Edge Highlights */}
      <path
        d="M 35 60 Q 60 25, 120 22 Q 210 18, 280 45 Q 260 90, 190 105 Q 110 112, 50 85"
        stroke={`url(#pankoHighlight-${id})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      {/* Golden Panko Crunch Specks */}
      {[
        [60, 45], [95, 35], [140, 32], [185, 38], [230, 48], [265, 62],
        [75, 75], [115, 65], [160, 60], [205, 68], [245, 82],
        [90, 95], [135, 88], [175, 92], [215, 95],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={(i % 3) + 2}
          fill="#fef08a"
          opacity="0.85"
        />
      ))}
      {/* Parsley Flakes on Fish */}
      <ellipse cx="145" cy="50" rx="3.5" ry="2" fill="#15803d" transform="rotate(25 145 50)" />
      <ellipse cx="200" cy="55" rx="3" ry="1.8" fill="#16a34a" transform="rotate(-35 200 55)" />
      <ellipse cx="105" cy="65" rx="3" ry="2" fill="#15803d" transform="rotate(15 105 65)" />
    </svg>
  );
}

/**
 * House-Made Tartare Sauce in Ceramic Ramekin with Capers & Wooden Spoon
 */
export function SvgTartarePot({ className = '' }) {
  return (
    <svg viewBox="0 0 160 140" className={`w-full h-auto filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)] ${className}`} fill="none">
      <defs>
        <linearGradient id="ramekinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
        <radialGradient id="tartareGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fef08a" />
        </radialGradient>
      </defs>
      {/* Ramekin Cup Body */}
      <path d="M 25 55 Q 32 125, 80 128 Q 128 125, 135 55 Z" fill="url(#ramekinGrad)" stroke="#9ca3af" strokeWidth="2" />
      {/* Ceramic Rim */}
      <ellipse cx="80" cy="55" rx="56" ry="18" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
      {/* Creamy Tartare Surface */}
      <ellipse cx="80" cy="55" rx="50" ry="15" fill="url(#tartareGrad)" />
      {/* Green Caper & Dill Specks */}
      <circle cx="65" cy="54" r="3" fill="#3f6212" />
      <circle cx="85" cy="52" r="3.5" fill="#4d7c0f" />
      <circle cx="102" cy="56" r="2.8" fill="#3f6212" />
      <circle cx="75" cy="60" r="2.2" fill="#65a30d" />
      <circle cx="95" cy="62" r="2.5" fill="#365314" />
      {/* Little Wooden Tasting Spoon */}
      <path d="M 95 56 Q 125 40, 155 18" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Crispy Golden Calamari Ring
 */
export function SvgCalamariRing({ className = '' }) {
  return (
    <svg viewBox="0 0 100 80" className={`w-full h-auto filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] ${className}`} fill="none">
      <defs>
        <linearGradient id="calamariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Outer Golden Crust */}
      <ellipse cx="50" cy="40" rx="44" ry="32" fill="url(#calamariGrad)" />
      {/* Inner Hole */}
      <ellipse cx="50" cy="40" rx="24" ry="16" fill="#1c1917" opacity="0.85" />
      {/* Crispy Specular Edge */}
      <path d="M 20 32 Q 50 14, 80 32" stroke="#fef9c3" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Golden Hand-Cut Chips Pile
 */
export function SvgChipsPile({ className = '' }) {
  return (
    <svg viewBox="0 0 260 170" className={`w-full h-auto filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] ${className}`} fill="none">
      <defs>
        <linearGradient id="fryGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="fryGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      {/* Stacked Hand-Cut Chips */}
      <rect x="30" y="110" width="130" height="24" rx="7" fill="url(#fryGrad1)" transform="rotate(-15 30 110)" />
      <rect x="70" y="95" width="140" height="26" rx="7" fill="url(#fryGrad2)" transform="rotate(12 70 95)" />
      <rect x="40" y="80" width="135" height="25" rx="7" fill="url(#fryGrad1)" transform="rotate(-6 40 80)" />
      <rect x="90" y="65" width="125" height="24" rx="7" fill="url(#fryGrad2)" transform="rotate(22 90 65)" />
      <rect x="60" y="55" width="145" height="26" rx="7" fill="url(#fryGrad1)" transform="rotate(-2 60 55)" />
      <rect x="80" y="35" width="120" height="24" rx="7" fill="url(#fryGrad2)" transform="rotate(8 80 35)" />
      <rect x="110" y="20" width="105" height="22" rx="6" fill="url(#fryGrad1)" transform="rotate(-14 110 20)" />
      {/* Chicken Salt Dusted Specks */}
      {[
        [80, 50], [120, 40], [150, 45], [170, 35], [95, 75],
        [140, 70], [180, 75], [70, 100], [130, 95], [165, 110],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="#fef9c3" />
      ))}
    </svg>
  );
}

// ========================================================
// 2. HOT ROASTS & CARVERY LAYERS
// ========================================================

/**
 * Crispy Roasted Golden Potato Wedges
 */
export function SvgRoastPotatoes({ className = '' }) {
  return (
    <svg viewBox="0 0 200 130" className={`w-full h-auto filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)] ${className}`} fill="none">
      <defs>
        <radialGradient id="roastPotatoGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#d97706" />
          <stop offset="85%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
      </defs>
      {/* Potato Wedge 1 */}
      <path d="M 20 80 Q 30 30, 90 40 Q 110 85, 60 100 Z" fill="url(#roastPotatoGrad)" />
      <path d="M 30 50 Q 60 38, 85 45" stroke="#fef9c3" strokeWidth="2.5" strokeLinecap="round" />
      {/* Potato Wedge 2 */}
      <path d="M 75 75 Q 110 20, 165 45 Q 170 95, 120 105 Z" fill="url(#roastPotatoGrad)" />
      <path d="M 95 40 Q 135 30, 155 48" stroke="#fef9c3" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Sweet Caramelized Roasted Pumpkin Wedge
 */
export function SvgRoastPumpkin({ className = '' }) {
  return (
    <svg viewBox="0 0 180 110" className={`w-full h-auto filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)] ${className}`} fill="none">
      <defs>
        <linearGradient id="pumpkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="40%" stopColor="#ea580c" />
          <stop offset="85%" stopColor="#9a3412" />
          <stop offset="100%" stopColor="#431407" />
        </linearGradient>
      </defs>
      {/* Crescent Shaped Pumpkin Wedge */}
      <path
        d="M 20 80 Q 40 20, 140 18 Q 165 45, 120 85 Q 70 95, 20 80 Z"
        fill="url(#pumpkinGrad)"
      />
      {/* Charred Roast Edge */}
      <path d="M 25 78 Q 45 22, 138 20" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
      <path d="M 45 35 Q 100 32, 128 50" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Sweet Garden Peas
 */
export function SvgGardenPeas({ className = '' }) {
  return (
    <svg viewBox="0 0 180 100" className={`w-full h-auto filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)] ${className}`} fill="none">
      <defs>
        <radialGradient id="peaGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#14532d" />
        </radialGradient>
      </defs>
      {[
        [30, 60, 9], [50, 48, 10], [70, 58, 8.5], [88, 42, 10],
        [108, 55, 9.5], [125, 45, 9], [145, 60, 8],
        [42, 75, 9], [62, 70, 9.5], [82, 72, 10], [102, 68, 9], [120, 75, 8.5],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="url(#peaGrad)" />
      ))}
    </svg>
  );
}

/**
 * Succulent Thick Slices of Carved Roast Meat
 */
export function SvgCarvedRoast({ className = '' }) {
  return (
    <svg viewBox="0 0 320 140" className={`w-full h-auto filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.5)] ${className}`} fill="none">
      <defs>
        <linearGradient id="roastMeatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="30%" stopColor="#92400e" />
          <stop offset="70%" stopColor="#57361e" />
          <stop offset="100%" stopColor="#2e1a0f" />
        </linearGradient>
        <linearGradient id="cracklingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Slice 1 (Underneath) */}
      <path
        d="M 30 75 Q 80 30, 260 40 Q 285 85, 230 115 Q 120 125, 30 75 Z"
        fill="url(#roastMeatGrad)"
      />
      {/* Slice 2 (Overlapping) */}
      <path
        d="M 50 60 Q 120 20, 280 35 Q 295 78, 245 105 Q 140 115, 50 60 Z"
        fill="url(#roastMeatGrad)"
      />
      {/* Golden Crispy Crackling Top Crust */}
      <path
        d="M 52 58 Q 120 18, 282 33 Q 275 48, 240 45 Q 140 38, 52 58 Z"
        fill="url(#cracklingGrad)"
      />
      <path d="M 60 52 Q 130 18, 275 32" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tender Meat Grain Fibers */}
      <path d="M 100 65 Q 180 62, 230 75" stroke="#a16207" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />
      <path d="M 120 80 Q 170 78, 210 90" stroke="#a16207" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
    </svg>
  );
}

/**
 * Rich Steaming Pan Gravy Pour Stream & Pool
 */
export function SvgPanGravyStream({ className = '' }) {
  return (
    <svg viewBox="0 0 280 160" className={`w-full h-auto filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)] ${className}`} fill="none">
      <defs>
        <radialGradient id="gravyPoolGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="60%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1c0b02" />
        </radialGradient>
      </defs>
      {/* Glossy Gravy Stream Pouring Down */}
      <path
        d="M 140 0 C 135 40, 160 50, 150 90 C 140 115, 110 120, 140 150"
        stroke="#451a03"
        strokeWidth="28"
        strokeLinecap="round"
      />
      {/* Gravy Pooling Over Meat */}
      <ellipse cx="140" cy="115" rx="85" ry="32" fill="url(#gravyPoolGrad)" />
      {/* Glistening Gravy Sheen */}
      <ellipse cx="130" cy="110" rx="45" ry="12" fill="rgba(255,255,255,0.22)" />
    </svg>
  );
}

/**
 * Garden Rosemary Sprig Garnish
 */
export function SvgRosemarySprig({ className = '' }) {
  return (
    <svg viewBox="0 0 160 80" className={`w-full h-auto filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] ${className}`} fill="none">
      {/* Stem */}
      <path d="M 15 65 Q 80 40, 145 25" stroke="#713f12" strokeWidth="3" strokeLinecap="round" />
      {/* Needle Leaves */}
      {[
        [35, 55, -30], [55, 48, -40], [75, 42, -35], [95, 36, -45], [115, 30, -40], [135, 26, -20],
        [45, 58, 30], [65, 52, 40], [85, 46, 35], [105, 40, 45], [125, 34, 40],
      ].map(([x, y, rot], i) => (
        <path
          key={i}
          d={`M ${x} ${y} L ${x + 12} ${y - 14}`}
          stroke="#166534"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${rot} ${x} ${y})`}
        />
      ))}
    </svg>
  );
}

// ========================================================
// 3. AROMATIC CURRIES LAYERS
// ========================================================

/**
 * Deep Ceramic Curry Bowl Filled with Rich Butter Chicken
 */
export function SvgCurryBowl({ className = '' }) {
  return (
    <svg viewBox="0 0 340 240" className={`w-full h-auto filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)] ${className}`} fill="none">
      <defs>
        <radialGradient id="currySauceGrad" cx="50%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="40%" stopColor="#ea580c" />
          <stop offset="75%" stopColor="#c2410c" />
          <stop offset="100%" stopColor="#7c2d12" />
        </radialGradient>
        <linearGradient id="curryBowlRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="50%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
      </defs>
      {/* Dark Ceramic Bowl Basin */}
      <ellipse cx="170" cy="130" rx="155" ry="105" fill="url(#curryBowlRim)" stroke="#52525b" strokeWidth="4" />
      {/* Rich Simmering Butter Chicken Curry Sauce */}
      <ellipse cx="170" cy="130" rx="140" ry="92" fill="url(#currySauceGrad)" />
      {/* Tender Grilled Chicken Tikka Chunks Floating */}
      <ellipse cx="120" cy="115" rx="26" ry="16" fill="#9a3412" stroke="#431407" strokeWidth="2" />
      <ellipse cx="195" cy="105" rx="30" ry="18" fill="#9a3412" stroke="#431407" strokeWidth="2" />
      <ellipse cx="155" cy="150" rx="28" ry="17" fill="#9a3412" stroke="#431407" strokeWidth="2" />
      <ellipse cx="230" cy="140" rx="24" ry="15" fill="#9a3412" stroke="#431407" strokeWidth="2" />
      {/* Charred Tandoor Grill Spots on Chicken */}
      <circle cx="125" cy="113" r="4" fill="#1c1917" opacity="0.8" />
      <circle cx="198" cy="103" r="5" fill="#1c1917" opacity="0.8" />
      <circle cx="158" cy="148" r="4" fill="#1c1917" opacity="0.8" />
    </svg>
  );
}

/**
 * Velvety Cream Swirl & Crushed Fenugreek Drizzle
 */
export function SvgCreamFenugreek({ className = '' }) {
  return (
    <svg viewBox="0 0 280 180" className={`w-full h-auto filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] ${className}`} fill="none">
      {/* Creamy White Spiral Swirls */}
      <path
        d="M 60 90 Q 110 50, 160 85 Q 210 120, 180 140 Q 150 150, 120 125 Q 100 100, 140 95"
        stroke="#fffbeb"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M 90 70 Q 140 40, 190 75 Q 230 110, 200 130"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Crushed Dried Kasoori Methi (Fenugreek) Specks */}
      {[
        [85, 75], [115, 60], [150, 70], [180, 85], [205, 105],
        [130, 95], [160, 110], [175, 130], [140, 135], [110, 115],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#15803d" />
      ))}
    </svg>
  );
}

/**
 * Steamed Fluffy Basmati Rice Bowl with Saffron & Cumin
 */
export function SvgBasmatiRiceBowl({ className = '' }) {
  return (
    <svg viewBox="0 0 190 150" className={`w-full h-auto filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)] ${className}`} fill="none">
      <defs>
        <linearGradient id="riceBowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
      </defs>
      {/* Bowl Body */}
      <ellipse cx="95" cy="85" rx="85" ry="55" fill="url(#riceBowlGrad)" stroke="#52525b" strokeWidth="2.5" />
      {/* Fluffy Rice Mound */}
      <ellipse cx="95" cy="78" rx="80" ry="50" fill="#fefce8" />
      {/* Saffron Strands and Cumin Seeds */}
      {[
        [60, 70, 25], [80, 60, -15], [105, 55, 30], [130, 65, -40],
        [75, 85, 10], [95, 80, -20], [120, 82, 35], [140, 80, -10],
      ].map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          {/* Cumin seed */}
          <ellipse
            cx={cx}
            cy={cy}
            rx="4"
            ry="1.8"
            fill="#713f12"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          {/* Saffron thread */}
          <line
            x1={cx + 5}
            y1={cy - 5}
            x2={cx + 12}
            y2={cy}
            stroke="#ea580c"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </React.Fragment>
      ))}
    </svg>
  );
}

/**
 * Warm Blistered Garlic Naan with Melted Ghee Glaze
 */
export function SvgGarlicNaan({ className = '' }) {
  return (
    <svg viewBox="0 0 240 180" className={`w-full h-auto filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] ${className}`} fill="none">
      <defs>
        <radialGradient id="naanGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="40%" stopColor="#fde68a" />
          <stop offset="75%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
      </defs>
      {/* Traditional Teardrop Naan Silhouette */}
      <path
        d="M 40 130 C 15 60, 80 15, 190 25 C 235 70, 230 145, 160 165 C 95 180, 50 160, 40 130 Z"
        fill="url(#naanGrad)"
      />
      {/* Tandoori Charred Blister Bubbles */}
      <circle cx="85" cy="70" r="14" fill="#451a03" opacity="0.85" />
      <circle cx="140" cy="55" r="16" fill="#451a03" opacity="0.88" />
      <circle cx="180" cy="90" r="12" fill="#451a03" opacity="0.85" />
      <circle cx="120" cy="115" r="15" fill="#451a03" opacity="0.85" />
      <circle cx="70" cy="120" r="11" fill="#451a03" opacity="0.85" />
      {/* Melted Ghee Butter Glaze Highlight */}
      <path d="M 60 55 Q 120 30, 185 45" stroke="rgba(255,255,255,0.45)" strokeWidth="4" strokeLinecap="round" />
      {/* Chopped Garlic & Cilantro Flecks */}
      {[
        [95, 45], [115, 75], [155, 75], [165, 120], [105, 135],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#15803d" />
      ))}
    </svg>
  );
}

// ========================================================
// 4. CHARCOAL CHICKEN LAYERS
// ========================================================

/**
 * Succulent Half Charcoal Rotisserie Chicken
 */
export function SvgCharcoalChickenPiece({ className = '' }) {
  return (
    <svg viewBox="0 0 310 180" className={`w-full h-auto filter drop-shadow-[0_16px_25px_rgba(0,0,0,0.5)] ${className}`} fill="none">
      <defs>
        <radialGradient id="chickenSkinGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="35%" stopColor="#d97706" />
          <stop offset="70%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
      </defs>
      {/* Rotisserie Chicken Half Silhouette */}
      <path
        d="M 45 110 C 20 60, 95 15, 220 20 C 285 45, 295 125, 240 155 C 160 175, 75 155, 45 110 Z"
        fill="url(#chickenSkinGrad)"
      />
      {/* Drumstick Bone & End */}
      <path d="M 240 135 L 290 150" stroke="#f5f5f4" strokeWidth="12" strokeLinecap="round" />
      <circle cx="292" cy="151" r="8" fill="#e7e5e4" />
      {/* Glowing Charcoal Grill Char Marks */}
      <path d="M 80 45 Q 120 95, 145 140" stroke="#1c1917" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <path d="M 125 35 Q 165 85, 190 130" stroke="#1c1917" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <path d="M 170 30 Q 210 75, 235 115" stroke="#1c1917" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      {/* Crispy Skin Highlight */}
      <path d="M 70 35 Q 140 18, 210 25" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/**
 * Creamy Lebanese Garlic Toum Pot
 */
export function SvgGarlicToumPot({ className = '' }) {
  return (
    <svg viewBox="0 0 140 120" className={`w-full h-auto filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)] ${className}`} fill="none">
      <ellipse cx="70" cy="50" rx="55" ry="25" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="2" />
      <path d="M 15 50 Q 20 105, 70 108 Q 120 105, 125 50 Z" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="2" />
      {/* Whipped White Garlic Sauce Dip */}
      <ellipse cx="70" cy="50" rx="48" ry="20" fill="#ffffff" />
      {/* Olive oil drizzle drop */}
      <ellipse cx="65" cy="48" rx="14" ry="6" fill="#facc15" opacity="0.75" />
    </svg>
  );
}
