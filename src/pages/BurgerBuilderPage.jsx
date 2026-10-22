import React from 'react';
import BurgerBuilder from '../components/BurgerBuilder';
import { Flame, ArrowRight, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageBanner from '../components/banner/PageBanner';

export default function BurgerBuilderPage({ onAddToCart }) {
  return (
    <div className="pt-24 min-h-screen">
      {/* 1. HEADER BANNER [DARK SECTION] */}
      <PageBanner
        variant="builder"
        badgeIcon={Flame}
        badgeText="Interactive Custom Craft"
        title="The Burger Builder"
        subtitle="Design your ultimate stack! As you scroll, fresh Angus patties, smoky bacon rashers, and melted cheeses drop onto your brioche bun with realistic physics."
        className="py-14 px-4 sm:px-6 text-center"
      />

      {/* 2. MAIN INTERACTIVE BUILDER WORKSPACE [LIGHT SECTION] */}
      <BurgerBuilder theme="light" onAddToCart={onAddToCart} />

      {/* 3. QUALITY GUARANTEES BAR [DARK SECTION] */}
      <div className="bg-charcoal text-cream py-16 px-4 sm:px-6 border-t border-cream/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-charcoal-50 border border-cream/10">
            <span className="text-3xl mb-3 block">🥩</span>
            <h4 className="font-serif font-bold text-lg text-cream mb-1">100% Grass-Fed Angus</h4>
            <p className="text-xs text-cream/60 leading-relaxed">Flame-grilled hot to seal in natural juices and rich smoky flavour.</p>
          </div>
          <div className="p-6 rounded-2xl bg-charcoal-50 border border-cream/10">
            <span className="text-3xl mb-3 block">🥯</span>
            <h4 className="font-serif font-bold text-lg text-cream mb-1">Bakery Milk Brioche</h4>
            <p className="text-xs text-cream/60 leading-relaxed">Toasted on the flat grill with a dab of butter for a pillowy bite.</p>
          </div>
          <div className="p-6 rounded-2xl bg-charcoal-50 border border-cream/10">
            <span className="text-3xl mb-3 block">🍟</span>
            <h4 className="font-serif font-bold text-lg text-cream mb-1">Secret Chicken Salt</h4>
            <p className="text-xs text-cream/60 leading-relaxed">Pair your burger with our famous crunchy seasoned hot chips.</p>
          </div>
        </div>
      </div>

      {/* 4. EXPLORE FULL MENU CALLOUT [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-14 px-4 sm:px-6 border-t border-charcoal/10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-burnt/10 text-orange-burnt text-xs font-mono font-bold mb-3">
            <Utensils className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Hungry for More?</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mb-3">
            Pair Your Burger with Seafood, Roasts & Shakes
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 mb-6">
            From crispy battered fish & chips to our whole rotisserie roast chicken dinner deals.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm shadow-warm transition-transform active:scale-95"
          >
            <span>Browse Full Takeaway Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
