import React from 'react';
import { Link } from 'react-router-dom';
import MenuSection from '../components/MenuSection';
import StoreMenuBoards from '../components/StoreMenuBoards';
import { Utensils, Sparkles, Phone, ArrowRight, ShoppingBag } from 'lucide-react';
import { SHOP_INFO } from '../config';

import PageBanner from '../components/banner/PageBanner';

export default function MenuPage({ onAddToCart, cartCount, cartTotal, onOpenCart, onOpenCatering }) {
  return (
    <div className="pt-24 min-h-screen">
      {/* 1. PAGE HERO BANNER [DARK SECTION] */}
      <PageBanner
        variant="menu"
        bgPhoto="/homeslide.jpg"
        badgeIcon={Utensils}
        badgeText="Freshly Prepared Daily"
        title="Takeaway & Dine Menu"
        subtitle="From flame-grilled Angus burgers and wild-caught crumbed fish to hot roast chickens and fragrant curries. All prices in AUD."
        className="py-16 px-4 sm:px-6 text-center"
      />

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
