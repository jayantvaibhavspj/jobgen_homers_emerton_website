import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CloudSun, ArrowDown } from 'lucide-react';
import { SHOP_INFO } from '../config';
import { fetchEmertonWeather } from '../utils/weatherApi';

// Subcomponents
import HeroHeadline from './hero/HeroHeadline';
import HeroCTAs from './hero/HeroCTAs';
import HeroStats from './hero/HeroStats';
import FloatingFood from './hero/FloatingFood';
import EmberParticles from './hero/EmberParticles';

/**
 * TUNABLE CONFIGURATION
 * -------------------------------------------------------------
 * KEN_BURNS_DURATION: Scale animation cycle for background photo (seconds)
 * FLAME_GLOW_DURATION: Pulsing cycle for bottom radial flame warmth (seconds)
 * SCROLL_PARALLAX_MAX: Vertical offset for foreground content on scroll (px)
 */
export const HERO_CONFIG = {
  kenBurnsDuration: 20,
  flameGlowDuration: 4,
  scrollParallaxMax: -60,
};

export default function Hero({ onOpenCart, onOpenSpecials }) {
  const [weather, setWeather] = useState({ chipText: '21°C · Emerton Takeaway', mode: 'mild' });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Fetch Live Sydney Weather
  useEffect(() => {
    fetchEmertonWeather().then((data) => {
      if (data) setWeather(data);
    });
  }, []);

  // Parallax on Scroll (Hardware-Accelerated)
  const { scrollY } = useScroll();
  const contentY = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, HERO_CONFIG.scrollParallaxMax]
  );
  const contentOpacity = useTransform(
    scrollY,
    [0, 400],
    prefersReducedMotion ? [1, 1] : [1, 0.2]
  );
  const backgroundY = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, 45]
  );

  return (
    <section
      id="hero"
      aria-label="Homers Emerton Hero Showcase"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-charcoal pt-28 sm:pt-32 pb-16 px-4"
    >
      {/* ========================================================
          1. BACKGROUND KEN BURNS & AMBIENT FLAME GLOW
          ======================================================== */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.img
          src="/homeslide.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20 filter brightness-90 contrast-125"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1.0, 1.08, 1.0],
                }
          }
          transition={{
            duration: HERO_CONFIG.kenBurnsDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Dark Contrast Overlays for AA Compliant Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal/50 to-charcoal" />

        {/* Pulsing Flame-Grill Warm Radial Glow Behind CTAs */}
        <motion.div
          className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[320px] sm:w-[620px] h-[260px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232, 112, 10, 0.6) 0%, rgba(249, 115, 22, 0.25) 50%, transparent 75%)',
            filter: 'blur(120px)',
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.95, 1.08, 0.95],
                }
          }
          transition={{
            duration: HERO_CONFIG.flameGlowDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* ========================================================
          2. AMBIENT EMBER & SPARK PARTICLES
          ======================================================== */}
      <EmberParticles />

      {/* ========================================================
          3. APPETIZING FLOATING FOOD VISUALS (BURGER & CHIPS)
          ======================================================== */}
      <FloatingFood />

      {/* ========================================================
          4. HERO CONTENT (ORCHESTRATED INTRO SEQUENCE)
          ======================================================== */}
      <motion.div
        className="relative z-10 max-w-2xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto text-center flex flex-col items-center"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        {/* Step 1: Official Logo Badge with Spring Bounce */}
        <motion.div
          className="mb-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            type: 'spring',
            bounce: 0.35,
          }}
        >
          <img
            src="/logo.png"
            alt="Homers Emerton Official Logo"
            className="h-14 sm:h-18 md:h-20 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform"
          />
        </motion.div>

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
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 backdrop-blur-md text-xs sm:text-sm font-medium text-cream mb-6 shadow-warm transform hover:scale-105 transition-all ${
            onOpenSpecials ? 'cursor-pointer hover:border-orange-burnt/60 hover:bg-cream/15' : ''
          }`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-burnt opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-burnt"></span>
          </span>
          <span className="text-orange-glow font-semibold tracking-wide uppercase text-[11px] sm:text-xs">
            {SHOP_INFO.lunchSpecialAnchor}
          </span>
          <span className="text-cream/50">|</span>
          <span className="text-cream/90 hidden xs:inline">100% Australian Beef & Seafood</span>
        </motion.div>

        {/* Step 3: Headline Word-by-Word Reveal */}
        <HeroHeadline />

        {/* Step 4: Live Sydney Weather Chip (Fade Up) */}
        <motion.div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-50/80 border border-orange-burnt/20 text-xs sm:text-sm text-cream/90 mb-8 backdrop-blur-sm"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <CloudSun className="w-4 h-4 text-orange-burnt flex-shrink-0" />
          <span>{weather.chipText}</span>
          <span className="text-cream/40">•</span>
          <span className="text-cream/70 text-xs">Hot & ready in 15 mins</span>
        </motion.div>

        {/* Step 5: Action CTAs (Magnetic Primary + Glass Secondary) */}
        <motion.div
          className="w-full flex justify-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <HeroCTAs />
        </motion.div>

        {/* Step 6: Quick Service Stats Row (With Count-Up Animation) */}
        <HeroStats />

        {/* Step 7: Scroll Cue */}
        <motion.a
          href="#plate-rise"
          className="mt-10 sm:mt-12 flex flex-col items-center text-cream/40 hover:text-orange-burnt transition-colors group"
          aria-label="Scroll to plate showcase"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-widest font-medium mb-1">Scroll to taste</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-orange-burnt" />
        </motion.a>
      </motion.div>
    </section>
  );
}
