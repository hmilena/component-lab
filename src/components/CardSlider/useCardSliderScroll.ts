import { useState, useCallback, useRef } from "react";

interface ScrollConfig {
  speed: number;
  distance: number;
  step: number;
}

type ScrollEdge = {
  atStart: boolean;
  atEnd: boolean;
};

const DEFAULT_CONFIG: ScrollConfig = { speed: 10, distance: 300, step: 10 };

export function useCardSliderScroll(config: ScrollConfig = DEFAULT_CONFIG) {
  const [edge, setEdge] = useState<ScrollEdge>({ atStart: true, atEnd: false });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateEdgeState = useCallback((el: HTMLDivElement) => {
    const maxScroll = el.scrollWidth - el.offsetWidth;
    setEdge({
      atStart: el.scrollLeft <= 0,
      atEnd: el.scrollLeft >= maxScroll - config.step,
    });
  }, [config.step]);

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      updateEdgeState(e.currentTarget);
    },
    [updateEdgeState]
  );

  const scrollTo = useCallback(
    (el: HTMLDivElement, direction: "left" | "right") => {
      if (timerRef.current) clearInterval(timerRef.current);
      let scrolled = 0;
      timerRef.current = setInterval(() => {
        el.scrollLeft += direction === "right" ? config.step : -config.step;
        scrolled += config.step;
        if (scrolled >= config.distance) {
          clearInterval(timerRef.current!);
        }
      }, config.speed);
    },
    [config]
  );

  return { edge, onScroll, scrollTo, updateEdgeState };
}
