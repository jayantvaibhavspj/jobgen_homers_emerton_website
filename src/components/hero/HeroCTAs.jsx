import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { SHOP_INFO } from '../../config';

/**
 * TUNABLE CONFIGURATION
 * -------------------------------------------------------------
 * MAGNETIC_LIMIT: Maximum pixel pull for primary CTA (desktop only)
 * SHINE_INTERVAL: Frequency of shine sweep cycle (seconds)
 */
export const CTA_CONFIG = {
  magneticLimit: 6,
  shineInterval: 3.5,
};

export default function HeroCTAs() {
  const primaryRef = useRef(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Only apply on fine-pointer (desktop mouse)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const btn = primaryRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setMagneticOffset({
      x: Math.max(-CTA_CONFIG.magneticLimit, Math.min(CTA_CONFIG.magneticLimit, deltaX * CTA_CONFIG.magneticLimit)),
      y: Math.max(-CTA_CONFIG.magneticLimit, Math.min(CTA_CONFIG.magneticLimit, deltaY * CTA_CONFIG.magneticLimit)),
    });
  };

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 z-20">
      {/* ========================================================
          PRIMARY CTA: "SEE THE MENU" (MAGNETIC + SHINE SWEEP)
          ======================================================== */}
      <motion.div
        ref={primaryRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: magneticOffset.x,
          y: magneticOffset.y,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full sm:w-auto"
      >
        <Link
          to="/menu"
          className="relative group overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-[0.97] text-white font-semibold text-base sm:text-lg shadow-warm-lg hover:shadow-glow-orange hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-burnt/50"
        >
          {/* Continuous Light Shine Sweep */}
          <motion.div
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] pointer-events-none"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              repeatDelay: CTA_CONFIG.shineInterval,
              ease: 'easeInOut',
            }}
          />

          <Utensils className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300" />
          <span className="relative z-10 tracking-wide">See the menu</span>
        </Link>
      </motion.div>

      {/* ========================================================
          SECONDARY CTA: "ORDER DELIVERY" (GLASS BRIGHTEN + UBER NUDGE)
          ======================================================== */}
      <motion.a
        href={SHOP_INFO.uberEatsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cream/10 hover:bg-cream/20 text-cream border border-cream/20 hover:border-orange-burnt/60 font-medium text-base sm:text-lg backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-cream/30 shadow-warm hover:shadow-warm-lg"
      >
        <span>Order Delivery</span>
        <span className="text-xs text-orange-glow font-bold ml-1 bg-charcoal/70 px-2 py-0.5 rounded-full border border-cream/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:border-orange-burnt/40">
          UberEats
        </span>
      </motion.a>
    </div>
  );
}
