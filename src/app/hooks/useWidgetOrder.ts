import { useState, useEffect, useCallback } from 'react';

// New dynamic section structure
export interface Section {
  id: string;
  widgetIds: string[];
  order: number;
}

// New state structure with array of sections
export interface WidgetOrderState {
  sections: Section[];
}

// Old structure for migration compatibility
interface LegacyWidgetOrderState {
  statWidgetsOrder: string[];
  section2Order: string[];
  section3Order: string[];
  section4Order: string[];
}

// Default order - migrated to new format
export const DEFAULT_ORDER: WidgetOrderState = {
  sections: [
    {
      id: 'section-1',
      widgetIds: [
        'avg-answer-time',
        'avg-handle-time',
        'avg-first-response-time',
        'transfer-rate',
      ],
      order: 0,
    },
    {
      id: 'section-2',
      widgetIds: [
        'deflection-rate',
        'conversation-volume',
      ],
      order: 1,
    },
    {
      id: 'section-3',
      widgetIds: ['sankey'],
      order: 2,
    },
    {
      id: 'section-4',
      widgetIds: ['heatmap'],
      order: 3,
    },
  ],
};

const STORAGE_KEY = 'dashboard-widget-order';

// Migration function from old format to new format
function migrateToSections(oldState: LegacyWidgetOrderState): WidgetOrderState {
  return {
    sections: [
      {
        id: 'section-1',
        widgetIds: oldState.statWidgetsOrder || [],
        order: 0,
      },
      {
        id: 'section-2',
        widgetIds: oldState.section2Order || [],
        order: 1,
      },
      {
        id: 'section-3',
        widgetIds: oldState.section3Order || [],
        order: 2,
      },
      {
        id: 'section-4',
        widgetIds: oldState.section4Order || [],
        order: 3,
      },
    ].filter(section => section.widgetIds.length > 0), // Remove empty sections
  };
}

// Check if state is in old format
function isLegacyFormat(state: any): state is LegacyWidgetOrderState {
  return state && !state.sections && (
    state.statWidgetsOrder !== undefined ||
    state.section2Order !== undefined ||
    state.section3Order !== undefined ||
    state.section4Order !== undefined
  );
}

export function useWidgetOrder(currentViewId?: string) {
  const [widgetOrder, setWidgetOrder] = useState<WidgetOrderState>(DEFAULT_ORDER);

  // Load order on mount or when view changes
  useEffect(() => {
    if (currentViewId) {
      // Load from localStorage for saved views
      const savedViews = localStorage.getItem('saved-views');
      if (savedViews) {
        try {
          const views = JSON.parse(savedViews);
          const currentView = views.find((v: any) => v.id === currentViewId);

          if (currentView?.widgetOrder) {
            // Check if needs migration
            if (isLegacyFormat(currentView.widgetOrder)) {
              const migrated = migrateToSections(currentView.widgetOrder);
              setWidgetOrder(migrated);

              // Save migrated version back to localStorage
              const updatedViews = views.map((v: any) =>
                v.id === currentViewId
                  ? { ...v, widgetOrder: migrated }
                  : v
              );
              localStorage.setItem('saved-views', JSON.stringify(updatedViews));
            } else {
              setWidgetOrder(currentView.widgetOrder);
            }
            return;
          }
        } catch (error) {
          console.error('Error loading saved view:', error);
        }
      }
    }

    // Load from sessionStorage for current session
    try {
      const sessionOrder = sessionStorage.getItem(STORAGE_KEY);
      if (sessionOrder) {
        const parsed = JSON.parse(sessionOrder);

        // Check if needs migration
        if (isLegacyFormat(parsed)) {
          const migrated = migrateToSections(parsed);
          setWidgetOrder(migrated);
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        } else {
          setWidgetOrder(parsed);
        }
      } else {
        setWidgetOrder(DEFAULT_ORDER);
      }
    } catch (error) {
      console.error('Error loading session order:', error);
      setWidgetOrder(DEFAULT_ORDER);
    }
  }, [currentViewId]);

  // Save to sessionStorage whenever order changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(widgetOrder));
    } catch (error) {
      console.error('Error saving widget order:', error);
    }
  }, [widgetOrder]);

  // Clean up empty sections (maintain minimum 1 section)
  const cleanupEmptySections = useCallback((sections: Section[]): Section[] => {
    const nonEmpty = sections.filter(s => s.widgetIds.length > 0);

    // Ensure at least 1 section exists
    if (nonEmpty.length === 0) {
      return [{
        id: `section-${Date.now()}`,
        widgetIds: [],
        order: 0,
      }];
    }

    // Update order values after cleanup
    return nonEmpty.map((section, index) => ({
      ...section,
      order: index,
    }));
  }, []);

  // Update a specific section's widget order
  const updateSectionOrder = useCallback((sectionId: string, newOrder: string[]) => {
    setWidgetOrder(prev => {
      const sections = prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, widgetIds: newOrder }
          : section
      );
      return { sections: cleanupEmptySections(sections) };
    });
  }, [cleanupEmptySections]);

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
    fromSectionId: string,
    toSectionId: string,
    toIndex?: number
  ) => {
    setWidgetOrder(prev => {
      const sections = prev.sections.map(section => {
        if (section.id === fromSectionId) {
          // Remove from source section
          return {
            ...section,
            widgetIds: section.widgetIds.filter(id => id !== widgetId),
          };
        } else if (section.id === toSectionId) {
          // Add to destination section
          const newWidgetIds = [...section.widgetIds];
          if (toIndex !== undefined) {
            newWidgetIds.splice(toIndex, 0, widgetId);
          } else {
            newWidgetIds.push(widgetId);
          }
          return {
            ...section,
            widgetIds: newWidgetIds,
          };
        }
        return section;
      });

      return { sections: cleanupEmptySections(sections) };
    });
  }, [cleanupEmptySections]);

  // Get section for a widget ID
  const getWidgetSection = useCallback((widgetId: string): Section | null => {
    for (const section of widgetOrder.sections) {
      if (section.widgetIds.includes(widgetId)) {
        return section;
      }
    }
    return null;
  }, [widgetOrder]);

  // Create a new section at a specific position
  const createSection = useCallback((position: number, widgetIds: string[] = []): string => {
    const newSectionId = `section-${Date.now()}`;

    setWidgetOrder(prev => {
      const sections = [...prev.sections];
      const newSection: Section = {
        id: newSectionId,
        widgetIds,
        order: position,
      };

      sections.splice(position, 0, newSection);

      // Update order values
      const reordered = sections.map((section, index) => ({
        ...section,
        order: index,
      }));

      return { sections: reordered };
    });

    return newSectionId;
  }, []);

  // Remove a section by ID
  const removeSection = useCallback((sectionId: string) => {
    setWidgetOrder(prev => {
      const filtered = prev.sections.filter(s => s.id !== sectionId);
      return { sections: cleanupEmptySections(filtered) };
    });
  }, [cleanupEmptySections]);

  // Set widget order directly (used for loading state)
  const setWidgetOrderDirect = useCallback((newOrder: WidgetOrderState) => {
    setWidgetOrder(newOrder);
  }, []);

  return {
    widgetOrder,
    setWidgetOrder: setWidgetOrderDirect,
    updateSectionOrder,
    resetOrder,
    getCurrentOrder,
    moveWidgetBetweenSections,
    getWidgetSection,
    createSection,
    removeSection,
  };
}
