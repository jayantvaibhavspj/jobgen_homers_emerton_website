import React, { useState, useEffect, useRef } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';
import SceneSky from './SceneSky';
import SceneSkyline from './SceneSkyline';
import SceneShop from './SceneShop';
import SceneGrill from './SceneGrill';
import SceneSeasoning from './SceneSeasoning';
import SceneDelivery from './SceneDelivery';
import FloatingTickets from './FloatingTickets';

/**
 * FooterScene
 * Master motion-graphic scene component anchored behind the footer.
 * "A night at the grill: the shop is alive, orders are going out"
 *
 * Features:
 * - Purely decorative (aria-hidden="true", pointer-events-none except easter eggs)
 * - Hardware-accelerated 2.5D mouse parallax on desktop
 * - Entrance animation when scrolled into view (< 1.5s)
 * - Auto-pauses all loops when off-screen (IntersectionObserver) or tab hidden
 * - Strict prefers-reduced-motion fallback (static low-opacity snapshot)
 * - Upward gradient mask + scrim overlay guaranteeing WCAG AA text contrast
 * - Zero layout shift or horizontal scroll across mobile, tablet, desktop
 */
export default function FooterScene() {
  const containerRef = useRef(null);

  // Viewport & Tab Visibility States
  const [isInView, setIsInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax coordinates (smooth spring lerp)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // 1. Accessibility & Responsive Viewport Check
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 2. IntersectionObserver (Pause all loops when off-screen)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
        }
      },
      {
        root: null,
        threshold: 0.05, // triggers when 5% of footer is in viewport
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEntered]);

  // 3. Tab Visibility (Pause all loops when document is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 4. Desktop-only Smooth Mouse Parallax
  useEffect(() => {
    if (isReducedMotion || isMobile) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const loop = () => {
      currentX += (targetX - currentX) * FOOTER_SCENE_CONFIG.parallax.smoothing;
      currentY += (targetY - currentY) * FOOTER_SCENE_CONFIG.parallax.smoothing;

      setMouseOffset({
        x: currentX,
        y: currentY,
      });

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion, isMobile]);

  // Active playing flag: only loop when in view and tab is active
  const isPlaying = isInView && isTabVisible && !isReducedMotion;

  // Parallax Layer Transforms
  const { parallax, dimensions, lighting, accessibility } = FOOTER_SCENE_CONFIG;
  const skyTransform = `translate3d(${mouseOffset.x * parallax.sky}px, ${mouseOffset.y * parallax.sky * 0.3}px, 0)`;
  const skylineTransform = `translate3d(${mouseOffset.x * parallax.skyline}px, ${mouseOffset.y * parallax.skyline * 0.3}px, 0)`;
  const shopTransform = `translate3d(${mouseOffset.x * parallax.shop}px, ${mouseOffset.y * parallax.shop * 0.3}px, 0)`;
  const grillTransform = `translate3d(${mouseOffset.x * parallax.grill}px, ${mouseOffset.y * parallax.grill * 0.3}px, 0)`;
  const foregroundTransform = `translate3d(${mouseOffset.x * parallax.foreground}px, ${mouseOffset.y * parallax.foreground * 0.3}px, 0)`;

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-[1]"
      style={{
        height: isMobile
          ? `${dimensions.heightPercentMobile}%`
          : `${dimensions.heightPercentDesktop}%`,
        maxHeight: isMobile
          ? `${dimensions.maxHeightMobilePx}px`
          : `${dimensions.maxHeightDesktopPx}px`,
        minHeight: isMobile ? '160px' : `${dimensions.minHeightDesktopPx}px`,
        // Upward gradient mask fades seamlessly into charcoal
        maskImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) ${dimensions.maskStopSolid}, rgba(0,0,0,0.3) ${dimensions.maskStopMid}, rgba(0,0,0,0) ${dimensions.maskStopTop})`,
        WebkitMaskImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) ${dimensions.maskStopSolid}, rgba(0,0,0,0.3) ${dimensions.maskStopMid}, rgba(0,0,0,0) ${dimensions.maskStopTop})`,
        opacity: isReducedMotion ? accessibility.reducedMotionOpacity : 1,
      }}
      aria-hidden="true"
    >
      {/* Entrance Rise & Fade Transition Container */}
      <div
        className="relative w-full h-full"
        style={{
          transform: isReducedMotion
            ? 'none'
            : hasEntered
            ? 'translateY(0)'
            : 'translateY(35px)',
          opacity: isReducedMotion ? 1 : hasEntered ? 1 : 0,
          transition: isReducedMotion
            ? 'none'
            : 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease',
        }}
      >
        {/* ============================================================ */}
        {/* LAYER 1: SKY (Stars, Moon, Clouds)                           */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: skyTransform }}>
          <SceneSky isPlaying={isPlaying} isReducedMotion={isReducedMotion} isMobile={isMobile} />
        </div>

        {/* ============================================================ */}
        {/* LAYER 2: FAR SKYLINE (Suburban Rooftops, Water Tank, Poles)  */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: skylineTransform }}>
          <SceneSkyline isPlaying={isPlaying} isReducedMotion={isReducedMotion} isMobile={isMobile} />
        </div>

        {/* ============================================================ */}
        {/* LAYER 3: THE SHOP (Awning, Windows, Homers Neon, Bulbs)      */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: shopTransform }}>
          <SceneShop
            isPlaying={isPlaying}
            isReducedMotion={isReducedMotion}
            isMobile={isMobile}
            hasEntered={hasEntered}
          />
        </div>

        {/* ============================================================ */}
        {/* LAYER 4: CHARCOAL GRILL (Flames, Patty Flip, Sparks, Smoke)  */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: grillTransform }}>
          <SceneGrill
            isPlaying={isPlaying}
            isReducedMotion={isReducedMotion}
            isMobile={isMobile}
            mousePos={mouseOffset}
          />
        </div>

        {/* ============================================================ */}
        {/* LAYER 5: SEASONING (Chicken-Salt Shaker & Chips Basket)      */}
        {/* ============================================================ */}
        {!isMobile && (
          <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: foregroundTransform }}>
            <SceneSeasoning
              isPlaying={isPlaying}
              isReducedMotion={isReducedMotion}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* LAYER 6: ORDER TICKETS (Floating Paper Slips)                */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: shopTransform }}>
          <FloatingTickets
            isPlaying={isPlaying}
            isReducedMotion={isReducedMotion}
            isMobile={isMobile}
          />
        </div>

        {/* ============================================================ */}
        {/* LAYER 7: ROAD & DELIVERY SCOOTER (Outbound & Return)         */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: foregroundTransform }}>
          <SceneDelivery
            isPlaying={isPlaying}
            isReducedMotion={isReducedMotion}
            isMobile={isMobile}
          />
        </div>

        {/* ============================================================ */}
        {/* LAYER 8: AMBIENT HEARTH GLOW & DAY-NIGHT BREATHING           */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at 45% 85%, rgba(232, 112, 10, 0.35) 0%, rgba(251, 191, 36, 0.12) 30%, rgba(23, 17, 13, 0) 70%)',
            animation: (!isReducedMotion && isPlaying)
              ? `ambientGlowPulse ${lighting.radialGlowPeriod}s ease-in-out infinite alternate, dayNightCycle ${lighting.dayNightCyclePeriod}s ease-in-out infinite alternate`
              : 'none',
          }}
        />

        {/* ============================================================ */}
        {/* CONTRAST SCRIM: Dark gradient ensuring WCAG AA Readability   */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(23, 17, 13, 0.15) 0%, rgba(23, 17, 13, 0.5) 50%, rgba(23, 17, 13, 0.85) 100%)',
            opacity: lighting.scrimOverlayDarkness,
          }}
        />
      </div>

      {/* Embedded CSS for Ambient Glow Pulsing */}
      <style>{`
        @keyframes ambientGlowPulse {
          0% { opacity: 0.25; }
          100% { opacity: 0.44; }
        }
        @keyframes dayNightCycle {
          0% { filter: brightness(0.95) saturate(0.95); }
          50% { filter: brightness(1.08) saturate(1.1); }
          100% { filter: brightness(0.92) saturate(0.92); }
        }
      `}</style>
    </div>
  );
}
