import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

interface SortableWidgetProps {
  id: string;
  children: ReactNode;
  dropIndicator?: ReactNode;
  gridColumnSpan?: number;
  /** When false the widget acts as a non-draggable container (stacks use this). */
  isDraggable?: boolean;
}

export function SortableWidget({ id, children, dropIndicator, gridColumnSpan, isDraggable = true }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges: () => false,
    disabled: !isDraggable,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...(gridColumnSpan && { gridColumn: `span ${gridColumnSpan}` }),
  };

  return (
    <div ref={setNodeRef} style={style} {...(isDraggable ? attributes : {})} className="relative group">
      {/* Drag handle — only shown for directly-draggable items (not stacks) */}
      {isDraggable && (
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          className="absolute top-[2px] left-1/2 -translate-x-1/2 w-1/2 h-[4px] bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-grab active:cursor-grabbing"
        />
      )}
      {children}
      {dropIndicator && (
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ right: '-6px', width: '4px' }}>
          {dropIndicator}
        </div>
      )}
    </div>
  );
}
