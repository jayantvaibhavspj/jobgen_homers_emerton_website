import React from 'react';

/**
 * BANNER ILLUSTRATIONS (FLAT-RICH STUDIO CUT-OUTS)
 * -------------------------------------------------------------
 * Transparent vector artworks with warm side-lighting, rim glows, and depth.
 */

// 1. BURGER
export function BannerBurger({ className = 'w-32 h-32' }) {
  return (
    <svg viewBox="0 0 120 110" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="b-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <radialGradient id="b-bun-grad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
      </defs>
      <g filter="url(#b-shadow)">
        <path d="M25 48C25 24 40 14 60 14C80 14 95 24 95 48H25Z" fill="url(#b-bun-grad)" />
        <ellipse cx="45" cy="26" rx="1.8" ry="1" fill="#fef3c7" transform="rotate(-15 45 26)" />
        <ellipse cx="60" cy="22" rx="1.8" ry="1" fill="#fef3c7" />
        <ellipse cx="75" cy="28" rx="1.8" ry="1" fill="#fef3c7" transform="rotate(20 75 28)" />
        <ellipse cx="52" cy="34" rx="1.8" ry="1" fill="#fef3c7" />
        <ellipse cx="68" cy="36" rx="1.8" ry="1" fill="#fef3c7" transform="rotate(-10 68 36)" />
        {/* Bacon */}
        <path d="M22 51C35 55 48 48 60 53C72 58 84 51 98 53" stroke="#991b1b" strokeWidth="4" strokeLinecap="round" />
        {/* Cheddar Melt */}
        <path d="M20 54C30 60 42 55 52 61C65 54 75 60 100 56" fill="#f59e0b" />
        {/* Angus Patty */}
        <rect x="20" y="58" width="80" height="11" rx="5.5" fill="#381907" />
        <path d="M30 60L35 66 M50 60L55 66 M70 60L75 66 M85 60L90 66" stroke="#1f0d04" strokeWidth="2" strokeLinecap="round" />
        {/* Lettuce */}
        <path d="M18 73Q38 79 60 73Q82 79 102 73" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
        {/* Bottom Bun */}
        <path d="M25 76C25 82 40 85 60 85C80 85 95 82 95 76H25Z" fill="#b45309" />
      </g>
    </svg>
  );
}

// 2. CURRY BOWL
export function BannerCurry({ className = 'w-32 h-32' }) {
  return (
    <svg viewBox="0 0 120 110" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="c-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#c-shadow)">
        <ellipse cx="60" cy="92" rx="42" ry="8" fill="#000" opacity="0.35" />
        <path d="M78 40L102 32C106 50 96 64 82 70L78 40Z" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />
        <circle cx="90" cy="46" r="1.5" fill="#b45309" />
        {/* Copper Handi Bowl */}
        <ellipse cx="60" cy="74" rx="46" ry="18" fill="#1c1917" stroke="#ea580c" strokeWidth="2" />
        {/* Butter Chicken Gravy */}
        <ellipse cx="58" cy="72" rx="38" ry="13" fill="#ea580c" />
        <ellipse cx="58" cy="71" rx="32" ry="10" fill="#f97316" />
        {/* Chicken Tikka chunks */}
        <ellipse cx="48" cy="70" rx="7" ry="4.5" fill="#9a3412" />
        <ellipse cx="64" cy="73" rx="8" ry="5" fill="#7c2d12" />
        <ellipse cx="72" cy="67" rx="6" ry="4" fill="#9a3412" />
        {/* Cream Swirl */}
        <path d="M44 70Q58 64 64 72Q70 80 56 77" stroke="#fef3c7" strokeWidth="3" strokeLinecap="round" />
        {/* Cilantro */}
        <circle cx="56" cy="69" r="2" fill="#16a34a" />
        <circle cx="61" cy="71" r="2" fill="#16a34a" />
      </g>
    </svg>
  );
}

