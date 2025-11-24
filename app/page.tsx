import DayTile from "@/components/DayTile";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <main className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          7-Day Mood Board
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {WEEKDAYS.map((day) => (
            <DayTile key={day} day={day} />
          ))}
        </div>
      </main>
    </div>
  );
}
