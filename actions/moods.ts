'use server'

import { readStore, updateDayStore } from '@/lib/moods-store'
import { Mood, Weekday, MoodsApiResponse, MOODS, WEEKDAYS } from '@/types/mood'

const ALLOWED_MOODS = MOODS.map((m) => m.key)

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export async function getMoods(): Promise<MoodsApiResponse> {
  const randomDelay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300
  await delay(randomDelay)

  const state = await readStore()
  return state
}

export async function setMood(
  day: Weekday,
  mood: Mood | null,
  clientRequestId?: number,
): Promise<MoodsApiResponse> {
  if (!WEEKDAYS.includes(day)) {
    throw new Error('Invalid day')
  }

  if (mood !== null && !ALLOWED_MOODS.includes(mood)) {
    throw new Error('Invalid mood')
  }

  if (clientRequestId !== undefined && typeof clientRequestId !== 'number') {
    throw new Error('Invalid clientRequestId')
  }

  const randomDelay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300
  await delay(randomDelay)

  const state = await updateDayStore(day, mood, clientRequestId)
  return state
}
