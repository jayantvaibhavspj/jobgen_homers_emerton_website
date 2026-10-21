import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BANNER_CONFIG } from './bannerConfig';

/**
 * BannerTitle Component
 * Words un-blur and slide up with signature easing, followed by a subtle
 * one-time warm light sweep. Supports numeric count-up for "10+" in the Story banner.
 */
export default function BannerTitle({ title, isStory = false }) {
  const shouldReduceMotion = useReducedMotion();
  const [countNumber, setCountNumber] = useState(isStory && !shouldReduceMotion ? 0 : 10);
  const [hasSwept, setHasSwept] = useState(false);

  // Animate count-up for "10+" in Story banner
  useEffect(() => {
    if (!isStory || shouldReduceMotion) return;

    let start = 0;
    const end = 10;
    const durationMs = BANNER_CONFIG.story.countUpDuration * 1000;
    const stepTime = Math.abs(Math.floor(durationMs / end));

    const timer = setInterval(() => {
      start += 1;
      setCountNumber(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isStory, shouldReduceMotion]);

  // Trigger one-time subtle light sweep after words unblur
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setTimeout(() => {
      setHasSwept(true);
    }, (BANNER_CONFIG.reveal.lightSweepDelay + 0.3) * 1000);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  // Split title into words
  const words = title.split(' ');

  if (shouldReduceMotion) {
    return (
      <h1 className="text-4xl sm:text-6xl font-serif font-bold text-cream mb-4">
        {title}
      </h1>
    );
  }

  return (
    <h1 className="relative inline-flex flex-wrap justify-center items-baseline gap-x-2.5 sm:gap-x-3.5 text-4xl sm:text-6xl font-serif font-bold text-cream mb-4 leading-tight select-none">
      {words.map((word, idx) => {
        // Special count-up for "10+" in Story banner
        const isCountWord = isStory && word.includes('10+');

        return (
          <span key={idx} className="inline-block overflow-hidden py-1">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: BANNER_CONFIG.reveal.wordDuration,
                delay: idx * BANNER_CONFIG.reveal.wordStagger,
                ease: BANNER_CONFIG.reveal.ease,
              }}
            >
              {isCountWord ? (
                <span className="tabular-nums font-serif">
                  {countNumber}+
                </span>
              ) : (
                word
              )}
            </motion.span>
          </span>
        );
      })}

      {/* SUBTLE ONE-TIME WARM LIGHT SWEEP OVERLAY */}
      <motion.span
        aria-hidden="true"
        initial={{ x: '-100%', opacity: 0 }}
        animate={hasSwept ? { x: '200%', opacity: [0, 0.5, 0] } : {}}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-orange-glow/40 to-transparent skew-x-12 mix-blend-overlay"
      />
    </h1>
  );
}
