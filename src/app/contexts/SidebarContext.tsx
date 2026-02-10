import React, { createContext, useContext, useState, ReactNode } from 'react';

type PageType = 'all-conversations' | 'saved-views';

interface SidebarContextType {
  isSecondaryCollapsed: boolean;
  toggleSecondary: () => void;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSecondaryCollapsed, setIsSecondaryCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('all-conversations');

  const toggleSecondary = () => {
    setIsSecondaryCollapsed(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSecondaryCollapsed, toggleSecondary, currentPage, setCurrentPage }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}