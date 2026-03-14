import { useCallback } from "react";

const DROPDOWN_MAX_WIDTH = 400;

interface Position {
  top: number;
  left: number;
  width: number;
  arrowLeft: number;
}

export function usePopoverPosition() {
  const calculatePosition = useCallback(
    (triggerEl: HTMLElement): Position => {
      const rect = triggerEl.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 8;
      const viewportWidth = window.innerWidth;
      const MARGIN = 8;

      // Available space to the right of the trigger's left edge
      const availableWidth = viewportWidth - rect.left - MARGIN;
      const width = Math.min(DROPDOWN_MAX_WIDTH, availableWidth);

      // Align left edge of dropdown with left edge of trigger
      let left = rect.left + window.scrollX;

      // If it overflows on the right, shift left
      if (left + width > viewportWidth - MARGIN) {
        left = viewportWidth - width - MARGIN;
      }

      // Never go off-screen on the left
      if (left < MARGIN) left = MARGIN;

      // Arrow points to the center of the trigger, relative to dropdown's left
      const triggerCenter = rect.left + rect.width / 2 + window.scrollX;
      const arrowLeft = Math.max(16, Math.min(triggerCenter - left, width - 16));

      return { top, left, width, arrowLeft };
    },
    []
  );

  return { calculatePosition };
}
