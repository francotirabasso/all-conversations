import { Widget } from "./Widget";
import svgPaths from "@/imports/svg-82480qa8cg";
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function UpIcon({ color = "#008E52" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p32c30200} id="Vector" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function DownIcon({ color = "#D32F2F" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p32c30200} id="Vector" stroke={color} strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 6 6)" />
        </g>
      </svg>
    </div>
  );
}

interface TrendDataPoint {
  date: Date;
  value: number;
}

// Format value based on type
function formatTrendValue(value: number, valueType: 'time' | 'percentage' | 'number'): string {
  switch (valueType) {
    case 'time':
      // Value is already in minutes, display as minutes with decimal
      const minutes = Math.round(value * 10) / 10; // Round to 1 decimal
      return `${minutes}m`;
    case 'percentage':
      return `${Math.round(value)}%`;
    case 'number':
    default:
      return Math.round(value).toLocaleString();
  }
}

// Mini trend chart with gradient area
function MiniTrendChart({ data, color = "#9B87F5", showAxes = false, valueType = 'number' }: { 
  data: TrendDataPoint[]; 
  color?: string; 
  showAxes?: boolean;
  valueType?: 'time' | 'percentage' | 'number';
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data || data.length === 0) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();

    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = showAxes 
      ? { top: 10, right: 20, bottom: 30, left: 50 }
      : { top: 2, right: 2, bottom: 2, left: 2 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 1])
      .range([innerHeight, 0])
      .nice();

    // Draw axes if showAxes is true
    if (showAxes) {
      // X axis
      const xAxis = d3.axisBottom(xScale)
        .ticks(6)
        .tickFormat(d => {
          const date = d as Date;
          return d3.timeFormat("%b %d")(date);
        });

      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "11px")
        .style("fill", "#6B7280");

      g.selectAll(".domain, .tick line")
        .style("stroke", "#E5E7EB");

      // Y axis
      const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => {
          const value = d as number;
          return formatTrendValue(value, valueType);
        });

      g.append("g")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "11px")
        .style("fill", "#6B7280");

      g.selectAll(".domain, .tick line")
        .style("stroke", "#E5E7EB");
    }

    // Define gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", `area-gradient-${Math.random().toString(36).substr(2, 9)}`)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0.3);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0);

    // Area generator
    const area = d3.area<TrendDataPoint>()
      .x(d => xScale(d.date))
      .y0(innerHeight)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Line generator
    const line = d3.line<TrendDataPoint>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw area with gradient
    g.append("path")
      .datum(data)
      .attr("fill", `url(#${gradient.attr("id")})`)
      .attr("d", area);

    // Draw line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Add tooltip interaction if showAxes is true
    if (showAxes && tooltipRef.current) {
      const tooltip = d3.select(tooltipRef.current);

      // Create invisible overlay for mouse events
      const overlay = g.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "none")
        .attr("pointer-events", "all");

      // Create vertical line for hover
      const verticalLine = g.append("line")
        .attr("stroke", "#9CA3AF")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3")
        .style("opacity", 0);

      // Create circle for hover point
      const hoverCircle = g.append("circle")
        .attr("r", 4)
        .attr("fill", color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("opacity", 0);

      overlay.on("mousemove", function(event) {
        const [mouseX] = d3.pointer(event);
        const date = xScale.invert(mouseX);
        
        // Find closest data point
        const bisect = d3.bisector((d: TrendDataPoint) => d.date).left;
        const index = bisect(data, date);
        const d0 = data[index - 1];
        const d1 = data[index];
        
        if (!d0 && !d1) return;
        
        const closestPoint = !d0 ? d1 : !d1 ? d0 : 
          date.getTime() - d0.date.getTime() > d1.date.getTime() - date.getTime() ? d1 : d0;

        const x = xScale(closestPoint.date);
        const y = yScale(closestPoint.value);

        // Update vertical line
        verticalLine
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", 0)
          .attr("y2", innerHeight)
          .style("opacity", 1);

        // Update hover circle
        hoverCircle
          .attr("cx", x)
          .attr("cy", y)
          .style("opacity", 1);

        // Update tooltip
        const containerRect = container.getBoundingClientRect();
        const tooltipX = x + margin.left;
        const tooltipY = y + margin.top;

        tooltip
          .style("opacity", 1)
          .style("left", `${tooltipX}px`)
          .style("top", `${tooltipY - 10}px`)
          .html(`
            <div style="font-size: 12px; font-weight: 600; margin-bottom: 4px;">
              ${d3.timeFormat("%B %d, %Y")(closestPoint.date)}
            </div>
            <div style="font-size: 14px; font-weight: 700; color: ${color};">
              ${formatTrendValue(closestPoint.value, valueType)}
            </div>
          `);
      });

      overlay.on("mouseout", function() {
        verticalLine.style("opacity", 0);
        hoverCircle.style("opacity", 0);
        tooltip.style("opacity", 0);
      });
    }
  }, [data, color, showAxes, valueType]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full" />
      {showAxes && (
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none bg-white border border-gray-200 rounded-lg shadow-lg p-3 transition-opacity"
          style={{ opacity: 0, transform: "translate(-50%, -100%)" }}
        />
      )}
    </div>
  );
}

