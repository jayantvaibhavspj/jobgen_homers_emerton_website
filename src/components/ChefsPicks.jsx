import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CHEFS_PICKS_SETS } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function ChefsPicks({ onAddToCart }) {
  const containerRef = useRef(null);
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const totalSets = CHEFS_PICKS_SETS.length;
  const currentSet = CHEFS_PICKS_SETS[activeSetIndex] || CHEFS_PICKS_SETS[0];

  // Function to switch to next set with smooth crossfade
  const goToNextSet = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setActiveSetIndex((prev) => (prev + 1) % totalSets);
      setIsFading(false);
    }, 280);
  }, [totalSets]);

  const goToPrevSet = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setActiveSetIndex((prev) => (prev - 1 + totalSets) % totalSets);
      setIsFading(false);
    }, 280);
  }, [totalSets]);

  const goToSet = useCallback((index) => {
    if (index === activeSetIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveSetIndex(index);
      setIsFading(false);
    }, 280);
  }, [activeSetIndex]);

  // Auto-change every 3 seconds (3000ms), paused on hover
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isHovered) return;

    timerRef.current = setInterval(() => {
      goToNextSet();
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goToNextSet, isHovered]);

  // ScrollTrigger reveal animation on initial scroll (preserved exactly as requested)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.chef-pick-item');
      if (items) {
        items.forEach((item) => {
          const img = item.querySelector('.pick-image-wrapper');
          const textCols = item.querySelectorAll('.pick-text-reveal');

          // Clip-path mask reveal for image
          if (img) {
            gsap.fromTo(
              img,
              { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', scale: 1.1 },
              {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scale: 1.0,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }

          // Line-by-line text reveal
          if (textCols.length > 0) {
            gsap.fromTo(
              textCols,
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="picks"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-charcoal-50 py-24 px-4 sm:px-6 overflow-hidden border-t border-cream/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-burnt/15 border border-orange-burnt/30 text-orange-glow text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Master Crafted Standouts</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-cream mb-4">
            Chef's Picks
          </h2>
          <p className="text-cream/70 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
            Iconic standouts from across our menu, rotating fresh from our flame grill, seafood fryers, and slow-simmered carvery pots.
          </p>

          {/* Interactive Set Navigator (Pills + Left/Right arrows in one clean row) */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
            <button
              onClick={goToPrevSet}
              className="w-9 h-9 shrink-0 rounded-full bg-charcoal/90 hover:bg-orange-burnt text-cream/80 hover:text-white flex items-center justify-center border border-cream/15 transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="Previous dishes"
              title="Previous set"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-charcoal/90 border border-cream/15 backdrop-blur-md shadow-lg">
              {CHEFS_PICKS_SETS.map((set, sIdx) => {
                const isActive = sIdx === activeSetIndex;
                return (
                  <button
                    key={set.setId}
                    onClick={() => goToSet(sIdx)}
                    className={`shrink-0 relative flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-orange-burnt text-white shadow-warm font-semibold'
                        : 'text-cream/60 hover:text-cream hover:bg-cream/10'
                    }`}
                    aria-label={`Show ${set.label}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-cream/40'}`} />
                    <span>{set.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={goToNextSet}
              className="w-9 h-9 shrink-0 rounded-full bg-charcoal/90 hover:bg-orange-burnt text-cream/80 hover:text-white flex items-center justify-center border border-cream/15 transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="Next dishes"
              title="Next set"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The 3 Signature Dishes (Alternating Layout) */}
        <div className="space-y-24 sm:space-y-32">
          {currentSet.dishes.map((dish, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={`slot-${index}`}
                className={`chef-pick-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="pick-image-wrapper relative rounded-[20px] overflow-hidden bg-charcoal border border-cream/10 shadow-warm-lg group aspect-[4/3] sm:aspect-[16/10]">
                    <div
                      className={`w-full h-full transition-all duration-300 ease-out ${
                        isFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
                      }`}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {dish.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full bg-charcoal/85 backdrop-blur-md text-[11px] font-semibold text-cream border border-cream/20 shadow-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="absolute bottom-4 right-4 bg-orange-burnt text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-warm">
                        From ${dish.price.toFixed(2)} AUD
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Column */}
                <div
                  className={`lg:col-span-5 flex flex-col items-start ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div
                    className={`w-full flex flex-col items-start transition-all duration-300 ease-out ${
                      isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  >
                    <span className="pick-text-reveal text-xs font-mono uppercase tracking-widest text-orange-glow mb-2">
                      {dish.subtitle}
                    </span>

                    <h3 className="pick-text-reveal text-3xl sm:text-5xl font-serif font-bold text-cream leading-tight mb-4 min-h-[2.5rem]">
                      {dish.name}
                    </h3>

                    <p className="pick-text-reveal text-cream/80 text-sm sm:text-base leading-relaxed mb-6 min-h-[3.5rem]">
                      {dish.description}
                    </p>

                    <div className="pick-text-reveal flex items-center gap-4 mb-8">
                      <div className="flex flex-col">
                        <span className="text-xs text-cream/50 uppercase">Single Dish</span>
                        <span className="text-2xl font-serif font-bold text-cream">
                          ${dish.price.toFixed(2)}{' '}
                          <span className="text-xs font-sans text-cream/50">AUD</span>
                        </span>
                      </div>

                      {dish.comboPrice && (
                        <div className="flex flex-col pl-4 border-l border-cream/15">
                          <span className="text-xs text-orange-glow uppercase font-medium">
                            Combo + Chips & Drink
                          </span>
                          <span className="text-2xl font-serif font-bold text-orange-burnt">
                            ${dish.comboPrice.toFixed(2)}{' '}
                            <span className="text-xs font-sans text-cream/50">AUD</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pick-text-reveal flex flex-wrap gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => onAddToCart(dish)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm shadow-warm hover:shadow-glow-orange transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Order · ${dish.price.toFixed(2)}</span>
                      </button>

                      {dish.comboPrice && (
                        <button
                          onClick={() =>
                            onAddToCart({
                              ...dish,
                              id: `${dish.id}-combo`,
                              name: `${dish.name} (Meal Combo)`,
                              price: dish.comboPrice,
                              description: `${dish.description} + Chips & 375ml Drink`,
                            })
                          }
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium border border-cream/20 transition-colors"
                        >
                          <span>Add as Combo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
