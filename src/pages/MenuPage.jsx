import React from 'react';
import { Link } from 'react-router-dom';
import MenuSection from '../components/MenuSection';
import StoreMenuBoards from '../components/StoreMenuBoards';
import { Utensils, Sparkles, Phone, ArrowRight, ShoppingBag } from 'lucide-react';
import { SHOP_INFO } from '../config';

export default function MenuPage({ onAddToCart, cartCount, cartTotal, onOpenCart, onOpenCatering }) {
  return (
    <div className="pt-24 min-h-screen">
      {/* 1. PAGE HERO BANNER [DARK SECTION] */}
      <div className="bg-charcoal text-cream py-16 px-4 sm:px-6 text-center border-b border-cream/10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <img
            src="/homeslide.jpg"
            alt="Menu Banner"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream/10 border border-cream/20 text-orange-glow text-xs uppercase tracking-widest font-semibold mb-3">
            <Utensils className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Freshly Prepared Daily</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-cream mb-4">
            Takeaway & Dine Menu
          </h1>
          <p className="text-cream/70 text-sm sm:text-base max-w-xl mx-auto">
            From flame-grilled Angus burgers and wild-caught crumbed fish to hot roast chickens and fragrant curries.
            All prices in AUD.
          </p>
        </div>
      </div>

      {/* 2. MAIN MENU COMPONENT WITH CATEGORY FILTERS & DISH CARDS [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal">
        <MenuSection
          onAddToCart={onAddToCart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          onOpenCart={onOpenCart}
          onOpenCatering={onOpenCatering}
        />
      </div>

      {/* 3. OFFICIAL IN-STORE MENU BOARDS [DARK SECTION] */}
      <div className="bg-charcoal text-cream border-t border-cream/10">
        <StoreMenuBoards />
      </div>

      {/* 4. FAST PICKUP & CATERING INQUIRY CALLOUT [LIGHT SECTION] */}
      <section className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-t border-charcoal/10">
        <div className="max-w-5xl mx-auto rounded-[24px] bg-white border border-charcoal/10 p-8 sm:p-10 shadow-warm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-burnt/10 text-orange-burnt text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-burnt" />
              <span>Planning an Event?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
              Hosting a Party or Family Gathering?
            </h3>
            <p className="text-charcoal/70 text-xs sm:text-sm mt-1 max-w-xl">
              Order party trays of roast meats, salads, and hot bites with 4-day notice.
              Or call our shop counter directly for quick phone orders!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/catering"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-warm transition-all flex items-center justify-center gap-2"
            >
              <span>View Catering Trays</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-charcoal/5 hover:bg-charcoal/10 text-charcoal font-medium text-xs sm:text-sm border border-charcoal/15 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-orange-burnt" />
              <span>(02) 9677 1188</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
