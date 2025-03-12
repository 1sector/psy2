import { ClientProfile } from "@/components/therapist/client-profile"
import { ClientProgress } from "@/components/therapist/client-progress"
import { ClientNotes } from "@/components/therapist/client-notes"
import { ClientTests } from "@/components/therapist/client-tests"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Имитация получения данных клиента по ID
const getClientData = (id: string) => {
  // В реальном приложении здесь будет запрос к API
  return {
    id,
    name: "Анна Петрова",
    age: 32,
    email: "anna.petrova@example.com",
    phone: "+7 (999) 123-45-67",
    startDate: "2023-09-15",
    sessions: 8,
    nextSession: "2023-12-05T14:00:00",
    diagnosis: "Тревожное расстройство",
    goals: ["Снижение уровня тревоги", "Улучшение сна", "Развитие навыков релаксации"],
    progress: [
      { date: "2023-09-15", anxietyLevel: 8, sleepQuality: 4, moodScore: 5 },
      { date: "2023-09-29", anxietyLevel: 7, sleepQuality: 5, moodScore: 6 },
      { date: "2023-10-13", anxietyLevel: 6, sleepQuality: 6, moodScore: 6 },
      { date: "2023-10-27", anxietyLevel: 5, sleepQuality: 7, moodScore: 7 },
      { date: "2023-11-10", anxietyLevel: 4, sleepQuality: 7, moodScore: 8 },
      { date: "2023-11-24", anxietyLevel: 3, sleepQuality: 8, moodScore: 8 },
    ],
  }
}

export default function ClientPage({ params }: { params: { id: string } }) {
  const client = getClientData(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/therapist/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{client.name}</h1>
      </div>

      <ClientProfile client={client} />

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="progress">Прогресс</TabsTrigger>
          <TabsTrigger value="notes">Заметки</TabsTrigger>
          <TabsTrigger value="tests">Тесты</TabsTrigger>
        </TabsList>
        <TabsContent value="progress" className="mt-6">
          <ClientProgress progressData={client.progress} />
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
          <ClientNotes clientId={client.id} />
        </TabsContent>
        <TabsContent value="tests" className="mt-6">
          <ClientTests clientId={client.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

