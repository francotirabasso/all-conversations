import { VerticalStack, WidgetOrStack } from '../hooks/useWidgetOrder';

// Widget FR unit weights for grid layout
export const WIDGET_WEIGHTS: Record<string, number> = {
  // Section 1 - StatWidgets (1 FR each)
  'avg-answer-time': 1,
  'avg-handle-time': 1,
  'avg-first-response-time': 1,
  'transfer-rate': 1,
  
  // Section 2
  'deflection-rate': 1,
  'conversation-volume': 3,
  
  // Section 3
  'sankey': 6,
  
  // Section 4
  'heatmap': 3,
};

export function getWidgetWeight(widgetId: string): number {
  return WIDGET_WEIGHTS[widgetId] || 1;
}

// Get weight for a stack (always 1 FR unit - stacks are vertical containers)
export function getStackWeight(stack: VerticalStack): number {
  return 1; // Stacks always occupy 1 column regardless of content
}

// Get weight for widget or stack
export function getItemWeight(item: WidgetOrStack): number {
  if (typeof item === 'string') {
    return getWidgetWeight(item);
  }
  return getStackWeight(item);
}

export function calculateSectionWeight(widgetIds: WidgetOrStack[]): number {
  return widgetIds.reduce((total, item) => total + getItemWeight(item), 0);
}

export function canAddToSection(
  currentWidgets: WidgetOrStack[],
  newWidgetId: string,
  maxFrUnits: number
): boolean {
  const currentWeight = calculateSectionWeight(currentWidgets);
  const newWeight = getWidgetWeight(newWidgetId);
  return currentWeight + newWeight <= maxFrUnits;
}
