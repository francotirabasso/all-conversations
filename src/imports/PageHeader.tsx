import svgPaths from "./svg-gqj26qwe5l";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Upload, Check, X, RectangleHorizontal, ChartLine, Flame, Option, Table2, ChevronDown as ChevronDownIcon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useDraggable } from '@dnd-kit/core';
import { useGlobalFilters } from "@/app/contexts/GlobalFiltersContext";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { getUniqueOffices, getUniqueContactCenters, getContactCentersByOffices, getUniqueAgents } from "@/app/utils/csvDataProcessor";
import { saveCSVData } from "@/app/utils/indexedDBStorage";
import { SaveViewModal } from "@/app/components/SaveViewModal";

// Widget types and their data
const WIDGET_TYPES = [
  { id: 'metric', label: 'Metric card', icon: RectangleHorizontal },
  { id: 'line', label: 'Line chart', icon: ChartLine },
  { id: 'heatmap', label: 'Heatmap', icon: Flame },
  { id: 'sankey', label: 'Sankey', icon: Option },
  { id: 'table', label: 'Table', icon: Table2 },
];

const AVAILABLE_WIDGETS = [
  { id: 'avg-answer-time', name: 'Avg. answer time', type: 'metric' },
  { id: 'avg-first-response', name: 'Avg. first response time', type: 'metric' },
  { id: 'avg-handle-time', name: 'Avg. handle time', type: 'metric' },
  { id: 'deflection-rate', name: 'Deflection rate', type: 'metric' },
  { id: 'conversation-volume-time', name: 'Conversation volume over time', type: 'line' },
  { id: 'ai-agent-answers', name: 'AI agent answers', type: 'line' },
  { id: 'ai-agent-feedback', name: 'AI agent answers feedback', type: 'line' },
  { id: 'ai-agent-queries', name: 'AI Agent queries', type: 'line' },
  { id: 'peak-queue', name: 'Peak queue size', type: 'line' },
  { id: 'sessions-channel', name: 'Sessions by channel', type: 'line' },
  { id: 'top-dispositions', name: 'Top dispositions', type: 'line' },
  { id: 'weekly-average', name: 'Weekly average volume', type: 'heatmap' },
  { id: 'conversation-breakdown', name: 'Conversation volume breakdown', type: 'sankey' },
  { id: 'leaderboard', name: 'Leaderboard', type: 'table' },
];

// Library widget item component with drag support
interface LibraryWidgetItemProps {
  widgetId: string;
  widgetType: string;
  name: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  onClickAdd: () => void;
  onDragStart?: () => void;
}

function LibraryWidgetItem({ widgetId, widgetType, name, Icon, onClickAdd, onDragStart }: LibraryWidgetItemProps) {
  // Only make implemented widgets draggable
  // Note: These IDs must match AVAILABLE_WIDGETS IDs, not the internal implementation IDs
  const IMPLEMENTED_WIDGETS = new Set([
    'avg-answer-time', 'avg-handle-time', 'avg-first-response',
    'transfer-rate', 'deflection-rate', 'conversation-volume-time', 'conversation-breakdown', 'weekly-average'
  ]);

  const isDraggableWidget = IMPLEMENTED_WIDGETS.has(widgetId);

  const draggableData = useMemo(() => {
    const data = {
      type: 'library-item',
      widgetId: widgetId,
      widgetType: widgetType,
    };
    console.log('📦 LibraryWidgetItem data:', { widgetId, isDraggableWidget, data });
    return data;
  }, [widgetId, widgetType, isDraggableWidget]);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${widgetId}`,
    data: draggableData,
    disabled: !isDraggableWidget,
  });

  console.log('🎯 useDraggable result:', { widgetId, isDragging, disabled: !isDraggableWidget });

  // Close popover when drag starts
  useEffect(() => {
    if (isDragging && onDragStart) {
      onDragStart();
    }
  }, [isDragging, onDragStart]);

  return (
    <div
      ref={isDraggableWidget ? setNodeRef : undefined}
      {...(isDraggableWidget ? listeners : {})}
      {...(isDraggableWidget ? attributes : {})}
      className={`group flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
        isDraggableWidget ? 'cursor-grab active:cursor-grabbing' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <Icon className="size-4 shrink-0" style={{ color: '#6EA6E2' }} />
      <span className="text-sm font-normal text-gray-700 flex-1">{name}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClickAdd();
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs text-[#7C52FF] hover:text-[#6B45E6] bg-transparent rounded cursor-pointer"
      >
        Add widget
      </button>
    </div>
  );
}

function Content({ onEditingChange }: { onEditingChange: (isEditing: boolean) => void }) {
  const { currentViewName, setCurrentViewName, currentViewId, updateViewName } = useGlobalFilters();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentViewName);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setEditedName(currentViewName);
  }, [currentViewName]);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    onEditingChange(isEditing);
  }, [isEditing, onEditingChange]);
  
  const handleStartEdit = () => {
    setIsEditing(true);
    setEditedName(currentViewName);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(currentViewName);
  };
  
  const handleSave = () => {
    if (editedName.trim() && editedName !== currentViewName) {
      setCurrentViewName(editedName.trim());
      
      // If editing a saved view, update it in localStorage
      if (currentViewId) {
        updateViewName(currentViewId, editedName.trim());
      }
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Content">
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2] text-[#3a3a3a] text-[19px] border-2 border-blue-500 rounded px-2 py-1 outline-none"
            style={{ width: `${Math.max(150, editedName.length * 11)}px` }}
          />
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleCancel();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="size-5" />
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <Check className="size-5" />
          </button>
        </>
      ) : (
        <p 
          onClick={handleStartEdit}
          className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2] relative shrink-0 text-[#3a3a3a] text-[19px] cursor-pointer hover:opacity-70 transition-opacity"
        >
          {currentViewName}
        </p>
      )}
    </div>
  );
}

function InputBox({ onEditingChange }: { onEditingChange: (isEditing: boolean) => void }) {
  return (
    <div className="relative rounded-[12px] shrink-0" data-name="Input box">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[10px] relative rounded-[inherit]">
        <Content onEditingChange={onEditingChange} />
      </div>
      <div aria-hidden="true" className="absolute border-0 border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function ChevronsUpDown() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="chevrons-up-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="chevrons-up-down">
          <path d={svgPaths.p38176900} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconAlpha() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon alpha">
      <ChevronsUpDown />
    </div>
  );
}

