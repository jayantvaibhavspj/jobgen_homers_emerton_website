import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import BannerEmbers from './BannerEmbers';
import BannerTitle from './BannerTitle';
import BannerBadge from './BannerBadge';
import { BANNER_CONFIG } from './bannerConfig';

// Variants
import VariantMenu from './variants/VariantMenu';
import VariantBuilder from './variants/VariantBuilder';
import VariantCatering from './variants/VariantCatering';
import VariantOrder from './variants/VariantOrder';
import VariantStory from './variants/VariantStory';
import VariantContact from './variants/VariantContact';

/**
 * PageBanner Master Wrapper
 * -------------------------------------------------------------
 * Enhances all 6 dark page headers with themed motion, background breathing glow,
 * ambient embers, and side gutter food illustrations with ZERO layout shift.
 */
export default function PageBanner({
  variant = 'menu',
  badgeIcon,
  badgeText,
  title,
  subtitle,
  noticeText,
  noticeIcon: NoticeIcon,
  bgPhoto,
  isOpen = true,
  className = '',
  children,
}) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Pause animations when scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pick variant decor component
  const renderVariantDecor = () => {
    switch (variant) {
      case 'menu':
        return <VariantMenu />;
      case 'builder':
        return <VariantBuilder />;
      case 'catering':
        return <VariantCatering />;
      case 'order':
        return <VariantOrder />;
      case 'story':
        return <VariantStory />;
      case 'contact':
        return <VariantContact />;
      default:
        return null;
    }
  };

  // Radial breathing glow position
  const getGlowPosition = () => {
    switch (variant) {
      case 'menu':
        return 'top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'builder':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'catering':
        return 'bottom-1/4 left-1/2 -translate-x-1/2';
      case 'order':
        return 'bottom-0 left-1/2 -translate-x-1/2';
      case 'story':
        return 'bottom-0 left-1/2 -translate-x-1/2';
      case 'contact':
        return 'top-1/2 left-1/3 -translate-y-1/2';
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-charcoal text-cream border-b border-cream/10 select-none ${className}`}
    >
      {/* ========================================================
          LAYER 0: BACKGROUND (KEN BURNS PHOTO & BREATHING GLOW)
          ======================================================== */}
      {bgPhoto && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.img
            src={bgPhoto}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter brightness-75 contrast-125"
            animate={
              shouldReduceMotion || !isInView
                ? {}
                : { scale: BANNER_CONFIG.background.kenBurnsScale }
            }
            transition={{
              duration: BANNER_CONFIG.background.kenBurnsDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal" />
        </div>
      )}

      {/* Breathing Warm Radial Ambient Glow */}
      <motion.div
        className={`absolute w-[450px] sm:w-[650px] h-[350px] sm:h-[450px] rounded-full pointer-events-none filter blur-[80px] sm:blur-[120px] -z-0 ${getGlowPosition()}`}
        style={{
          background: 'radial-gradient(circle, rgba(232, 112, 10, 0.45) 0%, rgba(199, 52, 28, 0.15) 50%, transparent 75%)',
        }}
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.3 }
            : {
                opacity: [
                  BANNER_CONFIG.background.glowOpacityMin,
                  BANNER_CONFIG.background.glowOpacityMax,
                  BANNER_CONFIG.background.glowOpacityMin,
                ],
                scale: [0.95, 1.05, 0.95],
              }
        }
        transition={{
          duration: BANNER_CONFIG.background.radialGlowDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      {/* ========================================================
          LAYER 1: AMBIENT EMBERS (14 DESKTOP, 6 MOBILE)
          ======================================================== */}
      <BannerEmbers isVisible={isInView} />

      {/* ========================================================
          LAYER 2: THEMED GUTTER DECORATION (PER VARIANT)
          ======================================================== */}
      {isInView && renderVariantDecor()}

      {/* ========================================================
          LAYER 3: FOREGROUND CONTENT (EXACT PADDING & DOM HIERARCHY)
          ======================================================== */}
      <div className="relative z-10 max-w-3xl mx-auto pointer-events-auto">
        {/* Animated Badge */}
        {badgeText && (
          <div className="flex justify-center">
            <BannerBadge
              icon={badgeIcon}
              text={badgeText}
              variant={variant}
              isOpen={isOpen}
            />
          </div>
        )}

        {/* Word Reveal Title */}
        {title && (
          <div className="text-center">
            <BannerTitle title={title} isStory={variant === 'story'} />
          </div>
        )}

        {/* Subtitle with Smooth Fade Up */}
        {subtitle && (
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: BANNER_CONFIG.reveal.subtitleDelay,
              ease: BANNER_CONFIG.reveal.ease,
            }}
            className="text-cream/70 text-sm sm:text-base max-w-xl mx-auto text-center leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Optional Notice Pill (e.g. Catering 4-day notice with soft pulse glow) */}
        {noticeText && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex justify-center mt-6"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      boxShadow: [
                        '0 0 0px rgba(245, 158, 11, 0)',
                        '0 0 16px rgba(245, 158, 11, 0.35)',
                        '0 0 0px rgba(245, 158, 11, 0)',
                      ],
                    }
              }
              transition={{
                duration: BANNER_CONFIG.catering.noticePulseDuration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-flex items-center gap-2 text-xs text-amber-300 bg-amber-950/60 px-4 py-2 rounded-full border border-amber-500/30"
            >
              {NoticeIcon && <NoticeIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />}
              <span>{noticeText}</span>
            </motion.div>
          </motion.div>
        )}

        {/* Slot for custom children if needed */}
        {children}
      </div>
    </div>
  );
}
