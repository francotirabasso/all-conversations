import { useState } from 'react';
import { Grid3x3, ZoomIn, ZoomOut, Trash2, Copy, Download, Square, TrendingUp, Flame, GitBranch, Table2, ChevronDown } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { DraggableWidget } from './DraggableWidget';
import Frame2 from '@/imports/Frame1000003766';

// Widget types and their data
const WIDGET_TYPES = [
  { id: 'metric', label: 'Metric card', icon: Square },
  { id: 'line', label: 'Line chart', icon: TrendingUp },
  { id: 'heatmap', label: 'Heatmap', icon: Flame },
  { id: 'sankey', label: 'Sankey', icon: GitBranch },
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

export function CanvasPrototype() {
  const [showGrid, setShowGrid] = useState(true);
  const [widgets, setWidgets] = useState([
    { id: 1, x: 100, y: 100, width: 620, height: 320 },
  ]);
  const [zoom, setZoom] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

  const addWidget = () => {
    const newWidget = {
      id: widgets.length + 1,
      x: 100 + widgets.length * 30,
      y: 100 + widgets.length * 30,
      width: 620,
      height: 320,
    };
    setWidgets([...widgets, newWidget]);
  };

  const duplicateWidget = (id: number) => {
    const widget = widgets.find(w => w.id === id);
    if (widget) {
      const newWidget = {
        ...widget,
        id: widgets.length + 1,
        x: widget.x + 30,
        y: widget.y + 30,
      };
      setWidgets([...widgets, newWidget]);
    }
  };

  const deleteWidget = (id: number) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const handleZoomIn = () => {
    setZoom(Math.min(200, zoom + 10));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(50, zoom - 10));
  };

  const exportCanvas = () => {
    const canvasData = {
      widgets: widgets.map(w => ({
        id: w.id,
        position: { x: w.x, y: w.y },
        size: { width: w.width, height: w.height },
      })),
      zoom,
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(canvasData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `canvas-prototype-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            showGrid ? 'bg-blue-50 text-blue-600' : ''
          }`}
          title="Toggle Grid"
        >
          <Grid3x3 className="size-5" />
        </button>
        
        <div className="w-px bg-gray-200" />
        
        <button
          onClick={handleZoomOut}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="size-5" />
        </button>
        
        <div className="px-3 py-2 text-sm font-medium min-w-[60px] text-center">
          {zoom}%
        </div>
        
        <button
          onClick={handleZoomIn}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="size-5" />
        </button>
        
        <div className="w-px bg-gray-200" />
        
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              + Add widgets
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="bg-white rounded-lg shadow-xl border border-gray-200 w-[320px] z-[100] flex flex-col max-h-[600px]"
              sideOffset={8}
              align="start"
            >
              {/* Header with search and filter */}
              <div className="p-3 border-b border-gray-200 space-y-2">
                <input
                  type="text"
                  placeholder="Search widgets"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-8"
                  >
                    <option value="all">Type</option>
                    {WIDGET_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
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
                    const Icon = typeConfig?.icon || Square;
                    const isSelected = selectedWidgets.includes(widget.id);
                    
                    return (
                      <label
                        key={widget.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <Checkbox.Root
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedWidgets([...selectedWidgets, widget.id]);
                            } else {
                              setSelectedWidgets(selectedWidgets.filter(id => id !== widget.id));
                            }
                          }}
                          className="flex size-4 items-center justify-center rounded border-2 border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 shrink-0"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-white" strokeWidth={3} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        
                        <Icon className="size-4 text-gray-400 shrink-0" />
                        
                        <span className="text-sm text-gray-700 flex-1">{widget.name}</span>
                      </label>
                    );
                  })}
              </div>

              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        
        <button
          onClick={exportCanvas}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Export Canvas"
        >
          <Download className="size-5" />
        </button>
      </div>

      {/* Widget Info */}
      <div className="absolute top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 text-sm">
        <div className="font-medium mb-2">Canvas Info</div>
        <div className="text-gray-600 space-y-1">
          <div>Widgets: {widgets.length}</div>
          <div>Zoom: {zoom}%</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <div className="font-medium mb-2 text-sm">Prototype Controls</div>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click widget to select</li>
          <li>• Drag widget to move</li>
          <li>• Use resize handles to scale</li>
          <li>• Interact with widget controls</li>
          <li>• Add multiple widgets to compare layouts</li>
        </ul>
      </div>

      {/* Canvas */}
      <div 
        className="relative w-full h-full"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top left',
        }}
      >
        {/* Grid Background */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {/* Widgets */}
        {widgets.map((widget) => (
          <DraggableWidget
            key={widget.id}
            initialX={widget.x}
            initialY={widget.y}
            initialWidth={widget.width}
            initialHeight={widget.height}
            onPositionChange={(x, y) => {
              setWidgets(widgets.map(w => 
                w.id === widget.id ? { ...w, x, y } : w
              ));
            }}
            onSizeChange={(width, height) => {
              setWidgets(widgets.map(w => 
                w.id === widget.id ? { ...w, width, height } : w
              ));
            }}
          >
            <div className="relative size-full">
              <Frame2 />
              
              {/* Widget Actions - appears on hover/select */}
              <div className="absolute -bottom-10 left-0 flex gap-2 opacity-0 hover:opacity-100 transition-opacity no-drag">
                <button
                  onClick={() => duplicateWidget(widget.id)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-xs flex items-center gap-1"
                >
                  <Copy className="size-3" />
                  Duplicate
                </button>
                <button
                  onClick={() => deleteWidget(widget.id)}
                  className="px-3 py-1 bg-white border border-red-300 text-red-600 rounded shadow-sm hover:bg-red-50 text-xs flex items-center gap-1"
                >
                  <Trash2 className="size-3" />
                  Delete
                </button>
              </div>
            </div>
          </DraggableWidget>
        ))}
      </div>
    </div>
  );
}