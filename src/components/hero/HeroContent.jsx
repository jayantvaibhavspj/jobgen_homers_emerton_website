import React from 'react';
import { motion } from 'framer-motion';
import { CloudSun } from 'lucide-react';
import { heroContent, heroSettings } from './heroConfig';

import HeroHeadline from './HeroHeadline';
import HeroCTAs from './HeroCTAs';
import HeroStats from './HeroStats';

/**
 * HeroContent Component
 * 
 * Renders the hero text and action block.
 * When overlaid on desktop (>= 1100px):
 *   Renders ONLY Logo + Lunch Pill + Headline + CTAs (weather & stats moved to info strip below).
 * When below 1100px:
 *   Renders full stack including weather chip and stats row on solid bg-charcoal.
 */
export default function HeroContent({
  onOpenSpecials,
  weather,
  prefersReducedMotion,
  isMobile,
  includeWeather = true,
  includeStats = true,
}) {
  const { logo, lunchPill } = heroContent;
  const isLeft = heroSettings.TEXT_ALIGN === 'left';

  const weatherDisplay = weather?.chipText || heroContent.weather.defaultText;
  const weatherTagline = heroContent.weather.tagline;

  return (
    <div className="w-full">
      {/* Step 1: Official Logo Badge (Rendered on mobile, or on desktop only if SHOW_HERO_LOGO_DESKTOP is enabled) */}
      {(isMobile || heroSettings.SHOW_HERO_LOGO_DESKTOP) && (
        <motion.div
          className={`mb-3 sm:mb-4 ${isLeft ? 'flex justify-start' : 'flex justify-center'}`}
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.82, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.1,
            type: 'spring',
            bounce: 0.35,
          }}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-transform"
          />
        </motion.div>
      )}

      {/* Step 2: Price Anchoring Pill Badge (Fade Up) */}
      <motion.div
        onClick={onOpenSpecials}
        role={onOpenSpecials ? 'button' : undefined}
        tabIndex={onOpenSpecials ? 0 : undefined}
        onKeyDown={(e) => {
          if (onOpenSpecials && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onOpenSpecials();
          }
        }}
        className={`inline-flex items-center gap-2 px-[clamp(0.65rem,1cqw,0.95rem)] py-[clamp(0.2rem,0.4cqw,0.35rem)] rounded-full text-[clamp(0.7rem,0.85cqw,0.85rem)] font-medium text-cream mb-[clamp(0.35rem,0.8cqw,0.65rem)] shadow-warm transform hover:scale-105 transition-all ${
          onOpenSpecials ? 'cursor-pointer hover:border-orange-burnt/60 hover:bg-charcoal/95' : ''
        }`}
        style={heroSettings.PILL_GLASS_STYLE}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span className="flex h-2 w-2 relative flex-shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: lunchPill.pingColor }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: lunchPill.pingColor }}
          />
        </span>
        <span className="text-orange-glow font-semibold tracking-wide uppercase text-[10px] sm:text-xs">
          {lunchPill.anchor}
        </span>
        <span className="text-cream/50">|</span>
        <span className="text-cream/90 hidden xs:inline text-[11px] sm:text-xs">
          {lunchPill.subtext}
        </span>
      </motion.div>

      {/* Step 3: Headline Word-by-Word Reveal */}
      <HeroHeadline align={heroSettings.TEXT_ALIGN} />

      {/* Step 4: Optional Weather Chip (only shown when stacked below 1100px) */}
      {includeWeather && (
        <motion.div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-cream/95 mb-5 sm:mb-6 w-fit ${
            isLeft ? '' : 'mx-auto'
          }`}
          style={heroSettings.PILL_GLASS_STYLE}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <CloudSun className="w-4 h-4 text-orange-burnt flex-shrink-0" />
          <span>{weatherDisplay}</span>
          <span className="text-cream/40">•</span>
          <span className="text-cream/80 text-xs">{weatherTagline}</span>
        </motion.div>
      )}

      {/* Step 5: Action CTAs (Magnetic Primary + Glass Secondary) */}
      <motion.div
        className="w-full mb-1"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.95,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <HeroCTAs align={heroSettings.TEXT_ALIGN} />
      </motion.div>

      {/* Step 6: Optional Stats Row (only shown when stacked below 1100px) */}
      {includeStats && <HeroStats align={heroSettings.TEXT_ALIGN} variant="grid" />}
    </div>
  );
}
