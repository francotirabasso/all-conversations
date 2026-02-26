import React, { ReactNode, useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, ChevronDown } from "lucide-react";
import svgPaths from "@/imports/svg-0rxmv7ldfh";
import svgPathsInfo from "@/imports/svg-r75ybpddl9";
import { ClearFilterButton } from "./ClearFilterButton";
import { useGlobalFilters } from "../contexts/GlobalFiltersContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getUniqueAgents } from "../utils/csvDataProcessor";

// Grip icon component
function Grip() {
  return (
    <div className="relative shrink-0 w-full" data-name="Grip">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center pl-[12px] pr-[13px] w-full" />
      </div>
    </div>
  );
}

// Info icon component
function InfoIcon() {
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

// Phone icon for scope
function PhoneIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="phone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="phone">
          <path d={svgPathsInfo.p2c1bf080} id="Vector" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

// Monitor icon for scope
function MonitorIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="monitor">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="monitor">
          <path d={svgPathsInfo.p329cfa80} id="Vector" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

// Info popover component
function Info({ text, scope }: { text?: string; scope: "Both" | "Voice" | "Digital" }) {
  console.log('[Info Component] text:', text, 'scope:', scope);
  
  if (!text) {
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

  const scopeLabel = scope === "Both" ? "Voice and Digital" : scope;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className="cursor-pointer hover:opacity-70 transition-opacity">
          <InfoIcon />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-[#f9f9f9] rounded-[8px] w-[280px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_2px_4px_0px_rgba(0,0,0,0.04),0px_2px_16px_0px_rgba(0,0,0,0.08)] border border-[rgba(28,28,28,0.11)] z-[9999]"
          sideOffset={5}
          align="start"
        >
          {/* Description */}
          <div className="px-[16px] py-[8px]">
            <p className="font-['SF_Pro:Regular',sans-serif] text-[12px] text-[#3a3a3a] leading-[1.4]">{text}</p>
          </div>

          {/* Scope Footer */}
          <div className="border-t border-[rgba(28,28,28,0.11)]">
            <div className="flex items-center gap-[4px] px-[16px] py-[8px]">
              {scope === "Both" && (
                <>
                  <MonitorIcon />
                  <PhoneIcon />
                </>
              )}
              {scope === "Voice" && <PhoneIcon />}
              {scope === "Digital" && <MonitorIcon />}
              <p className="font-['SF_Pro:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[1.4]">{scopeLabel}</p>
            </div>
          </div>

          <Popover.Arrow className="fill-[#f9f9f9]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// MoreVertical icon component
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

// IconAlpha component for menu
function IconAlphaMenu() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon alpha">
      <MoreVertical />
    </div>
  );
}

// Filter icon component
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

// IconAlpha component for filter
function IconAlphaFilter() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon alpha">
      <Filter />
    </div>
  );
}

interface WidgetProps {
  title: string;
  widgetId?: string;
  minHeight?: number;
  minColumns?: number;
  children: ReactNode;
  showFilterButton?: boolean;
  showMenuButton?: boolean;
  showInfoIcon?: boolean;
  hasFiltersApplied?: boolean;
  onMaximize?: () => void;
  onRemove?: () => void;
  onDuplicate?: () => void;
  tooltipText?: string;
  scope?: "Both" | "Voice" | "Digital";
  isDraggable?: boolean;
}

