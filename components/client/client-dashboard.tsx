"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UpcomingClientSessions } from "@/components/client/upcoming-client-sessions"
import { AssignedTests } from "@/components/client/assigned-tests"
import { TherapyProgress } from "@/components/client/therapy-progress"
import { Calendar, ClipboardList, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { getClientTherapist, getClientProgressRecords } from "@/services/client-service"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type ProgressRecord = Database["public"]["Tables"]["progress_records"]["Row"]

export function ClientDashboard() {
  const { user, profile } = useAuth()
  const [therapist, setTherapist] = useState<Profile | null>(null)
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const [therapistData, progressData] = await Promise.all([
            getClientTherapist(user.id),
            getClientProgressRecords(user.id),
          ])

          setTherapist(therapistData)
          setProgressRecords(progressData)
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-beige-300 border-t-beige-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border border-beige-200">
            <AvatarImage
              src={profile?.avatar_url || "/placeholder.svg?height=80&width=80"}
              alt={profile?.full_name || ""}
            />
            <AvatarFallback className="bg-beige-200 text-beige-900 text-xl">
              {profile?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Здравствуйте, {profile?.full_name?.split(" ")[0] || ""}!</h1>
            <p className="text-beige-700">Добро пожаловать в ваш личный кабинет</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-beige-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Мои сессии</CardTitle>
            <CardDescription>Управление сессиями</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Calendar className="h-8 w-8 text-beige-700" />
              <Button variant="outline" asChild className="border-beige-300">
                <Link href="/client/sessions" className="flex items-center gap-1">
                  Перейти <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-beige-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Мои тесты</CardTitle>
            <CardDescription>Назначенные тесты</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ClipboardList className="h-8 w-8 text-beige-700" />
              <Button variant="outline" asChild className="border-beige-300">
                <Link href="/client/tests" className="flex items-center gap-1">
                  Перейти <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-beige-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Сообщения</CardTitle>
            <CardDescription>Общение с психологом</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <MessageSquare className="h-8 w-8 text-beige-700" />
              <Button variant="outline" asChild className="border-beige-300">
                <Link href="/client/messages" className="flex items-center gap-1">
                  Перейти <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {therapist ? (
          <Card className="border-beige-200">
            <CardHeader>
              <CardTitle>Мой психолог</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-beige-200">
                  <AvatarImage
                    src={therapist.avatar_url || "/placeholder.svg?height=40&width=40"}
                    alt={therapist.full_name}
                  />
                  <AvatarFallback className="bg-beige-200 text-beige-900">
                    {therapist.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{therapist.full_name}</h3>
                  <p className="text-sm text-beige-700">Психотерапевт</p>
                  <Button variant="outline" size="sm" className="mt-2 border-beige-300">
                    <MessageSquare className="mr-2 h-3.5 w-3.5" />
                    Написать сообщение
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-beige-200">
            <CardHeader>
              <CardTitle>Мой психолог</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-beige-700">У вас пока нет назначенного психолога</p>
            </CardContent>
          </Card>
        )}

        <TherapyProgress progressData={progressRecords} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingClientSessions clientId={user?.id || ""} />
        <AssignedTests clientId={user?.id || ""} />
      </div>
    </div>
  )
}

