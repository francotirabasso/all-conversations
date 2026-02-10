import svgPaths from "./svg-mvbmojxr63";

function Link() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#7c52ff] text-[12px]">View in call history</p>
    </div>
  );
}

function ExternalLink() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="external-link">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="external-link">
          <path d={svgPaths.p14a57d80} id="Vector" stroke="var(--stroke-0, #7C52FF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative size-full">
      <div aria-hidden="true" className="absolute border-[rgba(28,28,28,0.11)] border-solid border-t inset-0 pointer-events-none" />
      <Link />
      <ExternalLink />
    </div>
  );
}