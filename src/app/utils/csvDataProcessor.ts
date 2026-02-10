// Utility to process CSV data and calculate dashboard metrics

import { GlobalFilters } from '@/app/contexts/GlobalFiltersContext';
import { loadCSVData, hasCSVData as hasIndexedDBData } from './indexedDBStorage';

export interface ConversationData {
  ID: string;
  Office: string;
  "Contact Center": string;
  Agent: string;
  "Agent type": string;
  "Conversation type": string;
  Channel: string;
  Participant: string;
  "Date and time": string;
  Duration: string;
  Disposition: string;
  "Total Hold": string;
  Direction: string;
  "External and internal": string;
  Keywords: string;
  Moments: string;
  Expertise: string;
  Missed: string;
  Transferred: string;
  Answered: string;
}

export interface DashboardMetrics {
  avgAnswerTime: string;
  avgAnswerTimeChange: string;
  avgAnswerTimeTrend: { date: Date; value: number }[];
  avgHandleTime: string;
  avgHandleTimeChange: string;
  avgHandleTimeTrend: { date: Date; value: number }[];
  avgFirstResponseTime: string;
  avgFirstResponseTimeChange: string;
  avgFirstResponseTimeTrend: { date: Date; value: number }[];
  transferRate: string;
  transferRateChange: string;
  transferRateTrend: { date: Date; value: number }[];
  deflectionRate: string;
  deflectionRateChange: string;
  deflectionRateTrend: { date: Date; value: number }[];
  conversationVolume: {
    date: Date;
    total: number;
    answered: number;
    missed: number;
    abandoned: number;
    transferred: number;
    outbound: number;
    other: number;
  }[];
  totalConversations: string;
  heatmapData: {
    [day: string]: {
      [hour: number]: number;
    };
  };
}

// Cache for CSV data to avoid repeated IndexedDB reads
let dataCache: ConversationData[] | null = null;

async function parseCSVData(): Promise<ConversationData[]> {
  // Return cached data if available
  if (dataCache !== null) {
    return dataCache;
  }
  
  // Load from IndexedDB
  const data = await loadCSVData();
  dataCache = data as ConversationData[];
  return dataCache;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.round(seconds / 60);
  return `${minutes}m`;
}

function calculatePercentageChange(): string {
  // Mock calculation - in real scenario, compare with previous period
  const change = (Math.random() * 10 - 5).toFixed(0);
  return `${change}%`;
}

