type WeekdayHeaderProps = {
  title: string
}

export default function WeekdayHeader({ title }: WeekdayHeaderProps) {
  return (
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
      {title}
    </h1>
  )
}
