'use client';

import { useRef } from 'react';
import { Mood, Weekday, MOODS } from '@/types/mood';

type DayTileProps = {
  day: Weekday;
  mood: Mood | null;
  onOpen: (day: Weekday, originatingElement?: HTMLElement | null) => void;
};

export default function DayTile({ day, mood, onOpen }: DayTileProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moodData = mood ? MOODS.find(m => m.key === mood) : null;

  const handleClick = () => {
    onOpen(day, buttonRef.current);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      aria-haspopup="dialog"
      aria-expanded="false"
      className="flex flex-col items-center justify-center min-w-[100px] min-h-[100px] border border-gray-300 rounded-md p-4 gap-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      style={moodData ? { backgroundColor: moodData.color } : undefined}
    >
      <div className="text-2xl h-8">
        {moodData ? moodData.emoji : ''}
      </div>
      <div className={`text-sm font-medium ${moodData ? 'text-gray-900' : 'text-gray-700'}`}>
        {day}
      </div>
    </button>
  );
}
