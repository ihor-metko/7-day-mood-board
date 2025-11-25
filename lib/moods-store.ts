import { promises as fs } from 'fs'
import path from 'path'
import { Mood, Weekday, WEEKDAYS, MoodsApiResponse } from '@/types/mood'

const STORE_PATH = path.join(process.cwd(), 'data', 'moods.json')

let writeQueue: Promise<void> = Promise.resolve()

export async function readStore(): Promise<MoodsApiResponse> {
  try {
    const data = await fs.readFile(STORE_PATH, 'utf-8')
    return JSON.parse(data) as MoodsApiResponse
  } catch {
    const defaultState: MoodsApiResponse = {
      version: 0,
      days: WEEKDAYS.map((d) => ({ day: d, mood: null })),
    }

    const dataDir = path.dirname(STORE_PATH)
    await fs.mkdir(dataDir, { recursive: true })

    await fs.writeFile(
      STORE_PATH,
      JSON.stringify(defaultState, null, 2),
      'utf-8',
    )
    return defaultState
  }
}

export async function updateDayStore(
  day: Weekday,
  mood: Mood | null,
  clientRequestId?: number,
): Promise<MoodsApiResponse> {
  return new Promise<MoodsApiResponse>((resolve, reject) => {
    const previousQueue = writeQueue
    writeQueue = previousQueue.finally().then(async () => {
      try {
        const state = await readStore()

        const dayEntry = state.days.find((d) => d.day === day)
        if (dayEntry) {
          dayEntry.mood = mood
        }

        state.version += 1

        await fs.writeFile(STORE_PATH, JSON.stringify(state, null, 2), 'utf-8')

        const result =
          clientRequestId !== undefined ? { ...state, clientRequestId } : state
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  })
}
