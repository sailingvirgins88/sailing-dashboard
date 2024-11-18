import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await kv.set('test', 'hello');
    const value = await kv.get('test');
    return NextResponse.json({ success: true, value });
  } catch (error) {
    console.error('KV Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}