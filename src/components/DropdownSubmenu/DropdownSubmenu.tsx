import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { MenuItem } from "./types";

interface DropdownSubmenuProps {
  label: ReactNode;
  items: MenuItem[];
  defaultActiveId?: string;
}

export function DropdownSubmenu({ label, items, defaultActiveId }: DropdownSubmenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hasActiveChild = items.some(
    (item) =>
      item.id === defaultActiveId ||
      item.children?.some((child) => child.id === defaultActiveId)
  );

  const close = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setOpenSubmenuId(null);
    }, 200);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 200);
    }
  }, [isOpen, close]);

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
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen, close]);

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      if (!item.children?.length) {
        close();
        return;
      }
      setOpenSubmenuId((prev) => (prev === item.id ? null : item.id));
    },
    [close]
  );

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={triggerRef}
        className={[
          "inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md border-0 cursor-pointer transition-colors duration-150",
          isOpen ? "bg-blue-50 text-blue-700" : "bg-transparent text-gray-800 hover:bg-gray-100",
          hasActiveChild ? "font-semibold" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <span
          className={`text-[11px] transition-transform duration-200 inline-block ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-[calc(100%+6px)] left-0 min-w-55 bg-white border border-gray-200 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-100 transition-[opacity,transform] duration-200 ${
            isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1.5 pointer-events-none"
          }`}
        >
          <ul className="list-none m-0 p-1.5">
            {items.map((item) => (
              <DropdownItem
                key={item.id}
                item={item}
                isSubmenuOpen={openSubmenuId === item.id}
                isActive={item.id === defaultActiveId}
                hasActiveChild={item.children?.some((c) => c.id === defaultActiveId)}
                onItemClick={handleItemClick}
                onLeafClick={close}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  item: MenuItem;
  isSubmenuOpen: boolean;
  isActive: boolean;
  hasActiveChild?: boolean;
  onItemClick: (item: MenuItem) => void;
  onLeafClick: () => void;
}

function DropdownItem({
  item,
  isSubmenuOpen,
  isActive,
  hasActiveChild,
  onItemClick,
  onLeafClick,
}: DropdownItemProps) {
  const hasChildren = !!item.children?.length;

  return (
    <li className="relative">
      <a
        href={item.href ?? "#"}
        className={[
          "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 no-underline",
          isSubmenuOpen ? "bg-blue-50 text-blue-700" : "",
          isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100",
          hasActiveChild ? "font-semibold" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => {
          if (hasChildren) e.preventDefault();
          onItemClick(item);
        }}
      >
        {item.label}
        {hasChildren && (
          <span className="text-[10px] text-gray-400">›</span>
        )}
      </a>

      {hasChildren && isSubmenuOpen && (
        <ul className="list-none m-0 p-1.5 absolute top-0 left-full ml-1.5 min-w-45 bg-white border border-gray-200 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-101">
          {item.children!.map((child) => (
            <li key={child.id}>
              <a
                href={child.href ?? "#"}
                className={[
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150 no-underline",
                  child.active
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={onLeafClick}
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
