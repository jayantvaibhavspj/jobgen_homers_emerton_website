import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSEMBLY_CONFIG } from './burger-assembly/assemblyConfig';
import BurgerAssembly from './burger-assembly/BurgerAssembly';
import CheeseDripDivider from './burger-assembly/CheeseDripDivider';

gsap.registerPlugin(ScrollTrigger);

export default function PlateRise({ theme = 'light' }) {
  const isLight = theme === 'light';

  // Section Refs
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);

  // Left Column (Burger Assembly) Refs
  const containerRef = useRef(null);
  const plateRef = useRef(null);
  const shadowRef = useRef(null);
  const glowRef = useRef(null);
  const layersRef = useRef({});
  const friesBowlRef = useRef(null);
  const fryItemsRef = useRef([]);
  const seasoningRef = useRef(null);
  const realPhotoRef = useRef(null);
  const pillRef = useRef(null);
  const steamRef = useRef(null);
  const crumbRef = useRef(null);
  const flashRef = useRef(null);

  // Right Column (Story Card) Refs
  const contentCardRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const underlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const chipsRef = useRef([]);
  const dividerRef = useRef(null);
  const buttonsRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Mouse Parallax 3D Tilt on Completed Desktop Sequence
  useEffect(() => {
    if (!ASSEMBLY_CONFIG.features.enableMouseTilt) return;
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isTouch) return;

    const el = containerRef.current;
    if (!el) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;
    let raf = null;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      // Only tilt if roughly in viewport
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      const normX = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
      const normY = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));

      targetRotY = normX * ASSEMBLY_CONFIG.features.maxMouseTiltDeg;
      targetRotX = -normY * ASSEMBLY_CONFIG.features.maxMouseTiltDeg;
    };

    const loop = () => {
      curRotX += (targetRotX - curRotX) * 0.08;
      curRotY += (targetRotY - curRotY) * 0.08;

      if (plateRef.current) {
        gsap.set(plateRef.current, {
          rotationX: curRotX,
          rotationY: curRotY,
          transformPerspective: 1000,
        });
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Master ScrollTrigger Timeline Construction
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileCheck = window.innerWidth < 1024;
    setIsMobile(mobileCheck);

    // If reduced motion, jump directly to final completed state
    if (prefersReducedMotion) {
      if (layersRef.current.plateEmpty) gsap.set(layersRef.current.plateEmpty, { opacity: 0 });
      if (realPhotoRef.current) gsap.set(realPhotoRef.current, { opacity: 1 });
      if (pillRef.current) gsap.set(pillRef.current, { opacity: 1 });
      if (shadowRef.current) gsap.set(shadowRef.current, { opacity: 0.5, scale: 1 });
      if (contentCardRef.current) gsap.set(contentCardRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const layers = layersRef.current;
      const fries = fryItemsRef.current;
      const cfg = ASSEMBLY_CONFIG.timeline;

      // ========================================================
      // INITIAL RESET OF ALL LIVE ASSEMBLY PIECES
      // ========================================================
      // Burger layers start high above viewport
      const allBurgerLayers = [
        layers.bunBottom,
        layers.lettuce,
        layers.tomato,
        layers.patty1,
        layers.cheese1,
        layers.bacon,
        layers.patty2,
        layers.cheese2,
        layers.bunTop,
      ].filter(Boolean);

      gsap.set(allBurgerLayers, {
        y: ASSEMBLY_CONFIG.dropDistance,
        opacity: 0,
        transformOrigin: '50% 100%',
      });

      // Sides start tucked / hidden
      if (friesBowlRef.current) gsap.set(friesBowlRef.current, { x: -140, opacity: 0, scale: 0.8 });
      if (layers.lemon) gsap.set(layers.lemon, { y: -260, opacity: 0, rotation: -40 });
      if (layers.parsley) gsap.set(layers.parsley, { y: -240, opacity: 0, rotation: 30 });
      if (seasoningRef.current) gsap.set(seasoningRef.current, { opacity: 0 });
      if (realPhotoRef.current) gsap.set(realPhotoRef.current, { opacity: 0 });
      if (pillRef.current) gsap.set(pillRef.current, { opacity: 0, scale: 0.7 });
      if (steamRef.current) gsap.set(steamRef.current, { opacity: 0, y: 10 });
      if (flashRef.current) gsap.set(flashRef.current, { opacity: 0 });
      if (crumbRef.current) gsap.set(crumbRef.current, { opacity: 0 });

      // Story Card initial states
      if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 0, y: 20 });
      if (headlineLine1Ref.current) gsap.set(headlineLine1Ref.current, { y: '100%', opacity: 0 });
      if (headlineLine2Ref.current) gsap.set(headlineLine2Ref.current, { y: '100%', opacity: 0 });
      if (underlineRef.current) gsap.set(underlineRef.current, { strokeDashoffset: 320 });
      if (paragraphRef.current) gsap.set(paragraphRef.current, { opacity: 0, y: 25 });
      if (chipsRef.current) gsap.set(chipsRef.current, { opacity: 0, scale: 0.85 });
      if (dividerRef.current) gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left' });
      if (buttonsRef.current) gsap.set(buttonsRef.current, { opacity: 0, y: 20 });

      // ========================================================
      // TIMELINE BUILDER (DESKTOP PINNED SCRUB VS MOBILE AUTOPLAY)
      // ========================================================
      let tl;

      if (!mobileCheck) {
        // DESKTOP: Scrubbed timeline pinned for 260vh
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: ASSEMBLY_CONFIG.pinLength,
            pin: true,
            scrub: ASSEMBLY_CONFIG.scrubSmoothness,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      } else {
        // MOBILE: Auto-play trigger once scrolled into view for seamless touch experience
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          duration: ASSEMBLY_CONFIG.mobilePinDuration,
        });
      }

      // --- PHASE 1 (0.00 -> 0.10): Empty Plate & Ambient Atmosphere ---
      tl.fromTo(
        bgTextRef.current,
        { y: 80, opacity: 0.03, scale: 0.9 },
        { y: -100, opacity: 0.08, scale: 1.1, ease: 'none' },
        0
      );

      tl.fromTo(
        plateRef.current,
        { y: 200, rotation: -6, scale: 0.85, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        cfg.plateEnter[0]
      );

      tl.fromTo(
        shadowRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 0.5, ease: 'power2.out' },
        cfg.plateEnter[0]
      );

      tl.fromTo(
        glowRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 0.7, ease: 'power2.out' },
        cfg.plateEnter[0]
      );

      // --- PHASE 2 (0.10 -> 0.63): Burger Layers Drop Sequential ---
      // 1. Bottom Bun
      if (layers.bunBottom) {
        tl.fromTo(
          layers.bunBottom,
          { y: -700, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
          cfg.bunBottom[0]
        )
        .to(layers.bunBottom, { scaleY: 0.92, scaleX: 1.04, duration: 0.02 }, cfg.bunBottom[1] - 0.03)
        .to(layers.bunBottom, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.bunBottom[1] - 0.01)
        .to(plateRef.current, { y: 2, rotation: 0.3, duration: 0.02, yoyo: true, repeat: 1 }, cfg.bunBottom[1] - 0.02);
      }

      // 2. Crisp Lettuce & Sauce
      if (layers.lettuce) {
        tl.fromTo(
          layers.lettuce,
          { y: -700, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
          cfg.lettuce[0]
        )
        .to(layers.lettuce, { scaleY: 0.94, scaleX: 1.03, duration: 0.02 }, cfg.lettuce[1] - 0.02)
        .to(layers.lettuce, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.lettuce[1]);
      }

      // 3. Tomato, Onion & Pickle
      if (layers.tomato) {
        tl.fromTo(
          layers.tomato,
          { y: -700, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
          cfg.tomatoPickle[0]
        )
        .to(layers.tomato, { scaleY: 0.93, scaleX: 1.04, duration: 0.02 }, cfg.tomatoPickle[1] - 0.02)
        .to(layers.tomato, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.tomatoPickle[1]);
      }

      // 4. Flame-Grilled Angus Patty 1
      if (layers.patty1) {
        tl.fromTo(
          layers.patty1,
          { y: -700, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
          cfg.patty1[0]
        )
        .to(layers.patty1, { scaleY: 0.90, scaleX: 1.05, duration: 0.02 }, cfg.patty1[1] - 0.03)
        .to([layers.bunBottom, layers.lettuce, layers.tomato].filter(Boolean), { y: '+=3px', duration: 0.02, yoyo: true, repeat: 1 }, cfg.patty1[1] - 0.03)
        .to(layers.patty1, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.patty1[1]);
      }

      // 5. Melted Cheddar Cheese Slump 1
      if (layers.cheese1) {
        tl.fromTo(
          layers.cheese1,
          { y: -700, opacity: 0, scaleY: 0.7 },
          { y: 0, opacity: 1, scaleY: 1.05, ease: 'power1.in', duration: 0.05 },
          cfg.cheese1[0]
        )
        .fromTo(
          '#cheese-body-layer-1',
          { scaleY: 0.8, transformOrigin: '50% 0%' },
          { scaleY: 1.15, duration: 0.04, ease: 'power2.out' },
          cfg.cheese1[0] + 0.02
        );
      }

      // 6. Crispy Woodfired Bacon Strips
      if (layers.bacon) {
        tl.fromTo(
          layers.bacon,
          { y: -700, opacity: 0, rotation: -8 },
          { y: 0, opacity: 1, rotation: 0, ease: 'power2.in', duration: 0.05 },
          cfg.bacon[0]
        )
        .to(layers.bacon, { x: 2, duration: 0.01, yoyo: true, repeat: 3 }, cfg.bacon[1] - 0.03);
      }

      // 7. Flame-Grilled Angus Patty 2
      if (layers.patty2) {
        tl.fromTo(
          layers.patty2,
          { y: -700, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
          cfg.patty2[0]
        )
        .to(layers.patty2, { scaleY: 0.90, scaleX: 1.05, duration: 0.02 }, cfg.patty2[1] - 0.03)
        .to(layers.patty2, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.patty2[1]);
      }

      // 8. Melted Cheddar Cheese Slump 2
      if (layers.cheese2) {
        tl.fromTo(
          layers.cheese2,
          { y: -700, opacity: 0, scaleY: 0.7 },
          { y: 0, opacity: 1, scaleY: 1.05, ease: 'power1.in', duration: 0.05 },
          cfg.cheese2[0]
        )
        .fromTo(
          '#cheese-body-layer-2',
          { scaleY: 0.8, transformOrigin: '50% 0%' },
          { scaleY: 1.15, duration: 0.04, ease: 'power2.out' },
          cfg.cheese2[0] + 0.02
        );
      }

      // 9. Top Sesame Bun (The Grand Finale)
      if (layers.bunTop) {
        tl.fromTo(
          layers.bunTop,
          { y: -750, opacity: 0, scaleY: 1.2 },
          { y: 0, opacity: 1, scaleY: 1, ease: 'power2.in', duration: 0.05 },
          cfg.bunTop[0]
        )
        .to(layers.bunTop, { scaleY: ASSEMBLY_CONFIG.physics.topBunSquashY, scaleX: 1.07, duration: 0.02 }, cfg.bunTop[1] - 0.03)
        .to(layers.bunTop, { scaleY: ASSEMBLY_CONFIG.physics.topBunStretchY, scaleX: 0.97, duration: 0.02 }, cfg.bunTop[1] - 0.01)
        .to(layers.bunTop, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.bunTop[1])
        .fromTo(
          crumbRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1.3, duration: 0.02, yoyo: true, repeat: 1 },
          cfg.bunTop[1] - 0.02
        );
      }

      // --- PHASE 3 (0.63 -> 0.78): Sides (Fries Pour, Lemon & Seasoning Rain) ---
      // Bowl slides in from left
      if (friesBowlRef.current) {
        tl.fromTo(
          friesBowlRef.current,
          { x: -140, opacity: 0, scale: 0.8 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.05 },
          cfg.friesPour[0]
        );
      }

      // Cascading 12 golden fries into the bowl
      const activeFries = fries.filter(Boolean);
      if (activeFries.length > 0) {
        tl.fromTo(
          activeFries,
          { y: -350, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            rotation: (i) => [-15, 8, -6, 18, -25, -4, 12, 22, -12, 4, 15, 0][i % 12],
            stagger: 0.007,
            ease: 'bounce.out',
            duration: 0.05,
          },
          cfg.friesPour[0] + 0.02
        );
      }

      // Lemon wedge drop with juicy bounce
      if (layers.lemon) {
        tl.fromTo(
          layers.lemon,
          { y: -300, opacity: 0, rotation: -40 },
          { y: 0, opacity: 1, rotation: 0, ease: 'bounce.out', duration: 0.05 },
          cfg.lemonParsley[0]
        );
      }

      // Parsley sprig flutter
      if (layers.parsley) {
        tl.fromTo(
          layers.parsley,
          { y: -260, opacity: 0, rotation: 30 },
          { y: 0, opacity: 1, rotation: 0, ease: 'power2.out', duration: 0.05 },
          cfg.lemonParsley[0] + 0.02
        );
      }

      // Chicken Salt specks rain
      if (seasoningRef.current) {
        tl.to(seasoningRef.current, { opacity: 1, duration: 0.01 }, cfg.chickenSalt[0])
          .to(
            '.chicken-salt-speck',
            {
              y: 0,
              scale: 1,
              stagger: 0.0015,
              ease: 'power2.in',
            },
            cfg.chickenSalt[0]
          )
          .to('.chicken-salt-speck', { opacity: 0.35, duration: 0.02 }, cfg.chickenSalt[1]);
      }

      // --- PHASE 4 (0.78 -> 0.85): Crossfade to Real Photo & Heat Bloom ---
      if (realPhotoRef.current) {
        // Soft warm flash
        if (flashRef.current) {
          tl.to(
            flashRef.current,
            { opacity: 0.75, duration: 0.03, yoyo: true, repeat: 1 },
            cfg.crossfade[0]
          );
        }

        // Real plate.png fades in over assembled components
        tl.to(
          realPhotoRef.current,
          { opacity: 1, duration: 0.06, ease: 'power1.inOut' },
          cfg.crossfade[0]
        );

        // Hide loose assembled layers and empty vector plate beneath
        tl.to(
          [layers.plateEmpty, ...allBurgerLayers, friesBowlRef.current, ...activeFries, layers.lemon, layers.parsley, seasoningRef.current].filter(Boolean),
          { opacity: 0, duration: 0.04 },
          cfg.crossfade[0] + 0.04
        );

        // Rising steam wisps
        if (steamRef.current) {
          tl.to(
            steamRef.current,
            { opacity: 1, y: -20, duration: 0.05, ease: 'power1.out' },
            cfg.crossfade[0] + 0.02
          );
        }

        // Floating pill pops in with spring overshoot
        if (pillRef.current) {
          tl.to(
            pillRef.current,
            { opacity: 1, scale: 1, duration: 0.05, ease: 'back.out(2)' },
            cfg.crossfade[1] - 0.02
          );
        }
      }

      // --- PHASE 5 (0.80 -> 1.00): Right Column Story Card Reveal ---
      // 1. Crown Jewel Badge
      if (badgeRef.current) {
        tl.to(
          badgeRef.current,
          { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
          cfg.textReveal[0]
        );
      }

      // 2. Headline Line 1 & Line 2 Mask Reveal
      if (headlineLine1Ref.current && headlineLine2Ref.current) {
        tl.to(
          headlineLine1Ref.current,
          { y: '0%', opacity: 1, duration: 0.05, ease: 'power3.out' },
          cfg.textReveal[0] + 0.02
        );
        tl.to(
          headlineLine2Ref.current,
          { y: '0%', opacity: 1, duration: 0.05, ease: 'power3.out' },
          cfg.textReveal[0] + 0.04
        );
      }

      // 3. Bonus A: "Branded by Fire" heat bloom cooling on "Golden Perfection."
      if (ASSEMBLY_CONFIG.features.enableBrandedByFire && headlineLine2Ref.current) {
        tl.fromTo(
          headlineLine2Ref.current,
          {
            textShadow: '0 0 25px rgba(255,255,255,0.9), 0 0 45px rgba(249,115,22,0.85), 0 0 70px rgba(232,112,10,0.6)',
            color: '#ffffff',
          },
          {
            textShadow: '0 0 0px rgba(0,0,0,0)',
            color: isLight ? '#17110d' : '#fbf6f0',
            duration: 0.08,
            ease: 'power2.out',
          },
          cfg.textReveal[0] + 0.04
        );
      }

      // 4. Hand-drawn Orange Underline
      if (underlineRef.current) {
        tl.to(
          underlineRef.current,
          { strokeDashoffset: 0, duration: 0.06, ease: 'power2.out' },
          cfg.textReveal[0] + 0.06
        );
      }

      // 5. Paragraph
      if (paragraphRef.current) {
        tl.to(
          paragraphRef.current,
          { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
          cfg.textReveal[0] + 0.08
        );
      }

      // 6. Highlight Chips Pop-In
      const chips = chipsRef.current.filter(Boolean);
      if (chips.length > 0) {
        tl.to(
          chips,
          { opacity: 1, scale: 1, stagger: 0.015, duration: 0.03, ease: 'back.out(1.5)' },
          cfg.textReveal[0] + 0.10
        );
      }

      // 7. Divider Line
      if (dividerRef.current) {
        tl.to(
          dividerRef.current,
          { scaleX: 1, duration: 0.04, ease: 'power2.out' },
          cfg.textReveal[0] + 0.12
        );
      }

      // 8. CTAs
      if (buttonsRef.current) {
        tl.to(
          buttonsRef.current,
          { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
          cfg.textReveal[0] + 0.14
        );
      }
    }, sectionRef.current);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [isLight]);

  return (
    <section
      id="plate-rise"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4 transition-colors duration-300 ${
        isLight
          ? 'bg-cream text-charcoal border-y border-charcoal/10'
          : 'bg-charcoal-50 text-cream border-t border-cream/10'
      }`}
    >
      {/* BONUS B: CHEESE DRIP SECTION DIVIDER */}
      {ASSEMBLY_CONFIG.features.enableCheeseDripTransition && <CheeseDripDivider />}

      {/* HUGE FADED WORD "HOMERS" BEHIND (PARALLAX) */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-serif font-bold text-[18vw] leading-none whitespace-nowrap tracking-wider ${
          isLight ? 'text-charcoal/5' : 'text-cream/5'
        }`}
      >
        HOMERS
      </div>

      {/* AMBIENT RADIAL WARMTH GLOW */}
      <div
        className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isLight ? 'bg-orange-burnt/10' : 'bg-orange-burnt/15'
        }`}
      />

      {/* MAIN CONTAINER: TWO COLUMN LAYOUT (BURGER ASSEMBLY + STORY CARD) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: LIVE BURGER ASSEMBLY STAGE */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <BurgerAssembly
            containerRef={containerRef}
            plateRef={plateRef}
            shadowRef={shadowRef}
            glowRef={glowRef}
            layersRef={layersRef}
            friesBowlRef={friesBowlRef}
            fryItemsRef={fryItemsRef}
            seasoningRef={seasoningRef}
            realPhotoRef={realPhotoRef}
            pillRef={pillRef}
            steamRef={steamRef}
            crumbRef={crumbRef}
            flashRef={flashRef}
          />
        </div>

        {/* RIGHT COLUMN: STORY CARD & CTAS (TIMELINE REVEAL) */}
        <div
          ref={contentCardRef}
          className="lg:col-span-5 flex flex-col items-start text-left z-20"
        >
          {/* Crown Jewel Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-burnt/15 border border-orange-burnt/30 text-orange-burnt text-xs font-semibold uppercase tracking-wider mb-3 will-change-transform"
          >
            <Star className="w-3.5 h-3.5 fill-orange-burnt text-orange-burnt" />
            <span>The Emerton Crown Jewel</span>
          </div>

          {/* Masked Headline with Branded-by-fire & Hand-Drawn Underline */}
          <h2
            className={`text-3xl sm:text-5xl font-serif font-bold leading-tight mb-4 ${
              isLight ? 'text-charcoal' : 'text-cream'
            }`}
          >
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine1Ref} className="block will-change-transform">
                Flame-Grilled to
              </span>
            </span>
            <span className="block overflow-hidden pb-1 relative inline-block">
              <span
                ref={headlineLine2Ref}
                className="block will-change-transform text-orange-burnt font-serif"
              >
                Golden Perfection.
              </span>
              {/* Hand-drawn energetic curved underline */}
              <svg
                viewBox="0 0 320 20"
                className="absolute -bottom-1 left-0 w-full h-4 overflow-visible pointer-events-none"
                fill="none"
              >
                <path
                  ref={underlineRef}
                  d="M 5 12 Q 90 2, 180 10 Q 260 16, 315 8"
                  stroke="#e8700a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="320"
                  strokeDashoffset="320"
                />
              </svg>
            </span>
          </h2>

          {/* Description Paragraph */}
          <p
            ref={paragraphRef}
            className={`text-sm sm:text-base leading-relaxed mb-6 will-change-transform ${
              isLight ? 'text-charcoal/75' : 'text-cream/80'
            }`}
          >
            Every morning our kitchen grinds 100% grass-fed Angus beef and hand-cuts daily potatoes.
            Sizzling hot off the open flame with double melted American cheddar, crispy woodfired bacon,
            and our famous secret chicken salt seasoning.
          </p>

          {/* Highlight Chips */}
          <div
            className={`flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-8 pb-6 border-b w-full ${
              isLight ? 'text-charcoal/70 border-charcoal/15' : 'text-cream/70 border-cream/10'
            }`}
          >
            <span
              ref={(el) => (chipsRef.current[0] = el)}
              className={`font-semibold ${isLight ? 'text-charcoal' : 'text-cream'} will-change-transform`}
            >
              🔥 100% Open Flame
            </span>
            <span>•</span>
            <span
              ref={(el) => (chipsRef.current[1] = el)}
              className={`font-semibold ${isLight ? 'text-charcoal' : 'text-cream'} will-change-transform`}
            >
              🥔 Secret Chicken Salt
            </span>
            <span>•</span>
            <span
              ref={(el) => (chipsRef.current[2] = el)}
              className={`font-semibold ${isLight ? 'text-charcoal' : 'text-cream'} will-change-transform`}
            >
              🇦🇺 Australian Raised
            </span>
          </div>

          {/* Horizontal Decorative Divider Line */}
          <div
            ref={dividerRef}
            className={`w-full h-px mb-6 ${isLight ? 'bg-charcoal/15' : 'bg-cream/15'} will-change-transform`}
          />

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex items-center gap-4 will-change-transform">
            <Link
              to="/burger-builder"
              className="px-6 py-3 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-semibold text-sm shadow-warm hover:shadow-glow-orange transition-all active:scale-95"
            >
              Build your own burger
            </Link>
            <Link
              to="/menu"
              className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${
                isLight
                  ? 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal border-charcoal/20'
                  : 'bg-cream/10 hover:bg-cream/20 text-cream border-cream/20'
              }`}
            >
              See full menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
