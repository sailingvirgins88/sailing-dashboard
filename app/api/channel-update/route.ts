// Add a new endpoint for channel updates
// app/api/channel-update/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { DashboardData, initialData } from '@/types/dashboard';

export async function POST(request: Request) {
  try {
    const { channel, type } = await request.json();

    // Get current data
    const data = await kv.get<DashboardData>('dashboardData') || initialData;
    
    // Update channel metrics
    if (type === 'lead') {
      data.channels[channel].leads++;
    } else if (type === 'conversion') {
      data.channels[channel].conversions++;
    }

    // Save updated data
    await kv.set('dashboardData', data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating channel:', error);
    return NextResponse.json({ success: false, error: 'Failed to update channel' }, { status: 500 });
  }
}
