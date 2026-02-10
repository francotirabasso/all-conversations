import svgPaths from "./svg-kokprctbpi";

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex items-start pr-[32px] relative w-full">
        <p className="flex-[1_0_0] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2] min-h-px min-w-px relative text-[#1c1c1c] text-[27px] whitespace-pre-wrap">Save as new</p>
      </div>
    </div>
  );
}

function LabelDescriptionContainer() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[4px] relative shrink-0 w-full" data-name="label + description container">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[1.4] min-w-full relative shrink-0 text-[#3a3a3a] text-[15px] w-[min-content] whitespace-pre-wrap">View title</p>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] min-h-px min-w-px relative text-[#3a3a3a] text-[15px] whitespace-pre-wrap">Support CC conversations</p>
        </div>
      </div>
    </div>
  );
}

function InputBox() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[8px] shrink-0 w-full" data-name="Input box">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[inherit] w-full">
        <Content />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#4aa9ea] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TextInput() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text Input">
      <LabelDescriptionContainer />
      <InputBox />
    </div>
  );
}

function LabelDescriptionContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[4px] relative shrink-0 w-full" data-name="label + description container">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[1.4] min-w-full relative shrink-0 text-[#3a3a3a] text-[15px] w-[min-content] whitespace-pre-wrap">Description (Optional)</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] min-h-px min-w-px relative text-[#808080] text-[15px] whitespace-pre-wrap">Type here</p>
        </div>
      </div>
    </div>
  );
}

function InputBox1() {
  return (
    <div className="bg-[rgba(28,28,28,0.02)] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Input box">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[inherit] size-full">
        <Content1 />
        <div className="absolute bottom-[3.22px] right-[3.22px] size-[7.778px]" data-name="Textarea Corner">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.77817 7.77818">
            <g id="Textarea Corner">
              <path d={svgPaths.p366ad6f0} fill="#1C1C1C" fillOpacity="0.5" />
              <path d={svgPaths.p2c1d54c0} fill="#1C1C1C" fillOpacity="0.5" />
            </g>
          </svg>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Textarea() {
  return (
    <div className="content-stretch flex flex-col h-[105px] items-start relative shrink-0 w-full" data-name="Textarea">
      <LabelDescriptionContainer1 />
      <InputBox1 />
    </div>
  );
}

function SaveAsBody() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="_save as body">
      <TextInput />
      <Textarea />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <SaveAsBody />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Cancel</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Label />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[15px] text-white whitespace-nowrap">
        <p className="leading-[1.2]">Save</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#7c52ff] content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Label1 />
    </div>
  );
}

function ActionsRight() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Actions right">
      <Button />
      <Button1 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Actions">
      <ActionsRight />
    </div>
  );
}

function Footer() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Footer">
      <Actions />
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g>
          <path d={svgPaths.p2e4a7880} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconAlpha() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon alpha">
      <Close />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[8px] right-[8px] rounded-[8px] top-[8px]" data-name="Button">
      <IconAlpha />
    </div>
  );
}

function Dialog() {
  return (
    <div className="relative shrink-0 w-full" data-name="Dialog">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative w-full">
        <Header />
        <Body />
        <Footer />
        <Button2 />
      </div>
    </div>
  );
}

function Modal() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-[600px]" data-name="Modal">
      <div className="content-stretch flex flex-col items-end overflow-clip relative rounded-[inherit] w-full">
        <Dialog />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-[-1px] pointer-events-none rounded-[17px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.3)]" />
    </div>
  );
}

export default function ModalContainer() {
  return (
    <div className="bg-[rgba(0,0,0,0.65)] content-stretch flex flex-col items-center justify-center px-[216px] py-[8px] relative size-full" data-name="Modal container">
      <Modal />
    </div>
  );
}