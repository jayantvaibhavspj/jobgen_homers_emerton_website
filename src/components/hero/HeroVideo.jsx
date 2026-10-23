import React, { useEffect, useRef, useState, useCallback } from 'react';
import { heroClips, heroSettings } from './heroConfig';
import { useAdaptiveShadow } from './useAdaptiveShadow';

/**
 * HeroVideo Component - Dual-Video Seamless Crossfade Playlist Engine
 * 
 * - Full-frame 16:9 aspect fit (object-fit: cover, object-position: center top)
 * - Zero top/bottom cropping at any screen width
 * - Zero Ken Burns / scale zoom (raw 1:1 pixel rendering, no zoom cropping)
 * - Raw video color presentation without filters or opacity tint overlays
 * - Seamless 0.9s crossfade using two stacked <video> elements (A & B)
 * - Preloads ONLY the next clip in queue (at most two videos in DOM/network)
 * - Autoplay safety: instant poster, smooth video fade-in, stall detection
 * - Smart loading: 720p on mobile / saveData, poster-only on reduced motion or 2G
 * - Visibility / IntersectionObserver pausing and cleanup
 */
export default function HeroVideo({
  currentClipIndex,
  onClipChange,
  onProgressUpdate,
  jumpTargetIndex,
  onJumpComplete,
  ambientCanvasRef,
}) {
  const containerRef = useRef(null);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);

  // Connection and device capabilities
  const [isMobile, setIsMobile] = useState(false);
  const [useDataSaver, setUseDataSaver] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Playback state
  const [activeSlot, setActiveSlot] = useState('A'); // 'A' | 'B'
  const [clipIndexA, setClipIndexA] = useState(0);
  const [clipIndexB, setClipIndexB] = useState(1);
  const [opacityA, setOpacityA] = useState(0);
  const [opacityB, setOpacityB] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Poster slideshow state for slow connections / data saver
  const [posterSlideIndex, setPosterSlideIndex] = useState(0);

  const crossfadeDuration = heroSettings.CROSSFADE_DURATION;
  const isTransitioningRef = useRef(false);
  const isPausedByObserverRef = useRef(false);

  const totalClips = heroClips.length;

  // Adaptive shadow dynamic sampling & ambient backdrop rendering
  useAdaptiveShadow({
    containerRef,
    videoARef,
    videoBRef,
    ambientCanvasRef,
    activeSlot,
    currentClipIndex,
    isPaused: isPausedByObserverRef.current,
    prefersReducedMotion,
  });

  // 1. Detect capabilities, screen size, and user preferences
  useEffect(() => {
    const checkMedia = () => {
      const mobile = window.innerWidth < heroSettings.MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);

      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        const isSlow = conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g';
        setUseDataSaver(Boolean(isSlow));
      }
    };

    checkMedia();
    window.addEventListener('resize', checkMedia);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMedia);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Helper: Get clip video URL based on mobile/saveData
  const getVideoSrc = useCallback(
    (index) => {
      const clip = heroClips[index % totalClips];
      if (!clip) return '';
      return isMobile || useDataSaver ? clip.video720 : clip.video1080;
    },
    [isMobile, useDataSaver, totalClips]
  );

  // 2. Poster slideshow effect for data saver / slow connections
  useEffect(() => {
    if (!useDataSaver || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setPosterSlideIndex((prev) => {
        const next = (prev + 1) % totalClips;
        onClipChange?.(next);
        return next;
      });
    }, heroSettings.POSTER_SLIDESHOW_INTERVAL * 1000);

    return () => clearInterval(interval);
  }, [useDataSaver, prefersReducedMotion, totalClips, onClipChange]);

  // 3. Initial Video Startup
  useEffect(() => {
    if (prefersReducedMotion || useDataSaver) return;

    const videoA = videoARef.current;
    if (!videoA) return;

    // Safety timeout: if video cannot play within 3s, stay on poster without errors
    const stallTimer = setTimeout(() => {
      if (!videoStarted) {
        setAutoplayBlocked(true);
      }
    }, 3000);

    const handleCanPlay = () => {
      const playPromise = videoA.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            clearTimeout(stallTimer);
            setVideoStarted(true);
            setOpacityA(1);
          })
          .catch(() => {
            clearTimeout(stallTimer);
            setAutoplayBlocked(true);
          });
      }
    };

    videoA.addEventListener('canplay', handleCanPlay, { once: true });

    return () => {
      clearTimeout(stallTimer);
      if (videoA) {
        videoA.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, [prefersReducedMotion, useDataSaver]);

  // 4. Crossfade Transition Logic between Slot A and Slot B
  const triggerCrossfade = useCallback(
    (targetSlot, nextClip) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const incomingVideo = targetSlot === 'B' ? videoBRef.current : videoARef.current;
      const outgoingVideo = targetSlot === 'B' ? videoARef.current : videoBRef.current;

      if (!incomingVideo || !outgoingVideo) {
        isTransitioningRef.current = false;
        return;
      }

      // Start incoming video
      incomingVideo.currentTime = 0;
      const playPromise = incomingVideo.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (targetSlot === 'B') {
              setOpacityB(1);
              setOpacityA(0);
            } else {
              setOpacityA(1);
              setOpacityB(0);
            }

            // After crossfade completes, switch active slot and queue the next clip
            setTimeout(() => {
              setActiveSlot(targetSlot);
              onClipChange?.(nextClip);

              // Pause outgoing video and prepare its next clip in line
              outgoingVideo.pause();
              outgoingVideo.currentTime = 0;

              const subsequentIndex = (nextClip + 1) % totalClips;
              if (targetSlot === 'B') {
                setClipIndexA(subsequentIndex);
                if (videoARef.current) {
                  videoARef.current.load();
                }
              } else {
                setClipIndexB(subsequentIndex);
                if (videoBRef.current) {
                  videoBRef.current.load();
                }
              }

              isTransitioningRef.current = false;
            }, crossfadeDuration * 1000);
          })
          .catch(() => {
            isTransitioningRef.current = false;
          });
      }
    },
    [crossfadeDuration, totalClips, onClipChange]
  );

  // 5. Time update monitor for seamless end-of-clip crossfade
  const handleTimeUpdate = (slot) => {
    const video = slot === 'A' ? videoARef.current : videoBRef.current;
    if (!video || isTransitioningRef.current || activeSlot !== slot) return;

    const duration = video.duration;
    const current = video.currentTime;

    if (duration > 0) {
      onProgressUpdate?.(current, duration);

      // Trigger crossfade slightly before end (crossfadeDuration before real end)
      if (duration - current <= crossfadeDuration && duration > crossfadeDuration) {
        if (slot === 'A') {
          triggerCrossfade('B', clipIndexB);
        } else {
          triggerCrossfade('A', clipIndexA);
        }
      }
    }
  };

  // 6. Manual Jump when user selects a clip indicator
  useEffect(() => {
    if (jumpTargetIndex === null || jumpTargetIndex === undefined) return;
    if (jumpTargetIndex === currentClipIndex) {
      onJumpComplete?.();
      return;
    }

    if (activeSlot === 'A') {
      setClipIndexB(jumpTargetIndex);
      if (videoBRef.current) {
        videoBRef.current.src = getVideoSrc(jumpTargetIndex);
        videoBRef.current.load();
        videoBRef.current.oncanplay = () => {
          triggerCrossfade('B', jumpTargetIndex);
          onJumpComplete?.();
          videoBRef.current.oncanplay = null;
        };
      }
    } else {
      setClipIndexA(jumpTargetIndex);
      if (videoARef.current) {
        videoARef.current.src = getVideoSrc(jumpTargetIndex);
        videoARef.current.load();
        videoARef.current.oncanplay = () => {
          triggerCrossfade('A', jumpTargetIndex);
          onJumpComplete?.();
          videoARef.current.oncanplay = null;
        };
      }
    }
  }, [jumpTargetIndex, activeSlot, currentClipIndex, getVideoSrc, triggerCrossfade, onJumpComplete]);

  // 7. Pause when off-screen (IntersectionObserver) and when tab is hidden
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current;
          if (!currentVideo) return;

          if (entry.isIntersecting && !document.hidden) {
            if (isPausedByObserverRef.current) {
              currentVideo.play().catch(() => {});
              isPausedByObserverRef.current = false;
            }
          } else {
            if (!currentVideo.paused) {
              currentVideo.pause();
              isPausedByObserverRef.current = true;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const handleVisibility = () => {
      const currentVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current;
      if (!currentVideo) return;

      if (document.hidden) {
        if (!currentVideo.paused) {
          currentVideo.pause();
          isPausedByObserverRef.current = true;
        }
      } else {
        if (isPausedByObserverRef.current) {
          currentVideo.play().catch(() => {});
          isPausedByObserverRef.current = false;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [activeSlot]);

  const activePoster =
    useDataSaver || prefersReducedMotion
      ? heroClips[posterSlideIndex]?.poster
      : heroClips[currentClipIndex]?.poster;

  return (
    <div
      ref={containerRef}
      className="hero-edge-fade absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-charcoal"
      aria-hidden="true"
    >
      {/* ========================================================
          1. HIGH-PRIORITY FIRST POSTER / FALLBACK POSTER
          Matches exact object-fit: cover, object-position: center top
          ======================================================== */}
      <img
        src={activePoster || heroClips[0].poster}
        alt=""
        fetchPriority="high"
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
          videoStarted && !autoplayBlocked && !useDataSaver && !prefersReducedMotion
            ? 'opacity-0'
            : 'opacity-100'
        }`}
      />

      {/* ========================================================
          2. DUAL VIDEO STACK (A & B) FOR ZERO-GAP CROSSFADE
          Zero scale / zoom animation, object-position: center top
          ======================================================== */}
      {!prefersReducedMotion && !useDataSaver && (
        <>
          {/* Slot A */}
          <video
            ref={videoARef}
            src={getVideoSrc(clipIndexA)}
            muted
            playsInline
            disablePictureInPicture
            preload="auto"
            onTimeUpdate={() => handleTimeUpdate('A')}
            className="absolute inset-0 w-full h-full object-cover object-top will-change-[opacity]"
            style={{
              opacity: opacityA,
              transition: `opacity ${crossfadeDuration}s ease-in-out`,
            }}
          />

          {/* Slot B */}
          <video
            ref={videoBRef}
            src={getVideoSrc(clipIndexB)}
            muted
            playsInline
            disablePictureInPicture
            preload="metadata"
            onTimeUpdate={() => handleTimeUpdate('B')}
            className="absolute inset-0 w-full h-full object-cover object-top will-change-[opacity]"
            style={{
              opacity: opacityB,
              transition: `opacity ${crossfadeDuration}s ease-in-out`,
            }}
          />
        </>
      )}
    </div>
  );
}
