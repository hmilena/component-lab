import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useDrawerTouch } from "./useDrawerTouch";
import { useDrawerPosition, useDrawerInitialHeight, useBodyScrollLock } from "./useDrawerHelpers";

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

  const isActive = isAnimatingIn && !isClosing;

  const drawerClasses =
    position === "to-right"
      ? `top-0 right-0 h-full w-[400px] ${isActive ? "translate-x-0" : "translate-x-full"}`
      : `bottom-0 left-0 right-0 w-full min-h-[300px] rounded-t-2xl ${isActive ? "translate-y-0" : "translate-y-full"}`;

  return (
    <div className={`fixed inset-0 z-[1000] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        className={`fixed inset-0 transition-[background-color] duration-300 ease-in-out ${
          isActive ? "bg-[rgba(65,65,65,0.34)]" : "bg-[rgba(65,65,65,0)]"
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={setDrawerRef}
        className={`fixed bg-white transition-transform duration-[600ms] ease-in-out z-[1001] ${drawerClasses}`}
      >
        <div className="flex justify-end px-4 py-3">
          {position === "to-bottom" && hasTouchSupport ? (
            <div
              className="w-10 h-1 bg-gray-300 rounded-full mx-auto cursor-grab touch-none"
              onTouchStart={(e) => handleTouchStart(e, drawerRef.current)}
              onTouchMove={(e) => handleTouchMove(e, drawerRef.current)}
              onTouchEnd={() => handleTouchEnd(drawerRef.current)}
            />
          ) : (
            <button
              className="bg-transparent border-none text-lg cursor-pointer px-2 py-1 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={handleClose}
              aria-label="Close drawer"
            >
              ✕
            </button>
          )}
        </div>
        <div className="px-6 pb-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
