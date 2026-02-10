import { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, Move } from 'lucide-react';

interface DraggableWidgetProps {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  onPositionChange?: (x: number, y: number) => void;
  onSizeChange?: (width: number, height: number) => void;
}

export function DraggableWidget({
  children,
  initialX = 100,
  initialY = 100,
  initialWidth = 620,
  initialHeight = 320,
  onPositionChange,
  onSizeChange,
}: DraggableWidgetProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        setPosition({ x: newX, y: newY });
        onPositionChange?.(newX, newY);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, onPositionChange]);

  useEffect(() => {
    if (isResizing) {
      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(376, resizeStart.width + deltaX);
        const newHeight = Math.max(260, resizeStart.height + deltaY);
        setSize({ width: newWidth, height: newHeight });
        onSizeChange?.(newWidth, newHeight);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, resizeStart, onSizeChange]);

  const handleDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) {
      return;
    }
    setIsDragging(true);
    setIsSelected(true);
    const rect = widgetRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  return (
    <div
      ref={widgetRef}
      className={`absolute cursor-move transition-shadow ${
        isSelected ? 'ring-2 ring-blue-500 shadow-2xl' : ''
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleDragStart}
      onClick={() => setIsSelected(true)}
    >
      {/* Drag Handle */}
      {isSelected && (
        <div className="absolute -top-8 left-0 right-0 flex items-center justify-between px-2 py-1 bg-blue-500 text-white text-xs rounded-t">
          <div className="flex items-center gap-2">
            <Move className="size-3" />
            <span>Drag to move</span>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <span>{Math.round(position.x)}, {Math.round(position.y)}</span>
            <span>•</span>
            <span>{Math.round(size.width)}×{Math.round(size.height)}</span>
          </div>
        </div>
      )}
      
      <div className="relative size-full pointer-events-auto">
        {children}
      </div>

      {/* Resize Handles */}
      {isSelected && (
        <>
          {/* Bottom-right corner resize handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize hover:bg-blue-600 no-drag"
            onMouseDown={handleResizeStart}
            style={{ borderTopLeftRadius: '2px' }}
          />
          
          {/* Bottom edge resize handle */}
          <div
            className="absolute bottom-0 left-4 right-4 h-2 bg-blue-400 opacity-50 cursor-ns-resize hover:opacity-100 no-drag"
            onMouseDown={handleResizeStart}
          />
          
          {/* Right edge resize handle */}
          <div
            className="absolute top-4 bottom-4 right-0 w-2 bg-blue-400 opacity-50 cursor-ew-resize hover:opacity-100 no-drag"
            onMouseDown={handleResizeStart}
          />
        </>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </div>
  );
}
