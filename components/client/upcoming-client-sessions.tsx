"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"
import Link from "next/link"
import { getClientUpcomingSessions } from "@/services/client-service"
import type { Database } from "@/lib/database.types"

type Session = Database["public"]["Tables"]["sessions"]["Row"]

interface UpcomingClientSessionsProps {
  clientId: string
}

// Форматирование даты и времени
function formatDateTime(date: string, time: string) {
  const dateObj = new Date(`${date}T${time}`)

  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(dateObj)

  const formattedTime = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj)

  return { date: formattedDate, time: formattedTime }
}

export function UpcomingClientSessions({ clientId }: UpcomingClientSessionsProps) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSessions = async () => {
      if (clientId) {
        try {
          const data = await getClientUpcomingSessions(clientId)
          setSessions(data)
        } catch (error) {
          console.error("Ошибка при загрузке сессий:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchSessions()
  }, [clientId])

  if (isLoading) {
    return (
      <Card className="border-beige-200">
        <CardHeader>
          <CardTitle>Предстоящие сессии</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-beige-300 border-t-beige-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-beige-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Предстоящие сессии</CardTitle>
        <Button variant="outline" asChild className="border-beige-300">
          <Link href="/client/sessions">Все сессии</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => {
              const { date, time } = formatDateTime(session.date, session.time)
              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-lg border border-beige-200 p-4"
                >
                  <div>
                    <h3 className="font-medium">Сессия с психологом</h3>
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
                  {session.type === "online" && (
                    <Button size="sm" className="bg-beige-900 text-beige-50 hover:bg-beige-800">
                      <Video className="mr-2 h-4 w-4" />
                      Подключиться
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-beige-200 bg-beige-50 p-8 text-center">
            <p className="text-beige-600">У вас нет запланированных сессий</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

