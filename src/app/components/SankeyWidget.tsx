import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Widget } from './Widget';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import Container from '../../imports/Container';

interface SankeyData {
  nodes: Array<{ id: string; label: string }>;
  links: Array<{ source: string; target: string; value: number }>;
}

const sankeyData: SankeyData = {
  "nodes": [
    {"id": "conversations_b", "label": "Conversations"},
    {"id": "inbound", "label": "Inbound"},
    {"id": "answered_b", "label": "Answered"},
    {"id": "conv_ai_d", "label": "Conversation by AI"},
    {"id": "conv_human_b", "label": "Conversation by Human agents"},
    {"id": "callback_req_v", "label": "Callback requested"},
    {"id": "unanswered_b", "label": "Unanswered"},
    {"id": "missed", "label": "Missed"},
    {"id": "missed_voicemails", "label": "Voicemails"},
    {"id": "queue_timeout", "label": "Queue timeout"},
    {"id": "agent_closed", "label": "Agent closed"},
    {"id": "agent_timeout", "label": "Agent timeout"},
    {"id": "other_missed", "label": "Missed without voicemails"},
    {"id": "abandoned", "label": "Abandoned"},
    {"id": "abandoned_queue_b", "label": "Abandoned queue"},
    {"id": "abandoned_rang_v", "label": "Abandoned rang"},
    {"id": "unanswered_transferred_v", "label": "Unanswered transferred calls"},
    {"id": "call_messages", "label": "Call messages"},
    {"id": "other_voicemails", "label": "Other voicemails"},
    {"id": "spam_calls", "label": "Spam calls"},
    {"id": "outbound", "label": "Outbound"},
    {"id": "initiated", "label": "Initiated"},
    {"id": "connected", "label": "Connected"},
    {"id": "cancelled", "label": "Cancelled calls"},
    {"id": "digital_conversations", "label": "Digital conversations"},
    {"id": "agent_cancelled", "label": "Agent cancelled"},
    {"id": "system_timeout_cancel", "label": "Other cancelled calls"},
    {"id": "customer_declined", "label": "Customer Declined/Missed"},
    {"id": "callback_attempts", "label": "Callback attempts"},
    {"id": "successful_callbacks", "label": "Successful callbacks"},
    {"id": "unsuccessful_callbacks", "label": "Unsuccessful callbacks"},
    {"id": "missed_by_customer_v", "label": "Missed by customer"},
    {"id": "missed_by_cc_v", "label": "Missed by contact center"}
  ],
  "links": [
    {"source": "conversations_b", "target": "inbound", "value": 70000},
    {"source": "inbound", "target": "answered_b", "value": 40000},
    {"source": "answered_b", "target": "conv_ai_d", "value": 15000},
    {"source": "answered_b", "target": "conv_human_b", "value": 25000},
    {"source": "inbound", "target": "callback_req_v", "value": 5000},
    {"source": "inbound", "target": "unanswered_b", "value": 25000},
    {"source": "unanswered_b", "target": "missed", "value": 8500},
    {"source": "missed", "target": "missed_voicemails", "value": 3000},
    {"source": "missed", "target": "queue_timeout", "value": 2500},
    {"source": "missed", "target": "agent_closed", "value": 1500},
    {"source": "missed", "target": "agent_timeout", "value": 500},
    {"source": "missed", "target": "other_missed", "value": 1000},
    {"source": "unanswered_b", "target": "abandoned", "value": 7000},
    {"source": "abandoned", "target": "abandoned_queue_b", "value": 5000},
    {"source": "abandoned", "target": "abandoned_rang_v", "value": 2000},
    {"source": "unanswered_b", "target": "unanswered_transferred_v", "value": 3000},
    {"source": "unanswered_b", "target": "call_messages", "value": 1000},
    {"source": "unanswered_b", "target": "other_voicemails", "value": 1000},
    {"source": "unanswered_b", "target": "spam_calls", "value": 1000},
    {"source": "conversations_b", "target": "outbound", "value": 30000},
    {"source": "outbound", "target": "initiated", "value": 20000},
    {"source": "initiated", "target": "connected", "value": 13000},
    {"source": "initiated", "target": "cancelled", "value": 5000},
    {"source": "initiated", "target": "digital_conversations", "value": 2000},
    {"source": "cancelled", "target": "agent_cancelled", "value": 1000},
    {"source": "cancelled", "target": "system_timeout_cancel", "value": 2500},
    {"source": "cancelled", "target": "customer_declined", "value": 1500},
    {"source": "outbound", "target": "callback_attempts", "value": 10000},
    {"source": "callback_attempts", "target": "successful_callbacks", "value": 6000},
    {"source": "callback_attempts", "target": "unsuccessful_callbacks", "value": 4000},
    {"source": "unsuccessful_callbacks", "target": "missed_by_customer_v", "value": 2500},
    {"source": "unsuccessful_callbacks", "target": "missed_by_cc_v", "value": 1500}
  ]
};

// Design constants
const COLORS = {
  primaryNode: '#6EA6E2',
  primaryNodeHover: '#5A91CC',
  link: '#EAF2FA',
  linkHover: '#D0E6F5',
  linkHighlight: '#BDE8FF',
  text: '#333333',
  textSecondary: '#6B7280',
  background: '#FFFFFF'
};

const LAYOUT = {
  nodeWidth: 8,
  minNodeHeight: 20,

  // Layout + spacing (mirrors code.js)
  levelSpacing: 300,
  maxTotalHeight: 800,
  minNodePadding: 20,
  labelHeight: 50,
  labelTopMargin: 16,
  diagramPaddingX: 50,
  diagramPaddingY: 50,

  // UI affordances
  nodeRadius: 4,
  labelOffset: 12,
  chevronSize: 12
};

// Calculate node depth/level in the graph
function calculateNodeLevels(data: SankeyData): Map<string, number> {
  const levels = new Map<string, number>();
  const visited = new Set<string>();
  
  const targetNodes = new Set(data.links.map(l => l.target));
  const rootNodes = data.nodes
    .map(n => n.id)
    .filter(id => !targetNodes.has(id));
  
  const queue: Array<{ id: string; level: number }> = rootNodes.map(id => ({ id, level: 0 }));
  
  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    
    if (visited.has(id)) continue;
    visited.add(id);
    levels.set(id, level);
    
    const children = data.links
      .filter(l => l.source === id)
      .map(l => l.target);
    
    for (const childId of children) {
      if (!visited.has(childId)) {
        queue.push({ id: childId, level: level + 1 });
      }
    }
  }
  
  return levels;
}


// --- Sankey layout helpers (ported from the Figma plugin code.js) ---

type NodeLayout = {
  id: string;
  label: string;
  x: number;
  y: number;
  height: number;
  level: number;
  value: number;
  percentage: number;
};

type LinkLayout = {
  source: string;
  target: string;
  value: number;
  sourceY: number;
  targetY: number;
  sourceHeight: number;
  targetHeight: number;
};

function calculateNodeValues(data: SankeyData): Record<string, number> {
  const nodeValues: Record<string, number> = {};
  for (const node of data.nodes) {
    const incomingValue = data.links
      .filter(l => l.target === node.id)
      .reduce((sum, l) => sum + l.value, 0);

    const outgoingValue = data.links
      .filter(l => l.source === node.id)
      .reduce((sum, l) => sum + l.value, 0);

    nodeValues[node.id] = Math.max(incomingValue, outgoingValue, 1);
  }
  return nodeValues;
}

