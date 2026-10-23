import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE } from './PartnerMotion';

export default function WorksWith() {
  const { worksWith, industries } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="works-with-heading" className="w-full space-y-10">
      {/* Works With Block */}
      <div className="rounded-[28px] bg-charcoal-50/70 border border-cream/10 p-6 sm:p-10 shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/5 border border-cream/10 text-cream/70 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-orange-glow" />
            <span>Ecosystem Connectivity</span>
          </div>
          <h2 id="works-with-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-cream">
            {worksWith.heading}
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 max-w-lg mx-auto leading-relaxed">
            {worksWith.subtitle}
          </p>
        </div>

        {/* Wrapping Row of Plain Text Chips (NO third-party logos) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          {worksWith.platforms.map((platform, idx) => (
            <motion.span
              key={platform}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.3,
                delay: shouldReduceMotion ? 0 : idx * 0.025,
                ease: PARTNER_EASE,
              }}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              className="px-4 py-2 rounded-xl bg-charcoal-100/80 border border-cream/10 text-cream/90 text-xs sm:text-sm font-mono font-medium hover:border-orange-burnt/40 hover:text-white hover:bg-charcoal transition-all duration-200 cursor-default select-none shadow-sm"
            >
              {platform}
            </motion.span>
          ))}
        </div>

        {/* Small Muted Line */}
        <p className="text-xs font-mono text-cream/40 italic text-center">
          and more
        </p>

        {/* Optional Industries Row */}
        {industries && industries.tags && (
          <div className="pt-6 border-t border-cream/10 space-y-3">
            <div className="text-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cream/50">
                {industries.heading}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {industries.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-cream/5 border border-cream/10 text-cream/70 text-xs font-sans hover:text-cream hover:border-cream/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
