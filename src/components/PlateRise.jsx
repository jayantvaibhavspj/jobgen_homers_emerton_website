import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Sparkles, Utensils, Flame, Fish, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSEMBLY_CONFIG } from './burger-assembly/assemblyConfig';
import { FOOD_CATEGORIES } from './burger-assembly/categoriesConfig';
import FoodAssemblyStage from './burger-assembly/FoodAssemblyStage';
import CheeseDripDivider from './burger-assembly/CheeseDripDivider';

gsap.registerPlugin(ScrollTrigger);

export default function PlateRise({ theme = 'light' }) {
  const isLight = theme === 'light';

  // ========================================================
  // ROTATION ON EACH PAGE VISIT / RELOAD
  // Requirement:
  // 1. Initial visit MUST start with Fish & Chips (index 0)
  // 2. Each subsequent visit / reload rotates to the next category
  // 3. User can also click category pills to toggle manually
  // ========================================================
  const [categoryIndex, setCategoryIndex] = useState(() => {
    try {
      const hasVisited = sessionStorage.getItem('homers_has_visited_plate');
      const storedIdx = sessionStorage.getItem('homers_plate_cat_idx');

      if (!hasVisited || storedIdx === null) {
        // First time visitor on this page -> MUST start with Fish & Chips (index 0)
        sessionStorage.setItem('homers_has_visited_plate', 'true');
        sessionStorage.setItem('homers_plate_cat_idx', '0');
        return 0; // fish-chips
      }

      // Next reload / visit -> Advance to next category in cycle
      const prevIdx = parseInt(storedIdx, 10);
      const nextIdx = Number.isNaN(prevIdx) ? 0 : (prevIdx + 1) % FOOD_CATEGORIES.length;
      sessionStorage.setItem('homers_plate_cat_idx', nextIdx.toString());
      return nextIdx;
    } catch (e) {
      return 0; // Guaranteed fallback to fish-chips
    }
  });

  const activeCategory = FOOD_CATEGORIES[categoryIndex] || FOOD_CATEGORIES[0];

  const handleSelectCategory = (idx) => {
    setCategoryIndex(idx);
    try {
      sessionStorage.setItem('homers_plate_cat_idx', idx.toString());
    } catch (e) {}

    // Smoothly scroll to start of plate showcase so user experiences the full food assembly
    if (sectionRef.current) {
      const topPos = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  // Section Refs & Auto-Switch Tracking
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const hasEnteredSectionRef = useRef(false);
  const lastSwitchTimeRef = useRef(0);

  // Left Column (Food Assembly) Refs
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
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

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
  }, [categoryIndex]);

  // Master ScrollTrigger Timeline Construction (Re-runs when category changes)
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
      const currentCatId = activeCategory.id;

      // ========================================================
      // INITIAL RESET OF ALL LIVE ASSEMBLY PIECES
      // ========================================================
      const allPossibleLayers = [
        // Fish & Chips
        layers.deliPaper,
        layers.chipsPile,
        layers.fillet1,
        layers.fillet2,
        layers.calamari,
        layers.tartare,
        // Burgers
        layers.bunBottom,
        layers.lettuce,
        layers.tomato,
        layers.patty1,
        layers.cheese1,
        layers.bacon,
        layers.patty2,
        layers.cheese2,
        layers.bunTop,
        // Hot Roasts
        layers.roastPotatoes,
        layers.roastPumpkin,
        layers.gardenPeas,
        layers.roastMeat,
        layers.panGravy,
        layers.rosemary,
        // Curries
        layers.curryBowl,
        layers.creamSwirl,
        layers.basmatiRice,
        layers.garlicNaan,
        layers.coriander,
        // Charcoal Chicken
        layers.chickenHalf,
        layers.garlicToum,
        // Common sides
        layers.lemon,
        layers.parsley,
      ].filter(Boolean);

      gsap.set(allPossibleLayers, {
        y: ASSEMBLY_CONFIG.dropDistance,
        opacity: 0,
        transformOrigin: '50% 100%',
      });

      // Reset Sides / Overlays
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
      if (chipsRef.current) gsap.set(chipsRef.current.filter(Boolean), { opacity: 0, scale: 0.85 });
      if (dividerRef.current) gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left' });
      if (buttonsRef.current) gsap.set(buttonsRef.current, { opacity: 0, y: 20 });

      // ========================================================
      // TIMELINE BUILDER (DESKTOP PINNED SCRUB VS MOBILE AUTOPLAY)
      // ========================================================
      let tl;

      if (!mobileCheck) {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: ASSEMBLY_CONFIG.pinLength,
            pin: true,
            scrub: ASSEMBLY_CONFIG.scrubSmoothness,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              hasEnteredSectionRef.current = true;
            },
            onLeaveBack: () => {
              // User has scrolled back up out of the section into the Hero section!
              // As they scrolled up, the food has smoothly de-assembled ("deere deere gayab hota").
              // Now advance to the next category so scrolling down shows the next food!
              const now = Date.now();
              if (hasEnteredSectionRef.current && now - lastSwitchTimeRef.current > 400) {
                lastSwitchTimeRef.current = now;
                hasEnteredSectionRef.current = false;
                setCategoryIndex((prev) => {
                  const next = (prev + 1) % FOOD_CATEGORIES.length;
                  try {
                    sessionStorage.setItem('homers_plate_cat_idx', next.toString());
                  } catch (e) {}
                  return next;
                });
              }
            },
          },
        });
      } else {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              hasEnteredSectionRef.current = true;
            },
            onLeaveBack: () => {
              const now = Date.now();
              if (hasEnteredSectionRef.current && now - lastSwitchTimeRef.current > 400) {
                lastSwitchTimeRef.current = now;
                hasEnteredSectionRef.current = false;
                setCategoryIndex((prev) => {
                  const next = (prev + 1) % FOOD_CATEGORIES.length;
                  try {
                    sessionStorage.setItem('homers_plate_cat_idx', next.toString());
                  } catch (e) {}
                  return next;
                });
              }
            },
          },
          duration: ASSEMBLY_CONFIG.mobilePinDuration,
        });
      }

      // --- PHASE 1 (0.00 -> 0.10): Empty Plate & Atmosphere ---
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
        0.00
      );

      tl.fromTo(
        shadowRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 0.5, ease: 'power2.out' },
        0.00
      );

      tl.fromTo(
        glowRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 0.7, ease: 'power2.out' },
        0.00
      );

      // Story Card Graceful Entrance (0.02 -> 0.12)
      if (badgeRef.current) {
        tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.02);
      }
      if (headlineLine1Ref.current) {
        tl.to(headlineLine1Ref.current, { y: '0%', opacity: 1, duration: 0.04, ease: 'power3.out' }, 0.03);
      }
      if (headlineLine2Ref.current) {
        tl.to(headlineLine2Ref.current, { y: '0%', opacity: 1, duration: 0.04, ease: 'power3.out' }, 0.05);
      }
      if (underlineRef.current) {
        tl.to(underlineRef.current, { strokeDashoffset: 0, duration: 0.06, ease: 'power2.out' }, 0.06);
      }
      if (paragraphRef.current) {
        tl.to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.07);
      }
      const chips = chipsRef.current.filter(Boolean);
      if (chips.length > 0) {
        tl.to(chips, { opacity: 1, scale: 1, stagger: 0.01, duration: 0.04, ease: 'back.out(1.5)' }, 0.08);
      }
      if (dividerRef.current) {
        tl.to(dividerRef.current, { scaleX: 1, duration: 0.04, ease: 'power2.out' }, 0.10);
      }
      if (buttonsRef.current) {
        tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.11);
      }

      // --- PHASE 2 (0.10 -> 0.78): Sequential Food Ingredients Drop ---

      // 1. FISH & CHIPS SEQUENCE
      if (currentCatId === 'fish-chips') {
        // Deli Paper floats down onto plate
        if (layers.deliPaper) {
          tl.fromTo(
            layers.deliPaper,
            { y: -500, opacity: 0, rotation: -12, scale: 0.9 },
            { y: 0, opacity: 1, rotation: 0, scale: 1, ease: 'power1.out', duration: 0.07 },
            0.10
          );
        }

        // Mountain of Golden Chips drops
        if (layers.chipsPile) {
          tl.fromTo(
            layers.chipsPile,
            { y: -650, opacity: 0, scaleY: 1.15 },
            { y: 0, opacity: 1, scaleY: 1, ease: 'bounce.out', duration: 0.08 },
            0.17
          );
        }

        // Crumbed Fish Fillet 1 (The main hero piece)
        if (layers.fillet1) {
          tl.fromTo(
            layers.fillet1,
            { y: -720, opacity: 0, scaleY: 1.2 },
            { y: 0, opacity: 1, scaleY: 1, ease: 'power2.in', duration: 0.06 },
            0.26
          )
          .to(layers.fillet1, { scaleY: 0.92, scaleX: 1.05, duration: 0.02 }, 0.32)
          .to(layers.fillet1, { scaleY: 1, scaleX: 1, duration: 0.02 }, 0.34);
        }

        // Crumbed Fish Fillet 2 (Overlapping second piece)
        if (layers.fillet2) {
          tl.fromTo(
            layers.fillet2,
            { y: -720, opacity: 0, scaleY: 1.2, rotation: 0 },
            { y: 0, opacity: 1, scaleY: 1, rotation: 14, ease: 'power2.in', duration: 0.06 },
            0.36
          )
          .to(layers.fillet2, { scaleY: 0.93, scaleX: 1.04, duration: 0.02 }, 0.42)
          .to(layers.fillet2, { scaleY: 1, scaleX: 1, duration: 0.02 }, 0.44);
        }

        // Golden Calamari Ring
        if (layers.calamari) {
          tl.fromTo(
            layers.calamari,
            { y: -500, opacity: 0, rotation: -45 },
            { y: 0, opacity: 1, rotation: 0, ease: 'bounce.out', duration: 0.06 },
            0.46
          );
        }

        // House Tartare Pot
        if (layers.tartare) {
          tl.fromTo(
            layers.tartare,
            { y: -550, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.06 },
            0.53
          );
        }

        // Juicy Lemon Wedge
        if (layers.lemon) {
          tl.fromTo(
            layers.lemon,
            { y: -350, opacity: 0, rotation: -40 },
            { y: 0, opacity: 1, rotation: 0, ease: 'bounce.out', duration: 0.06 },
            0.60
          );
        }

        // Parsley Sprig
        if (layers.parsley) {
          tl.fromTo(
            layers.parsley,
            { y: -260, opacity: 0, rotation: 30 },
            { y: 0, opacity: 1, rotation: 0, ease: 'power2.out', duration: 0.05 },
            0.66
          );
        }

        // Secret Chicken Salt Rain
        if (seasoningRef.current) {
          tl.to(seasoningRef.current, { opacity: 1, duration: 0.01 }, 0.70)
            .to(
              '.chicken-salt-speck',
              { y: 0, scale: 1, stagger: 0.0015, ease: 'power2.in' },
              0.70
            )
            .to('.chicken-salt-speck', { opacity: 0.35, duration: 0.02 }, 0.77);
        }
      }

      // 2. FLAME-GRILLED BURGERS SEQUENCE
      else if (currentCatId === 'burgers') {
        const cfg = ASSEMBLY_CONFIG.timeline;

        // Bottom Bun
        if (layers.bunBottom) {
          tl.fromTo(
            layers.bunBottom,
            { y: -700, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
            cfg.bunBottom[0]
          )
          .to(layers.bunBottom, { scaleY: 0.92, scaleX: 1.04, duration: 0.02 }, cfg.bunBottom[1] - 0.03)
          .to(layers.bunBottom, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.bunBottom[1] - 0.01);
        }

        // Lettuce & Sauce
        if (layers.lettuce) {
          tl.fromTo(
            layers.lettuce,
            { y: -700, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
            cfg.lettuce[0]
          );
        }

        // Tomato & Pickle
        if (layers.tomato) {
          tl.fromTo(
            layers.tomato,
            { y: -700, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
            cfg.tomatoPickle[0]
          );
        }

        // Patty 1
        if (layers.patty1) {
          tl.fromTo(
            layers.patty1,
            { y: -700, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
            cfg.patty1[0]
          )
          .to(layers.patty1, { scaleY: 0.90, scaleX: 1.05, duration: 0.02 }, cfg.patty1[1] - 0.03)
          .to(layers.patty1, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.patty1[1]);
        }

        // Cheese 1
        if (layers.cheese1) {
          tl.fromTo(
            layers.cheese1,
            { y: -700, opacity: 0, scaleY: 0.7 },
            { y: 0, opacity: 1, scaleY: 1.05, ease: 'power1.in', duration: 0.05 },
            cfg.cheese1[0]
          );
        }

        // Bacon
        if (layers.bacon) {
          tl.fromTo(
            layers.bacon,
            { y: -700, opacity: 0, rotation: -8 },
            { y: 0, opacity: 1, rotation: 0, ease: 'power2.in', duration: 0.05 },
            cfg.bacon[0]
          );
        }

        // Patty 2
        if (layers.patty2) {
          tl.fromTo(
            layers.patty2,
            { y: -700, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.in', duration: 0.05 },
            cfg.patty2[0]
          );
        }

        // Cheese 2
        if (layers.cheese2) {
          tl.fromTo(
            layers.cheese2,
            { y: -700, opacity: 0, scaleY: 0.7 },
            { y: 0, opacity: 1, scaleY: 1.05, ease: 'power1.in', duration: 0.05 },
            cfg.cheese2[0]
          );
        }

        // Top Bun
        if (layers.bunTop) {
          tl.fromTo(
            layers.bunTop,
            { y: -750, opacity: 0, scaleY: 1.2 },
            { y: 0, opacity: 1, scaleY: 1, ease: 'power2.in', duration: 0.05 },
            cfg.bunTop[0]
          )
          .to(layers.bunTop, { scaleY: 0.88, scaleX: 1.07, duration: 0.02 }, cfg.bunTop[1] - 0.03)
          .to(layers.bunTop, { scaleY: 1, scaleX: 1, duration: 0.02 }, cfg.bunTop[1]);
        }

        // Fries Bowl
        if (friesBowlRef.current) {
          tl.fromTo(
            friesBowlRef.current,
            { x: -140, opacity: 0, scale: 0.8 },
            { x: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.05 },
            cfg.friesPour[0]
          );
        }

        // Cascading Fries
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

        if (layers.lemon) {
          tl.fromTo(layers.lemon, { y: -300, opacity: 0 }, { y: 0, opacity: 1, ease: 'bounce.out', duration: 0.05 }, cfg.lemonParsley[0]);
        }
        if (layers.parsley) {
          tl.fromTo(layers.parsley, { y: -260, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.05 }, cfg.lemonParsley[0] + 0.02);
        }

        // Seasoning
        if (seasoningRef.current) {
          tl.to(seasoningRef.current, { opacity: 1, duration: 0.01 }, cfg.chickenSalt[0])
            .to('.chicken-salt-speck', { y: 0, scale: 1, stagger: 0.0015, ease: 'power2.in' }, cfg.chickenSalt[0])
            .to('.chicken-salt-speck', { opacity: 0.35, duration: 0.02 }, cfg.chickenSalt[1]);
        }
      }

      // 3. HOT ROASTS & CARVERY SEQUENCE
      else if (currentCatId === 'hot-roasts') {
        // Roast Potatoes
        if (layers.roastPotatoes) {
          tl.fromTo(
            layers.roastPotatoes,
            { y: -650, opacity: 0 },
            { y: 0, opacity: 1, ease: 'bounce.out', duration: 0.08 },
            0.12
          );
        }

        // Sweet Roast Pumpkin
        if (layers.roastPumpkin) {
          tl.fromTo(
            layers.roastPumpkin,
            { y: -600, opacity: 0, rotation: -20 },
            { y: 0, opacity: 1, rotation: 0, ease: 'bounce.out', duration: 0.08 },
            0.22
          );
        }

        // Garden Peas
        if (layers.gardenPeas) {
          tl.fromTo(
            layers.gardenPeas,
            { y: -500, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.06 },
            0.32
          );
        }

        // Succulent Roast Carved Meat
        if (layers.roastMeat) {
          tl.fromTo(
            layers.roastMeat,
            { y: -720, opacity: 0, scaleY: 1.15 },
            { y: 0, opacity: 1, scaleY: 1, ease: 'power2.in', duration: 0.07 },
            0.40
          )
          .to(layers.roastMeat, { scaleY: 0.92, scaleX: 1.05, duration: 0.02 }, 0.47)
          .to(layers.roastMeat, { scaleY: 1, scaleX: 1, duration: 0.02 }, 0.49);
        }

        // Rich Pan Gravy Pour Stream & Pool
        if (layers.panGravy) {
          tl.fromTo(
            layers.panGravy,
            { y: -550, opacity: 0, scaleY: 0.6 },
            { y: 0, opacity: 1, scaleY: 1, ease: 'power1.out', duration: 0.08 },
            0.52
          );
        }

        // Rosemary Sprig
        if (layers.rosemary) {
          tl.fromTo(
            layers.rosemary,
            { y: -300, opacity: 0, rotation: 35 },
            { y: 0, opacity: 1, rotation: 0, ease: 'power2.out', duration: 0.06 },
            0.62
          );
        }

        // Salt & Pepper Rain
        if (seasoningRef.current) {
          tl.to(seasoningRef.current, { opacity: 1, duration: 0.01 }, 0.70)
            .to('.chicken-salt-speck', { y: 0, scale: 1, stagger: 0.0015, ease: 'power2.in' }, 0.70)
            .to('.chicken-salt-speck', { opacity: 0.35, duration: 0.02 }, 0.77);
        }
      }

      // 4. AROMATIC CURRIES SEQUENCE
      else if (currentCatId === 'curries') {
        // Deep Curry Bowl with Butter Chicken
        if (layers.curryBowl) {
          tl.fromTo(
            layers.curryBowl,
            { y: -650, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.08 },
            0.12
          );
        }

        // Cream Swirl & Fenugreek
        if (layers.creamSwirl) {
          tl.fromTo(
            layers.creamSwirl,
            { scale: 0.2, opacity: 0, rotation: -90 },
            { scale: 1, opacity: 1, rotation: 0, ease: 'power2.out', duration: 0.08 },
            0.22
          );
        }

        // Fluffy Basmati Rice Bowl
        if (layers.basmatiRice) {
          tl.fromTo(
            layers.basmatiRice,
            { y: -600, opacity: 0, rotation: 15 },
            { y: 0, opacity: 1, rotation: 0, ease: 'bounce.out', duration: 0.08 },
            0.32
          );
        }

        // Warm Garlic Naan
        if (layers.garlicNaan) {
          tl.fromTo(
            layers.garlicNaan,
            { y: -700, opacity: 0, rotation: -25, scale: 1.1 },
            { y: 0, opacity: 1, rotation: -8, scale: 1, ease: 'power2.in', duration: 0.07 },
            0.44
          )
          .to(layers.garlicNaan, { scaleY: 0.93, scaleX: 1.05, duration: 0.02 }, 0.51)
          .to(layers.garlicNaan, { scaleY: 1, scaleX: 1, duration: 0.02 }, 0.53);
        }

        // Coriander Garnish
        if (layers.coriander) {
          tl.fromTo(
            layers.coriander,
            { y: -300, opacity: 0, rotation: 30 },
            { y: 0, opacity: 1, rotation: 0, ease: 'power2.out', duration: 0.06 },
            0.62
          );
        }

        // Spice Rain
        if (seasoningRef.current) {
          tl.to(seasoningRef.current, { opacity: 1, duration: 0.01 }, 0.70)
            .to('.chicken-salt-speck', { y: 0, scale: 1, stagger: 0.0015, ease: 'power2.in' }, 0.70)
            .to('.chicken-salt-speck', { opacity: 0.35, duration: 0.02 }, 0.77);
        }
      }

      // 5. CHARCOAL ROTISSERIE CHICKEN SEQUENCE
      else if (currentCatId === 'chickens') {
        // Hand-cut Chips
        if (layers.chipsPile) {
          tl.fromTo(
            layers.chipsPile,
            { y: -650, opacity: 0 },
            { y: 0, opacity: 1, ease: 'bounce.out', duration: 0.08 },
            0.12
          );
        }

        // Rotisserie Half Chicken
        if (layers.chickenHalf) {
          tl.fromTo(
            layers.chickenHalf,
            { y: -720, opacity: 0, scaleY: 1.15 },
            { y: 0, opacity: 1, scaleY: 1, ease: 'power2.in', duration: 0.07 },
            0.24
          )
          .to(layers.chickenHalf, { scaleY: 0.92, scaleX: 1.05, duration: 0.02 }, 0.31)
          .to(layers.chickenHalf, { scaleY: 1, scaleX: 1, duration: 0.02 }, 0.33);
        }

        // Garlic Toum Pot
        if (layers.garlicToum) {
          tl.fromTo(
            layers.garlicToum,
            { y: -500, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, ease: 'bounce.out', duration: 0.07 },
            0.42
          );
        }

        // Lemon
        if (layers.lemon) {
          tl.fromTo(
            layers.lemon,
            { y: -300, opacity: 0 },
            { y: 0, opacity: 1, ease: 'bounce.out', duration: 0.06 },
            0.55
          );
        }

        // Chicken Salt Rain
        if (seasoningRef.current) {
          tl.to(seasoningRef.current, { opacity: 1, duration: 0.01 }, 0.68)
            .to('.chicken-salt-speck', { y: 0, scale: 1, stagger: 0.0015, ease: 'power2.in' }, 0.68)
            .to('.chicken-salt-speck', { opacity: 0.35, duration: 0.02 }, 0.76);
        }
      }

      // --- PHASE 3 (0.78 -> 0.85): Crossfade to Real Photo & Heat Bloom ---
      if (realPhotoRef.current) {
        if (flashRef.current) {
          tl.to(
            flashRef.current,
            { opacity: 0.75, duration: 0.03, yoyo: true, repeat: 1 },
            0.78
          );
        }

        // Real food photo fades in
        tl.to(
          realPhotoRef.current,
          { opacity: 1, duration: 0.06, ease: 'power1.inOut' },
          0.78
        );

        // Hide loose assembled SVG layers beneath
        tl.to(
          [
            layers.plateEmpty,
            ...allPossibleLayers,
            friesBowlRef.current,
            ...fries.filter(Boolean),
            seasoningRef.current,
          ].filter(Boolean),
          { opacity: 0, duration: 0.04 },
          0.82
        );

        // Rising steam wisps
        if (steamRef.current) {
          tl.to(
            steamRef.current,
            { opacity: 1, y: -20, duration: 0.05, ease: 'power1.out' },
            0.80
          );
        }

        // Floating glass pill pops in
        if (pillRef.current) {
          tl.to(
            pillRef.current,
            { opacity: 1, scale: 1, duration: 0.05, ease: 'back.out(2)' },
            0.83
          );
        }
      }

      // --- PHASE 4 (0.82 -> 1.00): Dish Assembly Completion Highlight ---
      if (headlineLine2Ref.current) {
        tl.to(
          headlineLine2Ref.current,
          {
            scale: 1.03,
            duration: 0.04,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
          },
          0.85
        );
      }

      if (buttonsRef.current) {
        tl.to(
          buttonsRef.current,
          {
            scale: 1.02,
            duration: 0.04,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
          },
          0.88
        );
      }
    }, sectionRef.current);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [categoryIndex, isLight, activeCategory]);

  // Background big decorative word
  const bgWord =
    activeCategory.id === 'fish-chips'
      ? 'SEAFOOD'
      : activeCategory.id === 'burgers'
      ? 'HOMERS'
      : activeCategory.id === 'hot-roasts'
      ? 'CARVERY'
      : activeCategory.id === 'curries'
      ? 'CURRIES'
      : 'CHARCOAL';

  return (
    <section
      id="plate-rise"
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 px-4 transition-colors duration-300 ${
        isLight
          ? 'bg-cream text-charcoal border-y border-charcoal/10'
          : 'bg-charcoal-50 text-cream border-t border-cream/10'
      }`}
    >
      {/* BONUS B: CHEESE DRIP SECTION DIVIDER */}
      {ASSEMBLY_CONFIG.features.enableCheeseDripTransition && <CheeseDripDivider />}

      {/* HUGE FADED WORD BEHIND (PARALLAX) */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-serif font-bold text-[16vw] leading-none whitespace-nowrap tracking-wider transition-all duration-700 ${
          isLight ? 'text-charcoal/5' : 'text-cream/5'
        }`}
      >
        {bgWord}
      </div>

      {/* AMBIENT RADIAL WARMTH GLOW */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
        style={{
          backgroundColor: activeCategory.glowColor || 'rgba(232, 112, 10, 0.15)',
        }}
      />

      {/* INTERACTIVE CATEGORY SWITCHER TABS (TOP OF SECTION) */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full card-chip text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-burnt animate-spin-slow" />
          <span>Interactive Fresh Food Showcase</span>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-full card-box max-w-full overflow-x-auto shadow-sm">
          {FOOD_CATEGORIES.map((cat, idx) => {
            const isActive = idx === categoryIndex;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(idx)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-orange-burnt text-white shadow-warm scale-105'
                    : isLight
                    ? 'hover:bg-charcoal/10 text-charcoal/80'
                    : 'hover:bg-cream/15 text-cream/80'
                }`}
                title={cat.tagline}
              >
                <span className="text-sm sm:text-base">{cat.emoji}</span>
                <span>{cat.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTAINER: TWO COLUMN LAYOUT (FOOD ASSEMBLY + STORY CARD) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: LIVE FOOD ASSEMBLY STAGE */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <FoodAssemblyStage
            category={activeCategory.id}
            categoryData={activeCategory}
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
          {/* Dynamic Category Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 will-change-transform shadow-xs"
            style={{
              backgroundColor: `${activeCategory.accentColor}18`,
              borderColor: `${activeCategory.accentColor}40`,
              color: activeCategory.accentColor,
              borderWidth: 1,
            }}
          >
            {activeCategory.badgeIcon === 'Fish' && <Fish className="w-3.5 h-3.5" />}
            {activeCategory.badgeIcon === 'Star' && <Star className="w-3.5 h-3.5 fill-current" />}
            {activeCategory.badgeIcon === 'Utensils' && <Utensils className="w-3.5 h-3.5" />}
            {activeCategory.badgeIcon === 'Sparkles' && <Sparkles className="w-3.5 h-3.5" />}
            {activeCategory.badgeIcon === 'Flame' && <Flame className="w-3.5 h-3.5" />}
            <span>{activeCategory.badge}</span>
          </div>

          {/* Masked Headline with Hand-Drawn Underline */}
          <h2
            className={`text-3xl sm:text-5xl font-serif font-bold leading-tight mb-4 ${
              isLight ? 'text-charcoal' : 'text-cream'
            }`}
          >
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine1Ref} className="block will-change-transform">
                {activeCategory.headlineLine1}
              </span>
            </span>
            <span className="block overflow-hidden pb-1 relative inline-block">
              <span
                ref={headlineLine2Ref}
                className="block will-change-transform font-serif"
                style={{ color: activeCategory.accentColor }}
              >
                {activeCategory.headlineLine2}
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
                  stroke={activeCategory.underlineColor || '#e8700a'}
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
            {activeCategory.description}
          </p>

          {/* Highlight Chips */}
          <div
            className={`flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm mb-8 pb-6 border-b w-full ${
              isLight ? 'text-charcoal/70 border-charcoal/15' : 'text-cream/70 border-cream/10'
            }`}
          >
            {activeCategory.chips.map((chip, idx) => (
              <div
                key={idx}
                ref={(el) => (chipsRef.current[idx] = el)}
                className="inline-flex items-center gap-2 will-change-transform"
              >
                <span className={`font-semibold ${isLight ? 'text-charcoal' : 'text-cream'}`}>
                  {chip.text}
                </span>
                {idx < activeCategory.chips.length - 1 && (
                  <span className="text-charcoal/30 dark:text-cream/30 hidden sm:inline">•</span>
                )}
              </div>
            ))}
          </div>

          {/* Horizontal Decorative Divider Line */}
          <div
            ref={dividerRef}
            className={`w-full h-px mb-6 ${isLight ? 'bg-charcoal/15' : 'bg-cream/15'} will-change-transform`}
          />

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-3 sm:gap-4 will-change-transform">
            <Link
              to={activeCategory.ctaPrimary.link}
              className="px-6 py-3 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-semibold text-sm shadow-warm hover:shadow-glow-orange transition-all active:scale-95 flex items-center gap-2"
            >
              <span>{activeCategory.ctaPrimary.text}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={activeCategory.ctaSecondary.link}
              className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${
                isLight
                  ? 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal border-charcoal/20'
                  : 'bg-cream/10 hover:bg-cream/20 text-cream border-cream/20'
              }`}
            >
              {activeCategory.ctaSecondary.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
