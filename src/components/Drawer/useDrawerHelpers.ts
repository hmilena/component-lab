import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useDrawerPosition
 *
 * Vanilla original: the ResizeObserver in DrawerCore.js constructor watched
 * the body and toggled 'to-right' / 'to-bottom' classes on the drawer element.
 *
 * In React, instead of adding/removing CSS classes manually,
 * we derive the position from state and let React update the className.
 *
 * ResizeObserver → setState → React re-renders → className updates automatically.
 * This is the core mental shift from imperative (vanilla) to declarative (React).
 */
export function useDrawerPosition(breakpoint = 750) {
  const [position, setPosition] = useState<"to-right" | "to-bottom">(() =>
    window.innerWidth <= breakpoint ? "to-bottom" : "to-right"
  );

  // useRef stores the observer instance across renders — same as this.resizeObserver
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    // Same logic as: entry.contentBoxSize[0].inlineSize <= 750
    observerRef.current = new ResizeObserver((entries) => {
      const width = entries[0].contentBoxSize[0].inlineSize;
      setPosition(width <= breakpoint ? "to-bottom" : "to-right");
    });

    observerRef.current.observe(document.body);

    // This is the React equivalent of destroy() — runs on unmount
    return () => observerRef.current?.disconnect();
  }, [breakpoint]);

  return position;
}

/**
 * useDrawerInitialHeight
 *
 * Vanilla original: _this.variables.initialHeight = `${_this.dom.drawer.offsetHeight}px`
 * Called once in init() after the DOM was ready.
 *
 * In React, we use useCallback + useRef to capture the height
 * the first time the drawer ref is attached to the DOM.
 * The ref callback fires when the element mounts — equivalent to init().
 */
export function useDrawerInitialHeight() {
  const initialHeight = useRef<number>(0);

  const measuredRef = useCallback((el: HTMLDivElement | null) => {
    if (el && initialHeight.current === 0) {
      initialHeight.current = el.offsetHeight;
    }
  }, []);

  return { initialHeight, measuredRef };
}

/**
 * useBodyScrollLock
 *
 * Vanilla original: document.body.classList.add('lock-body')
 * Called when the drawer opened, removed on close.
 *
 * In React we sync it with useEffect — whenever `isOpen` changes,
 * the effect runs and updates the body class accordingly.
 */
export function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lock-body");
    } else {
      document.body.classList.remove("lock-body");
    }
    // Cleanup: always remove on unmount
    return () => document.body.classList.remove("lock-body");
  }, [isOpen]);
}
