import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import CategoryFoodImage from './CategoryIcons';
import { CATEGORY_RAIL_CONFIG } from './categoryRailConfig';

/**
 * StickyCategoryBar Component
 * Slim floating compact pill bar that appears when the user scrolls past the main rail
 * while still browsing the menu section. Positioned cleanly below the navbar.
 */
export default function StickyCategoryBar({
  categories,
  activeCategory,
  onSelectCategory,
  isVisible,
}) {
  const scrollContainerRef = useRef(null);
  const activePillRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Keep active pill centered in the sticky bar when active category changes
  useEffect(() => {
    if (activePillRef.current) {
      activePillRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: -25, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: -25, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 sm:top-24 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none flex justify-center"
          role="region"
          aria-label="Sticky Category Navigation"
        >
          <div
            ref={scrollContainerRef}
            className="pointer-events-auto max-w-4xl w-full rounded-full bg-white/95 backdrop-blur-xl border border-charcoal/15 shadow-warm-lg p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  ref={isActive ? activePillRef : null}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`relative flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt ${
                    isActive
                      ? 'text-charcoal font-bold'
                      : 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
                  }`}
                >
                  {/* Shared Active Highlight for Compact Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="stickyActiveHighlight"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-50 via-white to-orange-100/60 ring-2 ring-orange-burnt shadow-sm"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : CATEGORY_RAIL_CONFIG.springs.activeGlider
                      }
                    />
                  )}

                  {/* 28px Miniature Cut-Out Artwork Thumbnail */}
                  <div className="relative z-10 w-7 h-7 flex-shrink-0 flex items-center justify-center -my-1">
                    <CategoryFoodImage
                      categoryId={cat.id}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  {/* Category Name */}
                  <span className="relative z-10 whitespace-nowrap text-xs">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
