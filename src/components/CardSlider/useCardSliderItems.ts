import { useState, useEffect } from "react";

interface BreakpointConfig {
  desktop: number;
  tablet: number;
  phone: number;
}

const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  desktop: 4,
  tablet: 3,
  phone: 2,
};

function getItemCount(width: number, bp: BreakpointConfig) {
  if (width < 480) return bp.phone;
  if (width < 1024) return bp.tablet;
  return bp.desktop;
}

export function useCardSliderItems(breakpoints: BreakpointConfig = DEFAULT_BREAKPOINTS) {
  const [itemsVisible, setItemsVisible] = useState(() =>
    getItemCount(window.innerWidth, breakpoints)
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setItemsVisible(getItemCount(entries[0].contentRect.width, breakpoints));
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [breakpoints]);

  return itemsVisible;
}
