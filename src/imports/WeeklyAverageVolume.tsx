import svgPaths from "./svg-mhldjl2u96";

function Info() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Info">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2015_27734)" id="Info">
          <path d={svgPaths.p12c77580} id="Vector" stroke="var(--stroke-0, #535353)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2015_27734">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0">
      <Info />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] h-full items-center min-h-px min-w-px relative" data-name="Title">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] max-w-[134px] min-h-px min-w-px overflow-hidden relative text-[12px] text-black text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">Weekly average volume</p>
      </div>
      <Frame1 />
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

function RowFirstCell() {
  return (
    <div className="h-[26.857px] relative shrink-0 w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] opacity-0 relative shrink-0 text-[#535353] text-[12px] text-right w-[29px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Mon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowFirstCell1() {
  return (
    <div className="flex-[1_0_0] max-h-[48px] min-h-[28px] min-w-px relative w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end max-h-[inherit] min-h-[inherit] pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] text-right w-[29px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Mon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowFirstCell2() {
  return (
    <div className="flex-[1_0_0] max-h-[48px] min-h-[28px] min-w-px relative w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end max-h-[inherit] min-h-[inherit] pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] text-right w-[37px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Tue</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowFirstCell3() {
  return (
    <div className="flex-[1_0_0] max-h-[48px] min-h-[28px] min-w-px relative w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end max-h-[inherit] min-h-[inherit] pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] text-right w-[31px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Wed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowFirstCell4() {
  return (
    <div className="flex-[1_0_0] max-h-[48px] min-h-[28px] min-w-px relative w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end max-h-[inherit] min-h-[inherit] pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] text-right w-[31px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Thu</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowFirstCell5() {
  return (
    <div className="flex-[1_0_0] max-h-[48px] min-h-[28px] min-w-px relative w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end max-h-[inherit] min-h-[inherit] pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] text-right w-[31px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Fri</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowFirstCell6() {
  return (
    <div className="flex-[1_0_0] max-h-[48px] min-h-[28px] min-w-px relative w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end max-h-[inherit] min-h-[inherit] pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] text-right w-[31px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Sat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowFirstCell7() {
  return (
    <div className="flex-[1_0_0] max-h-[48px] min-h-[28px] min-w-px relative w-full" data-name="Row/First cell">
      <div className="flex flex-row items-center justify-end max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end max-h-[inherit] min-h-[inherit] pr-[4px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] text-right w-[31px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Sun</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FirstColumn() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[2px] h-full items-end min-w-[35px] relative shrink-0 w-[36.12px]" data-name="First column">
      <RowFirstCell />
      <RowFirstCell1 />
      <RowFirstCell2 />
      <RowFirstCell3 />
      <RowFirstCell4 />
      <RowFirstCell5 />
      <RowFirstCell6 />
      <RowFirstCell7 />
    </div>
  );
}

function HeatmapTotal() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal2() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal3() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal4() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal5() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal6() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">7am</p>
      </div>
      <HeatmapTotal />
      <HeatmapTotal1 />
      <HeatmapTotal2 />
      <HeatmapTotal3 />
      <HeatmapTotal4 />
      <HeatmapTotal5 />
      <HeatmapTotal6 />
    </div>
  );
}

function HeatmapTotal7() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-[48px]" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal8() {
  return (
    <div className="bg-[#cfdaf0] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-[48px]" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">6</p>
      </div>
    </div>
  );
}

function HeatmapTotal9() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-[48px]" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal10() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-[48px]" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal11() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-[48px]" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal12() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-[48px]" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal13() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-[48px]" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">8am</p>
      </div>
      <HeatmapTotal7 />
      <HeatmapTotal8 />
      <HeatmapTotal9 />
      <HeatmapTotal10 />
      <HeatmapTotal11 />
      <HeatmapTotal12 />
      <HeatmapTotal13 />
    </div>
  );
}

function HeatmapTotal14() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal15() {
  return (
    <div className="bg-[#cfdaf0] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">6</p>
      </div>
    </div>
  );
}

function HeatmapTotal16() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal17() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal18() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal19() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal20() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">9am</p>
      </div>
      <HeatmapTotal14 />
      <HeatmapTotal15 />
      <HeatmapTotal16 />
      <HeatmapTotal17 />
      <HeatmapTotal18 />
      <HeatmapTotal19 />
      <HeatmapTotal20 />
    </div>
  );
}

