import React, { useEffect, useRef } from 'react';

/**
 * TUNABLE CONFIGURATION
 * -------------------------------------------------------------
 * DESKTOP_COUNT: Number of embers rendered on desktop screens
 * MOBILE_COUNT:  Number of embers rendered on small mobile viewports
 * MIN_RADIUS / MAX_RADIUS: Particle dot radius in pixels
 * MIN_SPEED / MAX_SPEED: Upward float speed
 * EMBER_COLORS: Warm amber/orange palette matching Homer's brand
 */
export const EMBER_CONFIG = {
  desktopCount: 36,
  mobileCount: 12,
  minRadius: 1.5,
  maxRadius: 3.8,
  minSpeed: 0.35,
  maxSpeed: 0.9,
  colors: ['#f97316', '#fb923c', '#fbbf24', '#ea580c'],
};

export default function EmberParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? EMBER_CONFIG.mobileCount : EMBER_CONFIG.desktopCount;

    // Initialize ember particle pool
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.5,
      radius: EMBER_CONFIG.minRadius + Math.random() * (EMBER_CONFIG.maxRadius - EMBER_CONFIG.minRadius),
      speedY: EMBER_CONFIG.minSpeed + Math.random() * (EMBER_CONFIG.maxSpeed - EMBER_CONFIG.minSpeed),
      driftAmp: Math.random() * 0.8 + 0.3,
      driftFreq: Math.random() * 0.015 + 0.005,
      driftOffset: Math.random() * Math.PI * 2,
      baseAlpha: Math.random() * 0.35 + 0.15,
      color: EMBER_CONFIG.colors[Math.floor(Math.random() * EMBER_CONFIG.colors.length)],
      blur: Math.random() * 6 + 2,
    }));

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(tick * p.driftFreq + p.driftOffset) * p.driftAmp;

        // Reset if drifted beyond top
        if (p.y < -30) {
          p.y = height + Math.random() * 40;
          p.x = Math.random() * width;
        }

        // Fade in near bottom, fade out smoothly near top (above 75% height)
        const progressFromBottom = 1 - p.y / height;
        let fadeFactor = 1;
        if (p.y < height * 0.25) {
          fadeFactor = Math.max(0, p.y / (height * 0.25));
        } else if (p.y > height * 0.85) {
          fadeFactor = Math.max(0, (height - p.y) / (height * 0.15));
        }

        const currentAlpha = p.baseAlpha * fadeFactor;
        if (currentAlpha <= 0.01) continue;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.blur;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[3] mix-blend-screen"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}
