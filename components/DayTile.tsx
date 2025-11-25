'use client'

import { useCallback } from 'react'
import { Mood, Weekday, MOODS } from '@/types/mood'

type DayTileProps = {
  day: Weekday
  mood: Mood | null
  onOpen: (day: Weekday, originatingElement?: HTMLElement | null) => void
  isSelected?: boolean
  onKeyDown?: (e: React.KeyboardEvent, day: Weekday) => void
  setRef?: (day: Weekday, el: HTMLButtonElement | null) => void
}

export default function DayTile({
  day,
  mood,
  onOpen,
  isSelected,
  onKeyDown,
  setRef,
}: DayTileProps) {
  const moodData = mood ? MOODS.find((m) => m.key === mood) : null

  const refCallback = useCallback(
    (el: HTMLButtonElement | null) => {
      setRef?.(day, el)
    },
    [day, setRef],
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpen(day, e.currentTarget)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e, day)
  }

  return (
    <button
      ref={refCallback}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={isSelected}
      className="flex flex-col items-center justify-center min-w-[100px] min-h-[100px] border border-gray-300 rounded-md p-4 gap-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      style={moodData ? { backgroundColor: moodData.color } : undefined}
    >
      <div className="text-2xl h-8">{moodData ? moodData.emoji : ''}</div>
      <div
        className={`text-sm font-medium ${moodData ? 'text-gray-900' : 'text-gray-700'}`}
      >
        {day}
      </div>
    </button>
  )
}
