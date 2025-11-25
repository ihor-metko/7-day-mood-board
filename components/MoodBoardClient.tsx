'use client'

import { useState, useRef, useCallback } from 'react'
import DayTile from '@/components/DayTile'
import MoodModal from '@/components/MoodModal'
import { Weekday, Mood } from '@/types/mood'
import { useMoods } from '@/hooks/useMoods'

type MoodBoardClientProps = {
  initialMoods: Record<Weekday, Mood | null>
  weekdays: Weekday[]
}

export default function MoodBoardClient({
  initialMoods,
  weekdays,
}: MoodBoardClientProps) {
  const { moods, isLoading, error, updateMood, clearError } =
    useMoods(initialMoods)
  const [openDay, setOpenDay] = useState<Weekday | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const openModal = useCallback((day: Weekday, opener?: HTMLElement | null) => {
    setOpenDay(day)
    openerRef.current = opener || null
  }, [])

  const closeModal = useCallback(() => {
    setOpenDay(null)
    if (openerRef.current) {
      openerRef.current.focus()
    }
  }, [])

  const handleSelect = useCallback(
    (day: Weekday, mood: Mood) => {
      updateMood(day, mood)
      closeModal()
    },
    [updateMood, closeModal],
  )

  return (
    <>
      {isLoading && (
        <div className="text-center mb-4 text-gray-600">Loading moods...</div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="ml-4 px-3 py-1 bg-red-200 hover:bg-red-300 rounded text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {weekdays.map((day) => (
          <DayTile key={day} day={day} mood={moods[day]} onOpen={openModal} />
        ))}
      </div>

      <MoodModal
        isOpen={openDay !== null}
        day={openDay}
        onClose={closeModal}
        onSelect={handleSelect}
      />
    </>
  )
}
