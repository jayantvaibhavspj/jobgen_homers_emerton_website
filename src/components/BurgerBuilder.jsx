import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, ShoppingBag, RotateCcw } from 'lucide-react';
import { BURGER_BUILDER_CONFIG } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function BurgerBuilder({ onAddToCart, theme = 'light' }) {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const isLight = theme === 'light';

  // Selected add-on IDs
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addedEffect, setAddedEffect] = useState(false);

  // Calculate live price
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = BURGER_BUILDER_CONFIG.availableAddons.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = BURGER_BUILDER_CONFIG.basePrice + addonsTotal;

  // Staggered drop-in animation on scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const layers = stackRef.current?.querySelectorAll('.burger-layer');
      if (layers && layers.length > 0) {
        gsap.fromTo(
          layers,
          {
            y: (i) => -150 - i * 40,
            opacity: 0,
            scale: 0.85,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'bounce.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleAddBurgerToCart = () => {
    const addonNames = selectedAddons
      .map((id) => BURGER_BUILDER_CONFIG.availableAddons.find((a) => a.id === id)?.name)
      .filter(Boolean);

    const customItem = {
      id: `custom-burger-${Date.now()}`,
      name: "Custom Stacked Angus Burger",
      category: "burgers",
      price: totalPrice,
      description: addonNames.length > 0 ? `With ${addonNames.join(', ')}` : "Classic double brioche stack",
      image: "/menu/bacon-double-burger.jpg",
      emoji: "🍔",
      custom: true,
      addons: addonNames,
    };

    onAddToCart(customItem);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1200);
  };

  return (
    <section
      id="builder"
      ref={sectionRef}
      className={`relative min-h-screen py-20 px-4 overflow-hidden transition-colors duration-300 ${
        isLight
          ? 'bg-cream text-charcoal border-y border-charcoal/10'
          : 'bg-charcoal text-cream border-t border-cream/10'
      }`}
    >
      {/* Background Accent glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-burnt/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold mb-3 ${
              isLight
                ? 'bg-orange-burnt/10 border border-orange-burnt/25 text-orange-burnt'
                : 'bg-cream/10 border border-cream/20 text-orange-glow'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Interactive Scroll Experience</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-serif font-bold mb-4 ${
              isLight ? 'text-charcoal' : 'text-cream'
            }`}
          >
            Stack Your Dream Burger.
          </h2>
          <p className={`text-sm sm:text-base ${isLight ? 'text-charcoal/70' : 'text-cream/70'}`}>
            Watch every premium layer drop in. Customise with extra Angus beef, double-smoked bacon,
            or fire-roasted jalapeños, and send it straight to your cart.
          </p>
        </div>

        {/* Builder Workspace: Left Stack Visualizer, Right Customizer Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: BURGER STACK VISUALIZER */}
          <div
            className={`lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-10 rounded-[24px] border backdrop-blur-md shadow-warm relative ${
              isLight
                ? 'bg-white border-charcoal/10 shadow-warm-lg'
                : 'bg-charcoal-50/70 border-cream/10'
            }`}
          >
            <div
              className={`text-xs uppercase tracking-wider mb-4 font-mono ${
                isLight ? 'text-charcoal/50' : 'text-cream/40'
              }`}
            >
              Live Stack View · Scroll & Build
            </div>

            <div
              ref={stackRef}
              className="w-full max-w-xs flex flex-col items-center justify-center my-6 space-y-1.5 transition-all"
            >
              {/* TOP BRIOCHE BUN (Crown) */}
              <div className="burger-layer w-52 sm:w-60 h-14 bg-gradient-to-b from-[#e7aa5e] to-[#c7883b] rounded-t-[40px] shadow-md border-b-2 border-[#b57528] relative flex items-center justify-center">
                {/* Sesame Seeds */}
                <div className="absolute top-2 left-10 w-1.5 h-0.5 bg-cream/80 rounded-full rotate-12" />
                <div className="absolute top-3 left-20 w-1.5 h-0.5 bg-cream/80 rounded-full -rotate-45" />
                <div className="absolute top-2 right-12 w-1.5 h-0.5 bg-cream/80 rounded-full rotate-45" />
                <div className="absolute top-4 right-20 w-1.5 h-0.5 bg-cream/80 rounded-full -rotate-12" />
                <span className="text-[11px] font-bold text-charcoal/70 tracking-wider">Sesame Brioche Crown</span>
              </div>

              {/* SAUCE LAYER */}
              <div className="burger-layer w-48 sm:w-56 h-3.5 bg-gradient-to-r from-chilli to-orange-burnt rounded-full shadow-inner opacity-90" />

              {/* CRISP LETTUCE */}
              <div className="burger-layer w-56 sm:w-64 h-6 bg-[#4f772d] rounded-2xl border-t border-[#6096ba]/20 shadow-sm flex items-center justify-center">
                <span className="text-[10px] text-white/90 font-medium">Crisp Cos Lettuce</span>
              </div>

              {/* TOMATO SLICE */}
              <div className="burger-layer w-50 sm:w-56 h-5 bg-[#d90429] rounded-xl border-y border-[#ef233c] shadow-sm flex items-center justify-center">
                <span className="text-[10px] text-white font-medium">Ripe Field Tomato</span>
              </div>

              {/* EXTRA ADD-ONS INSERTIONS (Visualized if selected) */}
              {selectedAddons.includes('extra-bacon') && (
                <div className="burger-layer w-52 sm:w-60 h-4 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] rounded-md shadow flex items-center justify-center border-t border-amber-300/30 animate-scale-in">
                  <span className="text-[10px] text-amber-100 font-bold tracking-wide">Double Smoked Bacon</span>
                </div>
              )}

              {selectedAddons.includes('fried-egg') && (
                <div className="burger-layer w-50 sm:w-56 h-5 bg-cream rounded-full border border-amber-300 shadow flex items-center justify-center relative animate-scale-in">
                  <div className="w-5 h-5 bg-amber-400 rounded-full border border-amber-500 shadow-inner" />
                  <span className="text-[10px] text-charcoal font-bold ml-2">Fried Egg</span>
                </div>
              )}

              {selectedAddons.includes('jalapenos') && (
                <div className="burger-layer w-46 sm:w-52 h-3.5 bg-[#2d6a4f] rounded-full flex items-center justify-center animate-scale-in">
                  <span className="text-[9px] text-white font-bold tracking-widest">🌶️ FIERY JALAPEÑOS</span>
                </div>
              )}

              {/* MELTED AMERICAN CHEDDAR */}
              <div className="burger-layer w-52 sm:w-60 h-4 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-[10px] text-charcoal font-bold">Melted Aged Cheddar</span>
              </div>

              {/* FLAME-GRILLED ANGUS PATTY */}
              <div className="burger-layer w-54 sm:w-62 h-8 bg-gradient-to-b from-[#4a2810] to-[#2b180a] rounded-xl border-t border-amber-900/40 shadow-md flex items-center justify-center relative">
                <span className="text-[11px] text-amber-200/90 font-bold tracking-wider">
                  Flame-Grilled Angus Patty
                </span>
              </div>

              {/* EXTRA PATTY IF SELECTED */}
              {selectedAddons.includes('extra-patty') && (
                <div className="burger-layer w-54 sm:w-62 h-8 bg-gradient-to-b from-[#4a2810] to-[#2b180a] rounded-xl border-t border-amber-900/40 shadow-md flex items-center justify-center animate-scale-in">
                  <span className="text-[11px] text-orange-glow font-bold tracking-wider">
                    + Extra 150g Angus Patty
                  </span>
                </div>
              )}

              {/* BOTTOM BRIOCHE BUN (Base) */}
              <div className="burger-layer w-50 sm:w-58 h-10 bg-gradient-to-t from-[#c7883b] to-[#e7aa5e] rounded-b-[24px] shadow-lg border-t border-[#b57528] flex items-center justify-center">
                <span className="text-[11px] font-bold text-charcoal/70">Toasted Brioche Base</span>
              </div>
            </div>

            {/* Total height & live layers counter */}
            <div className={`text-xs mt-2 ${isLight ? 'text-charcoal/60' : 'text-cream/50'}`}>
              Base Stack: 8 Fresh Ingredients · {selectedAddons.length} Extras Selected
            </div>
          </div>

          {/* RIGHT: LIVE CUSTOMIZER CONTROLS */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div
              className={`w-full pb-4 border-b flex items-center justify-between ${
                isLight ? 'border-charcoal/10' : 'border-cream/10'
              }`}
            >
              <div>
                <h3 className={`text-2xl font-serif font-bold ${isLight ? 'text-charcoal' : 'text-cream'}`}>
                  Add-On Toggles
                </h3>
                <p className={`text-xs ${isLight ? 'text-charcoal/60' : 'text-cream/60'}`}>
                  Tap to toggle extra toppings with live pricing
                </p>
              </div>
              {selectedAddons.length > 0 && (
                <button
                  onClick={() => setSelectedAddons([])}
                  className={`flex items-center gap-1 text-xs hover:text-orange-burnt transition-colors ${
                    isLight ? 'text-charcoal/60' : 'text-cream/50'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* TOGGLE CHIPS LIST */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BURGER_BUILDER_CONFIG.availableAddons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-orange-burnt/15 border-orange-burnt text-charcoal shadow-warm'
                        : isLight
                        ? 'bg-white border-charcoal/15 text-charcoal hover:border-charcoal/30'
                        : 'bg-cream/5 border-cream/10 text-cream/80 hover:bg-cream/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{addon.emoji}</span>
                      <div>
                        <div className="text-xs font-semibold">{addon.name}</div>
                        <div className="text-[11px] text-orange-burnt font-mono font-bold">
                          +${addon.price.toFixed(2)} AUD
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-orange-burnt border-orange-burnt text-white'
                          : isLight
                          ? 'border-charcoal/30 text-transparent'
                          : 'border-cream/30 text-transparent'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LIVE PRICE SUMMARY CARD & ADD TO CART BUTTON */}
            <div
              className={`w-full p-6 rounded-2xl border shadow-warm-lg flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 ${
                isLight
                  ? 'bg-white border-charcoal/15'
                  : 'bg-charcoal-50 border-cream/15'
              }`}
            >
              <div>
                <div
                  className={`text-xs uppercase tracking-wider ${
                    isLight ? 'text-charcoal/60' : 'text-cream/60'
                  }`}
                >
                  Your Custom Total
                </div>
                <div className="text-3xl font-serif font-bold text-orange-burnt">
                  ${totalPrice.toFixed(2)}{' '}
                  <span
                    className={`text-sm font-sans font-normal ${
                      isLight ? 'text-charcoal/60' : 'text-cream/50'
                    }`}
                  >
                    AUD
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddBurgerToCart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm sm:text-base shadow-warm hover:shadow-glow-orange transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedEffect ? 'Added to Cart! ✓' : 'Add my burger'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
