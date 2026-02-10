import React from 'react';
import { X } from 'lucide-react';

interface NodeDetailsPopoverProps {
  nodeId: string;
  nodeName: string;
  value: number;
  percentage: number;
  position: { x: number; y: number };
  onClose: () => void;
}

export function NodeDetailsPopover({ nodeId, nodeName, value, percentage, position, onClose }: NodeDetailsPopoverProps) {
  // Mock data for breakdown - in real app this would come from props
  const breakdown = [
    { label: 'Voice', value: 62, color: '#4ce6ee' },
    { label: 'Digital', value: 38, color: '#f67836' }
  ];

  return (
    <div
      className="absolute bg-white rounded-[12px] shadow-lg border border-[rgba(28,28,28,0.17)] z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '320px'
      }}
    >
      {/* Header */}
      <div className="p-4">
        {/* Close button */}
        <div className="flex items-center justify-end mb-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-[14px] h-[14px] text-[#1C1C1C]" />
          </button>
        </div>

        {/* Statistics Container */}
        <div className="flex items-end justify-between">
          {/* Left side - Statistics */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Title with icons */}
            <div className="flex items-center gap-1 mb-1">
              <p className="font-['SF_Pro',sans-serif] text-[15px] text-[#535353] leading-[1.4] truncate">
                {nodeName}
              </p>
              <div className="flex gap-[2px] items-center shrink-0">
                {/* Phone icon */}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                  <path
                    d="M3.5 1.5H4.5C4.77614 1.5 5 1.72386 5 2V3.5C5 3.77614 4.77614 4 4.5 4H3C2.72386 4 2.5 4.22386 2.5 4.5V7.5C2.5 7.77614 2.72386 8 3 8H4.5C4.77614 8 5 8.22386 5 8.5V10C5 10.2761 4.77614 10.5 4.5 10.5H3.5C2.39543 10.5 1.5 9.60457 1.5 8.5V3.5C1.5 2.39543 2.39543 1.5 3.5 1.5Z"
                    stroke="#535353"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 1.5H7.5C7.22386 1.5 7 1.72386 7 2V3.5C7 3.77614 7.22386 4 7.5 4H9C9.27614 4 9.5 4.22386 9.5 4.5V7.5C9.5 7.77614 9.27614 8 9 8H7.5C7.22386 8 7 8.22386 7 8.5V10C7 10.2761 7.22386 10.5 7.5 10.5H8.5C9.60457 10.5 10.5 9.60457 10.5 8.5V3.5C10.5 2.39543 9.60457 1.5 8.5 1.5Z"
                    stroke="#535353"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Monitor icon */}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                  <path
                    d="M1.5 3C1.5 2.17157 2.17157 1.5 3 1.5H9C9.82843 1.5 10.5 2.17157 10.5 3V7.5C10.5 8.32843 9.82843 9 9 9H3C2.17157 9 1.5 8.32843 1.5 7.5V3Z"
                    stroke="#535353"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4 10.5H8" stroke="#535353" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 9V10.5" stroke="#535353" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Main data */}
            <div className="flex items-end gap-1">
              <p className="font-['SF_Pro',sans-serif] font-[510] text-[27px] text-[#1c1c1c] leading-none">
                {percentage.toFixed(1)}%
              </p>
              <p className="font-['SF_Pro',sans-serif] text-[12px] text-[#535353] leading-[1.2] pb-[2px]">
                {value.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right side - Chart and Legend */}
          <div className="flex gap-2 items-end shrink-0">
            {/* Legend */}
            <div className="flex flex-col gap-0.5">
              {breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-[2px] border border-[rgba(28,28,28,0.11)]"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="font-['SF_Pro',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">
                      {item.label}
                    </p>
                  </div>
                  <p className="font-['SF_Pro',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">
                    {item.value}%
                  </p>
                </div>
              ))}
            </div>

            {/* Donut Chart */}
            <svg className="w-12 h-12 shrink-0" viewBox="0 0 48 48">
              <g>
                {/* Voice segment (62% = 223.2 degrees starting from -90) */}
                <path
                  d="M 24 4 A 20 20 0 0 1 40.728 32.728 L 24 24 Z"
                  fill={breakdown[0].color}
                  stroke="#1C1C1C"
                  strokeOpacity="0.11"
                  strokeWidth="1"
                />
                {/* Digital segment (38% = 136.8 degrees) */}
                <path
                  d="M 40.728 32.728 A 20 20 0 1 1 24 4 L 24 24 Z"
                  fill={breakdown[1].color}
                  stroke="#1C1C1C"
                  strokeOpacity="0.11"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
