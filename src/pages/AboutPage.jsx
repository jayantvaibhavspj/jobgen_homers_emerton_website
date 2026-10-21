import React from 'react';
import { Heart, Flame, Award, Users, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CUSTOMER_REVIEWS } from '../config';

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* 1. HEADER BANNER [DARK SECTION] */}
      <div className="py-16 px-4 sm:px-6 text-center border-b border-cream/10 bg-charcoal text-cream relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-burnt/20 border border-orange-burnt/30 text-orange-glow text-xs uppercase tracking-widest font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-chilli fill-chilli" />
            <span>Family Tradition Since Day One</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-cream mb-4">
            Our 10+ Year Story
          </h1>
          <p className="text-cream/70 text-sm sm:text-base max-w-xl mx-auto">
            More than just a local takeaway — a beloved culinary haven rooted in family recipes,
            generous portions, and unwavering dedication to the Emerton community.
          </p>
        </div>
      </div>

      {/* 2. MAIN STORY & REAL FEAST PHOTOS [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-5 text-charcoal/80 text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal leading-tight">
                A Culinary Haven Rooted in Tradition & Flame-Grilled Pride
              </h2>
              <p>
                At <strong>HOMERS</strong>, we take pride in being more than just a quick-service stop. As we celebrate
                our milestone over 10 years in Emerton, we reflect on a journey that started with a simple passion:
                delivering exceptional, uncompromised flavours and creating memorable takeaway experiences for every family.
              </p>
              <p>
                What sets us apart is our relentless commitment to <strong>flame-grilled perfection</strong>. Our signature
                Angus beef patties are prepared with precision and seared over open flame for that mouth-watering smoky char.
                Our wild-caught fish fillets are freshly crumbed in panko every day, and our golden hot chips are dusted
                with our proprietary secret chicken salt recipe.
              </p>
              <p>
                From rotisserie whole chickens slow-roasted until juicy and tender, to slow-simmered butter curries and
                crisp garden salads, we cook every dish as if we were feeding our own family.
              </p>

              <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-charcoal">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-charcoal/10 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-orange-burnt" />
                  <span>100% Australian Beef</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-charcoal/10 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-orange-burnt" />
                  <span>Locally Sourced Produce</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-charcoal/10 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-orange-burnt" />
                  <span>10+ Years in Emerton</span>
                </div>
              </div>
            </div>

            {/* Real Photo Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[28px] overflow-hidden border border-charcoal/15 shadow-warm-lg bg-white p-3">
                <img
                  src="/homeslide.jpg"
                  alt="Homers Emerton Real Food Spread"
                  className="w-full h-auto rounded-2xl object-cover shadow"
                />
                <div className="p-4 text-center">
                  <span className="font-serif font-bold text-lg text-charcoal block">
                    The Homers Takeaway Feast
                  </span>
                  <span className="text-xs text-charcoal/60">
                    Photographed in-store at Shop 2, 135-137 Popondetta Rd, Emerton
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 3 PILLARS GRID [DARK SECTION] */}
      <div className="bg-charcoal text-cream py-16 px-4 sm:px-6 border-t border-cream/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[24px] bg-charcoal-50 border border-cream/10 shadow-warm">
            <Flame className="w-10 h-10 text-orange-burnt mb-4" />
            <h3 className="font-serif font-bold text-2xl text-cream mb-2">Flame-Grilled Fire</h3>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
              Real open flames create that distinctive smoky crust you can’t get on a standard flat-top grill.
            </p>
          </div>
          <div className="p-8 rounded-[24px] bg-charcoal-50 border border-cream/10 shadow-warm">
            <Award className="w-10 h-10 text-amber-400 mb-4" />
            <h3 className="font-serif font-bold text-2xl text-cream mb-2">Generous Portions</h3>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
              We believe in honest Australian takeaway value. Nobody leaves Homers hungry — that’s our promise.
            </p>
          </div>
          <div className="p-8 rounded-[24px] bg-charcoal-50 border border-cream/10 shadow-warm">
            <Users className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="font-serif font-bold text-2xl text-cream mb-2">Community First</h3>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
              Proudly supporting Western Sydney families, sports clubs, and events with hot catering trays.
            </p>
          </div>
        </div>
      </div>

      {/* 4. CUSTOMER TESTIMONIALS & CALL TO ACTION [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-t border-charcoal/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal mb-2">
              What Our Regulars Say
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/60">Verified reviews from our local community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {CUSTOMER_REVIEWS.slice(0, 2).map((rev, i) => (
              <div key={i} className="p-8 rounded-[24px] bg-white border border-charcoal/10 shadow-warm">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="italic text-charcoal/80 text-sm leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
                <div className="text-xs font-bold text-orange-burnt">
                  — {rev.name} ({rev.date})
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-semibold text-sm shadow-warm transition-transform active:scale-95"
            >
              <span>Explore Our Takeaway Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
