import svgPaths from "./svg-ymsc05k01c";

function Content() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Content">
      <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2] relative shrink-0 text-[#3a3a3a] text-[19px]">All conversations</p>
    </div>
  );
}

function InputBox() {
  return (
    <div className="relative rounded-[12px] shrink-0" data-name="Input box">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[10px] relative rounded-[inherit]">
        <Content />
      </div>
      <div aria-hidden="true" className="absolute border-0 border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function ChevronsUpDown() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="chevrons-up-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="chevrons-up-down">
          <path d={svgPaths.p38176900} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconAlpha() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon alpha">
      <ChevronsUpDown />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <IconAlpha />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <InputBox />
      <Button />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start justify-center relative shrink-0" data-name="Title">
      <Container />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Title />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[10px] whitespace-nowrap">
        <p className="leading-[1.2]">Modified</p>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="chevron-down">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function IconOmega() {
  return (
    <div className="content-stretch flex items-start pr-[2px] relative shrink-0" data-name="Icon omega">
      <ChevronDown />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#fffae5] content-stretch flex items-center justify-center pl-[2px] pr-[4px] py-[6px] relative rounded-[102px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[102px]" />
      <Label />
      <IconOmega />
    </div>
  );
}

function ModifiedPill() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Modified pill">
      <Button1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center pl-[12px] relative size-full">
      <Frame1 />
      <ModifiedPill />
    </div>
  );
}