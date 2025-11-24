'use client';

import { useState, useRef } from 'react';
import DayTile from "@/components/DayTile";
import MoodModal from "@/components/MoodModal";
import { WEEKDAYS, Weekday, Mood } from "@/types/mood";
import { useMoods } from "@/hooks/useMoods";

export default function Home() {
  const { moods, isLoading, error, updateMood, clearError } = useMoods();
  const [openDay, setOpenDay] = useState<Weekday | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openModal = (day: Weekday, opener?: HTMLElement | null) => {
    setOpenDay(day);
    openerRef.current = opener || null;
  };

  const closeModal = () => {
    setOpenDay(null);
    if (openerRef.current) {
      openerRef.current.focus();
    }
  };

  const handleSelect = (day: Weekday, mood: Mood) => {
    updateMood(day, mood);
    closeModal();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <main className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          7-Day Mood Board
        </h1>
        
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
          {WEEKDAYS.map((day) => (
            <DayTile key={day} day={day} mood={moods[day]} onOpen={openModal} />
          ))}
        </div>
      </main>
      <MoodModal
        isOpen={openDay !== null}
        day={openDay}
        onClose={closeModal}
        onSelect={handleSelect}
      />
    </div>
  );
}
