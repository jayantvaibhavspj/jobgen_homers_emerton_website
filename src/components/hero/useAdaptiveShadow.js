import { useEffect, useRef } from 'react';
import { heroSettings, heroClips } from './heroConfig';

/**
 * useAdaptiveShadow & Ambient Backdrop Hook
 * 
 * - Draws active video frame onto the 64x36 ambient backdrop canvas every ~120ms (8 fps)
 *   to fill wide-screen side gaps with rich, blurred ambient color (no black bars, no hard seams).
 * - Samples the luminance of the region directly behind the text block (left column, 58% height).
 * - Dynamically updates CSS variable `--text-shadow-strength` between SHADOW_MIN and SHADOW_MAX.
 * - Initial paint fallback draws clip poster onto ambient canvas to prevent any dark flash.
 * - Pauses sampling when hero is off-screen or tab is hidden; respects reduced-motion & saveData.
 */
export function useAdaptiveShadow({
  containerRef,
  videoARef,
  videoBRef,
  ambientCanvasRef,
  activeSlot,
  currentClipIndex,
  isPaused,
  prefersReducedMotion,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. First-paint / clip change poster backdrop to avoid flash
    if (ambientCanvasRef?.current && heroSettings.SIDE_FILL === 'ambient') {
      const posterSrc = heroClips[currentClipIndex]?.poster;
      if (posterSrc) {
        const img = new Image();
        img.src = posterSrc;
        img.onload = () => {
          if (ambientCanvasRef.current) {
            const ctx = ambientCanvasRef.current.getContext('2d');
            if (ctx) ctx.drawImage(img, 0, 0, 64, 36);
          }
        };
      }
    }

    if (!heroSettings.ADAPTIVE_SHADOW && heroSettings.SIDE_FILL !== 'ambient') {
      if (containerRef?.current) {
        containerRef.current.style.setProperty('--text-shadow-strength', '1');
      }
      return;
    }

    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 36;
      canvasRef.current = canvas;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const sampleAndRender = () => {
      if (document.hidden || isPaused || prefersReducedMotion) return;

      const video = activeSlot === 'A' ? videoARef?.current : videoBRef?.current;
      if (!video || video.readyState < 2 || video.videoWidth === 0) return;

      try {
        // Draw 64x36 frame to internal sampling canvas
        ctx.drawImage(video, 0, 0, 64, 36);

        // Update ambient backdrop canvas (z-0 behind video)
        if (ambientCanvasRef?.current && heroSettings.SIDE_FILL === 'ambient') {
          const ambCtx = ambientCanvasRef.current.getContext('2d');
          if (ambCtx) {
            ambCtx.drawImage(video, 0, 0, 64, 36);
          }
        }

        // Sample text placement region:
        // Positioned at left: clamp(28px, 4.5vw, 72px), bottom: clamp(28px, 5svh, 56px)
        // Spans X: ~4% to 42% (3 to 27 px on 64px width)
        // Spans Y: ~60% to 94% (22 to 34 px on 36px height)
        const startX = 3;
        const endX = 27;
        const startY = 22;
        const endY = 34;
        const width = endX - startX;
        const height = endY - startY;

        const imgData = ctx.getImageData(startX, startY, width, height);
        const data = imgData.data;

        let totalLuminance = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Standard relative luminance formula
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          totalLuminance += lum;
          count++;
        }

        if (count > 0) {
          const avgLum = totalLuminance / count;
          const minS = heroSettings.SHADOW_MIN || 0.6;
          const maxS = heroSettings.SHADOW_MAX || 1.4;
          const strength = minS + avgLum * (maxS - minS);

          const targetEl = containerRef?.current?.closest('#hero') || document.documentElement;
          targetEl.style.setProperty('--text-shadow-strength', strength.toFixed(3));
          document.documentElement.style.setProperty('--text-shadow-strength', strength.toFixed(3));
        }
      } catch (e) {
        // Fallback to default strength 1.0 if canvas read is blocked
        const targetEl = containerRef?.current?.closest('#hero') || document.documentElement;
        targetEl.style.setProperty('--text-shadow-strength', '1');
        document.documentElement.style.setProperty('--text-shadow-strength', '1');
      }
    };

    // Immediate run on clip change
    sampleAndRender();

    // 120ms interval (~8 fps) for minimal CPU impact
    const interval = setInterval(sampleAndRender, 120);

    return () => clearInterval(interval);
  }, [
    containerRef,
    videoARef,
    videoBRef,
    ambientCanvasRef,
    activeSlot,
    currentClipIndex,
    isPaused,
    prefersReducedMotion,
  ]);
}
