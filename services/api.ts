import { Mood, Weekday, MoodsApiResponse } from '@/types/mood';

export async function fetchMoods(): Promise<MoodsApiResponse> {
  const response = await fetch('/api/moods');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch moods: ${response.status}`);
  }
  
  return response.json();
}

export async function putMood(
  day: Weekday,
  mood: Mood | null,
  clientRequestId?: number
): Promise<MoodsApiResponse> {
  const response = await fetch(`/api/moods/${encodeURIComponent(day)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mood, clientRequestId }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update mood: ${response.status}`);
  }
  
  return response.json();
}
