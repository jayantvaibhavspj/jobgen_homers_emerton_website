import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Clock, Flame, Plus, Check, ArrowRight, Phone, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { SHOP_INFO } from '../config';

export const LUNCH_SPECIALS = [
  {
    id: 'lunch-schnitzel-roll',
    name: 'Crispy Chicken Schnitzel Roll Deal',
    category: 'burgers',
    originalPrice: 16.90,
    price: 14.90,
    save: 'Save $2.00',
    description: 'Golden hand-crumbed chicken breast schnitzel with crisp lettuce, creamy mayonnaise on a fresh long bakery roll + hot chips.',
    image: '/menu/schnitzel-roll.jpg',
    badge: 'Bestseller',
    includes: 'Includes Hot Chips',
  },
  {
    id: 'lunch-fish-pack',
    name: 'Golden Fish Cocktails Pack (6 Pcs)',
    category: 'fish-chips',
    originalPrice: 15.50,
    price: 12.90,
    save: 'Save $2.60',
    description: 'Six tender white fish cocktails battered crispy golden, served with crunchy hot chips, house-made tartare and fresh lemon.',
    image: '/menu/fish-cocktails.jpg',
    badge: 'Popular Deal',
    includes: 'Includes Chips & Tartare',
  },
  {
    id: 'lunch-caesar-salad',
    name: 'Fresh Chicken Caesar Salad Lunch Box',
    category: 'salads',
    originalPrice: 14.50,
    price: 12.90,
    save: 'Save $1.60',
    description: 'Crisp cos lettuce, grilled herb chicken breast, crispy bacon rashers, shaved parmesan, garlic croutons and creamy Caesar dressing.',
    image: '/menu/chicken-caesar.jpg',
    badge: 'Fresh Daily',
    includes: 'High Protein / Fresh',
  },
  {
    id: 'lunch-cheeseburger',
    name: 'Flame-Grilled Cheeseburger & Chips Deal',
    category: 'burgers',
    originalPrice: 16.50,
    price: 13.90,
    save: 'Save $2.60',
    description: '100% Australian Angus beef patty, double melted American cheddar, dill pickles, French mustard and ketchup on a toasted bun + chips.',
    image: '/menu/cheeseburger.jpg',
    badge: 'Value Deal',
    includes: 'Includes Hot Chips',
  },
  {
    id: 'lunch-roast-roll',
    name: 'Hot Roast Beef & Gravy Roll with Chips',
    category: 'hot-roasts',
    originalPrice: 16.90,
    price: 14.90,
    save: 'Save $2.00',
    description: 'Tender slow-roasted beef drenched in rich homemade pan gravy packed into a soft warm bakery roll, accompanied by hot chips.',
    image: '/menu/roast-beef-roll.jpg',
    badge: 'Carvery Special',
    includes: 'Includes Hot Chips',
  },
  {
    id: 'lunch-calamari-pack',
    name: 'Crisp Calamari Rings & Chips Pack (6 Pcs)',
    category: 'fish-chips',
    originalPrice: 14.90,
    price: 12.90,
    save: 'Save $2.00',
    description: 'Six golden calamari rings seasoned with aromatic chicken salt, served with crunchy hot chips, creamy tartare and fresh lemon.',
    image: '/menu/calamari-chips.jpg',
    badge: 'Seafood Special',
    includes: 'Includes Chips & Lemon',
  },
];

