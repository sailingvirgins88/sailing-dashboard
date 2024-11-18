// Add a new endpoint for channel updates
// app/api/channel-update/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { channel, type, value } = await request.json();
    
    // Validate channel and type
    if (!['youtube', 'instagram', 'email', 'ppc'].includes(channel) ||
        !['lead', 'conversion'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid channel or type' },
        { status: 400 }
      );
    }

    // Get current data
    const data = await kv.get<DashboardData>('dashboardData') || initialData;
    
    // Update channel metrics
    if (type === 'lead') {
      data.channels[channel].leads += value;
    } else {
      data.channels[channel].conversions += value;
    }
    
    // Add to recent activity
    data.recentActivity.unshift({
      type: type === 'lead' ? 'New Lead' : 'New Conversion',
      source: channel,
      time: new Date().toISOString(),
      details: `+${value} ${type}(s) from ${channel}`
    });
    
    // Keep only last 20 activities
    data.recentActivity = data.recentActivity.slice(0, 20);
    
    // Save updated data
    await kv.set('dashboardData', data);
    
    return NextResponse.json({ 
      success: true,
      updatedMetrics: data.channels[channel]
    });
  } catch (error) {
    console.error('Error updating channel metrics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update channel metrics' },
      { status: 500 }
    );
  }
}
