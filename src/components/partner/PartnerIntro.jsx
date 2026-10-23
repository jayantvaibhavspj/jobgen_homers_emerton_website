import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE, MOTION_CONFIG } from './PartnerMotion';

export default function PartnerIntro() {
  const { intro } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Pause continuous animations when out of viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={cardRef} aria-labelledby="partner-intro-heading" className="w-full">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: PARTNER_EASE }}
        className="rounded-[28px] bg-charcoal-50/90 border border-cream/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm"
      >
        {/* Ambient Warm Radial Background Glow */}
        <motion.div
          className="absolute -top-24 -right-24 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none filter blur-[90px] -z-0"
          style={{
            background: 'radial-gradient(circle, rgba(232, 112, 10, 0.35) 0%, rgba(199, 52, 28, 0.12) 50%, transparent 70%)',
          }}
          animate={
            shouldReduceMotion || !isInView
              ? { opacity: 0.3 }
              : {
                  opacity: MOTION_CONFIG.radialGlow.opacity,
                  scale: MOTION_CONFIG.radialGlow.scale,
                }
          }
          transition={{
            duration: MOTION_CONFIG.radialGlow.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Information & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header Badge & Logo */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-burnt/15 border border-orange-burnt/35 text-orange-glow text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{intro.badge}</span>
              </span>

              <div className="h-4 w-px bg-cream/15 hidden sm:block" />

              <img
                src={intro.logo}
                alt="JobGen.AI"
                width={96}
                height={28}
                loading="lazy"
                decoding="async"
                className="h-6 w-auto opacity-80"
              />
            </div>

            {/* Title with Mask Reveal Feel */}
            <h2
              id="partner-intro-heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream tracking-tight leading-[1.15]"
            >
              {intro.tagline}
            </h2>

            {/* Factual Description */}
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed max-w-xl">
              {intro.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Visit Button with Continuous Light Sweep */}
              <a
                href={intro.primaryBtn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden px-6 py-3 rounded-full bg-[#f08a2c] hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-orange-burnt/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 group"
              >
                {/* Shine Sweep Animation Bar */}
                {!shouldReduceMotion && (
                  <span
                    className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-[-25deg] pointer-events-none"
                    style={{
                      animation: 'shineSweep 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                    }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{intro.primaryBtn.label}</span>
                <ExternalLink className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>

              {/* Glass Book a Demo Button */}
              <a
                href={intro.demoBtn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-cream/5 hover:bg-cream/10 border border-cream/20 hover:border-cream/40 text-cream font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-glow" />
                <span>{intro.demoBtn.label}</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Phone Mockup with Floating Chips */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6 sm:py-8">
            {/* Orange Glow Behind Phone */}
            <div
              className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full pointer-events-none filter blur-2xl -z-0"
              style={{
                background: 'radial-gradient(circle, rgba(240, 138, 44, 0.35) 0%, rgba(232, 112, 10, 0.1) 60%, transparent 80%)',
              }}
              aria-hidden="true"
            />

            {/* Gently Floating Phone Container */}
            <motion.div
              animate={
                shouldReduceMotion || !isInView
                  ? {}
                  : { y: MOTION_CONFIG.mockupFloat.y }
              }
              transition={{
                duration: MOTION_CONFIG.mockupFloat.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative max-w-[280px] sm:max-w-[340px]"
            >
              <img
                src={intro.mockup}
                alt="JobGen.AI voice agent phone interface held in hands"
                width={500}
                height={373}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
              />

              {/* Floating Chip 1: Jenny Reception */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -15, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-3 -left-3 sm:-left-6 px-3 py-1.5 rounded-full bg-charcoal-100/90 border border-emerald-500/40 shadow-xl backdrop-blur-md flex items-center gap-2 select-none"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-medium text-cream">
                  Jenny · Reception
                </span>
              </motion.div>

              {/* Floating Chip 2: Olivia Sales */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute -bottom-3 -right-3 sm:-right-6 px-3 py-1.5 rounded-full bg-charcoal-100/90 border border-orange-burnt/40 shadow-xl backdrop-blur-md flex items-center gap-2 select-none"
              >
                <span className="w-2 h-2 rounded-full bg-orange-glow shadow-[0_0_8px_#ff8a1f] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-medium text-cream">
                  Olivia · Sales
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Shine Sweep Keyframes */}
      <style>{`
        @keyframes shineSweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          30% { transform: translateX(250%) skewX(-25deg); }
          100% { transform: translateX(250%) skewX(-25deg); }
        }
      `}</style>
    </section>
  );
}
