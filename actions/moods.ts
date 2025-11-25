'use server'

import { readStore, updateDayStore } from '@/lib/moods-store'
import { Mood, Weekday, MoodsApiResponse } from '@/types/mood'

export async function getMoods(): Promise<MoodsApiResponse> {
  return await readStore()
}

export async function setMood(
  day: Weekday,
  mood: Mood | null,
  clientRequestId?: number,
): Promise<MoodsApiResponse> {
  return await updateDayStore(day, mood, clientRequestId)
}
