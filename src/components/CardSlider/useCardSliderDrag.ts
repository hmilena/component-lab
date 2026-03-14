import { useRef, useCallback } from "react";

export function useCardSliderDrag(itemsRef: React.RefObject<HTMLDivElement | null>) {
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const startDragging = useCallback(
    (e: React.MouseEvent) => {
      if (!itemsRef.current) return;
      dragState.current.isDown = true;
      dragState.current.startX = e.pageX - itemsRef.current.offsetLeft;
      dragState.current.scrollLeft = itemsRef.current.scrollLeft;
    },
    [itemsRef]
  );

  const stopDragging = useCallback(() => {
    dragState.current.isDown = false;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragState.current.isDown || !itemsRef.current) return;
      e.preventDefault();
      const x = e.pageX - itemsRef.current.offsetLeft;
      itemsRef.current.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX);
    },
    [itemsRef]
  );

  return { startDragging, stopDragging, onMouseMove };
}
