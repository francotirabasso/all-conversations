import { getWidgetWeight, getItemWeight } from '../config/widgetWeights';
import { WidgetOrStack } from '../hooks/useWidgetOrder';

// Minimum width per FR unit before wrapping occurs (180px)
const WIDGET_MIN_WIDTH_PX = 180;

/**
 * Calculate grid template columns based on widget IDs and their weights
 * Returns a wrapping-friendly grid definition using auto-fit
 * Creates as many 180px columns as fit, widgets wrap when they exceed available space
 */
export function calculateGridColumns(widgetIds: WidgetOrStack[], maxFrUnits: number): string {
  if (widgetIds.length === 0) return '1fr';
  if (widgetIds.length === 1) return '1fr';

  // Use auto-fit for automatic wrapping behavior
  // Creates as many 180px columns as fit in the container
  // When a widget's span exceeds available columns, it wraps and takes full width
  return `repeat(auto-fit, minmax(${WIDGET_MIN_WIDTH_PX}px, 1fr))`;
}

/**
 * Get the grid-column span value for a widget or stack
 * Items span according to their FR weight
 * No clamping - this allows proper wrapping when span exceeds available columns
 */
export function getWidgetColumnSpan(item: WidgetOrStack, maxFrUnits: number): number {
  const weight = getItemWeight(item);
  return weight; // Return raw weight for proper wrapping behavior
}

/**
 * Legacy function - deprecated, use getWidgetColumnSpan instead
 */
export function getGridColumnSpan(widgetId: string): number {
  return getWidgetWeight(widgetId);
}
