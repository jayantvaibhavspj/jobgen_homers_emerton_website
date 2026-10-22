import React, { useState, useRef, useCallback } from 'react';
import { Check } from 'lucide-react';
import MiniCart from './MiniCart';
import MiniChat from './MiniChat';
import MiniTimer from './MiniTimer';

/**
 * STEP CARD COMPONENT
 * -------------------------------------------------------------
 * Encapsulates the step card layout, 3D mouse parallax tilt,
 * active glowing state, icon ring pop, and embedded micro-animation.
 */
export default function StepCard({
  step,
  index,
  cardRef,
  iconRingRef,
  badgeRef,
  isActive = false,
  isDone = false,
  isLight = true,
  enableTilt = true,
}) {
  const [hoverKey, setHoverKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const cardInternalRef = useRef(null);

  const IconComponent = step.icon;

  // 3D Mouse Parallax Tilt (Desktop only)
  const handleMouseMove = useCallback((e) => {
    if (!enableTilt || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -4;
    const rotY = ((x - centerX) / centerX) * 4;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px)`,
      transition: 'transform 0.1s ease-out',
    });
  }, [enableTilt]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.4s ease-out',
    });
  };

  return (
    <div
      ref={(el) => {
        cardInternalRef.current = el;
        if (typeof cardRef === 'function') cardRef(el);
        else if (cardRef) cardRef.current = el;
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`order-step-card card-box rounded-[22px] p-6 sm:p-8 transition-all duration-300 flex flex-col items-center text-center group will-change-transform transform-gpu ${
        isActive || isHovered ? 'active-card -translate-y-1.5' : ''
      }`}
    >
      {/* 1. Step Number & Circular Icon */}
      <div className="relative mb-4">
        {/* Animated Icon Ring */}
        <div
          ref={iconRingRef}
          style={{
            backgroundColor: (isActive || isHovered) ? '#e8700a' : 'var(--card-icon-ring-bg)',
            borderColor: (isActive || isHovered) ? 'transparent' : 'var(--card-icon-ring-border)',
            color: (isActive || isHovered) ? '#ffffff' : 'var(--card-icon-ring-text)',
          }}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-warm border will-change-transform ${
            isActive || isHovered
              ? 'scale-105 shadow-glow-orange'
              : 'group-hover:scale-110'
          }`}
        >
          <IconComponent className="w-7 h-7" />
        </div>

        {/* Step Number Badge / Done State */}
        <span
          ref={badgeRef}
          style={
            isDone
              ? {}
              : isActive
              ? {}
              : {
                  backgroundColor: 'var(--card-num-badge-bg)',
                  color: 'var(--card-num-badge-text)',
                }
          }
          className={`absolute -top-2 -right-2 text-[11px] font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm will-change-transform ${
            isDone
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : isActive
              ? 'bg-orange-burnt text-white border border-amber-300 scale-110'
              : ''
          }`}
        >
          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.num}
        </span>
      </div>

      {/* 2. Mini Embedded Micro-Animation */}
      <div className="w-full">
        {index === 0 && (
          <MiniCart
            isPlaying={isActive || isHovered}
            triggerKey={hoverKey}
            isLight={isLight}
          />
        )}
        {index === 1 && (
          <MiniChat
            isPlaying={isActive || isHovered}
            triggerKey={hoverKey}
            isLight={isLight}
          />
        )}
        {index === 2 && (
          <MiniTimer
            isPlaying={isActive || isHovered}
            triggerKey={hoverKey}
            isLight={isLight}
            enableOpenClosed={true}
          />
        )}
      </div>

      {/* 3. Step Title (Preserved Exact Copy) */}
      <h3
        className={`text-2xl font-serif font-bold mb-3 transition-colors mt-2 card-box-heading ${
          isActive || isHovered
            ? 'text-orange-burnt'
            : 'group-hover:text-orange-burnt'
        }`}
      >
        {step.title}
      </h3>

      {/* 4. Step Description (Preserved Exact Copy) */}
      <p className="text-xs sm:text-sm leading-relaxed card-box-body">
        {step.desc}
      </p>
    </div>
  );
}
