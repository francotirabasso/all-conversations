import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, ChevronDown, Plus } from "lucide-react";

// Tipos de filtros disponibles
export type FilterType = "target" | "members" | "date" | "channels" | "direction" | "disposition" | "expertise" | "internalExternal" | "duration" | "keyword" | "moment";

interface FilterChipMenuProps {
  activeFilters: FilterType[];
  onFiltersChange: (filters: FilterType[]) => void;
  variant?: "button" | "chip";
  svgIcon?: React.ReactNode;
}

// Popover para agregar nuevos filtros
export function AddFilterPopover({ activeFilters, onFiltersChange, variant = "chip", svgIcon }: FilterChipMenuProps) {
  const allFilters: { type: FilterType; label: string }[] = [
    { type: "target", label: "Target" },
    { type: "members", label: "Members" },
    { type: "date", label: "Date" },
    { type: "channels", label: "Channels" },
    { type: "direction", label: "Direction" },
    { type: "disposition", label: "Disposition" },
    { type: "expertise", label: "Expertise" },
    { type: "internalExternal", label: "Internal/External" },
    { type: "duration", label: "Duration" },
    { type: "keyword", label: "Keyword" },
    { type: "moment", label: "Moment" },
  ];

  const handleToggleFilter = (filterType: FilterType, checked: boolean) => {
    console.log(`[AddFilterPopover] Toggling filter ${filterType} to ${checked}`);
    if (checked) {
      const newFilters = [...activeFilters, filterType];
      console.log(`[AddFilterPopover] Calling onFiltersChange with:`, newFilters);
      onFiltersChange(newFilters);
    } else {
      const newFilters = activeFilters.filter(f => f !== filterType);
      console.log(`[AddFilterPopover] Calling onFiltersChange with:`, newFilters);
      onFiltersChange(newFilters);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {variant === "chip" ? (
          <button className="flex items-center gap-1 px-2 py-1 text-[11px] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-600">
            <Plus className="size-3" />
            Add filter
          </button>
        ) : (
          <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[7px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer">
            {svgIcon || <Plus className="size-3.5" />}
          </button>
        )}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-gray-200 w-[220px] z-50"
          sideOffset={5}
          align="end"
        >
          <div className="p-3">
            <div className="text-[12px] font-semibold text-gray-700 mb-2">Filters</div>
            <div className="flex flex-col gap-2">
              {allFilters.map(filter => (
                <label key={filter.type} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox.Root
                    checked={activeFilters.includes(filter.type)}
                    onCheckedChange={(checked) => handleToggleFilter(filter.type, !!checked)}
                    className="flex size-4 items-center justify-center rounded border-2 border-gray-300"
                  >
                    <Checkbox.Indicator>
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-[12px] text-gray-700">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// Props para cada chip de filtro individual
interface FilterChipProps {
  type: FilterType;
  onRemove: () => void;
  filters: any;
  setFilters: (filters: any) => void;
}

// Chip de filtro individual con su popover de configuración
export function FilterChip({ type, onRemove, filters, setFilters }: FilterChipProps) {
  console.log(`[FilterChip ${type}] Rendered with setFilters:`, typeof setFilters);
  
  // Determinar si el filtro está siendo usado (tiene valores diferentes a los defaults)
  const isFilterInUse = () => {
    switch (type) {
      case "target":
        return filters.target.offices.length > 0 || filters.target.groups.length > 0;
      case "date":
        return filters.dateRange !== "Past 30 days";
      case "channels":
        const allChannelsSelected = Object.values(filters.channels).every(v => v);
        return !allChannelsSelected;
      case "direction":
        const allTypesSelected = Object.values(filters.direction).every(v => v);
        return !allTypesSelected;
      case "disposition":
        const allStatusSelected = Object.values(filters.disposition).every(v => v);
        return !allStatusSelected;
      case "expertise":
        const allExpertiseSelected = Object.values(filters.expertise).every(v => v);
        return !allExpertiseSelected;
      case "internalExternal":
        const allInternalExternalSelected = Object.values(filters.internalExternal).every(v => v);
        return !allInternalExternalSelected;
      case "duration":
        return filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90;
      case "keyword":
        return filters.keyword !== "";
      case "moment":
        return filters.moment !== "Past 30 days";
      default:
        return false;
    }
  };

  // Limpiar/resetear el filtro a sus valores por defecto
  const clearFilter = () => {
    switch (type) {
      case "target":
        setFilters({ ...filters, target: { offices: [], groups: [] } });
        break;
      case "date":
        setFilters({ ...filters, dateRange: "Past 30 days" });
        break;
      case "channels":
        setFilters({ ...filters, channels: { email: true, chat: true, phone: true, social: true } });
        break;
      case "direction":
        setFilters({ ...filters, direction: { inbound: true, outbound: true } });
        break;
      case "disposition":
        setFilters({ ...filters, disposition: { open: true, pending: true, closed: true } });
        break;
      case "expertise":
        setFilters({ ...filters, expertise: { sales: true, support: true, marketing: true } });
        break;
      case "internalExternal":
        setFilters({ ...filters, internalExternal: { internal: true, external: true } });
        break;
      case "duration":
        setFilters({ ...filters, durationRange: [0, 90] });
        break;
      case "keyword":
        setFilters({ ...filters, keyword: "" });
        break;
      case "moment":
        setFilters({ ...filters, moment: "Past 30 days" });
        break;
    }
  };

  const getLabel = () => {
    switch (type) {
      case "target":
        const totalTargets = filters.target.offices.length + filters.target.groups.length;
        return totalTargets > 0 ? `Target · ${totalTargets}` : "Target";
      case "date":
        return filters.dateRange !== "Past 30 days" ? `Date · ${filters.dateRange}` : "Date";
      case "channels":
        const selectedChannels = Object.values(filters.channels).filter(v => v).length;
        return selectedChannels < 4 ? `Channels · ${selectedChannels}` : "Channels";
      case "direction":
        const selected = Object.values(filters.direction).filter(v => v).length;
        return selected === 1 ? `Type · ${Object.keys(filters.direction).find(k => filters.direction[k])}` : "Type";
      case "disposition":
        const selectedStatus = Object.values(filters.disposition).filter(v => v).length;
        return selectedStatus < 3 ? `Status · ${selectedStatus}` : "Status";
      case "expertise":
        const selectedExpertise = Object.values(filters.expertise).filter(v => v).length;
        return selectedExpertise < 3 ? `Expertise · ${selectedExpertise}` : "Expertise";
      case "internalExternal":
        const selectedInternalExternal = Object.values(filters.internalExternal).filter(v => v).length;
        return selectedInternalExternal < 2 ? `Internal/External · ${selectedInternalExternal}` : "Internal/External";
      case "duration":
        return filters.durationRange[0] !== 0 || filters.durationRange[1] !== 90
          ? `Duration · ${filters.durationRange[0]}-${filters.durationRange[1]}m`
          : "Duration";
      case "keyword":
        return filters.keyword ? `Keyword · "${filters.keyword}"` : "Keyword";
      case "moment":
        return filters.moment !== "Past 30 days" ? `Moment · ${filters.moment}` : "Moment";
      default:
        return type;
    }
  };

  const inUse = isFilterInUse();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-1.5 px-2 py-1 text-[11px] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-600 group">
          <span>{getLabel()}</span>
          {inUse ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                clearFilter();
              }}
              className="hover:bg-gray-200 rounded p-0.5 transition-colors"
              role="button"
              aria-label="Clear filter"
            >
              <X className="size-2.5" />
            </div>
          ) : (
            <ChevronDown className="size-3 text-gray-400" />
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-gray-200 w-[280px] max-h-[400px] overflow-hidden z-50 flex flex-col"
          sideOffset={5}
          align="start"
        >
          <div className="p-3 border-b border-gray-200">
            <div className="font-semibold text-[13px] text-black capitalize">{type}</div>
          </div>

          <div className="overflow-y-auto flex-1 p-3">
            {renderFilterContent(type, filters, setFilters)}
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// Renderiza el contenido específico de cada tipo de filtro
function renderFilterContent(type: FilterType, filters: any, setFilters: (filters: any) => void) {
  const handleSetFilters = (newFilters: any) => {
    console.log(`[renderFilterContent ${type}] Calling setFilters with:`, newFilters);
    setFilters(newFilters);
  };
  
  switch (type) {
    case "date":
      return (
        <select
          value={filters.dateRange}
          onChange={(e) => handleSetFilters({ ...filters, dateRange: e.target.value })}
          className="w-full px-3 py-2 pr-8 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Past 7 days</option>
          <option>Past 30 days</option>
          <option>Past 90 days</option>
          <option>Past year</option>
          <option>All time</option>
        </select>
      );

    case "channels":
      return (
        <div className="space-y-2">
          {Object.entries(filters.channels).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <Checkbox.Root
                checked={value as boolean}
                onCheckedChange={(checked) =>
                  handleSetFilters({
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
      );

    case "direction":
      return (
        <div className="space-y-2">
          {Object.entries(filters.direction).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <Checkbox.Root
                checked={value as boolean}
                onCheckedChange={(checked) =>
                  handleSetFilters({
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
      );

    case "disposition":
      return (
        <div className="space-y-2">
          {Object.entries(filters.disposition).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <Checkbox.Root
                checked={value as boolean}
                onCheckedChange={(checked) =>
                  handleSetFilters({
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
      );

    case "expertise":
      return (
        <div className="space-y-2">
          {Object.entries(filters.expertise).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <Checkbox.Root
                checked={value as boolean}
                onCheckedChange={(checked) =>
                  handleSetFilters({
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
      );

    case "internalExternal":
      return (
        <div className="space-y-2">
          {Object.entries(filters.internalExternal).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <Checkbox.Root
                checked={value as boolean}
                onCheckedChange={(checked) =>
                  handleSetFilters({
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
      );

    case "duration":
      return (
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] text-gray-600">
            <span>{filters.durationRange[0]} min</span>
            <span>{filters.durationRange[1]} min</span>
          </div>
          <Slider.Root
            value={filters.durationRange}
            onValueChange={(value) => handleSetFilters({ ...filters, durationRange: value as [number, number] })}
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
      );

    case "keyword":
      return (
        <input
          type="text"
          placeholder="Enter keyword..."
          value={filters.keyword}
          onChange={(e) => handleSetFilters({ ...filters, keyword: e.target.value })}
          className="w-full px-3 py-2 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case "moment":
      return (
        <select
          value={filters.moment}
          onChange={(e) => handleSetFilters({ ...filters, moment: e.target.value })}
          className="w-full px-3 py-2 pr-8 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Past 7 days</option>
          <option>Past 30 days</option>
          <option>Past 90 days</option>
          <option>Past year</option>
          <option>All time</option>
        </select>
      );

    default:
      return <div className="text-[12px] text-gray-500">Filter configuration</div>;
  }
}