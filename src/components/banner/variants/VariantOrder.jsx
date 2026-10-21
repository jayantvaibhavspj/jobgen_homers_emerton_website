import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BannerTakeawayBag, BannerDrinkCup, BannerScooter } from '../BannerIllustrations';
import { BANNER_CONFIG } from '../bannerConfig';
import { useMouseParallax } from '../../../hooks/useMouseParallax';

/**
 * VariantOrder Decorator
 * Bottom: Dotted route line with animated delivery scooter zipping across
 * Left: Map pin with expanding ripple rings
 * Right: Kraft takeaway bag with gentle sway + cold drink cup
 */
export default function VariantOrder() {
  const shouldReduceMotion = useReducedMotion();
  const mouse = useMouseParallax(BANNER_CONFIG.parallax.strength);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {/* BOTTOM CURVED DOTTED ROUTE LINE */}
      <div className="absolute bottom-3 left-0 right-0 h-16 pointer-events-none opacity-30">
        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M -50 45 Q 250 15, 500 40 T 1050 30"
            fill="none"
            stroke="#ea580c"
            strokeWidth="2.5"
            strokeDasharray="6 8"
          />
        </svg>

        {/* Zipping Scooter silhouette */}
        <motion.div
          className="absolute -top-6"
          initial={{ left: '-10%' }}
          animate={{ left: '110%' }}
          transition={{
            duration: BANNER_CONFIG.order.scooterDuration,
            repeat: Infinity,
            repeatDelay: BANNER_CONFIG.order.scooterInterval - BANNER_CONFIG.order.scooterDuration,
            ease: 'linear',
          }}
        >
          <BannerScooter className="w-14 h-auto" />
        </motion.div>
      </div>

      {/* LEFT: EXPANDING RIPPLE MAP PIN */}
      <motion.div
        className="hidden lg:flex absolute left-8 xl:left-20 top-1/2 -translate-y-1/2 flex-col items-center justify-center filter drop-shadow-[0_8px_16px_rgba(232,112,10,0.3)]"
        style={{ x: mouse.x * 0.7, y: mouse.y * 0.7 }}
      >
        <div className="relative flex items-center justify-center">
          {/* Ripple Ring 1 */}
          <motion.span
            className="absolute rounded-full border border-orange-burnt/40"
            animate={{
              width: [24, 75],
              height: [24, 75],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: BANNER_CONFIG.order.rippleInterval,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          {/* Ripple Ring 2 */}
          <motion.span
            className="absolute rounded-full border border-orange-burnt/25"
            animate={{
              width: [24, 95],
              height: [24, 95],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: BANNER_CONFIG.order.rippleInterval,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.8,
            }}
          />

          {/* Central Map Pin Icon */}
          <div className="relative z-10 w-12 h-14 bg-orange-burnt text-white rounded-full rounded-br-none -rotate-45 flex items-center justify-center shadow-lg border-2 border-white/30">
            <span className="rotate-45 font-bold text-base">📍</span>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-orange-glow/80 mt-3 tracking-wider uppercase">
          Direct Kitchen
        </span>
      </motion.div>

      {/* RIGHT: TAKEAWAY BAG & COLD DRINK */}
      <motion.div
        className="hidden lg:flex absolute right-8 xl:right-20 top-1/2 -translate-y-1/2 items-end gap-3 filter drop-shadow-[0_12px_24px_rgba(232,112,10,0.25)]"
        style={{ x: -mouse.x * 0.7, y: -mouse.y * 0.7 }}
      >
        <motion.div
          animate={{
            y: [-4, 4, -4],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: BANNER_CONFIG.order.bagBounceDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <BannerTakeawayBag className="w-24 xl:w-28 h-auto" />
        </motion.div>

        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{
            duration: BANNER_CONFIG.order.bagBounceDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          className="-mb-1"
        >
          <BannerDrinkCup className="w-18 xl:w-22 h-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
