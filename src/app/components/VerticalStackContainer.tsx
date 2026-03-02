import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable, useDndContext } from '@dnd-kit/core';

interface VerticalStackContainerProps {
  id: string;
  widgetIds: string[];
  renderWidget: (widgetId: string) => React.ReactNode;
  isDraggable?: boolean;
}

function StackItem({ 
  id, 
  children, 
  showDropIndicator
}: { 
  id: string; 
  children: React.ReactNode;
  showDropIndicator?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    animateLayoutChanges: () => false, // Disable visual reordering during drag
  });

  const { setNodeRef: setDroppableRef, isOver: isDroppableOver } = useDroppable({
    id: `stack-item-${id}`,
  });

  const { active, over } = useDndContext();

  // Combine refs
  const setNodeRef = (node: HTMLElement | null) => {
    setSortableRef(node);
    setDroppableRef(node);
  };

  const style: React.CSSProperties = {
    transform: isDragging ? CSS.Transform.toString(transform) : undefined,
    transition: isDragging ? transition : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const isOverThis = over?.id === `stack-item-${id}` || over?.id === id;
  const showIndicator = active && (isDroppableOver || isOverThis) && !isDragging;

  return (
    <div className="relative flex-1 min-h-0">
      {showIndicator && (
        <div className="absolute -top-[6px] left-0 right-0 h-[4px] bg-blue-500 rounded-full z-50" />
      )}
      <div 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners} 
        className={`h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {children}
      </div>
    </div>
  );
}

export function VerticalStackContainer({
  id,
  widgetIds,
  renderWidget,
  isDraggable = true,
}: VerticalStackContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `stack-droppable-${id}`,
  });

  return (
    <div 
      ref={setNodeRef}
      className="flex flex-col gap-3 h-full w-full"
      data-stack-id={id}
      data-stack-type="vertical-stack"
    >
      {isDraggable ? (
        <SortableContext items={widgetIds} strategy={verticalListSortingStrategy}>
          {widgetIds.map((widgetId) => (
            <StackItem 
              key={widgetId}
              id={widgetId}
              showDropIndicator={false}
            >
              {renderWidget(widgetId)}
            </StackItem>
          ))}
        </SortableContext>
      ) : (
        <>
          {widgetIds.map((widgetId) => (
            <div key={widgetId} className="flex-1 min-h-0">
              {renderWidget(widgetId)}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
