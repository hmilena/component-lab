import { useState, useEffect, useCallback, useRef } from "react";

export function useDrawerPosition(breakpoint = 750) {
  const [position, setPosition] = useState<"to-right" | "to-bottom">(() =>
    window.innerWidth <= breakpoint ? "to-bottom" : "to-right"
  );

  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const width = entries[0].contentBoxSize[0].inlineSize;
      setPosition(width <= breakpoint ? "to-bottom" : "to-right");
    });
    observerRef.current.observe(document.body);
    return () => observerRef.current?.disconnect();
  }, [breakpoint]);

  return position;
}

export function useDrawerInitialHeight() {
  const initialHeight = useRef<number>(0);

  const measuredRef = useCallback((el: HTMLDivElement | null) => {
    if (el && initialHeight.current === 0) {
      initialHeight.current = el.offsetHeight;
    }
  }, []);

  return { initialHeight, measuredRef };
}

export function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
}
