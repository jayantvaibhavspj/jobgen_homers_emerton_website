import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * TUNABLE CONFIGURATION
 * -------------------------------------------------------------
 * COUNTUP_DURATION: Duration for number counter in milliseconds
 * STAGGER_DELAY: Delay between individual stat column entrances
 */
export const STATS_CONFIG = {
  countupDuration: 1500,
  staggerDelay: 0.15,
};

export default function HeroStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [yearsCount, setYearsCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setYearsCount(10);
      return;
    }

    let startTimestamp = null;
    let animId = null;
    const target = 10;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / STATS_CONFIG.countupDuration, 1);
      // easeOutExpo for energetic deceleration
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setYearsCount(Math.round(eased * target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isInView]);

  const stats = [
    {
      title: 'Flame-Grilled',
      subtitle: 'Premium Angus Patties',
    },
    {
      title: 'Fresh Daily',
      subtitle: 'Crumbed Fish & Salads',
      hasBorder: true,
    },
    {
      title: `${yearsCount}+ Years`,
      subtitle: 'Family-Run in Emerton',
    },
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-3 sm:gap-8 mt-12 pt-8 border-t border-cream/10 text-cream/70 text-xs sm:text-sm w-full max-w-2xl"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          className={`flex flex-col items-center text-center ${stat.hasBorder ? 'border-x border-cream/10 px-2' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.6 + idx * STATS_CONFIG.staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="text-cream font-bold text-base sm:text-xl tracking-tight">
            {stat.title}
          </span>
          <span className="text-cream/60 text-[11px] sm:text-xs mt-0.5">
            {stat.subtitle}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
