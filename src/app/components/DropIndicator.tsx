/**
 * DropIndicator - Visual indicator showing where a widget will be dropped
 * Displays as a thin line that changes color based on validity
 * - Blue: Valid drop location
 * - Red: Invalid drop location (exceeds FR unit limit)
 */

interface DropIndicatorProps {
  isValid: boolean;
}

export function DropIndicator({ isValid }: DropIndicatorProps) {
  console.log('🎨 DropIndicator RENDERING:', { isValid });

  const bgClass = isValid
    ? 'bg-[#4AA9EA]'
    : 'bg-[#D90A45]';

  return (
    <div
      className={`h-full ${bgClass} rounded-full pointer-events-none`}
      style={{
        width: '4px',
        minWidth: '4px',
        zIndex: 9999,
      }}
    />
  );
}