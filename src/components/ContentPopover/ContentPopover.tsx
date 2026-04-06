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
        className={[
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium",
          "text-blue-700 cursor-pointer border-0 transition-colors duration-150",
          isOpen ? "bg-blue-100" : "bg-transparent hover:bg-blue-50",
        ].join(" ")}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <span
          className={`text-[11px] transition-transform duration-200 inline-block ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`absolute z-1000 transition-[opacity,transform] duration-200 ${
              isVisible
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-1.5 pointer-events-none"
            }`}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            {/* Arrow */}
            <div
              className="w-3 h-3 bg-white border border-gray-200 border-b-0 border-r-0 rotate-45 relative z-10"
              style={{ marginLeft: position.arrowLeft - 6, marginBottom: -6 }}
            />
            {/* Content panel */}
            <div
              className="bg-white border border-gray-200 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4 relative z-20"
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
