import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function PlateRise({ theme = 'light' }) {
  const sectionRef = useRef(null);
  const plateContainerRef = useRef(null);
  const plateImgRef = useRef(null);
  const shadowRef = useRef(null);
  const bgTextRef = useRef(null);
  const contentCardRef = useRef(null);

  const isLight = theme === 'light';

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Timeline pinned for 150vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Background huge word parallax in opposite direction
      tl.fromTo(
        bgTextRef.current,
        { y: 80, opacity: isLight ? 0.03 : 0.04, scale: 0.9 },
        { y: -120, opacity: isLight ? 0.08 : 0.12, scale: 1.1, ease: 'none' },
        0
      );

      // Plate rises from bottom to center
      tl.fromTo(
        plateContainerRef.current,
        {
          y: '80vh',
          scale: 0.6,
          rotate: -8,
        },
        {
          y: '0vh',
          scale: 1,
          rotate: 0,
          ease: 'power2.out',
        },
        0
      );

      // Soft shadow beneath plate
      tl.fromTo(
        shadowRef.current,
        { scale: 0.4, opacity: 0.2 },
        { scale: 1, opacity: isLight ? 0.5 : 0.7, ease: 'power2.out' },
        0
      );

      // Content card slides in towards end of scroll
      tl.fromTo(
        contentCardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLight]);

  return (
    <section
      id="plate-rise"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4 transition-colors duration-300 ${
        isLight
          ? 'bg-cream text-charcoal border-y border-charcoal/10'
          : 'bg-charcoal-50 text-cream border-t border-cream/10'
      }`}
    >
      {/* HUGE FADED WORD "HOMERS" BEHIND (PARALLAX) */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-serif font-bold text-[18vw] leading-none whitespace-nowrap tracking-wider ${
          isLight ? 'text-charcoal/5' : 'text-cream/5'
        }`}
      >
        HOMERS
      </div>

      {/* AMBIENT RADIAL GLOW */}
      <div
        className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isLight ? 'bg-orange-burnt/10' : 'bg-orange-burnt/15'
        }`}
      />

      {/* MAIN CONTAINER: TWO COLUMN LAYOUT (PLATE + DISH DETAILS) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT / CENTER: THE RISING PLATE WITH SHADOW */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <div
            ref={plateContainerRef}
            className="relative will-change-transform flex items-center justify-center"
          >
            {/* The Cutout Plate Image */}
            <div className="relative z-10 w-72 sm:w-96 md:w-[460px] max-w-[90vw] aspect-square rounded-full transition-transform duration-300">
              <img
                ref={plateImgRef}
                src="/plate.png"
                alt="Homers Signature Flame-Grilled Bacon Burger and Hot Chips Plate"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                loading="eager"
              />

              {/* Fresh Sizzle Floating Tag */}
              <div
                className={`absolute top-4 right-4 sm:top-8 sm:right-6 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-warm backdrop-blur-md animate-pulse-glow ${
                  isLight
                    ? 'bg-charcoal text-cream border border-orange-burnt/40'
                    : 'bg-charcoal/90 text-cream border border-orange-burnt/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-burnt" />
                <span>Cooked fresh to order</span>
              </div>
            </div>

            {/* SOFT SHADOW BENEATH THE PLATE */}
            <div
              ref={shadowRef}
              className={`absolute -bottom-8 w-60 sm:w-80 md:w-96 h-12 rounded-full blur-xl pointer-events-none ${
                isLight ? 'bg-charcoal/40' : 'bg-black/75'
              }`}
            />
          </div>
        </div>

        {/* RIGHT: STORY & DISH CARD */}
        <div ref={contentCardRef} className="lg:col-span-5 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-burnt/15 border border-orange-burnt/30 text-orange-burnt text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-orange-burnt text-orange-burnt" />
            <span>The Emerton Crown Jewel</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-serif font-bold leading-tight mb-4 ${
              isLight ? 'text-charcoal' : 'text-cream'
            }`}
          >
            Flame-Grilled to Golden Perfection.
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isLight ? 'text-charcoal/75' : 'text-cream/80'
            }`}
          >
            Every morning our kitchen grinds 100% grass-fed Angus beef and hand-cuts daily potatoes.
            Sizzling hot off the open flame with double melted American cheddar, crispy woodfired bacon,
            and our famous secret chicken salt seasoning.
          </p>

          <div
            className={`flex flex-wrap items-center gap-4 text-xs sm:text-sm mb-8 pb-6 border-b w-full ${
              isLight ? 'text-charcoal/70 border-charcoal/15' : 'text-cream/70 border-cream/10'
            }`}
          >
            <span className={`font-semibold ${isLight ? 'text-charcoal' : 'text-cream'}`}>
              🔥 100% Open Flame
            </span>
            <span>•</span>
            <span className={`font-semibold ${isLight ? 'text-charcoal' : 'text-cream'}`}>
              🥔 Secret Chicken Salt
            </span>
            <span>•</span>
            <span className={`font-semibold ${isLight ? 'text-charcoal' : 'text-cream'}`}>
              🇦🇺 Australian Raised
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/burger-builder"
              className="px-6 py-3 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-semibold text-sm shadow-warm transition-transform active:scale-95"
            >
              Build your own burger
            </Link>
            <Link
              to="/menu"
              className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${
                isLight
                  ? 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal border-charcoal/20'
                  : 'bg-cream/10 hover:bg-cream/20 text-cream border-cream/20'
              }`}
            >
              See full menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
