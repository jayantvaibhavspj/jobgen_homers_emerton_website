import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShoppingBag, Utensils, CalendarDays, MessageSquare, Bot, Clock } from 'lucide-react';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE } from './PartnerMotion';

const FEATURE_ICONS = {
  'Online Ordering': ShoppingBag,
  'Interactive Burger Builder': Utensils,
  'Catering Enquiries': CalendarDays,
  'WhatsApp Ordering': MessageSquare,
  'AI Chat Assistant': Bot,
  'Live Open / Closed Status': Clock,
};

export default function BuiltForHomers() {
  const { builtForHomers } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="built-for-homers-heading" className="w-full space-y-6">
      {/* Slim Strip Container */}
      <div className="rounded-[24px] bg-[#140e0b] border border-orange-burnt/25 p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        {/* Subtle Ambient Background Highlight */}
        <div
          className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-orange-burnt/10 filter blur-3xl pointer-events-none -z-0"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream/10 pb-4 relative z-10">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#f08a2c]">
              Verified Storefront Technology
            </span>
            <h2 id="built-for-homers-heading" className="text-xl sm:text-2xl font-serif font-bold text-cream">
              {builtForHomers.heading}
            </h2>
          </div>
          <p className="text-xs text-cream/60 max-w-md sm:text-right leading-relaxed">
            {builtForHomers.subtitle}
          </p>
        </div>

        {/* Feature Chips Grid: Plain, modest descriptions without numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {builtForHomers.features.map((feat, idx) => {
            const IconComponent = FEATURE_ICONS[feat.title] || ShoppingBag;

            return (
              <motion.div
                key={feat.title}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : idx * 0.05,
                  ease: PARTNER_EASE,
                }}
                className="p-4 rounded-xl bg-charcoal-50/70 border border-cream/10 hover:border-orange-burnt/35 transition-colors flex items-start gap-3.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-burnt/15 border border-orange-burnt/30 text-orange-glow flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-cream font-mono">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-cream/70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
