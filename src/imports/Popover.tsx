import svgPaths from "./svg-apvuqj76y0";

function LabelDescriptionContainer() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[4px] relative shrink-0 w-full" data-name="label + description container">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[1.4] min-w-full relative shrink-0 text-[#3a3a3a] text-[12px] w-[min-content] whitespace-pre-wrap">Offices</p>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Left Icon">
          <path d={svgPaths.pfabe700} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" />
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
          <LeftIcon />
          <p className="flex-[1_0_0] font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] min-h-px min-w-px relative text-[#808080] text-[12px] whitespace-pre-wrap">Search offices</p>
        </div>
      </div>
    </div>
  );
}

function InputBox() {
  return (
    <div className="bg-[rgba(28,28,28,0.02)] relative rounded-[4px] shrink-0 w-full" data-name="Input box">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[7px] relative rounded-[inherit] w-full">
        <Content />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TextInput() {
  return (
    <div className="content-stretch flex flex-col h-[49px] items-start relative shrink-0 w-full" data-name="Text Input">
      <LabelDescriptionContainer />
      <InputBox />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox1 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Select all</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input />
      <Content1 />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input1() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox3 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Office 1</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label1 />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input1 />
      <Content2 />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input2() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox5 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Office 2</p>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label2 />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input2 />
      <Content3 />
    </div>
  );
}

function Checkbox7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input3() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox7 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Office 3</p>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label3 />
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input3 />
      <Content4 />
    </div>
  );
}

function Checkbox9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input4() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox9 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Office 4</p>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label4 />
    </div>
  );
}

function Checkbox8() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input4 />
      <Content5 />
    </div>
  );
}

function Checkbox11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input5() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox11 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Office 5</p>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label5 />
    </div>
  );
}

function Checkbox10() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input5 />
      <Content6 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-h-px min-w-px relative">
      <Checkbox />
      <Checkbox2 />
      <Checkbox4 />
      <Checkbox6 />
      <Checkbox8 />
      <Checkbox10 />
    </div>
  );
}

function Frame3() {
  return <div className="bg-[#d2d2d2] h-[67px] rounded-[102px] shrink-0 w-full" />;
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[2px] py-[4px] relative self-stretch shrink-0 w-[8px]">
      <Frame3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame />
      <Frame2 />
    </div>
  );
}

function Offices() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Offices">
      <TextInput />
      <Frame1 />
    </div>
  );
}

function LabelDescriptionContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[4px] relative shrink-0 w-full" data-name="label + description container">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[1.4] min-w-full relative shrink-0 text-[#3a3a3a] text-[12px] w-[min-content] whitespace-pre-wrap">Groups</p>
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Left Icon">
          <path d={svgPaths.pfabe700} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[12px] relative w-full">
          <LeftIcon1 />
          <p className="flex-[1_0_0] font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] min-h-px min-w-px relative text-[#808080] text-[12px] whitespace-pre-wrap">Search groups</p>
        </div>
      </div>
    </div>
  );
}

function InputBox1() {
  return (
    <div className="bg-[rgba(28,28,28,0.02)] relative rounded-[4px] shrink-0 w-full" data-name="Input box">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[7px] relative rounded-[inherit] w-full">
        <Content7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="content-stretch flex flex-col h-[49px] items-start relative shrink-0 w-full" data-name="Text Input">
      <LabelDescriptionContainer1 />
      <InputBox1 />
    </div>
  );
}

function Checkbox13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input6() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox13 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Select all</p>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label6 />
    </div>
  );
}

function Checkbox12() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input6 />
      <Content8 />
    </div>
  );
}

function Checkbox15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input7() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox15 />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Acme Support</p>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label7 />
    </div>
  );
}

function Checkbox14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input7 />
      <Content9 />
    </div>
  );
}

function Checkbox17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input8() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox17 />
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Beta Experts</p>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label8 />
    </div>
  );
}

function Checkbox16() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input8 />
      <Content10 />
    </div>
  );
}

function Checkbox19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input9() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox19 />
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Delta Squad</p>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label9 />
    </div>
  );
}

function Checkbox18() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input9 />
      <Content11 />
    </div>
  );
}

function Checkbox21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input10() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox21 />
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Growth Team</p>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label10 />
    </div>
  );
}

function Checkbox20() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input10 />
      <Content12 />
    </div>
  );
}

function Checkbox23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="_Checkbox">
      <div className="absolute bg-[rgba(28,28,28,0.02)] border border-[rgba(28,28,28,0.3)] border-solid inset-0 rounded-[4px]" data-name="_base" />
    </div>
  );
}

function Input11() {
  return (
    <div className="content-stretch flex items-start pt-[4px] relative shrink-0" data-name="Input">
      <Checkbox23 />
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#1c1c1c] text-[15px] text-ellipsis">
        <p className="leading-[1.6] whitespace-pre-wrap">Sales Agents</p>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <Label11 />
    </div>
  );
}

function Checkbox22() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Checkbox">
      <Input11 />
      <Content13 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-h-px min-w-px relative">
      <Checkbox12 />
      <Checkbox14 />
      <Checkbox16 />
      <Checkbox18 />
      <Checkbox20 />
      <Checkbox22 />
    </div>
  );
}

function Frame8() {
  return <div className="bg-[#d2d2d2] h-[67px] rounded-[102px] shrink-0 w-full" />;
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[2px] py-[4px] relative self-stretch shrink-0 w-[8px]">
      <Frame8 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Groups() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Groups">
      <TextInput1 />
      <Frame5 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <Offices />
        <Groups />
      </div>
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#d90a45] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Clear all</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[4px] py-[7px] relative rounded-[4px] shrink-0" data-name="Button">
      <Label12 />
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[1.2]">Apply filters</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#7c52ff] content-stretch flex items-center justify-center px-[4px] py-[7px] relative rounded-[4px] shrink-0" data-name="Button">
      <Label13 />
    </div>
  );
}

function WidgetFiltersFooter() {
  return (
    <div className="bg-[#f9f9f9] h-[44px] relative shrink-0 w-full" data-name="_widget filters footer">
      <div aria-hidden="true" className="absolute border-[rgba(28,28,28,0.11)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Frame4 />
      <WidgetFiltersFooter />
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