import { X } from "lucide-react";

interface ClearFilterButtonProps {
  onClear: () => void;
}

export function ClearFilterButton({ onClear }: ClearFilterButtonProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
          e.preventDefault();
          onClear();
        }
      }}
      className="p-0.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
    >
      <X className="size-4 text-gray-500" />
    </div>
  );
}