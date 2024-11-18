import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { DashboardData, initialData } from '@/types/dashboard';

export async function GET() {
  try {
    const data = await kv.get<DashboardData>('dashboardData');
    return NextResponse.json(data || initialData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(initialData);
  }
}

export async function POST(request: Request) {
  try {
    const data: DashboardData = await request.json();
    const previousData = await kv.get<DashboardData>('dashboardData');
    
    // Track changes
    const changes: string[] = [];
    
    // Check for sales changes
    if (previousData && data.currentSales !== previousData.currentSales) {
      changes.push(`Sales updated from ${previousData.currentSales} to ${data.currentSales}`);
    }
    
    // Check for channel metric changes
    Object.entries(data.channels).forEach(([channel, metrics]) => {
      const prevMetrics = previousData?.channels[channel as keyof typeof data.channels];
      if (prevMetrics) {
        if (metrics.leads !== prevMetrics.leads) {
          changes.push(`${channel} leads: ${prevMetrics.leads} → ${metrics.leads}`);
        }
        if (metrics.conversions !== prevMetrics.conversions) {
          changes.push(`${channel} conversions: ${prevMetrics.conversions} → ${metrics.conversions}`);
        }
      }
    });

    // Save updated data
    await kv.set('dashboardData', data);
    
    // Log activity with detailed changes
    const timestamp = new Date().toISOString();
    await kv.lpush('activityLog', {
      timestamp,
      sales: data.currentSales,
      changes: changes.join(', ') || 'Dashboard updated'
    });

    return NextResponse.json({ 
      success: true,
      changes,
      previousData,
      currentData: data
    });
  } catch (error) {
    console.error('Error updating dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    );
  }
}