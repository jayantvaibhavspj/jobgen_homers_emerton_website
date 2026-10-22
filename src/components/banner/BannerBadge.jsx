import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Utensils, Flame, ShoppingBag, Heart, MapPin } from 'lucide-react';
import { BANNER_CONFIG } from './bannerConfig';

/**
 * BannerBadge Component
 * Pill badge with subtle looping icon micro-animation (flame flicker, heart beat, pin bob, etc.)
 * and optional live neon glow for the Contact store status.
 */
export default function BannerBadge({
  icon: IconComponent,
  text,
  variant,
  isOpen = true,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  // Pick micro-animation based on variant
  const getIconAnimation = () => {
    if (shouldReduceMotion) return {};

    switch (variant) {
      case 'menu':
        // Fork/Utensils gentle tilt
        return {
          rotate: [-4, 4, -4],
          transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'builder':
        // Flame flicker
        return {
          scale: [1, 1.15, 0.95, 1.08, 1],
          rotate: [-2, 3, -1, 2, 0],
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'catering':
        // Sparkle twinkle
        return {
          scale: [1, 1.28, 0.9, 1.15, 1],
          opacity: [0.8, 1, 0.7, 1, 0.8],
          transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'order':
        // Bag sway
        return {
          rotate: [-5, 5, -5],
          y: [0, -1.5, 0],
          transition: { duration: 3.0, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'story':
        // Heart pulse
        return {
          scale: [1, 1.25, 1.05, 1.2, 1],
          transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'contact':
        // Pin bob
        return {
          y: [0, -3.5, 0],
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        };
      default:
        return {};
    }
  };

  const isMenu = variant === 'menu';

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { y: -15, opacity: 0 }}
      animate={shouldReduceMotion ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: BANNER_CONFIG.reveal.badgeSlideDuration, ease: BANNER_CONFIG.reveal.ease }}
      className="relative inline-flex items-center justify-center mb-3"
    >
      {/* Contact Variant Neon Glow reflecting Sydney shop open/closed status */}
      {variant === 'contact' && (
        <span
          className={`absolute -inset-1 rounded-full blur-md opacity-40 transition-colors duration-500 ${
            isOpen ? 'bg-emerald-500' : 'bg-orange-burnt'
          }`}
          aria-hidden="true"
        />
      )}

      <div
        className={`relative inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold transition-colors ${
          isMenu
            ? 'bg-cream/10 border border-cream/20 text-orange-glow'
            : 'bg-orange-burnt/20 border border-orange-burnt/30 text-orange-glow'
        } ${className}`}
      >
        <motion.span
          className="inline-flex items-center justify-center"
          animate={getIconAnimation()}
        >
          {IconComponent && (
            <IconComponent
              className={`w-3.5 h-3.5 ${
                variant === 'story'
                  ? 'text-chilli fill-chilli'
                  : 'text-orange-burnt'
              }`}
            />
          )}
        </motion.span>
        <span>{text}</span>
      </div>
    </motion.div>
  );
}
