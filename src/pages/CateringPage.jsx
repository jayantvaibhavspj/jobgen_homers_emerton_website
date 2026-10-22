import React, { useState } from 'react';
import { Sparkles, AlertCircle, MessageSquare, Phone, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { SHOP_INFO } from '../config';
import PageBanner from '../components/banner/PageBanner';

export default function CateringPage() {
  const [eventDate, setEventDate] = useState('');
  const [guests, setGuests] = useState('30');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [selectedTrays, setSelectedTrays] = useState({
    'salad-caesar': 1,
    'salad-greek': 1,
    'roast-chicken': 2,
    'roast-pork': 1,
    'finger-food': 1,
  });

  const cateringOptions = [
    { id: 'salad-caesar', name: 'Fresh Caesar Salad Tray', price: 65.00, serves: 'Serves 15–20', type: 'Salads' },
    { id: 'salad-greek', name: 'Traditional Greek Feta Salad Tray', price: 60.00, serves: 'Serves 15–20', type: 'Salads' },
    { id: 'salad-coleslaw', name: 'Creamy Crunchy Coleslaw Tray', price: 55.00, serves: 'Serves 15–20', type: 'Salads' },
    { id: 'roast-chicken', name: 'Seasoned Roast Chicken Platter (5 Whole Chickens, Quartered)', price: 95.00, serves: 'Serves 15–20', type: 'Hot Meats' },
    { id: 'roast-pork', name: 'Crispy Crackling Roast Pork Tray with Gravy', price: 120.00, serves: 'Serves 15–20', type: 'Hot Meats' },
    { id: 'roast-beef', name: 'Slow-Roast Tender Beef in Pan Gravy', price: 115.00, serves: 'Serves 15–20', type: 'Hot Meats' },
    { id: 'finger-food', name: 'Golden Hot Bites Platter (Potato Scallops, Calamari, Battered Savs)', price: 75.00, serves: 'Serves 20–25', type: 'Finger Food' },
    { id: 'chips-tray', name: 'Mega Deep-Dish Hot Chips with Chicken Salt', price: 45.00, serves: 'Serves 20–25', type: 'Sides' },
  ];

  const handleTrayChange = (id, delta) => {
    setSelectedTrays((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const calculatedTotal = Object.entries(selectedTrays).reduce((sum, [id, qty]) => {
    const opt = cateringOptions.find((o) => o.id === id);
    return sum + (opt ? opt.price * qty : 0);
  }, 0);

  const handleSendCateringWhatsApp = () => {
    let itemsText = Object.entries(selectedTrays)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const opt = cateringOptions.find((o) => o.id === id);
        return `• ${qty}x ${opt?.name} ($${((opt?.price || 0) * qty).toFixed(2)})`;
      })
      .join('\n');

    let msg = `*🎉 CATERING ENQUIRY - HOMERS EMERTON*\n`;
    msg += `------------------------------------\n`;
    msg += `*Name:* ${contactName || 'Valued Customer'}\n`;
    msg += `*Phone:* ${contactPhone || 'Provided upon confirmation'}\n`;
    msg += `*Event Date:* ${eventDate || 'To be discussed (4+ days notice)'}\n`;
    msg += `*Estimated Guests:* ${guests} people\n`;
    msg += `------------------------------------\n`;
    msg += `*Selected Catering Trays:*\n${itemsText || 'Custom menu consultation'}\n`;
    msg += `------------------------------------\n`;
    msg += `*Estimated Food Total:* $${calculatedTotal.toFixed(2)} AUD\n`;
    msg += `------------------------------------\n`;
    msg += `Please let me know availability and pickup time for Shop 2 Popondetta Rd, Emerton NSW.`;

    const url = `https://wa.me/${SHOP_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* 1. HEADER BANNER [DARK SECTION] */}
      <PageBanner
        variant="catering"
        badgeIcon={Sparkles}
        badgeText="Family & Corporate Celebrations"
        title="Party & Event Catering"
        subtitle="From birthdays and sporting club presentations to backyard family feasts. Generous trays of roasts, fresh salads, and hot party finger food."
        className="py-16 px-4 sm:px-6 text-center"
      >
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center gap-2 text-xs text-amber-300 bg-amber-950/60 px-4 py-2 rounded-full border border-amber-500/30 animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span><strong>Notice:</strong> All catering orders require a minimum of <strong>4 days advance notification</strong>.</span>
          </div>
        </div>
      </PageBanner>

      {/* 2. MAIN INTERACTIVE CATERING CALCULATOR FORM [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-b border-charcoal/10">
        <div className="max-w-5xl mx-auto card-box rounded-[28px] p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold card-box-heading mb-6">
            Build Your Event Catering Quote
          </h2>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 pb-8 border-b border-charcoal/10">
            <div>
              <label className="block text-xs text-charcoal/70 mb-1 font-medium">Your Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Sarah Miller"
                className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/70 mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="e.g. 0412 345 678"
                className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/70 mb-1 font-medium">Preferred Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/70 mb-1 font-medium">Guest Count</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="e.g. 30"
                className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
              />
            </div>
          </div>

          {/* Tray Options Grid */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-orange-burnt font-mono">
              Select Catering Trays & Quantities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cateringOptions.map((opt) => {
                const qty = selectedTrays[opt.id] || 0;
                return (
                  <div
                    key={opt.id}
                    className="p-4 rounded-xl bg-charcoal/5 border border-charcoal/10 flex items-center justify-between gap-4 hover:border-orange-burnt/30 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] text-orange-burnt font-mono uppercase font-bold block">
                        {opt.type} • {opt.serves}
                      </span>
                      <h4 className="font-semibold text-charcoal text-xs sm:text-sm leading-tight mt-0.5">
                        {opt.name}
                      </h4>
                      <span className="text-xs font-mono text-charcoal/70 font-bold">
                        ${opt.price.toFixed(2)} AUD
                      </span>
                    </div>

                    <div className="flex items-center card-inner-box border rounded-full px-2 py-1 shadow-sm">
                      <button
                        onClick={() => handleTrayChange(opt.id, -1)}
                        className="px-2 py-0.5 hover:text-orange-burnt text-sm font-bold card-box-heading"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold card-box-heading text-xs">{qty}</span>
                      <button
                        onClick={() => handleTrayChange(opt.id, 1)}
                        className="px-2 py-0.5 hover:text-orange-burnt text-sm font-bold card-box-heading"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculation Summary Bar */}
          <div className="p-6 rounded-2xl bg-charcoal text-cream flex flex-col sm:flex-row items-center justify-between gap-6 shadow-warm">
            <div>
              <span className="text-xs text-cream/60 uppercase tracking-wider block">Estimated Catering Total</span>
              <div className="text-3xl font-serif font-bold text-orange-glow">
                ${calculatedTotal.toFixed(2)}{' '}
                <span className="text-sm font-sans text-cream/50">AUD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSendCateringWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-warm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send WhatsApp Catering Ticket</span>
              </button>

              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs sm:text-sm font-medium border border-cream/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-burnt" />
                <span>Call (02) 9677 1188</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CATERING STANDARDS & PEACE OF MIND [DARK SECTION] */}
      <div className="bg-charcoal text-cream py-16 px-4 sm:px-6 border-t border-cream/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-charcoal-50 border border-cream/10">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <h4 className="font-serif font-bold text-lg text-cream mb-1">Cooked Fresh for Event</h4>
            <p className="text-xs text-cream/70 leading-relaxed">
              Nothing sits in warming trays overnight. Your meats are pulled straight from the rotisserie for your agreed pickup time.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-charcoal-50 border border-cream/10">
            <ShieldCheck className="w-8 h-8 text-orange-burnt mx-auto mb-3" />
            <h4 className="font-serif font-bold text-lg text-cream mb-1">Hot Foil Insulated Packaging</h4>
            <p className="text-xs text-cream/70 leading-relaxed">
              All platters are packed in heavy-duty food service catering trays with snap-tight foil lids to keep steam and heat locked in.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-charcoal-50 border border-cream/10">
            <Heart className="w-8 h-8 text-chilli mx-auto mb-3" />
            <h4 className="font-serif font-bold text-lg text-cream mb-1">Western Sydney Values</h4>
            <p className="text-xs text-cream/70 leading-relaxed">
              Honest family prices and big Aussie portions so every single guest leaves satisfied and well-fed.
            </p>
          </div>
        </div>
      </div>

      {/* 4. FAST DIRECT CONSULTATION CALLOUT [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-14 px-4 sm:px-6 border-t border-charcoal/10 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mb-2">
            Have Special Dietary Requirements or Custom Platter Requests?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 mb-6">
            Speak directly with our Emerton head chef. We can tailor halal-certified chicken, gluten-free salads, or custom finger food mixes.
          </p>
          <a
            href={`tel:${SHOP_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm shadow-warm transition-transform active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>Call Store Catering Desk: (02) 9677 1188</span>
          </a>
        </div>
      </div>
    </div>
  );
}
