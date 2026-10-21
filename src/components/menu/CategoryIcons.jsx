import React from 'react';

/**
 * CATEGORY CUT-OUT FOOD ARTWORK (TRANSPARENT BACKGROUNDS)
 * -------------------------------------------------------------
 * 11 custom food cut-outs matching the studio takeaway aesthetic.
 * Flat-rich vector style with warm highlights, cheese drips, and appetizing depth.
 */

// 1. ALL ITEMS COLLAGE (Burger + Chips + Drink)
export function CategoryImgAll({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-all" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-all)">
        {/* Soft shadow base */}
        <ellipse cx="60" cy="88" rx="46" ry="7" fill="#17110d" opacity="0.18" />
        {/* Cold Drink Cup (Left rear) */}
        <path d="M22 45L26 82H38L42 45H22Z" fill="#c7341c" />
        <rect x="20" y="42" width="24" height="4" rx="2" fill="#fbf6f0" />
        <path d="M32 42V28L38 24" stroke="#ff8a1f" strokeWidth="2.5" strokeLinecap="round" />
        {/* Golden Chips (Right rear) */}
        <path d="M78 48L82 82H98L102 48H78Z" fill="#e8700a" />
        <rect x="83" y="32" width="4" height="24" rx="1.5" fill="#f59e0b" transform="rotate(-8 83 32)" />
        <rect x="88" y="28" width="4" height="28" rx="1.5" fill="#fbbf24" />
        <rect x="94" y="34" width="4" height="22" rx="1.5" fill="#f59e0b" transform="rotate(10 94 34)" />
        {/* Center Flame-Grilled Double Burger */}
        <path d="M38 60C38 46 48 38 60 38C72 38 82 46 82 60H38Z" fill="#d97706" />
        <circle cx="50" cy="46" r="1" fill="#fef3c7" />
        <circle cx="62" cy="44" r="1" fill="#fef3c7" />
        <circle cx="70" cy="49" r="1" fill="#fef3c7" />
        {/* Patty 1 */}
        <rect x="36" y="62" width="48" height="6" rx="3" fill="#451a03" />
        {/* Melted Cheddar */}
        <path d="M36 67L44 72L54 67L64 73L74 68L84 71" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        {/* Patty 2 */}
        <rect x="37" y="72" width="46" height="6" rx="3" fill="#451a03" />
        {/* Fresh Lettuce */}
        <path d="M34 78Q46 82 60 78Q74 82 86 78" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
        {/* Bottom Bun */}
        <path d="M38 81C38 86 48 88 60 88C72 88 82 86 82 81H38Z" fill="#b45309" />
      </g>
    </svg>
  );
}

// 2. BURGERS & COMBOS (Tower Burger + Melt)
export function CategoryImgBurgers({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-burger" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-burger)">
        <ellipse cx="55" cy="89" rx="38" ry="6" fill="#17110d" opacity="0.2" />
        {/* Top Brioche Bun Crown */}
        <path d="M26 48C26 28 39 18 55 18C71 18 84 28 84 48H26Z" fill="#d97706" />
        {/* Toasted Sesame Seeds */}
        <ellipse cx="42" cy="30" rx="1.5" ry="0.8" fill="#fef3c7" transform="rotate(-15 42 30)" />
        <ellipse cx="55" cy="26" rx="1.5" ry="0.8" fill="#fef3c7" />
        <ellipse cx="68" cy="32" rx="1.5" ry="0.8" fill="#fef3c7" transform="rotate(20 68 32)" />
        <ellipse cx="50" cy="38" rx="1.5" ry="0.8" fill="#fef3c7" transform="rotate(5 50 38)" />
        <ellipse cx="62" cy="40" rx="1.5" ry="0.8" fill="#fef3c7" transform="rotate(-10 62 40)" />
        {/* Crispy Bacon Strips */}
        <path d="M22 50C34 53 44 48 56 52C68 56 78 50 88 52" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" />
        {/* Upper Melted Cheddar */}
        <path d="M24 53C32 58 40 54 50 59C62 53 72 58 86 54" fill="#f59e0b" />
        {/* Flame-Grilled Angus Patty 1 */}
        <rect x="23" y="56" width="64" height="8" rx="4" fill="#451a03" />
        <path d="M30 58L34 62 M45 58L49 62 M60 58L64 62 M75 58L79 62" stroke="#261005" strokeWidth="1.5" />
        {/* Lower Melted Cheddar Drips */}
        <path d="M23 64C30 68 36 73 42 66C52 74 60 67 68 73C74 66 80 69 87 65" fill="#f59e0b" />
        {/* Flame-Grilled Angus Patty 2 */}
        <rect x="24" y="69" width="62" height="8" rx="4" fill="#451a03" />
        {/* Tomato slice & Pickles */}
        <rect x="28" y="77" width="54" height="4" rx="2" fill="#dc2626" />
        {/* Crisp Lettuce */}
        <path d="M20 81Q35 86 55 81Q75 86 90 81" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
        {/* Bottom Toasted Bun */}
        <path d="M26 84C26 89 39 92 55 92C71 92 84 89 84 84H26Z" fill="#b45309" />
      </g>
    </svg>
  );
}

