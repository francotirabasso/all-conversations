import svgPaths from "./svg-7e4worwhe0";
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useSidebar } from '@/app/contexts/SidebarContext';

function Breadcrumbs() {
  return (
    <div className="content-stretch flex font-['SF_Pro:Regular',sans-serif] font-normal gap-[6px] items-center relative shrink-0 text-[12px]" data-name="Breadcrumbs">
      <p className="leading-[1.2] relative shrink-0 text-[rgba(0,0,0,0.5)] tracking-[1.2px]">ANALYTICS</p>
      <p className="leading-[1.4] relative shrink-0 text-[#1c1c1c]">/</p>
      <p className="leading-[1.4] relative shrink-0 text-[#1c1c1c] tracking-[1.2px]">CONVERSATIONS</p>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="search">
          <path d={svgPaths.pc3cca00} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[12px] relative w-full">
          <Search />
          <p className="flex-[1_0_0] font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] min-h-px min-w-px relative text-[#808080] text-[12px] whitespace-pre-wrap">Search help center</p>
        </div>
      </div>
    </div>
  );
}

function InputBox() {
  return (
    <div className="bg-[rgba(28,28,28,0.02)] relative rounded-[8px] shrink-0 w-full" data-name="Input box">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[inherit] w-full">
        <Content />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[rgba(28,28,28,0.02)] content-stretch flex flex-col items-start relative shrink-0 w-[261px]" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none" />
      <InputBox />
    </div>
  );
}

export default function TopHeader() {
  const { isSecondaryCollapsed, toggleSecondary } = useSidebar();
  
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center justify-between relative w-full pt-[12px] pr-[32px] pb-[12px] pl-[24px]" data-name="Top Header">
      <div aria-hidden="true" className="absolute border-[rgba(28,28,28,0.11)] border-b border-solid inset-0 pointer-events-none" />
      
      <div className="flex items-center gap-[12px]">
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSecondary}
          className="p-[8px] rounded-[8px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
          title={isSecondaryCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSecondaryCollapsed ? (
            <PanelLeftOpen className="size-[20px] text-[#3a3a3a]" strokeWidth={1.75} />
          ) : (
            <PanelLeftClose className="size-[20px] text-[#3a3a3a]" strokeWidth={1.75} />
          )}
        </button>
        
        <Breadcrumbs />
      </div>
      
      <TextInput />
    </div>
  );
}