function Button({ isTitleEditing }: { isTitleEditing: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { savedViews, loadView, currentViewName, setCurrentViewName, setCurrentViewId, setFilters, setHasWidgetFiltersApplied, setIsLoadingView, setWidgetFilters } = useGlobalFilters();
  
  // Hide button when title is being edited
  if (isTitleEditing) {
    return null;
  }
  
  const views = [
    { name: "All conversations", isDefault: true },
  ];
  
  const filteredViews = views.filter(view => 
    view.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSavedViews = savedViews.filter(view =>
    view.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectDefaultView = () => {
    console.log('[handleSelectDefaultView] Starting - resetting to default view');
    
    // Activate loading state
    setIsLoadingView(true);
    
    // Reset to default state
    const defaultState = {
      filters: {
        offices: [],
        contactCenters: [],
        agents: [],
        dateRange: "Past 30 days",
      },
      widgetFilters: {},
      hasWidgetFiltersApplied: false,
      currentViewName: "All conversations",
      currentViewId: null,
    };
    
    console.log('[handleSelectDefaultView] Saving default state to sessionStorage:', defaultState);
    sessionStorage.setItem('currentViewState', JSON.stringify(defaultState));
    
    // Close popover
    setIsOpen(false);
    
    // Reload page to apply default state
    console.log('[handleSelectDefaultView] Reloading page');
    window.location.reload();
  };
  
  const handleSelectSavedView = (viewId: string) => {
    console.log('[handleSelectSavedView] Starting - loading view:', viewId);
    
    // Activate loading state
    setIsLoadingView(true);
    
    loadView(viewId);
    console.log('[handleSelectSavedView] loadView called');
    
    // Close popover
    setIsOpen(false);
    
    // Deactivate loading after 3 seconds
    setTimeout(() => {
      setIsLoadingView(false);
    }, 3000);
  };
  
  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors" data-name="Button">
          <IconAlpha />
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-xl shadow-lg border border-[rgba(28,28,28,0.15)] w-[280px] p-3 z-50"
          sideOffset={5}
          align="start"
        >
          {/* Search input */}
          <div className="relative mb-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] focus:border-transparent"
            />
          </div>
          
          {/* Views list */}
          <div className="flex flex-col">
            {filteredViews.map((view) => (
              <button
                key={view.name}
                onClick={handleSelectDefaultView}
                className={`text-left px-3 py-2 text-[13px] rounded-lg transition-colors ${
                  currentViewName === view.name 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {view.name}
                {view.isDefault && (
                  <span className="ml-2 text-gray-400">(Default)</span>
                )}
              </button>
            ))}

            {/* Divider if there are saved views */}
            {filteredSavedViews.length > 0 && (
              <div className="h-px bg-gray-200 my-2"></div>
            )}

            {/* Saved views */}
            {filteredSavedViews.map((view) => (
              <button
                key={view.id}
                onClick={() => handleSelectSavedView(view.id)}
                className={`text-left px-3 py-2 text-[13px] rounded-lg transition-colors ${
                  currentViewName === view.name 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                title={view.description || undefined}
              >
                {view.name}
              </button>
            ))}
          </div>
          
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Container({ getWidgetOrder }: { getWidgetOrder?: () => any }) {
  const { filters, hasWidgetFiltersApplied, widgetFilters, setFilters, setHasWidgetFiltersApplied, saveView, updateView, loadView, currentViewId, savedViews, setCurrentViewName, setCurrentViewId, setIsLoadingView, setWidgetFilters } = useGlobalFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  
  // Define default filter values
  const DEFAULT_FILTERS = {
    offices: [] as string[],
    contactCenters: [] as string[],
    agents: [] as string[],
    dateRange: "Past 30 days"
  };
  
  // Get the original view (default or saved)
  const originalView = currentViewId 
    ? savedViews.find(v => v.id === currentViewId)
    : null;
  
  // Determine the original filters based on current view
  const originalFilters = originalView 
    ? originalView.filters 
    : DEFAULT_FILTERS;
  
  const originalWidgetFilters = originalView 
    ? originalView.widgetFilters 
    : {};
  
  const originalHasWidgetFilters = originalView
    ? originalView.hasWidgetFilters
    : false;

  // Helper function to deeply compare two objects
  const areObjectsEqual = (obj1: any, obj2: any): boolean => {
    // If both are the same reference or both are null/undefined
    if (obj1 === obj2) return true;
    
    // If one is null/undefined and the other isn't
    if (obj1 == null || obj2 == null) return false;
    
    // If they're not both objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return obj1 === obj2;
    }
    
    // Compare arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      
      // Sort arrays for comparison (to handle order differences)
      const sorted1 = [...obj1].sort();
      const sorted2 = [...obj2].sort();
      
      for (let i = 0; i < sorted1.length; i++) {
        if (!areObjectsEqual(sorted1[i], sorted2[i])) return false;
      }
      return true;
    }
    
    // If one is array and other isn't
    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
    
    // Compare objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    // Check if they have the same number of keys
    if (keys1.length !== keys2.length) return false;
    
    // Check if all keys and values match
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!areObjectsEqual(obj1[key], obj2[key])) return false;
    }
    
    return true;
  };
  
  // Debug: Log the comparison
  console.log('[Modified Pill Debug] Current widgetFilters:', JSON.stringify(widgetFilters, null, 2));
  console.log('[Modified Pill Debug] Original widgetFilters:', JSON.stringify(originalWidgetFilters, null, 2));
  const widgetFiltersEqual = areObjectsEqual(widgetFilters, originalWidgetFilters);
  console.log('[Modified Pill Debug] Are widget filters equal?', widgetFiltersEqual);
  console.log('[Modified Pill Debug] Number of current widgets:', Object.keys(widgetFilters).length);
  console.log('[Modified Pill Debug] Number of original widgets:', Object.keys(originalWidgetFilters).length);

  // Check if current filters are different from the original view
  const hasFiltersModified =
    filters.offices.length !== originalFilters.offices.length ||
    filters.contactCenters.length !== originalFilters.contactCenters.length ||
    filters.agents.length !== originalFilters.agents.length ||
    filters.dateRange !== originalFilters.dateRange ||
    !filters.offices.every(o => originalFilters.offices.includes(o)) ||
    !filters.contactCenters.every(cc => originalFilters.contactCenters.includes(cc)) ||
    !filters.agents.every(a => originalFilters.agents.includes(a)) ||
    hasWidgetFiltersApplied !== originalHasWidgetFilters ||
    !widgetFiltersEqual;
  
  const isDefaultView = currentViewId === null;
  
  const handleSaveChanges = () => {
    if (currentViewId) {
      // Saved view: update the existing view
      updateView(currentViewId);
      console.log('[Container] View updated successfully');
    } else {
      // Default view: open modal to save as new
      setIsModalOpen(true);
    }
  };
  
  const handleSaveAsNew = () => {
    setIsModalOpen(true);
  };
  
  const handleResetChanges = () => {
    // Activate loading state
    setIsLoadingView(true);
    
    // Clear widget order and removed widgets from storage
    sessionStorage.removeItem('dashboard-widget-order');
    sessionStorage.removeItem('removed-widgets');
    
    if (currentViewId) {
      // Reset to saved view
      loadView(currentViewId);
    } else {
      // Reset to default view
      setFilters(DEFAULT_FILTERS);
      setHasWidgetFiltersApplied(false);
      setWidgetFilters({}); // Reset all widget filters
      setCurrentViewName('All conversations');
      setCurrentViewId(null);
    }
    
    // Recargar la página para resetear todos los widgets después de un breve delay
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleSaveView = (title: string, description: string) => {
    console.log('[handleSaveView] Starting with title:', title);
    const widgetOrder = getWidgetOrder?.();
    console.log('[handleSaveView] Current widgetOrder:', widgetOrder);
    const viewId = saveView(title, description, widgetOrder);
    console.log('[handleSaveView] View saved with ID:', viewId);
    
    // No llamar loadView inmediatamente porque el estado aún no se actualizó
    // En su lugar, simplemente actualizar el view name e ID (ya lo hace saveView)
    console.log('[handleSaveView] View name and ID already updated by saveView');
  };
  
  return (
    <>
      <SaveViewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveView}
      />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
        <InputBox onEditingChange={setIsTitleEditing} />
        <Button isTitleEditing={isTitleEditing} />
        
        {/* Modified pill - only show when filters are modified from defaults AND title is not being edited */}
        {hasFiltersModified && !isTitleEditing && (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="bg-[#fffae5] content-stretch flex items-center justify-center pl-[2px] pr-[4px] py-[6px] relative rounded-[102px] shrink-0 cursor-pointer hover:bg-[#fff4cc] transition-colors">
                <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[102px]" />
                <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0">
                  <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[10px] whitespace-nowrap">
                    <p className="leading-[1.2]">Modified</p>
                  </div>
                </div>
                <div className="content-stretch flex items-start pr-[2px] relative shrink-0">
                  <div className="relative shrink-0 size-[12px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                      <g id="chevron-down">
                        <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="#3A3A3A" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>
                  </div>
                </div>
              </button>
            </Popover.Trigger>
            
            <Popover.Portal>
              <Popover.Content
                className="bg-white rounded-lg shadow-lg border border-[rgba(28,28,28,0.15)] w-[180px] z-50 flex flex-col p-2"
                sideOffset={5}
                align="start"
              >
                {/* Saved view: Show both "Save changes" and "Save as new" */}
                {!isDefaultView && (
                  <>
                    <button
                      className="text-left px-3 py-2 text-[13px] rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-['SF_Pro:Regular',sans-serif]"
                      onClick={handleSaveChanges}
                    >
                      Save changes
                    </button>
                    
                    <button
                      className="text-left px-3 py-2 text-[13px] rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-['SF_Pro:Regular',sans-serif]"
                      onClick={handleSaveAsNew}
                    >
                      Save as new
                    </button>
                  </>
                )}
                
                {/* Default view: Show "Save as new" */}
                {isDefaultView && (
                  <button
                    className="text-left px-3 py-2 text-[13px] rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-['SF_Pro:Regular',sans-serif]"
                    onClick={handleSaveAsNew}
                  >
                    Save as new
                  </button>
                )}
                
                <button
                  className="text-left px-3 py-2 text-[13px] rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-['SF_Pro:Regular',sans-serif]"
                  onClick={handleResetChanges}
                >
                  Reset changes
                </button>
                
                <Popover.Arrow className="fill-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </div>
    </>
  );
}

function Title({ getWidgetOrder }: { getWidgetOrder?: () => any }) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start justify-center relative shrink-0" data-name="Title">
      <Container getWidgetOrder={getWidgetOrder} />
    </div>
  );
}

function Frame2({ getWidgetOrder }: { getWidgetOrder?: () => any }) {
  return (
    <div className="content-stretch flex items-center pl-[12px] relative shrink-0">
      <Title getWidgetOrder={getWidgetOrder} />
    </div>
  );
}

function UpdatedTime() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Updated time">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.4]">·</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.4]">Updated today, 18:32</p>
      </div>
    </div>
  );
}