// 3. HOT ROASTS & CARVERY (Roast slices + Pan Gravy + Crackling)
export function CategoryImgHotRoasts({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-roast" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-roast)">
        <ellipse cx="55" cy="88" rx="42" ry="7" fill="#17110d" opacity="0.2" />
        {/* Stoneware Roast Plate */}
        <ellipse cx="55" cy="78" rx="44" ry="14" fill="#262626" stroke="#404040" strokeWidth="1.5" />
        <ellipse cx="55" cy="77" rx="38" ry="11" fill="#171717" />
        {/* Golden Roast Potatoes & Pumpkin */}
        <ellipse cx="32" cy="73" rx="10" ry="7" fill="#d97706" />
        <ellipse cx="33" cy="71" rx="8" ry="5" fill="#f59e0b" />
        <ellipse cx="78" cy="74" rx="10" ry="6" fill="#ea580c" />
        {/* Slow-Cooked Tender Beef / Pork Slices */}
        <path d="M35 62C42 54 68 54 75 62C78 68 70 76 55 76C40 76 32 68 35 62Z" fill="#78350f" />
        <path d="M38 56C46 48 64 48 72 56C74 61 66 69 55 69C44 69 36 61 38 56Z" fill="#92400e" />
        <path d="M42 50C48 44 62 44 68 50C70 54 64 61 55 61C46 61 40 54 42 50Z" fill="#b45309" />
        {/* Crispy Golden Pork Crackling on top */}
        <path d="M46 44L52 38L58 44L64 39" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        {/* Rich Pan Gravy Drizzle */}
        <path d="M44 54Q55 62 66 54Q60 70 54 72Q48 68 44 54Z" fill="#451a03" opacity="0.9" />
        {/* Fresh Rosemary Sprig */}
        <path d="M68 62L80 50 M72 57L70 52 M76 54L78 49" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 4. FISH & CHIPS / SEAFOOD
export function CategoryImgFishChips({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-seafood" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-seafood)">
        <ellipse cx="55" cy="88" rx="42" ry="7" fill="#17110d" opacity="0.2" />
        {/* Hot Chips Mound in background */}
        <rect x="28" y="58" width="6" height="28" rx="2" fill="#f59e0b" transform="rotate(-18 28 58)" />
        <rect x="36" y="54" width="6" height="30" rx="2" fill="#fbbf24" transform="rotate(-6 36 54)" />
        <rect x="44" y="56" width="6" height="28" rx="2" fill="#f59e0b" transform="rotate(8 44 56)" />
        <rect x="70" y="55" width="6" height="30" rx="2" fill="#fbbf24" transform="rotate(14 70 55)" />
        <rect x="76" y="60" width="6" height="26" rx="2" fill="#f59e0b" transform="rotate(22 76 60)" />
        {/* Crispy Golden Crumbed Fish Fillet */}
        <path d="M22 68C26 52 48 40 76 44C88 46 94 56 86 68C76 78 40 82 22 68Z" fill="#d97706" />
        <path d="M26 66C32 54 50 44 74 47C84 49 88 56 82 65C74 74 42 78 26 66Z" fill="#f59e0b" />
        {/* Tartare Sauce Dollop */}
        <circle cx="58" cy="58" r="8" fill="#fef3c7" />
        <circle cx="56" cy="56" r="1.5" fill="#15803d" />
        <circle cx="61" cy="59" r="1.2" fill="#15803d" />
        {/* Fresh Lemon Wedge */}
        <path d="M68 66L84 62C88 74 78 84 66 82L68 66Z" fill="#facc15" />
        <path d="M70 68L80 65C82 72 76 78 68 77L70 68Z" fill="#fef08a" />
      </g>
    </svg>
  );
}

// 5. CHARCOAL CHICKEN (Whole Golden Rotisserie)
export function CategoryImgChickens({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-chick" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-chick)">
        <ellipse cx="55" cy="88" rx="40" ry="7" fill="#17110d" opacity="0.2" />
        {/* Cast Iron Roasting Pan */}
        <ellipse cx="55" cy="80" rx="44" ry="12" fill="#262626" />
        {/* Whole Roasted Chicken Body */}
        <path d="M28 66C24 46 42 32 58 32C76 32 88 46 84 66C80 82 34 82 28 66Z" fill="#b45309" />
        <path d="M34 64C30 48 45 36 58 36C72 36 82 48 78 64C74 77 38 77 34 64Z" fill="#d97706" />
        {/* Drumsticks tied */}
        <ellipse cx="44" cy="52" rx="9" ry="14" fill="#ea580c" transform="rotate(-25 44 52)" />
        <ellipse cx="68" cy="52" rx="9" ry="14" fill="#ea580c" transform="rotate(25 68 52)" />
        <circle cx="36" cy="40" r="4.5" fill="#f59e0b" />
        <circle cx="76" cy="40" r="4.5" fill="#f59e0b" />
        {/* Herb Flecks & Glaze */}
        <circle cx="50" cy="48" r="1.2" fill="#15803d" />
        <circle cx="62" cy="46" r="1.5" fill="#15803d" />
        <circle cx="56" cy="58" r="1.2" fill="#15803d" />
        {/* Rising Warm Steam */}
        <path d="M50 26Q46 16 52 10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M60 28Q66 18 58 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}

// 6. AROMATIC CURRIES & RICE
export function CategoryImgCurries({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-curry" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-curry)">
        <ellipse cx="55" cy="88" rx="40" ry="7" fill="#17110d" opacity="0.2" />
        {/* Ceramic Curry Bowl */}
        <ellipse cx="55" cy="74" rx="42" ry="16" fill="#171717" stroke="#e8700a" strokeWidth="1.5" />
        {/* Steaming Basmati Rice & Naan in rear */}
        <path d="M72 44L92 36C96 52 86 64 74 68L72 44Z" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
        <circle cx="82" cy="48" r="1.5" fill="#b45309" />
        {/* Rich Butter Chicken Curry Lake */}
        <ellipse cx="52" cy="72" rx="36" ry="12" fill="#ea580c" />
        <ellipse cx="52" cy="71" rx="30" ry="9" fill="#f97316" />
        {/* Tender Chicken Tikka Chunks */}
        <ellipse cx="44" cy="70" rx="6" ry="4" fill="#b45309" />
        <ellipse cx="58" cy="73" rx="7" ry="4.5" fill="#9a3412" />
        <ellipse cx="64" cy="68" rx="5" ry="3.5" fill="#b45309" />
        {/* Swirl of Fresh Cream */}
        <path d="M40 70Q52 64 58 72Q64 78 52 76" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" />
        {/* Fresh Cilantro / Coriander garnish */}
        <circle cx="50" cy="69" r="1.5" fill="#16a34a" />
        <circle cx="54" cy="70" r="1.5" fill="#16a34a" />
      </g>
    </svg>
  );
}

// 7. CHIPS & HOT SIDES (Basket of Fries)
export function CategoryImgSides({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-sides" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-sides)">
        <ellipse cx="55" cy="88" rx="38" ry="7" fill="#17110d" opacity="0.2" />
        {/* Red Takeaway Wire Basket */}
        <path d="M22 62L28 86H82L88 62H22Z" fill="#dc2626" />
        <ellipse cx="55" cy="62" rx="34" ry="7" fill="#ef4444" />
        {/* Cascading Golden Chips */}
        <rect x="34" y="32" width="7" height="34" rx="2" fill="#f59e0b" transform="rotate(-18 34 32)" />
        <rect x="42" y="26" width="7" height="38" rx="2" fill="#fbbf24" transform="rotate(-8 42 26)" />
        <rect x="52" y="22" width="7.5" height="42" rx="2" fill="#f59e0b" />
        <rect x="62" y="26" width="7" height="38" rx="2" fill="#fbbf24" transform="rotate(8 62 26)" />
        <rect x="70" y="32" width="7" height="34" rx="2" fill="#f59e0b" transform="rotate(18 70 32)" />
        {/* Extra foreground chips */}
        <rect x="44" y="36" width="6.5" height="30" rx="2" fill="#fef08a" transform="rotate(4 44 36)" />
        <rect x="55" y="38" width="6.5" height="28" rx="2" fill="#fef08a" transform="rotate(-6 55 38)" />
        {/* Chicken Salt Seasoning Specks */}
        <circle cx="48" cy="30" r="1" fill="#fff" />
        <circle cx="56" cy="26" r="1" fill="#fff" />
        <circle cx="64" cy="34" r="1" fill="#fff" />
      </g>
    </svg>
  );
}

// 8. FRESH GOURMET SALADS
export function CategoryImgSalads({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-salad" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-salad)">
        <ellipse cx="55" cy="88" rx="40" ry="7" fill="#17110d" opacity="0.2" />
        {/* Ceramic Salad Bowl */}
        <ellipse cx="55" cy="74" rx="42" ry="16" fill="#fbf6f0" stroke="#e8700a" strokeWidth="1.5" />
        {/* Crispy Greens & Lettuce Bed */}
        <ellipse cx="55" cy="68" rx="36" ry="14" fill="#16a34a" />
        <ellipse cx="55" cy="66" rx="30" ry="11" fill="#22c55e" />
        {/* Cherry Tomatoes */}
        <circle cx="40" cy="62" r="5" fill="#dc2626" />
        <circle cx="70" cy="64" r="5.5" fill="#dc2626" />
        <circle cx="54" cy="58" r="4.5" fill="#ef4444" />
        {/* Cucumber Slices */}
        <circle cx="46" cy="68" r="6" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
        <circle cx="64" cy="68" r="6" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
        {/* Danish Feta Cheese Cubes */}
        <rect x="36" y="54" width="6" height="6" rx="1" fill="#fffdfa" stroke="#e5e7eb" strokeWidth="0.8" />
        <rect x="62" y="56" width="6" height="6" rx="1" fill="#fffdfa" stroke="#e5e7eb" strokeWidth="0.8" />
        {/* Kalamata Olives */}
        <ellipse cx="52" cy="67" rx="3" ry="4" fill="#312e81" />
      </g>
    </svg>
  );
}

// 9. FAMILY FEASTS & DEALS (Spread)
export function CategoryImgFamily({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-fam" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-fam)">
        <ellipse cx="55" cy="88" rx="44" ry="7" fill="#17110d" opacity="0.2" />
        {/* Family 1.25L Bottle (Right rear) */}
        <path d="M78 32H88V82H78V32Z" fill="#1e3a8a" />
        <rect x="80" y="26" width="6" height="6" fill="#ef4444" />
        {/* Large Chips Bucket (Left rear) */}
        <path d="M22 50L26 84H42L46 50H22Z" fill="#e8700a" />
        <rect x="28" y="38" width="5" height="18" rx="1.5" fill="#fbbf24" />
        <rect x="35" y="36" width="5" height="20" rx="1.5" fill="#f59e0b" />
        {/* Center Whole Rotisserie Chicken on Platter */}
        <ellipse cx="55" cy="76" rx="28" ry="10" fill="#262626" />
        <path d="M38 68C36 54 46 44 55 44C65 44 74 54 72 68C70 78 40 78 38 68Z" fill="#d97706" />
        <circle cx="45" cy="58" r="6" fill="#b45309" />
        <circle cx="65" cy="58" r="6" fill="#b45309" />
        {/* Steaming Hot Gravy Tub */}
        <rect x="48" y="74" width="14" height="10" rx="2" fill="#78350f" stroke="#e8700a" strokeWidth="1" />
      </g>
    </svg>
  );
}

// 10. JUNIOR & KIDS MEALS
export function CategoryImgJunior({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-jr" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-jr)">
        <ellipse cx="55" cy="88" rx="38" ry="7" fill="#17110d" opacity="0.2" />
        {/* Bright Takeaway Fun Meal Box */}
        <path d="M26 52L32 86H78L84 52H26Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        {/* Box Top Handle */}
        <path d="M42 52V36C42 30 68 30 68 36V52" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
        {/* Golden Nuggets PEEKING OUT */}
        <circle cx="44" cy="50" r="7" fill="#d97706" />
        <circle cx="56" cy="46" r="7.5" fill="#f59e0b" />
        <circle cx="66" cy="50" r="6.5" fill="#d97706" />
        {/* Pop-Top Juice Bottle next to box */}
        <rect x="74" y="58" width="14" height="28" rx="4" fill="#06b6d4" />
        <rect x="77" y="52" width="8" height="6" rx="2" fill="#facc15" />
        {/* Happy Smiley on box */}
        <path d="M46 72Q55 80 64 72" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="46" cy="65" r="2" fill="#451a03" />
        <circle cx="64" cy="65" r="2" fill="#451a03" />
      </g>
    </svg>
  );
}

// 11. COLD DRINKS & THICKSHAKES
export function CategoryImgDrinks({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="shadow-drinks" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#17110d" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#shadow-drinks)">
        <ellipse cx="55" cy="88" rx="38" ry="7" fill="#17110d" opacity="0.2" />
        {/* Chilled Can of Soft Drink (Left) */}
        <rect x="24" y="42" width="22" height="42" rx="4" fill="#dc2626" />
        <ellipse cx="35" cy="42" rx="11" ry="3.5" fill="#e5e7eb" />
        <path d="M28 56Q35 62 42 56" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        {/* Frost / condensation droplets */}
        <circle cx="30" cy="66" r="1.2" fill="#fff" opacity="0.8" />
        <circle cx="38" cy="72" r="1" fill="#fff" opacity="0.8" />
        {/* Tall Diner Thickshake Glass (Right) */}
        <path d="M56 36L64 82H78L86 36H56Z" fill="#f43f5e" opacity="0.9" />
        {/* Glass Base & Foot */}
        <rect x="67" y="82" width="8" height="4" fill="#94a3b8" />
        <ellipse cx="71" cy="86" rx="12" ry="2.5" fill="#cbd5e1" />
        {/* Whipped Cream Mountain */}
        <path d="M58 36C56 26 66 22 71 22C76 22 86 26 84 36H58Z" fill="#fffdfa" />
        {/* Glossy Red Glacé Cherry on top */}
        <circle cx="71" cy="22" r="4.5" fill="#b91c1c" />
        <path d="M71 18Q75 12 80 10" stroke="#7f1d1d" strokeWidth="1.5" strokeLinecap="round" />
        {/* Striped Straw */}
        <path d="M64 36L58 14L62 12" stroke="#e8700a" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Category Image Component Selector
 */
export default function CategoryFoodImage({ categoryId, className = "w-full h-full" }) {
  switch (categoryId) {
    case 'all':
      return <CategoryImgAll className={className} />;
    case 'burgers':
      return <CategoryImgBurgers className={className} />;
    case 'hot-roasts':
      return <CategoryImgHotRoasts className={className} />;
    case 'fish-chips':
      return <CategoryImgFishChips className={className} />;
    case 'chickens':
      return <CategoryImgChickens className={className} />;
    case 'curries':
      return <CategoryImgCurries className={className} />;
    case 'sides':
      return <CategoryImgSides className={className} />;
    case 'salads':
      return <CategoryImgSalads className={className} />;
    case 'family-deals':
      return <CategoryImgFamily className={className} />;
    case 'junior':
      return <CategoryImgJunior className={className} />;
    case 'drinks':
      return <CategoryImgDrinks className={className} />;
    default:
      return <CategoryImgAll className={className} />;
  }
}
