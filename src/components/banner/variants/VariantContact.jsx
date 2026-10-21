import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BannerLocationPinDecor, BannerDrinkCup } from '../BannerIllustrations';
import { BANNER_CONFIG } from '../bannerConfig';
import { useMouseParallax } from '../../../hooks/useMouseParallax';
import { PhoneCall } from 'lucide-react';

/**
 * VariantContact Decorator
 * Left: Bouncing location pin with expanding ripple rings and dotted route
 * Right: Ringing phone handset + takeaway drink cup
 */
export default function VariantContact() {
  const shouldReduceMotion = useReducedMotion();
  const mouse = useMouseParallax(BANNER_CONFIG.parallax.strength);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {/* LEFT: BOUNCING LOCATION PIN WITH RIPPLES */}
      <motion.div
        className="hidden lg:flex absolute left-8 xl:left-24 top-1/2 -translate-y-1/2 flex-col items-center"
        style={{ x: mouse.x * 0.7, y: mouse.y * 0.7 }}
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 18,
            delay: 0.2,
          }}
        >
          <BannerLocationPinDecor className="w-16 xl:w-20 h-auto" />
        </motion.div>
        <span className="text-[11px] font-mono text-orange-glow/80 mt-2 uppercase tracking-wider font-semibold">
          Popondetta Rd
        </span>
      </motion.div>

      {/* RIGHT: RINGING PHONE + TAKEAWAY CUP */}
      <motion.div
        className="hidden lg:flex absolute right-8 xl:right-24 top-1/2 -translate-y-1/2 items-center gap-4 filter drop-shadow-[0_12px_24px_rgba(232,112,10,0.25)]"
        style={{ x: -mouse.x * 0.7, y: -mouse.y * 0.7 }}
      >
        {/* Ringing Phone Icon with wiggle loop */}
        <motion.div
          animate={{
            rotate: [0, -14, 14, -14, 14, 0],
            scale: [1, 1.08, 1, 1.08, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: BANNER_CONFIG.contact.phoneWiggleInterval,
            ease: 'easeInOut',
          }}
          className="w-12 h-12 rounded-full bg-orange-burnt/20 border border-orange-burnt/40 text-orange-burnt flex items-center justify-center shadow-lg"
        >
          <PhoneCall className="w-6 h-6 text-orange-burnt" />
        </motion.div>

        {/* Takeaway Drink Cup */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BannerDrinkCup className="w-18 xl:w-22 h-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
