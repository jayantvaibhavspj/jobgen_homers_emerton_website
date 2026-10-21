import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Chatbot from './components/Chatbot';
import CateringModal from './components/CateringModal';
import ScrollToTop from './components/ScrollToTop';

// Route Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BurgerBuilderPage from './pages/BurgerBuilderPage';
import CateringPage from './pages/CateringPage';
import OrderOnlinePage from './pages/OrderOnlinePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [cart, setCart] = useState(() => {
    // Retrieve cached cart if any
    try {
      const saved = localStorage.getItem('homers_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCateringOpen, setIsCateringOpen] = useState(false);
  const lenisRef = useRef(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('homers_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [cart]);

  // Setup Lenis Smooth Scroll integrated with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Cart operations
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Router>
      <ScrollToTop lenisRef={lenisRef} />
      <div className="min-h-screen bg-charcoal text-cream selection:bg-orange-burnt selection:text-white relative flex flex-col justify-between">
        {/* Top Floating Navbar */}
        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenCatering={() => setIsCateringOpen(true)}
        />

        {/* Dynamic Route Pages */}
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  onOpenCart={() => setIsCartOpen(true)}
                />
              }
            />
            <Route
              path="/menu"
              element={
                <MenuPage
                  onAddToCart={handleAddToCart}
                  cartCount={cartCount}
                  cartTotal={cartTotal}
                  onOpenCart={() => setIsCartOpen(true)}
                  onOpenCatering={() => setIsCateringOpen(true)}
                />
              }
            />
            <Route
              path="/burger-builder"
              element={<BurgerBuilderPage onAddToCart={handleAddToCart} />}
            />
            <Route path="/catering" element={<CateringPage />} />
            <Route
              path="/order-online"
              element={<OrderOnlinePage onOpenCart={() => setIsCartOpen(true)} />}
            />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Motion Footer with 'Powered by Jobgen' badge */}
        <Footer onOpenCatering={() => setIsCateringOpen(true)} />

        {/* Slide-out Order Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* Interactive AI Chatbot Assistant */}
        <Chatbot
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Catering Enquiry Modal */}
        <CateringModal
          isOpen={isCateringOpen}
          onClose={() => setIsCateringOpen(false)}
        />
      </div>
    </Router>
  );
}