export function calculateMetrics(): DashboardMetrics {
  const data = parseCSVData();
  
  if (data.length === 0) {
    // Return default mock data if no CSV loaded
    return getDefaultMetrics();
  }

  // Calculate Avg Answer Time (time from call start to answer for answered calls)
  const answeredCalls = data.filter(row => row.Answered === 'Yes' && row["Conversation type"] === 'Voice');
  const avgAnswerTimeSeconds = answeredCalls.length > 0
    ? answeredCalls.reduce((sum, row) => sum + (parseInt(row.Duration) || 0), 0) / answeredCalls.length * 0.1 // Mock calculation
    : 180;

  // Calculate Avg Handle Time (total duration for answered conversations)
  const handledConversations = data.filter(row => row.Answered === 'Yes');
  const avgHandleTimeSeconds = handledConversations.length > 0
    ? handledConversations.reduce((sum, row) => sum + (parseInt(row.Duration) || 0), 0) / handledConversations.length
    : 300;

  // Calculate Avg First Response Time (mock - time to first agent response)
  const avgFirstResponseTimeSeconds = handledConversations.length > 0
    ? avgAnswerTimeSeconds * 0.6
    : 120;

  // Calculate Transfer Rate
  const transferredCount = data.filter(row => row.Transferred === 'Yes').length;
  const transferRate = data.length > 0 ? (transferredCount / data.length * 100) : 50;

  // Calculate Deflection Rate (conversations resolved without transfer/escalation)
  const resolvedWithoutTransfer = data.filter(row => 
    row.Answered === 'Yes' && 
    row.Transferred !== 'Yes' && 
    (row.Disposition?.includes('Resolved') || row.Disposition?.includes('resolved'))
  ).length;
  const deflectionRate = data.length > 0 ? (resolvedWithoutTransfer / data.length * 100) : 43;

  // Calculate Conversation Volume Over Time
  const volumeByDate = new Map<string, {
    total: number;
    answered: number;
    missed: number;
    abandoned: number;
    transferred: number;
    outbound: number;
    other: number;
  }>();

  data.forEach(row => {
    const dateStr = row["Date and time"]?.split(' ')[0]; // Get date part
    if (!dateStr) return;

    if (!volumeByDate.has(dateStr)) {
      volumeByDate.set(dateStr, {
        total: 0,
        answered: 0,
        missed: 0,
        abandoned: 0,
        transferred: 0,
        outbound: 0,
        other: 0,
      });
    }

    const dayData = volumeByDate.get(dateStr)!;
    dayData.total++;

    if (row.Answered === 'Yes') dayData.answered++;
    if (row.Missed === 'Yes') dayData.missed++;
    if (row.Disposition?.toLowerCase().includes('abandoned')) dayData.abandoned++;
    if (row.Transferred === 'Yes') dayData.transferred++;
    if (row.Direction === 'Outbound') dayData.outbound++;
    
    // Other = not in above categories
    if (row.Answered !== 'Yes' && row.Missed !== 'Yes' && !row.Disposition?.toLowerCase().includes('abandoned')) {
      dayData.other++;
    }
  });

  const conversationVolume = Array.from(volumeByDate.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([dateStr, stats]) => ({
      date: new Date(dateStr),
      ...stats,
    }));

  // Calculate Heatmap Data
  const heatmapData: {
    [day: string]: {
      [hour: number]: number;
    };
  } = {};

  data.forEach(row => {
    const dateStr = row["Date and time"]?.split(' ')[0]; // Get date part
    const timeStr = row["Date and time"]?.split(' ')[1]; // Get time part
    if (!dateStr || !timeStr) return;

    const hour = parseInt(timeStr.split(':')[0]);

    if (!heatmapData[dateStr]) {
      heatmapData[dateStr] = {};
    }

    if (!heatmapData[dateStr][hour]) {
      heatmapData[dateStr][hour] = 0;
    }

    heatmapData[dateStr][hour]++;
  });

  // Calculate daily trends for each metric
  const dailyMetrics = new Map<string, {
    answerTimes: number[];
    handleTimes: number[];
    firstResponseTimes: number[];
    totalConversations: number;
    transferredCount: number;
    resolvedWithoutTransferCount: number;
  }>();

  // Group data by date
  data.forEach(row => {
    const dateStr = row["Date and time"]?.split(' ')[0];
    if (!dateStr) return;

    if (!dailyMetrics.has(dateStr)) {
      dailyMetrics.set(dateStr, {
        answerTimes: [],
        handleTimes: [],
        firstResponseTimes: [],
        totalConversations: 0,
        transferredCount: 0,
        resolvedWithoutTransferCount: 0,
      });
    }

    const dayMetrics = dailyMetrics.get(dateStr)!;
    dayMetrics.totalConversations++;

    const duration = parseInt(row.Duration) || 0;

    // Collect answer times (for answered voice calls)
    if (row.Answered === 'Yes' && row["Conversation type"] === 'Voice' && duration > 0) {
      dayMetrics.answerTimes.push(duration);
    }

    // Collect handle times (for all conversations with duration)
    if (row["Conversation type"] && duration > 0) {
      dayMetrics.handleTimes.push(duration);
    }

    // Count transfers
    if (row.Transferred === 'Yes') {
      dayMetrics.transferredCount++;
    }

    // Count resolved without transfer
    if (row.Answered === 'Yes' && 
        row.Transferred !== 'Yes' &&
        row.Disposition && 
        (row.Disposition.toLowerCase().includes('resolved') || row.Disposition.toLowerCase().includes('completed'))) {
      dayMetrics.resolvedWithoutTransferCount++;
    }
  });

  // Convert to trend arrays
  const avgAnswerTimeTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.answerTimes.length > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: metrics.answerTimes.reduce((sum, t) => sum + t, 0) / metrics.answerTimes.length / 60, // Convert to minutes
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const avgHandleTimeTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.handleTimes.length > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: metrics.handleTimes.reduce((sum, t) => sum + t, 0) / metrics.handleTimes.length / 60, // Convert to minutes
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const avgFirstResponseTimeTrend = avgAnswerTimeTrend.map(point => ({
    date: point.date,
    value: point.value * 0.6, // Estimate as 60% of answer time
  }));

  const transferRateTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.totalConversations > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: (metrics.transferredCount / metrics.totalConversations) * 100,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const deflectionRateTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.totalConversations > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: (metrics.resolvedWithoutTransferCount / metrics.totalConversations) * 100,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    avgAnswerTime: formatTime(avgAnswerTimeSeconds),
    avgAnswerTimeChange: calculatePercentageChange(),
    avgAnswerTimeTrend,
    avgHandleTime: formatTime(avgHandleTimeSeconds),
    avgHandleTimeChange: calculatePercentageChange(),
    avgHandleTimeTrend,
    avgFirstResponseTime: formatTime(avgFirstResponseTimeSeconds),
    avgFirstResponseTimeChange: calculatePercentageChange(),
    avgFirstResponseTimeTrend,
    transferRate: `${Math.round(transferRate)}%`,
    transferRateChange: calculatePercentageChange(),
    transferRateTrend,
    deflectionRate: `${Math.round(deflectionRate)}%`,
    deflectionRateChange: calculatePercentageChange(),
    deflectionRateTrend,
    conversationVolume,
    totalConversations: data.length.toLocaleString(),
    heatmapData,
  };
}

