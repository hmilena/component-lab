import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useDrawerTouch } from "./useDrawerTouch";
import { useDrawerPosition, useDrawerInitialHeight, useBodyScrollLock } from "./useDrawerHelpers";
import "./Drawer.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const hasTouchSupport = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const position = useDrawerPosition(750);
  const { initialHeight, measuredRef } = useDrawerInitialHeight();
  useBodyScrollLock(isOpen && !isClosing);

  const setDrawerRef = useCallback(
    (el: HTMLDivElement | null) => {
      (drawerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      measuredRef(el);
    },
    [measuredRef]
  );

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      // Mount first, then add open class on next frame so CSS transition fires
      const raf = requestAnimationFrame(() => setIsAnimatingIn(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setIsAnimatingIn(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 600);
  }, [onClose]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [handleClose]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useDrawerTouch({
    initialHeight: initialHeight.current,
    onClose: handleClose,
  });

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`drawer-container ${isOpen ? "open" : ""}`}>
      <div
        className={`drawer--bg ${isAnimatingIn && !isClosing ? "visible" : ""}`}
        onClick={handleClose}
      />
      <div
        ref={setDrawerRef}
        className={[
          "drawer",
          position,
          isAnimatingIn && !isClosing ? "open" : "",
          isClosing ? "close" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="drawer__header">
          {position === "to-bottom" && hasTouchSupport ? (
            <div
              className="swipe"
              onTouchStart={(e) => handleTouchStart(e, drawerRef.current)}
              onTouchMove={(e) => handleTouchMove(e, drawerRef.current)}
              onTouchEnd={() => handleTouchEnd(drawerRef.current)}
            />
          ) : (
            <button
              className="drawer__header-action"
              onClick={handleClose}
              aria-label="Close drawer"
            >
              ✕
            </button>
          )}
        </div>
        <div className="drawer__content">{children}</div>
      </div>
    </div>
  );
}
