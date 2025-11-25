import MoodBoard from '@/components/MoodBoard'
import WeekdayHeader from '@/components/WeekdayHeader'

// Disable static generation to ensure fresh data on each request
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <main className="w-full max-w-6xl">
        <WeekdayHeader title="7-Day Mood Board" />
        <MoodBoard />
      </main>
    </div>
  )
}
