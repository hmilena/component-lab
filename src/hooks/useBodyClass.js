import { useEffect } from "react";

export function useBodyClass(className, enabled = true) {
  useEffect(() => {
    if (!className) return;
    if (enabled) document.body.classList.add(className);
    else document.body.classList.remove(className);
    return () => document.body.classList.remove(className);
  }, [className, enabled]);
}
