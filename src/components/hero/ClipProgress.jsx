import React from 'react';
import { heroClips, heroSettings } from './heroConfig';

/**
 * ClipProgress Component
 * Renders an interactive, story-style segmented progress bar.
 * Supports:
 * - inline=true: Embeds directly into the info strip below the video.
 * - inline=false: Absolute positioning at bottom center.
 */
export default function ClipProgress({
  currentClipIndex,
  currentTime,
  clipDuration,
  onSelectClip,
  inline = false,
}) {
  if (!heroSettings.PROGRESS_ENABLED) return null;

  return (
    <div
      role="tablist"
      aria-label="Cooking showcase video clips playlist"
      className={
        inline
          ? 'flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-cream/5 border border-cream/10'
          : 'hidden md:flex items-center justify-center gap-2 absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto px-4 py-2 rounded-full bg-charcoal/40 backdrop-blur-md border border-cream/10'
      }
    >
      {heroClips.map((clip, index) => {
        const isActive = index === currentClipIndex;
        const isPast = index < currentClipIndex;

        let fillPercent = 0;
        if (isPast) {
          fillPercent = 100;
        } else if (isActive) {
          const duration = clipDuration > 0 ? clipDuration : clip.duration || 10;
          fillPercent = Math.min(100, Math.max(0, (currentTime / duration) * 100));
        }

        const label = `Show clip ${index + 1}: ${clip.caption || clip.originalPrefix.replace(/_/g, ' ')}`;

        return (
          <button
            key={clip.id}
            role="tab"
            aria-selected={isActive}
            aria-label={label}
            onClick={() => onSelectClip?.(index)}
            className="group relative h-4 flex items-center px-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt rounded transition-all"
          >
            {/* Segment Track */}
            <div className="w-6 sm:w-8 lg:w-9 h-1 rounded-full bg-cream/20 overflow-hidden group-hover:bg-cream/35 transition-colors">
              <div
                className="h-full bg-orange-burnt group-hover:bg-orange-glow rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${fillPercent}%` }}
              />
            </div>

            {/* Hover tooltip */}
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity bg-charcoal/95 border border-cream/20 text-cream text-[10px] font-medium px-2 py-0.5 rounded shadow-warm whitespace-nowrap z-30">
              {index + 1}. {clip.caption || 'Cooking Scene'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
