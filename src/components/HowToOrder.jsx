import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UtensilsCrossed, PhoneCall, ShoppingBag, Sparkles } from 'lucide-react';
import { SHOP_INFO } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function HowToOrder({ theme = 'light' }) {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
        });
      }

      // Step cards fade in
      const cards = sectionRef.current?.querySelectorAll('.order-step-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      icon: UtensilsCrossed,
      title: "Choose Your Food",
      desc: "Pick your favourite flame-grilled burger, crispy fish & chips, or stack a custom Angus burger with your chosen toppings.",
    },
    {
      num: "02",
      icon: PhoneCall,
      title: "Send on WhatsApp or Call",
      desc: "One tap transmits your cart directly to our kitchen via WhatsApp, or give us a quick buzz on (02) 9677 1188.",
    },
    {
      num: "03",
      icon: ShoppingBag,
      title: "Collect Hot or Get Delivery",
      desc: "Pick it up hot from Shop 2 Popondetta Rd in 15 minutes, or have it delivered via Uber Eats or DoorDash.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-300 ${
        isLight
          ? 'bg-cream text-charcoal border-y border-charcoal/10'
          : 'bg-charcoal text-cream border-t border-cream/10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold mb-3 ${
              isLight
                ? 'bg-orange-burnt/10 border border-orange-burnt/25 text-orange-burnt'
                : 'bg-cream/10 border border-cream/20 text-orange-glow'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Fast & Effortless</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-serif font-bold mb-4 ${
              isLight ? 'text-charcoal' : 'text-cream'
            }`}
          >
            How to Order
          </h2>
          <p
            className={`text-sm sm:text-base ${
              isLight ? 'text-charcoal/70' : 'text-cream/70'
            }`}
          >
            Skip the third-party middleman markup. Enjoy fast pickup or direct local takeaway in three simple steps.
          </p>
        </div>

        {/* Steps Grid with SVG Connecting Path */}
        <div className="relative">
          {/* DESKTOP CONNECTING SVG LINE */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 z-0 pointer-events-none">
            <svg
              className="w-full h-12 overflow-visible"
              viewBox="0 0 1000 40"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d="M 160 20 Q 500 -10 840 20"
                stroke="#e8700a"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.num}
                  className={`order-step-card rounded-[22px] p-8 transition-all duration-300 flex flex-col items-center text-center group ${
                    isLight
                      ? 'bg-white border border-charcoal/10 hover:border-orange-burnt/50 shadow-warm hover:shadow-warm-lg'
                      : 'bg-charcoal-50 border border-cream/10 hover:border-orange-burnt/40 shadow-warm'
                  }`}
                >
                  {/* Step Number & Icon Circle */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-warm group-hover:scale-110 group-hover:bg-orange-burnt group-hover:text-white ${
                        isLight
                          ? 'bg-orange-burnt/10 border border-orange-burnt/30 text-orange-burnt'
                          : 'bg-cream/10 border border-orange-burnt/30 text-orange-glow'
                      }`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span
                      className={`absolute -top-2 -right-2 text-[11px] font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isLight
                          ? 'bg-charcoal text-white'
                          : 'bg-charcoal border border-cream/20 text-cream/70'
                      }`}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-serif font-bold mb-3 transition-colors ${
                      isLight
                        ? 'text-charcoal group-hover:text-orange-burnt'
                        : 'text-cream group-hover:text-orange-glow'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-charcoal/70' : 'text-cream/70'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-16 text-center">
          <a
            href={`tel:${SHOP_INFO.phoneRaw}`}
            className={`inline-flex items-center gap-2 text-sm transition-colors underline underline-offset-4 ${
              isLight
                ? 'text-charcoal/80 hover:text-orange-burnt'
                : 'text-cream/80 hover:text-orange-glow'
            }`}
          >
            <span>Need phone support right now? Call (02) 9677 1188</span>
          </a>
        </div>
      </div>
    </section>
  );
}
