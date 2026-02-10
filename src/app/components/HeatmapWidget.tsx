import React from 'react';
import { Widget } from './Widget';

interface HeatmapData {
  [day: string]: {
    [hour: number]: number;
  };
}

interface HeatmapWidgetProps {
  data: HeatmapData;
  onMaximize?: () => void;
  onRemove?: () => void;
  onDuplicate?: () => void;
  minimal?: boolean;
  isDraggable?: boolean;
}

// Color interpolation function
function getHeatmapColor(value: number, max: number): { bg: string; text: string } {
  if (value === 0) {
    return { bg: 'bg-white', text: 'text-gray-500 opacity-0' };
  }
  
  const ratio = value / max;
  
  if (ratio < 0.15) {
    return { bg: 'bg-[#ecf0f9]', text: 'text-[#535353]' };
  } else if (ratio < 0.3) {
    return { bg: 'bg-[#cfdaf0]', text: 'text-[#535353]' };
  } else if (ratio < 0.5) {
    return { bg: 'bg-[#aec3e7]', text: 'text-[#535353]' };
  } else if (ratio < 0.7) {
    return { bg: 'bg-[#6698c8]', text: 'text-white' };
  } else if (ratio < 0.85) {
    return { bg: 'bg-[#296fa3]', text: 'text-[#f9f9f9]' };
  } else {
    return { bg: 'bg-[#143a52]', text: 'text-[#f9f9f9]' };
  }
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

function formatHour(hour: number): string {
  if (hour === 0) return '12am';
  if (hour === 12) return '12pm';
  if (hour < 12) return `${hour}am`;
  return `${hour - 12}pm`;
}

export function HeatmapWidget({ data, onMaximize, onRemove, onDuplicate, minimal = false, isDraggable = false }: HeatmapWidgetProps) {
  // Calculate max value for color scaling
  const maxValue = Math.max(
    ...DAYS.flatMap(day => 
      HOURS.map(hour => data[day]?.[hour] || 0)
    )
  );

  // Shared content (heatmap + legend)
  const heatmapContent = (
    <div className="flex flex-col h-full w-full">
      {/* Heatmap */}
      <div className="flex-1 px-3 pt-3 min-h-0">
        {/* Grid Container */}
        <div className="flex gap-[2px] w-full h-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
             style={{
               scrollbarWidth: 'thin',
               scrollbarColor: 'rgba(0,0,0,0.2) transparent'
             }}
        >
          {/* First Column - Day Labels (Sticky) */}
          <div className="flex flex-col gap-[2px] shrink-0 sticky left-0 z-10 bg-white">
            {/* Header spacer */}
            <div className="h-[24px] max-h-[27px]" />
            
            {/* Day labels */}
            {DAYS.map((day) => (
              <div
                key={day}
                className="flex-1 min-h-[28px] max-h-[48px] flex items-center justify-end pr-1"
              >
                <div className="font-['SF_Pro:Regular',sans-serif] text-[12px] text-[#535353] text-right w-[37px]">
                  {day}
                </div>
              </div>
            ))}
          </div>

          {/* Hour Columns */}
          {HOURS.map((hour) => (
            <div key={hour} className="flex flex-col gap-[2px] min-w-[48px] shrink-0">
              {/* Hour header */}
              <div className="h-[24px] max-h-[27px] flex items-center justify-center">
                <div className="font-['SF_Pro:Regular',sans-serif] text-[12px] text-[#535353] text-center overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {formatHour(hour)}
                </div>
              </div>
              
              {/* Day cells */}
              {DAYS.map((day) => {
                const value = data[day]?.[hour] || 0;
                const { bg, text } = getHeatmapColor(value, maxValue);
                const showValue = value > 0;
                
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`flex-1 min-h-[28px] max-h-[48px] rounded-[4px] flex items-center justify-center relative ${bg}`}
                  >
                    {!showValue && (
                      <div
                        aria-hidden="true"
                        className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]"
                      />
                    )}
                    <div className={`font-['SF_Pro:Regular',sans-serif] text-[12px] ${text} text-center`}>
                      {showValue ? value : '0'}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 px-3 pb-3 pt-2 shrink-0 text-[11px] text-[#535353]">
        <span>0 calls</span>
        <div className="flex h-3 w-20">
          <div className="flex-1 bg-[#ecf0f9]" />
          <div className="flex-1 bg-[#cfdaf0]" />
          <div className="flex-1 bg-[#aec3e7]" />
          <div className="flex-1 bg-[#6698c8]" />
          <div className="flex-1 bg-[#296fa3]" />
          <div className="flex-1 bg-[#143a52]" />
        </div>
        <span>+{maxValue > 50 ? 50 : Math.ceil(maxValue * 0.8)}</span>
      </div>
    </div>
  );

  // If minimal mode, return just the content
  if (minimal) {
    return heatmapContent;
  }

  // Otherwise, wrap in Widget
  return (
    <Widget
      title="Weekly average volume"
      widgetId="heatmap"
      minHeight={320}
      minColumns={2}
      showMenuButton={true}
      showInfoIcon={true}
      showFilterButton={true}
      tooltipText="Weekly average conversation volume across different times of day"
      scope="Both"
      onMaximize={onMaximize}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
      isDraggable={isDraggable}
    >
      {heatmapContent}
    </Widget>
  );
}