import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface PopoverContextValue {
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
}

const PopoverContext = createContext<PopoverContextValue>({
  openId: null,
  open: () => {},
  close: () => {},
});

export function PopoverProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  return (
    <PopoverContext.Provider value={{ openId, open, close }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function usePopoverContext() {
  return useContext(PopoverContext);
}
