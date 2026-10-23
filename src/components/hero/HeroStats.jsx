import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { heroContent, heroSettings } from './heroConfig';

/**
 * HeroStats Component
 * Highlighting Homers' key value propositions with a count-up animation for years in business.
 * Supports:
 * - variant="strip": Slim inline presentation for the 72-96px desktop info strip below video.
 * - variant="grid": 3-column grid for stacked mobile/tablet viewports below 1100px.
 */
export const STATS_CONFIG = {
  countupDuration: 1500,
  staggerDelay: 0.12,
};

export default function HeroStats({ align = 'left', variant = 'grid' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [yearsCount, setYearsCount] = useState(0);

  const stats = heroContent.stats;
  const isLeft = align === 'left';
  const isStrip = variant === 'strip';

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

  if (isStrip) {
    return (
      <div
        ref={ref}
        className="flex items-center gap-4 lg:gap-6 text-cream/90 text-xs sm:text-sm"
      >
        {stats.map((stat, idx) => {
          const titleText =
            stat.countUpTarget !== undefined ? `${yearsCount}${stat.suffix || '+'}` : stat.title;

          return (
            <div key={idx} className="flex items-center gap-4 lg:gap-6">
              <div className="flex flex-col items-start leading-tight">
                <span className="text-cream font-bold text-xs sm:text-sm tracking-tight">
                  {titleText}
                </span>
                <span className="text-cream/60 text-[10px] sm:text-[11px]">
                  {stat.subtitle}
                </span>
              </div>
              {idx < stats.length - 1 && (
                <div className="h-6 w-[1px] bg-cream/15" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`grid grid-cols-3 gap-2 sm:gap-6 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-cream/15 text-cream/80 text-xs sm:text-sm w-full ${
        isLeft ? 'max-w-xl' : 'max-w-2xl mx-auto'
      }`}
    >
      {stats.map((stat, idx) => {
        const titleText =
          stat.countUpTarget !== undefined ? `${yearsCount}${stat.suffix || '+'}` : stat.title;

        return (
          <motion.div
            key={idx}
            className={`flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'} ${
              stat.hasBorder ? 'border-x border-cream/15 px-2 sm:px-4' : ''
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.2 + idx * STATS_CONFIG.staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="text-cream font-bold text-sm sm:text-lg md:text-xl tracking-tight">
              {titleText}
            </span>
            <span className="text-cream/70 text-[10px] sm:text-xs mt-0.5 leading-snug">
              {stat.subtitle}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
