import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Clock } from 'lucide-react';
import { getShopStatus } from '../../utils/sydneyTime';

/**
 * MINI TIMER & DELIVERY SCOOTER (STEP 3)
 * -------------------------------------------------------------
 * 1. Radial progress ring filling from 0% to 100%
 * 2. Rising hot steam wisps
 * 3. Tiny delivery scooter silhouette zipping across a dotted path
 * 4. Bonus A: Live Sydney open/closed awareness
 */
export default function MiniTimer({ isPlaying, triggerKey, isLight = true, enableOpenClosed = true }) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const scooterRef = useRef(null);
  const steamRef = useRef(null);
  const statusBadgeRef = useRef(null);

  const status = enableOpenClosed ? getShopStatus() : { isOpen: true, label: 'Open' };

  useEffect(() => {
    if (!isPlaying) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Reset
      const circumference = 2 * Math.PI * 16; // r=16 -> ~100.5
      if (ringRef.current) {
        gsap.set(ringRef.current, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });
      }
      if (scooterRef.current) gsap.set(scooterRef.current, { x: -30, opacity: 0 });
      if (steamRef.current) gsap.set(steamRef.current, { opacity: 0, y: 4 });
      if (statusBadgeRef.current) gsap.set(statusBadgeRef.current, { scale: 0.9, opacity: 0 });

      // 1. Ring fills around the clock
      if (ringRef.current) {
        tl.to(ringRef.current, {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // 2. Steam wisps rise
      if (steamRef.current) {
        tl.to(steamRef.current, {
          opacity: 0.9,
          y: -4,
          duration: 0.25,
          ease: 'power1.out',
        }, '-=0.25');
      }

      // 3. Status badge pops
      if (statusBadgeRef.current) {
        tl.to(statusBadgeRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'back.out(2)',
        }, '-=0.15');
      }

      // 4. Delivery scooter zips across path
      if (scooterRef.current) {
        tl.to(scooterRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.12,
          ease: 'power1.in',
        })
        .to(scooterRef.current, {
          x: 82,
          duration: 0.38,
          ease: 'power2.out',
        })
        .to(scooterRef.current, {
          opacity: 0.7,
          duration: 0.12,
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isPlaying, triggerKey]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 flex flex-col justify-between pointer-events-none mt-2 mb-1 px-1"
      aria-hidden="true"
    >
      {/* Top Row: Progress Timer Ring + Steam Wisps */}
      <div className="flex items-center justify-between px-2">
        <div className="inline-flex items-center gap-1.5">
          {/* Circular SVG Progress Ring */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              {/* Background Ring */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={isLight ? 'rgba(23, 17, 13, 0.1)' : 'rgba(255, 255, 255, 0.1)'}
                strokeWidth="2.5"
              />
              {/* Animated Progress Ring */}
              <circle
                ref={ringRef}
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e8700a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <Clock className="w-3.5 h-3.5 absolute text-orange-burnt" />
          </div>

          {/* Time text / Open-Closed status */}
          <span
            ref={statusBadgeRef}
            className="text-[10px] font-mono font-bold uppercase tracking-tight text-orange-burnt opacity-0"
          >
            {status.isOpen ? '15 Min Pickup' : status.label.replace('Closed · ', '')}
          </span>
        </div>

        {/* Rising Steam Wisps from hot takeaway */}
        <div ref={steamRef} className="w-6 h-4 opacity-0">
          <svg viewBox="0 0 24 16" fill="none" className="w-full h-full">
            <path
              d="M4 14 Q 2 8, 5 4 T 3 0"
              stroke="#e8700a"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M12 14 Q 15 8, 11 4 T 13 0"
              stroke="#e8700a"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M20 14 Q 17 8, 20 4 T 19 0"
              stroke="#e8700a"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Row: Scooter Dotted Road & Mini Scooter Transit */}
      <div className="relative w-full h-4 flex items-center overflow-hidden">
        {/* Dotted Road Path */}
        <div
          className="w-full border-b border-dashed"
          style={{ borderColor: isLight ? 'rgba(23, 17, 13, 0.2)' : 'rgba(255, 255, 255, 0.2)' }}
        />

        {/* Mini Delivery Scooter Silhouette */}
        <div
          ref={scooterRef}
          className="absolute left-0 bottom-0.5 opacity-0 will-change-transform flex items-center"
        >
          <svg viewBox="0 0 24 16" fill="none" className="w-5 h-3.5 drop-shadow-sm">
            {/* Scooter body */}
            <path d="M2 13C2 11.5 3.5 10 5.5 10H8L10 6H13L15 10H17C19 10 20.5 11.5 20.5 13" stroke="#e8700a" strokeWidth="1.5" strokeLinecap="round" />
            {/* Wheels */}
            <circle cx="5" cy="13" r="2" fill="#17110d" stroke="#e8700a" strokeWidth="1" />
            <circle cx="18" cy="13" r="2" fill="#17110d" stroke="#e8700a" strokeWidth="1" />
            {/* Takeaway hot box on rear */}
            <rect x="2" y="7" width="4.5" height="4" rx="0.5" fill="#f59e0b" />
          </svg>
        </div>
      </div>
    </div>
  );
}
