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
  const color = isValid ? '#2563eb' : '#ef4444'; // blue vs red
  const glowColor = isValid 
    ? 'rgba(37, 99, 235, 0.6)' 
    : 'rgba(239, 68, 68, 0.6)';
  const bgClass = isValid
    ? 'bg-[#2563eb]'
    : 'bg-[#ef4444]';

  return (
    <div 
      className={`w-full ${bgClass} rounded-full pointer-events-none`}
      style={{
        height: '4px',
        minHeight: '4px',
        boxShadow: `0 0 8px ${glowColor}`,
        zIndex: 9999,
        marginTop: '4px',
        marginBottom: '4px',
      }}
    />
  );
}