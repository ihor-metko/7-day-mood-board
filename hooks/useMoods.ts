import { useState, useEffect, useCallback, useRef } from 'react'
import { Mood, Weekday, WEEKDAYS } from '@/types/mood'
import { getMoods, setMood } from '@/actions/moods'

type UseMoodsResult = {
  moods: Record<Weekday, Mood | null>
  isLoading: boolean
  error: string | null
  updateMood: (day: Weekday, mood: Mood | null) => void
  clearError: () => void
}

type InflightRequest = {
  clientRequestId: number
  day: Weekday
  mood: Mood | null
}

export function useMoods(): UseMoodsResult {
  const [serverMoods, setServerMoods] = useState<Record<Weekday, Mood | null>>(
    () =>
      WEEKDAYS.reduce(
        (acc, day) => ({ ...acc, [day]: null }),
        {} as Record<Weekday, Mood | null>,
      ),
  )

  const [optimisticOverlay, setOptimisticOverlay] = useState<
    Partial<Record<Weekday, Mood | null>>
  >({})

  const inflightRequests = useRef<Map<Weekday, InflightRequest>>(new Map())
  const nextClientRequestId = useRef<number>(1)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const loadMoods = async () => {
      try {
        const response = await getMoods()
        if (!mounted) return

        const moodsRecord = response.days.reduce(
          (acc, dayData) => {
            acc[dayData.day] = dayData.mood
            return acc
          },
          {} as Record<Weekday, Mood | null>,
        )

        setServerMoods(moodsRecord)
        setIsLoading(false)
      } catch (err) {
        if (!mounted) return
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(`Failed to load moods: ${message}`)
        setIsLoading(false)
      }
    }

    loadMoods()

    return () => {
      mounted = false
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const updateMood = useCallback((day: Weekday, mood: Mood | null) => {
    const clientRequestId = nextClientRequestId.current++

    setOptimisticOverlay((prev) => ({ ...prev, [day]: mood }))

    inflightRequests.current.set(day, { clientRequestId, day, mood })

    const performUpdate = async () => {
      try {
        const response = await setMood(day, mood, clientRequestId)
        const inflight = inflightRequests.current.get(day)

        if (inflight && inflight.clientRequestId === response.clientRequestId) {
          const moodsRecord = response.days.reduce(
            (acc, dayData) => {
              acc[dayData.day] = dayData.mood
              return acc
            },
            {} as Record<Weekday, Mood | null>,
          )

          setServerMoods(moodsRecord)

          setOptimisticOverlay((prev) => {
            const newOverlay = { ...prev }
            delete newOverlay[day]
            return newOverlay
          })

          inflightRequests.current.delete(day)
        }
      } catch (err) {
        const inflight = inflightRequests.current.get(day)

        if (inflight && inflight.clientRequestId === clientRequestId) {
          setOptimisticOverlay((prev) => {
            const newOverlay = { ...prev }
            delete newOverlay[day]
            return newOverlay
          })

          inflightRequests.current.delete(day)

          const message = err instanceof Error ? err.message : 'Unknown error'
          setError(`Failed to update ${day}: ${message}`)
        }
      }
    }

    performUpdate()
  }, [])

  const moods = { ...serverMoods, ...optimisticOverlay }

  return {
    moods,
    isLoading,
    error,
    updateMood,
    clearError,
  }
}
