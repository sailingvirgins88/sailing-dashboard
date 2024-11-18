// types/dashboard.ts
export interface ChannelMetrics {
    leads: number;
    conversions: number;
  }
  
  export interface DashboardData {
    currentSales: number;
    channels: {
      youtube: ChannelMetrics;
      instagram: ChannelMetrics;
      email: ChannelMetrics;
      ppc: ChannelMetrics;
    };
    recentActivity: Array<{
      type: string;
      source: string;
      time: string;
      details?: string;
    }>;
  }
  
  export const initialData: DashboardData = {
    currentSales: 0,
    channels: {
      youtube: { leads: 0, conversions: 0 },
      instagram: { leads: 0, conversions: 0 },
      email: { leads: 0, conversions: 0 },
      ppc: { leads: 0, conversions: 0 }
    },
    recentActivity: []
  };