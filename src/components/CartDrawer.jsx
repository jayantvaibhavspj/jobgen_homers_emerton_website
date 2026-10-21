import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight, Store, Bike } from 'lucide-react';
import { SHOP_INFO } from '../config';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [orderType, setOrderType] = useState('pickup'); // 'pickup' or 'delivery'
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const drawerRef = useRef(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  // Trap focus & lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Generate WhatsApp Order Message
  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})${
            item.addons && item.addons.length > 0 ? `\n   Extras: ${item.addons.join(', ')}` : ''
          }`
      )
      .join('\n');

    let message = `*NEW ORDER - HOMERS EMERTON*\n`;
    message += `----------------------------\n`;
    message += `*Customer:* ${customerName || 'Customer'}\n`;
    message += `*Order Type:* ${orderType.toUpperCase()}\n`;
    message += `----------------------------\n`;
    message += `*Items Ordered:*\n${itemsText}\n`;
    message += `----------------------------\n`;
    message += `*Subtotal:* $${subtotal.toFixed(2)} AUD\n`;
    if (orderType === 'delivery') {
      message += `*Delivery Fee:* $${deliveryFee.toFixed(2)} AUD\n`;
    }
    message += `*TOTAL:* $${total.toFixed(2)} AUD\n`;
    if (customerNote) {
      message += `*Special Instructions:* ${customerNote}\n`;
    }
    message += `----------------------------\n`;
    message += `Pickup Address: Shop 2, 135-137 Popondetta Rd, Emerton NSW\n`;
    message += `Thank you! Please confirm prep time.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SHOP_INFO.whatsapp.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Order Cart"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 max-w-full flex pl-10 focus:outline-none"
      >
        <div className="w-screen max-w-md bg-charcoal text-cream flex flex-col justify-between shadow-2xl border-l border-cream/10">
          {/* Header */}
          <div className="p-6 border-b border-cream/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-burnt" />
              <h2 className="text-xl font-serif font-bold text-cream">Your Takeaway Order</h2>
              <span className="text-xs bg-cream/10 px-2 py-0.5 rounded-full text-cream/70">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-cream/10 text-cream/70 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-cream/50">
                <ShoppingBag className="w-12 h-12 stroke-[1.5] mb-3 text-cream/30" />
                <p className="font-serif text-xl text-cream/80 mb-1">Your cart is empty</p>
                <p className="text-xs max-w-xs mb-6">
                  Add some flame-grilled burgers, crispy fish & chips, or hot roasts to start your order.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-orange-burnt text-white text-xs font-semibold shadow-warm hover:bg-orange-600 transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Toggle: Pickup vs Delivery */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-charcoal-50 rounded-xl border border-cream/10 mb-4">
                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      orderType === 'pickup'
                        ? 'bg-orange-burnt text-white shadow'
                        : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Store Pickup (Free)</span>
                  </button>
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      orderType === 'delivery'
                        ? 'bg-orange-burnt text-white shadow'
                        : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>Local Delivery (+$5)</span>
                  </button>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-charcoal-50 border border-cream/10 flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-cream leading-tight">{item.name}</div>
                        {item.addons && item.addons.length > 0 && (
                          <div className="text-[11px] text-orange-glow mt-0.5">
                            +{item.addons.join(', ')}
                          </div>
                        )}
                        <div className="text-xs text-cream/60 mt-1 font-mono">
                          ${item.price.toFixed(2)} AUD
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-charcoal border border-cream/15 rounded-full px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-orange-burnt transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-cream">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-orange-burnt transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-cream/40 hover:text-chilli transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Input */}
                <div className="pt-4 border-t border-cream/10 space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name (for order ticket)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-charcoal-50 border border-cream/15 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-orange-burnt"
                  />
                  <input
                    type="text"
                    placeholder={
                      orderType === 'delivery'
                        ? 'Delivery address in Emerton...'
                        : 'Special instructions / pickup time...'
                    }
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-charcoal-50 border border-cream/15 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-orange-burnt"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & WhatsApp Send Button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-cream/10 bg-charcoal-50/50 space-y-4">
              <div className="space-y-1.5 text-xs text-cream/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-cream">${subtotal.toFixed(2)} AUD</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Local Delivery Fee</span>
                    <span className="font-mono text-cream">${deliveryFee.toFixed(2)} AUD</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-cream pt-2 border-t border-cream/10">
                  <span>Total Due</span>
                  <span className="text-orange-glow text-lg">${total.toFixed(2)} AUD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-sm shadow-warm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send order on WhatsApp</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-cream/50 pt-1">
                  <span>Pay upon pickup (Cash/EFTPOS)</span>
                  <button
                    onClick={onClearCart}
                    className="hover:text-chilli transition-colors underline"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
