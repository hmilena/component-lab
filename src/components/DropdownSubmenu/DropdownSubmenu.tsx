import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { MenuItem } from "./types";
import "./DropdownSubmenu.css";

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

  // Derive which top-level item has an active descendant
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

  // ESC to close
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [close]);

  // Click outside to close
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
      // Toggle submenu — close if already open, open if not
      setOpenSubmenuId((prev) => (prev === item.id ? null : item.id));
    },
    [close]
  );

  return (
    <div
      ref={containerRef}
      className={`dropdown ${isOpen ? "dropdown--open" : ""}`}
    >
      <button
        ref={triggerRef}
        className={[
          "dropdown__trigger",
          isOpen ? "active" : "",
          hasActiveChild ? "has-child-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <span className="dropdown__trigger-arrow">▾</span>
      </button>

      {isOpen && (
        <div className={`dropdown__menu ${isVisible ? "show" : ""}`}>
          <ul className="dropdown__list">
            {items.map((item) => (
              <DropdownItem
                key={item.id}
                item={item}
                isSubmenuOpen={openSubmenuId === item.id}
                isActive={item.id === defaultActiveId}
                hasActiveChild={item.children?.some(
                  (c) => c.id === defaultActiveId
                )}
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
    <li
      className={[
        "dropdown__item",
        isActive ? "active" : "",
        hasActiveChild ? "has-child-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dropdown__item-row">
        <a
          href={item.href ?? "#"}
          className={[
            "dropdown__link",
            isSubmenuOpen ? "open-submenu" : "",
            isActive ? "active" : "",
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
            <span className="dropdown__link-arrow">
              ›
            </span>
          )}
        </a>
      </div>

      {hasChildren && isSubmenuOpen && (
        <ul className="dropdown__submenu show">
          {item.children!.map((child) => (
            <li key={child.id} className="dropdown__item">
              <a
                href={child.href ?? "#"}
                className={`dropdown__link ${child.active ? "active" : ""}`}
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
