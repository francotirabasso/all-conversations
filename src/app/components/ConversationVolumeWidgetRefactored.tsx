import { Widget } from "./Widget";
import { MenuWithDot } from "./MenuWithDot";
import { LineChart } from "./LineChart";
import React from "react";

// Menu button component (tres puntos verticales)
function MoreVertical() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="more-vertical">
          <path d="M7 3.5v-1M7 7.5v-1M7 11.5v-1" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function IconAlpha1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon alpha">
      <MoreVertical />
    </div>
  );
}

export function ConversationVolumeWidgetRefactored() {
  const [filterCount, setFilterCount] = React.useState(0);

  return (
    <Widget
      title="Conversation volume over time"
      minHeight={320}
      showFilterButton={true}
      showMenuButton={true}
      filterButton={<MenuWithDot onFiltersChange={setFilterCount} />}
      menuButton={
        <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer">
          <IconAlpha1 />
        </button>
      }
    >
      <div className="flex-1 w-full h-full min-h-0">
        <LineChart />
      </div>
    </Widget>
  );
}