function Subtitle() {
  return (
    <div className="content-stretch flex font-['SF_Pro:Regular',sans-serif] font-normal gap-[6px] items-center leading-[0] pl-[12px] relative shrink-0 text-[#555] text-[12px] whitespace-nowrap" data-name="Subtitle">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.4]">All data is in US/Eastern</p>
      </div>
      <UpdatedTime />
    </div>
  );
}

function MainTitle1({ getWidgetOrder }: { getWidgetOrder?: () => any }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative" data-name="Main title">
      <Frame2 getWidgetOrder={getWidgetOrder} />
      <Subtitle />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="plus">
          <path d={svgPaths.p11d13680} id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function IconAlpha1() {
  return (
    <div className="content-stretch flex items-start pl-[2px] relative shrink-0" data-name="Icon alpha">
      <Plus />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0" data-name="label">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Add widgets</p>
      </div>
    </div>
  );
}

function Button1({ onAddWidget }: { onAddWidget: (widgetId: string, widgetType: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <Popover.Trigger asChild>
        <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors" data-name="Button">
          <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <IconAlpha1 />
          <Label />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-xl border border-gray-200 w-[320px] z-[100] flex flex-col max-h-[600px]"
          sideOffset={8}
          align="end"
        >
          {/* Header with search and filter */}
          <div className="p-3 border-b border-gray-200 space-y-2">
            <input
              type="text"
              placeholder="Search widgets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)]"
            />
            
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(23,104,198)] appearance-none bg-white pr-8"
              >
                <option value="all">Type</option>
                {WIDGET_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Widget list */}
          <div className="overflow-y-auto flex-1">
            {AVAILABLE_WIDGETS
              .filter(widget => {
                const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesType = selectedType === 'all' || widget.type === selectedType;
                return matchesSearch && matchesType;
              })
              .map(widget => {
                const typeConfig = WIDGET_TYPES.find(t => t.id === widget.type);
                const Icon = typeConfig?.icon || RectangleHorizontal;

                return (
                  <LibraryWidgetItem
                    key={widget.id}
                    widgetId={widget.id}
                    widgetType={widget.type}
                    name={widget.name}
                    Icon={Icon}
                    onClickAdd={() => {
                      onAddWidget(widget.id, widget.type);
                      setIsOpen(false);
                    }}
                    onDragStart={() => setIsOpen(false)}
                  />
                );
              })}
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function CSVUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      
      // Parse CSV properly handling quoted values and commas within quotes
      const parseCSVLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            // Toggle quote mode
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            // End of field
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        
        // Add the last field
        result.push(current.trim());
        return result;
      };
      
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      if (lines.length < 2) {
        throw new Error('CSV file must have at least a header row and one data row');
      }
      
      const headers = parseCSVLine(lines[0]);
      
      console.log('📋 CSV Headers:', headers);
      console.log('📊 Total lines in CSV:', lines.length - 1);
      
      const data = lines.slice(1)
        .map((line, index) => {
          try {
            const values = parseCSVLine(line);
            const row: Record<string, string> = {};
            headers.forEach((header, idx) => {
              row[header] = values[idx] || '';
            });
            return row;
          } catch (err) {
            console.warn(`⚠️ Skipping malformed line ${index + 2}:`, line);
            return null;
          }
        })
        .filter((row): row is Record<string, string> => row !== null);

      if (data.length === 0) {
        throw new Error('No valid data rows found in CSV');
      }

      console.log(`✅ Parsed ${data.length} rows successfully`);
      console.log('📊 Sample row:', data[0]);
      
      // Check approximate size before storing
      const jsonString = JSON.stringify(data);
      const sizeInMB = new Blob([jsonString]).size / (1024 * 1024);
      console.log(`💾 Data size: ${sizeInMB.toFixed(2)} MB`);
      
      if (sizeInMB > 10) {
        // Warn if size is very large
        const confirm = window.confirm(
          `Warning: This CSV is quite large (${sizeInMB.toFixed(2)} MB with ${data.length.toLocaleString()} rows).\n\n` +
          `Loading might take a moment.\n\n` +
          `Continue?`
        );
        if (!confirm) return;
      }

      // Store data in IndexedDB (supports much larger files than localStorage)
      try {
        await saveCSVData(data);
        console.log(`✅ Stored ${data.length.toLocaleString()} rows successfully in IndexedDB`);
        alert(`Successfully loaded ${data.length.toLocaleString()} conversations! The dashboard will refresh with the new data.`);
        
        // Clear sessionStorage to reset to default state when loading new CSV
        sessionStorage.removeItem('currentViewState');
        
        // Refresh the page to load new data
        window.location.reload();
      } catch (storageError) {
        console.error('Storage error:', storageError);
        throw new Error(
          `Failed to store CSV data.\n\n` +
          `Error: ${storageError instanceof Error ? storageError.message : 'Unknown error'}`
        );
      }
    } catch (error) {
      console.error('Error parsing CSV:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please check the file format.';
      alert(`Error loading CSV file:\n\n${errorMessage}`);
    }
  };

  const handleClearWidgets = () => {
    // Clear widget order and removed widgets from storage
    sessionStorage.removeItem('dashboard-widget-order');
    sessionStorage.removeItem('removed-widgets');
    
    // Reload to reset all widgets
    window.location.reload();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClearWidgets}
        className="bg-transparent content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 cursor-pointer opacity-0"
        title="Reset all widgets to default"
      >
        <X className="size-[14px] text-[#3a3a3a]" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-transparent content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 cursor-pointer opacity-0"
        title="Upload CSV data"
      >
        <Upload className="size-[14px] text-[#3a3a3a]" strokeWidth={1.5} />
      </button>
    </>
  );
}

