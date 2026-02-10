import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

export interface GlobalFilters {
  offices: string[];
  contactCenters: string[];
  agents: string[];
  dateRange: string;
}

export interface WidgetFilters {
  [widgetId: string]: any; // Store filters for each widget by widget ID
}

export interface WidgetOrderState {
  statWidgetsOrder: string[];
  section2Order: string[];
  section3Order: string[];
  section4Order: string[];
}

export interface SavedView {
  id: string;
  name: string;
  description: string;
  filters: GlobalFilters;
  widgetFilters: WidgetFilters;
  hasWidgetFilters: boolean;
  widgetOrder?: WidgetOrderState; // Optional for backward compatibility
  createdAt: number;
}

interface GlobalFiltersContextType {
  filters: GlobalFilters;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
  hasWidgetFiltersApplied: boolean;
  setHasWidgetFiltersApplied: React.Dispatch<React.SetStateAction<boolean>>;
  widgetFilters: WidgetFilters;
  setWidgetFilters: React.Dispatch<React.SetStateAction<WidgetFilters>>;
  savedViews: SavedView[];
  saveView: (name: string, description: string, widgetOrder?: WidgetOrderState) => string; // Return the ID of the saved view
  updateView: (viewId: string, widgetOrder?: WidgetOrderState) => void; // Update an existing view with current filters
  updateViewName: (viewId: string, newName: string) => void; // Update view name only
  loadView: (viewId: string) => void;
  deleteView: (viewId: string) => void;
  currentViewName: string;
  setCurrentViewName: React.Dispatch<React.SetStateAction<string>>;
  currentViewId: string | null;
  setCurrentViewId: React.Dispatch<React.SetStateAction<string | null>>;
  isLoadingView: boolean;
  setIsLoadingView: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalFiltersContext = createContext<GlobalFiltersContextType | undefined>(undefined);

export function GlobalFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<GlobalFilters>({
    offices: [],
    contactCenters: [],
    agents: [],
    dateRange: 'Past 30 days',
  });
  
