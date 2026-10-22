import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UtensilsCrossed, PhoneCall, ShoppingBag, Sparkles, Phone } from 'lucide-react';
import { SHOP_INFO } from '../config';
import { ORDER_JOURNEY_CONFIG } from './how-to-order/orderJourneyConfig';
import JourneyPath from './how-to-order/JourneyPath';
import StepCard from './how-to-order/StepCard';
import ThermalTicket from './how-to-order/ThermalTicket';

gsap.registerPlugin(ScrollTrigger);

export default function HowToOrder({ theme = 'light' }) {
  const isLight = theme === 'light';
  const sectionRef = useRef(null);

  // Heading Refs
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const highlighterRef = useRef(null);

  // Path & Token Refs
  const desktopPathRef = useRef(null);
  const desktopGlowPathRef = useRef(null);
  const mobilePathRef = useRef(null);
  const desktopTokenRef = useRef(null);
  const mobileTokenRef = useRef(null);

  // Card Refs
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const numBadge1Ref = useRef(null);
  const numBadge2Ref = useRef(null);
  const numBadge3Ref = useRef(null);

  // Bonus Refs
  const ticketRef = useRef(null);
  const phoneCtaRef = useRef(null);
  const phoneUnderlineRef = useRef(null);
  const phoneIconRef = useRef(null);

  // Active step states for re-triggering micro-animations
  const [activeCard, setActiveCard] = useState(-1);
  const [card1Done, setCard1Done] = useState(false);
  const [card2Done, setCard2Done] = useState(false);
  const [card3Done, setCard3Done] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Respect prefers-reduced-motion: reveal static completed states immediately
    if (prefersReducedMotion) {
      if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 1, y: 0 });
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1, y: 0 });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
      if (highlighterRef.current) gsap.set(highlighterRef.current, { scaleX: 1 });
      if (desktopPathRef.current) gsap.set(desktopPathRef.current, { strokeDashoffset: 0 });
      if (desktopGlowPathRef.current) gsap.set(desktopGlowPathRef.current, { strokeDashoffset: 0 });
      if (mobilePathRef.current) gsap.set(mobilePathRef.current, { strokeDashoffset: 0 });
      if (card1Ref.current) gsap.set(card1Ref.current, { opacity: 1, y: 0 });
      if (card2Ref.current) gsap.set(card2Ref.current, { opacity: 1, y: 0 });
      if (card3Ref.current) gsap.set(card3Ref.current, { opacity: 1, y: 0 });
      if (ticketRef.current) gsap.set(ticketRef.current, { opacity: 1, y: 0 });
      if (phoneUnderlineRef.current) gsap.set(phoneUnderlineRef.current, { scaleX: 1 });
      setActiveCard(2);
      setCard1Done(true);
      setCard2Done(true);
      setCard3Done(true);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial State Resets
      gsap.set(badgeRef.current, { opacity: 0, y: 15 });
      gsap.set(headlineRef.current, { opacity: 0, y: 25 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set(highlighterRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        opacity: 0,
        y: 40,
        scale: 0.96,
      });
      gsap.set([desktopTokenRef.current, mobileTokenRef.current], { opacity: 0 });
      if (ticketRef.current) gsap.set(ticketRef.current, { opacity: 0, y: -20, scaleY: 0.8, transformOrigin: 'top center' });
      if (phoneUnderlineRef.current) gsap.set(phoneUnderlineRef.current, { scaleX: 0, transformOrigin: 'left' });

      // Path length calculations
      let desktopTotalLength = 750;
      if (desktopPathRef.current) {
        desktopTotalLength = desktopPathRef.current.getTotalLength() || 750;
        gsap.set([desktopPathRef.current, desktopGlowPathRef.current], {
          strokeDasharray: desktopTotalLength,
          strokeDashoffset: desktopTotalLength,
        });
      }
      if (mobilePathRef.current) {
        gsap.set(mobilePathRef.current, {
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
        });
      }

      // Master Order Journey Timeline (One-time trigger when section scrolls ~35% into view)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ORDER_JOURNEY_CONFIG.triggerStart,
          toggleActions: 'play none none none',
        },
      });

      // ----------------------------------------------------
      // PHASE 1: Section Header Reveal (Snappy & Energetic)
      // ----------------------------------------------------
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }, '-=0.12')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, '-=0.15')
        .to(highlighterRef.current, { scaleX: 1, duration: 0.22, ease: 'power2.inOut' }, '-=0.1');

      // ----------------------------------------------------
      // PHASE 2: Step 1 "Choose Your Food" Arrival
      // ----------------------------------------------------
      const pathProgress = { val: 0 };

      // Helper to position desktop token along SVG path
      const updateDesktopToken = (progressFraction) => {
        if (!desktopPathRef.current || !desktopTokenRef.current) return;
        const pt = desktopPathRef.current.getPointAtLength(progressFraction * desktopTotalLength);
        gsap.set(desktopTokenRef.current, {
          left: `${(pt.x / 1000) * 100}%`,
          top: `${pt.y}px`,
        });
      };

      // Helper to position mobile token along vertical line
      const updateMobileToken = (progressFraction) => {
        if (!mobileTokenRef.current) return;
        gsap.set(mobileTokenRef.current, {
          top: `${progressFraction * 100}%`,
        });
      };

      // Initial placement at Card 1 (progress = 0)
      updateDesktopToken(0);
      updateMobileToken(0.08);

      // Card 1 enters as token appears
      tl.to(card1Ref.current, {
        opacity: 1,
        y: ORDER_JOURNEY_CONFIG.cardActiveLift,
        scale: 1,
        duration: ORDER_JOURNEY_CONFIG.cardEntranceDuration,
        ease: 'power3.out',
        onStart: () => {
          setActiveCard(0);
        },
      }, '+=0.04')
      .to([desktopTokenRef.current, mobileTokenRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.15,
      }, '-=0.2')
      .to(numBadge1Ref.current, {
        scale: 1.25,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power1.out',
      }, '-=0.1')
      .to(ring1Ref.current, {
        scale: 1.12,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: 'power1.out',
      }, '-=0.1');

      // ----------------------------------------------------
      // PHASE 3: Travel to Step 2 "Send on WhatsApp or Call"
      // ----------------------------------------------------
      tl.to(pathProgress, {
        val: 0.5,
        duration: ORDER_JOURNEY_CONFIG.tokenTravelDuration,
        ease: 'power2.inOut',
        onUpdate: () => {
          updateDesktopToken(pathProgress.val);
          updateMobileToken(0.08 + pathProgress.val * 0.84);
          if (desktopPathRef.current) {
            const offset = (1 - pathProgress.val) * desktopTotalLength;
            gsap.set([desktopPathRef.current, desktopGlowPathRef.current], {
              strokeDashoffset: offset,
            });
          }
          if (mobilePathRef.current) {
            gsap.set(mobilePathRef.current, {
              strokeDashoffset: (1 - pathProgress.val) * 1000,
            });
          }
        },
      }, '+=0.08')
      .to(card2Ref.current, {
        opacity: 1,
        y: ORDER_JOURNEY_CONFIG.cardActiveLift,
        scale: 1,
        duration: ORDER_JOURNEY_CONFIG.cardEntranceDuration,
        ease: 'power3.out',
        onStart: () => {
          setActiveCard(1);
          setCard1Done(true);
        },
      }, '-=0.22')
      .to(card1Ref.current, {
        y: 0,
        duration: 0.2,
        ease: 'power1.out',
      }, '-=0.22')
      .to(numBadge2Ref.current, {
        scale: 1.25,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      }, '-=0.1')
      .to(ring2Ref.current, {
        scale: 1.12,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
      }, '-=0.1');

      // ----------------------------------------------------
      // PHASE 4: Travel to Step 3 "Collect Hot or Get Delivery"
      // ----------------------------------------------------
      tl.to(pathProgress, {
        val: 1.0,
        duration: ORDER_JOURNEY_CONFIG.tokenTravelDuration,
        ease: 'power2.inOut',
        onUpdate: () => {
          updateDesktopToken(pathProgress.val);
          updateMobileToken(0.08 + pathProgress.val * 0.84);
          if (desktopPathRef.current) {
            const offset = (1 - pathProgress.val) * desktopTotalLength;
            gsap.set([desktopPathRef.current, desktopGlowPathRef.current], {
              strokeDashoffset: offset,
            });
          }
          if (mobilePathRef.current) {
            gsap.set(mobilePathRef.current, {
              strokeDashoffset: (1 - pathProgress.val) * 1000,
            });
          }
        },
      }, '+=0.08')
      .to(card3Ref.current, {
        opacity: 1,
        y: ORDER_JOURNEY_CONFIG.cardActiveLift,
        scale: 1,
        duration: ORDER_JOURNEY_CONFIG.cardEntranceDuration,
        ease: 'power3.out',
        onStart: () => {
          setActiveCard(2);
          setCard2Done(true);
        },
      }, '-=0.22')
      .to(card2Ref.current, {
        y: 0,
        duration: 0.2,
        ease: 'power1.out',
      }, '-=0.22')
      .to(numBadge3Ref.current, {
        scale: 1.25,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      }, '-=0.1')
      .to(ring3Ref.current, {
        scale: 1.12,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
      }, '-=0.1');

      // ----------------------------------------------------
      // PHASE 5: Bonus B Kitchen Ticket Print & CTA Reveal
      // ----------------------------------------------------
      if (ORDER_JOURNEY_CONFIG.features.enableKitchenTicket && ticketRef.current) {
        tl.to(ticketRef.current, {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.26,
          ease: 'power2.out',
          onStart: () => {
            setCard3Done(true);
          },
        }, '+=0.06')
        // Subtle mechanical paper jitter
        .to(ticketRef.current, {
          x: 1,
          duration: 0.03,
          yoyo: true,
          repeat: 2,
        }, '-=0.1');
      }

      // ----------------------------------------------------
      // PHASE 6: Phone Support CTA Link Attention Effect
      // ----------------------------------------------------
      tl.to(phoneUnderlineRef.current, {
        scaleX: 1,
        duration: 0.22,
        ease: 'power2.out',
      }, '+=0.05')
      .to(phoneIconRef.current, {
        rotation: 12,
        duration: 0.06,
        yoyo: true,
        repeat: 2,
        ease: 'power1.inOut',
      }, '-=0.1');

      // ----------------------------------------------------
      // AMBIENT PULSE LOOP (Runs periodically so section stays alive)
      // ----------------------------------------------------
      if (ORDER_JOURNEY_CONFIG.features.enableEnergyPulse && desktopGlowPathRef.current) {
        const pulseTl = gsap.timeline({
          repeat: -1,
          repeatDelay: ORDER_JOURNEY_CONFIG.energyPulseInterval,
          delay: 5,
        });

        pulseTl.to(desktopGlowPathRef.current, {
          opacity: 0.85,
          strokeWidth: 8,
          duration: 0.8,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      icon: UtensilsCrossed,
      title: "Choose Your Food",
      desc: "Pick your favourite flame-grilled burger, crispy fish & chips, or stack a custom Angus burger with your chosen toppings.",
    },
    {
      num: "02",
      icon: PhoneCall,
      title: "Send on WhatsApp or Call",
      desc: "One tap transmits your cart directly to our kitchen via WhatsApp, or give us a quick buzz on (02) 9677 1188.",
    },
    {
      num: "03",
      icon: ShoppingBag,
      title: "Collect Hot or Get Delivery",
      desc: "Pick it up hot from Shop 2 Popondetta Rd in 15 minutes, or have it delivered via Uber Eats or DoorDash.",
    },
  ];

  return (
    <section
      id="how-to-order"
      ref={sectionRef}
      className={`relative py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-300 ${
        isLight
          ? 'bg-cream text-charcoal border-y border-charcoal/10'
          : 'bg-charcoal text-cream border-t border-cream/10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* ========================================================
            1. SECTION HEADING WITH HIGHLIGHTER SWEEP
            ======================================================== */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          {/* Pill Badge */}
          <div
            ref={badgeRef}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold mb-3 will-change-transform ${
              isLight
                ? 'bg-orange-burnt/10 border border-orange-burnt/25 text-orange-burnt'
                : 'bg-cream/10 border border-cream/20 text-orange-glow'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Fast & Effortless</span>
          </div>

          {/* Mask-Revealed Headline */}
          <h2
            ref={headlineRef}
            className={`text-3xl sm:text-5xl font-serif font-bold mb-4 will-change-transform ${
              isLight ? 'text-charcoal' : 'text-cream'
            }`}
          >
            How to Order
          </h2>

          {/* Subtitle with Orange Marker Underline on "middleman markup" */}
          <p
            ref={subtitleRef}
            className={`text-sm sm:text-base leading-relaxed will-change-transform ${
              isLight ? 'text-charcoal/70' : 'text-cream/70'
            }`}
          >
            Skip the third-party{' '}
            <span className="relative inline-block font-medium text-charcoal">
              middleman markup
              {/* Orange Highlighter Marker Stroke */}
              <span
                ref={highlighterRef}
                className="absolute left-0 bottom-0.5 w-full h-[3px] bg-orange-burnt rounded-full opacity-85 block transform scale-x-0 will-change-transform"
              />
            </span>
            . Enjoy fast pickup or direct local takeaway in three simple steps.
          </p>
        </div>

        {/* ========================================================
            2. ORDER JOURNEY: PATH + TOKEN + 3 CARDS
            ======================================================== */}
        <div className="relative">
          {/* Continuous Connecting Line & Traveling Token */}
          <JourneyPath
            desktopPathRef={desktopPathRef}
            desktopGlowPathRef={desktopGlowPathRef}
            mobilePathRef={mobilePathRef}
            desktopTokenRef={desktopTokenRef}
            mobileTokenRef={mobileTokenRef}
            isLight={isLight}
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <StepCard
                key={step.num}
                step={step}
                index={idx}
                cardRef={idx === 0 ? card1Ref : idx === 1 ? card2Ref : card3Ref}
                iconRingRef={idx === 0 ? ring1Ref : idx === 1 ? ring2Ref : ring3Ref}
                badgeRef={idx === 0 ? numBadge1Ref : idx === 1 ? numBadge2Ref : numBadge3Ref}
                isActive={activeCard === idx}
                isDone={idx === 0 ? card1Done : idx === 1 ? card2Done : card3Done}
                isLight={isLight}
                enableTilt={ORDER_JOURNEY_CONFIG.features.enableCard3DTilt}
              />
            ))}
          </div>

          {/* BONUS B: Thermal Receipt Kitchen Ticket */}
          {ORDER_JOURNEY_CONFIG.features.enableKitchenTicket && (
            <ThermalTicket ticketRef={ticketRef} isLight={isLight} />
          )}
        </div>

        {/* ========================================================
            3. PHONE SUPPORT CTA WITH ANIMATED UNDERLINE & WIGGLE
            ======================================================== */}
        <div className="mt-14 sm:mt-16 text-center">
          <a
            ref={phoneCtaRef}
            href={`tel:${SHOP_INFO.phoneRaw}`}
            className={`group inline-flex items-center gap-2 text-sm transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt rounded ${
              isLight
                ? 'text-charcoal/80 hover:text-orange-burnt'
                : 'text-cream/80 hover:text-orange-glow'
            }`}
          >
            <span ref={phoneIconRef} className="inline-block transition-transform will-change-transform">
              <Phone className="w-4 h-4 text-orange-burnt" />
            </span>
            <span className="relative">
              Need phone support right now? Call (02) 9677 1188
              {/* Dynamic Animated Underline */}
              <span
                ref={phoneUnderlineRef}
                className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-charcoal/40 group-hover:bg-orange-burnt group-hover:h-[2px] transition-all block transform scale-x-0 will-change-transform"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