// Scale factor so the *largest column total* fits in LAYOUT.maxTotalHeight
function calculateValueScale(
  data: SankeyData,
  nodeLevels: Map<string, number>,
  nodeValues: Record<string, number>
): number {
  const nodesByLevel = new Map<number, string[]>();
  for (const node of data.nodes) {
    const level = nodeLevels.get(node.id) ?? 0;
    const arr = nodesByLevel.get(level) ?? [];
    arr.push(node.id);
    nodesByLevel.set(level, arr);
  }

  let maxLevelValue = 0;
  for (const ids of nodesByLevel.values()) {
    const levelTotal = ids.reduce((sum, id) => sum + (nodeValues[id] ?? 0), 0);
    maxLevelValue = Math.max(maxLevelValue, levelTotal);
  }

  return maxLevelValue > 0 ? LAYOUT.maxTotalHeight / maxLevelValue : 1;
}

// Percentages are based on node values relative to the *sum of parent node values*
function calculateNodePercentages(
  data: SankeyData,
  nodeValues: Record<string, number>
): Record<string, number> {
  const percentages: Record<string, number> = {};

  for (const node of data.nodes) {
    const incomingLinks = data.links.filter(l => l.target === node.id);
    if (incomingLinks.length === 0) {
      percentages[node.id] = 100;
      continue;
    }

    const totalParentValue = incomingLinks.reduce((sum, l) => {
      return sum + (nodeValues[l.source] ?? 0);
    }, 0);

    percentages[node.id] = totalParentValue > 0
      ? ((nodeValues[node.id] ?? 1) / totalParentValue) * 100
      : 100;
  }

  return percentages;
}

function calculateNodeLayouts(
  data: SankeyData,
  nodeLevels: Map<string, number>,
  valueScale: number,
  nodeValues: Record<string, number>,
  nodePercentages: Record<string, number>
): NodeLayout[] {
  const layouts: NodeLayout[] = [];

  // Group nodes by level
  const nodesByLevel = new Map<number, string[]>();
  for (const node of data.nodes) {
    const level = nodeLevels.get(node.id) ?? 0;
    const arr = nodesByLevel.get(level) ?? [];
    arr.push(node.id);
    nodesByLevel.set(level, arr);
  }

  const maxLevel = Math.max(...Array.from(nodesByLevel.keys()));

  // Helper: compute placed height of a node (height + padding)
  const nodeSlotHeight = (nodeId: string) => {
    const value = nodeValues[nodeId] ?? 1;
    const height = Math.max(value * valueScale, LAYOUT.minNodeHeight);
    const padding = Math.max(LAYOUT.minNodePadding, LAYOUT.labelHeight - height / 2);
    return { height, slotHeight: height + padding };
  };

  // Helper: compute total height a group of nodes will occupy
  const groupTotalHeight = (ids: string[]) =>
    ids.reduce((sum, id) => sum + nodeSlotHeight(id).slotHeight, 0);

  // Position nodes with dynamic padding + stable ordering (group by parent)
  Array.from(nodesByLevel.entries())
    .sort(([a], [b]) => a - b)
    .forEach(([level, nodeIds]) => {
      const x = level * LAYOUT.levelSpacing + LAYOUT.diagramPaddingX;
      const isLastLevel = level === maxLevel;

      const nodesByParent = new Map<string, string[]>();
      const rootNodes: string[] = [];

      for (const nodeId of nodeIds) {
        const parentLinks = data.links.filter(l => l.target === nodeId);
        if (parentLinks.length === 0) {
          rootNodes.push(nodeId);
        } else {
          for (const link of parentLinks) {
            const arr = nodesByParent.get(link.source) ?? [];
            if (!arr.includes(nodeId)) arr.push(nodeId);
            nodesByParent.set(link.source, arr);
          }
        }
      }

      // Sort within groups by value (desc) to reduce crossings
      rootNodes.sort((a, b) => (nodeValues[b] ?? 0) - (nodeValues[a] ?? 0));
      for (const [parent, ids] of nodesByParent.entries()) {
        ids.sort((a, b) => (nodeValues[b] ?? 0) - (nodeValues[a] ?? 0));
        nodesByParent.set(parent, ids);
      }

      let currentY = LAYOUT.diagramPaddingY;

      const placeNode = (nodeId: string, y: number) => {
        const node = data.nodes.find(n => n.id === nodeId);
        if (!node) return;
        const value = nodeValues[nodeId] ?? 1;
        const height = Math.max(value * valueScale, LAYOUT.minNodeHeight);
        const percentage = nodePercentages[nodeId] ?? 100;
        layouts.push({ id: nodeId, label: node.label || nodeId, x, y, height, level, value, percentage });
      };

      if (isLastLevel && nodesByParent.size > 0) {
        // Place root nodes (if any) sequentially
        for (const nodeId of rootNodes) {
          placeNode(nodeId, currentY);
          currentY += nodeSlotHeight(nodeId).slotHeight;
        }

        // Sort parent groups by parent's Y position
        const sortedParentEntries = Array.from(nodesByParent.entries())
          .sort(([a], [b]) => {
            const la = layouts.find(l => l.id === a);
            const lb = layouts.find(l => l.id === b);
            return (la?.y ?? 0) - (lb?.y ?? 0);
          });

        for (const [parent, ids] of sortedParentEntries) {
          const parentLayout = layouts.find(l => l.id === parent);
          if (parentLayout) {
            const groupHeight = groupTotalHeight(ids);
            const parentMidY = parentLayout.y + parentLayout.height / 2;
            // Center the group on the parent's midpoint, but never go above currentY
            const centeredStart = parentMidY - groupHeight / 2;
            currentY = Math.max(currentY, centeredStart);
          }
          for (const nodeId of ids) {
            placeNode(nodeId, currentY);
            currentY += nodeSlotHeight(nodeId).slotHeight;
          }
        }
      } else {
        const sortedIds: string[] = [...rootNodes];
        for (const ids of nodesByParent.values()) {
          sortedIds.push(...ids);
        }
        for (const nodeId of sortedIds) {
          placeNode(nodeId, currentY);
          currentY += nodeSlotHeight(nodeId).slotHeight;
        }
      }
    });

  return layouts;
}

