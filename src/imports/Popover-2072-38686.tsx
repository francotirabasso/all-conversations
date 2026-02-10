import svgPaths from "./svg-r75ybpddl9";

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.4] min-h-px min-w-px relative text-[#3a3a3a] text-[12px] whitespace-pre-wrap">The maximum number of available sessions in the 15 minute interval</p>
        </div>
      </div>
    </div>
  );
}

function Monitor() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="monitor">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="monitor">
          <path d={svgPaths.p329cfa80} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Phone() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="phone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="phone">
          <path d={svgPaths.p2c1bf080} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Monitor />
      <Phone />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(28,28,28,0.11)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative w-full">
          <Frame />
          <p className="flex-[1_0_0] font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.4] min-h-px min-w-px relative text-[12px] text-[rgba(0,0,0,0.5)] whitespace-pre-wrap">Voice and Digital</p>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

export default function Popover() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[8px] size-full" data-name="Popover">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Body />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_2px_4px_0px_rgba(0,0,0,0.04),0px_2px_16px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}