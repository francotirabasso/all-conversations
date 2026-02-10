import svgPaths from "./svg-mfso31g3tu";
import svgPathsFooter from "./svg-mvbmojxr63";
import { useState } from "react";

interface DetailItem {
  label: string;
  value: number;
  icon?: string;
  children?: DetailItem[];
}

interface TabData {
  name: string;
  items: DetailItem[];
}

interface ContainerProps {
  nodeName: string;
  percentage: number;
  value: number;
  tabs?: TabData[];
  details?: DetailItem[];
  showChart?: boolean; // Controls whether to show donut chart or just phone icon
  iconType?: 'both' | 'phone-only'; // Controls which icons to show in the title
}

function Close() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g>
          <path d={svgPaths.p26740b90} id="Vector" stroke="var(--stroke-0, #1C1C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Header">
      <Close />
    </div>
  );
}

function Title({ nodeName }: { nodeName: string }) {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Title">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[15px] whitespace-nowrap">
        <p className="leading-[1.4]">{nodeName}</p>
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="phone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="phone">
          <path d={svgPaths.p2c1bf080} id="Vector" stroke="var(--stroke-0, #535353)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Monitor() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="monitor">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="monitor">
          <path d={svgPaths.p329cfa80} id="Vector" stroke="var(--stroke-0, #535353)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Icons({ iconType }: { iconType?: 'both' | 'phone-only' }) {
  return (
    <div className="content-stretch flex gap-[2px] h-[21px] items-center pt-[2px] relative shrink-0" data-name="Icons">
      <Phone />
      {iconType === 'both' && <Monitor />}
    </div>
  );
}

function Statistic({ nodeName, iconType }: { nodeName: string; iconType?: 'both' | 'phone-only' }) {
  return (
    <div className="content-stretch flex items-start gap-1 relative shrink-0 w-full" data-name="Statistic">
      <Title nodeName={nodeName} />
      <Icons iconType={iconType} />
    </div>
  );
}

function PercentageContainer({ value }: { value: number }) {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Percentage container">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#535353] text-[12px]">{value.toLocaleString()}</p>
    </div>
  );
}

function MainData({ percentage, value }: { percentage: number; value: number }) {
  return (
    <div className="content-stretch flex items-end gap-2 relative shrink-0 w-full" data-name="Main data">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] leading-[0] relative shrink-0 text-[#1c1c1c] text-[27px] whitespace-nowrap">
        <p className="leading-none text-[20px]">{percentage.toFixed(0)}%</p>
      </div>
      <PercentageContainer value={value} />
    </div>
  );
}

function Statistics({ nodeName, percentage, value, iconType }: { nodeName: string; percentage: number; value: number; iconType?: 'both' | 'phone-only' }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Statistics">
      <div className="flex flex-col gap-2 w-full h-full">
        <Statistic nodeName={nodeName} iconType={iconType} />
        <MainData percentage={percentage} value={value} />
      </div>
    </div>
  );
}

function Indicator() {
  return (
    <div className="bg-[#4ce6ee] relative rounded-[2px] shrink-0 size-[8px]" data-name="Indicator">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function LegendItem() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Legend item">
      <Indicator />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] text-center">Voice</p>
    </div>
  );
}

function Legend() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Legend">
      <LegendItem />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] text-center">62%</p>
    </div>
  );
}

function Indicator1() {
  return (
    <div className="bg-[#f67836] relative rounded-[2px] shrink-0 size-[8px]" data-name="Indicator">
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function LegendLabel() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Legend label">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] text-center">Digital</p>
    </div>
  );
}

function LegendItem1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Legend item">
      <Indicator1 />
      <LegendLabel />
    </div>
  );
}

function Legend1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Legend">
      <LegendItem1 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] text-center">38%</p>
    </div>
  );
}

function LegendContainer() {
  return (
    <div className="content-stretch flex flex-col h-full items-end justify-end relative shrink-0 w-[68px]" data-name="Legend container">
      <Legend />
      <Legend1 />
    </div>
  );
}

