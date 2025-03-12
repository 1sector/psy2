"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Search, Eye, Calendar, Clock } from "lucide-react"

// Имитация данных о клиентах
const clientsData = [
  {
    id: "c1",
    name: "Анна Петрова",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "АП",
    email: "anna.petrova@example.com",
    phone: "+7 (999) 123-45-67",
    status: "active",
    startDate: "2023-09-15",
    sessions: 8,
    nextSession: "2023-12-05T14:00:00",
    diagnosis: "Тревожное расстройство",
  },
  {
    id: "c2",
    name: "Иван Сидоров",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ИС",
    email: "ivan.sidorov@example.com",
    phone: "+7 (999) 234-56-78",
    status: "active",
    startDate: "2023-10-03",
    sessions: 5,
    nextSession: "2023-12-06T10:30:00",
    diagnosis: "Депрессивное расстройство",
  },
  {
    id: "c3",
    name: "Мария Иванова",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "МИ",
    email: "maria.ivanova@example.com",
    phone: "+7 (999) 345-67-89",
    status: "active",
    startDate: "2023-08-22",
    sessions: 12,
    nextSession: "2023-12-07T16:15:00",
    diagnosis: "Панические атаки",
  },
  {
    id: "c4",
    name: "Алексей Петров",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "АП",
    email: "alexey.petrov@example.com",
    phone: "+7 (999) 456-78-90",
    status: "inactive",
    startDate: "2023-07-10",
    sessions: 15,
    nextSession: null,
    diagnosis: "Социальная тревожность",
  },
  {
    id: "c5",
    name: "Елена Соколова",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ЕС",
    email: "elena.sokolova@example.com",
    phone: "+7 (999) 567-89-01",
    status: "new",
    startDate: "2023-11-28",
    sessions: 1,
    nextSession: "2023-12-12T11:00:00",
    diagnosis: "Диагностика",
  },
]

// Форматирование даты и времени
function formatDateTime(dateString: string | null) {
  if (!dateString) return null

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

export function ClientsList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Фильтрация клиентов по поисковому запросу
  const filteredClients = clientsData.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-beige-500" />
        <Input
          type="search"
          placeholder="Поиск по имени, email или телефону..."
          className="border-beige-300 pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => {
          const nextSession = formatDateTime(client.nextSession)

          return (
            <Card key={client.id} className="overflow-hidden border-beige-200">
              <div className="flex items-center justify-between border-b border-beige-200 bg-beige-100 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-beige-200">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback className="bg-beige-200 text-beige-900">{client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{client.name}</h3>
                    <p className="text-sm text-beige-600">{client.diagnosis}</p>
                  </div>
                </div>
                <ClientStatusBadge status={client.status} />
              </div>

              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-beige-600">Email:</span>
                    <span>{client.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-beige-600">Телефон:</span>
                    <span>{client.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-beige-600">Сессий:</span>
                    <span>{client.sessions}</span>
                  </p>

                  {nextSession ? (
                    <div className="mt-4 rounded-md bg-beige-100 p-2">
                      <p className="text-xs font-medium text-beige-700">Следующая сессия:</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-beige-600" />
                          <span>{nextSession.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-beige-600" />
                          <span>{nextSession.time}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-md bg-beige-100 p-2">
                      <p className="text-xs text-beige-700">Нет запланированных сессий</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-beige-200 p-4">
                <Button asChild variant="outline" className="w-full border-beige-300">
                  <Link href={`/therapist/clients/${client.id}`} className="flex items-center justify-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Профиль клиента</span>
                  </Link>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredClients.length === 0 && (
        <div className="rounded-lg border border-beige-200 bg-beige-50 p-8 text-center">
          <p className="text-beige-600">Клиенты не найдены</p>
        </div>
      )}
    </div>
  )
}

