interface DayTileProps {
  day: string;
}

export default function DayTile({ day }: DayTileProps) {
  return (
    <div className="flex flex-col items-center justify-center min-w-[100px] min-h-[100px] border border-gray-300 rounded-md p-4 gap-2">
      <div className="text-2xl h-8">
        {/* Empty emoji placeholder */}
      </div>
      <div className="text-sm font-medium text-gray-700">
        {day}
      </div>
    </div>
  );
}
