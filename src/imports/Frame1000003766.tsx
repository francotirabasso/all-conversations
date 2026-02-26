import svgPaths from "./svg-0rxmv7ldfh";
// import imgChart from "figma:asset/45fe613bd972f75d91e566b3f52ce1a9b43c3055.png"; // Figma asset not available
import React, { useState, useEffect, useCallback, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Accordion from "@radix-ui/react-accordion";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, ChevronDown } from "lucide-react";
import { MenuWithDot } from "@/app/components/MenuWithDot";
import { AddFilterPopover, FilterChip, type FilterType } from "@/app/components/FilterChipMenu";
import { StatWidget } from "@/app/components/StatWidget";
import { Widget } from "@/app/components/Widget";
import { LineChart } from "@/app/components/LineChart";
import PageHeader from "./PageHeader";
import { calculateMetrics, calculateMetricsWithFilters, type DashboardMetrics } from "@/app/utils/csvDataProcessor";
import { useGlobalFilters } from "@/app/contexts/GlobalFiltersContext";
import { HeatmapWidget } from "@/app/components/HeatmapWidget";
import { SankeyWidget } from "@/app/components/SankeyWidget";
import { processHeatmapData, generateMockHeatmapData } from "@/app/utils/heatmapProcessor";
import { WidgetModal } from "@/app/components/WidgetModal";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverEvent, DragStartEvent, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useWidgetOrder, type Section } from "@/app/hooks/useWidgetOrder";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { getWidgetWeight, calculateSectionWeight, canAddToSection } from "@/app/config/widgetWeights";
import { calculateGridColumns, getWidgetColumnSpan } from "@/app/utils/gridCalculator";
import { DropIndicator } from "@/app/components/DropIndicator";
import { HorizontalDropIndicator } from "@/app/components/HorizontalDropIndicator";
import { SectionBoundary } from "@/app/components/SectionBoundary";
import { SortableWidget } from "@/app/components/SortableWidget";
import { DynamicSection } from "@/app/components/DynamicSection";