function getDefaultMetrics(): DashboardMetrics {
  // Default mock data when no CSV is loaded
  const mockDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2024, 2, 19 + i);
    return {
      date,
      total: Math.round(95 + Math.random() * 10),
      answered: Math.round(75 + Math.random() * 5),
      missed: Math.round(50 + Math.random() * 10),
      abandoned: Math.round(45 + Math.random() * 15),
      transferred: Math.round(25 + Math.random() * 5),
      outbound: Math.round(15 + Math.random() * 10),
      other: Math.round(10 + Math.random() * 5),
    };
  });

  // Generate mock heatmap data
  const mockHeatmapData: {
    [date: string]: {
      [hour: number]: number;
    };
  } = {};
  
  // Create mock data for the past 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date(2024, 2, 19 + dayOffset);
    const dateStr = date.toISOString().split('T')[0];
    mockHeatmapData[dateStr] = {};
    
    // Add data for all 24 hours
    for (let hour = 0; hour < 24; hour++) {
      // Higher values during business hours (8am-6pm)
      if (hour >= 8 && hour <= 18) {
        mockHeatmapData[dateStr][hour] = Math.round(10 + Math.random() * 40);
      } else if (hour >= 6 && hour <= 22) {
        // Lower values outside business hours but still within reasonable time
        mockHeatmapData[dateStr][hour] = Math.round(Math.random() * 10);
      } else {
        // Very low values during night
        mockHeatmapData[dateStr][hour] = Math.round(Math.random() * 3);
      }
    }
  }

  return {
    avgAnswerTime: '3m',
    avgAnswerTimeChange: '+2%',
    avgAnswerTimeTrend: [],
    avgHandleTime: '5m',
    avgHandleTimeChange: '+2%',
    avgHandleTimeTrend: [],
    avgFirstResponseTime: '2m',
    avgFirstResponseTimeChange: '+2%',
    avgFirstResponseTimeTrend: [],
    transferRate: '50%',
    transferRateChange: '+2%',
    transferRateTrend: [],
    deflectionRate: '43%',
    deflectionRateChange: '+2%',
    deflectionRateTrend: [],
    conversationVolume: mockDates,
    totalConversations: '6,900',
    heatmapData: mockHeatmapData,
  };
}

