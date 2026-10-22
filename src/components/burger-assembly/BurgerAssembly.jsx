import React from 'react';
import MeltingCheese from './MeltingCheese';
import FriesPour from './FriesPour';
import SeasoningRain from './SeasoningRain';
import {
  SvgBunBottom,
  SvgLettuce,
  SvgTomatoPickle,
  SvgPatty,
  SvgBacon,
  SvgBunTop,
  SvgPlateBase,
} from './SvgFoodLayers';

/**
 * BURGER ASSEMBLY STAGE
 * -------------------------------------------------------------
 * Coordinates the empty plate, live dropping burger layers, fries bowl,
 * secret chicken salt shower, and seamless cross-fade to plate.png.
 */
export default function BurgerAssembly({
  containerRef,
  plateRef,
  shadowRef,
  glowRef,
  layersRef,
  friesBowlRef,
  fryItemsRef,
  seasoningRef,
  realPhotoRef,
  pillRef,
  steamRef,
  crumbRef,
  flashRef,
}) {
  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] aspect-square flex items-center justify-center select-none"
    >
      {/* 1. AMBIENT WARM RADIAL GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full blur-[100px] bg-orange-burnt/25 pointer-events-none opacity-0 transition-opacity"
      />

      {/* 2. CONTACT SHADOW BENEATH PLATE */}
      <div
        ref={shadowRef}
        className="absolute bottom-2 sm:bottom-4 w-[280px] sm:w-[380px] h-[32px] rounded-full blur-xl bg-charcoal/45 pointer-events-none opacity-0 transform-gpu"
      />

      {/* 3. MAIN PLATE & ASSEMBLY STACK CONTAINER */}
      <div
        ref={plateRef}
        className="relative w-full h-full flex items-center justify-center will-change-transform"
      >
        {/* EMPTY DARK CERAMIC PLATE (Rises First) */}
        <div
          ref={(el) => (layersRef.current['plateEmpty'] = el)}
          className="absolute inset-4 sm:inset-6 z-10 pointer-events-none flex items-center justify-center"
        >
          <SvgPlateBase />
        </div>

        {/* ========================================================
            BURGER LIVE ASSEMBLY STACK (Right side of plate)
            Zero rectangular bitmap artifacts - 100% clean vector layers
            ======================================================== */}
        {/* Layer 1: Bottom Bun */}
        <div
          ref={(el) => (layersRef.current['bunBottom'] = el)}
          className="burger-layer absolute bottom-[18%] right-[8%] sm:right-[9%] w-[200px] sm:w-[245px] z-[20] will-change-transform opacity-0 pointer-events-none"
        >
          <SvgBunBottom />
        </div>

        {/* Layer 2: Crisp Lettuce & House Sauce */}
        <div
          ref={(el) => (layersRef.current['lettuce'] = el)}
          className="burger-layer absolute bottom-[24%] right-[7%] sm:right-[8%] w-[215px] sm:w-[260px] z-[21] will-change-transform opacity-0 pointer-events-none"
        >
          <SvgLettuce />
        </div>

        {/* Layer 3: Tomato Slice & Red Onion & Pickles */}
        <div
          ref={(el) => (layersRef.current['tomato'] = el)}
          className="burger-layer absolute bottom-[28%] right-[8%] sm:right-[9%] w-[208px] sm:w-[252px] z-[22] will-change-transform opacity-0 pointer-events-none"
        >
          <SvgTomatoPickle />
        </div>

        {/* Layer 4: Flame-Grilled Angus Patty 1 */}
        <div
          ref={(el) => (layersRef.current['patty1'] = el)}
          className="burger-layer absolute bottom-[32%] right-[8%] sm:right-[9%] w-[210px] sm:w-[254px] z-[23] will-change-transform opacity-0 pointer-events-none"
        >
          <SvgPatty id="1" />
        </div>

        {/* Layer 5: Melted Cheddar Cheese Slump 1 */}
        <div
          ref={(el) => (layersRef.current['cheese1'] = el)}
          className="burger-layer absolute bottom-[35%] right-[7%] sm:right-[8%] w-[215px] sm:w-[260px] z-[24] will-change-transform opacity-0 pointer-events-none"
        >
          <MeltingCheese id="layer-1" isSecondLayer={false} />
        </div>

        {/* Layer 6: Crispy Woodfired Bacon */}
        <div
          ref={(el) => (layersRef.current['bacon'] = el)}
          className="burger-layer absolute bottom-[41%] right-[6%] sm:right-[7%] w-[225px] sm:w-[270px] z-[25] will-change-transform opacity-0 pointer-events-none"
        >
          <SvgBacon />
        </div>

        {/* Layer 7: Flame-Grilled Angus Patty 2 */}
        <div
          ref={(el) => (layersRef.current['patty2'] = el)}
          className="burger-layer absolute bottom-[46%] right-[8%] sm:right-[9%] w-[210px] sm:w-[254px] z-[26] will-change-transform opacity-0 pointer-events-none"
        >
          <SvgPatty id="2" />
        </div>

        {/* Layer 8: Melted Cheddar Cheese Slump 2 */}
        <div
          ref={(el) => (layersRef.current['cheese2'] = el)}
          className="burger-layer absolute bottom-[50%] right-[7%] sm:right-[8%] w-[215px] sm:w-[260px] z-[27] will-change-transform opacity-0 pointer-events-none"
        >
          <MeltingCheese id="layer-2" isSecondLayer={true} />
        </div>

        {/* Layer 9: Top Toasted Sesame Brioche Bun */}
        <div
          ref={(el) => (layersRef.current['bunTop'] = el)}
          className="burger-layer absolute bottom-[57%] right-[7%] sm:right-[8%] w-[215px] sm:w-[260px] z-[28] will-change-transform opacity-0 pointer-events-none"
        >
          <SvgBunTop />
        </div>

        {/* Impact Crumb / Sesame Sparkle Puff */}
        <div
          ref={crumbRef}
          className="absolute bottom-[65%] right-[16%] w-24 h-16 pointer-events-none opacity-0 z-[30] flex items-center justify-center"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 absolute -top-2 left-4 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-orange-400 absolute top-2 right-4 animate-ping" />
          <span className="w-3 h-3 rounded-full bg-yellow-200 absolute bottom-1 left-8" />
        </div>

        {/* ========================================================
            SIDES ASSEMBLY: FRIES BOWL, LEMON & PARSLEY
            ======================================================== */}
        {/* Fries Pour into Bowl (Left side of plate) */}
        <div className="absolute left-[8%] sm:left-[10%] bottom-[22%] z-[22] pointer-events-none">
          <FriesPour
            bowlRef={friesBowlRef}
            fryItemsRef={fryItemsRef}
            className="scale-[0.80] sm:scale-[0.95] origin-bottom-left"
          />
          {/* Secret Chicken Salt Shower */}
          <SeasoningRain
            containerRef={seasoningRef}
            className="top-[-30px] left-[-15px] w-full h-[160px]"
          />
        </div>

        {/* Lemon Wedge (Center foreground) */}
        <div
          ref={(el) => (layersRef.current['lemon'] = el)}
          className="absolute left-[36%] bottom-[12%] w-[85px] sm:w-[110px] z-[29] pointer-events-none will-change-transform opacity-0"
        >
          <img
            src="/feature-burger/lemon-wedge.webp"
            alt=""
            className="w-full h-auto object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Fresh Parsley Sprig */}
        <div
          ref={(el) => (layersRef.current['parsley'] = el)}
          className="absolute left-[24%] bottom-[11%] w-[75px] sm:w-[95px] z-[28] pointer-events-none will-change-transform opacity-0"
        >
          <img
            src="/feature-burger/parsley.webp"
            alt=""
            className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* ========================================================
            CROSS-FADE HERO PHOTO (Real existing plate.png)
            Smoothly replaces the assembly stage at progress 0.78-0.85
            ======================================================== */}
        <div
          ref={realPhotoRef}
          className="absolute inset-0 z-[45] pointer-events-none opacity-0 will-change-opacity flex items-center justify-center p-2 sm:p-4"
        >
          <img
            src="/plate.png"
            alt="Homers Emerton Signature Double Cheeseburger Plate"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.38)]"
            loading="eager"
          />
        </div>

        {/* Soft Warm Flash on Crossfade */}
        <div
          ref={flashRef}
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/40 via-orange-400/25 to-transparent pointer-events-none z-[46] opacity-0"
        />

        {/* Rising Ambient Steam Wisps After Assembly */}
        <div
          ref={steamRef}
          className="absolute top-[6%] right-[12%] w-36 h-28 pointer-events-none opacity-0 z-[47] overflow-visible filter blur-[2px]"
        >
          <svg viewBox="0 0 100 80" className="w-full h-full animate-pulse-glow" fill="none">
            <path
              d="M30 70 Q 20 45, 38 28 T 32 0"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M50 75 Q 65 50, 48 30 T 58 5"
              stroke="rgba(255, 255, 255, 0.55)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M70 70 Q 55 45, 68 25 T 62 2"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Glass Floating Pill: "Cooked fresh to order" */}
        <div
          ref={pillRef}
          className="absolute top-4 right-2 sm:top-6 sm:right-4 z-[50] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-warm backdrop-blur-md bg-charcoal text-cream border border-orange-burnt/40 opacity-0 transform-gpu pointer-events-none"
        >
          <span>Cooked fresh to order</span>
        </div>
      </div>
    </div>
  );
}
