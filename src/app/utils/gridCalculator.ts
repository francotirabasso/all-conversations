import { getWidgetWeight } from '../config/widgetWeights';

/**
 * Calculate grid template columns based on widget IDs and their weights
 */
export function calculateGridColumns(widgetIds: string[]): string {
  if (widgetIds.length === 0) return '1fr';
  
  // For single widget, take full width
  if (widgetIds.length === 1) {
    return '1fr';
  }
  
  // Calculate proportional FR units based on weights
  const weights = widgetIds.map(id => getWidgetWeight(id));
  return weights.map(w => `${w}fr`).join(' ');
}

/**
 * Get grid column span for a widget based on its weight
 */
export function getGridColumnSpan(widgetId: string): number {
  return getWidgetWeight(widgetId);
}
