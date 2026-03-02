import React, { createRef } from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { Section, WidgetOrStack } from '../hooks/useWidgetOrder';
import { useSectionGridSpans } from '../hooks/useSectionGridSpans';
import { calculateGridColumns } from '../utils/gridCalculator';

// Custom sorting strategy that prevents DOM reordering
const noOpSortingStrategy = () => {
  return null; // Return null to prevent any sorting/reordering
};

interface DynamicSectionProps {
  section: Section;
  visibleWidgets: WidgetOrStack[];
  maxFrUnits: number;
  renderWidget: (item: WidgetOrStack, sectionId: string, spans: Record<string, number>) => React.ReactNode;
  shouldShowIndicator: (sectionId: string, index: number) => boolean;
  dropIndicator: { sectionId: string; index: number; isValid: boolean } | null;
  DropIndicator: React.ComponentType<{ isValid: boolean }>;
  SortableWidget: React.ComponentType<any>;
  getWidgetColumnSpan: (item: WidgetOrStack, maxFrUnits: number) => number;
  isStack?: (item: WidgetOrStack) => boolean;
}

export const DynamicSection = React.memo<DynamicSectionProps>(({
  section,
  visibleWidgets,
  maxFrUnits,
  renderWidget,
  shouldShowIndicator,
  dropIndicator,
  DropIndicator,
  SortableWidget,
  getWidgetColumnSpan,
  isStack,
}) => {
  const sectionRef = React.useMemo(() => createRef<HTMLDivElement>(), []);
  const sectionGrid = calculateGridColumns(visibleWidgets, maxFrUnits);
  
  // Create a map of widget IDs for spans (extract IDs from stacks)
  const widgetIdsForSpans = React.useMemo(() => {
    return visibleWidgets.map(item => {
      if (typeof item === 'string') return item;
      return item.id; // Use stack ID for span calculation
    });
  }, [visibleWidgets]);
  
  const spans = useSectionGridSpans(widgetIdsForSpans, sectionRef);

  // Get unique ID for sortable context
  const getItemId = (item: WidgetOrStack): string => {
    return typeof item === 'string' ? item : item.id;
  };

  const sortableIds = React.useMemo(() => 
    visibleWidgets.map(getItemId),
    [visibleWidgets]
  );

  return (
    <SortableContext items={sortableIds} strategy={noOpSortingStrategy}>
      <div
        ref={sectionRef}
        className="grid gap-3 w-full"
        style={{
          gridTemplateColumns: sectionGrid,
          gridAutoRows: 'auto'
        }}
      >
        {/* Drop indicator at section start */}
        {shouldShowIndicator(section.id, 0) && (
          <div className="col-span-full relative h-0">
            <div className="absolute top-0 left-0 right-0">
              <DropIndicator isValid={dropIndicator?.isValid ?? true} />
            </div>
          </div>
        )}

        {/* Render widgets or stacks */}
        {visibleWidgets.map((item, index) => {
          const itemId = getItemId(item);
          // Stacks are not directly draggable — only their contained widgets are.
          const itemIsDraggable = !(isStack?.(item));
          return (
            <SortableWidget
              key={itemId}
              id={itemId}
              isDraggable={itemIsDraggable}
              gridColumnSpan={spans[itemId] || getWidgetColumnSpan(item, maxFrUnits)}
              dropIndicator={shouldShowIndicator(section.id, index + 1) ? (
                <DropIndicator isValid={dropIndicator?.isValid ?? true} />
              ) : undefined}
            >
              {renderWidget(item, section.id, spans)}
            </SortableWidget>
          );
        })}
      </div>
    </SortableContext>
  );
});

DynamicSection.displayName = 'DynamicSection';
