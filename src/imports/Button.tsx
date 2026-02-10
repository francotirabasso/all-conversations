import svgPaths from "./svg-at7n9fi6nz";

function Label() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#5023dd] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Filter</p>
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g>
          <path d={svgPaths.p26740b90} id="Vector" stroke="var(--stroke-0, #5023DD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function IconOmega() {
  return (
    <div className="content-stretch flex items-start pr-[2px] relative shrink-0" data-name="Icon omega">
      <Close />
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[rgba(180,139,255,0.27)] content-stretch flex items-center justify-center px-[4px] py-[7px] relative rounded-[4px] size-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#7c52ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Label />
      <IconOmega />
    </div>
  );
}