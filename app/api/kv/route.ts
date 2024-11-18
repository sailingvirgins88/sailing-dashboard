import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const initialData = {
  currentSales: 0,
  channels: {
    instagram: { stories: 0, posts: 0, reels: 0, comments: 0 },
    youtube: { episodes: 0, comments: 0 },
    email: { contacted: 0, responses: 0 }
  },
  pipeline: {
    leads: 0,
    conversations: 0,
    proposals: 0,
    closed: 0
  }
};

export async function GET() {
  try {
    const data = await kv.get('dashboardData');
    return NextResponse.json(data || initialData);
  } catch (error) {
    console.error('KV GET error:', error);
    return NextResponse.json(initialData);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await kv.set('dashboardData', {
      currentSales: data.currentSales ?? 0,
      channels: {
        instagram: {
          stories: data.channels?.instagram?.stories ?? 0,
          posts: data.channels?.instagram?.posts ?? 0,
          reels: data.channels?.instagram?.reels ?? 0,
          comments: data.channels?.instagram?.comments ?? 0
        },
        youtube: {
          episodes: data.channels?.youtube?.episodes ?? 0,
          comments: data.channels?.youtube?.comments ?? 0
        },
        email: {
          contacted: data.channels?.email?.contacted ?? 0,
          responses: data.channels?.email?.responses ?? 0
        }
      },
      pipeline: {
        leads: data.pipeline?.leads ?? 0,
        conversations: data.pipeline?.conversations ?? 0,
        proposals: data.pipeline?.proposals ?? 0,
        closed: data.pipeline?.closed ?? 0
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('KV POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}