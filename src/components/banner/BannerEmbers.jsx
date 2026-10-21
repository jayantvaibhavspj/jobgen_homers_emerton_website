import React, { useEffect, useRef } from 'react';
import { BANNER_CONFIG } from './bannerConfig';

/**
 * BannerEmbers Component
 * Lightweight, low-opacity ambient spark particles rendered on canvas.
 * Automatically pauses when offscreen or when tab is hidden.
 */
export default function BannerEmbers({ isVisible = true }) {
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
    let isPaused = !isVisible;

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? BANNER_CONFIG.embers.mobileCount : BANNER_CONFIG.embers.desktopCount;

    // Initialize particle pool with very low opacity
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.4,
      radius: BANNER_CONFIG.embers.minRadius + Math.random() * (BANNER_CONFIG.embers.maxRadius - BANNER_CONFIG.embers.minRadius),
      speedY: BANNER_CONFIG.embers.minSpeed + Math.random() * (BANNER_CONFIG.embers.maxSpeed - BANNER_CONFIG.embers.minSpeed),
      driftAmp: Math.random() * 0.6 + 0.2,
      driftFreq: Math.random() * 0.012 + 0.004,
      driftOffset: Math.random() * Math.PI * 2,
      baseAlpha: BANNER_CONFIG.embers.baseAlphaMin + Math.random() * (BANNER_CONFIG.embers.baseAlphaMax - BANNER_CONFIG.embers.baseAlphaMin),
      color: BANNER_CONFIG.embers.colors[Math.floor(Math.random() * BANNER_CONFIG.embers.colors.length)],
      blur: Math.random() * 4 + 1.5,
    }));

    let tick = 0;

    const render = () => {
      if (!isPaused && document.visibilityState === 'visible') {
        tick++;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speedY;
          p.x += Math.sin(tick * p.driftFreq + p.driftOffset) * p.driftAmp;

          // Wrap back to bottom
          if (p.y < -20) {
            p.y = height + Math.random() * 30;
            p.x = Math.random() * width;
          }

          // Gentle fade near bottom and top edges
          let fadeFactor = 1;
          if (p.y < height * 0.3) {
            fadeFactor = Math.max(0, p.y / (height * 0.3));
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
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleVisibilityChange = () => {
      isPaused = document.hidden || !isVisible;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
