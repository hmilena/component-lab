import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useDrawerTouch } from "./useDrawerTouch";
import { useDrawerPosition, useDrawerInitialHeight, useBodyScrollLock } from "./useDrawerHelpers";
import "./Drawer.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Drawer Component
 *
 * React translation of DrawerCore.js (v3.0.0)
 *
 * --- Key mental model shift ---
 *
 * Vanilla: DOM is the source of truth.
 *   You read classes from elements, mutate them directly,
 *   and wire up observers to react to those mutations.
 *
 * React: State is the source of truth.
 *   `isOpen` (prop) and `isClosing` (state) drive everything.
 *   The DOM updates automatically when state changes.
 *   No MutationObserver needed — React IS the observer.
 *
 * Vanilla had MutationObserver watching for the 'open' class.
 * Here, we just respond to the `isOpen` prop directly.
 */
export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  /**
   * isClosing handles the exit animation.
   *
   * Vanilla original: onCloseDrawerWithAnimation() added a 'close' class,
   * set transform, then used setTimeout(resetAttributes, 600) to clean up.
   *
   * Here: when isOpen becomes false, we set isClosing=true (which triggers
   * the CSS exit animation), then after 600ms we clear it.
   */
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const hasTouchSupport = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Custom hooks — each one maps to a chunk of logic from the original class
  const position = useDrawerPosition(750);
  const { initialHeight, measuredRef } = useDrawerInitialHeight();
  useBodyScrollLock(isOpen && !isClosing);

  /**
   * Merges two refs (measuredRef for height measurement + drawerRef for touch handlers).
   * In vanilla this wasn't needed — you just had this.dom.drawer for everything.
   */
  const setDrawerRef = useCallback(
    (el: HTMLDivElement | null) => {
      (drawerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      measuredRef(el);
    },
    [measuredRef]
  );

  // Handle open → trigger visible state for CSS transition
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  // Handle close → run exit animation, then hide
  // This replaces: onCloseDrawerWithAnimation + setTimeout(resetAttributes, 600)
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 600);
  }, [onClose]);

  // ESC key handler — same as handleKeyUpEvent in the original
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [handleClose]);

  // Touch gesture hooks — maps directly to onTouchStart/Move/End
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useDrawerTouch({
    initialHeight: initialHeight.current,
    onClose: handleClose,
  });

  if (!isVisible && !isOpen) return null;

  return (
    /**
     * createPortal is the React equivalent of:
     * this.dom.bd.appendChild(this.variables.newDrop)
     *
     * It renders the drawer at the <body> level regardless of
     * where <Drawer> is used in the component tree.
     * Uncomment the import and wrap the return if you want portal behavior:
     * import { createPortal } from 'react-dom'
     * return createPortal(<div>...</div>, document.body)
     */
    <div className={`drawer-container ${isOpen ? "open" : ""}`}>
      {/* Overlay / background — click closes drawer, same as bg.addEventListener('click', onCloseDrawer) */}
      <div
        className={`drawer--bg ${isOpen && !isClosing ? "visible" : ""}`}
        onClick={handleClose}
      />

      <div
        ref={setDrawerRef}
        className={[
          "drawer",
          position,
          isOpen && !isClosing ? "open" : "",
          isClosing ? "close" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="drawer__header">
          {/**
           * In the original: hasTouchSupport determined whether to show
           * the swipe handle or the close button.
           * Same logic here, but expressed as JSX conditional rendering
           * instead of classList.add/remove.
           */}
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
