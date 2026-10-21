import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, CreditCard, Navigation, Star, CheckCircle2 } from 'lucide-react';
import { SHOP_INFO, OPERATING_HOURS, CUSTOMER_REVIEWS } from '../config';
import { getShopStatus } from '../utils/sydneyTime';

export default function FindUs() {
  const [shopStatus, setShopStatus] = useState({ isOpen: true, label: '', todayIndex: 0 });

  useEffect(() => {
    setShopStatus(getShopStatus());
  }, []);

  return (
    <section id="find-us" className="relative bg-charcoal-50 py-24 px-4 sm:px-6 overflow-hidden border-t border-cream/10">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream/10 border border-cream/20 text-orange-glow text-xs uppercase tracking-widest font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Visit Us in Western Sydney</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-cream mb-4">
            Find Us & Hours
          </h2>
          <p className="text-cream/70 text-sm sm:text-base">
            Located conveniently on Popondetta Road with ample free parking right out front.
            Hot meals ready for takeaway, carvery, and catering pick-ups.
          </p>
        </div>

        {/* Main Grid: Left Hours & Contact, Right Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* LEFT: ADDRESS, PHONE, HOURS TABLE, PAYMENTS */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Box */}
            <div className="p-6 rounded-[20px] bg-charcoal border border-cream/10 shadow-warm space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-burnt flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-cream">Store Address</h3>
                  <p className="text-cream/70 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {SHOP_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-cream/10">
                <Phone className="w-5 h-5 text-orange-burnt flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-cream">Phone Enquiries & Phone Orders</h3>
                  <a
                    href={`tel:${SHOP_INFO.phoneRaw}`}
                    className="text-lg font-serif font-bold text-orange-glow hover:underline block mt-0.5"
                  >
                    {SHOP_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <a
                  href={`tel:${SHOP_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-orange-burnt hover:bg-orange-600 text-white text-xs font-semibold shadow transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-semibold border border-cream/20 transition-all active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table (Highlights Today in Sydney time) */}
            <div className="p-6 rounded-[20px] bg-charcoal border border-cream/10 shadow-warm">
              <div className="flex items-center justify-between pb-3 border-b border-cream/10 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-burnt" />
                  <h3 className="text-sm font-semibold text-cream">Operating Hours</h3>
                </div>
                <span className="text-[11px] font-mono text-orange-glow bg-orange-burnt/15 px-2.5 py-0.5 rounded-full border border-orange-burnt/30">
                  {shopStatus.label}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {OPERATING_HOURS.schedule.map((item, idx) => {
                  const isToday = shopStatus.todayIndex === idx;
                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-lg transition-colors ${
                        isToday
                          ? 'bg-orange-burnt/20 border border-orange-burnt/40 text-cream font-bold'
                          : 'text-cream/70 hover:bg-cream/5'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-orange-burnt" />}
                        <span>{item.day}</span>
                        {isToday && <span className="text-[10px] text-orange-glow font-mono">(Today)</span>}
                      </span>
                      <span className="font-mono">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Accepted Payments */}
              <div className="mt-6 pt-4 border-t border-cream/10 flex flex-col gap-2">
                <span className="text-[11px] text-cream/50 uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Accepted Payments in Store</span>
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SHOP_INFO.payments.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 rounded-md bg-cream/5 border border-cream/15 text-[11px] text-cream/80 font-mono"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE GOOGLE MAPS EMBED */}
          <div className="lg:col-span-7">
            <div className="rounded-[20px] overflow-hidden border border-cream/15 shadow-warm-lg bg-charcoal aspect-square sm:aspect-[4/3] lg:aspect-[16/14] relative">
              <iframe
                title="Homers Emerton Google Map Location"
                src={SHOP_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-charcoal/95 p-3 rounded-xl border border-cream/20 backdrop-blur-md flex items-center justify-between text-xs text-cream shadow-xl">
                <div>
                  <span className="font-bold block">Homers Emerton</span>
                  <span className="text-cream/60 text-[11px]">Shop 2, 135-137 Popondetta Rd</span>
                </div>
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-orange-burnt text-white font-medium hover:bg-orange-600 transition-colors"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS SLIDER / CARDS */}
        <div className="pt-10 border-t border-cream/10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-cream">
              Loved by the Emerton Community
            </h3>
            <p className="text-cream/60 text-xs sm:text-sm mt-1">
              4.1 Stars across 250+ Google Reviews
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CUSTOMER_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-charcoal border border-cream/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-cream/80 text-xs sm:text-sm leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-2 border-t border-cream/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-cream">{rev.name}</span>
                  <span className="text-orange-glow text-[11px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
