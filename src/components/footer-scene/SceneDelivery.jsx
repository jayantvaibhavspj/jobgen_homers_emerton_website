import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FOOTER_SCENE_CONFIG } from './footerSceneConfig';

/**
 * SceneDelivery Layer
 * Dedicated separate road strip situated BELOW the bottom bar (Height: 60px).
 *
 * Rules:
 * - Operates inside reserved 60px road strip below bottom bar.
 * - Delivery scooter cruises smoothly on dark asphalt pavement with headlight beam.
 * - Occasional return scooter in opposite direction.
 * - No parked scooter (floating orange bracket removed).
 * - Never overlaps the copyright line, "Powered by Jobgen" pill, or back-to-top button.
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

  const triggerForward = useCallback(() => {
    setForwardPass(true);
    setTimeout(() => {
      setForwardPass(false);
    }, delivery.forwardDuration * 1000);
  }, [delivery.forwardDuration]);

  const triggerReturn = useCallback(() => {
    if (isMobile) return;
    setReturnPass(true);
    setTimeout(() => {
      setReturnPass(false);
    }, delivery.returnDuration * 1000);
  }, [isMobile, delivery.returnDuration]);

  const handleEasterEgg = () => {
    if (bonusPass || isReducedMotion) return;
    setBonusPass(true);
    setTimeout(() => {
      setBonusPass(false);
    }, (delivery.forwardDuration * 0.75) * 1000);
  };

  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    const startTimeout = setTimeout(() => {
      triggerForward();
      forwardTimerRef.current = setInterval(triggerForward, delivery.forwardInterval);
    }, 1000);

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
    <div className="w-full h-full pointer-events-none select-none overflow-hidden relative" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="headlightGradLR" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff8db" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fed7aa" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#fb923c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e8700a" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="headlightGradRL" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fff8db" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fed7aa" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#fb923c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e8700a" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="tailTrailGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ROAD SURFACE (60px height) */}
        <g id="road-surface">
          <rect x="0" y="0" width="1440" height="60" fill="#0d0907" />
          {/* Top curb edge highlight */}
          <line x1="0" y1="2" x2="1440" y2="2" stroke="#2c1a11" strokeWidth="2" />
          {/* Dashed center line */}
          <line
            x1="0"
            y1="32"
            x2="1440"
            y2="32"
            stroke="#26170e"
            strokeWidth="1.5"
            strokeDasharray="14 18"
          />
          {/* Dotted Takeaway Delivery Route */}
          <line
            x1="0"
            y1="25"
            x2="1440"
            y2="25"
            stroke="#ea580c"
            strokeWidth="1.2"
            strokeDasharray="4 10"
            opacity="0.35"
          />
        </g>

        {/* OUTBOUND SCOOTER (Left to Right) */}
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
            {/* Scooter Light Trail */}
            <path d="M -30 36 L -70 36" stroke="url(#tailTrailGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

            {/* Headlight Conical Beam */}
            <polygon
              points="15,28 120,16 135,48 15,36"
              fill="url(#headlightGradLR)"
              opacity="0.45"
            />

            {/* Rear wheel */}
            <circle cx="-16" cy="38" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="-16" cy="38" r="2.5" fill="#f59e0b" />
            {/* Front wheel */}
            <circle cx="16" cy="38" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="16" cy="38" r="2.5" fill="#f59e0b" />

            {/* Chassis & Floorboard */}
            <path
              d="M -16 37 L -2 37 L 4 28 L 14 28 L 16 37"
              fill="none"
              stroke="#e8700a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Steering & Handlebars */}
            <line x1="8" y1="28" x2="6" y2="14" stroke="#e8700a" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="3" y1="14" x2="10" y2="14" stroke="#fbf6f0" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="28" r="2.5" fill="#fffbeb" />

            {/* Homers Takeaway Delivery Box */}
            <rect x="-24" y="13" width="15" height="15" rx="2.5" fill="#ea580c" stroke="#fff3e0" strokeWidth="1" />
            <text x="-16.5" y="24" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>

            {/* Rider */}
            <path d="M -9 27 L -5 14 L 2 16 L 5 27 Z" fill="#2d1c12" />
            <line x1="-3" y1="17" x2="6" y2="15" stroke="#2d1c12" strokeWidth="2" strokeLinecap="round" />
            <circle cx="-3" cy="7" r="5" fill="#e8700a" />
            <path d="M -1 6 Q 2 7 0 10" stroke="#fbf6f0" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* RETURN SCOOTER (Right to Left) */}
        {returnPass && !isReducedMotion && !isMobile && (
          <g
            id="scooter-return"
            style={{
              animation: `scooterDriveReturn ${delivery.returnDuration}s linear forwards`,
              transform: 'translateX(1520px)',
            }}
          >
            <polygon
              points="-15,28 -120,16 -135,48 -15,36"
              fill="url(#headlightGradRL)"
              opacity="0.4"
            />
            <circle cx="16" cy="38" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="16" cy="38" r="2.5" fill="#f59e0b" />
            <circle cx="-16" cy="38" r="6" fill="#1e110a" stroke="#3d2417" strokeWidth="1.5" />
            <circle cx="-16" cy="38" r="2.5" fill="#f59e0b" />

            <path
              d="M 16 37 L 2 37 L -4 28 L -14 28 L -16 37"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line x1="-8" y1="28" x2="-6" y2="14" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="-14" cy="28" r="2.5" fill="#fffbeb" />

            <rect x="9" y="13" width="15" height="15" rx="2.5" fill="#ea580c" stroke="#fff3e0" strokeWidth="1" />
            <text x="16.5" y="24" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>

            <path d="M 9 27 L 5 14 L -2 16 L -5 27 Z" fill="#2d1c12" />
            <line x1="3" y1="17" x2="-6" y2="15" stroke="#2d1c12" strokeWidth="2" strokeLinecap="round" />
            <circle cx="3" cy="7" r="5" fill="#d97706" />
          </g>
        )}

        {/* BONUS SCOOTER (Easter Egg) */}
        {bonusPass && !isReducedMotion && (
          <g
            id="scooter-bonus"
            style={{
              animation: `scooterDriveForward ${delivery.forwardDuration * 0.75}s linear forwards`,
              transform: 'translateX(-120px)',
            }}
          >
            <polygon
              points="15,28 130,12 145,50 15,36"
              fill="url(#headlightGradLR)"
              opacity="0.55"
            />
            <circle cx="-16" cy="38" r="6" fill="#1e110a" stroke="#ff8a1f" strokeWidth="2" />
            <circle cx="16" cy="38" r="6" fill="#1e110a" stroke="#ff8a1f" strokeWidth="2" />
            <rect x="-24" y="13" width="15" height="15" rx="2.5" fill="#ff8a1f" stroke="#fff" strokeWidth="1.2" />
            <circle cx="-3" cy="7" r="5" fill="#ffd166" />
          </g>
        )}

        {/* Easter Egg Trigger */}
        <rect
          x="0"
          y="0"
          width="1440"
          height="60"
          fill="transparent"
          tabIndex="-1"
          className="cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          onClick={handleEasterEgg}
          aria-label="Delivery Scooter Easter Egg"
        />
      </svg>

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
