'use client'

import { useEffect, useRef } from 'react'
import { Mood, MOODS } from '@/types/mood'
import MoodOption from './MoodOption'

type MoodPickerProps = {
  onChoose: (mood: Mood) => void
  autoFocus?: boolean
}

export default function MoodPicker({ onChoose, autoFocus }: MoodPickerProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (autoFocus && firstButtonRef.current) {
      firstButtonRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className="grid grid-cols-2 gap-3">
      {MOODS.map((mood, index) => (
        <MoodOption
          key={mood.key}
          ref={index === 0 ? firstButtonRef : null}
          mood={mood}
          onChoose={onChoose}
        />
      ))}
    </div>
  )
}
