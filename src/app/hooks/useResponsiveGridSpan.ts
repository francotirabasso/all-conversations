import { useEffect, useState, RefObject } from 'react';
import { getWidgetWeight } from '../config/widgetWeights';

const WIDGET_MIN_WIDTH_PX = 180;

/**
 * Hook to calculate responsive grid column span based on container width and widget position
 * Intelligently expands widgets in the last row to fill available space
 */
export function useResponsiveGridSpan(
  widgetId: string,
  widgetIndex: number,
  totalWidgetsInSection: number,
  containerRef: RefObject<HTMLElement>,
  maxFrUnits: number
): number {
  const weight = getWidgetWeight(widgetId);
  const [span, setSpan] = useState(weight);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSpan = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const columnsAvailable = Math.floor(containerWidth / WIDGET_MIN_WIDTH_PX);

      // For 1 FR widgets, calculate if this widget is in the last row
      if (weight === 1) {
        const widgetsPerRow = columnsAvailable;
        const rowIndex = Math.floor(widgetIndex / widgetsPerRow);
        const totalRows = Math.ceil(totalWidgetsInSection / widgetsPerRow);
        const isLastRow = rowIndex === totalRows - 1;

        if (isLastRow) {
          // Calculate how many widgets are in the last row
          const widgetsInLastRow = totalWidgetsInSection - (rowIndex * widgetsPerRow);

          // If last row has fewer widgets than columns, expand them to fill space
          if (widgetsInLastRow < columnsAvailable) {
            // Each widget in last row gets equal share of available columns
            const spanPerWidget = Math.floor(columnsAvailable / widgetsInLastRow);
            setSpan(spanPerWidget);
            return;
          }
        }
      }

      // Default: use widget's natural weight
      setSpan(weight);
    };

    // Initial calculation
    updateSpan();

    // Observe container size changes
    const observer = new ResizeObserver(updateSpan);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [widgetId, widgetIndex, totalWidgetsInSection, weight, containerRef, maxFrUnits]);

  return span;
}
