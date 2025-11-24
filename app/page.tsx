'use client';

import { useState, useRef } from 'react';
import DayTile from "@/components/DayTile";
import MoodModal from "@/components/MoodModal";
import { WEEKDAYS, Weekday, Mood } from "@/types/mood";

export default function Home() {
  const [moods, setMoods] = useState<Record<Weekday, Mood | null>>(
    WEEKDAYS.reduce((acc, day) => ({ ...acc, [day]: null }), {} as Record<Weekday, Mood | null>)
  );
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
    setMoods(prev => ({ ...prev, [day]: mood }));
    closeModal();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <main className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          7-Day Mood Board
        </h1>
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
