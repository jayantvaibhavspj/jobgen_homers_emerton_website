import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PhoneIncoming, PhoneOutgoing, CheckCircle2 } from 'lucide-react';
import { PARTNER_CONTENT } from '../../data/partner.content';
import { PARTNER_EASE, MOTION_CONFIG } from './PartnerMotion';

export default function AgentCards() {
  const { agents } = PARTNER_CONTENT;
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="ai-workforce-heading" className="w-full space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f08a2c]">
          Dedicated Voice Personas
        </span>
        <h2 id="ai-workforce-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-cream">
          {agents.heading}
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 max-w-lg mx-auto leading-relaxed">
          {agents.subtitle}
        </p>
      </div>

      {/* Two Side-by-Side Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {agents.list.map((agent, idx) => {
          const isInbound = agent.tag === 'Inbound';
          const bobValues = isInbound ? MOTION_CONFIG.jennyBob.y : MOTION_CONFIG.oliviaBob.y;
          const bobDuration = isInbound ? MOTION_CONFIG.jennyBob.duration : MOTION_CONFIG.oliviaBob.duration;

          return (
            <motion.div
              key={agent.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: PARTNER_EASE }}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="rounded-[24px] bg-charcoal-50/90 border border-cream/10 hover:border-orange-burnt/40 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden group shadow-xl"
            >
              {/* Soft Gradient Ambient Spotlight in Card Background */}
              <div
                className={`absolute top-0 ${isInbound ? 'left-0' : 'right-0'} w-72 h-72 rounded-full pointer-events-none filter blur-3xl opacity-20 -z-0 ${
                  isInbound ? 'bg-emerald-500/30' : 'bg-orange-burnt/30'
                }`}
                aria-hidden="true"
              />

              {/* Upper Portion: Character & Core Meta */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-cream/10">
                {/* Character Portrait with Gentle Bobbing (no box around portrait) */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 flex items-center justify-center">
                  {/* Subtle Glow Behind Character */}
                  <div
                    className={`absolute inset-0 rounded-full filter blur-xl opacity-30 ${
                      isInbound ? 'bg-emerald-600/40' : 'bg-orange-burnt/40'
                    }`}
                    aria-hidden="true"
                  />

                  <motion.img
                    src={agent.image}
                    alt={agent.alt}
                    width={240}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    animate={
                      shouldReduceMotion || !isInView
                        ? {}
                        : { y: bobValues }
                    }
                    transition={{
                      duration: bobDuration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  />
                </div>

                {/* Identity, Role & Tags */}
                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isInbound
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                          : 'bg-orange-burnt/15 border border-orange-burnt/30 text-orange-glow'
                      }`}
                    >
                      {isInbound ? (
                        <PhoneIncoming className="w-3 h-3" />
                      ) : (
                        <PhoneOutgoing className="w-3 h-3" />
                      )}
                      <span>{agent.tag}</span>
                    </span>

                    <span className="text-[11px] font-mono text-cream/50">
                      Voice Persona
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-cream">
                      {agent.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-orange-glow font-semibold">
                      {agent.role}
                    </p>
                  </div>

                  <p className="text-xs text-cream/70 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>

              {/* Lower Portion: 2 Short Verified Bullet Lines */}
              <div className="relative z-10 pt-5 space-y-2.5">
                {agent.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-cream/80 leading-relaxed">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        isInbound ? 'text-emerald-400' : 'text-orange-glow'
                      }`}
                    />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
