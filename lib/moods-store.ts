import { promises as fs } from 'fs';
import path from 'path';
import { Mood, Weekday, WEEKDAYS, MoodsApiResponse } from '@/types/mood';

const STORE_PATH = path.join(process.cwd(), 'data', 'moods.json');

export async function readStore(): Promise<MoodsApiResponse> {
  try {
    const data = await fs.readFile(STORE_PATH, 'utf-8');
    return JSON.parse(data) as MoodsApiResponse;
  } catch {
    // File doesn't exist, create default state
    const defaultState: MoodsApiResponse = {
      version: 0,
      days: WEEKDAYS.map(d => ({ day: d, mood: null })),
    };
    
    // Ensure data directory exists
    const dataDir = path.dirname(STORE_PATH);
    await fs.mkdir(dataDir, { recursive: true });
    
    await fs.writeFile(STORE_PATH, JSON.stringify(defaultState, null, 2), 'utf-8');
    return defaultState;
  }
}

export async function updateDayStore(
  day: Weekday,
  mood: Mood | null,
  clientRequestId?: number
): Promise<MoodsApiResponse> {
  const state = await readStore();
  
  // Find the day entry and update mood
  const dayEntry = state.days.find(d => d.day === day);
  if (dayEntry) {
    dayEntry.mood = mood;
  }
  
  // Increment version
  state.version += 1;
  
  // Write file
  await fs.writeFile(STORE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  
  // Return state with clientRequestId if provided
  return clientRequestId !== undefined 
    ? { ...state, clientRequestId }
    : state;
}
