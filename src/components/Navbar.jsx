import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, Navigation, Clock, ChevronRight, Utensils, MapPin } from 'lucide-react';
import { SHOP_INFO } from '../config';
import { getShopStatus } from '../utils/sydneyTime';

export default function Navbar({ cartCount, onOpenCart, onOpenCatering }) {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopStatus, setShopStatus] = useState({ isOpen: true, label: 'Open · till 8pm' });
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Update live Sydney status
  useEffect(() => {
    const update = () => {
      setShopStatus(getShopStatus());
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for sticky behavior & hiding on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solid background after 50px
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > 150 && currentScrollY > lastScrollY.current + 8) {
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap focus & lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Burger Builder', path: '/burger-builder' },
    { label: 'Catering', path: '/catering' },
    { label: 'Our Story', path: '/about-us' },
    { label: 'Contact', path: '/contact-us' },
  ];

  return (
    <>
      {/* DESKTOP & MOBILE EXPANDED WIDE TOP NAVBAR */}
      <header
        ref={navRef}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none ${
          navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div
          className={`pointer-events-auto w-full max-w-[1440px] rounded-[28px] transition-all duration-300 flex items-center justify-between px-5 sm:px-8 py-3 sm:py-3.5 ${
            scrolled
              ? 'bg-charcoal/95 text-cream border border-cream/15 backdrop-blur-xl shadow-warm-lg'
              : 'bg-charcoal/80 text-cream border border-cream/10 backdrop-blur-lg shadow-warm'
          }`}
        >
          {/* LEFT: BRAND LOGO & SUBTITLE */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt rounded-full px-1 py-1 flex-shrink-0"
            aria-label="Homers Emerton Home"
          >
            <img
              src="/logo.png"
              alt="Homers Emerton Logo"
              className="h-8 sm:h-9 w-auto object-contain filter drop-shadow group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-script text-2xl sm:text-3xl text-orange-burnt tracking-wide leading-none">
                  Homers
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cream/80 bg-cream/10 px-2 py-0.5 rounded-full border border-cream/10 font-bold">
                  Emerton
                </span>
              </div>
              <span className="hidden xl:inline text-[10px] text-cream/50 tracking-wider">
                Shop 2, 135-137 Popondetta Rd
              </span>
            </div>
          </Link>

          {/* CENTER: SPACIOUS DESKTOP NAV LINKS (Clean typography with bottom orange underline) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative group px-3.5 xl:px-4 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-cream/75 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-orange-burnt rounded-full transition-all duration-200 shadow-[0_0_8px_rgba(232,112,10,0.7)] ${
                        isActive
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0 group-hover:opacity-70 group-hover:scale-x-75'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: SYDNEY STATUS, CART TRIGGER & ORDER CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Live Sydney Status Pill */}
            <div
              className={`hidden md:flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full border transition-colors ${
                shopStatus.isOpen
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
              }`}
              title={`Sydney Time: ${shopStatus.label}`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  shopStatus.isOpen ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500'
                }`}
              />
              <span>{shopStatus.label}</span>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt hover:scale-105 active:scale-95"
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-cream" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-chilli text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Order Now Button */}
            <Link
              to="/order-online"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs xl:text-sm font-semibold text-white bg-orange-burnt hover:bg-orange-600 active:scale-95 rounded-full shadow-warm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-burnt"
            >
              Order Online
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full text-cream hover:bg-cream/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      <div
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-xl text-cream flex flex-col justify-between p-6 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        {/* Top bar with logo and close */}
        <div className="flex items-center justify-between border-b border-cream/10 pb-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Homers Emerton Logo"
              className="h-8 w-auto object-contain filter drop-shadow"
            />
            <span className="font-script text-3xl text-orange-burnt">Homers</span>
            <span className="text-xs uppercase tracking-widest text-cream/60">Emerton</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-full bg-cream/10 text-cream hover:bg-orange-burnt hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-burnt"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big Serif Staggered Navigation Links */}
        <nav className="flex flex-col space-y-3.5 my-auto py-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-center justify-between text-2xl sm:text-3xl font-serif py-1 transition-colors ${
                  isActive ? 'text-orange-glow font-bold' : 'text-cream hover:text-orange-burnt'
                }`
              }
            >
              <span>{link.label}</span>
              <ChevronRight className="w-5 h-5 text-orange-burnt opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </NavLink>
          ))}
        </nav>

        {/* Bottom Details in Drawer */}
        <div className="border-t border-cream/10 pt-5 space-y-3.5 text-sm text-cream/80">
          <Link
            to="/order-online"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 px-6 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-bold text-center block shadow-warm text-sm transition-colors"
          >
            Order Online
          </Link>

          <div className="flex items-center gap-2 text-orange-glow font-medium">
            <Clock className="w-4 h-4 text-orange-burnt" />
            <span>{shopStatus.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-cream/10 hover:bg-orange-burnt hover:text-white font-medium text-cream transition-colors text-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
            <a
              href={SHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-cream/10 hover:bg-orange-burnt hover:text-white font-medium text-cream transition-colors text-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>Directions</span>
            </a>
          </div>

          <p className="text-xs text-cream/50 text-center pt-1">
            {SHOP_INFO.address}
          </p>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR (390px Mobile First Experience) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal/95 border-t border-cream/10 backdrop-blur-xl px-4 py-2 flex items-center justify-between gap-2 lg:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
        role="navigation"
        aria-label="Mobile Quick Actions"
      >
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl text-center transition-colors ${
              isActive ? 'text-orange-glow bg-cream/10' : 'text-cream/80 hover:text-cream'
            }`
          }
        >
          <Utensils className="w-4 h-4 text-orange-burnt mb-0.5" />
          <span className="text-[11px] font-medium tracking-wide">Menu</span>
        </NavLink>

        <a
          href={`tel:${SHOP_INFO.phoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl text-cream/80 hover:text-cream text-center"
        >
          <Phone className="w-4 h-4 text-orange-burnt mb-0.5" />
          <span className="text-[11px] font-medium tracking-wide">Call</span>
        </a>

        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl text-center transition-colors ${
              isActive ? 'text-orange-glow bg-cream/10' : 'text-cream/80 hover:text-cream'
            }`
          }
        >
          <MapPin className="w-4 h-4 text-orange-burnt mb-0.5" />
          <span className="text-[11px] font-medium tracking-wide">Find Us</span>
        </NavLink>

        <button
          onClick={onOpenCart}
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-orange-burnt text-white font-semibold text-xs shadow-warm hover:bg-orange-600 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart ({cartCount})</span>
        </button>
      </div>
    </>
  );
}
