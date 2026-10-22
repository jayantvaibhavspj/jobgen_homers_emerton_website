import React, { useState, useEffect } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneSkyline Layer
 * Distant silhouette of Western Sydney / Emerton suburban rooftops,
 * telephone utility poles with hanging wires, water tank on stilts,
 * silhouette gum trees, and cozy tiny windows turning on one by one.
 */
export default function SceneSkyline({ isPlaying = true, isReducedMotion = false, isMobile = false }) {
  const { skyline } = FOOTER_SCENE_CONFIG;

  // Window states (which ones are illuminated)
  const [litWindows, setLitWindows] = useState([true, false, true, false, true, false, true, false]);

  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    const interval = setInterval(() => {
      setLitWindows((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = !next[idx];
        return next;
      });
    }, skyline.windowToggleInterval);

    return () => clearInterval(interval);
  }, [isPlaying, isReducedMotion, skyline.windowToggleInterval]);

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
          {/* Skyline silhouette gradient */}
          <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#140d0a" />
            <stop offset="100%" stopColor="#0d0806" />
          </linearGradient>

          {/* Window warm glow filter */}
          <radialGradient id="winGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb347" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#e8700a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#17110d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================== */}
        {/* FAR SILHOUETTE: GUM TREES, ROOFTOPS & WATER TANK               */}
        {/* Situated in upper 120px behind shop parapet                    */}
        {/* ============================================================== */}

        {/* Far background hills & low tree clusters */}
        <path
          d="M 0 85 Q 80 73 180 79 Q 280 67 400 83 Q 520 71 680 80 Q 860 67 1040 81 Q 1200 69 1340 77 Q 1400 75 1440 79 L 1440 160 L 0 160 Z"
          fill="#0f0a07"
          opacity="0.85"
        />

        {/* Tree Silhouettes Left & Right */}
        <g fill="#120c09">
          {/* Left gum trees */}
          <path d="M 30 85 Q 35 50 50 30 Q 65 20 75 40 Q 90 25 105 45 Q 120 35 130 60 Q 140 85 140 90 L 20 90 Z" />
          <path d="M 115 88 Q 130 45 150 40 Q 170 35 185 55 Q 195 75 195 90 L 110 90 Z" opacity="0.9" />

          {/* Right gum trees */}
          <path d="M 1260 90 Q 1270 45 1290 30 Q 1310 20 1330 45 Q 1350 30 1370 50 Q 1390 70 1400 90 Z" />
          <path d="M 1360 90 Q 1375 55 1395 45 Q 1415 40 1435 65 L 1440 90 Z" opacity="0.9" />
        </g>

        {/* Suburban Water Tank on Stilts (left-mid) */}
        <g stroke="#160e0a" strokeWidth="1.8" fill="#140d0a">
          {/* Stilts */}
          <line x1="260" y1="40" x2="252" y2="88" />
          <line x1="280" y1="40" x2="288" y2="88" />
          <line x1="254" y1="60" x2="286" y2="72" />
          <line x1="286" y1="60" x2="254" y2="72" />
          {/* Tank body */}
          <rect x="250" y="22" width="40" height="22" rx="3" fill="#160e0a" stroke="none" />
          <ellipse cx="270" cy="22" rx="20" ry="4" fill="#1e130e" stroke="none" />
        </g>

        {/* Power Pole 1 (Left) */}
        <g stroke="#18100b" strokeWidth="2.2" strokeLinecap="round">
          <line x1="190" y1="18" x2="190" y2="90" />
          {/* Crossbar */}
          <line x1="176" y1="26" x2="204" y2="26" strokeWidth="2.5" />
          <line x1="178" y1="34" x2="202" y2="34" strokeWidth="1.8" />
          {/* Insulators */}
          <circle cx="178" cy="24" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
          <circle cx="202" cy="24" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
        </g>

        {/* Power Pole 2 (Right) */}
        <g stroke="#18100b" strokeWidth="2.2" strokeLinecap="round">
          <line x1="1230" y1="15" x2="1230" y2="90" />
          {/* Crossbar */}
          <line x1="1215" y1="23" x2="1245" y2="23" strokeWidth="2.5" />
          {/* Insulators */}
          <circle cx="1217" cy="21" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
          <circle cx="1243" cy="21" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
        </g>

        {/* Draped Power Wires across the skyline */}
        <g fill="none" stroke="#1f140e" strokeWidth="1.2" opacity="0.65">
          <path d="M 0 24 Q 95 38 178 26 Q 380 44 620 36 Q 920 42 1217 21 Q 1330 35 1440 28" />
          <path d="M 0 32 Q 95 46 178 34 Q 380 52 620 44 Q 920 50 1243 21 Q 1340 39 1440 34" />
        </g>

        {/* Suburban Houses & Pitched Rooflines */}
        <g fill="url(#skylineGrad)">
          {/* House 1 (Left) */}
          <path d="M 70 90 L 70 65 L 115 40 L 160 65 L 160 90 Z" />
          <rect x="140" y="42" width="6" height="15" />

          {/* House 2 */}
          <path d="M 215 90 L 215 70 L 245 55 L 305 55 L 315 90 Z" />

          {/* Far commercial block */}
          <rect x="420" y="58" width="110" height="32" rx="1" />
          <rect x="545" y="65" width="85" height="25" rx="1" />

          {/* House 3 (Right) */}
          <path d="M 870 90 L 870 66 L 910 46 L 950 66 L 950 90 Z" />
          <path d="M 945 90 L 955 70 L 990 56 L 1025 70 L 1025 90 Z" />

          {/* House 4 & 5 (Far Right) */}
          <path d="M 1070 90 L 1070 68 L 1115 45 L 1160 68 L 1160 90 Z" />
          <rect x="1170" y="60" width="75" height="30" rx="1" />
        </g>

        {/* Tiny Suburban Domestic Windows */}
        <g>
          {/* Win 0 (House 1) */}
          <rect x="100" y="62" width="8" height="9" rx="1" fill={litWindows[0] ? '#f59e0b' : '#22150e'} opacity={litWindows[0] ? 0.9 : 0.3} />
          {litWindows[0] && <circle cx="104" cy="66" r="8" fill="url(#winGlowGrad)" opacity="0.4" />}

          {/* Win 1 */}
          <rect x="126" y="64" width="7" height="8" rx="1" fill={litWindows[1] ? '#fbbf24' : '#22150e'} opacity={litWindows[1] ? 0.85 : 0.3} />

          {/* Win 2 */}
          <rect x="230" y="72" width="7" height="6" rx="1" fill={litWindows[2] ? '#f59e0b' : '#22150e'} opacity={litWindows[2] ? 0.85 : 0.3} />

          {/* Win 3 */}
          <rect x="450" y="68" width="10" height="7" rx="1" fill={litWindows[3] ? '#fbbf24' : '#1e130c'} opacity={litWindows[3] ? 0.75 : 0.25} />
          <rect x="475" y="68" width="10" height="7" rx="1" fill={litWindows[4] ? '#f59e0b' : '#1e130c'} opacity={litWindows[4] ? 0.85 : 0.25} />

          {/* Win 5 */}
          <rect x="900" y="65" width="8" height="9" rx="1" fill={litWindows[5] ? '#f59e0b' : '#22150e'} opacity={litWindows[5] ? 0.9 : 0.3} />
          {litWindows[5] && <circle cx="904" cy="69" r="8" fill="url(#winGlowGrad)" opacity="0.4" />}

          {/* Win 6 */}
          <rect x="1105" y="64" width="8" height="9" rx="1" fill={litWindows[6] ? '#fbbf24' : '#22150e'} opacity={litWindows[6] ? 0.85 : 0.3} />

          {/* Win 7 */}
          <rect x="1195" y="68" width="9" height="7" rx="1" fill={litWindows[7] ? '#f59e0b' : '#22150e'} opacity={litWindows[7] ? 0.8 : 0.3} />
        </g>
      </svg>
    </div>
  );
}
