import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCheck } from 'lucide-react';

/**
 * MINI CHAT MICRO-ANIMATION (STEP 2)
 * -------------------------------------------------------------
 * WhatsApp-style conversational order flow:
 * 1. Customer bubble slides in: "1x Tower Burger + Chips"
 * 2. Kitchen typing bubble with 3 bouncing dots
 * 3. Kitchen reply bubble pops: "Order received" + blue double ticks
 * 4. Periodic subtle phone wiggle
 */
export default function MiniChat({ isPlaying, triggerKey, isLight = true }) {
  const containerRef = useRef(null);
  const bubble1Ref = useRef(null);
  const typingRef = useRef(null);
  const bubble2Ref = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);
  const ticksRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Reset
      gsap.set(bubble1Ref.current, { x: -25, opacity: 0, scale: 0.85 });
      gsap.set(typingRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(bubble2Ref.current, { x: 25, opacity: 0, scale: 0.85 });
      if (ticksRef.current) gsap.set(ticksRef.current, { color: '#9ca3af' }); // Grey ticks initially

      // 1. Customer message slides in
      tl.to(bubble1Ref.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      // 2. Typing indicator appears
      tl.to(typingRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'power1.out',
      }, '+=0.15');

      // Bouncing dots loop during typing
      const dotsTl = gsap.timeline({ repeat: 2, yoyo: true });
      dotsTl.to([dot1Ref.current, dot2Ref.current, dot3Ref.current], {
        y: -3,
        stagger: 0.08,
        duration: 0.15,
        ease: 'power1.inOut',
      });

      tl.add(dotsTl, '-=0.1');

      // 3. Typing indicator hides & kitchen confirmation bubble pops
      tl.to(typingRef.current, {
        opacity: 0,
        scale: 0.6,
        duration: 0.15,
      })
      .to(bubble2Ref.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
      // Double ticks turn WhatsApp blue/teal
      .to(ticksRef.current, {
        color: '#25D366',
        scale: 1.2,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      }, '-=0.1');

    }, containerRef);

    return () => ctx.revert();
  }, [isPlaying, triggerKey]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 flex flex-col justify-center gap-1 pointer-events-none mt-2 mb-1 px-1 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Customer message bubble (Green WhatsApp tint) */}
      <div
        ref={bubble1Ref}
        className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-t-lg rounded-br-lg rounded-bl-sm text-[10px] font-medium leading-none shadow-sm will-change-transform"
        style={{
          backgroundColor: isLight ? '#dcf8c6' : '#1e3a2b',
          color: isLight ? '#124116' : '#bbf7d0',
          border: isLight ? '1px solid rgba(37, 211, 102, 0.3)' : '1px solid rgba(74, 222, 128, 0.2)',
        }}
      >
        <span>1x Tower Burger + Chips</span>
      </div>

      <div className="flex items-center justify-between w-full">
        {/* 2. Typing dots indicator */}
        <div
          ref={typingRef}
          className="self-start inline-flex items-center gap-1 px-2 py-1 rounded-full bg-charcoal/10 dark:bg-cream/10 opacity-0"
        >
          <span ref={dot1Ref} className="w-1 h-1 rounded-full bg-emerald-600 block" />
          <span ref={dot2Ref} className="w-1 h-1 rounded-full bg-emerald-600 block" />
          <span ref={dot3Ref} className="w-1 h-1 rounded-full bg-emerald-600 block" />
        </div>

        {/* 3. Kitchen reply bubble with verified ticks */}
        <div
          ref={bubble2Ref}
          className="self-end inline-flex items-center gap-1 px-2.5 py-1 rounded-t-lg rounded-bl-lg rounded-br-sm text-[10px] font-semibold leading-none shadow-sm opacity-0 will-change-transform ml-auto"
          style={{
            backgroundColor: isLight ? '#ffffff' : '#221b16',
            color: isLight ? '#17110d' : '#fbf6f0',
            border: '1px solid rgba(232, 112, 10, 0.3)',
          }}
        >
          <span>Order received</span>
          <span ref={ticksRef} className="text-[#9ca3af] inline-flex">
            <CheckCheck className="w-3 h-3 stroke-[2.5]" />
          </span>
        </div>
      </div>
    </div>
  );
}