function HeatmapTotal21() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal22() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal23() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal24() {
  return (
    <div className="bg-[#143a52] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">45</p>
      </div>
    </div>
  );
}

function HeatmapTotal25() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal26() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal27() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">10am</p>
      </div>
      <HeatmapTotal21 />
      <HeatmapTotal22 />
      <HeatmapTotal23 />
      <HeatmapTotal24 />
      <HeatmapTotal25 />
      <HeatmapTotal26 />
      <HeatmapTotal27 />
    </div>
  );
}

function HeatmapTotal28() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal29() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal30() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal31() {
  return (
    <div className="bg-[#143a52] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">45</p>
      </div>
    </div>
  );
}

function HeatmapTotal32() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal33() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal34() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn4() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">11am</p>
      </div>
      <HeatmapTotal28 />
      <HeatmapTotal29 />
      <HeatmapTotal30 />
      <HeatmapTotal31 />
      <HeatmapTotal32 />
      <HeatmapTotal33 />
      <HeatmapTotal34 />
    </div>
  );
}

function HeatmapTotal35() {
  return (
    <div className="bg-[#5699d7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">17</p>
      </div>
    </div>
  );
}

function HeatmapTotal36() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">24</p>
      </div>
    </div>
  );
}

function HeatmapTotal37() {
  return (
    <div className="bg-[#143a52] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">45</p>
      </div>
    </div>
  );
}

function HeatmapTotal38() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">24</p>
      </div>
    </div>
  );
}

function HeatmapTotal39() {
  return (
    <div className="bg-[#143a52] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">45</p>
      </div>
    </div>
  );
}

function HeatmapTotal40() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal41() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn5() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">12pm</p>
      </div>
      <HeatmapTotal35 />
      <HeatmapTotal36 />
      <HeatmapTotal37 />
      <HeatmapTotal38 />
      <HeatmapTotal39 />
      <HeatmapTotal40 />
      <HeatmapTotal41 />
    </div>
  );
}

function HeatmapTotal42() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal43() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2k</p>
      </div>
    </div>
  );
}

function HeatmapTotal44() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal45() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">24</p>
      </div>
    </div>
  );
}

function HeatmapTotal46() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">24</p>
      </div>
    </div>
  );
}

function HeatmapTotal47() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal48() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn6() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">1pm</p>
      </div>
      <HeatmapTotal42 />
      <HeatmapTotal43 />
      <HeatmapTotal44 />
      <HeatmapTotal45 />
      <HeatmapTotal46 />
      <HeatmapTotal47 />
      <HeatmapTotal48 />
    </div>
  );
}

function HeatmapTotal49() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal50() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">24</p>
      </div>
    </div>
  );
}

function HeatmapTotal51() {
  return (
    <div className="bg-[#296fa3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">32</p>
      </div>
    </div>
  );
}

function HeatmapTotal52() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">24</p>
      </div>
    </div>
  );
}

function HeatmapTotal53() {
  return (
    <div className="bg-[#3c89c3] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">24</p>
      </div>
    </div>
  );
}

function HeatmapTotal54() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal55() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn7() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">2pm</p>
      </div>
      <HeatmapTotal49 />
      <HeatmapTotal50 />
      <HeatmapTotal51 />
      <HeatmapTotal52 />
      <HeatmapTotal53 />
      <HeatmapTotal54 />
      <HeatmapTotal55 />
    </div>
  );
}

