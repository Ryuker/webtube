import { ReactNode, createContext, useState } from "react";

type SidebarProviderProps = {
  children: ReactNode
};

type SidebarContextType = {
  isLargeOpen: boolean
  isSmallOpen: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export default function SidebarProvider({children}: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen(s => !s); // set to the opposite of the value
    } else {
      setIsLargeOpen(l => !l);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false); // set to the opposite of the value
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider value={{
      isLargeOpen, 
      isSmallOpen, 
      toggle, 
      close
    }}>
      {children}
    </SidebarContext.Provider>
  );
}