export function Widget({
  title,
  widgetId,
  minHeight = 320,
  minColumns = 1,
  children,
  showFilterButton = false,
  showMenuButton = true,
  showInfoIcon = false,
  hasFiltersApplied = false,
  onMaximize,
  onRemove,
  onDuplicate,
  tooltipText,
  scope = "Both",
  isDraggable = false,
}: WidgetProps) {
  console.log('[Widget] Rendering:', title, 'showInfoIcon:', showInfoIcon, 'tooltipText:', tooltipText);
  const { setHasWidgetFiltersApplied, setWidgetFilters, widgetFilters } = useGlobalFilters();
  
  // Setup drag and drop if enabled
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: widgetId || title,
    disabled: !isDraggable || !widgetId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  // Estado de filtros
  const [filters, setFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
    members: [] as string[],
    dateRange: "Past 30 days",
    channels: {
      email: true,
      chat: true,
      phone: true,
      social: true,
    },
    direction: {
      inbound: true,
      outbound: true,
    },
    disposition: {
      open: true,
      pending: true,
      closed: true,
    },
    expertise: {
      sales: true,
      support: true,
      marketing: true,
    },
    internalExternal: {
      internal: true,
      external: true,
    },
    durationRange: [0, 90] as [number, number],
    keyword: "",
    moment: "Past 30 days",
    tags: [] as string[],
  });

  const [appliedFilters, setAppliedFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
    members: [] as string[],
    dateRange: "Past 30 days",
    channels: {
      email: true,
      chat: true,
      phone: true,
      social: true,
    },
    direction: {
      inbound: true,
      outbound: true,
    },
    disposition: {
      open: true,
      pending: true,
      closed: true,
    },
    expertise: {
      sales: true,
      support: true,
      marketing: true,
    },
    internalExternal: {
      internal: true,
      external: true,
    },
    durationRange: [0, 90] as [number, number],
    keyword: "",
    moment: "Past 30 days",
    tags: [] as string[],
  });

  const [officeSearch, setOfficeSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [members, setMembers] = useState<Array<{ name: string; type: string }>>([]);

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
    "Group Alpha",
    "Group Beta",
    "Group Gamma",
    "Group Delta",
    "Group Epsilon",
  ];

  // Load members from CSV
  useEffect(() => {
    const loadMembers = async () => {
      const loadedMembers = await getUniqueAgents();
      setMembers(loadedMembers);
    };
    loadMembers();
  }, []);

  const filteredOffices = mockOffices.filter(office =>
    office.toLowerCase().includes(officeSearch.toLowerCase())
  );

  const filteredGroups = mockGroups.filter(group =>
    group.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(memberSearch.toLowerCase())
  );

  // Load filters from context when widget mounts or widgetFilters changes
  useEffect(() => {
    if (widgetId && widgetFilters[widgetId]) {
      console.log(`[Widget ${widgetId}] Loading filters from context:`, widgetFilters[widgetId]);
      setFilters(widgetFilters[widgetId]);
      setAppliedFilters(widgetFilters[widgetId]);
    }
  }, [widgetId, widgetFilters]);

  // Contar filtros aplicados
  const appliedFiltersCount = (() => {
    let count = 0;
    
    if (appliedFilters.target.offices.length > 0 || appliedFilters.target.groups.length > 0) count++;
    if (appliedFilters.members.length > 0) count++;
    if (appliedFilters.dateRange !== "Past 30 days") count++;
    
    const channelCount = Object.values(appliedFilters.channels).filter(v => v).length;
    if (channelCount !== 4 && channelCount > 0) count++;
    
    const directionCount = Object.values(appliedFilters.direction).filter(v => v).length;
    if (directionCount !== 2 && directionCount > 0) count++;
    
    const dispositionCount = Object.values(appliedFilters.disposition).filter(v => v).length;
    if (dispositionCount !== 3 && dispositionCount > 0) count++;
    
    const expertiseCount = Object.values(appliedFilters.expertise).filter(v => v).length;
    if (expertiseCount !== 3 && expertiseCount > 0) count++;
    
    const internalExternalCount = Object.values(appliedFilters.internalExternal).filter(v => v).length;
    if (internalExternalCount !== 2 && internalExternalCount > 0) count++;
    
    if (appliedFilters.durationRange[0] !== 0 || appliedFilters.durationRange[1] !== 90) count++;
    if (appliedFilters.keyword) count++;
    
    if (appliedFilters.tags.length > 0) count++;
    
    return count;
  })();

  // Actualizar el flag global cuando cambian los filtros aplicados
  useEffect(() => {
    setHasWidgetFiltersApplied(appliedFiltersCount > 0);
  }, [appliedFiltersCount, setHasWidgetFiltersApplied]);

  // Helper functions
  const getTargetLabel = () => {
    const totalSelected = filters.target.offices.length + filters.target.groups.length;
    if (totalSelected > 0) {
      return `Target · ${totalSelected}`;
    }
    return "Target";
  };

  const isTargetActive = () => {
    return filters.target.offices.length > 0 || filters.target.groups.length > 0;
  };

  const clearTarget = () => {
    setFilters({
      ...filters,
      target: {
        offices: [],
        groups: [],
      },
    });
  };

  const getMembersLabel = () => {
    if (filters.members.length > 0) {
      return `Members · ${filters.members.length}`;
    }
    return "Members";
  };

  const isMembersActive = () => {
    return filters.members.length > 0;
  };

  const clearMembers = () => {
    setFilters({ ...filters, members: [] });
  };

  const getDateLabel = () => {
    if (filters.dateRange !== "Past 30 days") return `Date · ${filters.dateRange}`;
    return "Date";
  };

  const isDateActive = () => filters.dateRange !== "Past 30 days";

  const clearDate = () => {
    setFilters({ ...filters, dateRange: "Past 30 days" });
  };

  const getChannelsLabel = () => {
    const selected = Object.entries(filters.channels).filter(([_, v]) => v);
    if (selected.length > 0 && selected.length < 4) {
      return `Channels · ${selected.length}`;
    }
    return "Channels";
  };

  const isChannelsActive = () => {
    const selected = Object.values(filters.channels).filter(v => v).length;
    return selected > 0 && selected < 4;
  };

  const clearChannels = () => {
    setFilters({
      ...filters,
      channels: { email: true, chat: true, phone: true, social: true },
    });
  };

  const getDirectionLabel = () => {
    const selected = Object.entries(filters.direction).filter(([_, v]) => v);
    if (selected.length === 1) {
      return `Direction · ${selected[0][0]}`;
    }
    return "Direction";
  };

  const isDirectionActive = () => {
    const selected = Object.values(filters.direction).filter(v => v).length;
    return selected === 1;
  };

  const clearDirection = () => {
    setFilters({
      ...filters,
      direction: { inbound: true, outbound: true },
    });
  };

  const getDispositionLabel = () => {
    const selected = Object.entries(filters.disposition).filter(([_, v]) => v);
    if (selected.length > 0 && selected.length < 3) {
      return `Disposition · ${selected.length}`;
    }
    return "Disposition";
  };

  const isDispositionActive = () => {
    const selected = Object.values(filters.disposition).filter(v => v).length;
    return selected > 0 && selected < 3;
  };

  const clearDisposition = () => {
    setFilters({
      ...filters,
      disposition: { open: true, pending: true, closed: true },
    });
  };

  const getExpertiseLabel = () => {
    const selected = Object.entries(filters.expertise).filter(([_, v]) => v);
    if (selected.length > 0 && selected.length < 3) {
      return `Expertise · ${selected.length}`;
    }
    return "Expertise";
  };

  const isExpertiseActive = () => {
    const selected = Object.values(filters.expertise).filter(v => v).length;
    return selected > 0 && selected < 3;
  };

  const clearExpertise = () => {
    setFilters({
      ...filters,
      expertise: { sales: true, support: true, marketing: true },
    });
  };

  const getInternalExternalLabel = () => {
    const selected = Object.entries(filters.internalExternal).filter(([_, v]) => v);
    if (selected.length === 1) {
      return `Internal/External · ${selected[0][0]}`;
    }
    return "Internal/External";
  };

  const isInternalExternalActive = () => {
    const selected = Object.values(filters.internalExternal).filter(v => v).length;
    return selected === 1;
  };

  const clearInternalExternal = () => {
    setFilters({
      ...filters,
      internalExternal: { internal: true, external: true },
    });
  };

  const getDurationLabelText = () => {
    if (filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90) {
      return `Duration · ${filters.durationRange[0]}-${filters.durationRange[1]}m`;
    }
    return "Duration";
  };

  const isDurationActive = () => {
    return filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90;
  };

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

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, minHeight: `${minHeight}px`, opacity: isDragging ? 0.5 : 1 }}
      className={`bg-white h-full max-h-full relative rounded-[8px] w-full group ${isDragging ? 'z-50' : ''}`}
      data-name="Line"
    >
      {/* Drag bar - appears on hover, acts as drag handle when draggable */}
      <div 
        {...(isDraggable ? { ...attributes, ...listeners } : {})}
        className={`absolute top-[2px] left-1/2 -translate-x-1/2 w-1/2 h-[4px] bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      />
      
      <div className="content-stretch flex flex-col items-start max-h-full min-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        {/* Headers */}
        <div className="relative shrink-0 w-full" data-name="Headers">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start pb-[6px] pl-[12px] pt-[6px] relative w-full pr-[0px]">
              <Grip />
              {/* Container */}
              <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
                {/* Top */}
                <div className="content-stretch flex items-center pr-[75px] relative shrink-0 w-full" data-name="Top">
                  {/* Title */}
                  <div className="content-stretch flex flex-[1_0_0] gap-[6px] h-[28px] items-center min-h-px min-w-px mr-[-75px] relative" data-name="Title">
                    <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[12px] text-black text-ellipsis whitespace-nowrap">
                      <p className="leading-[1.2] overflow-hidden">{title}</p>
                    </div>
                    {showInfoIcon && (
                      <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0">
                        <Info text={tooltipText} scope={scope} />
                      </div>
                    )}
                  </div>
                  {/* Card Actions */}
                  <div className="bg-white content-stretch flex gap-[2px] items-center justify-end mr-[-75px] pl-[8px] pr-[9px] relative shrink-0" data-name="_card actions">
                    {showFilterButton && (
                      <Popover.Root>
                        <Popover.Trigger asChild>
                          <button className={`bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-all cursor-pointer ${appliedFiltersCount > 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} data-name="FilterButton">
                            <IconAlphaFilter />
                            {appliedFiltersCount > 0 && (
                              <div className="absolute top-[4px] right-[4px] bg-[rgb(23,104,198)] w-[8px] h-[8px] rounded-full ring-2 ring-white" />
                            )}
                          </button>
                        </Popover.Trigger>

                        <Popover.Portal>
                          <Popover.Content
                            className="bg-white rounded-lg shadow-lg border border-[rgba(28,28,28,0.15)] w-[320px] overflow-hidden z-50 flex flex-col"
                            sideOffset={5}
                            align="end"
                          >
                            <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200 shrink-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-['SF_Pro:Semibold',sans-serif] text-[14px] text-black">Filters</h3>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    const defaultFilters = {
                                      target: { offices: [], groups: [] },
                                      members: [],
                                      dateRange: "Past 30 days",
                                      channels: { email: true, chat: true, phone: true, social: true },
                                      direction: { inbound: true, outbound: true },
                                      disposition: { open: true, pending: true, closed: true },
                                      expertise: { sales: true, support: true, marketing: true },
                                      internalExternal: { internal: true, external: true },
                                      durationRange: [0, 90] as [number, number],
                                      keyword: "",
                                      moment: "Past 30 days",
                                      tags: [],
                                    };
                                    setFilters(defaultFilters);
                                    setAppliedFilters(defaultFilters);
                                    
                                    // Also remove from global context if it exists
                                    if (widgetId) {
                                      setWidgetFilters(prev => {
                                        const updated = { ...(prev || {}) };
                                        delete updated[widgetId];
                                        console.log(`[Widget ${widgetId}] Cleared filters, removed from widgetFilters:`, updated);
                                        return updated;
                                      });
                                    }
                                  }}
                                  className="text-[12px] text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                  Clear all
                                </button>
                                <Popover.Close asChild>
                                  <button 
                                    className="px-3 py-1.5 text-[12px] text-white font-['SF_Pro:Semibold',sans-serif] bg-[#7C52FF] hover:bg-[#6B45E6] rounded-md cursor-pointer transition-colors"
                                    onClick={() => {
                                      console.log(`[Widget ${widgetId || title}] Apply button clicked with filters:`, filters);
                                      setAppliedFilters(filters);
                                      
                                      // Helper function to deep compare two objects
                                      const areFiltersEqual = (obj1: any, obj2: any): boolean => {
                                        if (obj1 === obj2) return true;
                                        if (obj1 == null || obj2 == null) return false;
                                        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;
                                        
                                        if (Array.isArray(obj1) && Array.isArray(obj2)) {
                                          if (obj1.length !== obj2.length) return false;
                                          const sorted1 = [...obj1].sort();
                                          const sorted2 = [...obj2].sort();
                                          for (let i = 0; i < sorted1.length; i++) {
                                            if (!areFiltersEqual(sorted1[i], sorted2[i])) return false;
                                          }
                                          return true;
                                        }
                                        
                                        if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
                                        
                                        const keys1 = Object.keys(obj1);
                                        const keys2 = Object.keys(obj2);
                                        
                                        if (keys1.length !== keys2.length) return false;
                                        
                                        for (const key of keys1) {
                                          if (!keys2.includes(key)) return false;
                                          if (!areFiltersEqual(obj1[key], obj2[key])) return false;
                                        }
                                        
                                        return true;
                                      };
                                      
                                      // Guardar filtros en el contexto global si tenemos widgetId
                                      if (widgetId) {
                                        console.log(`[Widget ${widgetId}] Saving filters to global context`);
                                        
                                        // Define default filters to compare against
                                        const defaultFilters = {
                                          target: { offices: [], groups: [] },
                                          members: [],
                                          dateRange: "Past 30 days",
                                          channels: { email: true, chat: true, phone: true, social: true },
                                          direction: { inbound: true, outbound: true },
                                          disposition: { open: true, pending: true, closed: true },
                                          expertise: { sales: true, support: true, marketing: true },
                                          internalExternal: { internal: true, external: true },
                                          durationRange: [0, 90] as [number, number],
                                          keyword: "",
                                          moment: "Past 30 days",
                                          tags: [],
                                        };
                                        
                                        setWidgetFilters(prev => {
                                          // Check if the new filters are equal to default filters
                                          const isDefaultFilters = areFiltersEqual(filters, defaultFilters);
                                          
                                          console.log(`[Widget ${widgetId}] Filters are default?`, isDefaultFilters);
                                          
                                          if (isDefaultFilters) {
                                            // Remove this widget's entry if filters are default
                                            const updated = { ...(prev || {}) };
                                            delete updated[widgetId];
                                            console.log(`[Widget ${widgetId}] Removing widget from widgetFilters. New state:`, updated);
                                            return updated;
                                          } else {
                                            // Add/update this widget's entry if filters are different
                                            const updated = {
                                              ...(prev || {}),
                                              [widgetId]: filters
                                            };
                                            console.log(`[Widget ${widgetId}] Updated widgetFilters:`, updated);
                                            return updated;
                                          }
                                        });
                                        setHasWidgetFiltersApplied(true);
                                      } else {
                                        console.warn(`[Widget ${title}] No widgetId provided, filters won't be saved to context`);
                                      }
                                    }}
                                  >
                                    Apply
                                  </button>
                                </Popover.Close>
                              </div>
                            </div>

                            <div>
                              <Accordion.Root type="multiple" className="w-full">
                                {/* Target Filter */}
                                <Accordion.Item value="target" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isTargetActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isTargetActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getTargetLabel()}
                                        </span>
                                      </div>
                                      {isTargetActive() ? (
                                        <div
                                          role="button"
                                          tabIndex={0}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearTarget();
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                              e.stopPropagation();
                                              clearTarget();
                                            }
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </div>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4 space-y-3">
                                      {/* Offices */}
                                      <div>
                                        <div className="text-[12px] font-['SF_Pro:Semibold',sans-serif] text-gray-700 mb-2">Offices</div>
                                        <input
                                          type="text"
                                          placeholder="Search offices..."
                                          value={officeSearch}
                                          onChange={(e) => setOfficeSearch(e.target.value)}
                                          className="w-full px-3 py-1.5 text-[12px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(23,104,198)] mb-2"
                                        />
                                        <div className="max-h-[120px] overflow-y-auto space-y-1.5">
                                          {filteredOffices.map(office => (
                                            <label key={office} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                              <Checkbox.Root
                                                checked={filters.target.offices.includes(office)}
                                                onCheckedChange={(checked) => {
                                                  if (checked) {
                                                    setFilters({
                                                      ...filters,
                                                      target: {
                                                        ...filters.target,
                                                        offices: [...filters.target.offices, office],
                                                      },
                                                    });
                                                  } else {
                                                    setFilters({
                                                      ...filters,
                                                      target: {
                                                        ...filters.target,
                                                        offices: filters.target.offices.filter(o => o !== office),
                                                      },
                                                    });
                                                  }
                                                }}
                                                className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                              >
                                                <Checkbox.Indicator>
                                                  <Check className="size-3 text-white" strokeWidth={3} />
                                                </Checkbox.Indicator>
                                              </Checkbox.Root>
                                              <span className="text-[12px] text-gray-700">{office}</span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Groups */}
                                      <div>
                                        <div className="text-[12px] font-['SF_Pro:Semibold',sans-serif] text-gray-700 mb-2">Groups</div>
                                        <input
                                          type="text"
                                          placeholder="Search groups..."
                                          value={groupSearch}
                                          onChange={(e) => setGroupSearch(e.target.value)}
                                          className="w-full px-3 py-1.5 text-[12px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(23,104,198)] mb-2"
                                        />
                                        <div className="max-h-[120px] overflow-y-auto space-y-1.5">
                                          {filteredGroups.map(group => (
                                            <label key={group} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                              <Checkbox.Root
                                                checked={filters.target.groups.includes(group)}
                                                onCheckedChange={(checked) => {
                                                  if (checked) {
                                                    setFilters({
                                                      ...filters,
                                                      target: {
                                                        ...filters.target,
                                                        groups: [...filters.target.groups, group],
                                                      },
                                                    });
                                                  } else {
                                                    setFilters({
                                                      ...filters,
                                                      target: {
                                                        ...filters.target,
                                                        groups: filters.target.groups.filter(g => g !== group),
                                                      },
                                                    });
                                                  }
                                                }}
                                                className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                              >
                                                <Checkbox.Indicator>
                                                  <Check className="size-3 text-white" strokeWidth={3} />
                                                </Checkbox.Indicator>
                                              </Checkbox.Root>
                                              <span className="text-[12px] text-gray-700">{group}</span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Members Filter */}
                                <Accordion.Item value="members" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isMembersActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isMembersActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getMembersLabel()}
                                        </span>
                                      </div>
                                      {isMembersActive() ? (
                                        <div
                                          role="button"
                                          tabIndex={0}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearMembers();
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                              e.stopPropagation();
                                              clearMembers();
                                            }
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </div>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4">
                                      <input
                                        type="text"
                                        placeholder="Search members..."
                                        value={memberSearch}
                                        onChange={(e) => setMemberSearch(e.target.value)}
                                        className="w-full px-3 py-1.5 text-[12px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(23,104,198)] mb-2"
                                      />
                                      <div className="max-h-[120px] overflow-y-auto space-y-1.5">
                                        {filteredMembers.map(member => (
                                          <label key={member.name} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <Checkbox.Root
                                              checked={filters.members.includes(member.name)}
                                              onCheckedChange={(checked) => {
                                                if (checked) {
                                                  setFilters({
                                                    ...filters,
                                                    members: [...filters.members, member.name],
                                                  });
                                                } else {
                                                  setFilters({
                                                    ...filters,
                                                    members: filters.members.filter(m => m !== member.name),
                                                  });
                                                }
                                              }}
                                              className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                            >
                                              <Checkbox.Indicator>
                                                <Check className="size-3 text-white" strokeWidth={3} />
                                              </Checkbox.Indicator>
                                            </Checkbox.Root>
                                            <span className="text-[12px] text-gray-700">{member.name}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Date Filter */}
                                <Accordion.Item value="date" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isDateActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isDateActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getDateLabel()}
                                        </span>
                                      </div>
                                      {isDateActive() ? (
                                        <div
                                          role="button"
                                          tabIndex={0}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearDate();
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                              e.stopPropagation();
                                              clearDate();
                                            }
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </div>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4 space-y-2">
                                      {["Past 7 days", "Past 14 days", "Past 30 days", "Past 90 days", "Custom range"].map(option => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                          <input
                                            type="radio"
                                            name="dateRange"
                                            checked={filters.dateRange === option}
                                            onChange={() => setFilters({ ...filters, dateRange: option })}
                                            className="size-4 text-[rgb(23,104,198)] focus:ring-[rgb(23,104,198)]"
                                          />
                                          <span className="text-[12px] text-gray-700">{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Channels Filter */}
                                <Accordion.Item value="channels" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isChannelsActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isChannelsActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getChannelsLabel()}
                                        </span>
                                      </div>
                                      {isChannelsActive() ? (
                                        <ClearFilterButton onClear={clearChannels} />
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4 space-y-2">
                                      {Object.entries(filters.channels).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                          <Checkbox.Root
                                            checked={value}
                                            onCheckedChange={(checked) => {
                                              setFilters({
                                                ...filters,
                                                channels: { ...filters.channels, [key]: !!checked },
                                              });
                                            }}
                                            className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                          >
                                            <Checkbox.Indicator>
                                              <Check className="size-3 text-white" strokeWidth={3} />
                                            </Checkbox.Indicator>
                                          </Checkbox.Root>
                                          <span className="text-[12px] text-gray-700 capitalize">{key}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Direction Filter */}
                                <Accordion.Item value="direction" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isDirectionActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isDirectionActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getDirectionLabel()}
                                        </span>
                                      </div>
                                      {isDirectionActive() ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearDirection();
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </button>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4 space-y-2">
                                      {Object.entries(filters.direction).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                          <Checkbox.Root
                                            checked={value}
                                            onCheckedChange={(checked) => {
                                              setFilters({
                                                ...filters,
                                                direction: { ...filters.direction, [key]: !!checked },
                                              });
                                            }}
                                            className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                          >
                                            <Checkbox.Indicator>
                                              <Check className="size-3 text-white" strokeWidth={3} />
                                            </Checkbox.Indicator>
                                          </Checkbox.Root>
                                          <span className="text-[12px] text-gray-700 capitalize">{key}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Disposition Filter */}
                                <Accordion.Item value="disposition" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isDispositionActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isDispositionActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getDispositionLabel()}
                                        </span>
                                      </div>
                                      {isDispositionActive() ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearDisposition();
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </button>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4 space-y-2">
                                      {Object.entries(filters.disposition).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                          <Checkbox.Root
                                            checked={value}
                                            onCheckedChange={(checked) => {
                                              setFilters({
                                                ...filters,
                                                disposition: { ...filters.disposition, [key]: !!checked },
                                              });
                                            }}
                                            className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                          >
                                            <Checkbox.Indicator>
                                              <Check className="size-3 text-white" strokeWidth={3} />
                                            </Checkbox.Indicator>
                                          </Checkbox.Root>
                                          <span className="text-[12px] text-gray-700 capitalize">{key}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Expertise Filter */}
                                <Accordion.Item value="expertise" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isExpertiseActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isExpertiseActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getExpertiseLabel()}
                                        </span>
                                      </div>
                                      {isExpertiseActive() ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearExpertise();
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </button>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4 space-y-2">
                                      {Object.entries(filters.expertise).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                          <Checkbox.Root
                                            checked={value}
                                            onCheckedChange={(checked) => {
                                              setFilters({
                                                ...filters,
                                                expertise: { ...filters.expertise, [key]: !!checked },
                                              });
                                            }}
                                            className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                          >
                                            <Checkbox.Indicator>
                                              <Check className="size-3 text-white" strokeWidth={3} />
                                            </Checkbox.Indicator>
                                          </Checkbox.Root>
                                          <span className="text-[12px] text-gray-700 capitalize">{key}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Internal/External Filter */}
                                <Accordion.Item value="internalExternal" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isInternalExternalActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isInternalExternalActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getInternalExternalLabel()}
                                        </span>
                                      </div>
                                      {isInternalExternalActive() ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearInternalExternal();
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </button>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4 space-y-2">
                                      {Object.entries(filters.internalExternal).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                          <Checkbox.Root
                                            checked={value}
                                            onCheckedChange={(checked) => {
                                              setFilters({
                                                ...filters,
                                                internalExternal: { ...filters.internalExternal, [key]: !!checked },
                                              });
                                            }}
                                            className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[rgb(23,104,198)] data-[state=checked]:border-[rgb(23,104,198)]"
                                          >
                                            <Checkbox.Indicator>
                                              <Check className="size-3 text-white" strokeWidth={3} />
                                            </Checkbox.Indicator>
                                          </Checkbox.Root>
                                          <span className="text-[12px] text-gray-700 capitalize">{key}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Duration Filter */}
                                <Accordion.Item value="duration" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isDurationActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isDurationActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getDurationLabelText()}
                                        </span>
                                      </div>
                                      {isDurationActive() ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearDuration();
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </button>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4">
                                      <div className="flex justify-between text-[11px] text-gray-600 mb-2">
                                        <span>{filters.durationRange[0]}m</span>
                                        <span>{filters.durationRange[1]}m</span>
                                      </div>
                                      <Slider.Root
                                        className="relative flex items-center select-none touch-none w-full h-5"
                                        value={filters.durationRange}
                                        onValueChange={(value) => setFilters({ ...filters, durationRange: value as [number, number] })}
                                        max={90}
                                        step={1}
                                        minStepsBetweenThumbs={1}
                                      >
                                        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                                          <Slider.Range className="absolute bg-[rgb(23,104,198)] rounded-full h-full" />
                                        </Slider.Track>
                                        <Slider.Thumb className="block size-4 bg-white border-2 border-[rgb(23,104,198)] rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] focus:ring-offset-2" />
                                        <Slider.Thumb className="block size-4 bg-white border-2 border-[rgb(23,104,198)] rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] focus:ring-offset-2" />
                                      </Slider.Root>
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>

                                {/* Keyword Filter */}
                                <Accordion.Item value="keyword" className="border-b border-gray-200">
                                  <Accordion.Header>
                                    <Accordion.Trigger className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors group/trigger ${isKeywordActive() ? 'bg-gray-100' : ''}`}>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[13px] ${isKeywordActive() ? 'font-["SF_Pro:Semibold",sans-serif] text-black' : 'text-gray-700'}`}>
                                          {getKeywordLabel()}
                                        </span>
                                      </div>
                                      {isKeywordActive() ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            clearKeyword();
                                          }}
                                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                                        >
                                          <X className="size-4 text-gray-500" />
                                        </button>
                                      ) : (
                                        <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[state=open]/trigger:rotate-180" />
                                      )}
                                    </Accordion.Trigger>
                                  </Accordion.Header>
                                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="px-4 pb-4">
                                      <input
                                        type="text"
                                        placeholder="Enter keyword..."
                                        value={filters.keyword}
                                        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                                        className="w-full px-3 py-1.5 text-[12px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(23,104,198)]"
                                      />
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>
                              </Accordion.Root>
                            </div>

                            <Popover.Arrow className="fill-white" />
                          </Popover.Content>
                        </Popover.Portal>
                      </Popover.Root>
                    )}
                    {showMenuButton && (
                      <Popover.Root>
                        <Popover.Trigger asChild>
                          <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-all cursor-pointer opacity-100" data-name="Menu">
                            <IconAlphaMenu />
                          </button>
                        </Popover.Trigger>

                        <Popover.Portal>
                          <Popover.Content
                            className="bg-white rounded-lg shadow-lg border border-gray-200 w-[180px] z-50 py-1"
                            sideOffset={5}
                            align="end"
                          >
                            <div className="flex flex-col">
                              {appliedFiltersCount > 0 && (
                                <>
                                  <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors">
                                    Save as new
                                  </button>
                                  <div className="border-t border-gray-200 my-1" />
                                </>
                              )}
                              {onMaximize && (
                                <Popover.Close asChild>
                                  <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors" onClick={onMaximize}>
                                    Maximize
                                  </button>
                                </Popover.Close>
                              )}
                              {onDuplicate && (
                                <Popover.Close asChild>
                                  <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors" onClick={onDuplicate}>
                                    Duplicate
                                  </button>
                                </Popover.Close>
                              )}
                              <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors">
                                Export
                              </button>
                              <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-gray-700 transition-colors">
                                Refresh data
                              </button>
                              <div className="border-t border-gray-200 my-1" />
                              {onRemove && (
                                <button className="text-left px-4 py-2 text-[13px] hover:bg-gray-100 text-red-600 transition-colors" onClick={onRemove}>
                                  Remove
                                </button>
                              )}
                            </div>
                            <Popover.Arrow className="fill-white" />
                          </Popover.Content>
                        </Popover.Portal>
                      </Popover.Root>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 w-full">
          {children}
        </div>
      </div>

      {/* Border */}
      <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}