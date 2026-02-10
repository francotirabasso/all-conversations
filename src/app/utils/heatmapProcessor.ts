// Process heatmap data by day of week and hour

interface HeatmapInput {
  [date: string]: {
    [hour: number]: number;
  };
}

export interface HeatmapOutput {
  [day: string]: {
    [hour: number]: number;
  };
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function processHeatmapData(rawData: HeatmapInput | undefined): HeatmapOutput {
  // If no data, return mock data
  if (!rawData || Object.keys(rawData).length === 0) {
    return generateMockHeatmapData();
  }

  // Initialize output structure
  const output: HeatmapOutput = {};
  DAYS.forEach(day => {
    output[day] = {};
  });

  // Track count of occurrences for averaging
  const counts: { [day: string]: { [hour: number]: number } } = {};
  DAYS.forEach(day => {
    counts[day] = {};
  });

  // Process raw data
  Object.entries(rawData).forEach(([dateStr, hourData]) => {
    const date = new Date(dateStr);
    const dayOfWeek = DAYS[date.getDay()]; // 0 = Sun, 1 = Mon, etc.

    Object.entries(hourData).forEach(([hourStr, count]) => {
      const hour = parseInt(hourStr);
      
      if (!output[dayOfWeek][hour]) {
        output[dayOfWeek][hour] = 0;
        counts[dayOfWeek][hour] = 0;
      }
      
      output[dayOfWeek][hour] += count;
      counts[dayOfWeek][hour]++;
    });
  });

  // Calculate averages
  DAYS.forEach(day => {
    Object.keys(output[day]).forEach(hourStr => {
      const hour = parseInt(hourStr);
      if (counts[day][hour] > 0) {
        output[day][hour] = Math.round(output[day][hour] / counts[day][hour]);
      }
    });
  });

  return output;
}

// Generate mock heatmap data for testing
export function generateMockHeatmapData(): HeatmapOutput {
  const output: HeatmapOutput = {};
  
  // Mock data matching the Figma design
  output['Mon'] = { 7: 0, 8: 2, 9: 2, 10: 8, 11: 8, 12: 17, 13: 8, 14: 8, 15: 2, 16: 2, 17: 2, 18: 2 };
  output['Tue'] = { 7: 0, 8: 6, 9: 6, 10: 32, 11: 32, 12: 24, 13: 2000, 14: 24, 15: 8, 16: 8, 17: 4, 18: 4 };
  output['Wed'] = { 7: 0, 8: 8, 9: 8, 10: 32, 11: 32, 12: 45, 13: 32, 14: 32, 15: 17, 16: 17, 17: 4, 18: 4, 19: 2 };
  output['Thu'] = { 7: 0, 8: 0, 9: 0, 10: 45, 11: 45, 12: 24, 13: 24, 14: 24, 15: 11, 16: 11, 17: 2, 18: 2, 19: 2 };
  output['Fri'] = { 7: 0, 8: 0, 9: 0, 10: 32, 11: 32, 12: 45, 13: 24, 14: 24, 15: 2, 16: 2, 17: 2, 18: 2 };
  output['Sat'] = { 7: 0, 8: 0, 9: 0, 10: 2, 11: 2 };
  output['Sun'] = { 7: 0, 8: 0, 9: 0 };

  return output;
}