function calculateLinkLayouts(data: SankeyData, nodeLayouts: NodeLayout[]): LinkLayout[] {
  const layouts: LinkLayout[] = [];

  const nodeSourceOffsets: Record<string, number> = {};
  const nodeTargetOffsets: Record<string, number> = {};
  const nodeIncomingTotal: Record<string, number> = {};
  const nodeOutgoingTotal: Record<string, number> = {};

  nodeLayouts.forEach(n => {
    nodeSourceOffsets[n.id] = 0;
    nodeTargetOffsets[n.id] = 0;
    nodeIncomingTotal[n.id] = 0;
    nodeOutgoingTotal[n.id] = 0;
  });

  for (const link of data.links) {
    nodeOutgoingTotal[link.source] = (nodeOutgoingTotal[link.source] || 0) + link.value;
    nodeIncomingTotal[link.target] = (nodeIncomingTotal[link.target] || 0) + link.value;
  }

  // Sort links to reduce crossings (source Y, then target Y)
  const sortedLinks = [...data.links].sort((a, b) => {
    const sa = nodeLayouts.find(n => n.id === a.source);
    const sb = nodeLayouts.find(n => n.id === b.source);
    const ta = nodeLayouts.find(n => n.id === a.target);
    const tb = nodeLayouts.find(n => n.id === b.target);
    if (!sa || !sb || !ta || !tb) return 0;
    if (sa.y !== sb.y) return sa.y - sb.y;
    return ta.y - tb.y;
  });

  for (const link of sortedLinks) {
    const sourceNode = nodeLayouts.find(n => n.id === link.source);
    const targetNode = nodeLayouts.find(n => n.id === link.target);
    if (!sourceNode || !targetNode) continue;

    const sourceTotal = nodeOutgoingTotal[link.source] || 1;
    const targetTotal = nodeIncomingTotal[link.target] || 1;

    const sourceProportion = sourceTotal > 0 ? link.value / sourceTotal : 1;
    const targetProportion = targetTotal > 0 ? link.value / targetTotal : 1;

    const sourceHeight = sourceNode.height * sourceProportion;
    const targetHeight = targetNode.height * targetProportion;

    layouts.push({
      source: link.source,
      target: link.target,
      value: link.value,
      sourceY: sourceNode.y + nodeSourceOffsets[link.source],
      targetY: targetNode.y + nodeTargetOffsets[link.target],
      sourceHeight,
      targetHeight
    });

    nodeSourceOffsets[link.source] += sourceHeight;
    nodeTargetOffsets[link.target] += targetHeight;
  }

  return layouts;
}

// Draw a filled "ribbon" between two nodes (top and bottom curves)
function drawLinkRibbon(
  ctx: CanvasRenderingContext2D,
  startX: number,
  endX: number,
  topStartY: number,
  topEndY: number,
  bottomStartY: number,
  bottomEndY: number
) {
  const dx = endX - startX;
  const curvature = 0.5;
  const cp = dx * curvature;

  ctx.beginPath();
  ctx.moveTo(startX, topStartY);
  ctx.bezierCurveTo(startX + cp, topStartY, endX - cp, topEndY, endX, topEndY);
  ctx.lineTo(endX, bottomEndY);
  ctx.bezierCurveTo(endX - cp, bottomEndY, startX + cp, bottomStartY, startX, bottomStartY);
  ctx.closePath();
  ctx.fill();
}

// Get parent node and incoming value
function getParentInfo(data: SankeyData, nodeId: string): { parentId: string | null; value: number; parentTotal: number } | null {
  const incomingLinks = data.links.filter(l => l.target === nodeId);
  if (incomingLinks.length === 0) return null;
  
  // For simplicity, take the first parent (main parent)
  const mainLink = incomingLinks[0];
  const parentId = mainLink.source;
  const value = mainLink.value;
  
  // Calculate parent's total outgoing value
  const parentTotal = data.links
    .filter(l => l.source === parentId)
    .reduce((sum, l) => sum + l.value, 0);
  
  return { parentId, value, parentTotal };
}

// Get children of a node
function getNodeChildren(data: SankeyData, nodeId: string): string[] {
  return data.links
    .filter(l => l.source === nodeId)
    .map(l => l.target);
}

// Check if node has children
function hasChildren(data: SankeyData, nodeId: string): boolean {
  return getNodeChildren(data, nodeId).length > 0;
}

// Get node value
function getNodeValue(data: SankeyData, nodeId: string): number {
  // Sum of all incoming links, or outgoing if no incoming
  const incomingValue = data.links
    .filter(l => l.target === nodeId)
    .reduce((sum, l) => sum + l.value, 0);
  
  if (incomingValue > 0) return incomingValue;
  
  // Root node: sum of outgoing
  return data.links
    .filter(l => l.source === nodeId)
    .reduce((sum, l) => sum + l.value, 0);
}

// Filter data based on expanded nodes
function filterDataByExpanded(data: SankeyData, expandedNodes: Set<string>, maxDepth: number): SankeyData {
  const levels = calculateNodeLevels(data);
  const visibleNodes = new Set<string>();
  
  // Start with root nodes
  const targetNodes = new Set(data.links.map(l => l.target));
  const rootNodes = data.nodes
    .map(n => n.id)
    .filter(id => !targetNodes.has(id));
  
  const queue = [...rootNodes];
  
  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    const level = levels.get(nodeId) || 0;
    
    if (level > maxDepth) continue;
    
    visibleNodes.add(nodeId);
    
    // For levels 0-1, always expand (first 2 levels)
    // For levels 2+, only expand if in expandedNodes set
    const shouldExpand = level <= 1 || expandedNodes.has(nodeId);
    
    if (shouldExpand || !hasChildren(data, nodeId)) {
      const children = getNodeChildren(data, nodeId);
      queue.push(...children);
    }
  }
  
  const filteredNodes = data.nodes.filter(n => visibleNodes.has(n.id));
  const filteredLinks = data.links.filter(
    l => visibleNodes.has(l.source) && visibleNodes.has(l.target)
  );
  
  return {
    nodes: filteredNodes,
    links: filteredLinks
  };
}

// Get connected nodes and links for hover effect - traces entire path from root to hovered node
function getConnectedElements(nodeId: string, links: any[]) {
  const connectedNodes = new Set<string>();
  const connectedLinks = new Set<number>();

  // Build adjacency maps for traversing the graph
  const sourceToTargets = new Map<string, Set<number>>(); // nodeId -> set of link indices
  const targetToSources = new Map<string, Set<number>>(); // nodeId -> set of link indices
  
  links.forEach((link, index) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source?.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target?.id;
    
    if (!sourceToTargets.has(sourceId)) sourceToTargets.set(sourceId, new Set());
    if (!targetToSources.has(targetId)) targetToSources.set(targetId, new Set());
    
    sourceToTargets.get(sourceId)!.add(index);
    targetToSources.get(targetId)!.add(index);
  });

  // Trace backwards from the hovered node to find all ancestor paths
  const visitedNodes = new Set<string>();
  const queue: string[] = [nodeId];
  
  connectedNodes.add(nodeId);
  visitedNodes.add(nodeId);
  
  // BFS backwards to find all ancestors
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    const incomingLinks = targetToSources.get(currentNode) || new Set();
    
    incomingLinks.forEach(linkIndex => {
      const link = links[linkIndex];
      const sourceId = typeof link.source === 'string' ? link.source : link.source?.id;
      
      connectedLinks.add(linkIndex);
      
      if (sourceId && !visitedNodes.has(sourceId)) {
        connectedNodes.add(sourceId);
        visitedNodes.add(sourceId);
        queue.push(sourceId);
      }
    });
  }

  return { connectedNodes, connectedLinks };
}

// Hit-test a point against a ribbon shape using linear interpolation
function isPointInRibbon(
  px: number, py: number,
  startX: number, endX: number,
  topStartY: number, topEndY: number,
  bottomStartY: number, bottomEndY: number
): boolean {
  if (px < startX || px > endX) return false;
  const t = (px - startX) / (endX - startX);
  const topY = topStartY + t * (topEndY - topStartY);
  const bottomY = bottomStartY + t * (bottomEndY - bottomStartY);
  return py >= topY && py <= bottomY;
}

