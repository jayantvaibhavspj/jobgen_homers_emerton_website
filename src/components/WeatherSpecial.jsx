import React, { useState, useEffect, useRef } from 'react';
import { CloudRain, Sun, Flame, Wind, Plus, Sparkles, CloudSun } from 'lucide-react';
import { fetchEmertonWeather } from '../utils/weatherApi';
import { MENU_ITEMS } from '../config';

export default function WeatherSpecial({ onAddToCart }) {
  const [weatherData, setWeatherData] = useState(null);
  const canvasRef = useRef(null);

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
        // Soft rain streaks & steam
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
        // Sun shimmer rays
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.random() * 20 + 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha * 0.15})`;
          ctx.fill();

          p.y -= p.speedY;
          if (p.y < -20) p.y = canvas.height + 20;
        });
      } else {
        // Mild mode: Warm golden embers
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

  if (!weatherData) return null;

  // Filter recommendations based on current weather focus categories
  const recommendedItems = MENU_ITEMS.filter((item) =>
    weatherData.categoryFocus.includes(item.category)
  ).slice(0, 3);

  return (
    <section
      id="weather-specials"
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

          <a
            href="#menu"
            className="inline-flex items-center gap-1.5 text-xs text-orange-glow hover:text-white font-semibold transition-colors underline underline-offset-4"
          >
            <span>Explore all dishes</span>
            <span>→</span>
          </a>
        </div>

        {/* 3 Weather-Reactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              className="group bg-charcoal-50 rounded-[20px] p-5 border border-cream/10 hover:border-orange-burnt/40 shadow-warm transition-all duration-300 flex flex-col justify-between"
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
