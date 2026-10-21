import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Flame } from 'lucide-react';
import { SHOP_INFO, MENU_ITEMS } from '../config';
import { getShopStatus } from '../utils/sydneyTime';

export default function Chatbot({ onAddToCart, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showBubble, setShowBubble] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "G'day! 👋 Welcome to Homers Emerton. I'm your virtual food guide. Looking for lunch specials, burger recommendations, or catering for a party?",
      time: 'Just now',
    },
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Hide bubble after 10s or when opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
    setShowBubble(false);
  };

  const quickPrompts = [
    { label: "🍔 Best burger?", query: "What is your best burger?" },
    { label: "💰 Lunch specials", query: "Tell me about your lunch specials" },
    { label: "⏰ Opening hours", query: "What are your opening hours today?" },
    { label: "📍 Where are you located?", query: "Where are you located?" },
    { label: "🍗 Hot roasts & carvery", query: "Do you have roast chicken or pork dinners?" },
    { label: "🐟 Fish & chips", query: "What seafood options do you have?" },
    { label: "🎉 Catering info", query: "How does party catering work?" },
    { label: "📞 Call shop", query: "Can I call the shop to order?" },
  ];

  const generateBotReply = (userText) => {
    const lower = userText.toLowerCase();
    const status = getShopStatus();

    // 1. BURGER RECOMMENDATIONS
    if (lower.includes('burger') || lower.includes('best') || lower.includes('recommend')) {
      const burger = MENU_ITEMS.find((m) => m.id === 'bg-1') || MENU_ITEMS[0];
      return {
        text: `Our absolute customer favourite is **${burger.name}** ($${burger.price.toFixed(2)} AUD)! It comes with double flame-grilled beef, double bacon, egg, cheese, and Homer's secret BBQ glaze. Would you like me to add it to your order?`,
        suggestedDish: burger,
      };
    }

    // 2. LUNCH SPECIALS
    if (lower.includes('lunch') || lower.includes('special') || lower.includes('deal') || lower.includes('cheap')) {
      return {
        text: `Our weekday **Lunch Specials start from just $12.90 AUD**! Popular picks include our Crispy Schnitzel Roll ($16.90) and Chicken Caesar Salad ($12.90). You can also add hot chips and a cold drink as a combo!`,
      };
    }

    // 3. HOURS & TIMINGS
    if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('close')) {
      return {
        text: `We are currently **${status.isOpen ? '🟢 OPEN' : '🔴 CLOSED'}** (${status.label}).\n\n• Mon-Wed & Sun: 10:00 AM – 8:00 PM\n• Thu-Sat: 10:00 AM – 8:30 PM\n\nOrders are freshly prepared in roughly 15 minutes!`,
      };
    }

    // 4. LOCATION & PARKING
    if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('map')) {
      return {
        text: `We are located at **${SHOP_INFO.address}** in the Emerton Village precinct. There is plenty of free parking directly outside our shop front!`,
      };
    }

    // 5. FISH AND CHIPS / SEAFOOD
    if (lower.includes('fish') || lower.includes('chip') || lower.includes('seafood') || lower.includes('calamari')) {
      const fish = MENU_ITEMS.find((m) => m.id === 'fc-1');
      return {
        text: `Our **Crumbed Fish & Chips** ($19.50 AUD) is wild-caught, hand-crumbed in seasoned panko, and served with a mountain of chips with chicken salt and house-made tartare!`,
        suggestedDish: fish,
      };
    }

    // 6. ROAST CHICKEN / CARVERY
    if (lower.includes('roast') || lower.includes('chicken') || lower.includes('pork') || lower.includes('beef') || lower.includes('dinner')) {
      const roast = MENU_ITEMS.find((m) => m.id === 'hr-3') || MENU_ITEMS.find((m) => m.id === 'hr-1');
      return {
        text: `Our carvery is famous! We slow-roast seasoned chickens and crispy crackling pork every day, served with roast potatoes, pumpkin, peas, and rich pan gravy. Whole chicken dinner is $28.90 AUD.`,
        suggestedDish: roast,
      };
    }

    // 7. CATERING
    if (lower.includes('cater') || lower.includes('party') || lower.includes('event') || lower.includes('tray')) {
      return {
        text: `We cater for family events, birthdays, and sports gatherings! We provide half and full trays of Fresh Salads, Hot Roast Meats, and Finger Food Platters. **Note:** Catering requires minimum 4 days advance notice. Call us at (02) 9677 1188 to book your date!`,
      };
    }

    // 8. CALL / PHONE ORDER
    if (lower.includes('call') || lower.includes('phone') || lower.includes('talk') || lower.includes('contact')) {
      return {
        text: `You can ring us directly on **(02) 9677 1188** to place phone orders or speak with our team!`,
      };
    }

    // 9. CURRY
    if (lower.includes('curry') || lower.includes('butter chicken') || lower.includes('spicy')) {
      const curry = MENU_ITEMS.find((m) => m.id === 'cr-1');
      return {
        text: `Our **Butter Chicken Curry** ($19.90 AUD) is slow-simmered in rich butter, cream, and aromatic spices, served with fragrant basmati rice and warm garlic naan! It's mild and comforting.`,
        suggestedDish: curry,
      };
    }

    // DEFAULT FALLBACK
    return {
      text: `Thanks for asking! We serve flame-grilled burgers, fresh crumbed fish & chips, curries, and hot roast carvery dinners. You can browse our full menu on the page, build a custom burger, or send your cart straight to WhatsApp!`,
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate quick intelligent AI response
    setTimeout(() => {
      const botResponse = generateBotReply(query);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse.text,
        suggestedDish: botResponse.suggestedDish,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  return (
    <aside aria-label="Customer Support Assistant" className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
      {/* GREETING SPEECH BUBBLE TOOLTIP (When closed) */}
      {!isOpen && showBubble && (
        <div
          onClick={handleOpen}
          className="absolute bottom-16 right-0 bg-charcoal text-cream border border-orange-burnt/40 px-4 py-2.5 rounded-2xl rounded-br-sm shadow-warm-lg text-xs font-medium cursor-pointer w-64 hover:border-orange-burnt transition-all animate-bounce"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-orange-glow text-[11px]">Homers Assistant</span>
          </div>
          <p className="text-cream/90 leading-tight">
            Hungry? Ask me for recommendations, lunch deals, or catering!
          </p>
        </div>
      )}

      {/* FLOATING ACTION BUTTON (FAB) */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-95 text-white shadow-warm-lg hover:shadow-glow-orange transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-burnt/50"
          aria-label="Open food chat assistant"
        >
          <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />

          {/* Unread badge */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-chilli text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-charcoal shadow animate-pulse">
              1
            </span>
          )}
        </button>
      )}

      {/* EXPANDED CHATBOT MODAL */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Homers Food Assistant Chat"
          className="w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-charcoal text-cream rounded-[24px] border border-cream/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-scale-in"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-charcoal-50 border-b border-cream/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-burnt/20 border border-orange-burnt/40 flex items-center justify-center text-orange-glow">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-cream leading-none">
                  Homers AI Assistant
                </h3>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live · Emerton Takeaway
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-cream/10 text-cream/60 hover:text-white transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-orange-burnt text-white rounded-br-none'
                      : 'bg-charcoal-50 border border-cream/10 text-cream/90 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Suggested Dish Card if returned */}
                  {msg.suggestedDish && (
                    <div className="mt-3 p-2.5 rounded-xl bg-charcoal border border-cream/15 flex items-center justify-between gap-2 shadow">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{msg.suggestedDish.emoji || '🍔'}</span>
                        <div>
                          <div className="font-bold text-cream text-[11px] leading-tight">
                            {msg.suggestedDish.name}
                          </div>
                          <div className="text-orange-glow font-mono text-[10px]">
                            ${msg.suggestedDish.price.toFixed(2)} AUD
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onAddToCart(msg.suggestedDish);
                          onOpenCart();
                        }}
                        className="px-3 py-1 bg-orange-burnt hover:bg-orange-600 text-white rounded-full font-bold text-[10px] transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-cream/40 px-1 mt-1">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 border-t border-cream/10 bg-charcoal-50/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p.query)}
                className="flex-shrink-0 text-[11px] px-3 py-1 rounded-full bg-cream/10 hover:bg-orange-burnt hover:text-white text-cream/80 border border-cream/15 transition-colors whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 border-t border-cream/10 bg-charcoal-50 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about burgers, hours, specials..."
              className="flex-1 bg-charcoal border border-cream/15 rounded-full px-4 py-2 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-orange-burnt"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-full bg-orange-burnt hover:bg-orange-600 disabled:opacity-40 text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
