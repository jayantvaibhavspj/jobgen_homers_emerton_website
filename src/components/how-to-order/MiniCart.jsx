import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * MINI CART MICRO-ANIMATION (STEP 1)
 * -------------------------------------------------------------
 * 3 tiny food icons (burger, chips, drink) drop one by one into
 * a small takeaway basket, with squash/bounce physics, and a live
 * counter badge ticking 0 -> 1 -> 2 -> 3.
 */
export default function MiniCart({ isPlaying, triggerKey, isLight = true }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const item1Ref = useRef(null); // Burger
  const item2Ref = useRef(null); // Chips
  const item3Ref = useRef(null); // Drink
  const basketRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Reset initial states
      gsap.set([item1Ref.current, item2Ref.current, item3Ref.current], {
        y: -35,
        opacity: 0,
        scale: 0.6,
        rotation: 0,
      });
      if (counterRef.current) counterRef.current.textContent = '0';
      if (badgeRef.current) gsap.set(badgeRef.current, { scale: 0.8 });

      // Item 1: Tiny Burger Drops
      tl.to(item1Ref.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: -6,
        duration: 0.35,
        ease: 'bounce.out',
        onComplete: () => {
          if (counterRef.current) counterRef.current.textContent = '1';
        },
      })
      .to(basketRef.current, { scaleY: 0.92, scaleX: 1.05, duration: 0.08, yoyo: true, repeat: 1 }, '-=0.15')
      .to(badgeRef.current, { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.1');

      // Item 2: Golden Chips Drop
      tl.to(item2Ref.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 8,
        duration: 0.35,
        ease: 'bounce.out',
        onComplete: () => {
          if (counterRef.current) counterRef.current.textContent = '2';
        },
      }, '+=0.1')
      .to(basketRef.current, { scaleY: 0.92, scaleX: 1.05, duration: 0.08, yoyo: true, repeat: 1 }, '-=0.15')
      .to(badgeRef.current, { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.1');

      // Item 3: Cold Drink Drops
      tl.to(item3Ref.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: -4,
        duration: 0.35,
        ease: 'bounce.out',
        onComplete: () => {
          if (counterRef.current) counterRef.current.textContent = '3';
        },
      }, '+=0.1')
      .to(basketRef.current, { scaleY: 0.88, scaleX: 1.08, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.15')
      .to(badgeRef.current, { scale: 1.4, duration: 0.12, yoyo: true, repeat: 1 }, '-=0.1');

    }, containerRef);

    return () => ctx.revert();
  }, [isPlaying, triggerKey]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 flex items-center justify-center pointer-events-none mt-2 mb-1"
      aria-hidden="true"
    >
      <div className="relative w-28 h-12 flex items-end justify-center">
        {/* Falling Food Item 1: Mini Burger */}
        <div
          ref={item1Ref}
          className="absolute left-4 bottom-2 z-20 w-6 h-5 opacity-0 will-change-transform"
        >
          <svg viewBox="0 0 24 20" fill="none" className="w-full h-full drop-shadow-sm">
            {/* Top Bun */}
            <path d="M3 9C3 4.5 7 2 12 2C17 2 21 4.5 21 9H3Z" fill="#e8700a" />
            {/* Patty */}
            <rect x="2" y="11" width="20" height="3.5" rx="1.75" fill="#5c3826" />
            {/* Cheese */}
            <path d="M4 11L8 14L13 11L18 14L20 11" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            {/* Bottom Bun */}
            <path d="M3 15C3 17 6 18.5 12 18.5C18 18.5 21 17 21 15H3Z" fill="#d97706" />
          </svg>
        </div>

        {/* Falling Food Item 2: Mini Golden Chips */}
        <div
          ref={item2Ref}
          className="absolute left-10 bottom-2 z-20 w-5 h-6 opacity-0 will-change-transform"
        >
          <svg viewBox="0 0 20 24" fill="none" className="w-full h-full drop-shadow-sm">
            {/* Fries Cup */}
            <path d="M4 10L6 22H14L16 10H4Z" fill="#ef4444" />
            {/* Chips sticking out */}
            <rect x="6" y="2" width="2.5" height="12" rx="1" fill="#f59e0b" transform="rotate(-8 6 2)" />
            <rect x="9" y="1" width="2.5" height="13" rx="1" fill="#fbbf24" />
            <rect x="12" y="3" width="2.5" height="11" rx="1" fill="#f59e0b" transform="rotate(10 12 3)" />
          </svg>
        </div>

        {/* Falling Food Item 3: Mini Drink */}
        <div
          ref={item3Ref}
          className="absolute right-4 bottom-2 z-20 w-5 h-6 opacity-0 will-change-transform"
        >
          <svg viewBox="0 0 20 24" fill="none" className="w-full h-full drop-shadow-sm">
            {/* Cup */}
            <path d="M4 7L6 22H14L16 7H4Z" fill={isLight ? '#17110d' : '#fbf6f0'} fillOpacity="0.85" />
            {/* Lid */}
            <rect x="3" y="5" width="14" height="2.5" rx="1" fill="#e8700a" />
            {/* Straw */}
            <path d="M11 5V1L14 0" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* The Basket / Cart Container */}
        <div
          ref={basketRef}
          className="relative z-10 w-24 h-6 border-b-2 border-x-2 rounded-b-xl flex items-center justify-center transition-transform will-change-transform"
          style={{
            borderColor: '#e8700a',
            backgroundColor: isLight ? 'rgba(232, 112, 10, 0.08)' : 'rgba(232, 112, 10, 0.15)',
          }}
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 flex justify-around items-center opacity-30 px-2">
            <span className="w-[1px] h-3 bg-orange-burnt" />
            <span className="w-[1px] h-3 bg-orange-burnt" />
            <span className="w-[1px] h-3 bg-orange-burnt" />
            <span className="w-[1px] h-3 bg-orange-burnt" />
          </div>

          {/* Mini Counter Badge */}
          <div
            ref={badgeRef}
            className="absolute -top-3 -right-2 bg-orange-burnt text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white/60"
          >
            <span ref={counterRef}>3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
