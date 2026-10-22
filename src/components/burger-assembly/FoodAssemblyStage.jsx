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
  SvgDeliPaper,
  SvgFishFillet,
  SvgTartarePot,
  SvgCalamariRing,
  SvgChipsPile,
  SvgRoastPotatoes,
  SvgRoastPumpkin,
  SvgGardenPeas,
  SvgCarvedRoast,
  SvgPanGravyStream,
  SvgRosemarySprig,
  SvgCurryBowl,
  SvgCreamFenugreek,
  SvgBasmatiRiceBowl,
  SvgGarlicNaan,
  SvgCharcoalChickenPiece,
  SvgGarlicToumPot,
} from './FoodSvgLayers';

/**
 * FOOD ASSEMBLY STAGE (MULTI-CATEGORY ENGINE)
 * -------------------------------------------------------------
 * Dynamically switches between:
 * - 🐟 Fish & Chips (Default initial category on load)
 * - 🍔 Flame-Grilled Burgers
 * - 🍖 Hot Roasts & Carvery
 * - 🍛 Aromatic Curries
 * - 🍗 Charcoal Rotisserie Chicken
 *
 * Each category animates in sequentially on scroll with the exact same
 * physics, drop-shadows, bounces, and crossfades to high-resolution photography.
 */
export default function FoodAssemblyStage({
  category = 'fish-chips',
  categoryData,
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
  const cat = categoryData || {
    heroPhoto: '/menu/fish-and-chips.jpg',
    glassPill: 'Fried crispy to order',
    glowColor: 'rgba(2, 132, 199, 0.25)',
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] aspect-square flex items-center justify-center select-none"
    >
      {/* 1. AMBIENT WARM RADIAL GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full blur-[100px] pointer-events-none opacity-0 transition-opacity"
        style={{ backgroundColor: cat.glowColor || 'rgba(232, 112, 10, 0.25)' }}
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
            CATEGORY 1: FISH & CHIPS ASSEMBLY STACK
            ======================================================== */}
        {category === 'fish-chips' && (
          <>
            {/* 1. Deli Paper Liner */}
            <div
              ref={(el) => (layersRef.current['deliPaper'] = el)}
              className="absolute inset-[10%] sm:inset-[12%] z-[15] will-change-transform opacity-0 pointer-events-none flex items-center justify-center"
            >
              <SvgDeliPaper />
            </div>

            {/* 2. Pile of Hand-Cut Chips */}
            <div
              ref={(el) => (layersRef.current['chipsPile'] = el)}
              className="absolute top-[16%] left-[12%] sm:left-[14%] w-[210px] sm:w-[250px] z-[18] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgChipsPile />
            </div>

            {/* 3. Crispy Crumbed Fish Fillet 1 */}
            <div
              ref={(el) => (layersRef.current['fillet1'] = el)}
              className="absolute bottom-[20%] left-[10%] sm:left-[12%] w-[240px] sm:w-[285px] z-[22] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgFishFillet id="1" />
            </div>

            {/* 4. Crispy Crumbed Fish Fillet 2 (Overlapping angle) */}
            <div
              ref={(el) => (layersRef.current['fillet2'] = el)}
              className="absolute bottom-[28%] left-[22%] sm:left-[24%] w-[230px] sm:w-[275px] z-[24] will-change-transform opacity-0 pointer-events-none rotate-[14deg]"
            >
              <SvgFishFillet id="2" />
            </div>

            {/* 5. Golden Calamari Ring */}
            <div
              ref={(el) => (layersRef.current['calamari'] = el)}
              className="absolute top-[28%] right-[24%] sm:right-[26%] w-[75px] sm:w-[90px] z-[25] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgCalamariRing />
            </div>

            {/* 6. House Tartare Ramekin Pot */}
            <div
              ref={(el) => (layersRef.current['tartare'] = el)}
              className="absolute top-[22%] right-[10%] sm:right-[12%] w-[120px] sm:w-[145px] z-[26] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgTartarePot />
            </div>

            {/* 7. Fresh Lemon Wedge */}
            <div
              ref={(el) => (layersRef.current['lemon'] = el)}
              className="absolute bottom-[16%] right-[16%] sm:right-[18%] w-[85px] sm:w-[105px] z-[29] pointer-events-none will-change-transform opacity-0"
            >
              <img
                src="/feature-burger/lemon-wedge.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
              />
            </div>

            {/* 8. Fresh Green Parsley Sprig */}
            <div
              ref={(el) => (layersRef.current['parsley'] = el)}
              className="absolute bottom-[26%] right-[30%] sm:right-[32%] w-[70px] sm:w-[85px] z-[28] pointer-events-none will-change-transform opacity-0"
            >
              <img
                src="/feature-burger/parsley.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
              />
            </div>

            {/* Chicken Salt Seasoning Rain */}
            <div className="absolute inset-[15%] z-[30] pointer-events-none">
              <SeasoningRain
                containerRef={seasoningRef}
                className="w-full h-full"
              />
            </div>
          </>
        )}

        {/* ========================================================
            CATEGORY 2: FLAME-GRILLED BURGER ASSEMBLY STACK
            ======================================================== */}
        {category === 'burgers' && (
          <>
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

            {/* Sides: Fries Bowl + Seasoning Rain */}
            <div className="absolute left-[8%] sm:left-[10%] bottom-[22%] z-[22] pointer-events-none">
              <FriesPour
                bowlRef={friesBowlRef}
                fryItemsRef={fryItemsRef}
                className="scale-[0.80] sm:scale-[0.95] origin-bottom-left"
              />
              <SeasoningRain
                containerRef={seasoningRef}
                className="top-[-30px] left-[-15px] w-full h-[160px]"
              />
            </div>

            {/* Lemon Wedge */}
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

            {/* Parsley Sprig */}
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
          </>
        )}

        {/* ========================================================
            CATEGORY 3: HOT ROASTS & CARVERY ASSEMBLY STACK
            ======================================================== */}
        {category === 'hot-roasts' && (
          <>
            {/* 1. Golden Roast Potatoes */}
            <div
              ref={(el) => (layersRef.current['roastPotatoes'] = el)}
              className="absolute bottom-[24%] left-[10%] sm:left-[12%] w-[190px] sm:w-[220px] z-[18] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgRoastPotatoes />
            </div>

            {/* 2. Sweet Caramelized Roast Pumpkin */}
            <div
              ref={(el) => (layersRef.current['roastPumpkin'] = el)}
              className="absolute top-[20%] left-[15%] sm:left-[18%] w-[170px] sm:w-[200px] z-[19] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgRoastPumpkin />
            </div>

            {/* 3. Sweet Garden Peas */}
            <div
              ref={(el) => (layersRef.current['gardenPeas'] = el)}
              className="absolute bottom-[18%] right-[14%] sm:right-[16%] w-[160px] sm:w-[185px] z-[20] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgGardenPeas />
            </div>

            {/* 4. Carved Succulent Roast Meat */}
            <div
              ref={(el) => (layersRef.current['roastMeat'] = el)}
              className="absolute bottom-[30%] right-[12%] sm:right-[14%] w-[240px] sm:w-[280px] z-[24] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgCarvedRoast />
            </div>

            {/* 5. Steaming Pan Gravy Pour Stream */}
            <div
              ref={(el) => (layersRef.current['panGravy'] = el)}
              className="absolute top-[10%] right-[18%] sm:right-[20%] w-[210px] sm:w-[245px] z-[26] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgPanGravyStream />
            </div>

            {/* 6. Garden Rosemary Sprig */}
            <div
              ref={(el) => (layersRef.current['rosemary'] = el)}
              className="absolute bottom-[16%] left-[34%] sm:left-[36%] w-[120px] sm:w-[145px] z-[28] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgRosemarySprig />
            </div>

            {/* Coarse Salt & Pepper Seasoning Rain */}
            <div className="absolute inset-[15%] z-[30] pointer-events-none">
              <SeasoningRain
                containerRef={seasoningRef}
                className="w-full h-full"
              />
            </div>
          </>
        )}

        {/* ========================================================
            CATEGORY 4: AROMATIC CURRIES ASSEMBLY STACK
            ======================================================== */}
        {category === 'curries' && (
          <>
            {/* 1. Deep Curry Bowl with Butter Chicken */}
            <div
              ref={(el) => (layersRef.current['curryBowl'] = el)}
              className="absolute top-[18%] left-[8%] sm:left-[10%] w-[250px] sm:w-[290px] z-[20] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgCurryBowl />
            </div>

            {/* 2. Swirling Cream & Fenugreek Drizzle */}
            <div
              ref={(el) => (layersRef.current['creamSwirl'] = el)}
              className="absolute top-[22%] left-[10%] sm:left-[12%] w-[220px] sm:w-[255px] z-[22] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgCreamFenugreek />
            </div>

            {/* 3. Steamed Fluffy Basmati Rice Bowl */}
            <div
              ref={(el) => (layersRef.current['basmatiRice'] = el)}
              className="absolute top-[14%] right-[8%] sm:right-[10%] w-[160px] sm:w-[190px] z-[24] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgBasmatiRiceBowl />
            </div>

            {/* 4. Warm Garlic Naan with Melted Butter */}
            <div
              ref={(el) => (layersRef.current['garlicNaan'] = el)}
              className="absolute bottom-[12%] right-[10%] sm:right-[12%] w-[210px] sm:w-[250px] z-[26] will-change-transform opacity-0 pointer-events-none rotate-[-8deg]"
            >
              <SvgGarlicNaan />
            </div>

            {/* 5. Fresh Green Coriander Garnish */}
            <div
              ref={(el) => (layersRef.current['coriander'] = el)}
              className="absolute top-[34%] left-[26%] w-[75px] sm:w-[90px] z-[28] will-change-transform opacity-0 pointer-events-none"
            >
              <img
                src="/feature-burger/parsley.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] hue-rotate-[-10deg]"
              />
            </div>

            {/* Garam Masala & Chili Flake Rain */}
            <div className="absolute inset-[15%] z-[30] pointer-events-none">
              <SeasoningRain
                containerRef={seasoningRef}
                className="w-full h-full"
              />
            </div>
          </>
        )}

        {/* ========================================================
            CATEGORY 5: CHARCOAL ROTISSERIE CHICKEN ASSEMBLY STACK
            ======================================================== */}
        {category === 'chickens' && (
          <>
            {/* 1. Chips Pile */}
            <div
              ref={(el) => (layersRef.current['chipsPile'] = el)}
              className="absolute top-[18%] left-[10%] sm:left-[12%] w-[220px] sm:w-[260px] z-[18] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgChipsPile />
            </div>

            {/* 2. Succulent Half Charcoal Chicken */}
            <div
              ref={(el) => (layersRef.current['chickenHalf'] = el)}
              className="absolute bottom-[20%] right-[8%] sm:right-[10%] w-[250px] sm:w-[295px] z-[24] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgCharcoalChickenPiece />
            </div>

            {/* 3. Creamy Lebanese Garlic Toum Pot */}
            <div
              ref={(el) => (layersRef.current['garlicToum'] = el)}
              className="absolute bottom-[18%] left-[14%] sm:left-[16%] w-[115px] sm:w-[135px] z-[26] will-change-transform opacity-0 pointer-events-none"
            >
              <SvgGarlicToumPot />
            </div>

            {/* 4. Lemon Wedge */}
            <div
              ref={(el) => (layersRef.current['lemon'] = el)}
              className="absolute bottom-[14%] left-[38%] w-[80px] sm:w-[100px] z-[28] pointer-events-none will-change-transform opacity-0"
            >
              <img
                src="/feature-burger/lemon-wedge.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
              />
            </div>

            {/* Chicken Salt Rain */}
            <div className="absolute inset-[15%] z-[30] pointer-events-none">
              <SeasoningRain
                containerRef={seasoningRef}
                className="w-full h-full"
              />
            </div>
          </>
        )}

        {/* Impact Crumb / Flavour Sparkle Puff */}
        <div
          ref={crumbRef}
          className="absolute bottom-[55%] right-[20%] w-24 h-16 pointer-events-none opacity-0 z-[32] flex items-center justify-center"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 absolute -top-2 left-4 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-orange-400 absolute top-2 right-4 animate-ping" />
          <span className="w-3 h-3 rounded-full bg-yellow-200 absolute bottom-1 left-8" />
        </div>

        {/* ========================================================
            CROSS-FADE HERO PHOTO (High-resolution finished dish)
            Smoothly replaces the assembly stage at progress 0.78-0.85
            ======================================================== */}
        <div
          ref={realPhotoRef}
          className="absolute inset-0 z-[45] pointer-events-none opacity-0 will-change-opacity flex items-center justify-center p-2 sm:p-4"
        >
          <img
            src={cat.heroPhoto}
            alt={cat.name}
            className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.40)]"
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
          className="absolute top-[6%] right-[14%] w-36 h-28 pointer-events-none opacity-0 z-[47] overflow-visible filter blur-[2px]"
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

        {/* Glass Floating Pill: Dynamic category badge */}
        <div
          ref={pillRef}
          className="absolute top-4 right-2 sm:top-6 sm:right-4 z-[50] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-warm backdrop-blur-md bg-charcoal text-cream border border-orange-burnt/40 opacity-0 transform-gpu pointer-events-none"
        >
          <span>{cat.glassPill}</span>
        </div>
      </div>
    </div>
  );
}
