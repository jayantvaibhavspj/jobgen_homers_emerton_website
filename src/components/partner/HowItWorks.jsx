import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE } from './PartnerMotion';

export default function HowItWorks() {
  const { howItWorks } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="how-it-works-heading" className="w-full space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f08a2c]">
          Implementation Journey
        </span>
        <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-cream">
          {howItWorks.heading}
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 max-w-lg mx-auto leading-relaxed">
          {howItWorks.subtitle}
        </p>
      </div>

      {/* 3-Step Container with Glowing Connecting Line */}
      <div className="relative">
        {/* Animated Horizontal Connecting Line (Desktop only) */}
        <div className="hidden lg:block absolute top-28 left-[12%] right-[12%] h-0.5 -z-0 pointer-events-none">
          {/* Base Track */}
          <div className="w-full h-full bg-cream/10 rounded-full" />
          
          {/* Animated Glowing Fill */}
          <motion.div
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: PARTNER_EASE }}
            style={{ originX: 0 }}
            className="absolute inset-0 h-full bg-gradient-to-r from-orange-burnt via-orange-glow to-amber-300 shadow-[0_0_12px_rgba(240,138,44,0.6)] rounded-full"
          />
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {howItWorks.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : idx * 0.2,
                ease: PARTNER_EASE,
              }}
              className="rounded-2xl bg-charcoal-50/90 border border-cream/10 p-6 flex flex-col justify-between space-y-5 shadow-xl relative overflow-hidden group hover:border-orange-burnt/40 transition-colors"
            >
              {/* Step Top Header: Number and Visual Thumbnail */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Number Badge */}
                  <span className="w-12 h-12 rounded-xl bg-charcoal-100 border border-orange-burnt/40 text-orange-glow font-mono font-bold text-lg flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-orange-burnt transition-transform">
                    {step.number}
                  </span>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-cream/40">
                    Step {step.number}
                  </span>
                </div>

                {/* Step Visual Thumbnail */}
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-charcoal-100 relative">
                  <img
                    src={step.image}
                    alt={step.alt}
                    width={600}
                    height={375}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-50/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-cream group-hover:text-orange-glow transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
