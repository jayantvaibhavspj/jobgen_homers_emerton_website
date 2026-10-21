import React from 'react';
import { ASSEMBLY_CONFIG } from './assemblyConfig';

/**
 * CHICKEN SALT SEASONING RAIN
 * -------------------------------------------------------------
 * Golden amber and savory crystal specks raining over the fries bowl
 * during the seasoning timeline window.
 */
export default function SeasoningRain({ containerRef, className = '' }) {
  const count = ASSEMBLY_CONFIG.particles.chickenSaltDesktop;

  const specks = Array.from({ length: count }, (_, i) => ({
    x: 15 + Math.random() * 180,
    y: 10 + Math.random() * 120,
    size: Math.random() * 2.8 + 1.2,
    color: ['#fbbf24', '#fef08a', '#f59e0b', '#ffffff', '#eab308'][i % 5],
    delay: (i * 0.02).toFixed(2),
  }));

  return (
    <div
      ref={containerRef}
      className={`absolute pointer-events-none select-none overflow-visible opacity-0 ${className}`}
      aria-hidden="true"
    >
      {specks.map((s, idx) => (
        <div
          key={idx}
          className="chicken-salt-speck absolute rounded-full will-change-transform filter drop-shadow-[0_0_2px_rgba(251,191,36,0.8)]"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            transform: 'translateY(-120px) scale(0)',
          }}
        />
      ))}
    </div>
  );
}
