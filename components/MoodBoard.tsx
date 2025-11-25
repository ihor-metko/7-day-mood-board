import WeekdayHeader from '@/components/WeekdayHeader'
import MoodBoardClient from '@/components/MoodBoardClient'

export default function MoodBoard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <main className="w-full max-w-6xl">
        <WeekdayHeader title="7-Day Mood Board" />
        <MoodBoardClient />
      </main>
    </div>
  )
}
