import React, { useMemo } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneSky Layer
 * Deep charcoal/night gradient, crescent moon with soft radial halo,
 * twinkling stars with randomized stagger, and slow-drifting wispy clouds.
 */
export default function SceneSky({ isPlaying = true, isReducedMotion = false, isMobile = false }) {
  const { sky, palette } = FOOTER_SCENE_CONFIG;
  const starCount = isMobile ? sky.starCountMobile : sky.starCountDesktop;

  // Generate deterministic star positions and twinkle parameters
  const stars = useMemo(() => {
    return Array.from({ length: starCount }, (_, i) => {
      // Distribute stars mostly in upper 70% of sky
      const x = ((i * 47 + 13) % 1400) + 20;
      const y = ((i * 31 + 7) % 210) + 15;
      const r = (i % 5 === 0 ? 1.6 : i % 3 === 0 ? 1.2 : 0.85);
      const duration = sky.starTwinkleMinDuration + ((i * 1.3) % (sky.starTwinkleMaxDuration - sky.starTwinkleMinDuration));
      const delay = (i * 0.4) % 3;
      const baseAlpha = 0.35 + (i % 4) * 0.18;
      return { id: i, x, y, r, duration, delay, baseAlpha };
    });
  }, [starCount, sky.starTwinkleMinDuration, sky.starTwinkleMaxDuration]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYBottom slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep night sky gradient */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#080605" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#120c09" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1a120d" stopOpacity="0.6" />
          </linearGradient>

          {/* Moon glow */}
          <radialGradient id="moonGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe8b3" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Cloud linear gradient */}
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#251912" stopOpacity="0" />
            <stop offset="25%" stopColor="#2e1f17" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#2a1b14" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#251912" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Night background fill */}
        <rect width="1440" height="320" fill="url(#skyGrad)" />

        {/* Twinkling Stars */}
        <g className="stars-group">
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#fbf6f0"
              style={{
                opacity: isReducedMotion ? star.baseAlpha * 0.7 : star.baseAlpha,
                animation: (!isReducedMotion && isPlaying)
                  ? `starTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`
                  : 'none',
              }}
            />
          ))}
        </g>

        {/* Crescent Moon with Soft Amber Glow (top right quarter) */}
        <g
          className="moon-group"
          style={{
            animation: (!isReducedMotion && isPlaying)
              ? `moonDrift ${sky.moonDriftDuration}s ease-in-out infinite alternate`
              : 'none',
          }}
        >
          {/* Moon ambient glow */}
          <circle cx="1180" cy="70" r="42" fill="url(#moonGlowGrad)" />
          {/* Subtle warm halo ring */}
          <circle cx="1180" cy="70" r="22" fill="#ffd166" opacity="0.12" />

          {/* Crescent Moon Path */}
          <path
            d="M 1184 56 A 15 15 0 1 0 1195 83 A 13.5 13.5 0 1 1 1184 56 Z"
            fill="#faeed8"
            opacity="0.88"
          />
        </g>

        {/* Wispy Night Clouds drifting horizontally */}
        {!isMobile && (
          <g opacity={sky.cloudOpacity}>
            {/* Cloud 1 */}
            <path
              d="M 120 90 Q 240 75 380 92 Q 480 105 600 88 Q 480 82 340 80 Q 200 82 120 90 Z"
              fill="url(#cloudGrad)"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? `cloudDriftA ${sky.cloudDriftDuration}s linear infinite`
                  : 'none',
              }}
            />
            {/* Cloud 2 */}
            <path
              d="M 800 65 Q 920 52 1080 68 Q 1200 78 1320 62 Q 1180 58 1020 55 Q 890 56 800 65 Z"
              fill="url(#cloudGrad)"
              style={{
                animation: (!isReducedMotion && isPlaying)
                  ? `cloudDriftB ${sky.cloudDriftDuration * 1.3}s linear infinite`
                  : 'none',
              }}
            />
          </g>
        )}
      </svg>

      {/* Embedded CSS animations for 60fps transform & opacity only */}
      <style>{`
        @keyframes starTwinkle {
          0% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.9; transform: scale(1.2); }
          100% { opacity: 0.25; transform: scale(0.9); }
        }
        @keyframes moonDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-14px, 6px); }
        }
        @keyframes cloudDriftA {
          0% { transform: translateX(-160px); }
          100% { transform: translateX(200px); }
        }
        @keyframes cloudDriftB {
          0% { transform: translateX(-120px); }
          100% { transform: translateX(240px); }
        }
      `}</style>
    </div>
  );
}
