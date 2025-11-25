'use client'

import { MoodDefinition } from '@/types/mood'

type MoodOptionProps = {
  mood: MoodDefinition
  onSelect: () => void
  buttonRef?: React.RefObject<HTMLButtonElement | null>
}

export default function MoodOption({
  mood,
  onSelect,
  buttonRef,
}: MoodOptionProps) {
  return (
    <button
      ref={buttonRef}
      data-mood={mood.key}
      aria-pressed="false"
      onClick={onSelect}
      className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    >
      <span className="text-3xl mb-2">{mood.emoji}</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {mood.label}
      </span>
      <div
        className="mt-2 w-12 h-3 rounded"
        style={{ backgroundColor: mood.color }}
        aria-hidden="true"
      />
    </button>
  )
}