function Chart() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Chart">
          <g id="Ellipse 1">
            <mask fill="white" id="path-1-inside-1_2019_29194">
              <path d={svgPaths.p80c2a80} />
            </mask>
            <path d={svgPaths.p80c2a80} fill="var(--fill-0, #4CE6EE)" mask="url(#path-1-inside-1_2019_29194)" stroke="var(--stroke-0, #1C1C1C)" strokeOpacity="0.11" strokeWidth="2" />
          </g>
          <g id="Ellipse 2">
            <mask fill="white" id="path-2-inside-2_2019_29194">
              <path d={svgPaths.p12dcdd80} />
            </mask>
            <path d={svgPaths.p12dcdd80} fill="var(--fill-0, #F67836)" mask="url(#path-2-inside-2_2019_29194)" stroke="var(--stroke-0, #1C1C1C)" strokeOpacity="0.11" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ChartContainer() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-end justify-end relative shrink-0" data-name="Chart container">
      <LegendContainer />
      <Chart />
    </div>
  );
}

function PhoneIconLarge() {
  return (
    <div className="relative shrink-0 size-[48px] flex items-center justify-center" data-name="phone-large">
      <svg className="block size-[24px]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="phone">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" stroke="#535353" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function StatisticsContainer1({ nodeName, percentage, value, showChart = true, iconType }: { nodeName: string; percentage: number; value: number; showChart?: boolean; iconType?: 'both' | 'phone-only' }) {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Statistics container">
      <Statistics nodeName={nodeName} percentage={percentage} value={value} iconType={iconType} />
      {showChart && (
        <div className="flex flex-row items-end self-stretch">
          <ChartContainer />
        </div>
      )}
    </div>
  );
}

function StatisticsContainer({ nodeName, percentage, value, showChart = true, iconType }: { nodeName: string; percentage: number; value: number; showChart?: boolean; iconType?: 'both' | 'phone-only' }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Statistics container">
      <StatisticsContainer1 nodeName={nodeName} percentage={percentage} value={value} showChart={showChart} iconType={iconType} />
    </div>
  );
}

