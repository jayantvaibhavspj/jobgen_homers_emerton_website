import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CloudSun } from 'lucide-react';
import { fetchEmertonWeather } from '../utils/weatherApi';

// Hero Subcomponents
import HeroVideo from './hero/HeroVideo';
import HeroScrim from './hero/HeroScrim';
import HeroContent from './hero/HeroContent';
import ClipCaption from './hero/ClipCaption';
import ClipProgress from './hero/ClipProgress';
import { heroContent, heroSettings } from './hero/heroConfig';

/**
 * Rebuilt Hero Section - Homers Emerton
 * 
 * Update Specifications:
 * 1. Full-Frame 16:9 Video Container (Zero Cropping):
 *    - Container is strictly `width: 100%; aspect-ratio: 16/9; height: auto; position: relative; overflow: hidden;`
 *    - Every min-height/100svh/max() rule forcing the video taller has been removed.
 *    - <video> fills with object-fit: cover and transform: none (exact aspect = 0% vertical & 0% horizontal crop).
 * 2. Layout Over Video vs Below Video (BREAKPOINT_OVERLAY = 1100px):
 *    - Desktop (>= 1100px):
 *      - Overlaid on video: ONLY logo badge, lunch pill, headline, and CTAs (vertically centered in lower 2/3).
 *      - Slim dark info strip directly below video: weather chip, stats row, dish caption, and progress bar.
 *    - Below 1100px (narrow windows, tablets, phones):
 *      - Video remains full 16:9 at top (zero cropping).
 *      - All text, CTAs, weather, and stats sit below video on solid dark brown background (bg-charcoal).
 * 3. Zero Layer Over Video:
 *    - SCRIM_STRENGTH: 0; no scrim, tint, gradient, or vignette overlay.
 *    - Readability achieved via layered text-shadow, text-stroke, and adaptive shadow sampling.
 */
