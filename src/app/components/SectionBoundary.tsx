import { useDroppable } from '@dnd-kit/core';
import { HorizontalDropIndicator } from './HorizontalDropIndicator';

interface SectionBoundaryProps {
  position: number;
  showIndicator: boolean;
  isValid: boolean;
  isDragging: boolean;
}

export function SectionBoundary({ position, showIndicator, isValid, isDragging }: SectionBoundaryProps) {
  const { setNodeRef } = useDroppable({
    id: `section-boundary-${position}`,
    data: { type: 'section-boundary', position }
  });

  return (
    <div
      ref={setNodeRef}
      className="relative w-full"
      style={{
        height: '4px',
        minHeight: '4px',
        marginTop: '-8px',
        marginBottom: '-8px',
        zIndex: 10,
        pointerEvents: 'auto',
      }}
    >
      {showIndicator && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2" style={{ zIndex: 20 }}>
          <HorizontalDropIndicator isValid={isValid} />
        </div>
      )}
    </div>
  );
}
