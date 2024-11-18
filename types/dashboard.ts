// types/dashboard.ts
export type ChannelType = 'youtube' | 'instagram' | 'email' | 'ppc';
export type MetricType = 'lead' | 'conversion';

export interface ChannelMetrics {
    leads: number;
    conversions: number;
  }
  
  export interface DashboardData {
    currentSales: number;
    channels: {
      [key in ChannelType]: ChannelMetrics;
    };
  }
  
  export const initialData: DashboardData = {
    currentSales: 0,
    channels: {
      youtube: { leads: 0, conversions: 0 },
      instagram: { leads: 0, conversions: 0 },
      email: { leads: 0, conversions: 0 },
      ppc: { leads: 0, conversions: 0 }
    }
  };