import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await kv.get('dashboardData');
    console.log('KV GET success:', data); // Debug log
    return NextResponse.json(data || {
      currentSales: 0,
      channels: {
        youtube: { leads: 0, conversions: 0 },
        instagram: { leads: 0, conversions: 0 },
        email: { leads: 0, conversions: 0 },
        ppc: { leads: 0, conversions: 0 }
      }
    });
  } catch (error) {
    console.error('KV GET error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await kv.set('dashboardData', data);
    console.log('KV POST success:', data); // Debug log
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('KV POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}