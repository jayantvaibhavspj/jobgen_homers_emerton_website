import React from 'react';
import { heroSettings } from './heroConfig';

/**
 * HeroScrim Component
 * Conditionally renders contrast overlays if SCRIM_STRENGTH > 0.
 * When SCRIM_STRENGTH === 0 (default per user specification), returns NULL completely:
 * Zero overlay, zero tint, zero filter, zero blend mode - showing raw, vivid video colors.
 */
export default function HeroScrim({ isMobile }) {
  const { SCRIM_STRENGTH, SCRIMS, TEXT_ALIGN } = heroSettings;

  // Zero overlay when SCRIM_STRENGTH is 0
  if (!SCRIM_STRENGTH || SCRIM_STRENGTH <= 0) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none select-none transition-opacity duration-700"
      style={{ opacity: Math.min(1, Math.max(0, SCRIM_STRENGTH)) }}
      aria-hidden="true"
    >
      {/* 1. Base Uniform Tint */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: SCRIMS.uniformTint }}
      />

      {/* 2. Directional Gradient Scrim: Left or Center based on TEXT_ALIGN */}
      {!isMobile && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              TEXT_ALIGN === 'center' ? SCRIMS.centerGradient : SCRIMS.leftGradient,
          }}
        />
      )}

      {/* 3. Bottom Gradient Scrim */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isMobile
            ? SCRIMS.mobileBottomGradient
            : SCRIMS.bottomGradient,
        }}
      />

      {/* 4. Subtle Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: SCRIMS.vignette }}
      />
    </div>
  );
}
