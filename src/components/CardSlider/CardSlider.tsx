import { Children, useRef, useEffect, ReactNode } from "react";
import { useCardSliderDrag } from "./useCardSliderDrag";
import { useCardSliderScroll } from "./useCardSliderScroll";
import { useCardSliderItems } from "./useCardSliderItems";

const GAP = 16;

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

  useEffect(() => {
    if (itemsRef.current) updateEdgeState(itemsRef.current);
  }, [itemsVisible, updateEdgeState]);

  const itemStyle: React.CSSProperties = {
    flex: `0 0 calc((100% - ${itemsVisible - 1} * ${GAP}px) / ${itemsVisible})`,
    minWidth: 0,
  };

  const fadeHeight = "calc(100% - 56px)";

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 40,
          height: fadeHeight,
          pointerEvents: "none",
          zIndex: 10,
          background: "linear-gradient(to right, white, transparent)",
          opacity: edge.atStart ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 40,
          height: fadeHeight,
          pointerEvents: "none",
          zIndex: 10,
          background: "linear-gradient(to left, white, transparent)",
          opacity: edge.atEnd ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />

      {/* Scrollable track */}
      <div
        ref={itemsRef}
        style={{
          display: "flex",
          gap: GAP,
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          cursor: "grab",
          userSelect: "none",
        }}
        onScroll={onScroll}
        onMouseDown={startDragging}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {Children.map(children, (child) => (
          <div style={itemStyle}>{child}</div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
        <button
          className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-[opacity,background-color] duration-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default disabled:pointer-events-none"
          onClick={() => itemsRef.current && scrollTo(itemsRef.current, "left")}
          aria-label="Previous"
          disabled={edge.atStart}
        >
          ←
        </button>
        <button
          className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-[opacity,background-color] duration-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default disabled:pointer-events-none"
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
