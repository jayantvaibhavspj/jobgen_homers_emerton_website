import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * useDragScroll Hook
 * Enables smooth click-and-drag horizontal scrolling on desktop
 * while preserving natural touch scroll on mobile and preventing
 * accidental category clicks when dragging.
 */
export function useDragScroll() {
  const containerRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e) => {
    // Only drag with left mouse button and not on interactive sub-elements
    if (e.button !== 0 || !containerRef.current) return;

    isMouseDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isMouseDownRef.current || !containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startXRef.current;

    // Movement threshold of 6px to separate click from deliberate drag
    if (Math.abs(walk) > 6) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }
      containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    isMouseDownRef.current = false;
    // Keep isDragging state briefly so onClick handlers can check it
    setTimeout(() => {
      setIsDragging(false);
      hasMovedRef.current = false;
    }, 60);
  }, []);

  // Capture clicks if user dragged to scroll, so we don't switch categories accidentally
  const handleClickCapture = useCallback((e) => {
    if (hasMovedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  return {
    containerRef,
    isDragging,
    dragProps: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUpOrLeave,
      onMouseLeave: handleMouseUpOrLeave,
      onClickCapture: handleClickCapture,
    },
  };
}
