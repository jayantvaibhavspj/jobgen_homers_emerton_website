import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { heroContent, heroSettings } from './heroConfig';

/**
 * HeroHeadline Component
 * 
 * - Word-by-word reveal without blur/overflow clipping (eliminates rectangular tile artifacts)
 * - Clears all transforms, will-change, and filters once animation completes
 * - Fluid clamp() scaling with both vw and svh limits: clamp(2.2rem, min(4.6vw, 8.5svh), 4.6rem)
 * - text-wrap: balance ensuring natural 3-line layout: "Hot, fresh / and made / to order."
 * - 4-layer adaptive text-shadow for crisp legibility over bright frames without video overlays
 * - Signature "order." rendered in warm golden-orange (#ff9a3d) with ambient pulse glow
 */
export const HEADLINE_CONFIG = {
  staggerDelay: 0.1,
  wordDuration: 0.55,
  orderDelay: 0.55,
  glowCycle: 2.5,
  ease: [0.22, 1, 0.36, 1],
};

export default function HeroHeadline({ align = 'left' }) {
  const line1 = heroContent.headline.line1 || ['Hot', '&', 'fresh,'];
  const line2 = heroContent.headline.line2 || ['Made', 'to'];
  const signature = heroContent.headline.signature || 'order.';
  const isLeft = align === 'left';
  const [isRevealed, setIsRevealed] = useState(false);

  const headlineStyle = {
    textShadow: `
      0 0 1px rgba(0,0,0,calc(0.9 * var(--text-shadow-strength, 1))),
      0 2px 6px rgba(0,0,0,calc(0.75 * var(--text-shadow-strength, 1))),
      0 6px 22px rgba(0,0,0,calc(0.6 * var(--text-shadow-strength, 1))),
      0 12px 48px rgba(0,0,0,calc(0.45 * var(--text-shadow-strength, 1)))
    `,
    transition: 'text-shadow 0.4s ease-out',
  };

  return (
    <h1
      className={`text-[clamp(2.1rem,4.2cqw,4.2rem)] font-serif font-bold text-cream tracking-tight leading-[1.08] mb-[clamp(0.5rem,1.4cqw,1rem)] flex flex-col ${
        isLeft ? 'items-start text-left' : 'items-center text-center'
      }`}
      style={headlineStyle}
    >
      {/* Line 1: "Hot & fresh," */}
      <span className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-2.5">
        {line1.map((word, idx) => (
          <span key={idx} className="inline-block py-0.5">
            <motion.span
              className="inline-block"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: HEADLINE_CONFIG.wordDuration,
                delay: idx * HEADLINE_CONFIG.staggerDelay,
                ease: HEADLINE_CONFIG.ease,
              }}
              style={
                isRevealed
                  ? { transform: 'none', willChange: 'auto', filter: 'none' }
                  : { willChange: 'transform, opacity' }
              }
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>

      {/* Line 2: "Made to order." */}
      <span className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-2.5">
        {line2.map((word, idx) => (
          <span key={idx} className="inline-block py-0.5">
            <motion.span
              className="inline-block"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: HEADLINE_CONFIG.wordDuration,
                delay: (line1.length + idx) * HEADLINE_CONFIG.staggerDelay,
                ease: HEADLINE_CONFIG.ease,
              }}
              style={
                isRevealed
                  ? { transform: 'none', willChange: 'auto', filter: 'none' }
                  : { willChange: 'transform, opacity' }
              }
            >
              {word}
            </motion.span>
          </span>
        ))}

        {/* Signature word: "order." */}
        <span className="inline-block py-0.5">
          <motion.span
            className="inline-block italic font-bold relative"
            style={{
              color: heroSettings.SIGNATURE_COLOR || '#ff9a3d',
              ...(isRevealed
                ? { transform: 'none', willChange: 'auto', filter: 'none' }
                : { willChange: 'transform, opacity' }),
            }}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: HEADLINE_CONFIG.wordDuration,
              delay: (line1.length + line2.length) * HEADLINE_CONFIG.staggerDelay,
              ease: HEADLINE_CONFIG.ease,
            }}
            onAnimationComplete={() => setIsRevealed(true)}
          >
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  `0 0 1px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.75), 0 6px 22px rgba(0,0,0,0.6), 0 0 16px rgba(255,154,61,0.35)`,
                  `0 0 1px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.75), 0 6px 22px rgba(0,0,0,0.6), 0 0 32px rgba(255,154,61,0.65)`,
                  `0 0 1px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.75), 0 6px 22px rgba(0,0,0,0.6), 0 0 16px rgba(255,154,61,0.35)`,
                ],
              }}
              transition={{
                duration: HEADLINE_CONFIG.glowCycle,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: HEADLINE_CONFIG.orderDelay + 0.3,
              }}
            >
              {signature}
            </motion.span>
          </motion.span>
        </span>
      </span>
    </h1>
  );
}
