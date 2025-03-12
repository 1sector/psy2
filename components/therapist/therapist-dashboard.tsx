import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UpcomingSessions } from "@/components/therapist/upcoming-sessions"
import { ClientsOverview } from "@/components/therapist/clients-overview"
import { RecentTests } from "@/components/therapist/recent-tests"
import { Users, ClipboardList, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export function TherapistDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Панель управления</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-beige-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Клиенты</CardTitle>
            <CardDescription>Управление клиентами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Users className="h-8 w-8 text-beige-700" />
              <Button variant="outline" asChild className="border-beige-300">
                <Link href="/therapist/clients" className="flex items-center gap-1">
                  Перейти <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-beige-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Тесты</CardTitle>
            <CardDescription>Управление тестами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ClipboardList className="h-8 w-8 text-beige-700" />
              <Button variant="outline" asChild className="border-beige-300">
                <Link href="/therapist/tests" className="flex items-center gap-1">
                  Перейти <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-beige-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Расписание</CardTitle>
            <CardDescription>Управление сессиями</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Calendar className="h-8 w-8 text-beige-700" />
              <Button variant="outline" asChild className="border-beige-300">
                <Link href="/therapist/schedule" className="flex items-center gap-1">
                  Перейти <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingSessions />
        <ClientsOverview />
      </div>

      <RecentTests />
    </div>
  )
}

