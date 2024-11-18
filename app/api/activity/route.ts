// app/api/activity/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get last 20 activities
    const activityLog = await kv.lrange('activityLog', 0, 19);
    
    // If no activity exists yet, return initial state
    if (!activityLog || activityLog.length === 0) {
      return NextResponse.json([{
        timestamp: new Date().toISOString(),
        sales: 0,
        changes: 'Campaign started'
      }]);
    }
    
    return NextResponse.json(activityLog);
  } catch (error) {
    console.error('Error fetching activity log:', error);
    return NextResponse.json([]);
  }
}