import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Headphones, ExternalLink } from 'lucide-react';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE } from './PartnerMotion';

export default function CapabilityGrid() {
  const { capabilities } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="capabilities-heading" className="w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f08a2c]">
          End-to-End Capabilities
        </span>
        <h2 id="capabilities-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-cream">
          {capabilities.heading}
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 max-w-lg mx-auto leading-relaxed">
          {capabilities.subtitle}
        </p>
      </div>

      {/* 3-Column Responsive Grid (3 on desktop, 2 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1,
              ease: PARTNER_EASE,
            }}
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            className="rounded-2xl bg-charcoal-50/80 border border-cream/10 hover:border-orange-burnt/40 p-5 flex flex-col justify-between transition-all duration-300 group shadow-lg overflow-hidden"
          >
            <div className="space-y-4">
              {/* Photo on top with 16/10 aspect ratio and subtle zoom on hover */}
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-charcoal-100 relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-50/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Title & One-line Description */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-cream group-hover:text-orange-glow transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See It in Action Link */}
      <div className="text-center pt-2">
        <a
          href={capabilities.callSamplesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-50 border border-orange-burnt/30 hover:border-orange-burnt text-orange-glow hover:text-amber-300 text-xs sm:text-sm font-mono font-medium transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 group shadow-md"
        >
          <Headphones className="w-4 h-4 text-orange-burnt group-hover:text-orange-glow transition-colors" />
          <span>Listen to real call samples on jobgen.ai</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
