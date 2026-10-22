import React from 'react';
import { ShoppingBag, Phone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import HowToOrder from '../components/HowToOrder';
import { SHOP_INFO } from '../config';

import PageBanner from '../components/banner/PageBanner';

export default function OrderOnlinePage({ onOpenCart }) {
  return (
    <div className="pt-24 min-h-screen">
      {/* 1. HEADER BANNER [DARK SECTION] */}
      <PageBanner
        variant="order"
        badgeIcon={ShoppingBag}
        badgeText="Pickup & Delivery Options"
        title="Order Homers Online"
        subtitle="Choose direct pickup to support local family business with zero middleman markups, or get convenient doorstep delivery via our delivery partners."
        className="py-16 px-4 sm:px-6 text-center"
      />

      {/* 2. MAIN ORDERING CHANNELS GRID [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. DIRECT PICKUP (RECOMMENDED) */}
            <div className="rounded-[28px] card-box border-2 border-orange-burnt p-8 flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-burnt text-white text-[11px] font-bold font-mono uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                ★ Recommended & Zero Markup
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-3xl">🥡</span>
                  <span className="text-xs font-mono text-orange-burnt bg-orange-burnt/10 px-2.5 py-1 rounded-full border border-orange-burnt/30 font-bold">
                    Direct Kitchen
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold card-box-heading mb-2">
                  Direct Store Pickup
                </h2>
                <p className="card-box-body text-xs sm:text-sm leading-relaxed mb-6">
                  Build your cart right here on our website and send directly to our kitchen via WhatsApp or call us.
                  Ready in 15–20 minutes, piping hot!
                </p>

                <div className="space-y-2.5 text-xs card-box-body mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Cheapest in-store menu pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Custom burger builder & notes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Collect hot at Shop 2, 135 Popondetta Rd</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onOpenCart}
                  className="w-full py-3.5 px-6 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-warm transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Open Cart & Place Order</span>
                </button>

                <Link
                  to="/menu"
                  className="w-full py-2.5 px-6 rounded-full bg-charcoal/5 hover:bg-charcoal/10 text-charcoal font-medium text-xs border border-charcoal/15 transition-colors flex items-center justify-center card-box-heading"
                >
                  Browse Full Menu First
                </Link>
              </div>
            </div>

            {/* 2. UBER EATS */}
            <div className="rounded-[28px] card-box p-8 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🚗</span>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300 font-bold">
                    Uber Eats
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold card-box-heading mb-2">
                  Uber Eats Delivery
                </h2>
                <p className="card-box-body text-xs sm:text-sm leading-relaxed mb-6">
                  Direct doorstep delivery with Uber One benefits. Perfect when you're chilling at home or hosting friends.
                </p>

                <div className="space-y-2.5 text-xs card-box-body mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
                    <span>Delivered in 25–40 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
                    <span>Live GPS courier tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
                    <span>Contactless drop-off available</span>
                  </div>
                </div>
              </div>

              <a
                href={SHOP_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#06C167] hover:bg-[#05a85a] active:scale-95 text-black font-bold text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Order on Uber Eats</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* 3. DOORDASH */}
            <div className="rounded-[28px] card-box p-8 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🛵</span>
                  <span className="text-xs font-mono text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-300 font-bold">
                    DoorDash
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold card-box-heading mb-2">
                  DoorDash Delivery
                </h2>
                <p className="card-box-body text-xs sm:text-sm leading-relaxed mb-6">
                  DoorDash DashPass members can enjoy reduced service fees and quick delivery across Western Sydney.
                </p>

                <div className="space-y-2.5 text-xs card-box-body mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
                    <span>DoorDash DashPass eligible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
                    <span>Group ordering supported</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
                    <span>Special app promotions</span>
                  </div>
                </div>
              </div>

              <a
                href={SHOP_INFO.doorDashUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#FF3008] hover:bg-[#e02805] active:scale-95 text-white font-bold text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Order on DoorDash</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CALL-IN ORDER HOTLINE BANNER [DARK SECTION] */}
      <div className="bg-charcoal text-cream py-16 px-4 sm:px-6 border-t border-cream/10">
        <div className="max-w-5xl mx-auto rounded-[28px] bg-charcoal-50 border border-cream/15 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-warm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-burnt/20 border border-orange-burnt/40 flex items-center justify-center text-orange-glow flex-shrink-0">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-cream">Prefer to Call Your Order In?</h3>
              <p className="text-cream/70 text-xs sm:text-sm mt-0.5">
                Speak directly with our Emerton counter staff. We start prepping as soon as you hang up!
              </p>
            </div>
          </div>

          <a
            href={`tel:${SHOP_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cream text-charcoal hover:bg-cream/90 font-bold text-sm shadow-warm transition-transform active:scale-95 flex-shrink-0"
          >
            <Phone className="w-4 h-4 text-orange-burnt" />
            <span>Call (02) 9677 1188</span>
          </a>
        </div>
      </div>

      {/* 4. HOW TO ORDER [LIGHT SECTION] */}
      <HowToOrder theme="light" />
    </div>
  );
}
