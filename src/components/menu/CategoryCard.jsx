import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import CategoryFoodImage from './CategoryIcons';
import { CATEGORY_RAIL_CONFIG } from './categoryRailConfig';

/**
 * CategoryCard Component
 * Individual 3D cut-out food category card for the horizontal rail.
 * Supports smooth hover physics, spring popping image, active shared-layout glider,
 * and complete ARIA tab accessibility.
 */
export default function CategoryCard({
  category,
  itemCount,
  isActive,
  onSelect,
  isDragging,
}) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Auto-center active card smoothly into view if partially offscreen
  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [isActive]);

  const handleClick = (e) => {
    if (isDragging) return;
    onSelect(category.id);
  };

  const countLabel = itemCount === 1 ? '1 item' : `${itemCount} items`;

  return (
    <motion.button
      ref={cardRef}
      id={`category-tab-${category.id}`}
      role="tab"
      aria-selected={isActive}
      aria-controls="menu-dish-grid"
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: CATEGORY_RAIL_CONFIG.interactions.hoverLiftY,
              transition: CATEGORY_RAIL_CONFIG.springs.hoverCard,
            }
      }
      whileTap={shouldReduceMotion ? {} : { scale: CATEGORY_RAIL_CONFIG.interactions.pressScale }}
      className={`group relative flex-shrink-0 flex flex-col items-center justify-between snap-center rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 select-none outline-none transition-colors duration-200 cursor-pointer ${
        isActive ? 'shadow-warm-md' : 'shadow-sm hover:shadow-warm-sm'
      }`}
      style={{
        width: 'var(--card-width, 140px)',
        height: 'var(--card-height, 180px)',
      }}
    >
      {/* CARD BASE BACKGROUND */}
      <div
        className={`absolute inset-0 rounded-[20px] sm:rounded-[24px] transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-b from-orange-50/90 via-white to-orange-100/40 border border-orange-burnt/30'
            : 'bg-white border border-charcoal/10 group-hover:border-charcoal/20 group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-amber-50/30'
        }`}
      />

      {/* SHARED ACTIVE GLIDER RING (Glides between cards seamlessly) */}
      {isActive && (
        <motion.div
          layoutId="categoryActiveHighlight"
          className="absolute inset-0 rounded-[20px] sm:rounded-[24px] pointer-events-none ring-2 ring-orange-burnt"
          style={{
            boxShadow: CATEGORY_RAIL_CONFIG.accents.activeGlow,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : CATEGORY_RAIL_CONFIG.springs.activeGlider
          }
        />
      )}

      {/* CORNER ACTIVE SPARKLE / CHECK INDICATOR */}
      {isActive && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="absolute top-2.5 right-2.5 z-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-burnt text-white flex items-center justify-center shadow-sm"
          aria-hidden="true"
        >
          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
        </motion.div>
      )}

      {/* TOP: 3D OVERFLOWING CUT-OUT FOOD ARTWORK */}
      <div className="relative z-10 w-full flex items-center justify-center -mt-5 sm:-mt-6 pt-1 flex-1">
        <motion.div
          className="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center"
          animate={
            shouldReduceMotion
              ? {}
              : isActive
              ? {
                  scale: CATEGORY_RAIL_CONFIG.interactions.activeImageScale,
                  rotate: 0,
                  y: -2,
                }
              : {
                  scale: 0.95,
                  rotate: 0,
                  y: 0,
                }
          }
          whileHover={
            shouldReduceMotion
              ? {}
              : !isActive
              ? {
                  scale: CATEGORY_RAIL_CONFIG.interactions.hoverImageScale,
                  rotate: CATEGORY_RAIL_CONFIG.interactions.hoverImageRotate,
                }
              : {}
          }
          transition={CATEGORY_RAIL_CONFIG.springs.imagePop}
        >
          <CategoryFoodImage
            categoryId={category.id}
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </motion.div>
      </div>

      {/* BOTTOM: CATEGORY LABEL & COUNT BADGE */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end text-center mt-auto pb-0.5">
        <span
          className={`text-xs sm:text-[13px] sm:leading-tight line-clamp-2 px-0.5 font-sans transition-colors duration-200 ${
            isActive
              ? 'font-bold text-charcoal'
              : 'font-semibold text-charcoal/80 group-hover:text-charcoal'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {category.label}
        </span>

        {/* Live dynamic count */}
        <span
          className={`text-[10px] sm:text-[11px] font-mono mt-1 transition-colors duration-200 ${
            isActive ? 'text-orange-burnt font-semibold' : 'text-charcoal/45 group-hover:text-charcoal/60'
          }`}
        >
          {countLabel}
        </span>
      </div>
    </motion.button>
  );
}
