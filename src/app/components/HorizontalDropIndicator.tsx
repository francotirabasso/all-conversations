interface HorizontalDropIndicatorProps {
  isValid: boolean;
}

export function HorizontalDropIndicator({ isValid }: HorizontalDropIndicatorProps) {
  const color = isValid ? '#4AA9EA' : '#D90A45';

  return (
    <div className="w-full pointer-events-none" style={{ height: '4px' }}>
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}
