import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BannerBurger, BannerCurry, BannerFishCone, BannerRoastChicken, BannerSteamWisps } from '../BannerIllustrations';
import { BANNER_CONFIG } from '../bannerConfig';
import { useMouseParallax } from '../../../hooks/useMouseParallax';

/**
 * VariantMenu Decorator
 * Left: Floating flame-grilled burger + copper curry bowl
 * Right: Fish & chips cone + charcoal roast chicken
 * With subtle steam wisps, rim glow, and mouse parallax.
 */
export default function VariantMenu() {
  const shouldReduceMotion = useReducedMotion();
  const mouse = useMouseParallax(BANNER_CONFIG.parallax.strength);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {/* LEFT GUTTER DECORATION */}
      <motion.div
        className="hidden lg:flex absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6"
        style={{ x: mouse.x * 0.8, y: mouse.y * 0.8 }}
      >
        {/* Floating Burger */}
        <motion.div
          animate={{
            y: [-BANNER_CONFIG.menu.floatY, BANNER_CONFIG.menu.floatY, -BANNER_CONFIG.menu.floatY],
            rotate: [-BANNER_CONFIG.menu.floatRotate, BANNER_CONFIG.menu.floatRotate, -BANNER_CONFIG.menu.floatRotate],
          }}
          transition={{
            duration: BANNER_CONFIG.menu.burgerDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative filter drop-shadow-[0_12px_24px_rgba(232,112,10,0.25)]"
        >
          <BannerSteamWisps className="-top-10 left-4 w-20 h-16" />
          <BannerBurger className="w-28 xl:w-36 h-auto" />
        </motion.div>

        {/* Floating Curry Bowl */}
        <motion.div
          animate={{
            y: [BANNER_CONFIG.menu.floatY * 0.8, -BANNER_CONFIG.menu.floatY * 0.8, BANNER_CONFIG.menu.floatY * 0.8],
            rotate: [BANNER_CONFIG.menu.floatRotate, -BANNER_CONFIG.menu.floatRotate, BANNER_CONFIG.menu.floatRotate],
          }}
          transition={{
            duration: BANNER_CONFIG.menu.curryDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="relative filter drop-shadow-[0_12px_24px_rgba(232,112,10,0.22)] -ml-4"
        >
          <BannerSteamWisps className="-top-8 left-6 w-16 h-14" />
          <BannerCurry className="w-24 xl:w-30 h-auto" />
        </motion.div>
      </motion.div>

      {/* RIGHT GUTTER DECORATION */}
      <motion.div
        className="hidden lg:flex absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6"
        style={{ x: -mouse.x * 0.8, y: -mouse.y * 0.8 }}
      >
        {/* Floating Fish & Chips Cone */}
        <motion.div
          animate={{
            y: [BANNER_CONFIG.menu.floatY, -BANNER_CONFIG.menu.floatY, BANNER_CONFIG.menu.floatY],
            rotate: [BANNER_CONFIG.menu.floatRotate * 0.8, -BANNER_CONFIG.menu.floatRotate * 0.8, BANNER_CONFIG.menu.floatRotate * 0.8],
          }}
          transition={{
            duration: BANNER_CONFIG.menu.fishDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
          className="relative filter drop-shadow-[0_12px_24px_rgba(245,158,11,0.25)]"
        >
          <BannerFishCone className="w-26 xl:w-34 h-auto" />
        </motion.div>

        {/* Floating Roast Chicken */}
        <motion.div
          animate={{
            y: [-BANNER_CONFIG.menu.floatY * 0.7, BANNER_CONFIG.menu.floatY * 0.7, -BANNER_CONFIG.menu.floatY * 0.7],
            rotate: [-BANNER_CONFIG.menu.floatRotate, BANNER_CONFIG.menu.floatRotate, -BANNER_CONFIG.menu.floatRotate],
          }}
          transition={{
            duration: BANNER_CONFIG.menu.chickenDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
          className="relative filter drop-shadow-[0_12px_24px_rgba(232,112,10,0.22)] -mr-4"
        >
          <BannerSteamWisps className="-top-8 left-6 w-18 h-14" />
          <BannerRoastChicken className="w-24 xl:w-32 h-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
