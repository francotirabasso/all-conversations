import { useState, useEffect, useCallback } from 'react';

export interface WidgetOrderState {
  statWidgetsOrder: string[];
  section2Order: string[];
  section3Order: string[];
  section4Order: string[];
}

const DEFAULT_ORDER: WidgetOrderState = {
  statWidgetsOrder: [
    'avg-answer-time',
    'avg-handle-time',
    'avg-first-response-time',
    'transfer-rate',
  ],
  section2Order: [
    'deflection-rate',
    'conversation-volume',
  ],
  section3Order: ['sankey'],
  section4Order: ['heatmap'],
};

const STORAGE_KEY = 'dashboard-widget-order';

export function useWidgetOrder(currentViewId?: string) {
  const [widgetOrder, setWidgetOrder] = useState<WidgetOrderState>(DEFAULT_ORDER);

  // Load order on mount or when view changes
  useEffect(() => {
    if (currentViewId) {
      // Load from localStorage for saved views
      const savedViews = localStorage.getItem('saved-views');
      if (savedViews) {
        const views = JSON.parse(savedViews);
        const currentView = views.find((v: any) => v.id === currentViewId);
        if (currentView?.widgetOrder) {
          setWidgetOrder(currentView.widgetOrder);
          return;
        }
      }
    }
    
    // Load from sessionStorage for current session
    const sessionOrder = sessionStorage.getItem(STORAGE_KEY);
    if (sessionOrder) {
      setWidgetOrder(JSON.parse(sessionOrder));
    } else {
      setWidgetOrder(DEFAULT_ORDER);
    }
  }, [currentViewId]);

  // Save to sessionStorage whenever order changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(widgetOrder));
  }, [widgetOrder]);

  // Update a specific section's order
  const updateSectionOrder = useCallback((section: keyof WidgetOrderState, newOrder: string[]) => {
    setWidgetOrder(prev => ({
      ...prev,
      [section]: newOrder,
    }));
  }, []);

  // Reset to default order
  const resetOrder = useCallback(() => {
    setWidgetOrder(DEFAULT_ORDER);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  // Get current order for saving to a view
  const getCurrentOrder = useCallback(() => {
    return widgetOrder;
  }, [widgetOrder]);

  // Move widget between sections
  const moveWidgetBetweenSections = useCallback((
    widgetId: string,
    fromSection: keyof WidgetOrderState,
    toSection: keyof WidgetOrderState,
    toIndex?: number
  ) => {
    setWidgetOrder(prev => {
      // Remove from source section
      const fromArray = [...prev[fromSection]];
      const widgetIndex = fromArray.indexOf(widgetId);
      if (widgetIndex === -1) return prev; // Widget not found
      
      fromArray.splice(widgetIndex, 1);
      
      // Add to destination section
      const toArray = [...prev[toSection]];
      if (toIndex !== undefined) {
        toArray.splice(toIndex, 0, widgetId);
      } else {
        toArray.push(widgetId);
      }
      
      return {
        ...prev,
        [fromSection]: fromArray,
        [toSection]: toArray,
      };
    });
  }, []);

  // Get section for a widget ID
  const getWidgetSection = useCallback((widgetId: string): keyof WidgetOrderState | null => {
    for (const [section, widgets] of Object.entries(widgetOrder) as [keyof WidgetOrderState, string[]][]) {
      if (widgets.includes(widgetId)) {
        return section;
      }
    }
    return null;
  }, [widgetOrder]);

  return {
    widgetOrder,
    updateSectionOrder,
    resetOrder,
    getCurrentOrder,
    moveWidgetBetweenSections,
    getWidgetSection,
  };
}