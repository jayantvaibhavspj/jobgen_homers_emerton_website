import React, { useMemo } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * FloatingTickets Layer
 * 3-5 small paper order slips with abstract line markings (no readable text)
 * drifting gently upward from the takeaway window like glowing fireflies,
 * rotating subtly and dissolving into the night atmosphere.
 */
export default function FloatingTickets({
  isPlaying = true,
  isReducedMotion = false,
  isMobile = false,
  offsetX = 0,
}) {
  const { tickets } = FOOTER_SCENE_CONFIG;
  const count = isMobile ? tickets.countMobile : tickets.countDesktop;

  // Staggered tickets floating parameters
  const ticketItems = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const baseX = 640 + (i * 24) - 30; // centered around shop window
      const baseY = 410;
      const duration = 5.2 + i * 1.1;
      const delay = i * 1.8;
      const rot = (i % 2 === 0 ? 1 : -1) * (12 + i * 4);
      return { id: i, baseX, baseY, duration, delay, rot };
    });
  }, [count]);

  if (isReducedMotion) {
    return null; // Reduced motion: omit floating particles
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYTop slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft ticket fade gradient */}
          <linearGradient id="ticketGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g id="order-tickets-group" transform={`translate(${offsetX}, 0)`}>
          {ticketItems.map((t) => (
            <g
              key={t.id}
              style={{
                transformOrigin: `${t.baseX}px ${t.baseY}px`,
                animation: isPlaying
                  ? `ticketFloat ${t.duration}s cubic-bezier(0.3, 0, 0.7, 1) ${t.delay}s infinite`
                  : 'none',
              }}
            >
              {/* Slip paper shadow */}
              <rect
                x={t.baseX - 6}
                y={t.baseY - 9}
                width="12"
                height="17"
                rx="1"
                fill="#120c08"
                opacity="0.3"
              />
              {/* Slip paper body */}
              <rect
                x={t.baseX - 6}
                y={t.baseY - 9}
                width="12"
                height="17"
                rx="1"
                fill="url(#ticketGlowGrad)"
                stroke="#fed7aa"
                strokeWidth="0.6"
              />
              {/* Abstract decorative invoice line dashes (NO text) */}
              <line x1={t.baseX - 4} y1={t.baseY - 5} x2={t.baseX + 4} y2={t.baseY - 5} stroke="#d97706" strokeWidth="0.8" opacity="0.6" />
              <line x1={t.baseX - 4} y1={t.baseY - 2} x2={t.baseX + 2} y2={t.baseY - 2} stroke="#ea580c" strokeWidth="0.8" opacity="0.6" />
              <line x1={t.baseX - 4} y1={t.baseY + 1} x2={t.baseX + 3} y2={t.baseY + 1} stroke="#ea580c" strokeWidth="0.8" opacity="0.6" />
              <line x1={t.baseX - 4} y1={t.baseY + 4} x2={t.baseX + 4} y2={t.baseY + 4} stroke="#d97706" strokeWidth="0.8" opacity="0.6" />
            </g>
          ))}
        </g>
      </svg>

      {/* Embedded CSS for Ticket Floating & Rotation */}
      <style>{`
        @keyframes ticketFloat {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(0.85);
          }
          20% {
            opacity: 0.38;
            transform: translate(6px, -24px) rotate(8deg) scale(1);
          }
          50% {
            opacity: 0.32;
            transform: translate(-10px, -60px) rotate(-12deg) scale(0.96);
          }
          80% {
            opacity: 0.18;
            transform: translate(8px, -95px) rotate(15deg) scale(0.92);
          }
          100% {
            opacity: 0;
            transform: translate(-4px, -130px) rotate(-6deg) scale(0.88);
          }
        }
      `}</style>
    </div>
  );
}
