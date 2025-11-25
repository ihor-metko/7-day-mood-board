'use client'

import { Mood, Weekday } from '@/types/mood'
import Modal from './Modal'
import MoodPicker from './MoodPicker'

type MoodModalProps = {
  isOpen: boolean
  day: Weekday | null
  onClose: () => void
  onSelect: (day: Weekday, mood: Mood) => void
}

export default function MoodModal({
  isOpen,
  day,
  onClose,
  onSelect,
}: MoodModalProps) {
  const handleSelect = (mood: Mood) => {
    if (day) {
      onSelect(day, mood)
    }
  }

  if (!day) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabelledBy="mood-dialog-title">
      <h2
        id="mood-dialog-title"
        className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200"
      >
        Choose mood for {day}
      </h2>
      <MoodPicker onChoose={handleSelect} autoFocus={isOpen} />
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="mt-4 w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Close
      </button>
    </Modal>
  )
}
