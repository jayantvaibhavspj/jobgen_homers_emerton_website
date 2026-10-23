import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';
import { heroClips, heroSettings } from './heroConfig';

/**
 * ClipCaption Component
 * Displays an elegant dish caption pill with a warm flame icon.
 * Supports:
 * - inline=true: Formatted for embedding into the slim info strip below video.
 * - inline=false: Absolute positioning in bottom-left corner of video frame.
 */
export default function ClipCaption({ currentClipIndex, inline = false }) {
  if (!heroSettings.CAPTION_ENABLED) return null;

  const clip = heroClips[currentClipIndex];
  if (!clip || !clip.caption) return null;

  const Content = (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-cream/90 text-xs sm:text-sm font-medium shadow-warm transition-all group"
      style={heroSettings.PILL_GLASS_STYLE}
    >
      <Flame className="w-3.5 h-3.5 text-orange-burnt flex-shrink-0 group-hover:scale-110 transition-transform" />
      <span className="tracking-wide text-cream/95 group-hover:text-cream">
        {clip.caption}
      </span>
      {clip.menuLink && (
        <span className="text-[10px] uppercase font-bold text-orange-glow tracking-wider ml-0.5 opacity-80 group-hover:opacity-100">
          Menu &rarr;
        </span>
      )}
    </span>
  );

  return (
    <div
      className={
        inline
          ? 'relative pointer-events-auto inline-flex'
          : 'absolute bottom-4 left-4 z-20 pointer-events-auto'
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={clip.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {clip.menuLink ? (
            <a
              href={clip.menuLink}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt rounded-full"
              aria-label={`View menu section for ${clip.caption}`}
            >
              {Content}
            </a>
          ) : (
            <div>{Content}</div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