// 3. FISH & CHIPS CONE
export function BannerFishCone({ className = 'w-32 h-32' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="f-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#f-shadow)">
        {/* Golden Chips Sticks sticking out */}
        <rect x="36" y="24" width="7" height="36" rx="2" fill="#f59e0b" transform="rotate(-15 36 24)" />
        <rect x="48" y="16" width="7" height="42" rx="2" fill="#fbbf24" transform="rotate(-4 48 16)" />
        <rect x="62" y="18" width="7" height="40" rx="2" fill="#f59e0b" transform="rotate(8 62 18)" />
        <rect x="74" y="26" width="7" height="34" rx="2" fill="#fbbf24" transform="rotate(18 74 26)" />
        {/* Crumbed Fish Fillet */}
        <path d="M26 48C30 32 58 24 86 32C98 36 102 46 92 58C78 68 42 68 26 48Z" fill="#d97706" />
        <path d="M30 46C34 34 58 27 82 34C92 38 96 46 88 55C76 63 44 63 30 46Z" fill="#f59e0b" />
        {/* Lemon Wedge */}
        <path d="M72 44L88 40C92 50 84 58 72 56L72 44Z" fill="#facc15" />
        {/* Newspaper Paper Cone Base */}
        <path d="M30 52L60 108L90 52H30Z" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="1" />
        <path d="M40 64H80 M44 74H76 M48 84H72 M52 94H68" stroke="#78716c" strokeWidth="1" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}

// 4. ROAST CHICKEN
export function BannerRoastChicken({ className = 'w-32 h-32' }) {
  return (
    <svg viewBox="0 0 120 110" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="r-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#r-shadow)">
        <ellipse cx="60" cy="88" rx="46" ry="10" fill="#000" opacity="0.35" />
        <ellipse cx="60" cy="80" rx="48" ry="13" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
        <path d="M32 66C26 46 44 32 60 32C78 32 94 46 88 66C82 82 38 82 32 66Z" fill="#b45309" />
        <path d="M38 64C34 48 48 36 60 36C74 36 84 48 80 64C76 77 42 77 38 64Z" fill="#d97706" />
        <ellipse cx="46" cy="52" rx="9" ry="14" fill="#ea580c" transform="rotate(-25 46 52)" />
        <ellipse cx="74" cy="52" rx="9" ry="14" fill="#ea580c" transform="rotate(25 74 52)" />
        <circle cx="38" cy="40" r="4.5" fill="#f59e0b" />
        <circle cx="82" cy="40" r="4.5" fill="#f59e0b" />
        <circle cx="54" cy="48" r="1.5" fill="#15803d" />
        <circle cx="66" cy="46" r="1.5" fill="#15803d" />
      </g>
    </svg>
  );
}

// 5. STEAM WISPS COMPONENT
export function BannerSteamWisps({ className = '' }) {
  return (
    <div className={`absolute pointer-events-none overflow-visible ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 60" className="w-full h-full filter blur-[1.5px] opacity-35" fill="none">
        <path
          d="M25 55 Q 15 35, 30 20 T 25 0"
          stroke="#fef3c7"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="animate-[dash_4s_ease-in-out_infinite]"
        />
        <path
          d="M45 58 Q 58 38, 44 22 T 52 2"
          stroke="#fed7aa"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-[dash_3.2s_ease-in-out_infinite_0.7s]"
        />
      </svg>
    </div>
  );
}

// 6. BURGER BUILDER LAYER COMPONENTS
export const BurgerLayerComponents = {
  TopBun: ({ className = 'w-24 h-12' }) => (
    <svg viewBox="0 0 100 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="top-bun-g" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
      </defs>
      <path d="M10 44C10 20 28 8 50 8C72 8 90 20 90 44H10Z" fill="url(#top-bun-g)" />
      <ellipse cx="35" cy="20" rx="1.5" ry="0.9" fill="#fef3c7" transform="rotate(-15 35 20)" />
      <ellipse cx="50" cy="16" rx="1.5" ry="0.9" fill="#fef3c7" />
      <ellipse cx="65" cy="22" rx="1.5" ry="0.9" fill="#fef3c7" transform="rotate(20 65 22)" />
      <ellipse cx="44" cy="28" rx="1.5" ry="0.9" fill="#fef3c7" />
      <ellipse cx="58" cy="30" rx="1.5" ry="0.9" fill="#fef3c7" />
    </svg>
  ),
  Lettuce: ({ className = 'w-24 h-6' }) => (
    <svg viewBox="0 0 100 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 12Q25 18 50 12Q75 18 92 12" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  Tomato: ({ className = 'w-22 h-6' }) => (
    <svg viewBox="0 0 100 20" fill="none" className={className} aria-hidden="true">
      <rect x="12" y="6" width="76" height="8" rx="4" fill="#dc2626" />
    </svg>
  ),
  Bacon: ({ className = 'w-24 h-6' }) => (
    <svg viewBox="0 0 100 22" fill="none" className={className} aria-hidden="true">
      <path d="M10 10C24 16 38 7 52 13C66 19 80 10 90 14" stroke="#991b1b" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 10C26 16 40 7 54 13C68 19 82 10 92 14" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  Cheese: ({ className = 'w-24 h-6' }) => (
    <svg viewBox="0 0 100 22" fill="none" className={className} aria-hidden="true">
      <path d="M10 6L30 18L50 8L70 19L90 7" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
    </svg>
  ),
  Patty: ({ className = 'w-24 h-8' }) => (
    <svg viewBox="0 0 100 26" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="6" width="80" height="14" rx="7" fill="#381907" />
      <path d="M22 9L27 17 M42 9L47 17 M62 9L67 17 M77 9L82 17" stroke="#1c0d04" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  BottomBun: ({ className = 'w-24 h-8' }) => (
    <svg viewBox="0 0 100 26" fill="none" className={className} aria-hidden="true">
      <path d="M12 6C12 16 28 20 50 20C72 20 88 16 88 6H12Z" fill="#b45309" stroke="#92400e" strokeWidth="1" />
    </svg>
  ),
};

// 7. CATERING FOIL ROAST TRAY
export function BannerRoastTray({ className = 'w-36 h-28' }) {
  return (
    <svg viewBox="0 0 130 90" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="tray-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#tray-shadow)">
        <ellipse cx="65" cy="74" rx="55" ry="10" fill="#000" opacity="0.3" />
        {/* Foil Deep Tray Basin */}
        <path d="M15 45L22 75H108L115 45H15Z" fill="#78716c" stroke="#d6d3d1" strokeWidth="2" />
        {/* Foil Rim Lip */}
        <rect x="12" y="42" width="106" height="6" rx="3" fill="#a8a29e" stroke="#f5f5f4" strokeWidth="1" />
        {/* Sliced Roast Meats with Rich Gravy inside */}
        <ellipse cx="65" cy="50" rx="38" ry="8" fill="#451a03" />
        <ellipse cx="45" cy="49" rx="14" ry="5" fill="#78350f" />
        <ellipse cx="65" cy="51" rx="15" ry="5.5" fill="#92400e" />
        <ellipse cx="85" cy="49" rx="14" ry="5" fill="#78350f" />
      </g>
    </svg>
  );
}

// 8. CATERING SALAD BOWL
export function BannerSaladBowl({ className = 'w-32 h-28' }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="salad-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#salad-shadow)">
        <ellipse cx="60" cy="84" rx="42" ry="8" fill="#000" opacity="0.3" />
        <path d="M18 52C22 78 40 86 60 86C80 86 98 78 102 52H18Z" fill="#fbf6f0" stroke="#e8700a" strokeWidth="2" />
        <ellipse cx="60" cy="52" rx="42" ry="12" fill="#16a34a" />
        <circle cx="44" cy="48" r="5" fill="#dc2626" />
        <circle cx="76" cy="49" r="5.5" fill="#dc2626" />
        <rect x="52" y="44" width="7" height="7" rx="1.5" fill="#fffdfa" stroke="#e5e7eb" strokeWidth="1" />
        <rect x="65" y="47" width="7" height="7" rx="1.5" fill="#fffdfa" stroke="#e5e7eb" strokeWidth="1" />
        <ellipse cx="58" cy="53" rx="3.5" ry="4.5" fill="#312e81" />
      </g>
    </svg>
  );
}

// 9. CATERING FINGER FOOD PLATTER
export function BannerFingerFood({ className = 'w-32 h-26' }) {
  return (
    <svg viewBox="0 0 120 85" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="ff-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#ff-shadow)">
        <ellipse cx="60" cy="70" rx="48" ry="10" fill="#000" opacity="0.3" />
        {/* Black slate platter */}
        <ellipse cx="60" cy="62" rx="52" ry="14" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
        {/* Golden sausage rolls & mini pies */}
        <rect x="25" y="52" width="18" height="10" rx="3" fill="#d97706" stroke="#f59e0b" strokeWidth="1" />
        <circle cx="50" cy="57" r="7" fill="#b45309" stroke="#d97706" strokeWidth="1" />
        <rect x="62" y="52" width="18" height="10" rx="3" fill="#d97706" stroke="#f59e0b" strokeWidth="1" />
        <circle cx="88" cy="57" r="7" fill="#b45309" stroke="#d97706" strokeWidth="1" />
      </g>
    </svg>
  );
}

// 10. TAKEAWAY BAG
export function BannerTakeawayBag({ className = 'w-28 h-32' }) {
  return (
    <svg viewBox="0 0 100 110" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="bag-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#bag-shadow)">
        <ellipse cx="50" cy="98" rx="36" ry="7" fill="#000" opacity="0.35" />
        {/* Kraft Paper Bag */}
        <path d="M20 40L24 96H76L80 40H20Z" fill="#b45309" />
        <path d="M20 40L24 96H48V40H20Z" fill="#92400e" opacity="0.4" />
        {/* Top Fold Lip */}
        <polygon points="18,40 24,34 76,34 82,40" fill="#d97706" />
        {/* Twisted paper handles */}
        <path d="M36 34V20C36 14 64 14 64 20V34" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        {/* Brand Stamp */}
        <circle cx="50" cy="66" r="14" fill="#78350f" />
        <path d="M44 62V70 M44 66H50 M50 62V70 M53 66C53 63 58 63 58 66C58 69 53 69 53 66" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 11. DRINK CUP
export function BannerDrinkCup({ className = 'w-22 h-28' }) {
  return (
    <svg viewBox="0 0 80 110" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="cup-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#cup-shadow)">
        <ellipse cx="40" cy="98" rx="22" ry="6" fill="#000" opacity="0.3" />
        {/* Straw */}
        <path d="M38 42L48 10L56 8" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
        {/* Cup Body */}
        <path d="M18 42L25 94H55L62 42H18Z" fill="#c7341c" />
        <rect x="15" y="38" width="50" height="6" rx="3" fill="#fbf6f0" />
        {/* Dome lid */}
        <path d="M22 38C22 28 32 24 40 24C48 24 58 28 58 38H22Z" fill="#fff" opacity="0.85" />
      </g>
    </svg>
  );
}

// 12. SCOOTER SILHOUETTE
export function BannerScooter({ className = 'w-16 h-14' }) {
  return (
    <svg viewBox="0 0 70 55" fill="none" className={className} aria-hidden="true">
      {/* Headlight beam */}
      <polygon points="56,26 70,20 70,36" fill="#fef08a" opacity="0.45" />
      {/* Front & Rear Wheels */}
      <circle cx="16" cy="42" r="8" fill="#1c1917" stroke="#ea580c" strokeWidth="2.5" />
      <circle cx="16" cy="42" r="3" fill="#d6d3d1" />
      <circle cx="52" cy="42" r="8" fill="#1c1917" stroke="#ea580c" strokeWidth="2.5" />
      <circle cx="52" cy="42" r="3" fill="#d6d3d1" />
      {/* Scooter Frame */}
      <path d="M16 42H30L38 28L48 42H52" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Steering Handle & Headlight */}
      <path d="M46 32L54 18H48" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="54" cy="20" r="3" fill="#fef08a" />
      {/* Seat & Delivery Box */}
      <rect x="12" y="22" width="16" height="12" rx="2" fill="#d97706" />
      <rect x="26" y="28" width="12" height="4" rx="2" fill="#1c1917" />
    </svg>
  );
}

// 13. SALT SHAKER
export function BannerSaltShaker({ className = 'w-24 h-32' }) {
  return (
    <svg viewBox="0 0 90 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shaker-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#shaker-shadow)">
        <ellipse cx="45" cy="108" rx="28" ry="7" fill="#000" opacity="0.3" />
        {/* Glass Shaker Body with Yellow Chicken Salt inside */}
        <path d="M24 48L20 102C20 106 32 108 45 108C58 108 70 106 70 102L66 48H24Z" fill="#fed7aa" opacity="0.4" stroke="#e5e7eb" strokeWidth="1.5" />
        {/* Chicken Salt Fill */}
        <path d="M23 62L21 101C21 105 32 106 45 106C58 106 69 105 69 101L67 62C58 66 32 66 23 62Z" fill="#fbbf24" opacity="0.9" />
        {/* Stainless Steel Cap */}
        <rect x="28" y="32" width="34" height="16" rx="4" fill="#a8a29e" stroke="#f5f5f4" strokeWidth="1" />
        <ellipse cx="45" cy="32" rx="17" ry="5" fill="#d6d3d1" />
        <circle cx="38" cy="31" r="1.2" fill="#44403c" />
        <circle cx="45" cy="30" r="1.2" fill="#44403c" />
        <circle cx="52" cy="31" r="1.2" fill="#44403c" />
      </g>
    </svg>
  );
}

// 14. CORNER FLAME TONGUES (OUR STORY)
export function BannerFlameTongues({ className = '' }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 80" className="w-full h-full filter blur-[1px] opacity-45" fill="none">
        <path d="M10 80C15 60 25 45 20 20C30 35 35 55 45 50C55 45 50 25 65 10C65 30 75 45 70 65C80 50 85 40 90 80H10Z" fill="url(#flame-grad)" />
        <defs>
          <linearGradient id="flame-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c7341c" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// 15. LOCATION PIN & RIPPLES (CONTACT)
export function BannerLocationPinDecor({ className = 'w-24 h-28' }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* Expanding Ripple Rings */}
      <span className="absolute -inset-4 rounded-full border-2 border-orange-burnt/40 animate-ping opacity-60 pointer-events-none" />
      <span className="absolute -inset-8 rounded-full border border-orange-burnt/20 animate-pulse pointer-events-none" />
      <svg viewBox="0 0 60 80" fill="none" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(232,112,10,0.5)]">
        <path
          d="M30 10C18 10 10 18 10 30C10 44 30 70 30 70C30 70 50 44 50 30C50 18 42 10 30 10Z"
          fill="#ea580c"
          stroke="#ffedd5"
          strokeWidth="2"
        />
        <circle cx="30" cy="30" r="8" fill="#fff" />
        <circle cx="30" cy="30" r="4" fill="#c7341c" />
      </svg>
    </div>
  );
}
