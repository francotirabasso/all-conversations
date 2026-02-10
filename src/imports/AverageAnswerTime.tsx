import svgPaths from "./svg-82480qa8cg";

function Info() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Info">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2002_6454)" id="Info">
          <path d={svgPaths.p12c77580} id="Vector" stroke="var(--stroke-0, #535353)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2002_6454">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0">
      <Info />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] h-full items-center min-h-px min-w-px relative" data-name="Title">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] max-w-[96px] min-h-px min-w-px overflow-hidden relative text-[12px] text-black text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">Avg. answer time</p>
      </div>
      <Frame />
    </div>
  );
}

function MoreVertical() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="more-vertical">
          <g id="Vector">
            <path d={svgPaths.p8538580} fill="#1C1C1C" />
            <path d={svgPaths.p1728980} fill="#1C1C1C" />
            <path d={svgPaths.p103fe100} fill="#1C1C1C" />
            <path d={svgPaths.p8538580} stroke="var(--stroke-0, #1C1C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            <path d={svgPaths.p1728980} stroke="var(--stroke-0, #1C1C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            <path d={svgPaths.p103fe100} stroke="var(--stroke-0, #1C1C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconAlpha() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon alpha">
      <MoreVertical />
    </div>
  );
}

function Menu() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0" data-name="Menu">
      <IconAlpha />
    </div>
  );
}

function CardActions() {
  return (
    <div className="bg-white content-stretch flex gap-[2px] items-center justify-end pl-[8px] relative shrink-0" data-name="_card actions">
      <Menu />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Top">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Title />
      </div>
      <CardActions />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <Top />
    </div>
  );
}

function Headers() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Headers">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pb-[4px] pl-[12px] pr-[5px] pt-[8px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p32c30200} id="Vector" stroke="var(--stroke-0, #008E52)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Impact() {
  return (
    <div className="content-stretch flex gap-[2px] items-center pb-[2px] relative shrink-0" data-name="Impact">
      <Icon />
      <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2] relative shrink-0 text-[#008e52] text-[12px]">2%</p>
    </div>
  );
}

function NumberDescription() {
  return (
    <div className="content-stretch flex gap-px items-end relative shrink-0" data-name="Number + Description">
      <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-none relative shrink-0 text-[27px] text-black">3m</p>
      <Impact />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Data">
      <NumberDescription />
    </div>
  );
}

function Legend() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Legend">
      <div className="flex flex-row items-end size-full">
        <div className="content-end flex flex-wrap items-end justify-between pb-[12px] pt-px px-[12px] relative size-full">
          <Data />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-[180px] relative rounded-[8px] w-full" data-name="Card">
      <div className="content-stretch flex flex-col items-start min-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <Headers />
        <Legend />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

export default function AverageAnswerTime() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Average answer time">
      <Card />
    </div>
  );
}