function HeatmapTotal56() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal57() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal58() {
  return (
    <div className="bg-[#5699d7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">17</p>
      </div>
    </div>
  );
}

function HeatmapTotal59() {
  return (
    <div className="bg-[#8cbaeb] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">11</p>
      </div>
    </div>
  );
}

function HeatmapTotal60() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal61() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal62() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn8() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">3pm</p>
      </div>
      <HeatmapTotal56 />
      <HeatmapTotal57 />
      <HeatmapTotal58 />
      <HeatmapTotal59 />
      <HeatmapTotal60 />
      <HeatmapTotal61 />
      <HeatmapTotal62 />
    </div>
  );
}

function HeatmapTotal63() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal64() {
  return (
    <div className="bg-[#aec3e7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function HeatmapTotal65() {
  return (
    <div className="bg-[#5699d7] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">17</p>
      </div>
    </div>
  );
}

function HeatmapTotal66() {
  return (
    <div className="bg-[#8cbaeb] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#f9f9f9] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">11</p>
      </div>
    </div>
  );
}

function HeatmapTotal67() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal68() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal69() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn9() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">4pm</p>
      </div>
      <HeatmapTotal63 />
      <HeatmapTotal64 />
      <HeatmapTotal65 />
      <HeatmapTotal66 />
      <HeatmapTotal67 />
      <HeatmapTotal68 />
      <HeatmapTotal69 />
    </div>
  );
}

function HeatmapTotal70() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal71() {
  return (
    <div className="bg-[#cfdaf0] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">4</p>
      </div>
    </div>
  );
}

function HeatmapTotal72() {
  return (
    <div className="bg-[#cfdaf0] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">4</p>
      </div>
    </div>
  );
}

function HeatmapTotal73() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal74() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal75() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal76() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn10() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">5pm</p>
      </div>
      <HeatmapTotal70 />
      <HeatmapTotal71 />
      <HeatmapTotal72 />
      <HeatmapTotal73 />
      <HeatmapTotal74 />
      <HeatmapTotal75 />
      <HeatmapTotal76 />
    </div>
  );
}

function HeatmapTotal77() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal78() {
  return (
    <div className="bg-[#cfdaf0] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">4</p>
      </div>
    </div>
  );
}

function HeatmapTotal79() {
  return (
    <div className="bg-[#cfdaf0] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">4</p>
      </div>
    </div>
  );
}

function HeatmapTotal80() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal81() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal82() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal83() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn11() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">6pm</p>
      </div>
      <HeatmapTotal77 />
      <HeatmapTotal78 />
      <HeatmapTotal79 />
      <HeatmapTotal80 />
      <HeatmapTotal81 />
      <HeatmapTotal82 />
      <HeatmapTotal83 />
    </div>
  );
}

function HeatmapTotal84() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal85() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal86() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal87() {
  return (
    <div className="bg-[#ecf0f9] content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function HeatmapTotal88() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal89() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal90() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn12() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">7pm</p>
      </div>
      <HeatmapTotal84 />
      <HeatmapTotal85 />
      <HeatmapTotal86 />
      <HeatmapTotal87 />
      <HeatmapTotal88 />
      <HeatmapTotal89 />
      <HeatmapTotal90 />
    </div>
  );
}

function HeatmapTotal91() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal92() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal93() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal94() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal95() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal96() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal97() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn13() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">8pm</p>
      </div>
      <HeatmapTotal91 />
      <HeatmapTotal92 />
      <HeatmapTotal93 />
      <HeatmapTotal94 />
      <HeatmapTotal95 />
      <HeatmapTotal96 />
      <HeatmapTotal97 />
    </div>
  );
}

function HeatmapTotal98() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal99() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal100() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal101() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal102() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal103() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal104() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn14() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">9pm</p>
      </div>
      <HeatmapTotal98 />
      <HeatmapTotal99 />
      <HeatmapTotal100 />
      <HeatmapTotal101 />
      <HeatmapTotal102 />
      <HeatmapTotal103 />
      <HeatmapTotal104 />
    </div>
  );
}

