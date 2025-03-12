import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"
import Link from "next/link"

// Имитация данных о предстоящих сессиях
const upcomingSessions = [
  {
    id: "1",
    clientId: "c1",
    clientName: "Анна Петрова",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "АП",
    date: "2023-12-05T14:00:00",
    duration: 60,
    type: "online",
  },
  {
    id: "2",
    clientId: "c2",
    clientName: "Иван Сидоров",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ИС",
    date: "2023-12-06T10:30:00",
    duration: 45,
    type: "in-person",
  },
  {
    id: "3",
    clientId: "c3",
    clientName: "Мария Иванова",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "МИ",
    date: "2023-12-07T16:15:00",
    duration: 60,
    type: "online",
  },
]

// Форматирование даты и времени
function formatDateTime(dateString: string) {
  const date = new Date(dateString)
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date)

  const formattedTime = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)

  return { date: formattedDate, time: formattedTime }
}

export function UpcomingSessions() {
  return (
    <Card className="border-beige-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Предстоящие сессии</CardTitle>
        <Button variant="outline" asChild className="border-beige-300">
          <Link href="/therapist/schedule">Все сессии</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingSessions.map((session) => {
            const { date, time } = formatDateTime(session.date)
            return (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg border border-beige-200 p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border border-beige-200">
                    <AvatarImage src={session.avatar} alt={session.clientName} />
                    <AvatarFallback className="bg-beige-200 text-beige-900">{session.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{session.clientName}</h3>
                    <div className="flex items-center gap-4 text-sm text-beige-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {session.type === "online" && (
                  <Button size="sm" className="bg-beige-900 text-beige-50 hover:bg-beige-800">
                    <Video className="mr-2 h-4 w-4" />
                    Начать
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

