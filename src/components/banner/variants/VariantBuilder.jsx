import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BurgerLayerComponents } from '../BannerIllustrations';
import { BANNER_CONFIG } from '../bannerConfig';
import { useMouseParallax } from '../../../hooks/useMouseParallax';

/**
 * VariantBuilder Decorator
 * Left and right mini burger stacks that drop in layer-by-layer
 * with squash-and-stretch gravity bounce, idle wobble, and cursor nudging.
 */
export default function VariantBuilder() {
  const shouldReduceMotion = useReducedMotion();
  const mouse = useMouseParallax(BANNER_CONFIG.parallax.strength);

  if (shouldReduceMotion) return null;

  // Stacking order from bottom to top
  const layers = [
    { id: 'bottom', Component: BurgerLayerComponents.BottomBun, dropY: -120 },
    { id: 'patty', Component: BurgerLayerComponents.Patty, dropY: -180 },
    { id: 'cheese', Component: BurgerLayerComponents.Cheese, dropY: -220 },
    { id: 'bacon', Component: BurgerLayerComponents.Bacon, dropY: -260 },
    { id: 'tomato', Component: BurgerLayerComponents.Tomato, dropY: -300 },
    { id: 'lettuce', Component: BurgerLayerComponents.Lettuce, dropY: -340 },
    { id: 'top', Component: BurgerLayerComponents.TopBun, dropY: -380 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {/* LEFT BURGER STACK */}
      <motion.div
        className="hidden lg:flex absolute left-8 xl:left-20 top-1/2 -translate-y-1/2 flex-col-reverse items-center filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]"
        style={{ x: mouse.x * 0.7, y: mouse.y * 0.7 }}
        animate={{
          rotate: [-1.8, 1.8, -1.8],
        }}
        transition={{
          duration: BANNER_CONFIG.builder.wobbleDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {layers.map((layer, idx) => (
          <motion.div
            key={`left-${layer.id}`}
            initial={{ y: layer.dropY, opacity: 0, scaleY: 1.3, scaleX: 0.8 }}
            animate={{ y: 0, opacity: 1, scaleY: [1.3, 0.85, 1.05, 1], scaleX: [0.8, 1.15, 0.95, 1] }}
            transition={{
              type: 'spring',
              stiffness: BANNER_CONFIG.builder.bounceStiffness,
              damping: BANNER_CONFIG.builder.bounceDamping,
              delay: idx * BANNER_CONFIG.builder.layerStagger + 0.3,
            }}
            className="-mt-3 first:mt-0"
          >
            <layer.Component className="w-24 xl:w-28 h-auto" />
          </motion.div>
        ))}
      </motion.div>

      {/* RIGHT BURGER STACK */}
      <motion.div
        className="hidden lg:flex absolute right-8 xl:right-20 top-1/2 -translate-y-1/2 flex-col-reverse items-center filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]"
        style={{ x: -mouse.x * 0.7, y: -mouse.y * 0.7 }}
        animate={{
          rotate: [1.8, -1.8, 1.8],
        }}
        transition={{
          duration: BANNER_CONFIG.builder.wobbleDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      >
        {layers.map((layer, idx) => (
          <motion.div
            key={`right-${layer.id}`}
            initial={{ y: layer.dropY, opacity: 0, scaleY: 1.3, scaleX: 0.8 }}
            animate={{ y: 0, opacity: 1, scaleY: [1.3, 0.85, 1.05, 1], scaleX: [0.8, 1.15, 0.95, 1] }}
            transition={{
              type: 'spring',
              stiffness: BANNER_CONFIG.builder.bounceStiffness,
              damping: BANNER_CONFIG.builder.bounceDamping,
              delay: idx * BANNER_CONFIG.builder.layerStagger + 0.5,
            }}
            className="-mt-3 first:mt-0"
          >
            <layer.Component className="w-24 xl:w-28 h-auto" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
