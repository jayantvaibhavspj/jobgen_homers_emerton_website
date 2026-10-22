import React, { useState } from 'react';
import { X, Calendar, Users, Check, MessageSquare, Phone, AlertCircle } from 'lucide-react';
import { SHOP_INFO } from '../config';

export default function CateringModal({ isOpen, onClose }) {
  const [eventDate, setEventDate] = useState('');
  const [guests, setGuests] = useState('25');
  const [selectedTrays, setSelectedTrays] = useState({
    'salad-caesar': 1,
    'roast-chicken': 2,
    'roast-pork': 1,
    'finger-food': 1,
  });
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  if (!isOpen) return null;

  const cateringOptions = [
    { id: 'salad-caesar', name: 'Fresh Caesar Salad Tray (Serves 15-20)', price: 65.00, type: 'Salads' },
    { id: 'salad-greek', name: 'Traditional Greek Salad Tray (Serves 15-20)', price: 60.00, type: 'Salads' },
    { id: 'roast-chicken', name: 'Seasoned Roast Chicken Platter (5 Whole Chickens, Quartered)', price: 95.00, type: 'Roast Meats' },
    { id: 'roast-pork', name: 'Crispy Crackling Pork Tray with Gravy (Serves 15-20)', price: 120.00, type: 'Roast Meats' },
    { id: 'roast-beef', name: 'Tender Slow-Roast Beef in Rich Pan Gravy', price: 115.00, type: 'Roast Meats' },
    { id: 'finger-food', name: 'Golden Hot Bites Platter (Potato Scallops, Calamari, Battered Savs)', price: 75.00, type: 'Finger Food' },
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Homers Party Catering Enquiry"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-charcoal text-cream rounded-[24px] border border-cream/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-cream/10 hover:bg-orange-burnt text-cream transition-colors"
          aria-label="Close catering modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-burnt/20 border border-orange-burnt/30 text-orange-glow text-xs uppercase tracking-wider font-semibold mb-2">
            <span>Event & Party Packs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cream">
            Homers Catering Calculator
          </h2>
          <div className="flex items-center gap-2 mt-2 text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Important:</strong> All catering orders require a minimum of <strong>4 days advance notification</strong>.
            </span>
          </div>
        </div>

        {/* Guest & Date Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs text-cream/70 mb-1 font-medium">Estimated Guests</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="e.g. 30"
              className="w-full px-4 py-2.5 rounded-xl bg-charcoal-50 border border-cream/15 text-sm text-cream focus:outline-none focus:border-orange-burnt"
            />
          </div>
          <div>
            <label className="block text-xs text-cream/70 mb-1 font-medium">Preferred Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-charcoal-50 border border-cream/15 text-sm text-cream focus:outline-none focus:border-orange-burnt"
            />
          </div>
        </div>

        {/* Trays Selection */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-cream uppercase tracking-wider font-mono">
            Select Catering Trays & Platters
          </h3>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {cateringOptions.map((opt) => {
              const qty = selectedTrays[opt.id] || 0;
              return (
                <div
                  key={opt.id}
                  className="p-3 rounded-xl bg-charcoal-50 border border-cream/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1">
                    <span className="text-[10px] text-orange-glow font-mono uppercase block">
                      {opt.type}
                    </span>
                    <span className="font-semibold text-cream">{opt.name}</span>
                    <span className="text-cream/50 ml-2 font-mono">${opt.price.toFixed(2)} AUD</span>
                  </div>

                  <div className="flex items-center bg-charcoal border border-cream/20 rounded-full px-2 py-0.5">
                    <button
                      onClick={() => handleTrayChange(opt.id, -1)}
                      className="px-1.5 py-0.5 hover:text-orange-burnt text-sm"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-cream">{qty}</span>
                    <button
                      onClick={() => handleTrayChange(opt.id, 1)}
                      className="px-1.5 py-0.5 hover:text-orange-burnt text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 pt-4 border-t border-cream/10">
          <input
            type="text"
            placeholder="Your Name / Organiser"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-charcoal-50 border border-cream/15 text-xs text-cream focus:outline-none focus:border-orange-burnt"
          />
          <input
            type="tel"
            placeholder="Contact Phone Number"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-charcoal-50 border border-cream/15 text-xs text-cream focus:outline-none focus:border-orange-burnt"
          />
        </div>

        {/* Estimated Total & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-charcoal-50 border border-cream/15">
          <div>
            <span className="text-xs text-cream/50 uppercase">Estimated Total</span>
            <div className="text-2xl font-serif font-bold text-orange-glow">
              ${calculatedTotal.toFixed(2)}{' '}
              <span className="text-xs font-sans text-cream/60">AUD</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSendCateringWhatsApp}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-warm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send WhatsApp Enquiry</span>
            </button>
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="p-3 rounded-full bg-cream/10 hover:bg-orange-burnt text-cream hover:text-white transition-colors"
              title="Call shop directly"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
