import React, { useState } from 'react';
import { STORE_MENU_BOARDS } from '../config';
import { Eye, X, ZoomIn, FileText, ExternalLink } from 'lucide-react';

export default function StoreMenuBoards() {
  const [activeBoard, setActiveBoard] = useState(null);

  return (
    <section className="bg-charcoal py-20 px-4 sm:px-6 border-t border-cream/10 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-burnt/15 border border-orange-burnt/30 text-orange-glow text-xs uppercase tracking-widest font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Direct from our Store</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-cream mb-4">
            Official In-Store Menu Boards
          </h2>
          <p className="text-cream/70 text-sm sm:text-base">
            These are the original printed wall menus displayed right inside our shop at Popondetta Road.
            Click any board to zoom in and browse all store combos & options.
          </p>
        </div>

        {/* 4 Menu Boards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORE_MENU_BOARDS.map((board) => (
            <div
              key={board.id}
              onClick={() => setActiveBoard(board)}
              className="group cursor-pointer bg-charcoal-50 rounded-[20px] overflow-hidden border border-cream/10 hover:border-orange-burnt/50 shadow-warm transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[3/4] bg-charcoal-100 overflow-hidden">
                <img
                  src={board.image}
                  alt={board.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="px-4 py-2 rounded-full bg-orange-burnt text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                    <span>Click to Zoom</span>
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-charcoal/90 text-orange-glow border border-orange-burnt/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                  Board {board.id}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-cream group-hover:text-orange-glow transition-colors leading-snug">
                  {board.title}
                </h3>
                <span className="text-[11px] text-cream/50 mt-1 block">
                  Tap to view full resolution
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Real Food Banner Feature: Chicken Deal */}
        <div className="mt-12 rounded-[24px] overflow-hidden bg-gradient-to-r from-charcoal-50 to-charcoal border border-cream/15 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-warm-lg">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs uppercase tracking-wider text-orange-glow font-mono font-semibold">
              Authentic Homers Takeaway Feast
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-cream leading-tight">
              Real Food, Real Portions, Real Value.
            </h3>
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed max-w-xl">
              Photographed right here at Homers Emerton: whole hot roast chickens seasoned with our proprietary spice blend,
              piles of crunchy hot chips with chicken salt, and icy cold 1.25L family drinks ready to take home.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="px-6 py-2.5 rounded-full bg-orange-burnt hover:bg-orange-600 text-white text-xs font-semibold shadow-warm transition-transform active:scale-95"
              >
                Order Chicken Deal · $28.90 AUD
              </a>
              <a
                href="tel:+61296771188"
                className="px-5 py-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium border border-cream/20 transition-colors"
              >
                Call (02) 9677 1188
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-cream/20 shadow-xl group">
              <img
                src="/chicken-deal.jpg"
                alt="Homers Emerton Real Chicken Deal and Drinks"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeBoard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-cream/10 pb-4 max-w-5xl mx-auto w-full">
            <div>
              <h4 className="text-base sm:text-xl font-serif font-bold text-cream">
                {activeBoard.title}
              </h4>
              <p className="text-xs text-cream/50">Official store menu board photo</p>
            </div>
            <button
              onClick={() => setActiveBoard(null)}
              className="p-2.5 rounded-full bg-cream/10 hover:bg-orange-burnt text-cream hover:text-white transition-colors"
              aria-label="Close menu board preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Container with high-res zoom */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-auto">
            <img
              src={activeBoard.image}
              alt={activeBoard.title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-cream/20"
            />
          </div>

          {/* Bottom Bar */}
          <div className="text-center pt-2 max-w-5xl mx-auto w-full text-xs text-cream/60">
            Visit us in store at Shop 2, 135-137 Popondetta Rd, Emerton NSW to order directly at the counter.
          </div>
        </div>
      )}
    </section>
  );
}