// Get downstream links and nodes for link hover - traces forward from the hovered link's target
function getDownstreamElements(linkIndex: number, links: any[]) {
  if (linkIndex < 0 || linkIndex >= links.length) {
    return { highlightedLinks: new Set<number>(), highlightedNodes: new Set<string>() };
  }
  const link = links[linkIndex];
  const sourceId = typeof link.source === 'string' ? link.source : link.source?.id;
  const targetId = typeof link.target === 'string' ? link.target : link.target?.id;

  const highlightedLinks = new Set<number>([linkIndex]);
  const highlightedNodes = new Set<string>([sourceId, targetId]);

  const queue: string[] = [targetId];
  const visited = new Set<string>([targetId]);

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    links.forEach((l, i) => {
      const lSource = typeof l.source === 'string' ? l.source : l.source?.id;
      const lTarget = typeof l.target === 'string' ? l.target : l.target?.id;
      if (lSource === nodeId) {
        highlightedLinks.add(i);
        highlightedNodes.add(lTarget);
        if (!visited.has(lTarget)) {
          visited.add(lTarget);
          queue.push(lTarget);
        }
      }
    });
  }

  return { highlightedLinks, highlightedNodes };
}

// Format number with k/m suffix
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return num.toString();
}

// Draw chevron icon
function drawChevron(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, direction: 'right' | 'down') {
  ctx.save();
  ctx.fillStyle = COLORS.textSecondary;
  ctx.font = '11px SF Pro, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  const icon = direction === 'right' ? '>' : 'v';
  ctx.fillText(icon, x, y);
  
  ctx.restore();
}

