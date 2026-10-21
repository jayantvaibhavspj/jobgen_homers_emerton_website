import { useState, useEffect } from 'react';

/**
 * TUNABLE CONFIGURATION
 * -------------------------------------------------------------
 * STRENGTH: maximum pixel displacement under full cursor movement
 * SMOOTHING: interpolation factor (lower = smoother/more lag)
 */
const DEFAULT_STRENGTH = 18;
const DEFAULT_SMOOTHING = 0.08;

export function useMouseParallax(strength = DEFAULT_STRENGTH, smoothing = DEFAULT_SMOOTHING) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check for reduced motion preference or touch-only device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || isTouchOnly) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 ... 1 with origin at screen center
      targetX = ((e.clientX / innerWidth) - 0.5) * 2;
      targetY = ((e.clientY / innerHeight) - 0.5) * 2;
    };

    const animate = () => {
      // Linear interpolation (Lerp) for silky spring-like movement
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;

      setCoords({
        x: currentX * strength,
        y: currentY * strength,
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [strength, smoothing]);

  return coords;
}