export default function LunchSpecialsModal({ isOpen, onClose, onAddToCart, onOpenCart }) {
  const [addedIds, setAddedIds] = useState({});
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const scrollContainerRef = useRef(null);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    setCanScrollUp(scrollTop > 20);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 20);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAdd = (special) => {
    if (onAddToCart) {
      onAddToCart({
        id: special.id,
        name: special.name,
        price: special.price,
        description: special.description,
        image: special.image,
      });
    }

    setAddedIds((prev) => ({ ...prev, [special.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [special.id]: false }));
    }, 1200);
  };

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  const scrollDown = () => {
    scrollContainerRef.current?.scrollBy({ top: 300, behavior: 'smooth' });
  };

  const scrollUp = () => {
    scrollContainerRef.current?.scrollBy({ top: -300, behavior: 'smooth' });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Homers Emerton Lunch Specials"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onWheel={handleWheel}
        className="relative w-full max-w-4xl bg-charcoal text-cream rounded-[28px] border border-orange-burnt/30 shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[88vh] h-[90vh] sm:h-[88vh] flex flex-col"
      >
        {/* Header Section (Fixed at top) */}
        <div className="relative p-5 sm:p-7 bg-gradient-to-r from-charcoal via-charcoal-50 to-charcoal border-b border-cream/10 shrink-0 select-none">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-cream/10 hover:bg-orange-burnt text-cream transition-colors cursor-pointer"
            aria-label="Close lunch specials modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3 pr-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-chilli text-white text-xs font-bold uppercase tracking-wider shadow">
              <Flame className="w-3.5 h-3.5" />
              HOT DEALS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal text-orange-glow border border-orange-burnt/40 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-orange-burnt" />
              Daily 11:00 AM – 2:00 PM
            </span>

            {/* Quick Interactive Scroll Controls */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={scrollUp}
                disabled={!canScrollUp}
                title="Scroll up"
                className="p-1 rounded-full bg-cream/10 hover:bg-orange-burnt disabled:opacity-20 disabled:pointer-events-none text-cream transition-all cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollDown}
                disabled={!canScrollDown}
                title="Scroll down"
                className="p-1 rounded-full bg-cream/10 hover:bg-orange-burnt disabled:opacity-20 disabled:pointer-events-none text-cream transition-all cursor-pointer animate-pulse"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={canScrollDown ? scrollDown : scrollUp}
                className="text-xs text-orange-glow hover:text-white bg-charcoal hover:bg-orange-burnt px-2.5 py-1 rounded-full border border-orange-burnt/40 transition-colors font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>{canScrollDown ? "Scroll ↓" : "Top ↑"}</span>
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-cream">
            Weekday Lunch Specials
          </h2>
          <p className="text-cream/70 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Fast, hot, and made to order from just <strong className="text-orange-glow">$12.90 AUD</strong>.
            Available for in-store pickup or takeaway counter order!
          </p>
        </div>

        {/* Scrollable Specials Grid (Genuinely scrollable with custom sleek scrollbar) */}
        <div
          ref={scrollContainerRef}
          id="lunch-specials-scroll-container"
          tabIndex={0}
          className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-4 overscroll-contain focus:outline-none relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
            {LUNCH_SPECIALS.map((item) => {
              const isAdded = !!addedIds[item.id];
              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-charcoal-50 border border-cream/10 hover:border-orange-burnt/40 transition-all p-4 flex flex-col justify-between shadow-sm hover:shadow-warm"
                >
                  <div className="flex gap-4">
                    {/* Dish Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-charcoal flex-shrink-0 border border-cream/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {item.badge && (
                        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-orange-burnt text-white text-[10px] font-bold tracking-wide uppercase shadow">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Dish Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h3 className="font-semibold text-cream text-sm sm:text-base leading-snug">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-cream/60 text-xs line-clamp-2 leading-relaxed mb-2">
                        {item.description}
                      </p>

                      <div className="inline-block text-[11px] font-mono text-orange-glow bg-orange-burnt/10 px-2 py-0.5 rounded-md border border-orange-burnt/20">
                        {item.includes}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-3 pt-3 border-t border-cream/10 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl font-bold text-orange-glow font-mono">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-cream/40 line-through font-mono">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                      {item.save && (
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                          {item.save}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-orange-burnt hover:bg-orange-600 text-white active:scale-95 shadow-warm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Floating Scroll Button when more specials are below */}
          {canScrollDown && (
            <div className="sticky bottom-2 flex justify-center pointer-events-none mt-2">
              <button
                type="button"
                onClick={scrollDown}
                className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-burnt/95 hover:bg-orange-600 text-white text-xs font-bold shadow-xl border border-white/20 active:scale-95 transition-all animate-bounce cursor-pointer"
              >
                <span>Scroll for more lunch specials</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions (Fixed at bottom) */}
        <div className="p-4 sm:p-5 bg-charcoal border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-cream/70">
            <Sparkles className="w-4 h-4 text-orange-burnt flex-shrink-0" />
            <span>Craving full meal options, whole roasts, or custom burgers?</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium border border-cream/15 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-orange-burnt" />
              <span>Call Counter</span>
            </a>

            <Link
              to="/menu"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-orange-burnt hover:bg-orange-600 text-white text-xs font-semibold shadow-warm transition-all cursor-pointer active:scale-95"
            >
              <span>Explore Full Takeaway Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
