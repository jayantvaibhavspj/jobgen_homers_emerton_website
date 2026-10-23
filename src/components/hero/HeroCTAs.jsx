import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { heroContent, heroSettings } from './heroConfig';

/**
 * HeroCTAs Component
 * Primary CTA ("See the menu"): Solid orange button with shine sweep.
 * Secondary CTA ("Order Delivery"): Self-contained dark glass button with UberEats badge.
 */
export const CTA_CONFIG = {
  magneticLimit: 6,
  shineInterval: 3.5,
};

export default function HeroCTAs({ align = 'left', isCompact = false }) {
  const primaryRef = useRef(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const isLeft = align === 'left';

  const { primary, secondary } = heroContent.ctas;

  const handleMouseMove = (e) => {
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
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-[clamp(0.5rem,0.8cqw,0.85rem)] w-full z-20 ${
        isLeft ? 'justify-start' : 'justify-center'
      }`}
    >
      {/* ========================================================
          PRIMARY CTA: "SEE THE MENU" (SOLID ORANGE + SHINE)
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
          to={primary.link}
          className="relative group overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[clamp(0.85rem,1.4cqw,1.35rem)] py-[clamp(0.48rem,0.9cqw,0.72rem)] rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-[0.98] text-white font-semibold text-[clamp(0.8rem,1cqw,0.95rem)] shadow-warm-lg hover:shadow-glow-orange hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-burnt/60 border border-orange-400/30 whitespace-nowrap"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
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

          <Utensils className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300 flex-shrink-0" />
          <span className="relative z-10 tracking-wide font-medium">{primary.text}</span>
        </Link>
      </motion.div>

      {/* ========================================================
          SECONDARY CTA: "ORDER DELIVERY" (SELF-CONTAINED GLASS)
          ======================================================== */}
      <motion.a
        href={secondary.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[clamp(0.85rem,1.4cqw,1.35rem)] py-[clamp(0.48rem,0.9cqw,0.72rem)] rounded-full text-cream font-medium text-[clamp(0.8rem,1cqw,0.95rem)] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-cream/40 shadow-warm hover:shadow-warm-lg whitespace-nowrap"
        style={{
          ...heroSettings.PILL_GLASS_STYLE,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}
      >
        <span>{secondary.text}</span>
        {secondary.badge && (
          <span className="text-[10px] sm:text-xs text-orange-glow font-bold ml-1 bg-charcoal/90 px-2 py-0.5 rounded-full border border-cream/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:border-orange-burnt/50">
            {secondary.badge}
          </span>
        )}
      </motion.a>
    </div>
  );
}
