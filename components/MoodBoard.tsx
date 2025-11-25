import { getMoods } from '@/actions/moods'
import { WEEKDAYS, Weekday, Mood } from '@/types/mood'
import MoodBoardClient from './MoodBoardClient'

export default async function MoodBoard() {
  const initialMoods = await getMoods()

  const moodsRecord = initialMoods.days.reduce(
    (acc, dayData) => {
      acc[dayData.day] = dayData.mood
      return acc
    },
    {} as Record<Weekday, Mood | null>,
  )

  return <MoodBoardClient initialMoods={moodsRecord} weekdays={WEEKDAYS} />
}