function MoreVertical() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14" stroke="currentColor">
        <circle cx="7" cy="3" r="1" fill="currentColor" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
        <circle cx="7" cy="11" r="1" fill="currentColor" />
      </svg>
    </div>
  );
}

function ViewOptionsMenu({ getWidgetOrder }: { getWidgetOrder?: () => any }) {
  const { currentViewId, deleteView, updateView, saveView, savedViews, filters, widgetFilters, hasWidgetFiltersApplied, setCurrentViewName, setCurrentViewId } = useGlobalFilters();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveAsNewModalOpen, setIsSaveAsNewModalOpen] = useState(false);
  
  const isDefaultView = currentViewId === null;
  
  // Get the current saved view
  const currentView = currentViewId ? savedViews.find(v => v.id === currentViewId) : null;
  
  // Helper function to deeply compare two objects
  const areObjectsEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;
    
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      const sorted1 = [...obj1].sort();
      const sorted2 = [...obj2].sort();
      for (let i = 0; i < sorted1.length; i++) {
        if (!areObjectsEqual(sorted1[i], sorted2[i])) return false;
      }
      return true;
    }
    
    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!areObjectsEqual(obj1[key], obj2[key])) return false;
    }
    
    return true;
  };
  
  // Check if current state is different from saved view
  const hasChanges = currentView && (
    !areObjectsEqual(filters, currentView.filters) ||
    !areObjectsEqual(widgetFilters, currentView.widgetFilters) ||
    hasWidgetFiltersApplied !== currentView.hasWidgetFilters
  );
  
  const handleSaveChanges = () => {
    if (currentViewId) {
      const widgetOrder = getWidgetOrder?.();
      updateView(currentViewId, widgetOrder);
      console.log('[ViewOptionsMenu] View saved successfully');
    }
    setIsOpen(false);
  };
  
  const handleSaveAsNew = () => {
    setIsOpen(false);
    setIsSaveAsNewModalOpen(true);
  };
  
  const handleSaveAsNewConfirm = (title: string, description: string) => {
    console.log('[ViewOptionsMenu] Saving as new view:', title);
    const widgetOrder = getWidgetOrder?.();
    const newViewId = saveView(title, description, widgetOrder);
    console.log('[ViewOptionsMenu] New view saved with ID:', newViewId);
    setIsSaveAsNewModalOpen(false);
  };
  
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export view');
    setIsOpen(false);
  };
  
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };
  
  const confirmDelete = () => {
    if (currentViewId) {
      deleteView(currentViewId);
      
      // Reset to default view after deletion
      const defaultState = {
        filters: {
          offices: [],
          contactCenters: [],
          agents: [],
          dateRange: "Past 30 days",
        },
        widgetFilters: {},
        hasWidgetFiltersApplied: false,
        currentViewName: "All conversations",
        currentViewId: null,
      };
      
      sessionStorage.setItem('currentViewState', JSON.stringify(defaultState));
      window.location.reload();
    }
    setIsDeleteModalOpen(false);
  };
  
  return (
    <>
      {/* Save As New Modal */}
      <SaveViewModal 
        isOpen={isSaveAsNewModalOpen} 
        onClose={() => setIsSaveAsNewModalOpen(false)} 
        onSave={handleSaveAsNewConfirm}
      />
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40" 
            onClick={() => setIsDeleteModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl w-[400px] p-6">
            <h3 className="font-['SF_Pro:Semibold',sans-serif] text-[18px] text-black mb-3">
              Delete view?
            </h3>
            <p className="text-[14px] text-gray-600 mb-6">
              This action cannot be undone. The view will be permanently deleted.
            </p>
            
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-[13px] text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors">
            <div aria-hidden="true" className="absolute border border-[rgba(28,28,28,0.17)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <MoreVertical />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="bg-white rounded-lg shadow-lg border border-[rgba(28,28,28,0.15)] w-[160px] z-[100] flex flex-col p-2"
            sideOffset={8}
            align="end"
          >
            <button
              onClick={handleExport}
              className="text-left px-3 py-2 text-[13px] rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-['SF_Pro:Regular',sans-serif]"
            >
              Export
            </button>
            
            {!isDefaultView && (
              <button
                onClick={handleDelete}
                className="text-left px-3 py-2 text-[13px] rounded-md hover:bg-gray-50 transition-colors text-red-600 font-['SF_Pro:Regular',sans-serif]"
              >
                Delete
              </button>
            )}
            
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}

function Frame1({ onAddWidget, getWidgetOrder }: { 
  onAddWidget: (widgetId: string, widgetType: string) => void;
  getWidgetOrder?: () => any;
}) {
  return (
    <div className="content-stretch flex gap-[8px] items-start py-[4px] relative self-stretch shrink-0">
      <CSVUploadButton />
      <Button1 onAddWidget={onAddWidget} />
      <ViewOptionsMenu getWidgetOrder={getWidgetOrder} />
    </div>
  );
}

function MainTitle({ onAddWidget, getWidgetOrder }: {
  onAddWidget: (widgetId: string, widgetType: string) => void;
  getWidgetOrder?: () => any;
}) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Main title">
        <MainTitle1 getWidgetOrder={getWidgetOrder} />
        <Frame1 onAddWidget={onAddWidget} getWidgetOrder={getWidgetOrder} />
      </div>
    </div>
  );
}

