import { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Accordion from "@radix-ui/react-accordion";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, ChevronDown } from "lucide-react";
import svgPaths from "@/imports/svg-0rxmv7ldfh";

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

// Menu component with simple dot indicator (no number)
export function MenuWithDot({ onFiltersChange }: { onFiltersChange: (count: number) => void }) {
  // Filtros temporales - se editan mientras el usuario interactúa
  const [filters, setFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
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
    durationRange: [0, 90],
    keyword: "",
    moment: "Past 30 days",
    tags: [] as string[],
  });

  // Filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState({
    target: {
      offices: [] as string[],
      groups: [] as string[],
    },
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
    durationRange: [0, 90],
    keyword: "",
    moment: "Past 30 days",
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
    "Group Alpha",
    "Group Beta",
    "Group Gamma",
    "Group Delta",
    "Group Epsilon",
  ];

  const filteredOffices = mockOffices.filter(office =>
    office.toLowerCase().includes(officeSearch.toLowerCase())
  );

  const filteredGroups = mockGroups.filter(group =>
    group.toLowerCase().includes(groupSearch.toLowerCase())
  );

  useEffect(() => {
    let count = 0;
    
    // Target
    if (appliedFilters.target.offices.length > 0 || appliedFilters.target.groups.length > 0) {
      count++;
    }
    
    // Date
    if (appliedFilters.dateRange !== "Past 30 days") {
      count++;
    }
    
    // Channels
    const channelCount = Object.values(appliedFilters.channels).filter(v => v).length;
    if (channelCount !== 4 && channelCount > 0) {
      count++;
    }
    
    // Direction
    const directionCount = Object.values(appliedFilters.direction).filter(v => v).length;
    if (directionCount !== 2 && directionCount > 0) {
      count++;
    }
    
    // Disposition
    const dispositionCount = Object.values(appliedFilters.disposition).filter(v => v).length;
    if (dispositionCount !== 3 && dispositionCount > 0) {
      count++;
    }
    
    // Expertise
    const expertiseCount = Object.values(appliedFilters.expertise).filter(v => v).length;
    if (expertiseCount !== 3 && expertiseCount > 0) {
      count++;
    }
    
    // Internal/External
    const internalExternalCount = Object.values(appliedFilters.internalExternal).filter(v => v).length;
    if (internalExternalCount !== 2 && internalExternalCount > 0) {
      count++;
    }
    
    // Duration
    if (appliedFilters.durationRange[0] !== 0 || appliedFilters.durationRange[1] !== 90) {
      count++;
    }
    
    // Keyword
    if (appliedFilters.keyword) {
      count++;
    }
    
    // Tags
    if (appliedFilters.tags.length > 0) {
      count++;
    }
    
    onFiltersChange(count);
  }, [appliedFilters, onFiltersChange]);

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

  const appliedFiltersCount = (() => {
    let count = 0;
    
    if (appliedFilters.target.offices.length > 0 || appliedFilters.target.groups.length > 0) count++;
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

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={`bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-all cursor-pointer ${appliedFiltersCount > 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} data-name="Menu">
          <IconAlpha />
          {appliedFiltersCount > 0 && (
            <div className="absolute top-[4px] right-[4px] bg-[rgb(23,104,198)] w-[8px] h-[8px] rounded-full ring-2 ring-white" />
          )}
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-[rgba(28,28,28,0.15)] w-[320px] max-h-[500px] overflow-hidden z-50 flex flex-col"
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
                  <div className="px-4 pt-3 pb-3 space-y-3">
                    {/* Offices Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label className="font-['SF_Pro:Semibold',sans-serif] text-[11px] text-[#535353]">
                        Offices
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search offices..."
                          value={officeSearch}
                          onChange={(e) => setOfficeSearch(e.target.value)}
                          className="w-full px-3 py-2 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                        />
                      </div>
                      <div className="max-h-[150px] overflow-y-auto border border-gray-200 rounded-lg">
                        {filteredOffices.map((office) => (
                          <label
                            key={office}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                          >
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
                              className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
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

                    {/* Groups Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label className="font-['SF_Pro:Semibold',sans-serif] text-[11px] text-[#535353]">
                        Groups
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search groups..."
                          value={groupSearch}
                          onChange={(e) => setGroupSearch(e.target.value)}
                          className="w-full px-3 py-2 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                        />
                      </div>
                      <div className="max-h-[150px] overflow-y-auto border border-gray-200 rounded-lg">
                        {filteredGroups.map((group) => (
                          <label
                            key={group}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                          >
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
                              className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
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
                  <div className="px-4 pt-3 pb-3">
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="w-full px-3 py-2 pr-8 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
                    >
                      <option>Past 7 days</option>
                      <option>Past 30 days</option>
                      <option>Past 90 days</option>
                      <option>Past year</option>
                      <option>All time</option>
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
                  <div className="px-4 pt-3 pb-3 space-y-2">
                    {Object.entries(filters.channels).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={value}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              channels: { ...filters.channels, [key]: !!checked },
                            })
                          }
                          className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
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

              <Accordion.Item value="direction" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isDirectionActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getDirectionLabel()}</span>
                    {isDirectionActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDirection();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear direction filter"
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
                  <div className="px-4 pt-3 pb-3 space-y-2">
                    {Object.entries(filters.direction).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={value}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              direction: { ...filters.direction, [key]: !!checked },
                            })
                          }
                          className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
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

              <Accordion.Item value="disposition" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isDispositionActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getDispositionLabel()}</span>
                    {isDispositionActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDisposition();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear disposition filter"
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
                  <div className="px-4 pt-3 pb-3 space-y-2">
                    {Object.entries(filters.disposition).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={value}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              disposition: { ...filters.disposition, [key]: !!checked },
                            })
                          }
                          className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
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

              <Accordion.Item value="expertise" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isExpertiseActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getExpertiseLabel()}</span>
                    {isExpertiseActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearExpertise();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear expertise filter"
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
                  <div className="px-4 pt-3 pb-3 space-y-2">
                    {Object.entries(filters.expertise).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={value}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              expertise: { ...filters.expertise, [key]: !!checked },
                            })
                          }
                          className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
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

              <Accordion.Item value="internal-external" className="border-b border-gray-100">
                <Accordion.Header>
                  <Accordion.Trigger 
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors group ${
                      isInternalExternalActive() ? 'bg-[rgba(180,139,255,0.27)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-['SF_Pro:Semibold',sans-serif] text-[12px] text-[#535353]">{getInternalExternalLabel()}</span>
                    {isInternalExternalActive() ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          clearInternalExternal();
                        }}
                        className="transition-colors cursor-pointer"
                        style={{ color: '#7C52FF' }}
                        aria-label="Clear internal/external filter"
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
                  <div className="px-4 pt-3 pb-3 space-y-2">
                    {Object.entries(filters.internalExternal).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root
                          checked={value}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              internalExternal: { ...filters.internalExternal, [key]: !!checked },
                            })
                          }
                          className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
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
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-4 pt-3 pb-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] text-gray-600">
                        <span>{filters.durationRange[0]} min</span>
                        <span>{filters.durationRange[1]} min</span>
                      </div>
                      <Slider.Root
                        value={filters.durationRange}
                        onValueChange={(value) => setFilters({ ...filters, durationRange: value as [number, number] })}
                        min={0}
                        max={90}
                        step={5}
                        className="relative flex items-center select-none touch-none w-full h-5"
                      >
                        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                          <Slider.Range className="absolute bg-[#7C52FF] rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-[#7C52FF] rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7C52FF]" />
                        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-[#7C52FF] rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7C52FF]" />
                      </Slider.Root>
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
                  <div className="px-4 pt-3 pb-3">
                    <input
                      type="text"
                      placeholder="Enter keyword..."
                      value={filters.keyword}
                      onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                      className="w-full px-3 py-2 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
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
                  target: {
                    offices: [],
                    groups: [],
                  },
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
                  durationRange: [0, 90],
                  keyword: "",
                  moment: "Past 30 days",
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