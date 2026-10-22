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
        // Toggle 1 or 2 random windows
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
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYBottom slice"
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
        {/* ============================================================== */}

        {/* Far background hills & low tree clusters */}
        <path
          d="M 0 250 Q 80 238 180 244 Q 280 232 400 248 Q 520 236 680 245 Q 860 232 1040 246 Q 1200 234 1340 242 Q 1400 240 1440 244 L 1440 320 L 0 320 Z"
          fill="#0f0a07"
          opacity="0.8"
        />

        {/* Tree Silhouettes Left & Right */}
        <g fill="#120c09">
          {/* Left gum trees */}
          <path d="M 30 255 Q 35 220 50 200 Q 65 190 75 210 Q 90 195 105 215 Q 120 205 130 230 Q 140 255 140 260 L 20 260 Z" />
          <path d="M 115 258 Q 130 215 150 210 Q 170 205 185 225 Q 195 245 195 260 L 110 260 Z" opacity="0.9" />

          {/* Right gum trees */}
          <path d="M 1260 260 Q 1270 215 1290 200 Q 1310 190 1330 215 Q 1350 200 1370 220 Q 1390 240 1400 260 Z" />
          <path d="M 1360 260 Q 1375 225 1395 215 Q 1415 210 1435 235 L 1440 260 Z" opacity="0.9" />
        </g>

        {/* Suburban Water Tank on Stilts (left-mid) */}
        <g stroke="#160e0a" strokeWidth="1.8" fill="#140d0a">
          {/* Stilts */}
          <line x1="260" y1="210" x2="252" y2="258" />
          <line x1="280" y1="210" x2="288" y2="258" />
          <line x1="254" y1="230" x2="286" y2="242" />
          <line x1="286" y1="230" x2="254" y2="242" />
          {/* Tank body */}
          <rect x="250" y="192" width="40" height="22" rx="3" fill="#160e0a" stroke="none" />
          <ellipse cx="270" cy="192" rx="20" ry="4" fill="#1e130e" stroke="none" />
        </g>

        {/* Power Pole 1 (Left) */}
        <g stroke="#18100b" strokeWidth="2.2" strokeLinecap="round">
          <line x1="190" y1="180" x2="190" y2="260" />
          {/* Crossbar */}
          <line x1="176" y1="188" x2="204" y2="188" strokeWidth="2.5" />
          <line x1="178" y1="196" x2="202" y2="196" strokeWidth="1.8" />
          {/* Insulators */}
          <circle cx="178" cy="186" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
          <circle cx="202" cy="186" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
        </g>

        {/* Power Pole 2 (Right) */}
        <g stroke="#18100b" strokeWidth="2.2" strokeLinecap="round">
          <line x1="1230" y1="175" x2="1230" y2="260" />
          {/* Crossbar */}
          <line x1="1215" y1="183" x2="1245" y2="183" strokeWidth="2.5" />
          {/* Insulators */}
          <circle cx="1217" cy="181" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
          <circle cx="1243" cy="181" r="1.5" fill="#f59e0b" opacity="0.6" stroke="none" />
        </g>

        {/* Draped Power Wires across the skyline */}
        <g fill="none" stroke="#1f140e" strokeWidth="1.2" opacity="0.65">
          <path d="M 0 178 Q 95 196 178 186 Q 380 208 620 198 Q 920 205 1217 181 Q 1330 195 1440 185" />
          <path d="M 0 188 Q 95 204 178 196 Q 380 216 620 206 Q 920 213 1243 181 Q 1340 199 1440 192" />
        </g>

        {/* Suburban Houses & Pitched Rooflines (midground silhouette) */}
        <g fill="url(#skylineGrad)">
          {/* House 1 (Left) */}
          <path d="M 70 260 L 70 235 L 115 210 L 160 235 L 160 260 Z" />
          {/* Chimney */}
          <rect x="140" y="212" width="6" height="15" />

          {/* House 2 (Water tank neighbor) */}
          <path d="M 215 260 L 215 240 L 245 225 L 305 225 L 315 260 Z" />

          {/* Far commercial block (behind shop) */}
          <rect x="420" y="228" width="110" height="35" rx="1" />
          <rect x="545" y="235" width="85" height="28" rx="1" />

          {/* House 3 (Right of shop) */}
          <path d="M 870 260 L 870 236 L 910 216 L 950 236 L 950 260 Z" />
          <path d="M 945 260 L 955 240 L 990 226 L 1025 240 L 1025 260 Z" />

          {/* House 4 & 5 (Far Right) */}
          <path d="M 1070 260 L 1070 238 L 1115 215 L 1160 238 L 1160 260 Z" />
          <rect x="1170" y="230" width="75" height="32" rx="1" />
        </g>

        {/* Tiny Suburban Domestic Windows (Warm glow toggles on/off) */}
        <g>
          {/* Win 0 (House 1) */}
          <rect x="100" y="232" width="8" height="9" rx="1" fill={litWindows[0] ? '#f59e0b' : '#22150e'} opacity={litWindows[0] ? 0.9 : 0.3} />
          {litWindows[0] && <circle cx="104" cy="236" r="8" fill="url(#winGlowGrad)" opacity="0.4" />}

          {/* Win 1 (House 1 right) */}
          <rect x="126" y="234" width="7" height="8" rx="1" fill={litWindows[1] ? '#fbbf24' : '#22150e'} opacity={litWindows[1] ? 0.85 : 0.3} />

          {/* Win 2 (House 2) */}
          <rect x="230" y="242" width="7" height="6" rx="1" fill={litWindows[2] ? '#f59e0b' : '#22150e'} opacity={litWindows[2] ? 0.85 : 0.3} />

          {/* Win 3 (Commercial block) */}
          <rect x="450" y="238" width="10" height="7" rx="1" fill={litWindows[3] ? '#fbbf24' : '#1e130c'} opacity={litWindows[3] ? 0.75 : 0.25} />
          <rect x="475" y="238" width="10" height="7" rx="1" fill={litWindows[4] ? '#f59e0b' : '#1e130c'} opacity={litWindows[4] ? 0.85 : 0.25} />

          {/* Win 5 (House 3) */}
          <rect x="900" y="235" width="8" height="9" rx="1" fill={litWindows[5] ? '#f59e0b' : '#22150e'} opacity={litWindows[5] ? 0.9 : 0.3} />
          {litWindows[5] && <circle cx="904" cy="239" r="8" fill="url(#winGlowGrad)" opacity="0.4" />}

          {/* Win 6 (House 4) */}
          <rect x="1105" y="234" width="8" height="9" rx="1" fill={litWindows[6] ? '#fbbf24' : '#22150e'} opacity={litWindows[6] ? 0.85 : 0.3} />

          {/* Win 7 (House 5) */}
          <rect x="1195" y="238" width="9" height="7" rx="1" fill={litWindows[7] ? '#f59e0b' : '#22150e'} opacity={litWindows[7] ? 0.8 : 0.3} />
        </g>
      </svg>
    </div>
  );
}
