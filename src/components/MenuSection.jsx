import React, { useState, useMemo } from 'react';
import { Plus, Check, Sparkles, Search } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../config';

export default function MenuSection({ onAddToCart, cartCount, cartTotal, onOpenCart, onOpenCatering }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState({});

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;

    // Filter by Category
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  const handleAdd = (item) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 900);
  };

  return (
    <section id="menu" className="relative bg-cream text-charcoal py-24 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-burnt/10 border border-orange-burnt/25 text-orange-burnt text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Handmade Takeaway Menu</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-charcoal tracking-tight mb-4">
            Our Full Menu
          </h2>
          <p className="text-charcoal/70 text-sm sm:text-base">
            From our sizzling hot grill to crispy battered catches and slow-braised curries.
            All prices in AUD and prepared fresh to order.
          </p>
        </div>

        {/* Search & Catering Banner Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, fish, chips, curry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-charcoal/15 text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-orange-burnt shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/40 hover:text-charcoal"
              >
                ✕
              </button>
            )}
          </div>

          {/* Catering Shortcut Button (Golden Kim idea) */}
          <button
            onClick={onOpenCatering}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-orange-burnt/10 hover:bg-orange-burnt text-orange-burnt hover:text-white border border-orange-burnt/30 text-xs font-semibold transition-all duration-200"
          >
            <span>🎉 Planning an event? Party Catering Trays</span>
            <span className="text-[10px] bg-orange-burnt text-white px-2 py-0.5 rounded-full font-bold">
              Quote
            </span>
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt ${
                  isActive
                    ? 'bg-charcoal text-cream shadow-warm scale-105'
                    : 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/80'
                }`}
              >
                {cat.emoji && <span>{cat.emoji}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Dish Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-charcoal/10 p-8">
            <p className="text-xl font-serif text-charcoal mb-2">No dishes match your search</p>
            <p className="text-xs text-charcoal/60 mb-4">
              Try searching for something else like "burger", "chips", or "curry".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2 rounded-full bg-orange-burnt text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => {
              const isAdded = !!addedItemIds[dish.id];

              return (
                <div
                  key={dish.id}
                  className="group flex flex-col justify-between bg-white rounded-[20px] overflow-hidden border border-charcoal/10 shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Top Image & Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/5">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                      loading="lazy"
                    />
                    {/* Fallback Container */}
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-charcoal-100 to-charcoal-200 flex-col items-center justify-center text-4xl">
                      <span>{dish.emoji || '🍽️'}</span>
                      <span className="text-xs text-cream/70 mt-1 font-medium font-sans">
                        {dish.name}
                      </span>
                    </div>

                    {/* Badge */}
                    {dish.badge && (
                      <div className="absolute top-3 left-3 bg-charcoal/90 text-cream text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm border border-cream/20">
                        {dish.badge}
                      </div>
                    )}

                    {/* Price Tag in Image */}
                    <div className="absolute bottom-3 right-3 bg-cream/95 text-charcoal font-serif font-bold text-base px-3 py-1 rounded-full shadow-md border border-charcoal/10">
                      ${dish.price.toFixed(2)} AUD
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal mb-2 leading-snug group-hover:text-orange-burnt transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-charcoal/70 text-xs sm:text-sm leading-relaxed mb-4">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between">
                      <span className="text-xs text-charcoal/50 font-mono">
                        Made Fresh to Order
                      </span>

                      <button
                        onClick={() => handleAdd(dish)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-orange-burnt hover:bg-orange-600 text-white shadow-warm'
                        }`}
                        aria-label={`Add ${dish.name} to order`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FLOATING CART BUTTON (When items are in cart) */}
        {cartCount > 0 && (
          <div className="sticky bottom-20 lg:bottom-8 z-30 flex justify-center mt-12 pointer-events-none">
            <button
              onClick={onOpenCart}
              className="pointer-events-auto inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-charcoal text-cream hover:bg-orange-burnt shadow-warm-lg hover:shadow-glow-orange font-semibold text-sm sm:text-base border border-cream/20 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="w-6 h-6 rounded-full bg-orange-burnt text-white flex items-center justify-center text-xs font-bold">
                {cartCount}
              </div>
              <span>View Order · ${cartTotal.toFixed(2)} AUD</span>
              <span className="text-xs bg-cream/10 px-2.5 py-1 rounded-full text-orange-glow">
                Checkout →
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
