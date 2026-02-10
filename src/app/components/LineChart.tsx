import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  value: number;
}

interface Series {
  name: string;
  color: string;
  data: DataPoint[];
  strokeDasharray?: string;
}

interface LineChartProps {
  series?: Series[];
  totalValue?: string;
  percentageChange?: string;
}

export function LineChart({ 
  series: propSeries,
  totalValue = "6.9k",
  percentageChange = "+2%"
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    date: Date;
    showLeft: boolean;
  } | null>(null);
  
  // Track which series are visible (all visible by default)
  const [visibleSeries, setVisibleSeries] = useState<Set<string>>(new Set());
  
  // Track which series is being hovered in the legend
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);
  
  const series = propSeries || defaultSeries;
  
  // Initialize visible series when series changes
  useEffect(() => {
    setVisibleSeries(new Set(series.map(s => s.name)));
  }, [series]);
  
  // Toggle series visibility
  const toggleSeries = (seriesName: string) => {
    setVisibleSeries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(seriesName)) {
        newSet.delete(seriesName);
      } else {
        newSet.add(seriesName);
      }
      return newSet;
    });
  };
  
  // Filter series based on visibility
  const filteredSeries = series.filter(s => visibleSeries.has(s.name));
  
  // Datos estáticos del tooltip (siempre los mismos)
  const staticTooltipData = [
    { name: 'Total', value: 6979, color: '#9B87F5', isParent: true, hasChildren: false, voicePercent: 95, digitalPercent: 5 },
    { name: 'Answered', value: 4323, color: '#E879F9', isParent: true, hasChildren: true, voicePercent: 93, digitalPercent: 7 },
    { name: 'Answered by human agent', value: 4000, color: '', isParent: false, hasChildren: false, voicePercent: 100, digitalPercent: 0 },
    { name: 'Answered by AI', value: 323, color: '', isParent: false, hasChildren: false, voicePercent: 0, digitalPercent: 100 },
    { name: 'Missed', value: 342, color: '#60A5FA', isParent: true, hasChildren: false, voicePercent: 98, digitalPercent: 2 },
    { name: 'Abandoned', value: 2435, color: '#FB923C', isParent: true, hasChildren: false, voicePercent: 97, digitalPercent: 3 },
    { name: 'Unanswered transferred', value: 123, color: '#4ADE80', isParent: true, hasChildren: false, voicePercent: 100, digitalPercent: 0 },
    { name: 'Outbound', value: 98, color: '#F0ABFC', isParent: true, hasChildren: true, voicePercent: 51, digitalPercent: 49 },
    { name: 'Connected', value: 50, color: '', isParent: false, hasChildren: false, voicePercent: 100, digitalPercent: 0 },
    { name: 'Cancelled', value: 12, color: '', isParent: false, hasChildren: false, voicePercent: 100, digitalPercent: 0 },
    { name: 'Unsuccessful callbacks attem...', value: 13, color: '', isParent: false, hasChildren: false, voicePercent: 100, digitalPercent: 0 },
    { name: 'Successful callbacks attempted', value: 13, color: '', isParent: false, hasChildren: false, voicePercent: 100, digitalPercent: 0 },
    { name: 'Digital outbound conversations', value: 10, color: '', isParent: false, hasChildren: false, voicePercent: 0, digitalPercent: 100 },
  ];
  
  // Detect if percentage change is positive or negative
  const isPositive = percentageChange.startsWith('+');
  const impactColor = isPositive ? '#008E52' : '#D32F2F';
  
  // Remove +/- sign from percentage since the arrow already indicates direction
  const cleanPercentage = percentageChange.replace(/^[+-]/, '');

  // Mock data si no se proporciona
  const defaultSeries: Series[] = [
    {
      name: 'Total',
      color: '#9B87F5',
      strokeDasharray: '4,4',
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 2, 19 + i),
        value: 95 + Math.random() * 10
      }))
    },
    {
      name: 'Answered',
      color: '#E879F9',
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 2, 19 + i),
        value: 75 + Math.random() * 5
      }))
    },
    {
      name: 'Missed',
      color: '#60A5FA',
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 2, 19 + i),
        value: 50 + Math.random() * 10
      }))
    },
    {
      name: 'Abandoned',
      color: '#FB923C',
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 2, 19 + i),
        value: 45 + Math.random() * 15
      }))
    },
    {
      name: 'Unanswered transferred call',
      color: '#4ADE80',
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 2, 19 + i),
        value: 25 + Math.random() * 5
      }))
    },
    {
      name: 'Outbound',
      color: '#F0ABFC',
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 2, 19 + i),
        value: 15 + Math.random() * 10
      }))
    },
    {
      name: 'Other',
      color: '#F97316',
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 2, 19 + i),
        value: 10 + Math.random() * 5
      }))
    }
  ];

  // Observar cambios en el tamaño del contenedor
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || filteredSeries.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;

    // Limpiar SVG anterior
    d3.select(svgRef.current).selectAll('*').remove();

    // Configuración de márgenes
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const innerWidth = dimensions.width - margin.left - margin.right;
    const innerHeight = dimensions.height - margin.top - margin.bottom;

    if (innerWidth <= 0 || innerHeight <= 0) return;

    // Crear SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    // Grupo principal
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Calcular el dominio Y considerando todas las series
    const allValues = filteredSeries.flatMap(s => s.data.map(d => d.value));
    const maxValue = d3.max(allValues) as number;

    // Escalas
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(filteredSeries[0].data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([innerHeight, 0])
      .nice();

    // Dibujar ejes PRIMERO (para que las líneas del grid queden detrás)
    
    // Eje X
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(d => d3.timeFormat('%b %-d')(d as Date));

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .call(g => g.select('.domain').attr('stroke', '#E5E7EB'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#E5E7EB'))
      .call(g => g.selectAll('.tick text')
        .attr('fill', '#9CA3AF')
        .attr('font-size', '11px')
        .attr('font-family', 'SF Pro, sans-serif'));

    // Eje Y (incluye las líneas horizontales del grid)
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => d3.format('.0f')(d as number));

    g.append('g')
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', '#E5E7EB')
        .attr('x2', innerWidth))
      .call(g => g.selectAll('.tick text')
        .attr('fill', '#9CA3AF')
        .attr('font-size', '11px')
        .attr('font-family', 'SF Pro, sans-serif'));

    // Dibujar líneas del gráfico DESPUÉS (para que queden por encima del grid)
    filteredSeries.forEach(s => {
      const line = d3
        .line<DataPoint>()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX);

      // Determinar opacidad basada en hover de leyenda
      const opacity = hoveredLegend ? (s.name === hoveredLegend ? 1 : 0.1) : 1;

      g.append('path')
        .datum(s.data)
        .attr('fill', 'none')
        .attr('stroke', s.color)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', s.strokeDasharray || null)
        .attr('stroke-opacity', opacity)
        .attr('d', line);
    });

    // Agregar overlay invisible para capturar hover
    const bisectDate = d3.bisector((d: DataPoint) => d.date).left;
    
    // Crear grupo para el tooltip (línea vertical y puntos)
    const tooltipGroup = g.append('g')
      .style('display', 'none');
    
    // Línea vertical del tooltip
    tooltipGroup.append('line')
      .attr('class', 'tooltip-line')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#9CA3AF')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2');
    
    // Puntos para cada serie
    filteredSeries.forEach(s => {
      tooltipGroup.append('circle')
        .attr('class', `tooltip-circle-${s.name}`)
        .attr('r', 4)
        .attr('fill', s.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
    });
    
    // Overlay para capturar mouse events
    g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', function(event) {
        const [mouseX] = d3.pointer(event);
        const x0 = xScale.invert(mouseX);
        
        // Encontrar el índice del dato más cercano
        const i = bisectDate(filteredSeries[0].data, x0, 1);
        const d0 = filteredSeries[0].data[i - 1];
        const d1 = filteredSeries[0].data[i];
        
        if (!d0 || !d1) return;
        
        const d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;
        const dataIndex = filteredSeries[0].data.indexOf(d);
        
        // Actualizar posición de la línea vertical
        const xPos = xScale(d.date);
        tooltipGroup.select('.tooltip-line')
          .attr('x1', xPos)
          .attr('x2', xPos);
        
        // Actualizar posición de los puntos
        filteredSeries.forEach(s => {
          const yPos = yScale(s.data[dataIndex].value);
          tooltipGroup.select(`.tooltip-circle-${s.name}`)
            .attr('cx', xPos)
            .attr('cy', yPos);
        });
        
        tooltipGroup.style('display', null);
        
        // Calcular posición del tooltip en coordenadas de pantalla
        const svgRect = svgRef.current!.getBoundingClientRect();
        const tooltipX = svgRect.left + margin.left + xPos;
        const tooltipY = svgRect.top + margin.top;
        
        // Determinar si el tooltip debe mostrarse a la izquierda o derecha
        // basado en si hay suficiente espacio a la derecha
        const viewportWidth = window.innerWidth;
        const tooltipWidth = 350; // Ancho aproximado del tooltip
        const showLeft = (tooltipX + tooltipWidth + 20) > viewportWidth;
        
        setTooltipData({
          x: tooltipX,
          y: tooltipY,
          date: d.date,
          showLeft
        });
      })
      .on('mouseleave', function() {
        tooltipGroup.style('display', 'none');
        setTooltipData(null);
      });
  }, [filteredSeries, dimensions, hoveredLegend]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header con valor total */}
      <div className="px-[16px] pt-[0px] pb-[8px] pr-[16px] pl-[24px] py-[0px]">
        <div className="flex items-baseline gap-2">
          <span className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-none relative shrink-0 text-[27px] text-black">{totalValue}</span>
          <span className="text-[12px] flex items-center gap-[2px] pb-[2px]" style={{ color: impactColor }}>
            <svg 
              className="relative shrink-0 size-[12px]" 
              fill="none" 
              preserveAspectRatio="none" 
              viewBox="0 0 12 12"
              style={{ transform: isPositive ? 'none' : 'rotate(180deg) translateY(-2px)' }}
            >
              <g>
                <path 
                  d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6"
                  stroke={impactColor}
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2]">
              {cleanPercentage}
            </span>
          </span>
        </div>
      </div>

      {/* Gráfico */}
      <div 
        ref={containerRef} 
        className="flex-1 min-h-0 w-full pt-[0px] pr-[0px] pb-[0px] pl-[4px] relative p-[0px]"
        onMouseLeave={() => setTooltipData(null)}
      >
        <svg ref={svgRef} className="w-full h-full" />
        
        {/* Tooltip */}
        {tooltipData && (
          <div
            className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-3 pointer-events-none z-50"
            style={{
              left: tooltipData.showLeft ? `${tooltipData.x - 360}px` : `${tooltipData.x + 10}px`,
              top: `${tooltipData.y}px`,
              transform: 'translateY(-50%)'
            }}
          >
            <div className="text-[11px] text-gray-500 mb-2">
              {d3.timeFormat('%b %-d, %Y')(tooltipData.date)}
            </div>
            
            {/* Header row */}
            <div className="grid grid-cols-[1fr_auto_50px_50px] gap-3 pb-1 mb-1 border-b border-gray-200">
              <div></div>
              <div></div>
              <div className="text-[10px] text-gray-500 font-medium text-right">Voice</div>
              <div className="text-[10px] text-gray-500 font-medium text-right">Digital</div>
            </div>
            
            {/* Data rows */}
            <div className="space-y-0.5">
              {staticTooltipData.map((item, index) => (
                <div 
                  key={`${item.name}-${index}`}
                  className="grid grid-cols-[1fr_auto_50px_50px] gap-3 items-center"
                  style={{ paddingLeft: item.isParent ? '0' : '16px' }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {item.color && (
                      <div 
                        className="w-2 h-2 rounded-full shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                    {!item.color && <div className="w-2 shrink-0" />}
                    <span className={`text-[11px] ${item.isParent ? 'font-medium text-gray-900' : 'text-gray-600'} truncate`}>
                      {item.name}
                    </span>
                  </div>
                  <span className={`text-[11px] ${item.isParent ? 'font-medium' : 'font-normal'} text-gray-900 text-right`}>
                    {item.value}
                  </span>
                  <span className="text-[11px] text-gray-600 text-right">
                    {item.voicePercent}%
                  </span>
                  <span className="text-[11px] text-gray-600 text-right">
                    {item.digitalPercent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="px-4 pb-[16px] flex flex-wrap gap-x-4 gap-y-2 pt-[0px] pr-[16px] pl-[24px]">
        {series.map(s => {
          const isVisible = visibleSeries.has(s.name);
          return (
            <div 
              key={s.name} 
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity select-none"
              onClick={() => toggleSeries(s.name)}
              onMouseEnter={() => setHoveredLegend(s.name)}
              onMouseLeave={() => setHoveredLegend(null)}
            >
              <div className="flex items-center">
                {isVisible ? (
                  s.strokeDasharray ? (
                    <svg width="16" height="2" className="mr-1">
                      <line 
                        x1="0" 
                        y1="1" 
                        x2="16" 
                        y2="1" 
                        stroke={s.color} 
                        strokeWidth="2"
                        strokeDasharray="3,3"
                      />
                    </svg>
                  ) : (
                    <div 
                      className="w-4 h-0.5 mr-1" 
                      style={{ backgroundColor: s.color }}
                    />
                  )
                ) : (
                  <div className="w-4 h-0.5 mr-1" />
                )}
              </div>
              <span 
                className="text-[11px] transition-opacity"
                style={{ 
                  color: isVisible ? '#6B7280' : '#D1D5DB',
                }}
              >
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}