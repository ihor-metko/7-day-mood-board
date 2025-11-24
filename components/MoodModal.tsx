'use client';

import { useEffect, useRef } from 'react';
import { Mood, Weekday } from '@/types/mood';
import MoodPicker from './MoodPicker';

type MoodModalProps = {
  isOpen: boolean;
  day: Weekday | null;
  onClose: () => void;
  onSelect: (day: Weekday, mood: Mood) => void;
};

export default function MoodModal({ isOpen, day, onClose, onSelect }: MoodModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button[data-mood], button[aria-label="Close modal"]'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSelect = (mood: Mood) => {
    if (day) {
      onSelect(day, mood);
    }
  };

  if (!isOpen || !day) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mood-dialog-title"
        className="bg-white dark:bg-gray-900 rounded-lg p-4 w-80"
      >
        <h2 id="mood-dialog-title" className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Choose mood for {day}
        </h2>
        <MoodPicker onChoose={handleSelect} autoFocus={true} />
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="mt-4 w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
