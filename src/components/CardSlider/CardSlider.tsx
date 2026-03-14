import { useRef, useEffect, ReactNode } from "react";
import { useCardSliderDrag } from "./useCardSliderDrag";
import { useCardSliderScroll } from "./useCardSliderScroll";
import { useCardSliderItems } from "./useCardSliderItems";
import "./CardSlider.css";

interface CardSliderProps {
  children: ReactNode;
  speed?: number;
  distance?: number;
  step?: number;
}

export function CardSlider({
  children,
  speed = 10,
  distance = 300,
  step = 10,
}: CardSliderProps) {
  const itemsRef = useRef<HTMLDivElement>(null);
  const itemsVisible = useCardSliderItems();
  const { edge, onScroll, scrollTo, updateEdgeState } = useCardSliderScroll({ speed, distance, step });
  const { startDragging, stopDragging, onMouseMove } = useCardSliderDrag(itemsRef);

  // Check edge state on mount and whenever itemsVisible changes
  useEffect(() => {
    if (itemsRef.current) updateEdgeState(itemsRef.current);
  }, [itemsVisible, updateEdgeState]);

  const containerClass = [
    "cardslider",
    !edge.atStart && !edge.atEnd ? "has-scroll" : "",
    edge.atStart ? "start-of-scroll" : "",
    edge.atEnd ? "end-of-scroll" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={containerClass}
      style={{ "--items": itemsVisible } as React.CSSProperties}
    >
      <div
        ref={itemsRef}
        className="cardslider__items"
        onScroll={onScroll}
        onMouseDown={startDragging}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {children}
      </div>

      <div className="cardslider__arrows">
        <button
          className={`cardslider__arrow cardslider__arrow--prev ${edge.atStart ? "disabled" : ""}`}
          onClick={() => itemsRef.current && scrollTo(itemsRef.current, "left")}
          aria-label="Previous"
          disabled={edge.atStart}
        >
          ←
        </button>
        <button
          className={`cardslider__arrow cardslider__arrow--next ${edge.atEnd ? "disabled" : ""}`}
          onClick={() => itemsRef.current && scrollTo(itemsRef.current, "right")}
          aria-label="Next"
          disabled={edge.atEnd}
        >
          →
        </button>
      </div>
    </div>
  );
}
