import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BannerRoastChicken, BannerSaltShaker, BannerFlameTongues, BannerSteamWisps } from '../BannerIllustrations';
import { BANNER_CONFIG } from '../bannerConfig';
import { useMouseParallax } from '../../../hooks/useMouseParallax';

/**
 * VariantStory Decorator
 * Bottom: Nostalgic grill flames in corners + low grill warmth
 * Left: Rotisserie charcoal chicken with herb glaze & steam
 * Right: Secret chicken-salt shaker with falling golden salt specks
 * Overlay: Soft vintage vignette
 */
export default function VariantStory() {
  const shouldReduceMotion = useReducedMotion();
  const mouse = useMouseParallax(BANNER_CONFIG.parallax.strength);

  if (shouldReduceMotion) return null;

  // Salt speck falling particles
  const saltSpecks = Array.from({ length: BANNER_CONFIG.story.saltGrainCount }, (_, i) => ({
    id: i,
    left: `${42 + (i % 5) * 4}%`,
    duration: 1.8 + (i % 3) * 0.4,
    delay: (i * 0.18) % 1.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {/* LOW VINTAGE AMBER GLOW & VIGNETTE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-burnt/20 via-orange-950/15 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/35 pointer-events-none" />

      {/* BOTTOM CORNER FLICKERING FLAMES */}
      <motion.div
        className="absolute bottom-0 left-2 w-28 h-24"
        animate={{
          scale: [1, 1.08, 0.96, 1.05, 1],
          opacity: [0.35, 0.5, 0.38, 0.48, 0.35],
        }}
        transition={{
          duration: BANNER_CONFIG.story.flameDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <BannerFlameTongues className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-2 w-28 h-24 -scale-x-100"
        animate={{
          scale: [1, 1.06, 0.94, 1.04, 1],
          opacity: [0.35, 0.48, 0.36, 0.52, 0.35],
        }}
        transition={{
          duration: BANNER_CONFIG.story.flameDuration * 1.1,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      >
        <BannerFlameTongues className="w-full h-full" />
      </motion.div>

      {/* LEFT: CHARCOAL CHICKEN */}
      <motion.div
        className="hidden lg:flex absolute left-8 xl:left-20 top-1/2 -translate-y-1/2 flex-col items-center filter drop-shadow-[0_12px_24px_rgba(232,112,10,0.3)]"
        style={{ x: mouse.x * 0.7, y: mouse.y * 0.7 }}
      >
        <div className="relative">
          <BannerSteamWisps className="-top-8 left-6 w-20 h-16" />
          <BannerRoastChicken className="w-28 xl:w-36 h-auto" />
        </div>
        <span className="text-[11px] font-mono text-orange-glow/80 mt-1 uppercase tracking-wider font-semibold">
          Charcoal Spit
        </span>
      </motion.div>

      {/* RIGHT: CHICKEN SALT SHAKER WITH FALLING SPECKS */}
      <motion.div
        className="hidden lg:flex absolute right-8 xl:right-20 top-1/2 -translate-y-1/2 flex-col items-center filter drop-shadow-[0_12px_24px_rgba(245,158,11,0.25)]"
        style={{ x: -mouse.x * 0.7, y: -mouse.y * 0.7 }}
      >
        <motion.div
          animate={{
            rotate: [-12, -22, -12],
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <BannerSaltShaker className="w-22 xl:w-28 h-auto" />

          {/* Falling golden salt particles */}
          {saltSpecks.map((s) => (
            <motion.span
              key={s.id}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-sm"
              style={{ left: s.left, top: '80%' }}
              animate={{
                y: [0, 45],
                opacity: [0.9, 0],
                x: [(s.id % 2 === 0 ? -4 : 4), (s.id % 2 === 0 ? 6 : -6)],
              }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                ease: 'easeIn',
                delay: s.delay,
              }}
            />
          ))}
        </motion.div>
        <span className="text-[11px] font-mono text-amber-300/80 mt-2 uppercase tracking-wider font-semibold">
          Secret Chicken Salt
        </span>
      </motion.div>
    </div>
  );
}
