import { useState, useCallback } from "react";

export function useLightboxGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const open = useCallback((index = 0) => {
    setInitialIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, initialIndex, open, close };
}
