import { useRef, useCallback } from "react";

interface UseTouchSwipeOptions {
  initialHeight: number;
  onClose: () => void;
}

/**
 * useDrawerTouch
 *
 * Vanilla original: onTouchStart / onTouchMove / onTouchEnd in DrawerCore.js
 *
 * In the original, startHeight and startY were stored in `this.settings` —
 * mutable object properties that persisted between events.
 *
 * In React we can't use local variables for this (they reset on every render),
 * so we use useRef — a box that holds a mutable value without triggering re-renders.
 * Think of it as `this.settings` from the class version.
 */
export function useDrawerTouch({ initialHeight, onClose }: UseTouchSwipeOptions) {
  const touchState = useRef({
    startY: 0,
    startHeight: 0,
  });

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>, drawerEl: HTMLDivElement | null) => {
      if (!drawerEl) return;
      // Same as: this.settings.startHeight = this.dom.drawer.offsetHeight
      touchState.current.startHeight = drawerEl.offsetHeight;
      touchState.current.startY = e.touches[0].clientY;
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>, drawerEl: HTMLDivElement | null) => {
      if (!drawerEl) return;
      const clientY = e.touches[0].clientY;
      // Same deltaY logic as the original
      const deltaY = clientY - (touchState.current.startY + 20);
      drawerEl.style.height = `${touchState.current.startHeight - deltaY}px`;
    },
    []
  );

  const handleTouchEnd = useCallback(
    (drawerEl: HTMLDivElement | null) => {
      if (!drawerEl) return;
      const twoThirdsHeight = (touchState.current.startHeight * 2) / 3;
      const currentHeight = drawerEl.getBoundingClientRect().height;
      const shouldSnap = currentHeight >= twoThirdsHeight;

      if (shouldSnap) {
        // Snap back to original height — user didn't swipe far enough
        drawerEl.style.height = `${initialHeight}px`;
        drawerEl.style.transform = "translateY(0%)";
      } else {
        // User swiped past the threshold — close the drawer
        onClose();
      }
    },
    [initialHeight, onClose]
  );

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
