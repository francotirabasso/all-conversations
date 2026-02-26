import { useEffect, useState, RefObject } from 'react';
import { getWidgetWeight } from '../config/widgetWeights';

const WIDGET_MIN_WIDTH_PX = 180;

/**
 * Hook to calculate grid column spans for all widgets in a section
 * Intelligently expands widgets in the last row to fill available space
 */
export function useSectionGridSpans(
  widgetIds: string[],
  containerRef: RefObject<HTMLElement>
): Record<string, number> {
  const [spans, setSpans] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    widgetIds.forEach((id) => {
      initial[id] = getWidgetWeight(id);
    });
    return initial;
  });

  useEffect(() => {
    if (!containerRef.current || widgetIds.length === 0) return;

    const updateSpans = () => {
      if (!containerRef.current) return;

      // Use clientWidth instead of offsetWidth to get the inner width (excluding borders, including padding)
      const containerWidth = containerRef.current.clientWidth;
      const columnsAvailable = Math.max(1, Math.floor(containerWidth / WIDGET_MIN_WIDTH_PX));

      const newSpans: Record<string, number> = {};

      // Simulate CSS Grid placement algorithm to determine which widgets are alone in their rows
      interface WidgetPlacement {
        id: string;
        weight: number;
        row: number;
        startCol: number;
        endCol: number;
      }

      const placements: WidgetPlacement[] = [];
      let currentRow = 0;
      let currentCol = 0;

      // First pass: place widgets according to CSS Grid algorithm
      widgetIds.forEach((id) => {
        const weight = getWidgetWeight(id);

        // Check if widget fits in current row
        if (currentCol + weight > columnsAvailable) {
          // Move to next row
          currentRow++;
          currentCol = 0;
        }

        // Place widget
        placements.push({
          id,
          weight,
          row: currentRow,
          startCol: currentCol,
          endCol: currentCol + weight,
        });

        currentCol += weight;
      });

      // Second pass: calculate spans based on placement
      placements.forEach((placement) => {
        const { id, weight, row } = placement;

        // Find all widgets in the same row
        const widgetsInRow = placements.filter(p => p.row === row);

        // For 1 FR widgets that are alone in their row, expand to fill available space
        if (weight === 1 && widgetsInRow.length === 1 && columnsAvailable > 1) {
          newSpans[id] = columnsAvailable;
        } else {
          // Clamp span to available columns to prevent implicit column creation
          newSpans[id] = Math.min(weight, columnsAvailable);
        }
      });

      // Only update if spans actually changed to avoid infinite loop
      const spansChanged = Object.keys(newSpans).some(
        id => newSpans[id] !== spans[id]
      ) || Object.keys(spans).length !== Object.keys(newSpans).length;

      if (spansChanged) {
        console.log('📐 Grid spans updated:', {
          containerWidth,
          columnsAvailable,
          widgetIds: widgetIds.map(id => `${id}:${newSpans[id]}`).join(', ')
        });
        setSpans(newSpans);
      }
    };

    // Initial calculation
    updateSpans();

    // Observe container size changes
    const observer = new ResizeObserver(updateSpans);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [widgetIds, containerRef]);

  return spans;
}
