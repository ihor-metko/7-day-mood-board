import { promises as fs } from 'fs'
import path from 'path'
import { Mood, Weekday, WEEKDAYS, MoodsApiResponse } from '@/types/mood'

const STORE_PATH = path.join(process.cwd(), 'data', 'moods.json')

// Simple write queue to serialize file operations
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
  // Queue this write operation to ensure serialization
  let result: MoodsApiResponse

  const operation = async (): Promise<void> => {
    const state = await readStore()

    const dayEntry = state.days.find((d) => d.day === day)
    if (dayEntry) {
      dayEntry.mood = mood
    }

    state.version += 1

    await fs.writeFile(STORE_PATH, JSON.stringify(state, null, 2), 'utf-8')

    result =
      clientRequestId !== undefined ? { ...state, clientRequestId } : state
  }

  // Chain this operation onto the queue
  writeQueue = writeQueue.then(operation, operation)
  await writeQueue

  return result!
}
