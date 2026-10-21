import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BannerRoastTray, BannerSaladBowl, BannerFingerFood, BannerSteamWisps } from '../BannerIllustrations';
import { BANNER_CONFIG } from '../bannerConfig';
import { useMouseParallax } from '../../../hooks/useMouseParallax';

/**
 * VariantCatering Decorator
 * Left: Foil roast tray with lifting lid releasing steam
 * Right: Crisp salad bowl + party finger food platter
 * Ambience: Drifting warm confetti specks
 */
export default function VariantCatering() {
  const shouldReduceMotion = useReducedMotion();
  const mouse = useMouseParallax(BANNER_CONFIG.parallax.strength);

  if (shouldReduceMotion) return null;

  // Drifting warm confetti particles
  const confetti = Array.from({ length: BANNER_CONFIG.catering.confettiCount }, (_, i) => ({
    id: i,
    left: `${(i * 6.2) % 94 + 3}%`,
    top: `${(i * 13) % 85 + 8}%`,
    size: (i % 3) + 3,
    color: ['#f59e0b', '#ea580c', '#fbbf24', '#fef3c7', '#fb923c'][i % 5],
    duration: 4.5 + (i % 4) * 0.8,
    delay: (i * 0.25) % 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {/* WARM CONFETTI DRIFT */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-sm opacity-40"
          style={{
            left: c.left,
            top: c.top,
            width: c.size,
            height: c.size * 1.4,
            backgroundColor: c.color,
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: c.delay,
          }}
        />
      ))}

      {/* LEFT: STEAMING FOIL ROAST TRAY */}
      <motion.div
        className="hidden lg:flex absolute left-6 xl:left-16 top-1/2 -translate-y-1/2 flex-col items-center filter drop-shadow-[0_12px_24px_rgba(232,112,10,0.25)]"
        style={{ x: mouse.x * 0.7, y: mouse.y * 0.7 }}
      >
        <div className="relative">
          <BannerSteamWisps className="-top-8 left-10 w-24 h-16" />
          <BannerRoastTray className="w-32 xl:w-40 h-auto" />
          {/* Subtle lifting foil lid effect */}
          <motion.div
            className="absolute -top-3 left-2 right-2 h-4 rounded-t-lg bg-stone-300/80 border border-stone-200"
            animate={{
              y: [0, -6, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: BANNER_CONFIG.catering.lidLiftInterval,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      {/* RIGHT: SALAD BOWL & FINGER FOOD PLATTER */}
      <motion.div
        className="hidden lg:flex absolute right-6 xl:right-16 top-1/2 -translate-y-1/2 flex-col items-center gap-4 filter drop-shadow-[0_12px_24px_rgba(245,158,11,0.25)]"
        style={{ x: -mouse.x * 0.7, y: -mouse.y * 0.7 }}
      >
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BannerSaladBowl className="w-28 xl:w-34 h-auto" />
        </motion.div>
        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 6.0, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="-mt-2"
        >
          <BannerFingerFood className="w-28 xl:w-34 h-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
