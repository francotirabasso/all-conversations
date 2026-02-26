import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';

export function FloatingToggleButton() {
  const { isSecondaryCollapsed, toggleSecondary } = useSidebar();
  
  return (
    <button
      onClick={toggleSecondary}
      className="absolute flex items-center justify-center rounded-full bg-white border border-[rgba(28,28,28,0.17)] shadow-md hover:bg-gray-50 transition-all cursor-pointer"
      style={{
        left: isSecondaryCollapsed ? '0px' : '223px',
        top: '86px',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: '24px',
        height: '24px'
      }}
      title={isSecondaryCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {isSecondaryCollapsed ? (
        <ChevronRight className="size-[16px] text-[#3a3a3a]" strokeWidth={2} />
      ) : (
        <ChevronLeft className="size-[16px] text-[#3a3a3a]" strokeWidth={2} />
      )}
    </button>
  );
}
