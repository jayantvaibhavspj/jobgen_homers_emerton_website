import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE } from './PartnerMotion';

export default function PartnerCTA() {
  const { cta, footerNote, imageCredit } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="partner-cta-heading" className="w-full space-y-8">
      {/* CTA Card with City Skyline and Orange Glow */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: PARTNER_EASE }}
        className="rounded-[28px] bg-gradient-to-b from-[#1c120c] via-[#160d08] to-[#0e0805] border border-orange-burnt/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl space-y-8"
      >
        {/* Soft Radial Ambient Orange Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full pointer-events-none filter blur-[100px] -z-0"
          style={{
            background: 'radial-gradient(circle, rgba(232, 112, 10, 0.25) 0%, rgba(199, 52, 28, 0.08) 50%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* Faint City Skyline Background Graphic at Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 pointer-events-none overflow-hidden opacity-15 mix-blend-screen -z-0">
          <img
            src={cta.cityBg}
            alt=""
            aria-hidden="true"
            width={1000}
            height={376}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-bottom filter invert brightness-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-glow">
            Get Started
          </span>
          <h2 id="partner-cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream">
            {cta.heading}
          </h2>
          <p className="text-xs sm:text-base text-cream/80 leading-relaxed max-w-lg mx-auto">
            {cta.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {/* Primary Book a Demo with Shine Sweep */}
            <a
              href={cta.demoBtn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden px-7 py-3.5 rounded-full bg-[#f08a2c] hover:bg-orange-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-orange-burnt/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 group"
            >
              {!shouldReduceMotion && (
                <span
                  className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-[-25deg] pointer-events-none"
                  style={{
                    animation: 'shineSweep 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                  }}
                  aria-hidden="true"
                />
              )}
              <Calendar className="w-4 h-4 text-white relative z-10" />
              <span className="relative z-10">{cta.demoBtn.label}</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            {/* Secondary Visit JobGen */}
            <a
              href={cta.visitBtn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-cream/5 hover:bg-cream/10 border border-cream/20 hover:border-cream/40 text-cream font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 group"
            >
              <span>{cta.visitBtn.label}</span>
              <ExternalLink className="w-4 h-4 text-orange-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          {/* Contact Details & Legal Links */}
          <div className="pt-8 border-t border-cream/10 space-y-3 text-xs text-cream/70">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono">
              <a
                href={`mailto:${cta.email}`}
                className="inline-flex items-center gap-1.5 hover:text-orange-glow transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-orange-burnt" />
                <span>{cta.email}</span>
              </a>

              <span className="text-cream/20 hidden sm:inline">|</span>

              <span className="inline-flex items-center gap-1.5 text-cream/60">
                <MapPin className="w-3.5 h-3.5 text-orange-burnt shrink-0" />
                <span>{cta.address}</span>
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] font-mono text-cream/40">
              <a
                href={cta.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream/80 underline decoration-cream/20 transition-colors"
              >
                Privacy Policy
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <span>·</span>
              <a
                href={cta.termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream/80 underline decoration-cream/20 transition-colors"
              >
                Terms of Service
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Muted Source Note & Return Link */}
      <div className="text-center space-y-3 pt-4 pb-8 border-t border-cream/10">
        <p className="text-xs text-cream/50 max-w-xl mx-auto leading-relaxed">
          {footerNote}
        </p>
        <p className="text-[11px] font-mono text-cream/40">
          {imageCredit}
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-orange-glow hover:text-amber-300 transition-colors py-1 px-3 rounded hover:bg-cream/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
