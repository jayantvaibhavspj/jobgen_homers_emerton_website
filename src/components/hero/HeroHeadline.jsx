import React from 'react';
import { motion } from 'framer-motion';

/**
 * TUNABLE CONFIGURATION
 * -------------------------------------------------------------
 * STAGGER_DELAY: Time gap between each word entry (seconds)
 * WORD_DURATION: Duration of slide-up and unblur (seconds)
 * ORDER_DELAY: Extra delay for the final signature word "order."
 * GLOW_CYCLE: Duration of continuous pulsing orange text-shadow (seconds)
 */
export const HEADLINE_CONFIG = {
  staggerDelay: 0.12,
  wordDuration: 0.72,
  orderDelay: 0.7,
  glowCycle: 2.5,
  ease: [0.22, 1, 0.36, 1],
};

const WORDS = ['Hot,', 'fresh', 'and', 'made', 'to'];

export default function HeroHeadline() {
  return (
    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-cream tracking-tight leading-[1.08] mb-6 flex flex-wrap justify-center items-baseline gap-x-2.5 sm:gap-x-4">
      {WORDS.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden py-1">
          <motion.span
            className="inline-block will-change-transform"
            initial={{
              y: 70,
              opacity: 0,
              filter: 'blur(8px)',
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: HEADLINE_CONFIG.wordDuration,
              delay: idx * HEADLINE_CONFIG.staggerDelay,
              ease: HEADLINE_CONFIG.ease,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}

      {/* Signature word: "order." */}
      <span className="inline-block overflow-hidden py-1">
        <motion.span
          className="inline-block italic text-orange-burnt font-normal will-change-transform relative"
          initial={{
            y: 70,
            opacity: 0,
            filter: 'blur(8px)',
          }}
          animate={{
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: HEADLINE_CONFIG.wordDuration,
            delay: HEADLINE_CONFIG.orderDelay,
            ease: HEADLINE_CONFIG.ease,
          }}
        >
          <motion.span
            className="inline-block"
            animate={{
              textShadow: [
                '0 0 10px rgba(249, 115, 22, 0.4), 0 0 20px rgba(232, 112, 10, 0.2)',
                '0 0 35px rgba(249, 115, 22, 0.85), 0 0 50px rgba(232, 112, 10, 0.5)',
                '0 0 10px rgba(249, 115, 22, 0.4), 0 0 20px rgba(232, 112, 10, 0.2)',
              ],
            }}
            transition={{
              duration: HEADLINE_CONFIG.glowCycle,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: HEADLINE_CONFIG.orderDelay + 0.3,
            }}
          >
            order.
          </motion.span>
        </motion.span>
      </span>
    </h1>
  );
}
