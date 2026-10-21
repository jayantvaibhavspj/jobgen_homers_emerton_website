import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';

/**
 * TUNABLE CONFIGURATION
 * -------------------------------------------------------------
 * FLOAT_Y: Maximum vertical bobbing distance (px)
 * FLOAT_ROTATION: Small tilt angle during bobbing (deg)
 * DURATION_BURGER: Float cycle duration for left burger (sec)
 * DURATION_FRIES: Float cycle duration for right fries (sec)
 * PARALLAX_FACTOR: Multiplier for mouse-movement response
 * GLOW_COLOR: Warm flame rim glow tone
 */
export const FOOD_TUNING = {
  floatY: 20,
  floatRotation: 3.2,
  durationBurger: 6.8,
  durationFries: 6.2,
  parallaxFactor: 0.8,
  glowColor: 'rgba(249, 115, 22, 0.25)',
};

// Subtle Steam Wisp SVG Component
function SteamWisps({ className = '' }) {
  return (
    <div className={`absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-24 pointer-events-none overflow-visible ${className}`}>
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full filter blur-[2px] opacity-40 animate-pulse-glow"
        fill="none"
      >
        <path
          d="M30 70 Q 20 45, 38 28 T 32 0"
          stroke="rgba(251, 246, 240, 0.35)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-[dash_4s_ease-in-out_infinite]"
        />
        <path
          d="M50 75 Q 65 50, 48 30 T 58 5"
          stroke="rgba(251, 246, 240, 0.45)"
          strokeWidth="5"
          strokeLinecap="round"
          className="animate-[dash_3.2s_ease-in-out_infinite_0.7s]"
        />
        <path
          d="M70 70 Q 55 45, 68 25 T 62 2"
          stroke="rgba(251, 246, 240, 0.3)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="animate-[dash_4.5s_ease-in-out_infinite_1.2s]"
        />
      </svg>
    </div>
  );
}

// Inline SVG Fallback for Burger
function SvgBurgerFallback() {
  return (
    <svg viewBox="0 0 300 280" className="w-full h-full filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]">
      <defs>
        <radialGradient id="bunGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="80%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <linearGradient id="pattyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1c1917" />
        </linearGradient>
      </defs>
      <path d="M 40 100 C 40 30, 260 30, 260 100 Z" fill="url(#bunGrad)" />
      <circle cx="100" cy="55" r="3" fill="#fef3c7" />
      <circle cx="150" cy="45" r="3" fill="#fef3c7" />
      <circle cx="200" cy="60" r="3" fill="#fef3c7" />
      <circle cx="120" cy="75" r="3" fill="#fef3c7" />
      <circle cx="180" cy="70" r="3" fill="#fef3c7" />
      <path d="M 35 100 Q 80 120, 110 105 Q 140 135, 170 105 Q 210 125, 265 100 L 260 115 L 40 115 Z" fill="#f59e0b" />
      <rect x="30" y="112" width="240" height="42" rx="16" fill="url(#pattyGrad)" />
      <rect x="38" y="152" width="224" height="18" rx="8" fill="#dc2626" />
      <path d="M 25 170 Q 60 155, 90 172 Q 130 155, 170 172 Q 220 155, 275 170 L 265 185 Q 150 190, 35 185 Z" fill="#16a34a" />
      <path d="M 45 184 L 255 184 Q 245 225, 150 225 Q 55 225, 45 184 Z" fill="url(#bunGrad)" />
    </svg>
  );
}

// Inline SVG Fallback for Fries & Fish
function SvgFriesFallback() {
  return (
    <svg viewBox="0 0 300 280" className="w-full h-full filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]">
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="fryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="fishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <rect x="80" y="40" width="22" height="130" rx="6" transform="rotate(-15 80 40)" fill="url(#fryGrad)" />
      <rect x="110" y="30" width="24" height="140" rx="6" transform="rotate(-5 110 30)" fill="url(#fryGrad)" />
      <rect x="145" y="25" width="22" height="145" rx="6" transform="rotate(8 145 25)" fill="url(#fryGrad)" />
      <rect x="175" y="35" width="22" height="135" rx="6" transform="rotate(18 175 35)" fill="url(#fryGrad)" />
      <path d="M 50 140 Q 150 100, 250 135 Q 260 170, 200 175 Q 120 180, 50 140 Z" fill="url(#fishGrad)" />
      <path d="M 210 120 A 30 30 0 0 1 255 160 Z" fill="#facc15" stroke="#fef08a" strokeWidth="3" />
      <path d="M 60 130 L 240 130 L 220 240 L 80 240 Z" fill="url(#boxGrad)" opacity="0.95" />
    </svg>
  );
}