function Header({ onAddWidget, getWidgetOrder }: {
  onAddWidget: (widgetId: string, widgetType: string) => void;
  getWidgetOrder?: () => any;
}) {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex flex-col items-start pl-[24px] pr-[24px] pt-[24px] relative w-full pb-[0px]">
        <MainTitle onAddWidget={onAddWidget} getWidgetOrder={getWidgetOrder} />
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chevron-down">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #3A3A3A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function IconOmega() {
  return (
    <div className="content-stretch flex items-start pr-[2px] relative shrink-0" data-name="Icon omega">
      <ChevronDown />
    </div>
  );
}

// All Targets Filter Button with Popover
function AllTargetsFilter() {
  const { filters, setFilters } = useGlobalFilters();
  const [tempFilters, setTempFilters] = useState({
    offices: [] as string[],
    contactCenters: [] as string[],
  });
  const [officeSearch, setOfficeSearch] = useState("");
  const [contactCenterSearch, setContactCenterSearch] = useState("");
  const [offices, setOffices] = useState<string[]>([]);
  const [allContactCenters, setAllContactCenters] = useState<string[]>([]);
  const [availableContactCenters, setAvailableContactCenters] = useState<string[]>([]);

  // Load offices and contact centers asynchronously
  useEffect(() => {
    const loadData = async () => {
      const [loadedOffices, loadedContactCenters] = await Promise.all([
        getUniqueOffices(),
        getUniqueContactCenters()
      ]);
      setOffices(loadedOffices);
      setAllContactCenters(loadedContactCenters);
      setAvailableContactCenters(loadedContactCenters);
      
      // Don't automatically update global filters - only update when user clicks Apply
      // This prevents the "modified" pill from appearing on CSV load
    };
    loadData();
  }, []);

  // Update available contact centers when selected offices change
  useEffect(() => {
    const updateAvailableContactCenters = async () => {
      if (tempFilters.offices.length === 0) {
        // No offices selected, show all contact centers
        setAvailableContactCenters(allContactCenters);
      } else {
        // Get contact centers for selected offices
        const available = await getContactCentersByOffices(tempFilters.offices);
        setAvailableContactCenters(available);
        
        // Auto-deselect contact centers that are no longer available
        const stillValid = tempFilters.contactCenters.filter(cc => available.includes(cc));
        if (stillValid.length !== tempFilters.contactCenters.length) {
          setTempFilters(prev => ({
            ...prev,
            contactCenters: stillValid,
          }));
        }
      }
    };
    
    if (allContactCenters.length > 0) {
      updateAvailableContactCenters();
    }
  }, [tempFilters.offices, allContactCenters]);

  const filteredOffices = offices.filter(office =>
    office.toLowerCase().includes(officeSearch.toLowerCase())
  );

  const filteredContactCenters = availableContactCenters.filter(cc =>
    cc.toLowerCase().includes(contactCenterSearch.toLowerCase())
  );

  const totalSelected = filters.offices.length + filters.contactCenters.length;
  const totalAvailable = offices.length + allContactCenters.length;
  const isActive = totalSelected > 0 && totalSelected < totalAvailable;
  const label = isActive ? `All targets · ${totalSelected}` : "All targets";

  const handleApply = () => {
    setFilters(prev => ({
      ...prev,
      offices: tempFilters.offices,
      contactCenters: tempFilters.contactCenters,
    }));
  };

  const handleClearAll = () => {
    setTempFilters({
      offices: [],
      contactCenters: [],
    });
  };

  const handleSelectAllOffices = () => {
    setTempFilters(prev => ({
      ...prev,
      offices: prev.offices.length === offices.length ? [] : offices,
    }));
  };

  const handleSelectAllContactCenters = () => {
    setTempFilters(prev => ({
      ...prev,
      contactCenters: prev.contactCenters.length === availableContactCenters.length ? [] : availableContactCenters,
    }));
  };

  const handleResetFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilters(prev => ({
      ...prev,
      offices: [],
      contactCenters: [],
    }));
  };

  return (
    <Popover.Root onOpenChange={(open) => {
      if (open) {
        setTempFilters({
          offices: filters.offices.length > 0 ? filters.offices : offices,
          contactCenters: filters.contactCenters.length > 0 ? filters.contactCenters : availableContactCenters,
        });
      }
    }}>
      <div 
        className={`content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0 transition-colors ${
          isActive 
            ? 'bg-[rgba(180,139,255,0.27)]' 
            : 'bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.05)]'
        }`}
        data-name="Button"
      >
        <div 
          aria-hidden="true" 
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[8px] ${
            isActive ? 'border-[#7c52ff]' : 'border-[rgba(28,28,28,0.17)]'
          }`} 
        />
        {isActive ? (
          <>
            <Popover.Trigger asChild>
              <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0 cursor-pointer">
                <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#5023dd] text-[12px] whitespace-nowrap">
                  <p className="leading-[1.2]">{label}</p>
                </div>
              </div>
            </Popover.Trigger>
            <div 
              className="content-stretch flex items-start pr-[2px] relative shrink-0 cursor-pointer" 
              onClick={handleResetFilter}
              data-name="Icon omega"
            >
              <div className="relative shrink-0 size-[14px]" data-name="close">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g>
                    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#5023DD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                  </g>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <Popover.Trigger asChild>
            <div className="content-stretch flex items-center cursor-pointer">
              <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0">
                <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[12px] whitespace-nowrap">
                  <p className="leading-[1.2]">{label}</p>
                </div>
              </div>
              <IconOmega />
            </div>
          </Popover.Trigger>
        )}
      </div>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-[rgba(28,28,28,0.15)] w-[500px] h-[400px] z-50 flex flex-col"
          sideOffset={5}
          align="start"
        >
          {/* Content - Two Columns */}
          <div className="grid grid-cols-2 gap-[16px] p-[16px] flex-1 overflow-hidden">
            {/* Offices Column */}
            <div className="flex flex-col overflow-hidden">
              <div className="mb-[8px]">
                <div className="text-[12px] font-['SF_Pro:Semibold',sans-serif] text-[#1c1c1c]">Offices</div>
              </div>
              <div className="relative mb-[8px]">
                <svg className="absolute left-[10px] top-1/2 -translate-y-1/2 size-[14px] text-[#757575]" fill="none" viewBox="0 0 14 14">
                  <path d="M6.33333 11C9.27885 11 11.6667 8.61218 11.6667 5.66667C11.6667 2.72115 9.27885 0.333344 6.33333 0.333344C3.38781 0.333344 1 2.72115 1 5.66667C1 8.61218 3.38781 11 6.33333 11Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 13L10.1 10.1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={officeSearch}
                  onChange={(e) => setOfficeSearch(e.target.value)}
                  className="w-full pl-[30px] pr-[10px] py-[6px] text-[12px] border border-[rgba(28,28,28,0.17)] rounded-[6px] focus:outline-none focus:border-[#1c1c1c] placeholder:text-[#757575]"
                />
              </div>
              <label className="flex items-center gap-[8px] cursor-pointer hover:bg-[rgba(28,28,28,0.03)] px-[8px] py-[4px] rounded-[4px] mb-[8px]">
                <Checkbox.Root
                  checked={tempFilters.offices.length === filteredOffices.length && filteredOffices.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      const allOffices = new Set([...tempFilters.offices, ...filteredOffices]);
                      setTempFilters(prev => ({
                        ...prev,
                        offices: Array.from(allOffices),
                      }));
                    } else {
                      setTempFilters(prev => ({
                        ...prev,
                        offices: prev.offices.filter(o => !filteredOffices.includes(o)),
                      }));
                    }
                  }}
                  className="flex size-[16px] items-center justify-center rounded-[4px] border border-[rgba(28,28,28,0.17)] data-[state=checked]:bg-[#7C52FF] data-[state=checked]:border-[#7C52FF]"
                >
                  <Checkbox.Indicator>
                    <Check className="size-[12px] text-white" strokeWidth={2.5} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-[12px] text-[#1c1c1c] font-['SF_Pro:Semibold',sans-serif]">Select all</span>
              </label>
              <div className="max-h-[180px] overflow-y-auto space-y-[4px] flex-1">
                {filteredOffices.map(office => (
                  <label key={office} className="flex items-center gap-[8px] cursor-pointer hover:bg-[rgba(28,28,28,0.03)] px-[8px] py-[4px] rounded-[4px]">
                    <Checkbox.Root
                      checked={tempFilters.offices.includes(office)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTempFilters(prev => ({
                            ...prev,
                            offices: [...prev.offices, office],
                          }));
                        } else {
                          setTempFilters(prev => ({
                            ...prev,
                            offices: prev.offices.filter(o => o !== office),
                          }));
                        }
                      }}
                      className="flex size-[16px] items-center justify-center rounded-[4px] border border-[rgba(28,28,28,0.17)] data-[state=checked]:bg-[#7C52FF] data-[state=checked]:border-[#7C52FF]"
                    >
                      <Checkbox.Indicator>
                        <Check className="size-[12px] text-white" strokeWidth={2.5} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className="text-[12px] text-[#1c1c1c] font-['SF_Pro:Regular',sans-serif]">{office}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Groups Column */}
            <div className="flex flex-col overflow-hidden">
              <div className="mb-[8px]">
                <div className="text-[12px] font-['SF_Pro:Semibold',sans-serif] text-[#1c1c1c]">Groups</div>
              </div>
              <div className="relative mb-[8px]">
                <svg className="absolute left-[10px] top-1/2 -translate-y-1/2 size-[14px] text-[#757575]" fill="none" viewBox="0 0 14 14">
                  <path d="M6.33333 11C9.27885 11 11.6667 8.61218 11.6667 5.66667C11.6667 2.72115 9.27885 0.333344 6.33333 0.333344C3.38781 0.333344 1 2.72115 1 5.66667C1 8.61218 3.38781 11 6.33333 11Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 13L10.1 10.1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={contactCenterSearch}
                  onChange={(e) => setContactCenterSearch(e.target.value)}
                  className="w-full pl-[30px] pr-[10px] py-[6px] text-[12px] border border-[rgba(28,28,28,0.17)] rounded-[6px] focus:outline-none focus:border-[#1c1c1c] placeholder:text-[#757575]"
                />
              </div>
              <label className="flex items-center gap-[8px] cursor-pointer hover:bg-[rgba(28,28,28,0.03)] px-[8px] py-[4px] rounded-[4px] mb-[8px]">
                <Checkbox.Root
                  checked={tempFilters.contactCenters.length === filteredContactCenters.length && filteredContactCenters.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      const allContactCenters = new Set([...tempFilters.contactCenters, ...filteredContactCenters]);
                      setTempFilters(prev => ({
                        ...prev,
                        contactCenters: Array.from(allContactCenters),
                      }));
                    } else {
                      setTempFilters(prev => ({
                        ...prev,
                        contactCenters: prev.contactCenters.filter(c => !filteredContactCenters.includes(c)),
                      }));
                    }
                  }}
                  className="flex size-[16px] items-center justify-center rounded-[4px] border border-[rgba(28,28,28,0.17)] data-[state=checked]:bg-[#7C52FF] data-[state=checked]:border-[#7C52FF]"
                >
                  <Checkbox.Indicator>
                    <Check className="size-[12px] text-white" strokeWidth={2.5} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-[12px] text-[#1c1c1c] font-['SF_Pro:Semibold',sans-serif]">Select all</span>
              </label>
              <div className="max-h-[180px] overflow-y-auto space-y-[4px] flex-1">
                {filteredContactCenters.map(cc => (
                  <label key={cc} className="flex items-center gap-[8px] cursor-pointer hover:bg-[rgba(28,28,28,0.03)] px-[8px] py-[4px] rounded-[4px]">
                    <Checkbox.Root
                      checked={tempFilters.contactCenters.includes(cc)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTempFilters(prev => ({
                            ...prev,
                            contactCenters: [...prev.contactCenters, cc],
                          }));
                        } else {
                          setTempFilters(prev => ({
                            ...prev,
                            contactCenters: prev.contactCenters.filter(c => c !== cc),
                          }));
                        }
                      }}
                      className="flex size-[16px] items-center justify-center rounded-[4px] border border-[rgba(28,28,28,0.17)] data-[state=checked]:bg-[#7C52FF] data-[state=checked]:border-[#7C52FF]"
                    >
                      <Checkbox.Indicator>
                        <Check className="size-[12px] text-white" strokeWidth={2.5} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className="text-[12px] text-[#1c1c1c] font-['SF_Pro:Regular',sans-serif]">{cc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-[16px] py-[12px] border-t border-[rgba(28,28,28,0.11)] shrink-0">
            <button
              onClick={handleClearAll}
              className="text-[12px] text-[#dc2626] hover:text-[#b91c1c] cursor-pointer font-['SF_Pro:Regular',sans-serif]"
            >
              Clear all
            </button>
            <Popover.Close asChild>
              <button 
                className="px-[16px] py-[6px] text-[12px] text-white font-['SF_Pro:Semibold',sans-serif] bg-[#7C52FF] hover:bg-[#6B45E6] rounded-[6px] cursor-pointer transition-colors"
                onClick={handleApply}
              >
                Apply
              </button>
            </Popover.Close>
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// All Members Filter Button with Popover
function AllMembersFilter() {
  const { filters, setFilters } = useGlobalFilters();
  const [tempAgents, setTempAgents] = useState<string[]>([]);
  const [agentSearch, setAgentSearch] = useState("");
  const [agents, setAgents] = useState<Array<{ name: string; type: string }>>([]);

  // Load agents asynchronously
  useEffect(() => {
    const loadAgents = async () => {
      const loadedAgents = await getUniqueAgents();
      setAgents(loadedAgents);
    };
    loadAgents();
  }, []);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(agentSearch.toLowerCase())
  );

  const isActive = filters.agents.length > 0 && filters.agents.length < agents.length;
  const label = isActive ? `All members · ${filters.agents.length}` : "All members";

  const handleApply = () => {
    setFilters(prev => ({
      ...prev,
      agents: tempAgents,
    }));
  };

  const handleSelectAll = () => {
    setTempAgents(
      tempAgents.length === agents.length ? [] : agents.map(a => a.name)
    );
  };

  const handleResetFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilters(prev => ({
      ...prev,
      agents: [],
    }));
  };

  return (
    <Popover.Root onOpenChange={(open) => {
      if (open) {
        setTempAgents(filters.agents);
      }
    }}>
      <div 
        className={`content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0 transition-colors ${
          isActive 
            ? 'bg-[rgba(180,139,255,0.27)]' 
            : 'bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.05)]'
        }`}
        data-name="Button"
      >
        <div 
          aria-hidden="true" 
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[8px] ${
            isActive ? 'border-[#7c52ff]' : 'border-[rgba(28,28,28,0.17)]'
          }`} 
        />
        {isActive ? (
          <>
            <Popover.Trigger asChild>
              <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0 cursor-pointer">
                <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#5023dd] text-[12px] whitespace-nowrap">
                  <p className="leading-[1.2]">{label}</p>
                </div>
              </div>
            </Popover.Trigger>
            <div 
              className="content-stretch flex items-start pr-[2px] relative shrink-0 cursor-pointer" 
              onClick={handleResetFilter}
              data-name="Icon omega"
            >
              <div className="relative shrink-0 size-[14px]" data-name="close">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g>
                    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#5023DD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                  </g>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <Popover.Trigger asChild>
            <div className="content-stretch flex items-center cursor-pointer">
              <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0">
                <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[12px] whitespace-nowrap">
                  <p className="leading-[1.2]">{label}</p>
                </div>
              </div>
              <IconOmega />
            </div>
          </Popover.Trigger>
        )}
      </div>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-[rgba(28,28,28,0.15)] w-[320px] z-50 flex flex-col"
          sideOffset={5}
          align="start"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200 shrink-0">
            <h3 className="font-['SF_Pro:Semibold',sans-serif] text-[14px] text-black">Select members</h3>
            <div className="flex items-center gap-3">
              <Popover.Close asChild>
                <button 
                  className="px-3 py-1.5 text-[12px] text-white font-['SF_Pro:Semibold',sans-serif] bg-[#7C52FF] hover:bg-[#6B45E6] rounded-md cursor-pointer transition-colors"
                  onClick={handleApply}
                >
                  Apply
                </button>
              </Popover.Close>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] font-['SF_Pro:Semibold',sans-serif] text-gray-700">Agents</div>
              <button
                onClick={handleSelectAll}
                className="text-[11px] text-[#7C52FF] hover:text-[#6B45E6] cursor-pointer"
              >
                {tempAgents.length === agents.length ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <input
              type="text"
              placeholder="Search agents..."
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-[12px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(23,104,198)]"
            />
            <div className="max-h-[280px] overflow-y-auto space-y-1.5">
              {filteredAgents.map(agent => (
                <label key={agent.name} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <Checkbox.Root
                    checked={tempAgents.includes(agent.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setTempAgents([...tempAgents, agent.name]);
                      } else {
                        setTempAgents(tempAgents.filter(a => a !== agent.name));
                      }
                    }}
                    className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-[#7C52FF] data-[state=checked]:border-[#7C52FF]"
                  >
                    <Checkbox.Indicator>
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-[12px] text-gray-700">{agent.name}</span>
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

// Date Range Filter
function Button4() {
  const { filters, setFilters } = useGlobalFilters();
  const [tempDateRange, setTempDateRange] = useState("");

  const dateOptions = [
    "Past 7 days",
    "Past 14 days", 
    "Past 30 days",
    "Past 90 days",
    "Custom range"
  ];

  const isActive = filters.dateRange !== "Past 30 days";

  const handleApply = () => {
    setFilters(prev => ({
      ...prev,
      dateRange: tempDateRange,
    }));
  };

  const handleResetFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilters(prev => ({
      ...prev,
      dateRange: "Past 30 days",
    }));
  };

  return (
    <Popover.Root onOpenChange={(open) => {
      if (open) {
        setTempDateRange(filters.dateRange);
      }
    }}>
      <div 
        className={`content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0 transition-colors ${
          isActive 
            ? 'bg-[rgba(180,139,255,0.27)]' 
            : 'bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.05)]'
        }`}
        data-name="Button"
      >
        <div 
          aria-hidden="true" 
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[8px] ${
            isActive ? 'border-[#7c52ff]' : 'border-[rgba(28,28,28,0.17)]'
          }`} 
        />
        {isActive ? (
          <>
            <Popover.Trigger asChild>
              <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0 cursor-pointer" data-name="label">
                <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#5023dd] text-[12px] whitespace-nowrap">
                  <p className="leading-[1.2]">{filters.dateRange}</p>
                </div>
              </div>
            </Popover.Trigger>
            <div 
              className="content-stretch flex items-start pr-[2px] relative shrink-0 cursor-pointer" 
              onClick={handleResetFilter}
              data-name="Icon omega"
            >
              <div className="relative shrink-0 size-[14px]" data-name="close">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g>
                    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#5023DD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                  </g>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <Popover.Trigger asChild>
            <div className="content-stretch flex items-center cursor-pointer" data-name="label">
              <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0">
                <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[12px] whitespace-nowrap">
                  <p className="leading-[1.2]">{filters.dateRange}</p>
                </div>
              </div>
              <IconOmega />
            </div>
          </Popover.Trigger>
        )}
      </div>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-[rgba(28,28,28,0.15)] w-[240px] z-50 flex flex-col"
          sideOffset={5}
          align="start"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200 shrink-0">
            <h3 className="font-['SF_Pro:Semibold',sans-serif] text-[14px] text-black">Select date range</h3>
            <Popover.Close asChild>
              <button 
                className="px-3 py-1.5 text-[12px] text-white font-['SF_Pro:Semibold',sans-serif] bg-[#7C52FF] hover:bg-[#6B45E6] rounded-md cursor-pointer transition-colors"
                onClick={handleApply}
              >
                Apply
              </button>
            </Popover.Close>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            {dateOptions.map(option => (
              <label key={option} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="dateRange"
                  checked={tempDateRange === option}
                  onChange={() => setTempDateRange(option)}
                  className="size-4 text-[#7C52FF] focus:ring-[#7C52FF] cursor-pointer"
                />
                <span className="text-[12px] text-gray-700">{option}</span>
              </label>
            ))}
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function SearchAndFilters() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Search and Filters">
      <AllTargetsFilter />
      <AllMembersFilter />
      <Button4 />
    </div>
  );
}

function Frame() {
  return <div className="content-stretch flex gap-[8px] items-center justify-end shrink-0" />;
}

function FilterCustomizeContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Filter + customize container">
      <div className="content-stretch flex items-start justify-between px-[32px] relative w-full py-[0px]">
        <SearchAndFilters />
        <Frame />
      </div>
    </div>
  );
}

export default function PageHeader({ onAddWidget, getWidgetOrder }: {
  onAddWidget: (widgetId: string, widgetType: string) => void;
  getWidgetOrder?: () => any;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start sticky top-0 z-50 bg-[rgb(255,255,255)] size-full pt-[0px] pr-[0px] pb-[16px] pl-[0px]" data-name="Page header">
      <Header onAddWidget={onAddWidget} getWidgetOrder={getWidgetOrder} />
      <FilterCustomizeContainer />
    </div>
  );
}