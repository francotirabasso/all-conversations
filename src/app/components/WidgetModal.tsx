import React, { ReactNode, useState, useMemo } from 'react';
import { X, Download, ChevronRight, Plus } from 'lucide-react';
import svgPaths from "@/imports/svg-0rxmv7ldfh";
import { useGlobalFilters } from '../contexts/GlobalFiltersContext';
import * as Accordion from "@radix-ui/react-accordion";
import { FilterChip as FilterChipComponent, AddFilterPopover as FilterPopover, FilterType } from './FilterChipMenu';

// Info icon component
function Info() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Info">
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

interface WidgetModalProps {
  title: string;
  widgetId: string; // Unique ID for this widget
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showInfoIcon?: boolean;
}

// Default widget filters - moved outside component to avoid recreating on every render
const DEFAULT_WIDGET_FILTERS = {
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
  durationRange: [0, 90] as [number, number],
  keyword: "",
  moment: "Past 30 days",
  activeFilters: [] as FilterType[], // ← Agregar activeFilters aquí
};

export function WidgetModal({ title, widgetId, isOpen, onClose, children, showInfoIcon = false }: WidgetModalProps) {
  const { filters, setFilters, widgetFilters, setWidgetFilters, setHasWidgetFiltersApplied } = useGlobalFilters();
  
  console.log(`[WidgetModal ${widgetId}] Render - widgetFilters:`, widgetFilters);
  
  // Get widget-specific filters from global context, or use defaults
  const currentWidgetFilters = (widgetFilters && widgetFilters[widgetId]) || DEFAULT_WIDGET_FILTERS;
  console.log(`[WidgetModal ${widgetId}] Current filters for this widget:`, currentWidgetFilters);
  
  // Estado local de filtros del widget - inicializar activeFilters desde los filtros guardados
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(currentWidgetFilters.activeFilters || []);
  const [localWidgetFilters, setLocalWidgetFilters] = useState(currentWidgetFilters);
  
  // Sync local state when global widgetFilters change (e.g., when switching views)
  // Use a stable reference to avoid infinite loops
  React.useEffect(() => {
    console.log(`[WidgetModal ${widgetId}] useEffect triggered - widgetFilters:`, widgetFilters);
    const newFilters = (widgetFilters && widgetFilters[widgetId]) || DEFAULT_WIDGET_FILTERS;
    console.log(`[WidgetModal ${widgetId}] Setting local filters to:`, newFilters);
    setLocalWidgetFilters(newFilters);
    setActiveFilters(newFilters.activeFilters || []); // ← Sincronizar activeFilters también
  }, [widgetFilters, widgetId]); // Only depend on widgetFilters and widgetId
  
  // Update global widget filters when local filters change
  const updateWidgetFilters = React.useCallback((newFilters: any) => {
    console.log(`[WidgetModal ${widgetId}] updateWidgetFilters called with:`, newFilters);
    setLocalWidgetFilters(newFilters);
    
    // Helper function to deep compare two objects (reuse from PageHeader logic)
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
    
    setWidgetFilters(prev => {
      // Check if the new filters are equal to default filters
      const isDefaultFilters = areFiltersEqual(newFilters, DEFAULT_WIDGET_FILTERS);
      
      console.log(`[WidgetModal ${widgetId}] Filters are default?`, isDefaultFilters);
      
      if (isDefaultFilters) {
        // Remove this widget's entry if filters are default
        const updated = { ...(prev || {}) };
        delete updated[widgetId];
        console.log(`[WidgetModal ${widgetId}] Removing widget from widgetFilters. New state:`, updated);
        return updated;
      } else {
        // Add/update this widget's entry if filters are different
        const updated = {
          ...(prev || {}),
          [widgetId]: newFilters
        };
        console.log(`[WidgetModal ${widgetId}] Updating global widgetFilters to:`, updated);
        return updated;
      }
    });
    setHasWidgetFiltersApplied(true);
  }, [widgetId, setWidgetFilters, setHasWidgetFiltersApplied]);
  
  // Update activeFilters and save to context
  const handleActiveFiltersChange = React.useCallback((newActiveFilters: FilterType[]) => {
    console.log(`[WidgetModal ${widgetId}] Updating activeFilters to:`, newActiveFilters);
    setActiveFilters(newActiveFilters);
    // También guardar activeFilters en el contexto global
    const updatedFilters = {
      ...localWidgetFilters,
      activeFilters: newActiveFilters
    };
    updateWidgetFilters(updatedFilters);
  }, [widgetId, localWidgetFilters, updateWidgetFilters]);

  if (!isOpen) return null;

  // Crear chips basados en los filtros activos
  const filterChips: { id: string; label: string; onRemove: () => void }[] = [];

  // Agregar chips de oficinas
  if (filters.offices.length > 0) {
    filterChips.push({
      id: 'offices',
      label: filters.offices.length === 1 ? filters.offices[0] : `${filters.offices.length} offices`,
      onRemove: () => setFilters({ ...filters, offices: [] })
    });
  }

  // Agregar chips de contact centers
  if (filters.contactCenters.length > 0) {
    filterChips.push({
      id: 'contactCenters',
      label: filters.contactCenters.length === 1 ? filters.contactCenters[0] : `${filters.contactCenters.length} contact centers`,
      onRemove: () => setFilters({ ...filters, contactCenters: [] })
    });
  }

  // Agregar chips de agents
  if (filters.agents.length > 0) {
    filterChips.push({
      id: 'agents',
      label: filters.agents.length === 1 ? filters.agents[0] : `${filters.agents.length} agents`,
      onRemove: () => setFilters({ ...filters, agents: [] })
    });
  }

  // Agregar chip de date range si no es el default
  if (filters.dateRange !== 'Past 30 days') {
    filterChips.push({
      id: 'dateRange',
      label: filters.dateRange,
      onRemove: () => setFilters({ ...filters, dateRange: 'Past 30 days' })
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          margin: '42px',
          width: 'calc(100% - 84px)',
          height: 'calc(100% - 84px)',
        }}
      >
        {/* Header */}
        <div className="flex flex-col px-6 py-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-['SF_Pro:Semibold',sans-serif] text-[20px] text-black">
                {title}
              </h2>
              {showInfoIcon && <Info />}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => {/* Download functionality */}}
              >
                <Download className="size-4 text-gray-600" />
              </button>
              
              <button 
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={onClose}
              >
                <X className="size-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="text-[11px] text-gray-500 font-['SF_Pro:Regular',sans-serif] mb-2">
            All data is in US/Eastern · Updated today, 18:32
          </div>
          
          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {activeFilters.map((filterType) => (
              <FilterChipComponent
                key={filterType}
                type={filterType}
                onRemove={() => {
                  const newFilters = activeFilters.filter(f => f !== filterType);
                  handleActiveFiltersChange(newFilters);
                }}
                filters={localWidgetFilters}
                setFilters={updateWidgetFilters}
              />
            ))}
            
            {/* Si no hay filtros activos, mostrar los filtros globales por defecto */}
            {activeFilters.length === 0 && (
              <>
                <button className="bg-[rgba(0,0,0,0)] flex items-center justify-center px-[12px] py-[8px] relative rounded-[8px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors">
                  <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] text-[#3a3a3a] text-[12px] whitespace-nowrap leading-[1.2] relative">
                    All targets
                  </span>
                </button>
                <button className="bg-[rgba(0,0,0,0)] flex items-center justify-center px-[12px] py-[8px] relative rounded-[8px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors">
                  <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] text-[#3a3a3a] text-[12px] whitespace-nowrap leading-[1.2] relative">
                    All members
                  </span>
                </button>
                <button className="bg-[rgba(0,0,0,0)] flex items-center justify-center px-[12px] py-[8px] relative rounded-[8px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors">
                  <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] text-[#3a3a3a] text-[12px] whitespace-nowrap leading-[1.2] relative">
                    {filters.dateRange}
                  </span>
                </button>
              </>
            )}
            
            <FilterPopover 
              activeFilters={activeFilters} 
              onFiltersChange={handleActiveFiltersChange}
              variant="chip"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1 p-6 p-[0px]">
            {children}
          </div>
          
          {/* Accordion debajo del widget */}
          <div className="border-t border-gray-200">
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="conversation-details">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center gap-2 w-full px-6 py-4 hover:bg-gray-50 transition-colors group">
                    <ChevronRight className="size-4 text-gray-500 transition-transform group-data-[state=open]:rotate-90" />
                    <span className="text-[14px] font-['SF_Pro:Medium',sans-serif] text-gray-700">
                      Conversation details
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 pb-4">
                    {/* Contenido del accordion - por ahora vacío */}
                    <p className="text-[13px] text-gray-500">Details will be shown here...</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </div>
    </div>
  );
}