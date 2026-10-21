import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from './CategoryCard';
import { useDragScroll } from './useDragScroll';
import { CATEGORY_RAIL_CONFIG } from './categoryRailConfig';

/**
 * CategoryRail Component
 * Horizontal single-row rail with snap scrolling, drag scroll,
 * circular navigation buttons, soft gradient edge masks, and full keyboard navigation.
 */
export default function CategoryRail({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) {
  const { containerRef, isDragging, dragProps } = useDragScroll();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Check scroll boundary to dynamically toggle circular navigation arrows
  const checkScrollBounds = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollBounds();
    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);

    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds, containerRef]);

  // Scroll by ~3 cards
  const handleScrollByCards = (direction) => {
    const el = containerRef.current;
    if (!el) return;

    // Card width + gap (140 + 16 = 156 on desktop)
    const cardStep = 156 * CATEGORY_RAIL_CONFIG.rail.scrollCardCount;
    const targetScroll = el.scrollLeft + direction * cardStep;

    el.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  // Keyboard navigation for accessible tablist
  const handleKeyDown = (e) => {
    const currentIndex = categories.findIndex((c) => c.id === activeCategory);
    if (currentIndex === -1) return;

    let nextIndex = null;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = categories.length - 1;
    }

    if (nextIndex !== null) {
      const nextCategory = categories[nextIndex];
      onSelectCategory(nextCategory.id);

      // Focus the newly active tab button
      const nextTabEl = document.getElementById(`category-tab-${nextCategory.id}`);
      if (nextTabEl) {
        nextTabEl.focus();
      }
    }
  };

  return (
    <div
      className="relative w-full mb-10 select-none group/rail"
      onKeyDown={handleKeyDown}
      style={{
        '--card-width': `${CATEGORY_RAIL_CONFIG.dimensions.desktopWidth}px`,
        '--card-height': `${CATEGORY_RAIL_CONFIG.dimensions.desktopHeight}px`,
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          :root {
            --card-width: ${CATEGORY_RAIL_CONFIG.dimensions.mobileWidth}px !important;
            --card-height: ${CATEGORY_RAIL_CONFIG.dimensions.mobileHeight}px !important;
          }
        }
      `}</style>

      {/* LEFT SCROLL ARROW (Desktop only, hides at left bound) */}
      <div
        className={`hidden md:flex absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${
          canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => handleScrollByCards(-1)}
          aria-label="Scroll categories left"
          className="w-10 h-10 rounded-full bg-white/95 text-charcoal shadow-warm-md hover:shadow-warm-lg hover:bg-orange-burnt hover:text-white border border-charcoal/10 flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* RIGHT SCROLL ARROW (Desktop only, hides at right bound) */}
      <div
        className={`hidden md:flex absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${
          canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => handleScrollByCards(1)}
          aria-label="Scroll categories right"
          className="w-10 h-10 rounded-full bg-white/95 text-charcoal shadow-warm-md hover:shadow-warm-lg hover:bg-orange-burnt hover:text-white border border-charcoal/10 flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* LEFT EDGE SOFT FADE MASK */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-cream via-cream/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* RIGHT EDGE SOFT FADE MASK */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-cream via-cream/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* HORIZONTAL RAIL CONTAINER */}
      <div
        ref={containerRef}
        {...dragProps}
        role="tablist"
        aria-label="Food Categories"
        className={`w-full flex items-center gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-5 px-3 sm:px-4 snap-x snap-mandatory scrollbar-none no-scrollbar cursor-grab active:cursor-grabbing ${
          isDragging ? 'cursor-grabbing select-none' : ''
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <motion.div
              key={cat.id}
              initial={shouldReduceMotion ? false : { y: 30, opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * CATEGORY_RAIL_CONFIG.rail.staggerDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-shrink-0"
            >
              <CategoryCard
                category={cat}
                itemCount={count}
                isActive={isActive}
                onSelect={onSelectCategory}
                isDragging={isDragging}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