export default function Hero({ onOpenCart, onOpenSpecials }) {
  const heroRef = useRef(null);
  const [weather, setWeather] = useState({ chipText: '21°C · Emerton Takeaway', mode: 'mild' });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Active clip and timeline states
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [clipDuration, setClipDuration] = useState(10);
  const [jumpTargetIndex, setJumpTargetIndex] = useState(null);

  // Viewport detection
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  const ambientCanvasRef = useRef(null);

  // Dynamically measure visible viewport height (below browser chrome/toolbars)
  useEffect(() => {
    const updateViewportHeight = () => {
      const h = window.visualViewport?.height || window.innerHeight;
      if (h > 0) {
        document.documentElement.style.setProperty('--hero-vh', `${Math.round(h)}px`);
      }
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight);
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight);
      }
    };
  }, []);

  // Dynamically measure real floating navbar height
  useEffect(() => {
    const updateNavHeight = () => {
      const header = document.querySelector('header[role="banner"]') || document.querySelector('header');
      if (header) {
        const rect = header.getBoundingClientRect();
        if (rect.height > 0) {
          document.documentElement.style.setProperty('--nav-h', `${Math.round(rect.height)}px`);
        }
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    const header = document.querySelector('header[role="banner"]') || document.querySelector('header');
    let ro = null;
    if (header && window.ResizeObserver) {
      ro = new ResizeObserver(updateNavHeight);
      ro.observe(header);
    }

    return () => {
      window.removeEventListener('resize', updateNavHeight);
      if (ro) ro.disconnect();
    };
  }, []);

  // Live Sydney / Emerton Weather
  useEffect(() => {
    fetchEmertonWeather().then((data) => {
      if (data) setWeather(data);
    });
  }, []);

  const handleClipChange = useCallback((newIndex) => {
    setCurrentClipIndex(newIndex);
    setCurrentTime(0);
  }, []);

  const handleProgressUpdate = useCallback((current, duration) => {
    setCurrentTime(current);
    if (duration > 0) setClipDuration(duration);
  }, []);

  const handleSelectClip = useCallback((index) => {
    setJumpTargetIndex(index);
  }, []);

  const handleJumpComplete = useCallback(() => {
    setJumpTargetIndex(null);
  }, []);

  const weatherDisplay = weather?.chipText || heroContent.weather.defaultText;
  const weatherTagline = heroContent.weather.tagline;

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Homers Emerton Hero Showcase"
      className="relative w-full flex flex-col bg-charcoal select-none overflow-hidden"
    >
      {/* AMBIENT BACKDROP: 64x36 canvas behind video container, fills side gaps on wide screens */}
      {heroSettings.SIDE_FILL === 'ambient' && (
        <canvas
          ref={ambientCanvasRef}
          width={64}
          height={36}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
          style={{
            filter: `blur(${heroSettings.AMBIENT_BLUR || 60}px) saturate(1.15)`,
            transform: 'scale(1.1)',
            opacity: 0.9,
          }}
          aria-hidden="true"
        />
      )}

      {/* 1. EXACT 16:9 FULL-FRAME VIDEO CONTAINER (CENTERED, MAX 1 SCREEN TALL) */}
      <div className="hero-video-box z-10 bg-charcoal">
        <HeroVideo
          currentClipIndex={currentClipIndex}
          onClipChange={handleClipChange}
          onProgressUpdate={handleProgressUpdate}
          jumpTargetIndex={jumpTargetIndex}
          onJumpComplete={handleJumpComplete}
          ambientCanvasRef={ambientCanvasRef}
        />

        {/* Optional Scrim (Renders null when SCRIM_STRENGTH === 0) */}
        <HeroScrim isMobile={false} />

        {/* OVERLAY ON VIDEO: Only visible at >= 1100px (Desktop Overlay Mode: Left column, 58% height) */}
        <div className="hero-desktop-overlay pointer-events-none z-10">
          <div className="pointer-events-auto w-full">
            <HeroContent
              onOpenSpecials={onOpenSpecials}
              weather={weather}
              prefersReducedMotion={prefersReducedMotion}
              isMobile={false}
              includeWeather={false}
            />
          </div>
        </div>

        {/* Mobile/Tablet Caption Chip in top/bottom corner of video when < 1100px */}
        <div className="hero-mobile-caption">
          <ClipCaption currentClipIndex={currentClipIndex} inline={false} />
        </div>
      </div>

      {/* 2. SLIM DARK INFO STRIP DIRECTLY BELOW VIDEO (72-96px) - ONLY at >= 1100px */}
      <div className="hero-desktop-strip w-full bg-charcoal border-b border-cream/10 px-8 lg:px-14 py-4 min-h-[76px] items-center justify-between gap-6 z-20">
        {/* Left: Weather Chip + Stats Row */}
        <div className="flex items-center gap-6 lg:gap-8 flex-wrap">
          {/* Weather Pill */}
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-cream/90 shadow-warm"
            style={heroSettings.PILL_GLASS_STYLE}
          >
            <CloudSun className="w-4 h-4 text-orange-burnt flex-shrink-0" />
            <span>{weatherDisplay}</span>
            <span className="text-cream/40">•</span>
            <span className="text-cream/70 text-xs">{weatherTagline}</span>
          </div>
        </div>

        {/* Right: Dish Caption Chip + Story Progress Bar */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <ClipCaption currentClipIndex={currentClipIndex} inline={true} />
          <ClipProgress
            currentClipIndex={currentClipIndex}
            currentTime={currentTime}
            clipDuration={clipDuration}
            onSelectClip={handleSelectClip}
            inline={true}
          />
        </div>
      </div>

      {/* 3. SOLID DARK BROWN SECTION BELOW VIDEO - ONLY at < 1100px */}
      <div className="hero-mobile-stacked w-full bg-charcoal px-4 sm:px-8 py-8 sm:py-12 text-cream border-b border-cream/10">
        <div className="max-w-2xl mx-auto flex flex-col items-start text-left w-full">
          <HeroContent
            onOpenSpecials={onOpenSpecials}
            weather={weather}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={true}
            includeWeather={true}
          />

          {/* Progress Indicator for Tablet/Mobile screens */}
          <div className="w-full mt-6 flex justify-center sm:justify-start">
            <ClipProgress
              currentClipIndex={currentClipIndex}
              currentTime={currentTime}
              clipDuration={clipDuration}
              onSelectClip={handleSelectClip}
              inline={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