function HeatmapTotal105() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal106() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal107() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal108() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal109() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal110() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal111() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn15() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">10pm</p>
      </div>
      <HeatmapTotal105 />
      <HeatmapTotal106 />
      <HeatmapTotal107 />
      <HeatmapTotal108 />
      <HeatmapTotal109 />
      <HeatmapTotal110 />
      <HeatmapTotal111 />
    </div>
  );
}

function HeatmapTotal112() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal113() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal114() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal115() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal116() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal117() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapTotal118() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center max-h-[48px] min-h-[28px] min-w-px relative rounded-[4px] w-full" data-name="heatmap / total">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px opacity-0 relative text-[#535353] text-[12px] text-center">
        <p className="leading-[1.2] whitespace-pre-wrap">0</p>
      </div>
    </div>
  );
}

function HeatmapColumn16() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-full items-start min-w-[48px] relative shrink-0 w-[48px]" data-name="Heatmap/column">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] max-h-[27px] overflow-hidden relative shrink-0 text-[#535353] text-[12px] text-center text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">11pm</p>
      </div>
      <HeatmapTotal112 />
      <HeatmapTotal113 />
      <HeatmapTotal114 />
      <HeatmapTotal115 />
      <HeatmapTotal116 />
      <HeatmapTotal117 />
      <HeatmapTotal118 />
    </div>
  );
}

function HeatmapColumns() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] h-full items-center min-h-px min-w-px overflow-clip relative" data-name="Heatmap Columns">
      <HeatmapColumn />
      <HeatmapColumn1 />
      <HeatmapColumn2 />
      <HeatmapColumn3 />
      <HeatmapColumn4 />
      <HeatmapColumn5 />
      <HeatmapColumn6 />
      <HeatmapColumn7 />
      <HeatmapColumn8 />
      <HeatmapColumn9 />
      <HeatmapColumn10 />
      <HeatmapColumn11 />
      <HeatmapColumn12 />
      <HeatmapColumn13 />
      <HeatmapColumn14 />
      <HeatmapColumn15 />
      <HeatmapColumn16 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-h-px min-w-px relative w-full">
      <FirstColumn />
      <HeatmapColumns />
    </div>
  );
}

function LegendItems() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Legend Items">
      <div className="bg-white h-[8px] relative shrink-0 w-[13px]" data-name="Legend Item">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#ecf0f9] h-[8px] shrink-0 w-[14px]" data-name="Legend Item" />
      <div className="bg-[#bed2f0] h-[8px] shrink-0 w-[13px]" data-name="Legend Item" />
      <div className="bg-[#6ea6e2] h-[8px] shrink-0 w-[13px]" data-name="Legend Item" />
      <div className="bg-[#3c89c3] h-[8px] shrink-0 w-[13px]" data-name="Legend Item" />
      <div className="bg-[#296fa3] h-[8px] shrink-0 w-[14px]" data-name="Legend Item" />
      <div className="bg-[#143a52] h-[8px] shrink-0 w-[13px]" data-name="Legend Item" />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[4px] h-[14px] items-center relative shrink-0" data-name=".">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#1c1c1c] text-[12px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2]">0 calls</p>
      </div>
      <LegendItems />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#1c1c1c] text-[12px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2]">+50</p>
      </div>
    </div>
  );
}

function LegendSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Legend Section">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[6px] relative w-full">
          <Component />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center pb-[16px] px-[16px] relative size-full">
          <Frame />
          <LegendSection />
        </div>
      </div>
    </div>
  );
}

function Heatmap() {
  return (
    <div className="bg-white h-[320px] min-w-[376px] relative rounded-[8px] shrink-0 w-full" data-name="Heatmap">
      <div className="content-stretch flex flex-col items-end min-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <Headers />
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

export default function WeeklyAverageVolume() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Weekly average volume">
      <Heatmap />
    </div>
  );
}