import { NextRequest, NextResponse } from 'next/server';
import { updateDayStore } from '@/lib/moods-store';
import { Mood, Weekday, WEEKDAYS, MOODS } from '@/types/mood';

const ALLOWED_MOODS = MOODS.map(m => m.key);

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ day: string }> }
) {
  try {
    const { day } = await params;
    
    // Validate day parameter - requirement specifies 404 for invalid day
    if (!WEEKDAYS.includes(day as Weekday)) {
      return NextResponse.json(
        { error: 'Invalid day' },
        { status: 404 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { mood, clientRequestId } = body;
    
    // Validate mood (can be null or one of allowed moods)
    if (mood !== null && !ALLOWED_MOODS.includes(mood)) {
      return NextResponse.json(
        { error: 'Invalid mood' },
        { status: 400 }
      );
    }
    
    // Validate clientRequestId if provided
    if (clientRequestId !== undefined && typeof clientRequestId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid clientRequestId' },
        { status: 400 }
      );
    }
    
    // Add artificial latency (300-1200ms)
    const delay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Update store
    const state = await updateDayStore(
      day as Weekday,
      mood as Mood | null,
      clientRequestId
    );
    
    return NextResponse.json(state);
  } catch (error) {
    console.error('Error updating mood:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
