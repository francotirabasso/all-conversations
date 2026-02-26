import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

interface SortableWidgetProps {
  id: string;
  children: ReactNode;
  dropIndicator?: ReactNode;
  gridColumnSpan?: number;
}

export function SortableWidget({ id, children, dropIndicator, gridColumnSpan }: SortableWidgetProps) {
  console.log('🔵 SortableWidget RENDER:', { id, hasDropIndicator: !!dropIndicator, dropIndicatorType: dropIndicator ? typeof dropIndicator : 'undefined' });

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Only apply transform to the dragging widget, not to others
  // This prevents widgets from moving to "make space" during drag
  const style = {
    transform: isDragging ? CSS.Transform.toString(transform) : 'translate3d(0, 0, 0)',
    transition: isDragging ? transition : 'none',
    opacity: isDragging ? 0.5 : 1,
    width: '100%',
    minWidth: 0, // Allow grid to shrink the widget if needed
    ...(gridColumnSpan && { gridColumn: `span ${gridColumnSpan}` }),
  };

  if (dropIndicator) {
    console.log('📦 SortableWidget HAS dropIndicator:', { id, hasIndicator: !!dropIndicator });
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative group">
      {/* Drag handle bar - only this can be used to drag the widget */}
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        className="absolute top-[2px] left-1/2 -translate-x-1/2 w-1/2 h-[4px] bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-grab active:cursor-grabbing"
      />
      {children}
      {dropIndicator && (
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ right: '-6px', width: '4px' }}>
          {dropIndicator}
        </div>
      )}
    </div>
  );
}
