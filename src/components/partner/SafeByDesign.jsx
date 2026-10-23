import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, UserCheck, PhoneForwarded, FileText } from 'lucide-react';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE } from './PartnerMotion';

const ICONS = {
  ShieldCheck,
  UserCheck,
  PhoneForwarded,
  FileText,
};

export default function SafeByDesign() {
  const { safeByDesign } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="safe-by-design-heading" className="w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f08a2c]">
          Enterprise Safety Protocols
        </span>
        <h2 id="safe-by-design-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-cream">
          {safeByDesign.heading}
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 max-w-lg mx-auto leading-relaxed">
          {safeByDesign.subtitle}
        </p>
      </div>

      {/* 4 Compact Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {safeByDesign.items.map((item, idx) => {
          const IconComponent = ICONS[item.icon] || ShieldCheck;

          return (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.1,
                ease: PARTNER_EASE,
              }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className="rounded-2xl bg-charcoal-50/80 border border-cream/10 hover:border-orange-burnt/40 p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all group"
            >
              <div className="space-y-3">
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-orange-burnt/15 border border-orange-burnt/30 text-orange-glow flex items-center justify-center group-hover:bg-orange-burnt/25 group-hover:scale-105 transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-base font-serif font-bold text-cream group-hover:text-orange-glow transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-cream/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
