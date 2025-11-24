'use client';

import { useEffect, useRef } from 'react';
import { Mood, MOODS } from '@/types/mood';

type MoodPickerProps = {
  onChoose: (mood: Mood) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
};

export default function MoodPicker({ onChoose, onCancel, autoFocus }: MoodPickerProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoFocus && firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="grid grid-cols-2 gap-3">
      {MOODS.map((mood, index) => (
        <button
          key={mood.key}
          ref={index === 0 ? firstButtonRef : null}
          data-mood={mood.key}
          aria-pressed="false"
          onClick={() => onChoose(mood.key)}
          className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <span className="text-3xl mb-2">{mood.emoji}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{mood.label}</span>
          <div
            className="mt-2 w-12 h-3 rounded"
            style={{ backgroundColor: mood.color }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