// Global styles for checkbox, input focus colors, and scrollbars
const styleEl = document.createElement('style');
styleEl.innerHTML = `
  [data-state="checked"] {
    background-color: #7C52FF !important;
    border-color: #7C52FF !important;
  }
  input:focus, select:focus {
    --tw-ring-color: #7C52FF !important;
  }
  /* Light scrollbar for ALL overflow-y-auto divs in the popover */
  [role="dialog"] .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  [role="dialog"] .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  [role="dialog"] .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 4px;
  }
  [role="dialog"] .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
  
  /* Horizontal scrollbar for heatmap */
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }
  .overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }
  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleEl);
}

function Grip() {
  return (
    <div className="relative shrink-0 w-full" data-name="Grip">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center pl-[12px] pr-[13px] w-full" />
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Info">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_5860)" id="Info">
          <path d={svgPaths.p12c77580} id="Vector" stroke="var(--stroke-0, #535353)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_5860">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0">
      <Info />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] h-[28px] items-center min-h-px min-w-px mr-[-75px] relative" data-name="Title">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[12px] text-black text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden">Conversation volume over time</p>
      </div>
      <Frame3 />
    </div>
  );
}

function Label({ count }: { count: number }) {
  return (
    <div className="content-stretch flex flex-col items-center min-w-[8px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-black text-center tracking-[0.24px] whitespace-nowrap">
        <p className="leading-[16px]">{count}</p>
      </div>
    </div>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <div className="bg-[rgba(28,28,28,0.1)] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[102px] shrink-0" data-name="Badge">
      <Label count={count} />
    </div>
  );
}

function Filter() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="filter">
          <path d={svgPaths.p1e930400} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function IconAlpha() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon alpha">
      <Filter />
    </div>
  );
}

function Menu({ onFiltersChange }: { onFiltersChange: (count: number) => void }) {
  // Filtros temporales - se editan mientras el usuario interactúa
  const [filters, setFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
    dateRange: "Past 7 days",
    aiAgent: "All agents",
    channels: {
      email: true,
      chat: true,
      phone: false,
      social: false,
    },
    conversationType: {
      inbound: true,
      outbound: true,
    },
    durationRange: [5, 30], // days: 0 (today) to 90 (3 months)
    keyword: "",
    status: {
      open: true,
      pending: true,
      closed: true,
    },
    tags: [] as string[],
  });

  // Filtros aplicados - solo se actualizan al presionar "Apply filters"
  const [appliedFilters, setAppliedFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
    dateRange: "Past 7 days",
    aiAgent: "All agents",
    channels: {
      email: true,
      chat: true,
      phone: false,
      social: false,
    },
    conversationType: {
      inbound: true,
      outbound: true,
    },
    durationRange: [5, 30],
    keyword: "",
    status: {
      open: true,
      pending: true,
      closed: true,
    },
    tags: [] as string[],
  });

  const [officeSearch, setOfficeSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");

  // Mock data for offices and groups
  const mockOffices = [
    "?|?/|\\test-vivek/&^*!@",
    "245 - Security",
    "AAM",
    "Akshat's",
    "Alex L Test 2",
    "Alex Lam Office &&&",
    "Alex Office 2",
    "Amit Ayre Test",
    "Amit's Office - DO NOT CHANGE",
    "AnaV Test Office",
    "Ashton Test Office",
    "AU Test Office",
    "Australia",
  ];

  const mockGroups = [
    { name: "_Jason", subtitle: "Voice contact center", office: "AAM" },
    { name: "_newCC", subtitle: "Voice contact center", office: "AAM" },
    { name: "_test from Vincent", subtitle: "Voice contact center", office: "245 - Security" },
    { name: ":JGL", subtitle: "Sim-ring contact center", office: "Akshat's" },
    { name: "!!! 18 Digital VJ", subtitle: "Voice contact center", office: "Alex L Test 2" },
    { name: "!!! Digital 1 Vj", subtitle: "Digital contact center", office: "Alex L Test 2" },
    { name: "!!! Digital Vj 2", subtitle: "Digital contact center", office: "Alex Office 2" },
    { name: "!!! test lang exp CC", subtitle: "Voice contact center", office: "Amit Ayre Test" },
    { name: "!!!! TEST", subtitle: "Voice contact center", office: "AU Test Office" },
  ];

  const filteredOffices = mockOffices.filter(office =>
    office.toLowerCase().includes(officeSearch.toLowerCase())
  );

  // Filter groups based on selected offices
  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(groupSearch.toLowerCase());
    const matchesOffice = filters.target.offices.length === 0 || filters.target.offices.includes(group.office);
    return matchesSearch && matchesOffice;
  });

  const getDurationLabel = (days: number) => {
    if (days === 0) return "Today";
    if (days === 1) return "1 day";
    if (days === 7) return "7 days";
    if (days === 30) return "30 days";
    if (days === 90) return "90 days";
    return `${days} days`;
  };

  const handleChannelToggle = (channel: keyof typeof filters.channels) => {
    setFilters({
      ...filters,
      channels: { ...filters.channels, [channel]: !filters.channels[channel] },
    });
  };

  const handleConversationTypeToggle = (type: keyof typeof filters.conversationType) => {
    setFilters({
      ...filters,
      conversationType: { ...filters.conversationType, [type]: !filters.conversationType[type] },
    });
  };

  const handleStatusToggle = (status: keyof typeof filters.status) => {
    setFilters({
      ...filters,
      status: { ...filters.status, [status]: !filters.status[status] },
    });
  };

  // Función para contar filtros activos basada en cualquier set de filtros
  const getActiveFiltersCount = (filterSet: typeof filters) => {
    let count = 0;
    
    // Target filter (offices or groups selected)
    if (filterSet.target.offices.length > 0 || filterSet.target.groups.length > 0) count++;
    
    // Date filter (not default)
    if (filterSet.dateRange !== "Past 30 days") count++;
    
    if (filterSet.aiAgent !== "All agents") count++;
    const selectedChannels = Object.values(filterSet.channels).filter(v => v).length;
    const totalChannels = Object.keys(filterSet.channels).length;
    if (selectedChannels < totalChannels) count++;
    const selectedConversationTypes = Object.values(filterSet.conversationType).filter(v => v).length;
    const totalConversationTypes = Object.keys(filterSet.conversationType).length;
    if (selectedConversationTypes < totalConversationTypes) count++;
    if (filterSet.durationRange[0] !== 0 || filterSet.durationRange[1] !== 90) count++;
    if (filterSet.keyword) count++;
    const selectedStatus = Object.values(filterSet.status).filter(v => v).length;
    const totalStatus = Object.keys(filterSet.status).length;
    if (selectedStatus < totalStatus) count++;
    return count;
  };

  const getActiveFilters = () => {
    const active: Array<{ label: string; onRemove: () => void }> = [];

    // Target
    const totalTargets = filters.target.offices.length + filters.target.groups.length;
    if (totalTargets > 0) {
      active.push({
        label: `Target · ${totalTargets}`,
        onRemove: () => setFilters({
          ...filters,
          target: { offices: [], groups: [] },
        }),
      });
    }

    // Date
    if (filters.dateRange !== "Past 30 days") {
      active.push({
        label: `Date`,
        onRemove: () => setFilters({ ...filters, dateRange: "Past 30 days" }),
      });
    }

    // AI Agent
    if (filters.aiAgent !== "All agents") {
      active.push({
        label: `AI Agent`,
        onRemove: () => setFilters({ ...filters, aiAgent: "All agents" }),
      });
    }

    // Channels - count how many are selected (not all selected)
    const selectedChannels = Object.values(filters.channels).filter(v => v).length;
    const totalChannels = Object.keys(filters.channels).length;
    if (selectedChannels < totalChannels) {
      active.push({
        label: `Channels · ${selectedChannels}`,
        onRemove: () => setFilters({
          ...filters,
          channels: { email: true, chat: true, phone: true, social: true },
        }),
      });
    }

    // Conversation Type - count how many are selected (not all selected)
    const selectedConversationTypes = Object.values(filters.conversationType).filter(v => v).length;
    const totalConversationTypes = Object.keys(filters.conversationType).length;
    if (selectedConversationTypes < totalConversationTypes) {
      active.push({
        label: `Conversation type · ${selectedConversationTypes}`,
        onRemove: () => setFilters({
          ...filters,
          conversationType: { inbound: true, outbound: true },
        }),
      });
    }

    // Duration
    if (filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90) {
      active.push({
        label: `Duration`,
        onRemove: () => setFilters({ ...filters, durationRange: [0, 90] }),
      });
    }

    // Keyword
    if (filters.keyword) {
      active.push({
        label: `Keyword`,
        onRemove: () => setFilters({ ...filters, keyword: "" }),
      });
    }

    // Status - count how many are selected (not all selected)
    const selectedStatus = Object.values(filters.status).filter(v => v).length;
    const totalStatus = Object.keys(filters.status).length;
    if (selectedStatus < totalStatus) {
      active.push({
        label: `Status · ${selectedStatus}`,
        onRemove: () => setFilters({
          ...filters,
          status: { open: true, pending: true, closed: true },
        }),
      });
    }

    return active;
  };

  // Helper functions to get filter labels and status
  const getTargetLabel = () => {
    const totalTargets = filters.target.offices.length + filters.target.groups.length;
    if (totalTargets > 0) return `Target · ${totalTargets}`;
    return "Target";
  };

  const isTargetActive = () => {
    return filters.target.offices.length > 0 || filters.target.groups.length > 0;
  };

  const clearTarget = () => {
    setFilters({
      ...filters,
      target: { offices: [], groups: [] },
    });
  };

  const getDateLabel = () => {
    if (filters.dateRange !== "Past 30 days") return `Date · ${filters.dateRange}`;
    return "Date";
  };

  const isDateActive = () => filters.dateRange !== "Past 30 days";

  const clearDate = () => {
    setFilters({ ...filters, dateRange: "Past 30 days" });
  };

  const getAIAgentLabel = () => {
    if (filters.aiAgent !== "All agents") return `AI Agent · ${filters.aiAgent}`;
    return "AI Agent";
  };

  const isAIAgentActive = () => filters.aiAgent !== "All agents";

  const clearAIAgent = () => {
    setFilters({ ...filters, aiAgent: "All agents" });
  };

  const getChannelsLabel = () => {
    const selectedChannels = Object.values(filters.channels).filter(v => v).length;
    const totalChannels = Object.keys(filters.channels).length;
    if (selectedChannels < totalChannels) return `Channels · ${selectedChannels}`;
    return "Channels";
  };

  const isChannelsActive = () => {
    const selectedChannels = Object.values(filters.channels).filter(v => v).length;
    const totalChannels = Object.keys(filters.channels).length;
    return selectedChannels < totalChannels;
  };

  const clearChannels = () => {
    setFilters({
      ...filters,
      channels: { email: true, chat: true, phone: true, social: true },
    });
  };

  const getConversationTypeLabel = () => {
    const selected = Object.values(filters.conversationType).filter(v => v).length;
    const total = Object.keys(filters.conversationType).length;
    if (selected < total) return `Conversation type · ${selected}`;
    return "Conversation type";
  };

  const isConversationTypeActive = () => {
    const selected = Object.values(filters.conversationType).filter(v => v).length;
    const total = Object.keys(filters.conversationType).length;
    return selected < total;
  };

  const clearConversationType = () => {
    setFilters({
      ...filters,
      conversationType: { inbound: true, outbound: true },
    });
  };

  const getDurationLabelText = () => {
    if (filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90) {
      return `Duration · ${getDurationLabel(filters.durationRange[0])} - ${getDurationLabel(filters.durationRange[1])}`;
    }
    return "Duration";
  };

  const isDurationActive = () => filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90;

  const clearDuration = () => {
    setFilters({ ...filters, durationRange: [0, 90] });
  };

  const getKeywordLabel = () => {
    if (filters.keyword) return `Keyword · "${filters.keyword}"`;
    return "Keyword";
  };

  const isKeywordActive = () => !!filters.keyword;

  const clearKeyword = () => {
    setFilters({ ...filters, keyword: "" });
  };

  const getStatusLabel = () => {
    const selected = Object.values(filters.status).filter(v => v).length;
    const total = Object.keys(filters.status).length;
    if (selected < total) return `Status · ${selected}`;
    return "Status";
  };

  const isStatusActive = () => {
    const selected = Object.values(filters.status).filter(v => v).length;
    const total = Object.keys(filters.status).length;
    return selected < total;
  };

  const clearStatus = () => {
    setFilters({
      ...filters,
      status: { open: true, pending: true, closed: true },
    });
  };

  const activeFilters = getActiveFilters();
  
  // El contador del badge se basa en los filtros APLICADOS, no en los temporales
  const appliedFiltersCount = getActiveFiltersCount(appliedFilters);

  // Notify parent of filter count changes - solo cuando cambian los filtros aplicados
  useEffect(() => {
    onFiltersChange(appliedFiltersCount);
  }, [appliedFiltersCount, onFiltersChange]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer" data-name="Menu">
          <IconAlpha />
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-xl shadow-lg border border-[rgba(28,28,28,0.15)] w-[320px] max-h-[500px] overflow-hidden z-50 flex flex-col"
          sideOffset={5}
          align="end"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="font-['SF_Pro:Semibold',sans-serif] text-[14px] text-black">Filters</h3>
            </div>
            <Popover.Close className="text-gray-500 hover:text-gray-700 transition-colors">
              <X className="size-4" />
            </Popover.Close>
          </div>

          {/* Scrollable Accordion Area */}
          <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            <Accordion.Root type="single" collapsible className="w-full">
              {/* Target */}
              <Accordion.Item value="target" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isTargetActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getTargetLabel()}
                    </span>
                    {isTargetActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearTarget();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear target filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-3">
                    {/* Offices Dropdown */}
                    <div>
                      <label className="block text-[11px] font-['SF_Pro:Semibold',sans-serif] text-[#535353] mb-1.5">Offices</label>
                      <input
                        type="text"
                        value={officeSearch}
                        onChange={(e) => setOfficeSearch(e.target.value)}
                        placeholder="Search offices..."
                        className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                      />
                      <div className="mt-2 max-h-[100px] overflow-y-auto">
                        {filteredOffices.map((office) => (
                          <label key={office} className="flex items-center gap-2 cursor-pointer py-1">
                            <Checkbox.Root
                              checked={filters.target.offices.includes(office)}
                              onCheckedChange={() => {
                                if (filters.target.offices.includes(office)) {
                                  setFilters({
                                    ...filters,
                                    target: {
                                      ...filters.target,
                                      offices: filters.target.offices.filter(o => o !== office),
                                    },
                                  });
                                } else {
                                  setFilters({
                                    ...filters,
                                    target: {
                                      ...filters.target,
                                      offices: [...filters.target.offices, office],
                                    },
                                  });
                                }
                              }}
                              className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            >
                              <Checkbox.Indicator>
                                <Check className="size-3 text-white" />
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className="text-[12px] text-[#535353]">{office}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Groups Dropdown */}
                    <div>
                      <label className="block text-[11px] font-['SF_Pro:Semibold',sans-serif] text-[#535353] mb-1.5">
                        Groups {filters.target.offices.length > 0 && <span className="text-[#9CA3AF]">(filtered by selected offices)</span>}
                      </label>
                      <input
                        type="text"
                        value={groupSearch}
                        onChange={(e) => setGroupSearch(e.target.value)}
                        placeholder="Search groups..."
                        className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                      />
                      <div className="mt-2 max-h-[100px] overflow-y-auto">
                        {filteredGroups.length === 0 ? (
                          <p className="text-[11px] text-[#9CA3AF] py-2">
                            {filters.target.offices.length > 0 ? "No groups for selected offices" : "No groups found"}
                          </p>
                        ) : (
                          filteredGroups.map((group) => (
                            <label key={group.name} className="flex items-center gap-2 cursor-pointer py-1">
                              <Checkbox.Root
                                checked={filters.target.groups.includes(group.name)}
                                onCheckedChange={() => {
                                  if (filters.target.groups.includes(group.name)) {
                                    setFilters({
                                      ...filters,
                                      target: {
                                        ...filters.target,
                                        groups: filters.target.groups.filter(g => g !== group.name),
                                      },
                                    });
                                  } else {
                                    setFilters({
                                      ...filters,
                                      target: {
                                        ...filters.target,
                                        groups: [...filters.target.groups, group.name],
                                      },
                                    });
                                  }
                                }}
                                className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                              >
                                <Checkbox.Indicator>
                                  <Check className="size-3 text-white" />
                                </Checkbox.Indicator>
                              </Checkbox.Root>
                              <div className="flex flex-col">
                                <span className="text-[12px] text-[#535353]">{group.name}</span>
                                <span className="text-[10px] text-[#9CA3AF]">{group.subtitle} · {group.office}</span>
                              </div>
                            </label>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Date */}
              <Accordion.Item value="date" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isDateActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getDateLabel()}
                    </span>
                    {isDateActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDate();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear date filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="w-full px-3 py-2 pr-8 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    >
                      <option>Today</option>
                      <option>Yesterday</option>
                      <option>Past 7 days</option>
                      <option>Past 30 days</option>
                      <option>Past 90 days</option>
                      <option>This month</option>
                      <option>Last month</option>
                      <option>This year</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* AI Agent */}
              <Accordion.Item value="ai-agent" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isAIAgentActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getAIAgentLabel()}
                    </span>
                    {isAIAgentActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAIAgent();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear AI agent filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <select
                      value={filters.aiAgent}
                      onChange={(e) => setFilters({ ...filters, aiAgent: e.target.value })}
                      className="w-full px-3 py-2 pr-8 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    >
                      <option>All agents</option>
                      <option>Agent 1</option>
                      <option>Agent 2</option>
                      <option>Agent 3</option>
                    </select>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Channels */}
              <Accordion.Item value="channels" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isChannelsActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getChannelsLabel()}
                    </span>
                    {isChannelsActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearChannels();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear channels filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-2">
                    {Object.entries(filters.channels).map(([channel, checked]) => (
                      <label key={channel} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={checked}
                          onCheckedChange={() => handleChannelToggle(channel as keyof typeof filters.channels)}
                          className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-[12px] text-[#535353] capitalize">{channel}</span>
                      </label>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Conversation Type */}
              <Accordion.Item value="conversation-type" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isConversationTypeActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getConversationTypeLabel()}
                    </span>
                    {isConversationTypeActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearConversationType();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear conversation type filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-2">
                    {Object.entries(filters.conversationType).map(([type, checked]) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={checked}
                          onCheckedChange={() => handleConversationTypeToggle(type as keyof typeof filters.conversationType)}
                          className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-[12px] text-[#535353] capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Duration */}
              <Accordion.Item value="duration" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isDurationActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getDurationLabelText()}
                    </span>
                    {isDurationActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDuration();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear duration filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-[16px] pb-[12px] pt-[6px] pr-[16px] pl-[16px] py-[12px]">
                    <Slider.Root
                      value={filters.durationRange}
                      onValueChange={(value) => setFilters({ ...filters, durationRange: value })}
                      min={0}
                      max={90}
                      step={1}
                      className="relative flex h-2 w-full touch-none select-none items-center"
                    >
                      <Slider.Track className="relative h-2 w-full rounded-full bg-gray-200">
                        <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
                      </Slider.Track>
                      <Slider.Thumb className="block h-5 w-5 rounded-full bg-white border-2 border-blue-500 shadow focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] focus:ring-offset-2 cursor-grab active:cursor-grabbing" />
                      <Slider.Thumb className="block h-5 w-5 rounded-full bg-white border-2 border-blue-500 shadow focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] focus:ring-offset-2 cursor-grab active:cursor-grabbing" />
                    </Slider.Root>
                    <div className="mt-3 flex justify-between text-[11px] text-gray-600 font-['SF_Pro:Medium',sans-serif]">
                      <span>{getDurationLabel(filters.durationRange[0])}</span>
                      <span>{getDurationLabel(filters.durationRange[1])}</span>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Keyword */}
              <Accordion.Item value="keyword" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isKeywordActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getKeywordLabel()}
                    </span>
                    {isKeywordActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearKeyword();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear keyword filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <input
                      type="text"
                      value={filters.keyword}
                      onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                      placeholder="Search by keyword..."
                      className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Status */}
              <Accordion.Item value="status" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isStatusActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getStatusLabel()}
                    </span>
                    {isStatusActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearStatus();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear status filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-2">
                    {Object.entries(filters.status).map(([status, checked]) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={checked}
                          onCheckedChange={() => handleStatusToggle(status as keyof typeof filters.status)}
                          className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-[12px] text-[#535353] capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Tags */}
              <Accordion.Item value="tags">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors group">
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      Tags
                    </span>
                    <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <input
                      type="text"
                      placeholder="Add tags..."
                      className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          {/* Actions */}
          <div className="flex gap-2 p-4 pt-3 border-t border-gray-200 shrink-0">
            <button
              onClick={() => {
                const clearedFilters = {
                  target: {
                    offices: [] as string[],
                    groups: [] as string[],
                  },
                  dateRange: "Past 30 days",
                  aiAgent: "All agents",
                  channels: { email: true, chat: true, phone: true, social: true },
                  conversationType: { inbound: true, outbound: true },
                  durationRange: [0, 90],
                  keyword: "",
                  status: { open: true, pending: true, closed: true },
                  tags: [],
                };
                setFilters(clearedFilters);
                setAppliedFilters(clearedFilters);
              }}
              className="flex-1 px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear all
            </button>
            <Popover.Close asChild>
              <button 
                onClick={() => setAppliedFilters({ ...filters })}
                className="flex-1 px-3 py-2 text-[12px] text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#7C52FF' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6941E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7C52FF'}
              >
                Apply filters
              </button>
            </Popover.Close>
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Frame4() {
  const filterContext = React.useContext(FilterContext);

  if (!filterContext) return null;

  const { activeFilters, setActiveFilters, filters } = filterContext;

  // Contar solo los filtros que están siendo usados (con valores aplicados)
  const countFiltersInUse = () => {
    let count = 0;
    
    activeFilters.forEach(filterType => {
      switch (filterType) {
        case "target":
          if (filters.target.offices.length > 0 || filters.target.groups.length > 0) count++;
          break;
        case "date":
          if (filters.dateRange !== "Past 30 days") count++;
          break;
        case "aiAgent":
          if (filters.aiAgent !== "All agents") count++;
          break;
        case "channels":
          const allChannelsSelected = Object.values(filters.channels).every(v => v);
          if (!allChannelsSelected) count++;
          break;
        case "conversationType":
          const allTypesSelected = Object.values(filters.conversationType).every(v => v);
          if (!allTypesSelected) count++;
          break;
        case "duration":
          if (filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90) count++;
          break;
        case "keyword":
          if (filters.keyword !== "") count++;
          break;
        case "status":
          const allStatusSelected = Object.values(filters.status).every(v => v);
          if (!allStatusSelected) count++;
          break;
      }
    });
    
    return count;
  };

  const filtersInUse = countFiltersInUse();

  return (
    <div className="content-stretch flex items-center relative shrink-0">
      {filtersInUse > 0 && (
        <>
          <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.11)] border-solid inset-0 pointer-events-none rounded-[102px]" />
          <div className="pl-[2px]">
            <Badge count={filtersInUse} />
          </div>
        </>
      )}
      <AddFilterPopover 
        activeFilters={activeFilters} 
        onFiltersChange={setActiveFilters}
        variant="button"
        svgIcon={<Filter />}
      />
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

function IconAlpha1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon alpha">
      <MoreVertical />
    </div>
  );
}

function Menu1() {
  const filterContext = React.useContext(FilterContext);
  
  // Verificar si hay filtros aplicados
  const hasFiltersApplied = filterContext ? (() => {
    const { activeFilters, filters } = filterContext;
    if (activeFilters.length === 0) return false;
    
    return activeFilters.some(filterType => {
      switch (filterType) {
        case "target":
          return filters.target.offices.length > 0 || filters.target.groups.length > 0;
        case "date":
          return filters.dateRange !== "Past 30 days";
        case "aiAgent":
          return filters.aiAgent !== "All agents";
        case "channels":
          return !Object.values(filters.channels).every(v => v);
        case "conversationType":
          return !Object.values(filters.conversationType).every(v => v);
        case "duration":
          return filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90;
        case "keyword":
          return filters.keyword !== "";
        case "status":
          return !Object.values(filters.status).every(v => v);
        default:
          return false;
      }
    });
  })() : false;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer" data-name="Menu">
          <IconAlpha1 />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-gray-200 w-[180px] z-50 py-1"
          sideOffset={5}
          align="end"
        >
          <div className="flex flex-col">
            {hasFiltersApplied && (
              <>
                <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors">
                  Save as new
                </button>
                <div className="border-t border-gray-200 my-1" />
              </>
            )}
            <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors">
              Maximize
            </button>
            <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors">
              Duplicate
            </button>
            <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors">
              Export
            </button>
            <div className="border-t border-gray-200 my-1" />
            <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-red-600 transition-colors">
              Remove
            </button>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// New Menu component with notification badge for Integrated widget
function MenuWithBadge({ onFiltersChange }: { onFiltersChange: (count: number) => void }) {
  // Filtros temporales - se editan mientras el usuario interactúa
  const [filters, setFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
    dateRange: "Past 30 days",
    aiAgent: "All agents",
    channels: {
      email: true,
      chat: true,
      phone: true,
      social: true,
    },
    conversationType: {
      inbound: true,
      outbound: true,
    },
    durationRange: [0, 90],
    keyword: "",
    status: {
      open: true,
      pending: true,
      closed: true,
    },
    tags: [] as string[],
  });

  // Filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
    dateRange: "Past 30 days",
    aiAgent: "All agents",
    channels: {
      email: true,
      chat: true,
      phone: true,
      social: true,
    },
    conversationType: {
      inbound: true,
      outbound: true,
    },
    durationRange: [0, 90],
    keyword: "",
    status: {
      open: true,
      pending: true,
      closed: true,
    },
    tags: [] as string[],
  });

  const [officeSearch, setOfficeSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");

  const mockOffices = [
    "?|?/|\\test-vivek/&^*!@",
    "245 - Security",
    "AAM",
    "Akshat's",
    "Alex L Test 2",
    "Alex Lam Office &&&",
    "Alex Office 2",
    "Amit Ayre Test",
    "Amit's Office - DO NOT CHANGE",
    "AnaV Test Office",
    "Ashton Test Office",
    "AU Test Office",
    "Australia",
  ];

  const mockGroups = [
    { name: "_Jason", subtitle: "Voice contact center", office: "AAM" },
    { name: "_newCC", subtitle: "Voice contact center", office: "AAM" },
    { name: "_test from Vincent", subtitle: "Voice contact center", office: "245 - Security" },
    { name: ":JGL", subtitle: "Sim-ring contact center", office: "Akshat's" },
    { name: "!!! 18 Digital VJ", subtitle: "Voice contact center", office: "Alex L Test 2" },
    { name: "!!! Digital 1 Vj", subtitle: "Digital contact center", office: "Alex L Test 2" },
    { name: "!!! Digital Vj 2", subtitle: "Digital contact center", office: "Alex Office 2" },
    { name: "!!! test lang exp CC", subtitle: "Voice contact center", office: "Amit Ayre Test" },
    { name: "!!!! TEST", subtitle: "Voice contact center", office: "AU Test Office" },
  ];

  const filteredOffices = mockOffices.filter(office =>
    office.toLowerCase().includes(officeSearch.toLowerCase())
  );

  // Filter groups based on selected offices
  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(groupSearch.toLowerCase());
    const matchesOffice = filters.target.offices.length === 0 || filters.target.offices.includes(group.office);
    return matchesSearch && matchesOffice;
  });

  const getDurationLabel = (days: number) => {
    if (days === 0) return "Today";
    if (days === 1) return "1 day";
    if (days === 7) return "7 days";
    if (days === 30) return "30 days";
    if (days === 90) return "90 days";
    return `${days} days`;
  };

  const handleChannelToggle = (channel: keyof typeof filters.channels) => {
    setFilters({
      ...filters,
      channels: { ...filters.channels, [channel]: !filters.channels[channel] },
    });
  };

  const handleConversationTypeToggle = (type: keyof typeof filters.conversationType) => {
    setFilters({
      ...filters,
      conversationType: { ...filters.conversationType, [type]: !filters.conversationType[type] },
    });
  };

  const handleStatusToggle = (status: keyof typeof filters.status) => {
    setFilters({
      ...filters,
      status: { ...filters.status, [status]: !filters.status[status] },
    });
  };

  const getActiveFiltersCount = (filterSet: typeof filters) => {
    let count = 0;
    if (filterSet.target.offices.length > 0 || filterSet.target.groups.length > 0) count++;
    if (filterSet.dateRange !== "Past 30 days") count++;
    if (filterSet.aiAgent !== "All agents") count++;
    const selectedChannels = Object.values(filterSet.channels).filter(v => v).length;
    const totalChannels = Object.keys(filterSet.channels).length;
    if (selectedChannels < totalChannels) count++;
    const selectedConversationTypes = Object.values(filterSet.conversationType).filter(v => v).length;
    const totalConversationTypes = Object.keys(filterSet.conversationType).length;
    if (selectedConversationTypes < totalConversationTypes) count++;
    if (filterSet.durationRange[0] !== 0 || filterSet.durationRange[1] !== 90) count++;
    if (filterSet.keyword) count++;
    const selectedStatus = Object.values(filterSet.status).filter(v => v).length;
    const totalStatus = Object.keys(filterSet.status).length;
    if (selectedStatus < totalStatus) count++;
    return count;
  };

  const getActiveFilters = () => {
    const active: Array<{ label: string; onRemove: () => void }> = [];
    const totalTargets = filters.target.offices.length + filters.target.groups.length;
    if (totalTargets > 0) {
      active.push({
        label: `Target · ${totalTargets}`,
        onRemove: () => setFilters({
          ...filters,
          target: { offices: [], groups: [] },
        }),
      });
    }
    if (filters.dateRange !== "Past 30 days") {
      active.push({
        label: `Date`,
        onRemove: () => setFilters({ ...filters, dateRange: "Past 30 days" }),
      });
    }
    if (filters.aiAgent !== "All agents") {
      active.push({
        label: `AI Agent`,
        onRemove: () => setFilters({ ...filters, aiAgent: "All agents" }),
      });
    }
    const selectedChannels = Object.values(filters.channels).filter(v => v).length;
    const totalChannels = Object.keys(filters.channels).length;
    if (selectedChannels < totalChannels) {
      active.push({
        label: `Channels · ${selectedChannels}`,
        onRemove: () => setFilters({
          ...filters,
          channels: { email: true, chat: true, phone: true, social: true },
        }),
      });
    }
    const selectedConversationTypes = Object.values(filters.conversationType).filter(v => v).length;
    const totalConversationTypes = Object.keys(filters.conversationType).length;
    if (selectedConversationTypes < totalConversationTypes) {
      active.push({
        label: `Conversation type · ${selectedConversationTypes}`,
        onRemove: () => setFilters({
          ...filters,
          conversationType: { inbound: true, outbound: true },
        }),
      });
    }
    if (filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90) {
      active.push({
        label: `Duration`,
        onRemove: () => setFilters({ ...filters, durationRange: [0, 90] }),
      });
    }
    if (filters.keyword) {
      active.push({
        label: `Keyword`,
        onRemove: () => setFilters({ ...filters, keyword: "" }),
      });
    }
    const selectedStatus = Object.values(filters.status).filter(v => v).length;
    const totalStatus = Object.keys(filters.status).length;
    if (selectedStatus < totalStatus) {
      active.push({
        label: `Status · ${selectedStatus}`,
        onRemove: () => setFilters({
          ...filters,
          status: { open: true, pending: true, closed: true },
        }),
      });
    }
    return active;
  };

  // Helper functions to get filter labels and status
  const getTargetLabel = () => {
    const totalTargets = filters.target.offices.length + filters.target.groups.length;
    if (totalTargets > 0) return `Target · ${totalTargets}`;
    return "Target";
  };

  const isTargetActive = () => {
    return filters.target.offices.length > 0 || filters.target.groups.length > 0;
  };

  const clearTarget = () => {
    setFilters({
      ...filters,
      target: { offices: [], groups: [] },
    });
  };

  const getDateLabel = () => {
    if (filters.dateRange !== "Past 30 days") return `Date · ${filters.dateRange}`;
    return "Date";
  };

  const isDateActive = () => filters.dateRange !== "Past 30 days";

  const clearDate = () => {
    setFilters({ ...filters, dateRange: "Past 30 days" });
  };

  const getAIAgentLabel = () => {
    if (filters.aiAgent !== "All agents") return `AI Agent · ${filters.aiAgent}`;
    return "AI Agent";
  };

  const isAIAgentActive = () => filters.aiAgent !== "All agents";

  const clearAIAgent = () => {
    setFilters({ ...filters, aiAgent: "All agents" });
  };

  const getChannelsLabel = () => {
    const selectedChannels = Object.values(filters.channels).filter(v => v).length;
    const totalChannels = Object.keys(filters.channels).length;
    if (selectedChannels < totalChannels) return `Channels · ${selectedChannels}`;
    return "Channels";
  };

  const isChannelsActive = () => {
    const selectedChannels = Object.values(filters.channels).filter(v => v).length;
    const totalChannels = Object.keys(filters.channels).length;
    return selectedChannels < totalChannels;
  };

  const clearChannels = () => {
    setFilters({
      ...filters,
      channels: { email: true, chat: true, phone: true, social: true },
    });
  };

  const getConversationTypeLabel = () => {
    const selected = Object.values(filters.conversationType).filter(v => v).length;
    const total = Object.keys(filters.conversationType).length;
    if (selected < total) return `Conversation type · ${selected}`;
    return "Conversation type";
  };

  const isConversationTypeActive = () => {
    const selected = Object.values(filters.conversationType).filter(v => v).length;
    const total = Object.keys(filters.conversationType).length;
    return selected < total;
  };

  const clearConversationType = () => {
    setFilters({
      ...filters,
      conversationType: { inbound: true, outbound: true },
    });
  };

  const getDurationLabelText = () => {
    if (filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90) {
      return `Duration · ${getDurationLabel(filters.durationRange[0])} - ${getDurationLabel(filters.durationRange[1])}`;
    }
    return "Duration";
  };

  const isDurationActive = () => filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90;

  const clearDuration = () => {
    setFilters({ ...filters, durationRange: [0, 90] });
  };

  const getKeywordLabel = () => {
    if (filters.keyword) return `Keyword · "${filters.keyword}"`;
    return "Keyword";
  };

  const isKeywordActive = () => !!filters.keyword;

  const clearKeyword = () => {
    setFilters({ ...filters, keyword: "" });
  };

  const getStatusLabel = () => {
    const selected = Object.values(filters.status).filter(v => v).length;
    const total = Object.keys(filters.status).length;
    if (selected < total) return `Status · ${selected}`;
    return "Status";
  };

  const isStatusActive = () => {
    const selected = Object.values(filters.status).filter(v => v).length;
    const total = Object.keys(filters.status).length;
    return selected < total;
  };

  const clearStatus = () => {
    setFilters({
      ...filters,
      status: { open: true, pending: true, closed: true },
    });
  };

  const activeFilters = getActiveFilters();
  const appliedFiltersCount = getActiveFiltersCount(appliedFilters);

  useEffect(() => {
    onFiltersChange(appliedFiltersCount);
  }, [appliedFiltersCount, onFiltersChange]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer" data-name="Menu">
          <IconAlpha />
          {appliedFiltersCount > 0 && (
            <div className="absolute -top-0.5 -right-0.5 bg-gray-500 text-white text-[9px] font-semibold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
              {appliedFiltersCount}
            </div>
          )}
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-xl shadow-lg border border-[rgba(28,28,28,0.15)] w-[320px] max-h-[500px] overflow-hidden z-50 flex flex-col"
          sideOffset={5}
          align="end"
        >
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="font-['SF_Pro:Semibold',sans-serif] text-[14px] text-black">Filters</h3>
            </div>
            <Popover.Close className="text-gray-500 hover:text-gray-700 transition-colors">
              <X className="size-4" />
            </Popover.Close>
          </div>

          <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            <Accordion.Root type="single" collapsible className="w-full">
              {/* Target */}
              <Accordion.Item value="target" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isTargetActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">
                      {getTargetLabel()}
                    </span>
                    {isTargetActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearTarget();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear target filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-3">
                    {/* Offices Dropdown */}
                    <div>
                      <label className="block text-[11px] font-['SF_Pro:Semibold',sans-serif] text-[#535353] mb-1.5">Offices</label>
                      <input
                        type="text"
                        value={officeSearch}
                        onChange={(e) => setOfficeSearch(e.target.value)}
                        placeholder="Search offices..."
                        className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                      />
                      <div className="mt-2 max-h-[100px] overflow-y-auto">
                        {filteredOffices.map((office) => (
                          <label key={office} className="flex items-center gap-2 cursor-pointer py-1">
                            <Checkbox.Root
                              checked={filters.target.offices.includes(office)}
                              onCheckedChange={() => {
                                if (filters.target.offices.includes(office)) {
                                  setFilters({
                                    ...filters,
                                    target: {
                                      ...filters.target,
                                      offices: filters.target.offices.filter(o => o !== office),
                                    },
                                  });
                                } else {
                                  setFilters({
                                    ...filters,
                                    target: {
                                      ...filters.target,
                                      offices: [...filters.target.offices, office],
                                    },
                                  });
                                }
                              }}
                              className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            >
                              <Checkbox.Indicator>
                                <Check className="size-3 text-white" />
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className="text-[12px] text-[#535353]">{office}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Groups Dropdown */}
                    <div>
                      <label className="block text-[11px] font-['SF_Pro:Semibold',sans-serif] text-[#535353] mb-1.5">
                        Groups {filters.target.offices.length > 0 && <span className="text-[#9CA3AF]">(filtered by selected offices)</span>}
                      </label>
                      <input
                        type="text"
                        value={groupSearch}
                        onChange={(e) => setGroupSearch(e.target.value)}
                        placeholder="Search groups..."
                        className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                      />
                      <div className="mt-2 max-h-[100px] overflow-y-auto">
                        {filteredGroups.length === 0 ? (
                          <p className="text-[11px] text-[#9CA3AF] py-2">
                            {filters.target.offices.length > 0 ? "No groups for selected offices" : "No groups found"}
                          </p>
                        ) : (
                          filteredGroups.map((group) => (
                            <label key={group.name} className="flex items-center gap-2 cursor-pointer py-1">
                              <Checkbox.Root
                                checked={filters.target.groups.includes(group.name)}
                                onCheckedChange={() => {
                                  if (filters.target.groups.includes(group.name)) {
                                    setFilters({
                                      ...filters,
                                      target: {
                                        ...filters.target,
                                        groups: filters.target.groups.filter(g => g !== group.name),
                                      },
                                    });
                                  } else {
                                    setFilters({
                                      ...filters,
                                      target: {
                                        ...filters.target,
                                        groups: [...filters.target.groups, group.name],
                                      },
                                    });
                                  }
                                }}
                                className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                              >
                                <Checkbox.Indicator>
                                  <Check className="size-3 text-white" />
                                </Checkbox.Indicator>
                              </Checkbox.Root>
                              <div className="flex flex-col">
                                <span className="text-[12px] text-[#535353]">{group.name}</span>
                                <span className="text-[10px] text-[#9CA3AF]">{group.subtitle} · {group.office}</span>
                              </div>
                            </label>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="date" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isDateActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getDateLabel()}</span>
                    {isDateActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDate();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear date filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="w-full px-3 py-2 pr-8 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    >
                      <option>Today</option>
                      <option>Yesterday</option>
                      <option>Past 7 days</option>
                      <option>Past 30 days</option>
                      <option>Past 90 days</option>
                      <option>This month</option>
                      <option>Last month</option>
                      <option>This year</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="ai-agent" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isAIAgentActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getAIAgentLabel()}</span>
                    {isAIAgentActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAIAgent();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear AI agent filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <select
                      value={filters.aiAgent}
                      onChange={(e) => setFilters({ ...filters, aiAgent: e.target.value })}
                      className="w-full px-3 py-2 pr-8 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    >
                      <option>All agents</option>
                      <option>Agent 1</option>
                      <option>Agent 2</option>
                      <option>Agent 3</option>
                    </select>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="channels" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isChannelsActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getChannelsLabel()}</span>
                    {isChannelsActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearChannels();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear channels filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-2">
                    {Object.entries(filters.channels).map(([channel, checked]) => (
                      <label key={channel} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={checked}
                          onCheckedChange={() => handleChannelToggle(channel as keyof typeof filters.channels)}
                          className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-[12px] text-[#535353] capitalize">{channel}</span>
                      </label>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="conversation-type" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isConversationTypeActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getConversationTypeLabel()}</span>
                    {isConversationTypeActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearConversationType();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear conversation type filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-2">
                    {Object.entries(filters.conversationType).map(([type, checked]) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={checked}
                          onCheckedChange={() => handleConversationTypeToggle(type as keyof typeof filters.conversationType)}
                          className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-[12px] text-[#535353] capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="duration" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isDurationActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getDurationLabelText()}</span>
                    {isDurationActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDuration();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear duration filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <Slider.Root
                      value={filters.durationRange}
                      onValueChange={(value) => setFilters({ ...filters, durationRange: value })}
                      min={0}
                      max={90}
                      step={1}
                      className="relative flex h-2 w-full touch-none select-none items-center"
                    >
                      <Slider.Track className="relative h-2 w-full rounded-full bg-gray-200">
                        <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
                      </Slider.Track>
                      <Slider.Thumb className="block h-5 w-5 rounded-full bg-white border-2 border-blue-500 shadow focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] focus:ring-offset-2 cursor-grab active:cursor-grabbing" />
                      <Slider.Thumb className="block h-5 w-5 rounded-full bg-white border-2 border-blue-500 shadow focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] focus:ring-offset-2 cursor-grab active:cursor-grabbing" />
                    </Slider.Root>
                    <div className="mt-3 flex justify-between text-[11px] text-gray-600 font-['SF_Pro:Medium',sans-serif]">
                      <span>{getDurationLabel(filters.durationRange[0])}</span>
                      <span>{getDurationLabel(filters.durationRange[1])}</span>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="keyword" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isKeywordActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getKeywordLabel()}</span>
                    {isKeywordActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearKeyword();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear keyword filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <input
                      type="text"
                      value={filters.keyword}
                      onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                      placeholder="Search by keyword..."
                      className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="status" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isStatusActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getStatusLabel()}</span>
                    {isStatusActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearStatus();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear status filter"
                        role="button"
                      >
                        <X className="size-4" />
                      </div>
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3 space-y-2">
                    {Object.entries(filters.status).map(([status, checked]) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={checked}
                          onCheckedChange={() => handleStatusToggle(status as keyof typeof filters.status)}
                          className="size-4 border border-[rgba(28,28,28,0.3)] rounded flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-[12px] text-[#535353] capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="tags">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors group">
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">Tags</span>
                    <ChevronDown className="size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pb-3">
                    <input
                      type="text"
                      placeholder="Add tags..."
                      className="w-full px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          <div className="flex gap-2 p-4 pt-3 border-t border-gray-200 shrink-0">
            <button
              onClick={() => {
                const clearedFilters = {
                  target: { offices: [] as string[], groups: [] as string[] },
                  dateRange: "Past 30 days",
                  aiAgent: "All agents",
                  channels: { email: true, chat: true, phone: true, social: true },
                  conversationType: { inbound: true, outbound: true },
                  durationRange: [0, 90],
                  keyword: "",
                  status: { open: true, pending: true, closed: true },
                  tags: [],
                };
                setFilters(clearedFilters);
                setAppliedFilters(clearedFilters);
              }}
              className="flex-1 px-3 py-2 text-[12px] border border-[rgba(28,28,28,0.2)] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear all
            </button>
            <Popover.Close asChild>
              <button 
                onClick={() => setAppliedFilters({ ...filters })}
                className="flex-1 px-3 py-2 text-[12px] text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#7C52FF' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6941E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7C52FF'}
              >
                Apply filters
              </button>
            </Popover.Close>
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Frame4WithBadge() {
  const [filterCount, setFilterCount] = useState(0);

  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <MenuWithBadge onFiltersChange={setFilterCount} />
    </div>
  );
}

function Frame4WithDot() {
  const [filterCount, setFilterCount] = useState(0);

  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <MenuWithDot onFiltersChange={setFilterCount} />
    </div>
  );
}

function CardActionsWithBadge() {
  return (
    <div className="bg-white content-stretch flex gap-[2px] items-center justify-end mr-[-75px] pl-[8px] pr-[9px] relative shrink-0" data-name="_card actions">
      <Frame4WithBadge />
      <Menu1 />
    </div>
  );
}

function CardActionsWithDot() {
  return (
    <div className="bg-white content-stretch flex gap-[2px] items-center justify-end mr-[-75px] pl-[8px] pr-[9px] relative shrink-0" data-name="_card actions">
      <Frame4WithDot />
      <Menu1 />
    </div>
  );
}

function CardActions() {
  return (
    <div className="bg-white content-stretch flex gap-[2px] items-center justify-end mr-[-75px] pl-[8px] pr-[9px] relative shrink-0" data-name="_card actions">
      <Frame4 />
      <Menu1 />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex items-center pr-[75px] relative shrink-0 w-full" data-name="Top">
      <Title />
      <CardActions />
    </div>
  );
}

function TopWithBadge() {
  return (
    <div className="content-stretch flex items-center pr-[75px] relative shrink-0 w-full" data-name="Top">
      <Title />
      <CardActionsWithBadge />
    </div>
  );
}

function TopWithDot() {
  return (
    <div className="content-stretch flex items-center pr-[75px] relative shrink-0 w-full" data-name="Top">
      <Title />
      <CardActionsWithDot />
    </div>
  );
}

// Context para compartir estado de filtros
const FilterContext = React.createContext<{
  activeFilters: FilterType[];
  setActiveFilters: (filters: FilterType[]) => void;
  filters: any;
  setFilters: (filters: any) => void;
} | null>(null);

function Container() {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [filters, setFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
    dateRange: "Past 30 days",
    aiAgent: "All agents",
    channels: {
      email: true,
      chat: true,
      phone: true,
      social: true,
    },
    conversationType: {
      inbound: true,
      outbound: true,
    },
    durationRange: [0, 90] as [number, number],
    keyword: "",
    status: {
      open: true,
      pending: true,
      closed: true,
    },
  });

  const removeFilter = (filterType: FilterType) => {
    setActiveFilters(activeFilters.filter(f => f !== filterType));
  };

  return (
    <FilterContext.Provider value={{ activeFilters, setActiveFilters, filters, setFilters }}>
      <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full gap-2" data-name="Container">
        <Top />
        {/* Filter chips row - solo se muestra si hay filtros activos */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 px-[16px] pb-[0px] py-[0px] pt-[0px] pr-[16px] pl-[0px]">
            {activeFilters.map(filterType => (
              <FilterChip
                key={filterType}
                type={filterType}
                onRemove={() => removeFilter(filterType)}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
          </div>
        )}
      </div>
    </FilterContext.Provider>
  );
}

function ContainerWithBadge() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <TopWithBadge />
    </div>
  );
}

function ContainerWithDot() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <TopWithDot />
    </div>
  );
}

function Headers() {
  return (
    <div className="min-h-[44px] relative shrink-0 w-full" data-name="Headers">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start min-h-[inherit] pb-[8px] pl-[16px] pt-[6px] relative w-full pr-[0px]">
          <Grip />
          <Container />
        </div>
      </div>
    </div>
  );
}

function HeadersWithBadge() {
  return (
    <div className="min-h-[44px] relative shrink-0 w-full" data-name="Headers">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start min-h-[inherit] pb-[8px] pl-[16px] pt-[6px] relative w-full pr-[0px]">
          <Grip />
          <ContainerWithBadge />
        </div>
      </div>
    </div>
  );
}

function HeadersWithDot() {
  return (
    <div className="min-h-[44px] relative shrink-0 w-full" data-name="Headers">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start min-h-[inherit] pb-[8px] pl-[16px] pt-[6px] relative w-full pr-[0px]">
          <Grip />
          <ContainerWithDot />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal h-full items-start justify-between leading-[1.4] relative shrink-0 text-[12px] text-[rgba(34,34,34,0.5)] text-right">
      <p className="relative shrink-0">100</p>
      <p className="relative shrink-0">75</p>
      <p className="relative shrink-0">50</p>
      <p className="relative shrink-0">25</p>
      <p className="relative shrink-0">0</p>
    </div>
  );
}

function LinesGraph3LinesOp() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px pb-[16px] pt-[20px] relative w-full" data-name="Lines (Graph)/3 lines op 2">
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full">
        <div className="-scale-y-100 flex-none size-full">
          <div className="relative size-full">
            <div className="absolute inset-[-5.14%_-0.01%_-5.1%_-0.03%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.217 16.2204">
                <path d={svgPaths.p8c69400} id="Vector 13" stroke="var(--stroke-0, #9071FC)" strokeDasharray="5 5" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="absolute inset-[-5.11%_-0.01%_-5.09%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.088 16.2148">
            <path d={svgPaths.p184cb840} id="Vector 23" stroke="var(--stroke-0, #FC5EA0)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="absolute inset-[-4.6%_-0.01%_-5.13%_-0.06%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.372 16.1454">
            <path d={svgPaths.p213f6400} id="Vector 15" stroke="var(--stroke-0, #FB79F3)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="absolute inset-[-5.11%_-0.01%_-5.09%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.088 16.2148">
            <path d={svgPaths.p184cb840} id="Vector 22" stroke="var(--stroke-0, #4AA9EA)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="absolute inset-[-5.28%_-0.01%_-5.1%_-0.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.315 16.2411">
            <path d={svgPaths.p333a2880} id="Vector 12" stroke="var(--stroke-0, #52C926)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="h-[22px] relative shrink-0 w-full">
        <div className="absolute inset-[-3.53%_-0.04%_-3.27%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.285 23.4977">
            <path d={svgPaths.p225e4c80} id="Vector 14" stroke="var(--stroke-0, #FF9E0E)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="absolute inset-[-5.11%_-0.01%_-5.09%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.088 16.2148">
            <path d={svgPaths.p184cb840} id="Vector 22" stroke="var(--stroke-0, #4AA9EA)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="absolute inset-[-5.11%_-0.01%_-5.09%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 565.088 16.2148">
            <path d={svgPaths.p184cb840} id="Vector 16" stroke="var(--stroke-0, #FC5EA0)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function YAxis() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Y Axis">
      <LinesGraph3LinesOp />
    </div>
  );
}

function Chart1() {
  return (
    <div className="bg-size-[559px_149px] bg-top-left flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Chart" style={{ background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' }}>
      <div className="content-stretch flex flex-col items-end overflow-clip relative rounded-[inherit] size-full">
        <YAxis />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(28,28,28,0.17)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-end min-h-px min-w-px relative w-full">
      <Frame />
      <Chart1 />
    </div>
  );
}

function XAxis() {
  return (
    <div className="h-[17px] relative shrink-0 w-full" data-name="X Axis">
      <div className="content-stretch flex font-['SF_Pro:Regular',sans-serif] font-normal items-start justify-between leading-[1.4] pl-[42px] relative size-full text-[12px] text-[rgba(34,34,34,0.5)]">
        <p className="relative shrink-0">Mar 19</p>
        <p className="relative shrink-0">26</p>
        <p className="relative shrink-0">Apr 2</p>
        <p className="relative shrink-0">9</p>
        <p className="relative shrink-0">16</p>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-end min-h-px min-w-px relative w-full" data-name="Chart">
      <Frame1 />
      <XAxis />
    </div>
  );
}

function Indicator() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center min-w-[21.25px] relative shrink-0 w-[21.25px]" data-name="Indicator">
      <div className="bg-[#9071fc] flex-[1_0_0] h-[2.75px] min-h-px min-w-px" data-name="Shape" />
      <div className="bg-[#9071fc] flex-[1_0_0] h-[2.75px] min-h-px min-w-px" data-name="Shape" />
      <div className="bg-[#9071fc] flex-[1_0_0] h-[2.75px] min-h-px min-w-px" data-name="Shape" />
    </div>
  );
}

function Category() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[6px] items-center px-[6px] py-[2px] relative rounded-[8px] shrink-0" data-name="Category">
      <Indicator />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Total</p>
      </div>
    </div>
  );
}

function Indicator1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-w-[21.25px] relative rounded-[1px] shrink-0 w-[21.25px]" data-name="Indicator">
      <div className="bg-[#fc5ea0] h-[2.75px] rounded-[1px] shrink-0 w-full" data-name="Shape" />
    </div>
  );
}

function Category1() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[6px] items-center px-[6px] py-[2px] relative rounded-[8px] shrink-0" data-name="Category">
      <Indicator1 />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Answered</p>
      </div>
    </div>
  );
}

function Indicator2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-w-[21.25px] relative rounded-[1px] shrink-0 w-[21.25px]" data-name="Indicator">
      <div className="bg-[#4aa9ea] h-[2.75px] rounded-[1px] shrink-0 w-full" data-name="Shape" />
    </div>
  );
}

function Category2() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[6px] items-center px-[6px] py-[2px] relative rounded-[8px] shrink-0" data-name="Category">
      <Indicator2 />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Missed</p>
      </div>
    </div>
  );
}

function Indicator3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-w-[21.25px] relative rounded-[1px] shrink-0 w-[21.25px]" data-name="Indicator">
      <div className="bg-[#ff9e0e] h-[2.75px] rounded-[1px] shrink-0 w-full" data-name="Shape" />
    </div>
  );
}

function Category3() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[6px] items-center px-[6px] py-[2px] relative rounded-[8px] shrink-0" data-name="Category">
      <Indicator3 />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Abandoned</p>
      </div>
    </div>
  );
}

function Indicator4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-w-[21.25px] relative rounded-[1px] shrink-0 w-[21.25px]" data-name="Indicator">
      <div className="bg-[#52c926] h-[2.75px] rounded-[1px] shrink-0 w-full" data-name="Shape" />
    </div>
  );
}

function Category4() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[6px] items-center px-[6px] py-[2px] relative rounded-[8px] shrink-0" data-name="Category">
      <Indicator4 />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Unanswered transferred call</p>
      </div>
    </div>
  );
}

function Indicator5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-w-[21.25px] relative rounded-[1px] shrink-0 w-[21.25px]" data-name="Indicator">
      <div className="bg-[#fb79f3] h-[2.75px] rounded-[1px] shrink-0 w-full" data-name="Shape" />
    </div>
  );
}

function Category5() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[6px] items-center px-[6px] py-[2px] relative rounded-[8px] shrink-0" data-name="Category">
      <Indicator5 />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Outbound</p>
      </div>
    </div>
  );
}

function Indicator6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-w-[21.25px] relative rounded-[1px] shrink-0 w-[21.25px]" data-name="Indicator">
      <div className="bg-[#f66437] h-[2.75px] rounded-[1px] shrink-0 w-full" data-name="Shape" />
    </div>
  );
}

function Category6() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[6px] items-center px-[6px] py-[2px] relative rounded-[8px] shrink-0" data-name="Category">
      <Indicator6 />
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#535353] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Other</p>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="content-center flex flex-wrap gap-[4px] items-center overflow-x-auto overflow-y-clip pt-[8px] relative shrink-0 w-full" data-name="Legend">
      <Category />
      <Category1 />
      <Category2 />
      <Category3 />
      <Category4 />
      <Category5 />
      <Category6 />
    </div>
  );
}

function ChartContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px relative w-full" data-name="Chart Container">
      <Chart />
      <Legend />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] px-[16px] relative size-full">
        <ChartContainer />
      </div>
    </div>
  );
}

function Line() {
  return (
    <div className="bg-white h-[320px] max-h-[400px] min-h-[320px] min-w-[376px] relative rounded-[16px] shrink-0 w-full" data-name="Line">
      <div className="content-stretch flex flex-col items-start max-h-[inherit] min-h-[inherit] min-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <Headers />
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.3)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function LineWithBadge() {
  return (
    <div className="bg-white h-[320px] max-h-[400px] min-h-[320px] min-w-[376px] relative rounded-[16px] shrink-0 w-full" data-name="Line">
      <div className="content-stretch flex flex-col items-start max-h-[inherit] min-h-[inherit] min-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <HeadersWithBadge />
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.3)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function LineWithDot() {
  return (
    <div className="bg-white min-h-[320px] h-full min-w-[376px] relative rounded-[8px] w-full" data-name="Line">
      <div className="content-stretch flex flex-col items-start max-h-[inherit] min-h-[inherit] min-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <HeadersWithDot />
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ConversationVolumeOverTime() {
  return (
    <div className="flex flex-col items-start min-w-[376px]" data-name="Conversation volume over time">
      <Line />
    </div>
  );
}

function ConversationVolumeOverTimeWithBadge() {
  return (
    <div className="flex flex-col items-start min-w-[376px]" data-name="Conversation volume over time">
      <LineWithBadge />
    </div>
  );
}

function ConversationVolumeOverTimeWithDot({ metricsData, onMaximize, onRemove, onDuplicate, isDraggable = false }: { metricsData: ReturnType<typeof calculateMetrics>; onMaximize?: () => void; onRemove?: () => void; onDuplicate?: () => void; isDraggable?: boolean }) {
  // Transform metrics data into series format for LineChart
  const series = [
    {
      name: 'Total',
      color: '#9B87F5',
      strokeDasharray: '4,4',
      data: metricsData.conversationVolume.map(d => ({
        date: d.date,
        value: d.total,
      })),
    },
    {
      name: 'Answered',
      color: '#E879F9',
      data: metricsData.conversationVolume.map(d => ({
        date: d.date,
        value: d.answered,
      })),
    },
    {
      name: 'Missed',
      color: '#60A5FA',
      data: metricsData.conversationVolume.map(d => ({
        date: d.date,
        value: d.missed,
      })),
    },
    {
      name: 'Abandoned',
      color: '#FB923C',
      data: metricsData.conversationVolume.map(d => ({
        date: d.date,
        value: d.abandoned,
      })),
    },
    {
      name: 'Unanswered transferred call',
      color: '#4ADE80',
      data: metricsData.conversationVolume.map(d => ({
        date: d.date,
        value: d.transferred,
      })),
    },
    {
      name: 'Outbound',
      color: '#F0ABFC',
      data: metricsData.conversationVolume.map(d => ({
        date: d.date,
        value: d.outbound,
      })),
    },
    {
      name: 'Other',
      color: '#F97316',
      data: metricsData.conversationVolume.map(d => ({
        date: d.date,
        value: d.other,
      })),
    },
  ];

  return (
    <Widget
      title="Conversation volume over time"
      widgetId="conversation-volume"
      minHeight={260}
      minColumns={2}
      showFilterButton={true}
      showMenuButton={true}
      showInfoIcon={true}
      tooltipText="Total conversation volume trends over the selected time period"
      scope="Both"
      onMaximize={onMaximize}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
      isDraggable={isDraggable}
    >
      <div className="flex-1 w-full h-full min-h-0">
        <LineChart 
          series={series}
          totalValue={metricsData.totalConversations}
          percentageChange="+2%"
        />
      </div>
    </Widget>
  );
}

// Generate mock trend data for stat widgets
function generateTrendData(baseValue: number, days: number = 30, volatility: number = 0.1) {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate random walk with some trend
    const randomChange = (Math.random() - 0.5) * 2 * volatility * baseValue;
    const trendChange = (i / days) * 0.1 * baseValue; // Slight upward trend
    const value = Math.max(0, baseValue + randomChange + trendChange);
    
    data.push({ date, value });
  }
  
  return data;
}

export default function Frame2() {
  const { filters, currentViewId } = useGlobalFilters();
  const [metrics, setMetrics] = useState<DashboardMetrics>(() => {
    // Initialize with default metrics
    return {
      avgAnswerTime: '3m',
      avgAnswerTimeChange: '+2%',
      avgHandleTime: '5m',
      avgHandleTimeChange: '+2%',
      avgFirstResponseTime: '2m',
      avgFirstResponseTimeChange: '+2%',
      transferRate: '50%',
      transferRateChange: '+2%',
      deflectionRate: '43%',
      deflectionRateChange: '+2%',
      conversationVolume: [],
      totalConversations: '6,900',
    };
  });

  // Estado para manejar widgets maximizados
  const [maximizedWidget, setMaximizedWidget] = useState<string | null>(null);
  
  // Estado para widgets agregados dinámicamente
  const [addedWidgets, setAddedWidgets] = useState<Array<{ id: string; type: string }>>([]);
  const addedWidgetsRef = React.useRef<HTMLDivElement>(null);
  
  // Estado para secciones dinámicas insertadas (para duplicados)
  // Cada entrada tiene: afterSection (1, 2, 3) y widgets array
  const [insertedSections, setInsertedSections] = useState<Array<{
    id: string;
    afterSection: number;
    widgets: Array<{ id: string; type: string }>;
  }>>([]);
  
  // Estado para widgets removidos (ocultos)
  const [removedWidgets, setRemovedWidgets] = useState<Set<string>>(new Set());

  // Hook para manejar el orden de widgets con persistencia
  const { widgetOrder, setWidgetOrder, updateSectionOrder, resetOrder, getCurrentOrder, moveWidgetBetweenSections, getWidgetSection, createSection } = useWidgetOrder(currentViewId);

  // Hook para detectar breakpoint y MAX_FR_UNITS
  const { maxFrUnits } = useBreakpoint();

  // Estado para el indicador de drop (línea azul/roja) - ahora usa sectionId
  const [dropIndicator, setDropIndicator] = useState<{
    sectionId: string;
    index: number;
    isValid: boolean;
  } | null>(null);

  // Estado para el indicador de section boundary (horizontal)
  const [sectionBoundaryIndicator, setSectionBoundaryIndicator] = useState<{
    position: number;
    isValid: boolean;
  } | null>(null);

  // Estado para el widget que se está arrastrando (para DragOverlay)
  const [activeId, setActiveId] = useState<string | null>(null);

  // Estado para detectar si se está arrastrando desde la biblioteca
  const [draggingFromLibrary, setDraggingFromLibrary] = useState(false);

  // Dynamic refs for section containers (to observe width for responsive spans)
  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

  // Ensure refs exist for all sections
  widgetOrder.sections.forEach(section => {
    if (!sectionRefs.current[section.id]) {
      sectionRefs.current[section.id] = React.createRef<HTMLDivElement>();
    }
  });

  // Debug: Log widget order state
  useEffect(() => {
    console.log('📦 Full Widget Order State:', {
      sections: widgetOrder.sections,
      maxFrUnits
    });
  }, [widgetOrder, maxFrUnits]);

  // Get FR units for a specific widget - use centralized weight configuration
  // Helper function to extract base widget ID from unique ID
  const getBaseWidgetId = (widgetId: string): string => {
    // Extract base widget ID from unique ID (e.g., 'avg-answer-time__1234567890' → 'avg-answer-time')
    return widgetId.split('__')[0];
  };

  const getWidgetFrUnits = useCallback((widgetId: string): number => {
    const baseWidgetId = getBaseWidgetId(widgetId);
    return getWidgetWeight(baseWidgetId);
  }, []);

  // Calculate used FR units in a section (excluding the widget being dragged)
  const calculateUsedUnits = useCallback((sectionId: string, excludeWidgetId?: string): number => {
    const section = widgetOrder.sections.find(s => s.id === sectionId);
    if (!section) return 0;

    const activeWidgets = section.widgetIds.filter(id => !removedWidgets.has(id));
    const filteredWidgets = excludeWidgetId ? activeWidgets.filter(id => id !== excludeWidgetId) : activeWidgets;
    const total = filteredWidgets.reduce((total, widgetId) => total + getWidgetFrUnits(widgetId), 0);

    console.log('🧮 calculateUsedUnits:', {
      sectionId,
      excludeWidgetId,
      widgetIds: section.widgetIds,
      activeWidgets,
      filteredWidgets,
      total
    });

    return total;
  }, [widgetOrder, removedWidgets, getWidgetFrUnits]);

  // Check if a widget can be dropped in a section
  const canDropInSection = useCallback((widgetId: string, targetSectionId: string, sourceSectionId?: string): boolean => {
    const widgetUnits = getWidgetFrUnits(widgetId);

    // If moving within the same section, it's always valid (just reordering)
    if (sourceSectionId === targetSectionId) {
      return true;
    }

    // Calculate available space in target section (don't exclude the widget since it's not there yet)
    const usedUnits = calculateUsedUnits(targetSectionId);
    const availableUnits = maxFrUnits - usedUnits;

    console.log('🔍 Validation:', {
      widget: widgetId,
      widgetUnits,
      targetSectionId,
      sourceSectionId,
      usedUnits,
      availableUnits,
      maxFrUnits,
      canFit: widgetUnits <= availableUnits
    });

    return widgetUnits <= availableUnits;
  }, [getWidgetFrUnits, calculateUsedUnits, maxFrUnits]);

  // Sensors para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requires dragging 8px before activating
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Helper to check if drop indicator should show at this position
  const shouldShowIndicator = useCallback((sectionId: string, index: number) => {
    return dropIndicator?.sectionId === sectionId && dropIndicator?.index === index;
  }, [dropIndicator]);

  // Handler for drag start - track active widget
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;

    // Check if dragging from library
    if (active.data.current?.type === 'library-item') {
      setActiveId(`library-${active.data.current.widgetId}`);
      setDraggingFromLibrary(true);
    } else {
      setActiveId(event.active.id as string);
      setDraggingFromLibrary(false);
    }
  }, []);

  // Handler for drag over - show drop indicator without moving widgets
  const handleGlobalDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setDropIndicator(null);
      setSectionBoundaryIndicator(null);
      return;
    }

    // Extract actual widget ID for library items
    const activeId = active.data.current?.type === 'library-item'
      ? active.data.current.widgetId
      : (active.id as string);

    const overId = over.id as string;

    console.log('🔄 DragOver:', { activeId, overId, isLibraryItem: active.data.current?.type === 'library-item' });

    // Check if over section boundary
    if (typeof overId === 'string' && overId.startsWith('section-boundary-')) {
      const boundaryPosition = parseInt(overId.split('-')[2]);
      const widgetUnits = getWidgetFrUnits(activeId);
      const isValid = widgetUnits <= maxFrUnits;

      console.log('🎯 Over section boundary:', { boundaryPosition, widgetUnits, maxFrUnits, isValid });

      setSectionBoundaryIndicator({ position: boundaryPosition, isValid });
      setDropIndicator(null);
      return;
    }

    // Clear section boundary indicator if over widget
    setSectionBoundaryIndicator(null);

    // Find which section the active widget belongs to (null for library items)
    const activeSection = active.data.current?.type === 'library-item'
      ? null
      : getWidgetSection(activeId);

    // Find which section the over widget belongs to
    const overSection = getWidgetSection(overId);
    if (!overSection) {
      console.warn('❌ Over section not found for:', overId);
      return;
    }

    console.log('📍 Sections:', { activeSectionId: activeSection?.id, overSectionId: overSection.id });

    // Calculate where to show the drop indicator
    const overIndex = overSection.widgetIds.indexOf(overId);

    // Validate if the widget can be dropped here
    const isValid = canDropInSection(activeId, overSection.id, activeSection?.id);

    console.log('✨ Setting drop indicator:', {
      sectionId: overSection.id,
      index: overIndex + 1,
      isValid,
      activeUnits: getWidgetFrUnits(activeId),
      usedUnits: calculateUsedUnits(overSection.id),
      maxUnits: maxFrUnits
    });

    // Show indicator at the position after the over widget
    setDropIndicator({
      sectionId: overSection.id,
      index: overIndex + 1,
      isValid,
    });
  }, [getWidgetSection, widgetOrder, maxFrUnits, canDropInSection, getWidgetFrUnits, calculateUsedUnits]);

  // Function to create a new section at a boundary
  const createSectionAtBoundary = useCallback((
    widgetId: string,
    sourceSectionId: string,
    boundaryPosition: number
  ) => {
    console.log('🆕 Creating section at boundary:', { widgetId, sourceSectionId, boundaryPosition });

    setWidgetOrder(prev => {
      let sections = [...prev.sections];

      // Remove widget from source section
      sections = sections.map(section =>
        section.id === sourceSectionId
          ? { ...section, widgetIds: section.widgetIds.filter(id => id !== widgetId) }
          : section
      );

      // Clean up empty source section (keep minimum 1)
      if (sections.length > 1) {
        sections = sections.filter(s => s.widgetIds.length > 0);
      }

      // Create new section
      const newSection: Section = {
        id: `section-${Date.now()}`,
        widgetIds: [widgetId],
        order: boundaryPosition,
      };

      // Insert at boundary position
      sections.splice(boundaryPosition, 0, newSection);

      // Update order values
      sections.forEach((section, index) => {
        section.order = index;
      });

      return { sections };
    });
  }, [setWidgetOrder]);

  // Global drag end handler - handles both intra and inter-section dragging
  // Handler for dropping library widgets
  const handleLibraryWidgetDrop = useCallback((active: any, over: any) => {
    const libraryWidgetId = active.data.current?.widgetId;
    const overId = over.id as string;

    // Map AVAILABLE_WIDGETS IDs to implemented widget IDs
    const WIDGET_ID_MAP: Record<string, string> = {
      'avg-first-response': 'avg-first-response-time',
      'conversation-volume-time': 'conversation-volume',
      'conversation-breakdown': 'sankey',
      'weekly-average': 'heatmap',
    };

    // Get the actual widget ID used in the implementation
    const baseWidgetId = WIDGET_ID_MAP[libraryWidgetId] || libraryWidgetId;

    // Generate unique widget ID with timestamp
    const uniqueWidgetId = `${baseWidgetId}__${Date.now()}`;

    console.log('📚 Library widget drop:', { libraryWidgetId, baseWidgetId, uniqueWidgetId, overId });

    // Handle section boundary drop
    if (typeof overId === 'string' && overId.startsWith('section-boundary-')) {
      const boundaryPosition = parseInt(overId.split('-')[2]);
      const widgetUnits = getWidgetFrUnits(baseWidgetId);

      if (widgetUnits <= maxFrUnits) {
        console.log('✅ Creating new section at boundary', boundaryPosition);
        // Create new section with library widget
        setWidgetOrder(prev => {
          let sections = [...prev.sections];

          // Create new section
          const newSection = {
            id: `section-${Date.now()}`,
            widgetIds: [uniqueWidgetId],
            order: boundaryPosition,
          };

          // Insert at boundary position
          sections.splice(boundaryPosition, 0, newSection);

          // Update order values
          sections.forEach((section, index) => {
            section.order = index;
          });

          return { sections };
        });
      } else {
        console.warn('❌ Widget too large for new section');
      }
      return;
    }

    // Handle drop on section widget
    const overSection = getWidgetSection(overId);
    if (!overSection) {
      console.warn('❌ Over section not found');
      return;
    }

    const overIndex = overSection.widgetIds.indexOf(overId);
    const isValid = canDropInSection(baseWidgetId, overSection.id, undefined);

    if (isValid) {
      console.log('✅ Adding widget to section', overSection.id, 'at index', overIndex + 1);
      // Add widget to section with unique ID
      setWidgetOrder(prev => {
        const sections = prev.sections.map(section => {
          if (section.id === overSection.id) {
            const newWidgetIds = [...section.widgetIds];
            newWidgetIds.splice(overIndex + 1, 0, uniqueWidgetId);
            return { ...section, widgetIds: newWidgetIds };
          }
          return section;
        });
        return { sections };
      });
    } else {
      console.warn('❌ Drop not allowed - exceeds FR unit limit');
    }
  }, [getWidgetFrUnits, maxFrUnits, getWidgetSection, canDropInSection, setWidgetOrder]);

  const handleGlobalDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    console.log('🏁 DragEnd:', {
      activeId: active.id,
      overId: over?.id,
      'active.data': active.data,
      'active.data.current': active.data.current,
      typeCurrent: active.data.current?.type,
      typeDirect: (active.data as any)?.type
    });

    // Clear drop indicators and active widget
    setDropIndicator(null);
    setSectionBoundaryIndicator(null);
    setActiveId(null);
    setDraggingFromLibrary(false);

    if (!over) {
      console.log('❌ No over target');
      return;
    }

    // Check if dragging from library by checking if id starts with 'library-'
    const isLibraryItem = typeof active.id === 'string' && active.id.startsWith('library-');
    console.log('🔍 Checking library item:', { activeId: active.id, isLibraryItem });

    if (isLibraryItem) {
      console.log('✅ Is library item, calling handleLibraryWidgetDrop');
      handleLibraryWidgetDrop(active, over);
      return;
    }
    console.log('❌ Not a library item, continuing with normal widget logic');

    const activeId = active.id as string;
    const overId = over.id as string;

    // Handle section boundary drop (create new section)
    if (typeof overId === 'string' && overId.startsWith('section-boundary-')) {
      const boundaryPosition = parseInt(overId.split('-')[2]);
      const activeSection = getWidgetSection(activeId);

      if (!activeSection) {
        console.warn('❌ Active section not found');
        return;
      }

      // Validate: widget fits in new section
      const widgetUnits = getWidgetFrUnits(activeId);
      if (widgetUnits > maxFrUnits) {
        console.warn('❌ Widget too large for new section');
        return;
      }

      // Create new section at boundary
      createSectionAtBoundary(activeId, activeSection.id, boundaryPosition);
      return;
    }

    // Find which section the active widget belongs to
    const activeSection = getWidgetSection(activeId);
    if (!activeSection) {
      console.warn('❌ Active section not found');
      return;
    }

    // Same widget - no change
    if (active.id === over.id) {
      console.log('ℹ️ Same widget, no change');
      return;
    }

    // Find which section the over widget belongs to
    const overSection = getWidgetSection(overId);
    if (!overSection) {
      console.warn('❌ Over section not found');
      return;
    }

    console.log('✅ Moving from', activeSection.id, 'to', overSection.id);
    console.log('🔍 About to validate:', {
      activeId,
      overSectionId: overSection.id,
      activeSectionId: activeSection.id,
      isSameSection: activeSection.id === overSection.id
    });

    // Validate if the drop is allowed
    const isValidDrop = canDropInSection(activeId, overSection.id, activeSection.id);
    console.log('📋 Validation result:', isValidDrop);

    if (!isValidDrop) {
      console.warn('❌ Drop not allowed - exceeds FR unit limit');
      return;
    }

    // Same section - just reorder
    if (activeSection.id === overSection.id) {
      const oldIndex = activeSection.widgetIds.indexOf(activeId);
      const newIndex = activeSection.widgetIds.indexOf(overId);
      const newOrder = arrayMove(activeSection.widgetIds, oldIndex, newIndex);

      updateSectionOrder(activeSection.id, newOrder);
    } else {
      // Cross-section move
      const overIndex = overSection.widgetIds.indexOf(overId);

      // Move widget to new section
      moveWidgetBetweenSections(activeId, activeSection.id, overSection.id, overIndex + 1);
    }
  }, [getWidgetSection, widgetOrder, updateSectionOrder, moveWidgetBetweenSections, maxFrUnits, canDropInSection, getWidgetFrUnits, createSectionAtBoundary, setWidgetOrder, handleLibraryWidgetDrop]);

  // Recalculate metrics when filters change
  useEffect(() => {
    const loadMetrics = async () => {
      const newMetrics = await calculateMetricsWithFilters(filters);
      setMetrics(newMetrics);
    };
    loadMetrics();
  }, [filters]);
  
  // Función para agregar un widget
  const handleAddWidget = (widgetId: string, widgetType: string) => {
    setAddedWidgets(prev => [...prev, { id: widgetId, type: widgetType }]);
    
    // Scroll al widget después de que se renderice
    setTimeout(() => {
      addedWidgetsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  // Función para remover un widget agregado dinámicamente
  const handleRemoveWidget = (index: number) => {
    setAddedWidgets(prev => prev.filter((_, i) => i !== index));
  };
  
  // Función para remover/ocultar un widget principal
  const handleRemoveMainWidget = (widgetId: string) => {
    setRemovedWidgets(prev => new Set([...prev, widgetId]));
  };
  
  // Función para duplicar un widget
  const handleDuplicateWidget = (widgetId: string) => {
    // Identificar en qué sección está el widget original
    let sectionNumber = 1; // Por defecto sección 1
    
    // Mapeo de widgets a secciones
    const section1Widgets = ['avg-answer-time', 'avg-handle-time', 'avg-first-response-time'];
    const section2Widgets = ['transfer-rate', 'deflection-rate', 'conversation-volume'];
    const section3Widgets = ['heatmap', 'sankey'];
    
    if (section2Widgets.includes(widgetId)) {
      sectionNumber = 2;
    } else if (section3Widgets.includes(widgetId)) {
      sectionNumber = 3;
    }
    
    // Crear una nueva sección con el widget duplicado
    const newSection = {
      id: `section-${Date.now()}`,
      afterSection: sectionNumber,
      widgets: [{ id: widgetId, type: 'duplicated' }]
    };
    
    setInsertedSections(prev => [...prev, newSection]);
    
    // Scroll a la nueva sección después de que se renderice
    setTimeout(() => {
      const element = document.getElementById(newSection.id);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };
  
  // Función para renderizar un widget agregado dinámicamente
  const renderAddedWidget = (widget: { id: string; type: string }, index: number) => {
    switch (widget.id) {
      case 'avg-answer-time':
        return (
          <StatWidget
            key={widget.id}
            title="Avg. answer time"
            value={metrics.avgAnswerTime}
            impact={{ percentage: metrics.avgAnswerTimeChange, direction: metrics.avgAnswerTimeChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Average time taken to answer incoming conversations"
            scope="Both"
            onMaximize={() => setMaximizedWidget(widget.id)}
            onRemove={() => handleRemoveWidget(index)}
            onDuplicate={() => handleDuplicateWidget('avg-answer-time')}
          />
        );
      case 'avg-handle-time':
        return (
          <StatWidget
            key={widget.id}
            title="Avg. handle time"
            value={metrics.avgHandleTime}
            impact={{ percentage: metrics.avgHandleTimeChange, direction: metrics.avgHandleTimeChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Average time spent handling each conversation from start to resolution"
            scope="Both"
            onMaximize={() => setMaximizedWidget(widget.id)}
            onRemove={() => handleRemoveWidget(index)}
            onDuplicate={() => handleDuplicateWidget('avg-handle-time')}
          />
        );
      case 'avg-first-response':
        return (
          <StatWidget
            key={widget.id}
            title="Avg. first response time"
            value={metrics.avgFirstResponseTime}
            impact={{ percentage: metrics.avgFirstResponseTimeChange, direction: metrics.avgFirstResponseTimeChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Average time until the first response is sent to a customer"
            scope="Digital"
            onMaximize={() => setMaximizedWidget(widget.id)}
            onRemove={() => handleRemoveWidget(index)}
            onDuplicate={() => handleDuplicateWidget('avg-first-response-time')}
          />
        );
      case 'deflection-rate':
        return (
          <StatWidget
            key={widget.id}
            title="Deflection rate"
            value={metrics.deflectionRate}
            impact={{ percentage: metrics.deflectionRateChange, direction: metrics.deflectionRateChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Percentage of conversations resolved without agent intervention"
            scope="Both"
            onMaximize={() => setMaximizedWidget(widget.id)}
            onRemove={() => handleRemoveWidget(index)}
            onDuplicate={() => handleDuplicateWidget('deflection-rate')}
          />
        );
      case 'conversation-volume-time':
        return (
          <ConversationVolumeOverTimeWithDot 
            key={widget.id}
            metricsData={metrics} 
            onMaximize={() => setMaximizedWidget(widget.id)}
            onRemove={() => handleRemoveWidget(index)}
            onDuplicate={() => handleDuplicateWidget('conversation-volume')}
          />
        );
      case 'weekly-average':
        return (
          <HeatmapWidget 
            key={widget.id}
            data={processHeatmapData(metrics.heatmapData)} 
            onMaximize={() => setMaximizedWidget(widget.id)}
            onRemove={() => handleRemoveWidget(index)}
            onDuplicate={() => handleDuplicateWidget('heatmap')}
          />
        );
      case 'conversation-breakdown':
        return (
          <SankeyWidget 
            key={widget.id}
            onMaximize={() => setMaximizedWidget(widget.id)}
            onRemove={() => handleRemoveWidget(index)}
            onDuplicate={() => handleDuplicateWidget('sankey')}
          />
        );
      default:
        return null;
    }
  };
  
  // Función para renderizar un widget de una sección insertada
  const renderInsertedWidget = (widgetId: string, sectionId: string, widgetIndex: number) => {
    switch (widgetId) {
      case 'avg-answer-time':
        return (
          <StatWidget
            key={`${sectionId}-${widgetId}`}
            title="Avg. answer time"
            value={metrics.avgAnswerTime}
            impact={{ percentage: metrics.avgAnswerTimeChange, direction: metrics.avgAnswerTimeChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Average time taken to answer incoming conversations"
            scope="Both"
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('avg-answer-time')}
          />
        );
      case 'avg-handle-time':
        return (
          <StatWidget
            key={`${sectionId}-${widgetId}`}
            title="Avg. handle time"
            value={metrics.avgHandleTime}
            impact={{ percentage: metrics.avgHandleTimeChange, direction: metrics.avgHandleTimeChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Average time spent handling each conversation from start to resolution"
            scope="Both"
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('avg-handle-time')}
          />
        );
      case 'avg-first-response-time':
        return (
          <StatWidget
            key={`${sectionId}-${widgetId}`}
            title="Avg. first response time"
            value={metrics.avgFirstResponseTime}
            impact={{ percentage: metrics.avgFirstResponseTimeChange, direction: metrics.avgFirstResponseTimeChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Average time until the first response is sent to a customer"
            scope="Digital"
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('avg-first-response-time')}
          />
        );
      case 'transfer-rate':
        return (
          <StatWidget
            key={`${sectionId}-${widgetId}`}
            title="Transfer rate"
            value={metrics.transferRate}
            impact={{ percentage: metrics.transferRateChange, direction: metrics.transferRateChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Percentage of conversations transferred to another agent or department"
            scope="Both"
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('transfer-rate')}
          />
        );
      case 'deflection-rate':
        return (
          <StatWidget
            key={`${sectionId}-${widgetId}`}
            title="Deflection rate"
            value={metrics.deflectionRate}
            impact={{ percentage: metrics.deflectionRateChange, direction: metrics.deflectionRateChange.startsWith('+') ? "up" : "down" }}
            tooltipText="Percentage of conversations resolved without agent intervention"
            scope="Both"
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('deflection-rate')}
          />
        );
      case 'conversation-volume':
        return (
          <ConversationVolumeOverTimeWithDot
            key={`${sectionId}-${widgetId}`}
            metricsData={metrics}
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('conversation-volume')}
          />
        );
      case 'heatmap':
        return (
          <HeatmapWidget
            key={`${sectionId}-${widgetId}`}
            data={processHeatmapData(metrics.heatmapData)}
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('heatmap')}
          />
        );
      case 'sankey':
        return (
          <SankeyWidget
            key={`${sectionId}-${widgetId}`}
            onMaximize={() => setMaximizedWidget(`${sectionId}-${widgetId}`)}
            onRemove={() => handleRemoveInsertedSection(sectionId)}
            onDuplicate={() => handleDuplicateWidget('sankey')}
          />
        );
      default:
        return null;
    }
  };
  
  // Función para remover una sección insertada
  const handleRemoveInsertedSection = (sectionId: string) => {
    setInsertedSections(prev => prev.filter(section => section.id !== sectionId));
  };

  // Render full widget with all configurations
  const renderWidget = (widgetId: string, sectionId: string, sectionSpans: Record<string, number>) => {
    // Extract base widget ID from unique ID
    const baseWidgetId = getBaseWidgetId(widgetId);

    // StatWidgets configuration (use baseWidgetId for lookup)
    const statWidgetConfig: Record<string, any> = {
      'avg-answer-time': {
        title: "Avg. answer time",
        value: metrics.avgAnswerTime,
        impact: { percentage: metrics.avgAnswerTimeChange, direction: metrics.avgAnswerTimeChange.startsWith('+') ? "up" as const : "down" as const },
        tooltipText: "Average time taken to answer incoming conversations",
        scope: "Both" as const,
        trendData: metrics.avgAnswerTimeTrend,
        isUpPositive: false,
        valueType: "time" as const,
      },
      'avg-handle-time': {
        title: "Avg. handle time",
        value: metrics.avgHandleTime,
        impact: { percentage: metrics.avgHandleTimeChange, direction: metrics.avgHandleTimeChange.startsWith('+') ? "up" as const : "down" as const },
        tooltipText: "Average time spent handling each conversation from start to resolution",
        scope: "Both" as const,
        trendData: metrics.avgHandleTimeTrend,
        isUpPositive: false,
        valueType: "time" as const,
      },
      'avg-first-response-time': {
        title: "Avg. first response time",
        value: metrics.avgFirstResponseTime,
        impact: { percentage: metrics.avgFirstResponseTimeChange, direction: metrics.avgFirstResponseTimeChange.startsWith('+') ? "up" as const : "down" as const },
        tooltipText: "Average time until the first response is sent to a customer",
        scope: "Digital" as const,
        trendData: metrics.avgFirstResponseTimeTrend,
        isUpPositive: false,
        valueType: "time" as const,
      },
      'transfer-rate': {
        title: "Transfer rate",
        value: metrics.transferRate,
        impact: { percentage: metrics.transferRateChange, direction: metrics.transferRateChange.startsWith('+') ? "up" as const : "down" as const },
        tooltipText: "Percentage of conversations transferred to another agent or department",
        scope: "Both" as const,
        trendData: metrics.transferRateTrend,
        isUpPositive: false,
        valueType: "percentage" as const,
      },
      'deflection-rate': {
        title: "Deflection rate",
        value: metrics.deflectionRate,
        tooltipText: "Percentage of conversations resolved without agent intervention",
        scope: "Both" as const,
        impact: { percentage: metrics.deflectionRateChange, direction: metrics.deflectionRateChange.startsWith('+') ? "up" as const : "down" as const },
        trendData: metrics.deflectionRateTrend,
        isUpPositive: true,
        valueType: "percentage" as const,
      },
    };

    // Render StatWidget if it's in the config (use baseWidgetId for lookup)
    if (statWidgetConfig[baseWidgetId]) {
      const config = statWidgetConfig[baseWidgetId];
      return (
        <div className="h-full min-h-[88px]">
          <StatWidget
            title={config.title}
            widgetId={widgetId}
            value={config.value}
            impact={config.impact}
            tooltipText={config.tooltipText}
            scope={config.scope}
            trendData={config.trendData}
            isUpPositive={config.isUpPositive}
            valueType={config.valueType}
            onMaximize={() => setMaximizedWidget(widgetId)}
            onRemove={() => handleRemoveMainWidget(widgetId)}
            onDuplicate={() => handleDuplicateWidget(widgetId)}
            isDraggable={true}
          />
        </div>
      );
    }

    // Conversation Volume Widget (use baseWidgetId for comparison)
    if (baseWidgetId === 'conversation-volume') {
      return (
        <div className="h-full min-h-[260px]">
          <ConversationVolumeOverTimeWithDot
            metricsData={metrics}
            onMaximize={() => setMaximizedWidget('conversation-volume')}
            onRemove={() => handleRemoveMainWidget('conversation-volume')}
            onDuplicate={() => handleDuplicateWidget('conversation-volume')}
            isDraggable={true}
          />
        </div>
      );
    }

    // Sankey Widget (use baseWidgetId for comparison)
    if (baseWidgetId === 'sankey') {
      return (
        <div className="h-full min-h-[320px]">
          <SankeyWidget
            onMaximize={() => setMaximizedWidget('sankey')}
            onRemove={() => handleRemoveMainWidget('sankey')}
            onDuplicate={() => handleDuplicateWidget('sankey')}
            isDraggable={true}
          />
        </div>
      );
    }

    // Heatmap Widget (use baseWidgetId for comparison)
    if (baseWidgetId === 'heatmap') {
      return (
        <div className="h-full min-h-[320px]">
          <HeatmapWidget
            data={processHeatmapData(metrics.heatmapData)}
            onMaximize={() => setMaximizedWidget('heatmap')}
            onRemove={() => handleRemoveMainWidget('heatmap')}
            onDuplicate={() => handleDuplicateWidget('heatmap')}
            isDraggable={true}
          />
        </div>
      );
    }

    // Fallback for unknown widgets
    return <div className="bg-white p-4 rounded shadow h-full min-h-[88px]">Unknown widget: {widgetId}</div>;
  };

  // Render widget preview for DragOverlay
  const renderWidgetPreview = (widgetId: string) => {
    // Handle library widget preview (strip prefix)
    if (widgetId.startsWith('library-')) {
      const actualId = widgetId.replace('library-', '');
      return renderWidgetPreview(actualId);
    }

    // Extract base widget ID for rendering (handles unique IDs with timestamp)
    const baseWidgetId = getBaseWidgetId(widgetId);

    // StatWidgets (use baseWidgetId for comparison)
    if (['avg-answer-time', 'avg-handle-time', 'avg-first-response-time', 'transfer-rate', 'deflection-rate'].includes(baseWidgetId)) {
      const widgetConfig: any = {
        'avg-answer-time': {
          title: "Avg. answer time",
          value: metrics.avgAnswerTime,
        },
        'avg-handle-time': {
          title: "Avg. handle time",
          value: metrics.avgHandleTime,
        },
        'avg-first-response-time': {
          title: "Avg. first response time",
          value: metrics.avgFirstResponseTime,
        },
        'transfer-rate': {
          title: "Transfer rate",
          value: metrics.transferRate,
        },
        'deflection-rate': {
          title: "Deflection rate",
          value: metrics.deflectionRate,
        },
      };
      const config = widgetConfig[baseWidgetId];
      return (
        <div className="w-[180px] h-[88px] bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-3">
            <div className="text-xs text-gray-600 mb-1">{config.title}</div>
            <div className="text-2xl font-semibold">{config.value}</div>
          </div>
        </div>
      );
    }

    // Conversation Volume (use baseWidgetId for comparison)
    if (baseWidgetId === 'conversation-volume') {
      return (
        <div className="w-[400px] h-[260px] bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 text-sm font-medium">Conversation volume over time</div>
        </div>
      );
    }

    // Sankey (use baseWidgetId for comparison)
    if (baseWidgetId === 'sankey') {
      return (
        <div className="w-[800px] h-[320px] bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 text-sm font-medium">Conversation volume breakdown</div>
        </div>
      );
    }

    // Heatmap (use baseWidgetId for comparison)
    if (baseWidgetId === 'heatmap') {
      return (
        <div className="w-[800px] h-[320px] bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 text-sm font-medium">Weekly average volume</div>
        </div>
      );
    }

    return <div className="bg-white p-4 rounded shadow">{widgetId}</div>;
  };

  return (
    <div className="flex flex-col items-start w-full min-h-full bg-[rgb(255,255,255)]">
      {/* Dashboard Content - DndContext wraps everything including header */}
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleGlobalDragOver}
        onDragEnd={handleGlobalDragEnd}
      >
        {/* Header */}
        <PageHeader onAddWidget={handleAddWidget} getWidgetOrder={getCurrentOrder} />

        <div className="flex flex-col items-start gap-3 px-[24px] py-[16px] w-full pt-[0px] pr-[32px] pb-[16px] pl-[32px]">
          {/* Dynamic Sections Rendering */}
          {widgetOrder.sections.map((section, sectionIndex) => {
            const visibleWidgets = section.widgetIds.filter(id => !removedWidgets.has(id));

            return (
              <React.Fragment key={section.id}>
                {/* Section boundary above */}
                <SectionBoundary
                  position={sectionIndex}
                  showIndicator={sectionBoundaryIndicator?.position === sectionIndex}
                  isValid={sectionBoundaryIndicator?.isValid ?? true}
                  isDragging={!!activeId}
                />

                {/* Section content */}
                <DynamicSection
                  section={section}
                  visibleWidgets={visibleWidgets}
                  maxFrUnits={maxFrUnits}
                  renderWidget={renderWidget}
                  shouldShowIndicator={shouldShowIndicator}
                  dropIndicator={dropIndicator}
                  DropIndicator={DropIndicator}
                  SortableWidget={SortableWidget}
                  getWidgetColumnSpan={getWidgetColumnSpan}
                />

                {/* Section boundary below (after last section) */}
                {sectionIndex === widgetOrder.sections.length - 1 && (
                  <SectionBoundary
                    position={sectionIndex + 1}
                    showIndicator={sectionBoundaryIndicator?.position === sectionIndex + 1}
                    isValid={sectionBoundaryIndicator?.isValid ?? true}
                    isDragging={!!activeId}
                  />
                )}
              </React.Fragment>
            );
          })}

      {/* Inserted Sections (for duplicated widgets) */}
      {insertedSections.flatMap((section) =>
        section.widgets.map((widget, index) => (
          <div key={`${section.id}-${widget.id}-${index}`} className="grid gap-3 w-full">
            {renderInsertedWidget(widget.id, section.id, index)}
          </div>
        ))
      )}
      
      {/* Widgets agregados dinámicamente - cada uno en su propia sección */}
      {addedWidgets.map((widget, index) => {
        const widgetElement = renderAddedWidget(widget, index);
        const isStatWidget = ['avg-answer-time', 'avg-handle-time', 'avg-first-response', 'deflection-rate'].includes(widget.id);
        
        return (
          <div 
            key={`section-${widget.id}-${index}`} 
            ref={index === addedWidgets.length - 1 ? addedWidgetsRef : null}
            className="grid gap-3 w-full"
            style={{ 
              gridTemplateColumns: isStatWidget ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr'
            }}
          >
            {widgetElement}
          </div>
        );
      })}
        </div>
        
        {/* DragOverlay - Shows preview of widget being dragged */}
        <DragOverlay>
          {activeId ? (
            <div className="opacity-60 cursor-grabbing transform rotate-3 scale-95">
              {renderWidgetPreview(activeId)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {/* Modals for maximized widgets */}
      <WidgetModal
        title="Conversation volume over time"
        widgetId="conversation-volume"
        isOpen={maximizedWidget === 'conversation-volume'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <div className="w-full h-full p-6 p-[0px]">
          <LineChart 
            series={[
              {
                name: 'Total',
                color: '#9B87F5',
                strokeDasharray: '4,4',
                data: metrics.conversationVolume.map(d => ({
                  date: d.date,
                  value: d.total,
                })),
              },
              {
                name: 'Answered',
                color: '#E879F9',
                data: metrics.conversationVolume.map(d => ({
                  date: d.date,
                  value: d.answered,
                })),
              },
              {
                name: 'Missed',
                color: '#4ADE80',
                data: metrics.conversationVolume.map(d => ({
                  date: d.date,
                  value: d.missed,
                })),
              },
              {
                name: 'Abandoned',
                color: '#FB923C',
                data: metrics.conversationVolume.map(d => ({
                  date: d.date,
                  value: d.abandoned,
                })),
              },
              {
                name: 'Unanswered transferred call',
                color: '#60A5FA',
                data: metrics.conversationVolume.map(d => ({
                  date: d.date,
                  value: d.unansweredTransferred,
                })),
              },
              {
                name: 'Outbound',
                color: '#C084FC',
                data: metrics.conversationVolume.map(d => ({
                  date: d.date,
                  value: d.outbound,
                })),
              },
              {
                name: 'Other',
                color: '#EF4444',
                data: metrics.conversationVolume.map(d => ({
                  date: d.date,
                  value: d.other,
                })),
              },
            ]}
            totalValue={metrics.totalConversations}
            percentageChange="+2%"
          />
        </div>
      </WidgetModal>
      
      {/* Sankey Modal */}
      <WidgetModal
        title="Conversation volume breakdown"
        widgetId="sankey"
        isOpen={maximizedWidget === 'sankey'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <SankeyWidget minimal={true} />
      </WidgetModal>
      
      {/* Heatmap Modal */}
      <WidgetModal
        title="Weekly average volume"
        widgetId="heatmap"
        isOpen={maximizedWidget === 'heatmap'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <HeatmapWidget data={processHeatmapData(metrics.heatmapData)} minimal={true} />
      </WidgetModal>
      
      {/* Avg Answer Time Modal */}
      <WidgetModal
        title="Avg. answer time"
        widgetId="avg-answer-time"
        isOpen={maximizedWidget === 'avg-answer-time'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <StatWidget
          title="Avg. answer time"
          value={metrics.avgAnswerTime}
          impact={{ percentage: metrics.avgAnswerTimeChange, direction: metrics.avgAnswerTimeChange.startsWith('+') ? "up" : "down" }}
          trendData={metrics.avgAnswerTimeTrend}
          isUpPositive={false}
          valueType="time"
          minimal={true}
        />
      </WidgetModal>
      
      {/* Avg Handle Time Modal */}
      <WidgetModal
        title="Avg. handle time"
        widgetId="avg-handle-time"
        isOpen={maximizedWidget === 'avg-handle-time'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <StatWidget
          title="Avg. handle time"
          value={metrics.avgHandleTime}
          impact={{ percentage: metrics.avgHandleTimeChange, direction: metrics.avgHandleTimeChange.startsWith('+') ? "up" : "down" }}
          trendData={metrics.avgHandleTimeTrend}
          isUpPositive={false}
          valueType="time"
          minimal={true}
        />
      </WidgetModal>
      
      {/* Avg First Response Time Modal */}
      <WidgetModal
        title="Avg. first response time"
        widgetId="avg-first-response-time"
        isOpen={maximizedWidget === 'avg-first-response-time'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <StatWidget
          title="Avg. first response time"
          value={metrics.avgFirstResponseTime}
          impact={{ percentage: metrics.avgFirstResponseTimeChange, direction: metrics.avgFirstResponseTimeChange.startsWith('+') ? "up" : "down" }}
          trendData={metrics.avgFirstResponseTimeTrend}
          isUpPositive={false}
          valueType="time"
          minimal={true}
        />
      </WidgetModal>
      
      {/* Transfer Rate Modal */}
      <WidgetModal
        title="Transfer rate"
        widgetId="transfer-rate"
        isOpen={maximizedWidget === 'transfer-rate'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <StatWidget
          title="Transfer rate"
          value={metrics.transferRate}
          impact={{ percentage: metrics.transferRateChange, direction: metrics.transferRateChange.startsWith('+') ? "up" : "down" }}
          trendData={metrics.transferRateTrend}
          isUpPositive={false}
          valueType="percentage"
          minimal={true}
        />
      </WidgetModal>
      
      {/* Deflection Rate Modal */}
      <WidgetModal
        title="Deflection rate"
        widgetId="deflection-rate"
        isOpen={maximizedWidget === 'deflection-rate'}
        onClose={() => setMaximizedWidget(null)}
        showInfoIcon={true}
      >
        <StatWidget
          title="Deflection rate"
          value={metrics.deflectionRate}
          impact={{ percentage: metrics.deflectionRateChange, direction: metrics.deflectionRateChange.startsWith('+') ? "up" : "down" }}
          trendData={metrics.deflectionRateTrend}
          isUpPositive={true}
          valueType="percentage"
          minimal={true}
        />
      </WidgetModal>
    </div>
  );
}