  const [hasWidgetFiltersApplied, setHasWidgetFiltersApplied] = useState(false);
  const [widgetFilters, setWidgetFilters] = useState<WidgetFilters>({});
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentViewName, setCurrentViewName] = useState('All conversations');
  const [currentViewId, setCurrentViewId] = useState<string | null>(null); // null = default view
  const [isLoadingView, setIsLoadingView] = useState(false);
  
  // Flag to prevent saving during initial load
  const isInitialLoadRef = useRef(true);

  // Load saved views from localStorage on mount
  useEffect(() => {
    console.log('[GlobalFiltersProvider] useEffect - Loading saved views and current state');
    const stored = localStorage.getItem('savedViews');
    if (stored) {
      try {
        const parsedViews = JSON.parse(stored);
        console.log('[GlobalFiltersProvider] Loaded saved views from localStorage:', parsedViews);
        setSavedViews(parsedViews);
      } catch (error) {
        console.error('Error loading saved views:', error);
      }
    }
    
    // Load current view state from sessionStorage (persists during page reloads)
    const currentState = sessionStorage.getItem('currentViewState');
    console.log('[GlobalFiltersProvider] Raw sessionStorage currentViewState:', currentState);
    if (currentState) {
      try {
        const state = JSON.parse(currentState);
        console.log('[GlobalFiltersProvider] Parsed state:', state);
        console.log('[GlobalFiltersProvider] Restoring state from sessionStorage:', state);
        console.log('[GlobalFiltersProvider] - filters:', state.filters);
        console.log('[GlobalFiltersProvider] - widgetFilters:', state.widgetFilters);
        console.log('[GlobalFiltersProvider] - hasWidgetFiltersApplied:', state.hasWidgetFiltersApplied);
        setFilters(state.filters);
        setWidgetFilters(state.widgetFilters || {});
        setHasWidgetFiltersApplied(state.hasWidgetFiltersApplied || false);
        setCurrentViewName(state.currentViewName || 'All conversations');
        setCurrentViewId(state.currentViewId || null);
      } catch (error) {
        console.error('Error loading current view state:', error);
      }
    } else {
      console.log('[GlobalFiltersProvider] No currentViewState found in sessionStorage');
    }
  }, []);

  // Save current view state to sessionStorage whenever it changes
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }
    const state = {
      filters,
      widgetFilters,
      hasWidgetFiltersApplied,
      currentViewName,
      currentViewId,
    };
    console.log('[GlobalFiltersProvider] Saving state to sessionStorage:', state);
    sessionStorage.setItem('currentViewState', JSON.stringify(state));
  }, [filters, widgetFilters, hasWidgetFiltersApplied, currentViewName, currentViewId]);

  // Save views to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedViews', JSON.stringify(savedViews));
  }, [savedViews]);

  const saveView = (name: string, description: string, widgetOrder?: WidgetOrderState) => {
    console.log('[saveView] Starting with name:', name, 'description:', description);
    console.log('[saveView] Current filters:', filters);
    console.log('[saveView] Current widgetFilters:', widgetFilters);
    console.log('[saveView] hasWidgetFiltersApplied:', hasWidgetFiltersApplied);
    console.log('[saveView] widgetOrder:', widgetOrder);
    
    const newView: SavedView = {
      id: `view_${Date.now()}`,
      name,
      description,
      filters: { ...filters },
      widgetFilters: { ...widgetFilters },
      hasWidgetFilters: hasWidgetFiltersApplied,
      widgetOrder: widgetOrder ? { ...widgetOrder } : undefined,
      createdAt: Date.now(),
    };
    
    console.log('[saveView] Created new view:', newView);
    
    setSavedViews(prev => {
      const updated = [...prev, newView];
      console.log('[saveView] Updated savedViews array:', updated);
      return updated;
    });
    
    setCurrentViewName(name);
    setCurrentViewId(newView.id);
    
    console.log('[saveView] Updated currentViewName to:', name);
    console.log('[saveView] Updated currentViewId to:', newView.id);
    
    return newView.id;
  };

  const updateView = (viewId: string, widgetOrder?: WidgetOrderState) => {
    console.log('[updateView] Starting - viewId:', viewId);
    const viewIndex = savedViews.findIndex(v => v.id === viewId);
    console.log('[updateView] Found view index:', viewIndex);
    
    if (viewIndex !== -1) {
      const updatedView: SavedView = {
        id: viewId,
        name: savedViews[viewIndex].name,
        description: savedViews[viewIndex].description,
        filters: { ...filters },
        widgetFilters: { ...widgetFilters },
        hasWidgetFilters: hasWidgetFiltersApplied,
        widgetOrder: widgetOrder ? { ...widgetOrder } : savedViews[viewIndex].widgetOrder,
        createdAt: Date.now(),
      };
      
      console.log('[updateView] Created updated view:', updatedView);
      
      setSavedViews(prev => {
        const updated = [...prev];
        updated[viewIndex] = updatedView;
        console.log('[updateView] Updated savedViews array:', updated);
        return updated;
      });
      
      setCurrentViewName(updatedView.name);
      setCurrentViewId(updatedView.id);
      
      console.log('[updateView] Updated currentViewName to:', updatedView.name);
      console.log('[updateView] Updated currentViewId to:', updatedView.id);
    } else {
      console.log('[updateView] View not found!');
    }
  };

  const updateViewName = (viewId: string, newName: string) => {
    console.log('[updateViewName] Starting - viewId:', viewId, 'newName:', newName);
    const viewIndex = savedViews.findIndex(v => v.id === viewId);
    console.log('[updateViewName] Found view index:', viewIndex);
    
    if (viewIndex !== -1) {
      const updatedView: SavedView = {
        id: viewId,
        name: newName,
        description: savedViews[viewIndex].description,
        filters: { ...filters },
        widgetFilters: { ...widgetFilters },
        hasWidgetFilters: hasWidgetFiltersApplied,
        createdAt: Date.now(),
      };
      
      console.log('[updateViewName] Created updated view:', updatedView);
      
      setSavedViews(prev => {
        const updated = [...prev];
        updated[viewIndex] = updatedView;
        console.log('[updateViewName] Updated savedViews array:', updated);
        return updated;
      });
      
      setCurrentViewName(updatedView.name);
      setCurrentViewId(updatedView.id);
      
      console.log('[updateViewName] Updated currentViewName to:', updatedView.name);
      console.log('[updateViewName] Updated currentViewId to:', updatedView.id);
    } else {
      console.log('[updateViewName] View not found!');
    }
  };

  const loadView = (viewId: string) => {
    console.log('[loadView] Starting - viewId:', viewId);
    const view = savedViews.find(v => v.id === viewId);
    console.log('[loadView] Found view:', view);
    
    if (view) {
      console.log('[loadView] Setting filters:', view.filters);
      setFilters(view.filters);
      
      console.log('[loadView] Setting hasWidgetFiltersApplied:', view.hasWidgetFilters);
      setHasWidgetFiltersApplied(view.hasWidgetFilters);
      
      console.log('[loadView] Setting widgetFilters:', view.widgetFilters);
      setWidgetFilters(view.widgetFilters);
      
      console.log('[loadView] Setting currentViewName:', view.name);
      setCurrentViewName(view.name);
      
      console.log('[loadView] Setting currentViewId:', viewId);
      setCurrentViewId(viewId);
      
      // Save to sessionStorage and reload to ensure widgets read the new state
      const state = {
        filters: view.filters,
        widgetFilters: view.widgetFilters,
        hasWidgetFiltersApplied: view.hasWidgetFilters,
        currentViewName: view.name,
        currentViewId: viewId,
      };
      console.log('[loadView] Saving state and reloading:', state);
      sessionStorage.setItem('currentViewState', JSON.stringify(state));
      window.location.reload();
    } else {
      console.log('[loadView] View not found!');
    }
  };

  const deleteView = (viewId: string) => {
    setSavedViews(prev => prev.filter(v => v.id !== viewId));
  };

  return (
    <GlobalFiltersContext.Provider value={{ 
      filters, 
      setFilters, 
      hasWidgetFiltersApplied, 
      setHasWidgetFiltersApplied,
      widgetFilters,
      setWidgetFilters,
      savedViews,
      saveView,
      updateView,
      updateViewName,
      loadView,
      deleteView,
      currentViewName,
      setCurrentViewName,
      currentViewId,
      setCurrentViewId,
      isLoadingView,
      setIsLoadingView,
    }}>
      {children}
    </GlobalFiltersContext.Provider>
  );
}

export function useGlobalFilters() {
  const context = useContext(GlobalFiltersContext);
  if (!context) {
    // Return default values if context is not available
    return {
      filters: {
        offices: [],
        contactCenters: [],
        agents: [],
        dateRange: 'Past 30 days',
      },
      setFilters: () => {},
      hasWidgetFiltersApplied: false,
      setHasWidgetFiltersApplied: () => {},
      widgetFilters: {},
      setWidgetFilters: () => {},
      savedViews: [],
      saveView: () => '',
      updateView: () => {},
      updateViewName: () => {},
      loadView: () => {},
      deleteView: () => {},
      currentViewName: 'All conversations',
      setCurrentViewName: () => {},
      currentViewId: null,
      setCurrentViewId: () => {},
      isLoadingView: false,
      setIsLoadingView: () => {},
    };
  }
  return context;
}