function Header({ nodeName, percentage, value, showChart = true, iconType }: { nodeName: string; percentage: number; value: number; showChart?: boolean; iconType?: 'both' | 'phone-only' }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <StatisticsContainer nodeName={nodeName} percentage={percentage} value={value} showChart={showChart} iconType={iconType} />
      </div>
    </div>
  );
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 font-['SF_Pro:Regular',sans-serif] text-[13px] border-b-2 transition-colors ${
        isActive 
          ? 'border-[#6366F1] text-[#6366F1] font-medium' 
          : 'border-transparent text-[#6B7280] hover:text-[#374151]'
      }`}
    >
      {label}
    </button>
  );
}

function DetailRow({ label, value, icon }: { label: string; value: number; icon?: string }) {
  // Determine which icon to show based on the icon prop
  const showPhone = icon === '📞';
  const showMonitor = icon === '💬';
  
  return (
    <div className="flex items-center justify-between py-2.5 px-4">
      <div className="flex items-center gap-2">
        <span className="font-['SF_Pro:Light',sans-serif] font-light text-[13px] text-[#535353]">{label}</span>
        {showPhone && <Phone />}
        {showMonitor && <Monitor />}
      </div>
      <span className="font-['SF_Pro:Light',sans-serif] font-light text-[13px] text-[#535353]">{value}</span>
    </div>
  );
}

function TabsContent({ tabs }: { tabs: TabData[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full border-t border-[rgba(28,28,28,0.1)]">
      {/* Tab Headers */}
      <div className="flex border-b border-[rgba(28,28,28,0.1)] px-1">
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            label={tab.name}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>

      {/* Tab Content with custom scrollbar */}
      <div 
        className="max-h-[300px] overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D1D5DB #F3F4F6'
        }}
      >
        <style>{`
          .max-h-\\\\\\\\[300px\\\\\\\\]::-webkit-scrollbar {
            width: 8px;
          }
          .max-h-\\\\\\\\[300px\\\\\\\\]::-webkit-scrollbar-track {
            background: #F3F4F6;
          }
          .max-h-\\\\\\\\[300px\\\\\\\\]::-webkit-scrollbar-thumb {
            background: #D1D5DB;
            border-radius: 4px;
          }
          .max-h-\\\\\\\\[300px\\\\\\\\]::-webkit-scrollbar-thumb:hover {
            background: #9CA3AF;
          }
        `}</style>
        {tabs[activeTab].items.map((item, index) => (
          <DetailRow
            key={index}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

function HierarchicalDetailRow({ item, isChild }: { item: DetailItem; isChild?: boolean }) {
  const showPhone = item.icon === '📞';
  const showMonitor = item.icon === '💬';
  
  return (
    <>
      <div className={`flex items-center justify-between py-2.5 ${isChild ? 'pl-8 pr-4' : 'px-4'}`}>
        <div className="flex items-center gap-2">
          <span className="font-['SF_Pro:Light',sans-serif] font-light text-[13px] text-[#535353]">{item.label}</span>
          {showPhone && <Phone />}
          {showMonitor && <Monitor />}
        </div>
        <span className="font-['SF_Pro:Light',sans-serif] font-light text-[13px] text-[#535353]">{item.value}</span>
      </div>
      {item.children && item.children.map((child, index) => (
        <HierarchicalDetailRow key={index} item={child} isChild={true} />
      ))}
    </>
  );
}

function DetailsContent({ details }: { details: DetailItem[] }) {
  return (
    <div className="w-full border-t border-[rgba(28,28,28,0.1)]">
      <div 
        className="max-h-[300px] overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D1D5DB #F3F4F6'
        }}
      >
        <style>{`
          .max-h-\\\\\\\\\\\\\\\\[300px\\\\\\\\\\\\\\\\]::-webkit-scrollbar {
            width: 8px;
          }
          .max-h-\\\\\\\\\\\\\\\\[300px\\\\\\\\\\\\\\\\]::-webkit-scrollbar-track {
            background: #F3F4F6;
          }
          .max-h-\\\\\\\\\\\\\\\\[300px\\\\\\\\\\\\\\\\]::-webkit-scrollbar-thumb {
            background: #D1D5DB;
            border-radius: 4px;
          }
          .max-h-\\\\\\\\\\\\\\\\[300px\\\\\\\\\\\\\\\\]::-webkit-scrollbar-thumb:hover {
            background: #9CA3AF;
          }
        `}</style>
        {details.map((item, index) => (
          <HierarchicalDetailRow key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function ExternalLink() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="external-link">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="external-link">
          <path d={svgPathsFooter.p14a57d80} id="Vector" stroke="var(--stroke-0, #7C52FF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative w-full">
      <div aria-hidden="true" className="absolute border-[rgba(28,28,28,0.11)] border-solid border-t inset-0 pointer-events-none" />
      <a 
        href="#" 
        className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#7c52ff] text-[12px] hover:underline"
        onClick={(e) => {
          e.preventDefault();
          // Future: Handle navigation to call history
        }}
      >
        View in call history
      </a>
      <ExternalLink />
    </div>
  );
}

export default function Container({ nodeName, percentage, value, tabs, details, showChart, iconType }: ContainerProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[12px] w-[320px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(28,28,28,0.17)] border-solid border inset-0 pointer-events-none rounded-[12px]" />
      <Header nodeName={nodeName} percentage={percentage} value={value} showChart={showChart} iconType={iconType} />
      {tabs && tabs.length > 0 && <TabsContent tabs={tabs} />}
      {details && details.length > 0 && <DetailsContent details={details} />}
      <Footer />
    </div>
  );
}