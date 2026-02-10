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

export function calculateSectionWeight(widgetIds: string[]): number {
  return widgetIds.reduce((total, id) => total + getWidgetWeight(id), 0);
}

export function canAddToSection(
  currentWidgets: string[],
  newWidgetId: string,
  maxFrUnits: number
): boolean {
  const currentWeight = calculateSectionWeight(currentWidgets);
  const newWeight = getWidgetWeight(newWidgetId);
  return currentWeight + newWeight <= maxFrUnits;
}
