import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneDelivery Layer
 * Road surface with:
 * - Outbound delivery scooter with delivery box driving across every ~8.2s
 * - Headlight cone beam casting light onto road + subtle glowing light trail
 * - Occasional return scooter in opposite direction every ~17.5s
 * - Dotted route line glowing behind
 * - Easter egg: clicking road/scooter area triggers immediate bonus scooter pass
 */
export default function SceneDelivery({
  isPlaying = true,
  isReducedMotion = false,
  isMobile = false,
}) {
  const { delivery } = FOOTER_SCENE_CONFIG;
  const [forwardPass, setForwardPass] = useState(false);
  const [returnPass, setReturnPass] = useState(false);
  const [bonusPass, setBonusPass] = useState(false);

  const forwardTimerRef = useRef(null);
  const returnTimerRef = useRef(null);

  // Trigger forward scooter drive
  const triggerForward = useCallback(() => {
    setForwardPass(true);
    setTimeout(() => {
      setForwardPass(false);
    }, delivery.forwardDuration * 1000);
  }, [delivery.forwardDuration]);

  // Trigger return scooter drive (desktop/tablet only)
  const triggerReturn = useCallback(() => {
    if (isMobile) return;
    setReturnPass(true);
    setTimeout(() => {
      setReturnPass(false);
    }, delivery.returnDuration * 1000);
  }, [isMobile, delivery.returnDuration]);

  // Easter egg: bonus scooter pass
  const handleEasterEgg = () => {
    if (bonusPass || isReducedMotion) return;
    setBonusPass(true);
    setTimeout(() => {
      setBonusPass(false);
    }, (delivery.forwardDuration * 0.75) * 1000); // 25% faster bonus pass
  };

  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    // Start initial forward pass shortly after load
    const startTimeout = setTimeout(() => {
      triggerForward();
      forwardTimerRef.current = setInterval(triggerForward, delivery.forwardInterval);
    }, 1200);

    // Return pass interval (only if not mobile)
    let returnTimeout;
    if (!isMobile) {
      returnTimeout = setTimeout(() => {
        triggerReturn();
        returnTimerRef.current = setInterval(triggerReturn, delivery.returnInterval);
      }, 7000);
    }

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(returnTimeout);
      if (forwardTimerRef.current) clearInterval(forwardTimerRef.current);
      if (returnTimerRef.current) clearInterval(returnTimerRef.current);
    };
  }, [isPlaying, isReducedMotion, isMobile, triggerForward, triggerReturn, delivery.forwardInterval, delivery.returnInterval]);

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
          {/* Headlight beam gradient (Left to Right) */}
          <linearGradient id="headlightGradLR" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff8db" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fed7aa" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#fb923c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e8700a" stopOpacity="0" />
          </linearGradient>

          {/* Headlight beam gradient (Right to Left) */}
          <linearGradient id="headlightGradRL" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fff8db" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fed7aa" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#fb923c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e8700a" stopOpacity="0" />
          </linearGradient>

          {/* Scooter trail red glow */}
          <linearGradient id="tailTrailGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* ROAD SURFACE & CURB                                            */}
        {/* ============================================================== */}
        <g id="road-surface">
          {/* Curb edge highlight */}
          <line x1="0" y1="292" x2="1440" y2="292" stroke="#2c1a11" strokeWidth="2" />
          {/* Road dark asphalt pavement */}
          <rect x="0" y="293" width="1440" height="27" fill="#0d0907" />
          {/* Faint dashed center line */}
          <line
            x1="0"
            y1="305"
            x2="1440"
            y2="305"
            stroke="#26170e"
            strokeWidth="1.5"
            strokeDasharray="14 18"
          />

          {/* Dotted Takeaway Delivery Route (subtly lights up) */}
          <line
            x1="0"
            y1="301"
            x2="1440"
            y2="301"
            stroke="#ea580c"
            strokeWidth="1.2"
            strokeDasharray="4 10"
            opacity="0.32"
          />
        </g>

        {/* ============================================================== */}
        {/* OUTBOUND SCOOTER (Left to Right)                               */}
        {/* ============================================================== */}
        {(forwardPass || isReducedMotion) && (
          <g
            id="scooter-forward"
            style={{
              animation: (!isReducedMotion && forwardPass)
                ? `scooterDriveForward ${delivery.forwardDuration}s linear forwards`
                : 'none',
              transform: isReducedMotion ? 'translateX(720px)' : 'translateX(-120px)',
            }}
          >
            {/* Scooter Light Trail behind */}
            <path d="M -30 294 L -70 294" stroke="url(#tailTrailGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

            {/* Headlight Conical Beam onto road */}
            <polygon
              points="15,286 110,274 125,306 15,294"
              fill="url(#headlightGradLR)"
              opacity="0.4"
            />

            {/* Scooter Silhouette Body */}
            {/* Rear wheel */}
            <circle cx="-16" cy="296" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="-16" cy="296" r="2.5" fill="#f59e0b" />
            {/* Front wheel */}
            <circle cx="16" cy="296" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="16" cy="296" r="2.5" fill="#f59e0b" />

            {/* Chassis & Floorboard */}
            <path
              d="M -16 295 L -2 295 L 4 286 L 14 286 L 16 295"
              fill="none"
              stroke="#e8700a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Front steering column & Handlebars */}
            <line x1="8" y1="286" x2="6" y2="272" stroke="#e8700a" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="3" y1="272" x2="10" y2="272" stroke="#fbf6f0" strokeWidth="2" strokeLinecap="round" />
            {/* Front Headlight Lamp */}
            <circle cx="14" cy="286" r="2.5" fill="#fffbeb" />

            {/* Rear Homers Takeaway Insulated Delivery Box */}
            <rect x="-24" y="271" width="15" height="15" rx="2.5" fill="#ea580c" stroke="#fff3e0" strokeWidth="1" />
            {/* Tiny "H" on delivery bag */}
            <text x="-16.5" y="282" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>

            {/* Scooter Rider Silhouette */}
            {/* Rider Torso */}
            <path d="M -9 285 L -5 272 L 2 274 L 5 285 Z" fill="#2d1c12" />
            {/* Rider Arms holding handlebars */}
            <line x1="-3" y1="275" x2="6" y2="273" stroke="#2d1c12" strokeWidth="2" strokeLinecap="round" />
            {/* Helmet */}
            <circle cx="-3" cy="265" r="5" fill="#e8700a" />
            {/* Helmet Visor */}
            <path d="M -1 264 Q 2 265 0 268" stroke="#fbf6f0" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* ============================================================== */}
        {/* RETURN SCOOTER (Right to Left - Occasional)                    */}
        {/* ============================================================== */}
        {returnPass && !isReducedMotion && !isMobile && (
          <g
            id="scooter-return"
            style={{
              animation: `scooterDriveReturn ${delivery.returnDuration}s linear forwards`,
              transform: 'translateX(1520px)',
            }}
          >
            {/* Headlight Conical Beam (facing left) */}
            <polygon
              points="-15,286 -110,274 -125,306 -15,294"
              fill="url(#headlightGradRL)"
              opacity="0.35"
            />

            {/* Scooter Wheels */}
            <circle cx="16" cy="296" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="16" cy="296" r="2.5" fill="#f59e0b" />
            <circle cx="-16" cy="296" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="-16" cy="296" r="2.5" fill="#f59e0b" />

            {/* Chassis */}
            <path
              d="M 16 295 L 2 295 L -4 286 L -14 286 L -16 295"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Steering */}
            <line x1="-8" y1="286" x2="-6" y2="272" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="-14" cy="286" r="2.5" fill="#fffbeb" />

            {/* Rear Delivery Box */}
            <rect x="9" y="271" width="15" height="15" rx="2.5" fill="#ea580c" stroke="#fff3e0" strokeWidth="1" />
            <text x="16.5" y="282" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>

            {/* Rider */}
            <path d="M 9 285 L 5 272 L -2 274 L -5 285 Z" fill="#2d1c12" />
            <line x1="3" y1="275" x2="-6" y2="273" stroke="#2d1c12" strokeWidth="2" strokeLinecap="round" />
            <circle cx="3" cy="265" r="5" fill="#d97706" />
          </g>
        )}

        {/* ============================================================== */}
        {/* BONUS SCOOTER (Easter Egg Pass)                                */}
        {/* ============================================================== */}
        {bonusPass && !isReducedMotion && (
          <g
            id="scooter-bonus"
            style={{
              animation: `scooterDriveForward ${delivery.forwardDuration * 0.75}s linear forwards`,
              transform: 'translateX(-120px)',
            }}
          >
            <polygon
              points="15,286 130,270 145,308 15,294"
              fill="url(#headlightGradLR)"
              opacity="0.55"
            />
            <circle cx="-16" cy="296" r="6" fill="#1e110a" stroke="#ff8a1f" strokeWidth="2" />
            <circle cx="16" cy="296" r="6" fill="#1e110a" stroke="#ff8a1f" strokeWidth="2" />
            <rect x="-24" y="271" width="15" height="15" rx="2.5" fill="#ff8a1f" stroke="#fff" strokeWidth="1.2" />
            <circle cx="-3" cy="265" r="5" fill="#ffd166" />
          </g>
        )}

        {/* Easter Egg Trigger: Transparent click area over the road */}
        <rect
          x="0"
          y="280"
          width="1440"
          height="35"
          fill="transparent"
          tabIndex="-1"
          className="cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          onClick={handleEasterEgg}
          aria-label="Delivery Scooter Easter Egg"
        />
      </svg>

      {/* Embedded CSS for Scooter Drives */}
      <style>{`
        @keyframes scooterDriveForward {
          0% {
            transform: translateX(-120px);
          }
          100% {
            transform: translateX(1560px);
          }
        }
        @keyframes scooterDriveReturn {
          0% {
            transform: translateX(1560px);
          }
          100% {
            transform: translateX(-120px);
          }
        }
      `}</style>
    </div>
  );
}
