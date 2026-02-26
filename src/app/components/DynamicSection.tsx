import React, { createRef } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Section } from '../hooks/useWidgetOrder';
import { useSectionGridSpans } from '../hooks/useSectionGridSpans';
import { calculateGridColumns } from '../utils/gridCalculator';

interface DynamicSectionProps {
  section: Section;
  visibleWidgets: string[];
  maxFrUnits: number;
  renderWidget: (widgetId: string, sectionId: string, spans: Record<string, number>) => React.ReactNode;
  shouldShowIndicator: (sectionId: string, index: number) => boolean;
  dropIndicator: { sectionId: string; index: number; isValid: boolean } | null;
  DropIndicator: React.ComponentType<{ isValid: boolean }>;
  SortableWidget: React.ComponentType<any>;
  getWidgetColumnSpan: (widgetId: string, maxFrUnits: number) => number;
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
}) => {
  const sectionRef = React.useMemo(() => createRef<HTMLDivElement>(), []);
  const sectionGrid = calculateGridColumns(visibleWidgets, maxFrUnits);
  const spans = useSectionGridSpans(visibleWidgets, sectionRef);

  return (
    <SortableContext items={section.widgetIds} strategy={horizontalListSortingStrategy}>
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

        {/* Render widgets */}
        {visibleWidgets.map((widgetId, index) => (
          <SortableWidget
            key={widgetId}
            id={widgetId}
            gridColumnSpan={spans[widgetId] || getWidgetColumnSpan(widgetId, maxFrUnits)}
            dropIndicator={shouldShowIndicator(section.id, index + 1) ? (
              <DropIndicator isValid={dropIndicator?.isValid ?? true} />
            ) : undefined}
          >
            {renderWidget(widgetId, section.id, spans)}
          </SortableWidget>
        ))}
      </div>
    </SortableContext>
  );
});

DynamicSection.displayName = 'DynamicSection';
