import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CreditCard, Navigation, CheckCircle2, Star } from 'lucide-react';
import { SHOP_INFO, OPERATING_HOURS, CUSTOMER_REVIEWS } from '../config';
import { getShopStatus } from '../utils/sydneyTime';

export default function ContactPage() {
  const [shopStatus, setShopStatus] = useState({ isOpen: true, label: '', todayIndex: 0 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setShopStatus(getShopStatus());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let msg = `*📬 CONTACT FORM ENQUIRY - HOMERS EMERTON*\n`;
    msg += `------------------------------------\n`;
    msg += `*Name:* ${formData.name}\n`;
    msg += `*Phone:* ${formData.phone}\n`;
    msg += `*Email:* ${formData.email || 'Not provided'}\n`;
    msg += `*Subject:* ${formData.subject}\n`;
    msg += `------------------------------------\n`;
    msg += `*Message:*\n${formData.message}\n`;

    const url = `https://wa.me/${SHOP_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* 1. HEADER BANNER [DARK SECTION] */}
      <div className="py-16 px-4 sm:px-6 text-center border-b border-cream/10 bg-charcoal text-cream relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-burnt/20 border border-orange-burnt/30 text-orange-glow text-xs uppercase tracking-widest font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-burnt" />
            <span>Western Sydney Store</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-cream mb-4">
            Contact & Find Us
          </h1>
          <p className="text-cream/70 text-sm sm:text-base max-w-xl mx-auto">
            Have a question about an order, catering, or dietary options?
            Call our team directly or visit our shop on Popondetta Road.
          </p>
        </div>
      </div>

      {/* 2. QUICK INFO CARDS [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Address */}
          <div className="p-8 rounded-[24px] bg-white border border-charcoal/10 shadow-warm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-burnt/10 flex items-center justify-center text-orange-burnt mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-charcoal mb-1">Our Location</h3>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-4">
                {SHOP_INFO.address}
              </p>
            </div>
            <a
              href={SHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-burnt hover:underline"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Driving Directions</span>
            </a>
          </div>

          {/* Card 2: Phone */}
          <div className="p-8 rounded-[24px] bg-white border border-charcoal/10 shadow-warm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-burnt/10 flex items-center justify-center text-orange-burnt mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-charcoal mb-1">Store Phone</h3>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-2">
                Order takeaway or check today's hot roasts.
              </p>
              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="text-2xl font-serif font-bold text-charcoal hover:text-orange-burnt transition-colors block"
              >
                {SHOP_INFO.phone}
              </a>
            </div>
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-burnt hover:underline mt-4"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Counter Staff</span>
            </a>
          </div>

          {/* Card 3: Hours Summary */}
          <div className="p-8 rounded-[24px] bg-white border border-charcoal/10 shadow-warm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-burnt/10 flex items-center justify-center text-orange-burnt mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif font-bold text-xl text-charcoal">Store Hours</h3>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 font-bold">
                  {shopStatus.label}
                </span>
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Mon–Wed & Sun: 10am – 8pm<br />
                Thu–Sat: 10am – 8:30pm
              </p>
            </div>
            <div className="text-[11px] text-charcoal/50 mt-4 flex items-center gap-1">
              <span>Sydney NSW Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OPERATING HOURS & INTERACTIVE GOOGLE MAP [DARK SECTION] */}
      <div className="bg-charcoal text-cream py-16 px-4 sm:px-6 border-t border-cream/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Operating Hours Table */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-[28px] bg-charcoal-50 border border-cream/10 shadow-warm">
            <div className="flex items-center justify-between pb-3 border-b border-cream/10 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-burnt" />
                <h3 className="text-base font-serif font-bold text-cream">Weekly Opening Schedule</h3>
              </div>
              <span className="text-xs font-mono text-orange-glow">
                {shopStatus.isOpen ? '🟢 Open Now' : '🔴 Closed'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {OPERATING_HOURS.schedule.map((item, idx) => {
                const isToday = shopStatus.todayIndex === idx;
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
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

          {/* Interactive Google Map */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] overflow-hidden border border-cream/15 shadow-warm-lg bg-charcoal aspect-square sm:aspect-[4/3] lg:aspect-[16/12] relative">
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
              <div className="absolute bottom-4 left-4 right-4 bg-charcoal/95 p-3.5 rounded-2xl border border-cream/20 backdrop-blur-md flex items-center justify-between text-xs text-cream shadow-xl">
                <div>
                  <span className="font-bold block">Homers Emerton</span>
                  <span className="text-cream/60 text-[11px]">Shop 2, 135-137 Popondetta Rd</span>
                </div>
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-orange-burnt text-white font-semibold hover:bg-orange-600 transition-colors"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CONTACT ENQUIRY FORM [LIGHT SECTION] */}
      <div className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-t border-charcoal/10">
        <div className="max-w-3xl mx-auto bg-white rounded-[28px] border border-charcoal/10 p-6 sm:p-10 shadow-warm-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-burnt/10 text-orange-burnt text-xs uppercase font-mono font-bold mb-2">
              <Mail className="w-3.5 h-3.5 text-orange-burnt" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-charcoal">Send Us a Direct Message</h2>
            <p className="text-charcoal/70 text-xs sm:text-sm mt-1">
              Fill out the form below to message our management team directly.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center max-w-lg mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-xl font-serif font-bold text-charcoal mb-2">Enquiry Sent!</h3>
              <p className="text-xs sm:text-sm text-charcoal/70 mb-4">
                Your message has been dispatched to our WhatsApp line. Our store team will respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full bg-charcoal text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/70 mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/70 mb-1 font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 0412 345 678"
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/70 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/70 mb-1 font-medium">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Catering Question">Catering Question</option>
                    <option value="Dietary or Allergen">Dietary or Allergen Question</option>
                    <option value="Feedback">Feedback on Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-charcoal/70 mb-1 font-medium">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need..."
                  className="w-full px-4 py-2.5 rounded-xl bg-charcoal/5 border border-charcoal/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-orange-burnt resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-warm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message via WhatsApp Dispatch</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 5. CUSTOMER REVIEWS [DARK SECTION] */}
      <div className="bg-charcoal text-cream py-20 px-4 sm:px-6 border-t border-cream/10">
        <div className="max-w-6xl mx-auto">
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
                className="p-5 rounded-2xl bg-charcoal-50 border border-cream/10 shadow-sm flex flex-col justify-between"
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
    </div>
  );
}