export default function FloatingFood() {
  const parallax = useMouseParallax(FOOD_TUNING.parallaxFactor * 12);
  const [burgerError, setBurgerError] = useState(false);
  const [friesError, setFriesError] = useState(false);

  return (
    <div
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      {/* ========================================================
          LEFT FLANK: TALL JUICY FLAME-GRILLED ANGUS BURGER
          Cleanly positioned in left gutter - never covers headline
          ======================================================== */}
      <motion.div
        className="absolute left-[-20px] xl:left-2 2xl:left-12 top-[30%] xl:top-[28%]
                   w-[230px] xl:w-[290px] 2xl:w-[350px]
                   opacity-85 xl:opacity-95 transition-all duration-700 select-none"
        style={{
          x: -parallax.x,
          y: -parallax.y,
        }}
        initial={{ opacity: 0, scale: 0.85, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{
            y: [-FOOD_TUNING.floatY, FOOD_TUNING.floatY, -FOOD_TUNING.floatY],
            rotate: [-FOOD_TUNING.floatRotation, FOOD_TUNING.floatRotation * 0.8, -FOOD_TUNING.floatRotation],
          }}
          transition={{
            duration: FOOD_TUNING.durationBurger,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* Subtle Ambient Rising Steam */}
          <SteamWisps />

          {/* Warm Flame Rim Glow Behind Burger */}
          <div
            className="absolute inset-4 -z-10 rounded-full blur-[44px] opacity-60 mix-blend-screen pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${FOOD_TUNING.glowColor} 0%, rgba(232,112,10,0.12) 60%, transparent 80%)`,
            }}
          />

          {!burgerError ? (
            <picture>
              <source srcSet="/hero-burger.webp?v=2" type="image/webp" />
              <img
                src="/hero-burger.png?v=2"
                alt=""
                className="w-full h-auto object-contain select-none
                           filter drop-shadow-[0_24px_35px_rgba(0,0,0,0.7)]
                           drop-shadow-[0_0_22px_rgba(232,112,10,0.22)]"
                onError={() => setBurgerError(true)}
                loading="eager"
                fetchPriority="high"
                width={800}
                height={717}
              />
            </picture>
          ) : (
            <SvgBurgerFallback />
          )}
        </motion.div>
      </motion.div>

      {/* ========================================================
          RIGHT FLANK: CRISPY CHIPS & CRUMBED FISH IN BOX
          Cleanly positioned in right gutter - never covers headline
          ======================================================== */}
      <motion.div
        className="absolute right-[-20px] xl:right-2 2xl:right-12 top-[32%] xl:top-[30%]
                   w-[230px] xl:w-[290px] 2xl:w-[350px]
                   opacity-85 xl:opacity-95 transition-all duration-700 select-none"
        style={{
          x: -parallax.x * 0.85,
          y: -parallax.y * 0.85,
        }}
        initial={{ opacity: 0, scale: 0.85, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{
            y: [FOOD_TUNING.floatY * 0.85, -FOOD_TUNING.floatY * 0.85, FOOD_TUNING.floatY * 0.85],
            rotate: [FOOD_TUNING.floatRotation * 0.85, -FOOD_TUNING.floatRotation, FOOD_TUNING.floatRotation * 0.85],
          }}
          transition={{
            duration: FOOD_TUNING.durationFries,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* Subtle Ambient Rising Steam */}
          <SteamWisps />

          {/* Warm Flame Rim Glow Behind Fries */}
          <div
            className="absolute inset-4 -z-10 rounded-full blur-[44px] opacity-60 mix-blend-screen pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${FOOD_TUNING.glowColor} 0%, rgba(232,112,10,0.12) 60%, transparent 80%)`,
            }}
          />

          {!friesError ? (
            <picture>
              <source srcSet="/hero-fries.webp" type="image/webp" />
              <img
                src="/hero-fries.png"
                alt=""
                className="w-full h-auto object-contain select-none
                           filter drop-shadow-[0_24px_35px_rgba(0,0,0,0.7)]
                           drop-shadow-[0_0_22px_rgba(232,112,10,0.22)]"
                onError={() => setFriesError(true)}
                loading="eager"
                fetchPriority="high"
                width={800}
                height={688}
              />
            </picture>
          ) : (
            <SvgFriesFallback />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
