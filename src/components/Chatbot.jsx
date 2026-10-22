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

  // DRAGGABLE FLOATING BUTTON STATE & LOGIC
  const BUTTON_SIZE = 64;
  const MARGIN = 14;

  const clampPosition = (x, y) => {
    if (typeof window === 'undefined') return { x, y };
    const maxX = Math.max(MARGIN, window.innerWidth - BUTTON_SIZE - MARGIN);
    const maxY = Math.max(MARGIN, window.innerHeight - BUTTON_SIZE - MARGIN);
    return {
      x: Math.min(Math.max(MARGIN, x), maxX),
      y: Math.min(Math.max(MARGIN, y), maxY),
    };
  };

  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 100, y: 100 };
    const isMobile = window.innerWidth < 1024;
    const rightMargin = window.innerWidth < 640 ? 16 : 24;
    const bottomMargin = isMobile ? 84 : 28;
    return clampPosition(
      window.innerWidth - BUTTON_SIZE - rightMargin,
      window.innerHeight - BUTTON_SIZE - bottomMargin
    );
  };

  const [position, setPosition] = useState(getInitialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    isMouseDown: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
    justDragged: false,
  });

  // Clamp position on window resize or zoom in/out so it NEVER leaves the screen
  useEffect(() => {
    const handleViewportChange = () => {
      setPosition((prev) => clampPosition(prev.x, prev.y));
    };

    window.addEventListener('resize', handleViewportChange);
    window.visualViewport?.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.visualViewport?.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  // Global mousemove & mouseup listeners for smooth dragging outside element bounds
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragRef.current.isMouseDown) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      if (!dragRef.current.hasMoved && Math.hypot(dx, dy) > 4) {
        dragRef.current.hasMoved = true;
        dragRef.current.justDragged = true;
        setIsDragging(true);
      }

      if (dragRef.current.hasMoved) {
        setPosition(clampPosition(dragRef.current.initialX + dx, dragRef.current.initialY + dy));
      }
    };

    const handleMouseUp = () => {
      if (dragRef.current.isMouseDown) {
        dragRef.current.isMouseDown = false;
        setIsDragging(false);
        // small timeout to suppress click event if user was dragging
        setTimeout(() => {
          dragRef.current.justDragged = false;
        }, 120);
      }
    };

    const handleTouchMove = (e) => {
      if (!dragRef.current.isMouseDown || !e.touches[0]) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragRef.current.startX;
      const dy = touch.clientY - dragRef.current.startY;

      if (!dragRef.current.hasMoved && Math.hypot(dx, dy) > 4) {
        dragRef.current.hasMoved = true;
        dragRef.current.justDragged = true;
        setIsDragging(true);
      }

      if (dragRef.current.hasMoved) {
        setPosition(clampPosition(dragRef.current.initialX + dx, dragRef.current.initialY + dy));
        e.preventDefault(); // Prevent page scroll while dragging button
      }
    };

    const handleTouchEnd = () => {
      if (dragRef.current.isMouseDown) {
        dragRef.current.isMouseDown = false;
        setIsDragging(false);
        setTimeout(() => {
          dragRef.current.justDragged = false;
        }, 120);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const handleStartDrag = (clientX, clientY) => {
    dragRef.current = {
      isMouseDown: true,
      startX: clientX,
      startY: clientY,
      initialX: position.x,
      initialY: position.y,
      hasMoved: false,
      justDragged: false,
    };
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    handleStartDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (!e.touches[0]) return;
    handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleOpenClick = (e) => {
    if (dragRef.current.justDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    handleOpen();
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
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

  // Determine popup placement so it never clips off-screen when moved near edges
  const isNearTop = position.y < 70;
  const isNearLeft = position.x < 170;

  // Calculate modal coordinates to stay cleanly on screen anchored to button
  const modalWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 24, 380) : 380;
  const modalHeight = typeof window !== 'undefined' ? Math.min(window.innerHeight - 24, 520) : 520;

  let modalLeft = position.x - modalWidth + BUTTON_SIZE;
  if (modalLeft < 12) modalLeft = position.x;
  if (typeof window !== 'undefined' && modalLeft + modalWidth > window.innerWidth - 12) {
    modalLeft = window.innerWidth - modalWidth - 12;
  }
  if (modalLeft < 12) modalLeft = 12;

  let modalTop = position.y - modalHeight - 12;
  if (modalTop < 12) {
    modalTop = position.y + BUTTON_SIZE + 12;
  }
  if (typeof window !== 'undefined' && modalTop + modalHeight > window.innerHeight - 12) {
    modalTop = window.innerHeight - modalHeight - 12;
  }
  if (modalTop < 12) modalTop = 12;

  return (
    <>
      {/* FLOATING DRAGGABLE CHATBOT TRIGGER (WHEN CLOSED) */}
      {!isOpen && (
        <div
          role="region"
          aria-label="Homers AI Assistant trigger"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            touchAction: 'none',
            zIndex: 9999,
            userSelect: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
          }}
          className="group flex flex-col items-end"
        >
          {/* "ASK ME!" POP-UP BUBBLE */}
          {showBubble && (
            <div
              onClick={handleOpenClick}
              title="Click to chat with Homers AI"
              className={`absolute select-none cursor-pointer transition-all duration-300 animate-bounce pointer-events-auto ${
                isNearTop ? 'top-18' : '-top-11'
              } ${isNearLeft ? 'left-0' : 'right-0'}`}
            >
              <div className="bg-charcoal/95 backdrop-blur-md text-cream border-2 border-orange-burnt px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2 whitespace-nowrap hover:scale-105 transition-transform hover:border-amber-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-extrabold text-xs text-orange-400 tracking-wider uppercase font-serif">
                  Ask me!
                </span>
                <span className="text-[11px] text-cream/90 font-medium">
                  Deals & Menu 🍔
                </span>
              </div>
              {/* Pointer arrow pointing towards the logo button */}
              <div
                className={`absolute w-2.5 h-2.5 bg-charcoal border-orange-burnt ${
                  isNearTop
                    ? '-top-1.5 border-t-2 border-l-2 rotate-45'
                    : '-bottom-1 border-r-2 border-b-2 rotate-45'
                } ${isNearLeft ? 'left-6' : 'right-6'}`}
              />
            </div>
          )}

          {/* HOMERS OFFICIAL LOGO FLOATING BUTTON */}
          <button
            type="button"
            onClick={handleOpenClick}
            aria-label="Open food chat assistant with Homers logo"
            title="Homers Assistant — Click to chat, drag to move anywhere"
            className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-50 via-white to-orange-100 border-[2.5px] border-orange-burnt shadow-2xl hover:shadow-[0_0_20px_rgba(217,83,30,0.6)] active:scale-95 transition-transform duration-200 focus:outline-none ${
              isDragging ? 'scale-105 ring-4 ring-orange-burnt/40' : 'group-hover:scale-105'
            }`}
          >
            {/* The Official Homers Logo */}
            <img
              src="/logo.png"
              alt="Homers Emerton"
              className="w-12 h-auto max-h-10 object-contain drop-shadow pointer-events-none select-none transition-transform group-hover:scale-110"
              draggable="false"
            />

            {/* Live Indicator / Unread Badge */}
            {hasUnread ? (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-chilli text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                1
              </span>
            ) : (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            )}
          </button>
        </div>
      )}

      {/* EXPANDED CHATBOT MODAL DOCKED NEAR BUTTON */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Homers Food Assistant Chat"
          style={{
            position: 'fixed',
            left: `${modalLeft}px`,
            top: `${modalTop}px`,
            width: `${modalWidth}px`,
            zIndex: 9999,
          }}
          className="h-[520px] max-h-[85vh] bg-charcoal text-cream rounded-[24px] border border-cream/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-scale-in"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-charcoal-50 border-b border-cream/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white border border-orange-burnt/40 p-1 flex items-center justify-center shadow-sm">
                <img
                  src="/logo.png"
                  alt="Homers"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-cream leading-tight">
                  Homers AI Assistant
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-mono">
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
    </>
  );
}
