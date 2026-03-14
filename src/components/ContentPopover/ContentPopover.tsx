import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useId,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { usePopoverContext } from "./PopoverContext";
import { usePopoverPosition } from "./usePopoverPosition";
import "./ContentPopover.css";

interface ContentPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
}

export function ContentPopover({ trigger, children }: ContentPopoverProps) {
  const id = useId();
  const { openId, open, close } = usePopoverContext();
  const isOpen = openId === id;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 400, arrowLeft: 20 });
  const [isVisible, setIsVisible] = useState(false);

  const { calculatePosition } = usePopoverPosition();

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      setPosition(calculatePosition(triggerRef.current));
    }
  }, [calculatePosition]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen, close]);

  const handleTriggerClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isOpen ? close() : open(id);
    },
    [isOpen, open, close, id]
  );

  return (
    <>
      <button
        ref={triggerRef}
        className={`popover-trigger ${isOpen ? "active" : ""}`}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`popover-dropdown ${isVisible ? "show" : ""}`}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            <div
              className="popover-dropdown__arrow"
              style={{ marginLeft: position.arrowLeft - 6 }}
            />
            <div
              className="popover-dropdown__content"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest("a, button")) close();
              }}
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
