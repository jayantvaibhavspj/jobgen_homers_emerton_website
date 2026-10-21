import React from 'react';

/**
 * CHEESE DRIP SECTION DIVIDER (BONUS FEATURE B)
 * -------------------------------------------------------------
 * A fluid melted cheddar drip edge bridging the dark section above
 * into the cream feature showcase.
 */
export default function CheeseDripDivider() {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none select-none overflow-hidden h-10 sm:h-14">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-full fill-orange-burnt/90 filter drop-shadow-[0_4px_10px_rgba(232,112,10,0.35)]"
      >
        <path d="M 0 0 L 1200 0 L 1200 15 Q 1150 18, 1110 32 Q 1090 48, 1070 20 Q 1020 18, 980 42 Q 950 55, 930 22 Q 880 18, 840 38 Q 800 50, 770 22 Q 720 18, 680 48 Q 650 60, 620 25 Q 560 18, 510 42 Q 480 52, 450 20 Q 390 18, 350 45 Q 310 56, 280 22 Q 220 18, 180 38 Q 140 50, 110 20 Q 60 18, 0 25 Z" />
      </svg>
    </div>
  );
}
