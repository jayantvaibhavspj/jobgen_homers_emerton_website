import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CloudRain, Sun, Flame, Wind, Plus, Sparkles, CloudSun, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchEmertonWeather } from '../utils/weatherApi';
import { MENU_ITEMS } from '../config';

export default function WeatherSpecial({ onAddToCart }) {
  const [weatherData, setWeatherData] = useState(null);
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const canvasRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchEmertonWeather().then((res) => {
      setWeatherData(res);
    });
  }, []);

  // Weather-reactive canvas effect
  useEffect(() => {
    if (!weatherData) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isRainy = weatherData.mode === 'cold_rain';
    const isHot = weatherData.mode === 'hot';

    const particles = [];
    const count = isRainy ? 60 : 25;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: Math.random() * 12 + 8,
        speedY: isRainy ? Math.random() * 6 + 4 : Math.random() * 0.8 + 0.2,
        speedX: isRainy ? -1.5 : (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isRainy) {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.25)';
        ctx.lineWidth = 1;
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.len);
          ctx.stroke();

          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
        });
      } else if (isHot) {
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.random() * 20 + 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha * 0.15})`;
          ctx.fill();

          p.y -= p.speedY;
          if (p.y < -20) p.y = canvas.height + 20;
        });
      } else {
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 112, 10, ${p.alpha * 0.4})`;
          ctx.fill();

          p.y -= p.speedY;
          if (p.y < -10) p.y = canvas.height + 10;
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [weatherData]);

  // Compute 4 diverse sets of 3 unique weather-matched dishes
  const weatherSets = useMemo(() => {
    if (!weatherData) return [];
    const focus = (weatherData.categoryFocus && weatherData.categoryFocus.length > 0)
      ? weatherData.categoryFocus
      : ['burgers', 'fish-chips', 'curries'];

    const priorityItems = MENU_ITEMS.filter((item) => focus.includes(item.category));
    const backupItems = MENU_ITEMS.filter((item) => !focus.includes(item.category));
    const fullPool = [...priorityItems, ...backupItems];

    const NUM_SETS = 4;
    const SET_SIZE = 3;
    const sets = [];
    const usedIds = new Set();

    for (let s = 0; s < NUM_SETS; s++) {
      const setDishes = [];
      // Attempt 1 item from each focus category for culinary variety in every rotation
      focus.slice(0, SET_SIZE).forEach((cat) => {
        const item = fullPool.find(
          (m) => m.category === cat && !usedIds.has(m.id)
        );
        if (item) {
          setDishes.push(item);
          usedIds.add(item.id);
        }
      });

      // Fill remaining slots up to SET_SIZE with unused items
      while (setDishes.length < SET_SIZE) {
        const nextItem = fullPool.find((m) => !usedIds.has(m.id));
        if (nextItem) {
          setDishes.push(nextItem);
          usedIds.add(nextItem.id);
        } else {
          const loopItem = fullPool[setDishes.length % fullPool.length];
          setDishes.push(loopItem);
        }
      }
      sets.push(setDishes);
    }
    return sets;
  }, [weatherData]);

  const totalSets = weatherSets.length;

  const goToNextSet = useCallback(() => {
    if (totalSets === 0) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveSetIndex((prev) => (prev + 1) % totalSets);
      setIsFading(false);
    }, 220);
  }, [totalSets]);

  const goToPrevSet = useCallback(() => {
    if (totalSets === 0) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveSetIndex((prev) => (prev - 1 + totalSets) % totalSets);
      setIsFading(false);
    }, 220);
  }, [totalSets]);

  const goToSet = useCallback((index) => {
    if (index === activeSetIndex || totalSets === 0) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveSetIndex(index);
      setIsFading(false);
    }, 220);
  }, [activeSetIndex, totalSets]);

  // Auto-rotate every 3 seconds (3000ms), paused when user hovers
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isHovered || totalSets <= 1) return;

    timerRef.current = setInterval(() => {
      goToNextSet();
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goToNextSet, isHovered, totalSets]);

  if (!weatherData || weatherSets.length === 0) return null;

  const currentItems = weatherSets[activeSetIndex] || weatherSets[0];

  return (
    <section
      id="weather-specials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-charcoal-100 py-20 px-4 sm:px-6 overflow-hidden border-t border-cream/10"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Weather Chip & Dynamic Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 border-b border-cream/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 border border-cream/20 text-xs font-semibold text-orange-glow mb-3 backdrop-blur-sm">
              {weatherData.mode === 'cold_rain' ? (
                <CloudRain className="w-4 h-4 text-sky-400" />
              ) : weatherData.mode === 'hot' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <CloudSun className="w-4 h-4 text-orange-burnt" />
              )}
              <span>{weatherData.chipText}</span>
              <span className="text-cream/40">•</span>
              <span className="text-cream/80 text-[11px]">Live Open-Meteo Feed</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-cream">
              {weatherData.headline}
            </h2>
            <p className="text-cream/70 text-sm sm:text-base mt-2 max-w-xl">
              {weatherData.subline}
            </p>
          </div>

          {/* Navigation Controls + Explore Link */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Interactive Prev/Next & Dots */}
            <div className="flex items-center gap-1.5 bg-charcoal/80 border border-cream/15 rounded-full p-1 backdrop-blur-md shadow-md">
              <button
                onClick={goToPrevSet}
                className="w-7 h-7 rounded-full bg-cream/5 hover:bg-orange-burnt text-cream/70 hover:text-white flex items-center justify-center transition-colors active:scale-95"
                aria-label="Previous dishes"
                title="Previous dishes"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 px-1.5">
                {weatherSets.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSet(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeSetIndex
                        ? 'w-5 bg-orange-burnt shadow-warm'
                        : 'w-1.5 bg-cream/30 hover:bg-cream/60'
                    }`}
                    aria-label={`Go to set ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNextSet}
                className="w-7 h-7 rounded-full bg-cream/5 hover:bg-orange-burnt text-cream/70 hover:text-white flex items-center justify-center transition-colors active:scale-95"
                aria-label="Next dishes"
                title="Next dishes"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href="#menu"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-orange-glow hover:text-white font-semibold transition-colors underline underline-offset-4"
            >
              <span>Explore all dishes</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* 3 Weather-Reactive Cards with Smooth Transition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentItems.map((item, idx) => (
            <div
              key={`${activeSetIndex}-${item.id}`}
              className={`group bg-charcoal-50 rounded-[20px] p-5 border border-cream/10 hover:border-orange-burnt/40 shadow-warm transition-all duration-300 flex flex-col justify-between ${
                isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-charcoal">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                    loading="lazy"
                  />
                  <div className="hidden absolute inset-0 bg-charcoal-200 items-center justify-center text-3xl">
                    {item.emoji || '🍽️'}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-orange-burnt text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow">
                    ${item.price.toFixed(2)} AUD
                  </div>
                </div>

                <div className="text-xs uppercase tracking-wider text-orange-glow font-mono mb-1">
                  Weather Match
                </div>
                <h3 className="text-xl font-serif font-bold text-cream mb-1.5 group-hover:text-orange-glow transition-colors">
                  {item.name}
                </h3>
                <p className="text-cream/70 text-xs line-clamp-2 mb-4">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => onAddToCart(item)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-cream/10 hover:bg-orange-burnt hover:text-white text-cream text-xs font-semibold border border-cream/15 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to order · ${item.price.toFixed(2)}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
