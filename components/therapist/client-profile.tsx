import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, Clock } from "lucide-react"

interface ClientProfileProps {
  client: {
    id: string
    name: string
    avatar: string
    initials: string
    email: string
    phone: string
    status: string
    startDate: string
    sessions: number
    nextSession: string | null
    diagnosis: string
    goals?: string[]
  }
}

// Компонент для отображения статуса клиента
function ClientStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: { label: "Активный", className: "bg-green-100 text-green-800 hover:bg-green-200" },
    inactive: { label: "Неактивный", className: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
    new: { label: "Новый", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  }

  const { label, className } = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  }

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

// Форматирование даты и времени
function formatDateTime(dateString: string | null) {
  if (!dateString) return null

  const date = new Date(dateString)
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)

  const formattedTime = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)

  return { date: formattedDate, time: formattedTime }
}

export function ClientProfile({ client }: ClientProfileProps) {
  const startDate = new Date(client.startDate)
  const formattedStartDate = new Intl.DateTimeFormat("ru-RU").format(startDate)
  const nextSession = formatDateTime(client.nextSession)

  return (
    <Card className="border-beige-200">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex items-center gap-4 md:flex-col md:items-center">
            <Avatar className="h-16 w-16 border border-beige-200 md:h-24 md:w-24">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback className="bg-beige-200 text-beige-900 text-xl">{client.initials}</AvatarFallback>
            </Avatar>
            <div className="md:mt-2 md:text-center">
              <h2 className="text-xl font-bold md:text-2xl">{client.name}</h2>
              <div className="mt-1 flex md:justify-center">
                <ClientStatusBadge status={client.status} />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-beige-600">Контактная информация</h3>
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-beige-600" />
                    <span>{client.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-beige-600" />
                    <span>{client.phone}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-beige-600">Информация о терапии</h3>
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-beige-600" />
                    <span>Начало: {formattedStartDate}</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-beige-600">Сессий:</span>
                    <span>{client.sessions}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-beige-600">Диагноз</h3>
              <p className="text-sm">{client.diagnosis}</p>
            </div>

            {client.goals && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-beige-600">Цели терапии</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {client.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}

            {nextSession && (
              <div className="rounded-md bg-beige-100 p-3">
                <h3 className="text-sm font-medium text-beige-700">Следующая сессия</h3>
                <div className="mt-1 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-beige-600" />
                    <span>{nextSession.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-beige-600" />
                    <span>{nextSession.time}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

