import { Calendar } from "@/components/therapist/calendar"

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Расписание</h1>
      <Calendar />
    </div>
  )
}