export async function hasCSVData(): Promise<boolean> {
  return await hasIndexedDBData();
}

// Get unique offices from CSV data
export async function getUniqueOffices(): Promise<string[]> {
  const data = await parseCSVData();
  const offices = new Set(data.map(row => row.Office).filter(Boolean));
  return Array.from(offices).sort();
}

// Get unique contact centers from CSV data
export async function getUniqueContactCenters(): Promise<string[]> {
  const data = await parseCSVData();
  const contactCenters = new Set(data.map(row => row["Contact Center"]).filter(Boolean));
  return Array.from(contactCenters).sort();
}

// Get unique contact centers filtered by offices
export async function getContactCentersByOffices(offices: string[]): Promise<string[]> {
  const data = await parseCSVData();
  const filteredData = offices.length > 0 
    ? data.filter(row => offices.includes(row.Office))
    : data;
  const contactCenters = new Set(filteredData.map(row => row["Contact Center"]).filter(Boolean));
  return Array.from(contactCenters).sort();
}

// Get unique agents from CSV data
export async function getUniqueAgents(): Promise<Array<{ name: string; type: string }>> {
  const data = await parseCSVData();
  const agentsMap = new Map<string, string>();
  
  data.forEach(row => {
    if (row.Agent) {
      agentsMap.set(row.Agent, row["Agent type"] || 'Unknown');
    }
  });
  
  return Array.from(agentsMap.entries())
    .map(([name, type]) => ({ name, type }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Filter data based on global filters
function filterData(data: ConversationData[], filters: GlobalFilters): ConversationData[] {
  return data.filter(row => {
    // Filter by offices
    if (filters.offices.length > 0 && !filters.offices.includes(row.Office)) {
      return false;
    }
    
    // Filter by contact centers
    if (filters.contactCenters.length > 0 && !filters.contactCenters.includes(row["Contact Center"])) {
      return false;
    }
    
    // Filter by agents
    if (filters.agents.length > 0 && !filters.agents.includes(row.Agent)) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange && row["Date and time"]) {
      const conversationDate = new Date(row["Date and time"]);
      const now = new Date();
      const daysAgo = getDaysFromDateRange(filters.dateRange);
      
      if (daysAgo !== null) {
        const cutoffDate = new Date(now);
        cutoffDate.setDate(now.getDate() - daysAgo);
        
        if (conversationDate < cutoffDate) {
          return false;
        }
      }
    }
    
    return true;
  });
}

// Helper function to convert date range string to number of days
function getDaysFromDateRange(dateRange: string): number | null {
  switch (dateRange) {
    case "Past 7 days":
      return 7;
    case "Past 14 days":
      return 14;
    case "Past 30 days":
      return 30;
    case "Past 90 days":
      return 90;
    case "Custom range":
      // TODO: Implement custom range selection
      return null;
    default:
      return 30; // Default to 30 days
  }
}

// Calculate metrics with filters applied
export async function calculateMetricsWithFilters(filters: GlobalFilters): Promise<DashboardMetrics> {
  let data = await parseCSVData();
  
  console.log('📊 CSV Data loaded:', data.length, 'rows');
  
  if (data.length === 0) {
    console.log('⚠️ No CSV data, returning defaults');
    return getDefaultMetrics();
  }
  
  // Apply filters
  data = filterData(data, filters);
  
  console.log('🔍 After filtering:', data.length, 'rows');
  console.log('🎯 Filters applied:', filters);
  
  // If after filtering there's no data, return defaults
  if (data.length === 0) {
    console.log('⚠️ No data after filtering, returning defaults');
    return getDefaultMetrics();
  }
  
  // Calculate Avg Answer Time (time from call start to answer for answered calls)
  // Duration is in seconds, so we need to parse it correctly
  const answeredCalls = data.filter(row => row.Answered === 'Yes' && row["Conversation type"] === 'Voice');
  console.log('📞 Answered voice calls:', answeredCalls.length);
  
  const avgAnswerTimeSeconds = answeredCalls.length > 0
    ? answeredCalls.reduce((sum, row) => {
        const duration = parseInt(row.Duration) || 0;
        return sum + duration;
      }, 0) / answeredCalls.length
    : 180;
  
  console.log('⏱️ Avg Answer Time:', avgAnswerTimeSeconds, 'seconds');

  // Calculate Avg Handle Time (total duration for all conversations)
  const allConversations = data.filter(row => row["Conversation type"] && parseInt(row.Duration) > 0);
  console.log('💬 All conversations with duration:', allConversations.length);
  
  const avgHandleTimeSeconds = allConversations.length > 0
    ? allConversations.reduce((sum, row) => {
        const duration = parseInt(row.Duration) || 0;
        return sum + duration;
      }, 0) / allConversations.length
    : 300;
  
  console.log('⏱️ Avg Handle Time:', avgHandleTimeSeconds, 'seconds');

  // Calculate Avg First Response Time (estimated as 60% of answer time)
  const avgFirstResponseTimeSeconds = answeredCalls.length > 0
    ? avgAnswerTimeSeconds * 0.6
    : 120;

  // Calculate Transfer Rate
  const transferredCount = data.filter(row => row.Transferred === 'Yes').length;
  const transferRate = data.length > 0 ? (transferredCount / data.length * 100) : 0;
  
  console.log('🔄 Transferred:', transferredCount, 'of', data.length, '=', transferRate.toFixed(1), '%');

  // Calculate Deflection Rate (conversations resolved without transfer)
  const resolvedWithoutTransfer = data.filter(row => 
    row.Answered === 'Yes' && 
    row.Transferred !== 'Yes' &&
    row.Disposition && 
    (row.Disposition.toLowerCase().includes('resolved') || row.Disposition.toLowerCase().includes('completed'))
  ).length;
  const deflectionRate = data.length > 0 ? (resolvedWithoutTransfer / data.length * 100) : 0;
  
  console.log('✅ Resolved without transfer:', resolvedWithoutTransfer, 'of', data.length, '=', deflectionRate.toFixed(1), '%');

  // Calculate Conversation Volume Over Time
  const volumeByDate = new Map<string, {
    total: number;
    answered: number;
    missed: number;
    abandoned: number;
    transferred: number;
    outbound: number;
    other: number;
  }>();

  data.forEach(row => {
    const dateStr = row["Date and time"]?.split(' ')[0]; // Get date part
    if (!dateStr) return;

    if (!volumeByDate.has(dateStr)) {
      volumeByDate.set(dateStr, {
        total: 0,
        answered: 0,
        missed: 0,
        abandoned: 0,
        transferred: 0,
        outbound: 0,
        other: 0,
      });
    }

    const dayData = volumeByDate.get(dateStr)!;
    dayData.total++;

    if (row.Answered === 'Yes') dayData.answered++;
    if (row.Missed === 'Yes') dayData.missed++;
    if (row.Disposition?.toLowerCase().includes('abandoned')) dayData.abandoned++;
    if (row.Transferred === 'Yes') dayData.transferred++;
    if (row.Direction === 'Outbound') dayData.outbound++;
    
    // Other = not in above categories
    if (row.Answered !== 'Yes' && row.Missed !== 'Yes' && !row.Disposition?.toLowerCase().includes('abandoned')) {
      dayData.other++;
    }
  });

  const conversationVolume = Array.from(volumeByDate.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([dateStr, stats]) => ({
      date: new Date(dateStr),
      ...stats,
    }));

  // Calculate Heatmap Data
  const heatmapData: {
    [day: string]: {
      [hour: number]: number;
    };
  } = {};

  data.forEach(row => {
    const dateStr = row["Date and time"]?.split(' ')[0]; // Get date part
    const timeStr = row["Date and time"]?.split(' ')[1]; // Get time part
    if (!dateStr || !timeStr) return;

    const hour = parseInt(timeStr.split(':')[0]);

    if (!heatmapData[dateStr]) {
      heatmapData[dateStr] = {};
    }

    if (!heatmapData[dateStr][hour]) {
      heatmapData[dateStr][hour] = 0;
    }

    heatmapData[dateStr][hour]++;
  });

  // Calculate daily trends for each metric
  const dailyMetrics = new Map<string, {
    answerTimes: number[];
    handleTimes: number[];
    firstResponseTimes: number[];
    totalConversations: number;
    transferredCount: number;
    resolvedWithoutTransferCount: number;
  }>();

  // Group data by date
  data.forEach(row => {
    const dateStr = row["Date and time"]?.split(' ')[0];
    if (!dateStr) return;

    if (!dailyMetrics.has(dateStr)) {
      dailyMetrics.set(dateStr, {
        answerTimes: [],
        handleTimes: [],
        firstResponseTimes: [],
        totalConversations: 0,
        transferredCount: 0,
        resolvedWithoutTransferCount: 0,
      });
    }

    const dayMetrics = dailyMetrics.get(dateStr)!;
    dayMetrics.totalConversations++;

    const duration = parseInt(row.Duration) || 0;

    // Collect answer times (for answered voice calls)
    if (row.Answered === 'Yes' && row["Conversation type"] === 'Voice' && duration > 0) {
      dayMetrics.answerTimes.push(duration);
    }

    // Collect handle times (for all conversations with duration)
    if (row["Conversation type"] && duration > 0) {
      dayMetrics.handleTimes.push(duration);
    }

    // Count transfers
    if (row.Transferred === 'Yes') {
      dayMetrics.transferredCount++;
    }

    // Count resolved without transfer
    if (row.Answered === 'Yes' && 
        row.Transferred !== 'Yes' &&
        row.Disposition && 
        (row.Disposition.toLowerCase().includes('resolved') || row.Disposition.toLowerCase().includes('completed'))) {
      dayMetrics.resolvedWithoutTransferCount++;
    }
  });

  // Convert to trend arrays
  const avgAnswerTimeTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.answerTimes.length > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: metrics.answerTimes.reduce((sum, t) => sum + t, 0) / metrics.answerTimes.length / 60, // Convert to minutes
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const avgHandleTimeTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.handleTimes.length > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: metrics.handleTimes.reduce((sum, t) => sum + t, 0) / metrics.handleTimes.length / 60, // Convert to minutes
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const avgFirstResponseTimeTrend = avgAnswerTimeTrend.map(point => ({
    date: point.date,
    value: point.value * 0.6, // Estimate as 60% of answer time
  }));

  const transferRateTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.totalConversations > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: (metrics.transferredCount / metrics.totalConversations) * 100,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const deflectionRateTrend = Array.from(dailyMetrics.entries())
    .filter(([_, metrics]) => metrics.totalConversations > 0)
    .map(([dateStr, metrics]) => ({
      date: new Date(dateStr),
      value: (metrics.resolvedWithoutTransferCount / metrics.totalConversations) * 100,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    avgAnswerTime: formatTime(avgAnswerTimeSeconds),
    avgAnswerTimeChange: calculatePercentageChange(),
    avgAnswerTimeTrend,
    avgHandleTime: formatTime(avgHandleTimeSeconds),
    avgHandleTimeChange: calculatePercentageChange(),
    avgHandleTimeTrend,
    avgFirstResponseTime: formatTime(avgFirstResponseTimeSeconds),
    avgFirstResponseTimeChange: calculatePercentageChange(),
    avgFirstResponseTimeTrend,
    transferRate: `${Math.round(transferRate)}%`,
    transferRateChange: calculatePercentageChange(),
    transferRateTrend,
    deflectionRate: `${Math.round(deflectionRate)}%`,
    deflectionRateChange: calculatePercentageChange(),
    deflectionRateTrend,
    conversationVolume,
    totalConversations: data.length.toLocaleString(),
    heatmapData,
  };
}