interface StatWidgetProps {
  title: string;
  widgetId?: string;
  value: string;
  impact?: {
    percentage: string;
    direction: "up" | "down";
  };
  showInfo?: boolean;
  minColumns?: 1 | 2 | 3 | 4;
  onMaximize?: () => void;
  onRemove?: () => void;
  onDuplicate?: () => void;
  minimal?: boolean;
  tooltipText?: string;
  scope?: "Both" | "Voice" | "Digital";
  trendData?: TrendDataPoint[];
  isUpPositive?: boolean; // true = up is good (green), false = up is bad (red)
  valueType?: 'time' | 'percentage' | 'number';
  isDraggable?: boolean;
}

export function StatWidget({ 
  title,
  widgetId,
  value, 
  impact, 
  showInfo = true,
  minColumns = 1,
  onMaximize,
  onRemove,
  onDuplicate,
  minimal = false,
  tooltipText,
  scope = "Both",
  trendData,
  isUpPositive = true,
  valueType = 'number',
  isDraggable = false
}: StatWidgetProps) {
  // Determine if current state is positive or negative
  const isPositive = impact?.direction === "up" ? isUpPositive : !isUpPositive;
  const impactColor = isPositive ? "#008E52" : "#D90A45";
  const chartColor = isPositive ? "#52C926" : "#FF1356";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVerticalLayout, setIsVerticalLayout] = React.useState(false);
  
  // Detect if container is tall enough for vertical layout
  useEffect(() => {
    if (!containerRef.current || !trendData || minimal) return; // Don't check layout if minimal mode
    
    const checkLayout = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        // If height > 200px, use vertical layout (chart below stats)
        setIsVerticalLayout(height > 200);
      }
    };
    
    checkLayout();
    
    const resizeObserver = new ResizeObserver(checkLayout);
    resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, [trendData, minimal]);
  
  // Remove +/- sign from percentage since the arrow already indicates direction
  const cleanPercentage = impact?.percentage.replace(/^[+-]/, '');
  
  // Shared content - different styles for minimal vs normal mode
  const statContent = minimal ? (
    // Minimal mode: same structure as Conversation Volume maximized view
    <div className="flex flex-col h-full w-full p-6 gap-6">
      {/* Stats section at top */}
      <div className="flex items-baseline gap-4 flex-shrink-0">
        {/* Large Value */}
        <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-none text-[64px] text-black">
          {value}
        </p>
        {/* Large Impact */}
        {impact && (
          <div className="flex gap-2 items-baseline">
            <div className="scale-[1.5]">
              {impact.direction === "up" ? <UpIcon color={impactColor} /> : <DownIcon color={impactColor} />}
            </div>
            <p 
              className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-none text-[24px]"
              style={{ color: impactColor }}
            >
              {cleanPercentage}
            </p>
          </div>
        )}
      </div>
      
      {/* Chart section - takes remaining space */}
      {trendData && trendData.length > 0 && (
        <div className="flex-1 w-full min-h-0">
          <MiniTrendChart data={trendData} color={chartColor} showAxes={true} valueType={valueType} />
        </div>
      )}
    </div>
  ) : (
    // Normal mode: responsive layout with trend chart
    <div ref={containerRef} className="flex h-full max-h-full overflow-hidden min-h-px min-w-px relative w-full">
      {/* Always use layout without chart - spark charts hidden */}
      <div className="flex flex-row items-end h-full w-full">
        <div className="content-end flex flex-wrap items-end justify-between pb-[12px] pt-px px-[12px] relative size-full">
          <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
            <div className="content-stretch flex gap-px items-end relative shrink-0">
              <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-none relative shrink-0 text-[27px] text-black">
                {value}
              </p>
              {impact && (
                <div className="content-stretch flex gap-[2px] items-center pb-[2px] relative shrink-0">
                  {impact.direction === "up" ? <UpIcon color={impactColor} /> : <DownIcon color={impactColor} />}
                  <p 
                    className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2] relative shrink-0 text-[12px]"
                    style={{ color: impactColor }}
                  >
                    {cleanPercentage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If minimal mode, return just the content
  if (minimal) {
    return statContent;
  }

  // Otherwise, wrap in Widget
  return (
    <Widget
      title={title}
      widgetId={widgetId}
      minHeight={88}
      minColumns={1}
      showMenuButton={true}
      showInfoIcon={showInfo}
      showFilterButton={true}
      tooltipText={tooltipText}
      scope={scope}
      onMaximize={onMaximize}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
      isDraggable={isDraggable}
    >
      {statContent}
    </Widget>
  );
}