import React from 'react';
import { ShoppingBag } from 'lucide-react';

/**
 * JOURNEY PATH & TRAVELING TOKEN
 * -------------------------------------------------------------
 * Renders the responsive continuous connecting line:
 * - Desktop: Organic wavy curve traversing through card 1 -> 2 -> 3
 * - Mobile: Vertical connecting path centered through card icons
 * - Traveling glowing Order Token synced with GSAP
 */
export default function JourneyPath({
  desktopPathRef,
  desktopGlowPathRef,
  mobilePathRef,
  desktopTokenRef,
  mobileTokenRef,
  isLight = true,
}) {
  return (
    <>
      {/* ========================================================
          1. DESKTOP CONNECTING PATH & TRAVELING TOKEN (md:block)
          ======================================================== */}
      <div
        className="hidden md:block absolute top-[52px] left-0 right-0 h-16 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 1000 64"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="orange-path-glow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="token-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8a1f" />
              <stop offset="100%" stopColor="#e8700a" />
            </linearGradient>
          </defs>

          {/* Background Guide Trace */}
          <path
            d="M 166 32 C 300 8, 360 56, 500 32 C 640 8, 700 56, 833 32"
            stroke={isLight ? 'rgba(232, 112, 10, 0.15)' : 'rgba(255, 138, 31, 0.15)'}
            strokeWidth="3"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />

          {/* Animated Glow Halo */}
          <path
            ref={desktopGlowPathRef}
            d="M 166 32 C 300 8, 360 56, 500 32 C 640 8, 700 56, 833 32"
            stroke="#ff8a1f"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#orange-path-glow)"
            opacity="0.45"
            style={{ strokeDasharray: 750, strokeDashoffset: 750 }}
          />

          {/* Animated Foreground Connector Line */}
          <path
            ref={desktopPathRef}
            d="M 166 32 C 300 8, 360 56, 500 32 C 640 8, 700 56, 833 32"
            stroke="#e8700a"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ strokeDasharray: 750, strokeDashoffset: 750 }}
          />
        </svg>

        {/* Traveling Order Token (Desktop) */}
        <div
          ref={desktopTokenRef}
          className="absolute -top-3 left-0 w-8 h-8 rounded-full bg-gradient-to-tr from-orange-burnt to-orange-glow text-white shadow-lg flex items-center justify-center opacity-0 pointer-events-none transform -translate-x-1/2 will-change-transform z-20"
          style={{
            boxShadow: '0 0 16px rgba(232, 112, 10, 0.7), 0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-60 pointer-events-none" />
        </div>
      </div>

      {/* ========================================================
          2. MOBILE VERTICAL PATH & TOKEN (md:hidden)
          ======================================================== */}
      <div
        className="block md:hidden absolute left-1/2 -translate-x-1/2 top-16 bottom-20 w-1 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-8 h-full overflow-visible -ml-3.5"
          viewBox="0 0 32 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background dashed line */}
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="1000"
            stroke={isLight ? 'rgba(232, 112, 10, 0.18)' : 'rgba(255, 138, 31, 0.18)'}
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* Animated active vertical line */}
          <line
            ref={mobilePathRef}
            x1="16"
            y1="0"
            x2="16"
            y2="1000"
            stroke="#e8700a"
            strokeWidth="3.5"
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          />
        </svg>

        {/* Traveling Order Token (Mobile) */}
        <div
          ref={mobileTokenRef}
          className="absolute left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-tr from-orange-burnt to-orange-glow text-white flex items-center justify-center opacity-0 pointer-events-none z-20"
          style={{
            boxShadow: '0 0 14px rgba(232, 112, 10, 0.7)',
          }}
        >
          <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
      </div>
    </>
  );
}
