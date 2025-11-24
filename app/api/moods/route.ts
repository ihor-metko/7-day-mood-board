import { NextResponse } from 'next/server';
import { readStore } from '@/lib/moods-store';

export async function GET() {
  try {
    const delay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const state = await readStore();
    return NextResponse.json(state);
  } catch (error) {
    console.error('Error reading moods:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
