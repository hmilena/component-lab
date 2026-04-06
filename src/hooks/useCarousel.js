import { useState, useEffect, useCallback } from "react";

export function useCarousel({
  length,
  loop = true,
  autoplay = false,
  autoplayInterval = 5000,
} = {}) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i) => {
      if (length === 0 || i < 0 || i >= length) return;
      setIndex(i);
    },
    [length]
  );

  const next = useCallback(() => {
    if (length === 0) return;
    setIndex((prev) => {
      if (prev + 1 < length) return prev + 1;
      return loop ? 0 : prev;
    });
  }, [length, loop]);

  const prev = useCallback(() => {
    if (length === 0) return;
    setIndex((prev) => {
      if (prev - 1 >= 0) return prev - 1;
      return loop ? length - 1 : prev;
    });
  }, [length, loop]);

  useEffect(() => {
    if (!autoplay || length <= 1) return;
    const id = setInterval(next, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, length, next]);

  useEffect(() => {
    if (index >= length && length > 0) setIndex(0);
  }, [index, length]);

  return {
    index,
    next,
    prev,
    goTo,
    hasNext: loop || index < length - 1,
    hasPrev: loop || index > 0,
  };
}