export function SankeyWidget({ onMaximize, onRemove, onDuplicate, minimal = false, isDraggable = false }: { onMaximize?: () => void; onRemove?: () => void; onDuplicate?: () => void; minimal?: boolean; isDraggable?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [zoom, setZoom] = useState(0.9);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredNodeStats, setHoveredNodeStats] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [selectedNodeForDetails, setSelectedNodeForDetails] = useState<{
    nodeId: string;
    nodeName: string;
    value: number;
    percentage: number;
    position: { x: number; y: number };
  } | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set([
      'conversations_b', 
      'inbound', 
      'outbound',
      'answered_b',
      'callback_req_v', 
      'unanswered_b',
      'initiated',
      'callback_attempts'
    ])
  );
  const isPanningRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const nodesDataRef = useRef<any[]>([]);
  const linksDataRef = useRef<any[]>([]);

  // Calculate optimal popover position to keep it visible
  const calculatePopoverPosition = (clickX: number, clickY: number, hasContent: boolean, hasChart: boolean) => {
    const POPOVER_WIDTH = 320;
    const POPOVER_HEIGHT_BASE = 120; // Height without tabs/details
    const POPOVER_HEIGHT_WITH_CONTENT = 450; // Height with tabs or details (with chart)
    const POPOVER_HEIGHT_NO_CHART = 250; // Height with details but no chart
    
    let POPOVER_HEIGHT = POPOVER_HEIGHT_BASE;
    if (hasContent) {
      POPOVER_HEIGHT = hasChart ? POPOVER_HEIGHT_WITH_CONTENT : POPOVER_HEIGHT_NO_CHART;
    }
    
    const MARGIN = 10;
    
    let x = clickX + MARGIN;
    let y = clickY - POPOVER_HEIGHT / 2;
    
    // Check right edge
    if (x + POPOVER_WIDTH > window.innerWidth) {
      x = clickX - POPOVER_WIDTH - MARGIN;
    }
    
    // Check left edge
    if (x < MARGIN) {
      x = MARGIN;
    }
    
    // Check bottom edge
    if (y + POPOVER_HEIGHT > window.innerHeight) {
      y = window.innerHeight - POPOVER_HEIGHT - MARGIN;
    }
    
    // Check top edge
    if (y < MARGIN) {
      y = MARGIN;
    }
    
    return { x, y };
  };

  // Get tab data for specific nodes
  const getNodeTabData = (nodeId: string, totalValue: number) => {
    if (nodeId === 'inbound') {
      const overviewTotal = 742;
      const routingTotal = 485; // Direct(205)+voicemail(37)+message(93)+OtherCC(37)+teamMember(37)+IVR(37)+OtherDigital(39)

      return [
        {
          name: 'Overview',
          items: [
            { label: 'New calls', value: Math.round(totalValue * (400 / overviewTotal)), icon: '📞' },
            { label: 'Transferred from other user or group', value: Math.round(totalValue * (150 / overviewTotal)), icon: '📞' },
            { label: 'Transferred from the same group', value: Math.round(totalValue * (150 / overviewTotal)), icon: '📞' },
            { label: 'Transferred chats', value: Math.round(totalValue * (22 / overviewTotal)), icon: '💬' },
            { label: 'New chats', value: Math.round(totalValue * (20 / overviewTotal)), icon: '💬' },
          ]
        },
        {
          name: 'Routing',
          items: [
            { label: 'Direct', value: Math.round(totalValue * (205 / routingTotal)), icon: 'both' },
            { label: 'To voicemail', value: Math.round(totalValue * (37 / routingTotal)), icon: '📞' },
            { label: 'To message', value: Math.round(totalValue * (93 / routingTotal)), icon: '📞' },
            { label: 'Other CC or Department', value: Math.round(totalValue * (37 / routingTotal)), icon: '📞' },
            { label: 'To a team member', value: Math.round(totalValue * (37 / routingTotal)), icon: '📞' },
            { label: 'IVR', value: Math.round(totalValue * (37 / routingTotal)), icon: '📞' },
            { label: 'Other digital', value: Math.round(totalValue * (39 / routingTotal)), icon: '💬' },
          ]
        }
      ];
    }

    if (nodeId === 'conv_human_b') {
      const overviewTotal = 742; // Customer timeout(400) + Customer closed(300) + Calls by human agent(42)
      const routingTotal = 742; // Manual transfer(400) + Cold transfer(300) + Non transferred(42)

      return [
        {
          name: 'Overview',
          items: [
            { label: 'Customer timeout', value: Math.round(totalValue * (400 / overviewTotal)), icon: '💬' },
            { label: 'Customer closed', value: Math.round(totalValue * (300 / overviewTotal)), icon: '💬' },
            { label: 'Calls by human agent', value: Math.round(totalValue * (42 / overviewTotal)), icon: '📞' },
          ]
        },
        {
          name: 'Routing',
          items: [
            { label: 'Manual transfer', value: Math.round(totalValue * (400 / routingTotal)), icon: '📞' },
            { label: 'Cold transfer', value: Math.round(totalValue * (300 / routingTotal)), icon: 'both' },
            { label: 'Non transferred', value: Math.round(totalValue * (42 / routingTotal)), icon: 'both' },
          ]
        }
      ];
    }

    if (nodeId === 'unanswered_transferred_v') {
      const overviewTotal = 742; // Open(400) + Closed(342)
      const routingTotal = 742; // Router(200)+Auto(200)+Forward(150)+Scripted(150)+DTMF(42)

      return [
        {
          name: 'Overview',
          items: [
            { label: 'Open hours', value: Math.round(totalValue * (400 / overviewTotal)) },
            { label: 'Closed', value: Math.round(totalValue * (342 / overviewTotal)) },
          ]
        },
        {
          name: 'Routing',
          items: [
            { label: 'Router transfer', value: Math.round(totalValue * (200 / routingTotal)) },
            { label: 'Auto-transfer', value: Math.round(totalValue * (200 / routingTotal)) },
            { label: 'Forward transfer', value: Math.round(totalValue * (150 / routingTotal)) },
            { label: 'Scripted IVR transfer', value: Math.round(totalValue * (150 / routingTotal)) },
            { label: 'DTMF transfer', value: Math.round(totalValue * (42 / routingTotal)) },
          ]
        }
      ];
    }

    if (nodeId === 'other_voicemails') {
      const overviewTotal = 742; // Open(400) + Closed(342)
      const routingTotal = 872; // Direct(400)+InQueue(37)+DTMF(93)+Transfer(342)

      return [
        {
          name: 'Overview',
          items: [
            { label: 'Open hours', value: Math.round(totalValue * (400 / overviewTotal)) },
            { label: 'Closed', value: Math.round(totalValue * (342 / overviewTotal)) },
          ]
        },
        {
          name: 'Routing',
          items: [
            { label: 'Direct to voicemail', value: Math.round(totalValue * (400 / routingTotal)) },
            { label: 'In queue voicemail', value: Math.round(totalValue * (37 / routingTotal)) },
            { label: 'DTMF voicemail', value: Math.round(totalValue * (93 / routingTotal)) },
            { label: 'Transfer voicemail', value: Math.round(totalValue * (342 / routingTotal)) },
          ]
        }
      ];
    }

    return undefined;
  };

  // Get detail data for specific nodes (hierarchical, no tabs)
  const getNodeDetailData = (nodeId: string, totalValue: number) => {
    if (nodeId === 'abandoned') {
      const voiceBase = 400;
      const digitalBase = 42;
      const totalBase = voiceBase + digitalBase; // 442

      const voiceValue = Math.round(totalValue * (voiceBase / totalBase));
      const digitalValue = Math.round(totalValue * (digitalBase / totalBase));

      const openBase = 300;
      const closedBase = 100;
      const voiceChildrenTotal = openBase + closedBase; // 400

      const openValue = Math.round(voiceValue * (openBase / voiceChildrenTotal));
      const shortBase = 150;
      const otherBase = 150;
      const openChildrenTotal = shortBase + otherBase; // 300

      return [
        {
          label: 'Voice abandoned',
          value: voiceValue,
          icon: '📞',
          children: [
            {
              label: 'Open hours',
              value: openValue,
              children: [
                { label: 'Short abandoned', value: Math.round(openValue * (shortBase / openChildrenTotal)) },
                { label: 'Other abandoned', value: Math.round(openValue * (otherBase / openChildrenTotal)) }
              ]
            },
            { label: 'Closed hours', value: Math.round(voiceValue * (closedBase / voiceChildrenTotal)) }
          ]
        },
        {
          label: 'Digital abandoned',
          value: digitalValue,
          icon: '💬'
        }
      ];
    }
    
    if (nodeId === 'missed_voicemails') {
      const openBase = 400;
      const closedBase = 342;
      const totalBase = openBase + closedBase; // 742

      return [
        { label: 'Open hours', value: Math.round(totalValue * (openBase / totalBase)) },
        { label: 'Closed', value: Math.round(totalValue * (closedBase / totalBase)) },
      ];
    }

    if (nodeId === 'other_missed') {
      const openBase = 400;
      const closedBase = 342;
      const totalBase = openBase + closedBase; // 742

      return [
        { label: 'Open hours', value: Math.round(totalValue * (openBase / totalBase)) },
        { label: 'Closed hours', value: Math.round(totalValue * (closedBase / totalBase)) },
      ];
    }

    if (nodeId === 'missed') {
      // Same structure as abandoned, but with values adjusted to missed totals
      const voiceBase = 400;
      const digitalBase = 42;
      const totalBase = voiceBase + digitalBase; // 442
      
      const voiceValue = Math.round(totalValue * (voiceBase / totalBase));
      const digitalValue = Math.round(totalValue * (digitalBase / totalBase));
      
      // Calculate children so that open + closed = voiceValue
      const openBase = 300;
      const closedBase = 93;
      const voiceChildrenTotal = openBase + closedBase; // 393
      
      return [
        {
          label: 'Voice missed',
          value: voiceValue,
          icon: '📞',
          children: [
            { label: 'Open hours', value: Math.round(voiceValue * (openBase / voiceChildrenTotal)) },
            { label: 'Closed hours', value: Math.round(voiceValue * (closedBase / voiceChildrenTotal)) }
          ]
        },
        {
          label: 'Digital missed',
          value: digitalValue,
          icon: '💬'
        }
      ];
    }
    
    if (nodeId === 'queue_timeout') {
      return undefined;
    }
    
    if (nodeId === 'call_messages' || nodeId === 'spam_calls') {
      return undefined;
    }
    
    if (nodeId === 'abandoned_queue_b') {
      // Abandoned queue - simple structure without indentation
      const openBase = 400;
      const closedBase = 342;
      const totalBase = openBase + closedBase; // 742
      
      return [
        {
          label: 'Open hours',
          value: Math.round(totalValue * (openBase / totalBase))
        },
        {
          label: 'Closed',
          value: Math.round(totalValue * (closedBase / totalBase))
        }
      ];
    }
    
    if (nodeId === 'abandoned_rang_v') {
      // Abandoned rang - with indented children
      const openBase = 400;
      const closedBase = 342;
      const totalBase = openBase + closedBase; // 742
      
      const openValue = Math.round(totalValue * (openBase / totalBase));
      
      // Children of "Open hours"
      const shortBase = 250;
      const otherBase = 150;
      const openChildrenTotal = shortBase + otherBase; // 400
      
      return [
        {
          label: 'Open hours',
          value: openValue,
          children: [
            { label: 'Short abandoned', value: Math.round(openValue * (shortBase / openChildrenTotal)) },
            { label: 'Other abandoned', value: Math.round(openValue * (otherBase / openChildrenTotal)) }
          ]
        },
        {
          label: 'Closed',
          value: Math.round(totalValue * (closedBase / totalBase))
        }
      ];
    }
    
    if (nodeId === 'abandoned_rang_v') {
      const openBase = 400;
      const closedBase = 342;
      const totalBase = openBase + closedBase; // 742

      const openValue = Math.round(totalValue * (openBase / totalBase));
      const shortBase = 250;
      const otherBase = 150;
      const openChildrenTotal = shortBase + otherBase; // 400

      return [
        {
          label: 'Open hours',
          value: openValue,
          children: [
            { label: 'Short abandoned', value: Math.round(openValue * (shortBase / openChildrenTotal)) },
            { label: 'Other abandoned', value: Math.round(openValue * (otherBase / openChildrenTotal)) }
          ]
        },
        { label: 'Closed', value: Math.round(totalValue * (closedBase / totalBase)) }
      ];
    }

    if (nodeId === 'connected') {
      const manualBase = 300;
      const coldBase = 200;
      const nonBase = 242;
      const totalBase = manualBase + coldBase + nonBase; // 742

      return [
        { label: 'Manual transfer', value: Math.round(totalValue * (manualBase / totalBase)), icon: '📞' },
        { label: 'Cold transfer', value: Math.round(totalValue * (coldBase / totalBase)), icon: 'both' },
        { label: 'Non transferred', value: Math.round(totalValue * (nonBase / totalBase)), icon: 'both' },
      ];
    }
    
    if (nodeId === 'missed_by_customer_v') {
      // Missed by customer - simple structure
      const declinedBase = 400;
      const noAnswerBase = 342;
      const totalBase = declinedBase + noAnswerBase; // 742
      
      return [
        {
          label: 'Customer declined/missed',
          value: Math.round(totalValue * (declinedBase / totalBase))
        },
        {
          label: 'Ring no answer',
          value: Math.round(totalValue * (noAnswerBase / totalBase))
        }
      ];
    }
    
    if (nodeId === 'missed_by_cc_v') {
      // Missed by contact center - with indented children
      const timeoutBase = 400;
      const agentDeclinedBase = 342;
      const totalBase = timeoutBase + agentDeclinedBase; // 742
      
      const agentDeclinedValue = Math.round(totalValue * (agentDeclinedBase / totalBase));
      
      // Children of "Agent declined/missed"
      const customerAcceptedBase = 300;
      const agentDialedBase = 42;
      const agentDeclinedChildrenTotal = customerAcceptedBase + agentDialedBase; // 342
      
      return [
        {
          label: 'Timeout on agent extension',
          value: Math.round(totalValue * (timeoutBase / totalBase))
        },
        {
          label: 'Agent declined/missed',
          value: agentDeclinedValue,
          children: [
            { label: 'Customer accepted/agent declined', value: Math.round(agentDeclinedValue * (customerAcceptedBase / agentDeclinedChildrenTotal)) },
            { label: 'Agent dialed first: agent declined-missed', value: Math.round(agentDeclinedValue * (agentDialedBase / agentDeclinedChildrenTotal)) }
          ]
        }
      ];
    }
    
    return undefined;
  };

  // Debug: Log when selectedNodeForDetails changes
  useEffect(() => {
    console.log('🔍 selectedNodeForDetails changed:', selectedNodeForDetails);
  }, [selectedNodeForDetails]);

  const renderSankey = (canvas: HTMLCanvasElement, zoomLevel: number, offset: { x: number; y: number }) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoomLevel, zoomLevel);

    const margin = { top: 10, right: 180, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    ctx.translate(margin.left, margin.top);

    // Filter data based on expanded nodes
    const filteredData = filterDataByExpanded(sankeyData, expandedNodes, 10);

    // --- Layout logic ported from the Figma plugin (code.js) ---
    // 1) Levels / columns
    const nodeLevels = calculateNodeLevels(filteredData);

    // 2) Node values (max of incoming/outgoing, min 1)
    const nodeValues = calculateNodeValues(filteredData);

    // 3) Scale so the tallest column fits within a fixed max height (compact + consistent)
    const valueScale = calculateValueScale(filteredData, nodeLevels, nodeValues);

    // 4) Percentages relative to parent nodes (based on parent node totals, not just link values)
    const nodePercentages = calculateNodePercentages(filteredData, nodeValues);

    // 5) Node rectangles and link ribbons
    const nodeLayouts = calculateNodeLayouts(filteredData, nodeLevels, valueScale, nodeValues, nodePercentages);
    const linkLayouts = calculateLinkLayouts(filteredData, nodeLayouts);

    // Convert to the shape used by the rest of the widget (hover + labels)
    const nodes = nodeLayouts.map(n => ({
      id: n.id,
      name: n.label,
      x0: n.x,
      x1: n.x + LAYOUT.nodeWidth,
      y0: n.y,
      y1: n.y + n.height,
      value: n.value,
      percentage: n.percentage,
      level: n.level
    }));

    const links = linkLayouts.map(l => ({
      source: l.source,
      target: l.target,
      value: l.value,
      sourceY: l.sourceY,
      targetY: l.targetY,
      sourceHeight: l.sourceHeight,
      targetHeight: l.targetHeight
    }));
// Store for hover detection
    nodesDataRef.current = nodes;
    linksDataRef.current = links;

    // Get connected elements for node hover effect (backward trace)
    const { connectedNodes, connectedLinks } = hoveredNode
      ? getConnectedElements(hoveredNode, links)
      : { connectedNodes: new Set<string>(), connectedLinks: new Set<number>() };

    // Get downstream elements for link hover effect (forward trace)
    const { highlightedLinks, highlightedNodes: linkHighlightedNodes } = hoveredLink !== null
      ? getDownstreamElements(hoveredLink, links)
      : { highlightedLinks: new Set<number>(), highlightedNodes: new Set<string>() };

    // Draw links (filled ribbons like the Figma plugin)
    links.forEach((link: any, index: number) => {
      const sourceNode = nodes.find((n: any) => n.id === link.source);
      const targetNode = nodes.find((n: any) => n.id === link.target);
      if (!sourceNode || !targetNode) return;

      const isLinkHovered = hoveredLink !== null && highlightedLinks.has(index);
      const isNodeHighlighted = hoveredNode && connectedLinks.has(index);

      if (isLinkHovered) {
        ctx.fillStyle = COLORS.linkHighlight;
        ctx.globalAlpha = 1;
      } else if (isNodeHighlighted) {
        ctx.fillStyle = COLORS.linkHover;
        ctx.globalAlpha = 0.9;
      } else {
        ctx.fillStyle = COLORS.link;
        ctx.globalAlpha = 1;
      }

      drawLinkRibbon(
        ctx,
        sourceNode.x1,
        targetNode.x0,
        link.sourceY,
        link.targetY,
        link.sourceY + link.sourceHeight,
        link.targetY + link.targetHeight
      );
    });

    ctx.globalAlpha = 1;


    // Draw nodes
    nodes.forEach((node: any) => {
      const isHovered = node.id === hoveredNode;
      const isConnected = hoveredNode && connectedNodes.has(node.id);
      const isLinkConnected = hoveredLink !== null && linkHighlightedNodes.has(node.id);
      
      ctx.fillStyle = (isHovered || isConnected || isLinkConnected) ? COLORS.primaryNodeHover : COLORS.primaryNode;
      
      const nodeHeight = node.y1 - node.y0;
      const radius = Math.min(LAYOUT.nodeRadius, nodeHeight / 2);
      
      // Draw rounded rectangle
      ctx.beginPath();
      ctx.moveTo(node.x0 + radius, node.y0);
      ctx.lineTo(node.x1 - radius, node.y0);
      ctx.arcTo(node.x1, node.y0, node.x1, node.y0 + radius, radius);
      ctx.lineTo(node.x1, node.y1 - radius);
      ctx.arcTo(node.x1, node.y1, node.x1 - radius, node.y1, radius);
      ctx.lineTo(node.x0 + radius, node.y1);
      ctx.arcTo(node.x0, node.y1, node.x0, node.y1 - radius, radius);
      ctx.lineTo(node.x0, node.y0 + radius);
      ctx.arcTo(node.x0, node.y0, node.x0 + radius, node.y0, radius);
      ctx.closePath();
      ctx.fill();
    });

    // Draw labels and info
    nodes.forEach((node: any) => {
      const x = node.x1 + LAYOUT.labelOffset;
      const nodeHeight = node.y1 - node.y0;
      const labelBlockHeight = LAYOUT.labelHeight;
      const y = nodeHeight >= (labelBlockHeight + LAYOUT.labelTopMargin * 2)
        ? node.y0 + LAYOUT.labelTopMargin
        : node.y0 + Math.max(0, (nodeHeight - labelBlockHeight) / 2);
      
      const nodeLevel = nodeLevels.get(node.id) || 0;
      const nodeHasChildren = hasChildren(sankeyData, node.id);
      const isExpanded = expandedNodes.has(node.id);
      const canCollapse = nodeLevel >= 2 && nodeHasChildren;
      
      // Draw label
      ctx.fillStyle = COLORS.text;
      ctx.font = '11px SF Pro, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(node.name, x, y);
      
      // Draw chevron if collapsible (aligned with label)
      if (canCollapse) {
        const textWidth = ctx.measureText(node.name).width;
        const chevronX = x + textWidth + 6;
        const chevronY = y; // Same Y as label
        drawChevron(ctx, chevronX, chevronY, LAYOUT.chevronSize, isExpanded ? 'down' : 'right');
      }
      
      // Draw value and percentage (same logic as the Figma plugin)
      const formattedValue = formatNumber(node.value || 0);
      const percentageText = `${(node.percentage ?? 100).toFixed(1)}%`;
      
      // Check if this node's stats are being hovered
      const isStatsHovered = hoveredNodeStats === node.id;
      
      if (isStatsHovered) {
        // Draw "Show details" button instead of stats
        const buttonText = 'Show details';
        ctx.font = '10px SF Pro, sans-serif';
        const buttonTextWidth = ctx.measureText(buttonText).width;
        const buttonPadding = 8;
        const buttonWidth = buttonTextWidth + buttonPadding * 2;
        const buttonHeight = 20;
        const buttonY = y + 20; // Adjusted to align with stats position
        
        // Draw button background
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        
        // Rounded rectangle for button
        const radius = 3;
        ctx.beginPath();
        ctx.moveTo(x + radius, buttonY);
        ctx.lineTo(x + buttonWidth - radius, buttonY);
        ctx.arcTo(x + buttonWidth, buttonY, x + buttonWidth, buttonY + radius, radius);
        ctx.lineTo(x + buttonWidth, buttonY + buttonHeight - radius);
        ctx.arcTo(x + buttonWidth, buttonY + buttonHeight, x + buttonWidth - radius, buttonY + buttonHeight, radius);
        ctx.lineTo(x + radius, buttonY + buttonHeight);
        ctx.arcTo(x, buttonY + buttonHeight, x, buttonY + buttonHeight - radius, radius);
        ctx.lineTo(x, buttonY + radius);
        ctx.arcTo(x, buttonY, x + radius, buttonY, radius);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw button text
        ctx.fillStyle = '#374151';
        ctx.font = '10px SF Pro, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(buttonText, x + buttonPadding, buttonY + buttonHeight / 2);
      } else {
        // Draw value number (reduced weight, aligned baseline)
        ctx.fillStyle = COLORS.textSecondary;
        ctx.font = '400 13.5px SF Pro, sans-serif'; // Reduced from 500 to 400
        ctx.textBaseline = 'alphabetic'; // Use alphabetic baseline for alignment
        const valueY = y + 28; // Adjusted position
        ctx.fillText(formattedValue, x, valueY);
        
        // Draw percentage (same baseline as value)
        const valueWidth = ctx.measureText(formattedValue).width;
        ctx.font = '9px SF Pro, sans-serif';
        ctx.textBaseline = 'alphabetic'; // Same baseline as value
        ctx.fillText(percentageText, x + valueWidth + 4, valueY);
      }
    });

    ctx.restore();
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isPanningRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - panOffset.x) / zoom;
    const y = (e.clientY - rect.top - panOffset.y) / zoom;
    
    const margin = { top: 10, right: 180, bottom: 10, left: 10 };
    const adjustedX = x - margin.left;
    const adjustedY = y - margin.top;
    
    const nodeLevels = calculateNodeLevels(sankeyData);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Check if clicked on "Show details" button (stats area when hovered)
    if (hoveredNodeStats) {
      const node = nodesDataRef.current.find(n => n.id === hoveredNodeStats);
      if (node) {
        const labelX = node.x1 + LAYOUT.labelOffset;
        const nodeHeight = node.y1 - node.y0;
        const labelBlockHeight = LAYOUT.labelHeight;
        const labelY = nodeHeight >= (labelBlockHeight + LAYOUT.labelTopMargin * 2)
          ? node.y0 + LAYOUT.labelTopMargin
          : node.y0 + Math.max(0, (nodeHeight - labelBlockHeight) / 2);
        
        const statsY = labelY + 18;
        const statsHeight = 22;
        const statsWidth = 100;
        
        if (adjustedX >= labelX && adjustedX <= labelX + statsWidth &&
            adjustedY >= statsY && adjustedY <= statsY + statsHeight) {
          const tabData = getNodeTabData(node.id, node.value);
          const detailData = getNodeDetailData(node.id, node.value);
          const hasContent = !!(tabData || detailData);
          const hasChart = !['unanswered_transferred_v', 'other_voicemails', 'call_messages', 'spam_calls', 'missed_by_customer_v', 'missed_by_cc_v', 'missed_voicemails', 'other_missed', 'conv_ai_d', 'callback_req_v', 'queue_timeout', 'agent_closed', 'agent_timeout', 'abandoned_rang_v'].includes(node.id);
          const position = calculatePopoverPosition(e.clientX, e.clientY, hasContent, hasChart);
          setSelectedNodeForDetails({
            nodeId: node.id,
            nodeName: node.name,
            value: node.value,
            percentage: node.percentage,
            position
          });
          return;
        }
      }
    }
    
    // Check if clicked on label+chevron area (for expand/collapse)
    for (const node of nodesDataRef.current) {
      const nodeLevel = nodeLevels.get(node.id) || 0;
      const canCollapse = nodeLevel >= 2 && hasChildren(sankeyData, node.id);
      
      if (canCollapse) {
        const labelX = node.x1 + LAYOUT.labelOffset;
        const nodeHeight = node.y1 - node.y0;
        const labelBlockHeight = LAYOUT.labelHeight;
        const labelY = nodeHeight >= (labelBlockHeight + LAYOUT.labelTopMargin * 2)
          ? node.y0 + LAYOUT.labelTopMargin
          : node.y0 + Math.max(0, (nodeHeight - labelBlockHeight) / 2);
        
        ctx.font = '11px SF Pro, sans-serif';
        const textWidth = ctx.measureText(node.name).width;
        const chevronX = labelX + textWidth + 6;
        
        // Clickable area: entire label + chevron width
        const clickableWidth = textWidth + 6 + LAYOUT.chevronSize;
        const clickableHeight = 14; // Label line height
        
        if (adjustedX >= labelX && adjustedX <= labelX + clickableWidth &&
            adjustedY >= labelY && adjustedY <= labelY + clickableHeight) {
          setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(node.id)) {
              newSet.delete(node.id);
            } else {
              newSet.add(node.id);
            }
            return newSet;
          });
          return;
        }
      }
    }
  };

  const handleCanvasMove = (e: React.MouseEvent) => {
    if (isPanningRef.current) {
      e.preventDefault();
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      return;
    }
    
    // Hover detection
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - panOffset.x) / zoom;
    const y = (e.clientY - rect.top - panOffset.y) / zoom;
    
    const margin = { top: 10, right: 180, bottom: 10, left: 10 };
    const adjustedX = x - margin.left;
    const adjustedY = y - margin.top;
    
    let foundNode = null;
    let foundNodeStats = null;
    
    // Check hover on nodes (for node highlighting)
    for (const node of nodesDataRef.current) {
      if (adjustedX >= node.x0 && adjustedX <= node.x1 &&
          adjustedY >= node.y0 && adjustedY <= node.y1) {
        foundNode = node.id;
        break;
      }
    }
    
    // Check hover on stats area (number + percentage)
    for (const node of nodesDataRef.current) {
      const labelX = node.x1 + LAYOUT.labelOffset;
      const nodeHeight = node.y1 - node.y0;
      const labelBlockHeight = LAYOUT.labelHeight;
      const labelY = nodeHeight >= (labelBlockHeight + LAYOUT.labelTopMargin * 2)
        ? node.y0 + LAYOUT.labelTopMargin
        : node.y0 + Math.max(0, (nodeHeight - labelBlockHeight) / 2);
      
      // Stats area bounds
      const statsY = labelY + 18; // Below label
      const statsHeight = 20; // Height of stats area
      const statsWidth = 100; // Approximate width
      
      if (adjustedX >= labelX && adjustedX <= labelX + statsWidth &&
          adjustedY >= statsY && adjustedY <= statsY + statsHeight) {
        foundNodeStats = node.id;
        break;
      }
    }
    
    // Check hover on links (only when not hovering a node)
    let foundLink: number | null = null;
    if (!foundNode) {
      const nodes = nodesDataRef.current;
      for (let i = 0; i < linksDataRef.current.length; i++) {
        const link = linksDataRef.current[i];
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        if (!sourceNode || !targetNode) continue;
        if (isPointInRibbon(
          adjustedX, adjustedY,
          sourceNode.x1, targetNode.x0,
          link.sourceY, link.targetY,
          link.sourceY + link.sourceHeight, link.targetY + link.targetHeight
        )) {
          foundLink = i;
          break;
        }
      }
    }

    setHoveredNode(foundNode);
    setHoveredNodeStats(foundNodeStats);
    setHoveredLink(foundLink);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    // Skip if container has no dimensions yet
    if (rect.width === 0 || rect.height === 0) return;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Use requestAnimationFrame to ensure canvas is ready
    requestAnimationFrame(() => {
      renderSankey(canvas, zoom, panOffset);
    });
  }, [zoom, panOffset, hoveredNode, hoveredNodeStats, hoveredLink, expandedNodes]);

  // Initial render effect - triggers when component becomes visible
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use ResizeObserver to detect when container gets dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.scale(dpr, dpr);
          }

          requestAnimationFrame(() => {
            renderSankey(canvas, zoom, panOffset);
          });
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom * delta));
    
    const zoomRatio = newZoom / zoom;
    setPanOffset(prev => ({
      x: mouseX - (mouseX - prev.x) * zoomRatio,
      y: mouseY - (mouseY - prev.y) * zoomRatio
    }));
    
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isPanningRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isPanningRef.current = false;
  };

  const handleZoomIn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newZoom = Math.min(3, zoom * 1.2);
    const zoomRatio = newZoom / zoom;
    
    setPanOffset(prev => ({
      x: centerX - (centerX - prev.x) * zoomRatio,
      y: centerY - (centerY - prev.y) * zoomRatio
    }));
    
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newZoom = Math.max(0.5, zoom / 1.2);
    const zoomRatio = newZoom / zoom;
    
    setPanOffset(prev => ({
      x: centerX - (centerX - prev.x) * zoomRatio,
      y: centerY - (centerY - prev.y) * zoomRatio
    }));
    
    setZoom(newZoom);
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Shared content (canvas + zoom controls + popovers)
  const sankeyContent = (
    <>
      <div 
        ref={containerRef} 
        className={minimal ? "relative w-full h-full" : "absolute inset-0 px-3 pb-3"}
        style={minimal ? { backgroundColor: COLORS.background } : { top: '50px', backgroundColor: COLORS.background }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <canvas 
          ref={canvasRef}
          className="w-full h-full block"
          style={{ cursor: isPanningRef.current ? 'grabbing' : (hoveredNode ? 'pointer' : 'grab') }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleCanvasMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
        />
        
        {/* Zoom Controls */}
        <div 
          className={`absolute bottom-2 right-2 flex flex-col gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1 transition-opacity duration-200 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Reset zoom"
          >
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Details Popover - Rendered via Portal to avoid overflow-clip issues */}
      {selectedNodeForDetails && createPortal(
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[10000]"
            onClick={() => setSelectedNodeForDetails(null)}
          />

          {/* Popover Content */}
          <div
            className="fixed z-[10001]"
            style={{
              left: `${selectedNodeForDetails.position.x}px`,
              top: `${selectedNodeForDetails.position.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Container
              nodeName={selectedNodeForDetails.nodeName}
              percentage={selectedNodeForDetails.percentage}
              value={selectedNodeForDetails.value}
              tabs={getNodeTabData(selectedNodeForDetails.nodeId, selectedNodeForDetails.value)}
              details={getNodeDetailData(selectedNodeForDetails.nodeId, selectedNodeForDetails.value)}
              showChart={!['call_messages', 'spam_calls', 'missed_voicemails', 'other_missed', 'conv_ai_d', 'callback_req_v', 'unanswered_transferred_v', 'queue_timeout', 'agent_closed', 'agent_timeout', 'abandoned_rang_v'].includes(selectedNodeForDetails.nodeId)}
              iconType={
                ['conv_ai_d', 'queue_timeout', 'agent_closed', 'agent_timeout'].includes(selectedNodeForDetails.nodeId) ? 'monitor-only' :
                ['other_voicemails', 'call_messages', 'spam_calls', 'missed_by_customer_v', 'missed_by_cc_v', 'missed_voicemails', 'other_missed', 'callback_req_v', 'unanswered_transferred_v', 'abandoned_rang_v'].includes(selectedNodeForDetails.nodeId) ? 'phone-only' :
                'both'
              }
            />
          </div>
        </>,
        document.body
      )}
    </>
  );

  // If minimal mode, return just the content
  if (minimal) {
    return sankeyContent;
  }

  // Otherwise, wrap in Widget
  return (
    <Widget
      title="Conversation volume breakdown"
      widgetId="sankey"
      minHeight={320}
      minColumns={2}
      showMenuButton={true}
      showInfoIcon={true}
      showFilterButton={true}
      tooltipText="Conversation flow showing how conversations move through different stages from start to finish"
      scope="Both"
      onMaximize={onMaximize}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
      isDraggable={isDraggable}
    >
      {sankeyContent}
    </Widget>
  );
}