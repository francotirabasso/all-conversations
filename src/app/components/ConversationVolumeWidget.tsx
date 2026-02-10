import { Widget } from "./Widget";
import { MenuWithDot } from "./MenuWithDot";
import React from "react";

// Aquí iría el contenido del gráfico (por ahora usaremos un placeholder)
function ChartContent() {
  return (
    <div className="flex items-center justify-center w-full h-full text-gray-400">
      Chart content goes here
    </div>
  );
}

export function ConversationVolumeWidget() {
  return (
    <Widget
      title="Conversation volume over time"
      minColumns={2}
      minHeight={320}
      showFilterButton={true}
      showMenuButton={true}
      filterButton={<MenuWithDot onFiltersChange={(count) => console.log(count)} />}
      menuButton={
        <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer">
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" viewBox="0 0 14 14">
              <path d="M7 3.5v7M7 3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM7 10.5v-7M7 10.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM7 7a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            </svg>
          </div>
        </button>
      }
    >
      <ChartContent />
    </Widget>
  );
}
