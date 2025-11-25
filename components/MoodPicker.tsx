'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Mood, MOODS } from '@/types/mood'
import MoodOption from './MoodOption'

type MoodPickerProps = {
  onChoose: (mood: Mood) => void
  autoFocus?: boolean
}

export default function MoodPicker({ onChoose, autoFocus }: MoodPickerProps) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (autoFocus && buttonRefs.current[0]) {
      buttonRefs.current[0].focus()
    }
  }, [autoFocus])

  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonRefs.current[index] = el
    },
    [],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const len = MOODS.length

      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight'
      ) {
        e.preventDefault()
        let nextIndex: number

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          nextIndex = (index - 1 + len) % len
        } else {
          nextIndex = (index + 1) % len
        }

        setFocusedIndex(nextIndex)
        buttonRefs.current[nextIndex]?.focus()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChoose(MOODS[index].key)
      }
    },
    [onChoose],
  )

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3" role="listbox">
      {MOODS.map((mood, index) => (
        <MoodOption
          key={mood.key}
          mood={mood}
          onSelect={() => onChoose(mood.key)}
          buttonRef={setButtonRef(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          isFocused={focusedIndex === index}
        />
      ))}
    </div>
  )
}
