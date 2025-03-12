"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Video } from "lucide-react"

// Имитация данных о сессиях
const sessionsData = [
  {
    id: "s1",
    clientId: "c1",
    clientName: "Анна Петрова",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "АП",
    date: "2023-12-05",
    time: "14:00",
    duration: 60,
    type: "online",
  },
  {
    id: "s2",
    clientId: "c2",
    clientName: "Иван Сидоров",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ИС",
    date: "2023-12-06",
    time: "10:30",
    duration: 45,
    type: "in-person",
  },
  {
    id: "s3",
    clientId: "c3",
    clientName: "Мария Иванова",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "МИ",
    date: "2023-12-07",
    time: "16:15",
    duration: 60,
    type: "online",
  },
  {
    id: "s4",
    clientId: "c5",
    clientName: "Елена Соколова",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ЕС",
    date: "2023-12-12",
    time: "11:00",
    duration: 60,
    type: "in-person",
  },
]

// Имитация данных о клиентах
const clientsData = [
  {
    id: "c1",
    name: "Анна Петрова",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "АП",
  },
  {
    id: "c2",
    name: "Иван Сидоров",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ИС",
  },
  {
    id: "c3",
    name: "Мария Иванова",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "МИ",
  },
  {
    id: "c4",
    name: "Алексей Петров",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "АП",
  },
  {
    id: "c5",
    name: "Елена Соколова",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ЕС",
  },
]

// Функция для получения дней месяца
function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1)
  const days = []

  // Получаем день недели первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
  let firstDayOfWeek = date.getDay()
  // Преобразуем для начала недели с понедельника (0 - понедельник, 6 - воскресенье)
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // Добавляем пустые ячейки для дней предыдущего месяца
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }

  // Добавляем дни текущего месяца
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  return days
}

// Функция для форматирования даты
function formatDate(date: Date) {
  return date.toISOString().split("T")[0]
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sessions, setSessions] = useState(sessionsData)
  const [newSession, setNewSession] = useState({
    clientId: "",
    date: "",
    time: "",
    duration: "60",
    type: "online",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = getDaysInMonth(year, month)

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]

  const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleAddSession = async () => {
    if (!newSession.clientId || !newSession.date || !newSession.time) return

    setIsSubmitting(true)

    try {
      // В реальном приложении здесь будет отправка данных на сервер
      const client = clientsData.find((c) => c.id === newSession.clientId)

      if (!client) {
        throw new Error("Клиент не найден")
      }

      const newSessionObj = {
        id: `s${Date.now()}`,
        clientId: client.id,
        clientName: client.name,
        avatar: client.avatar,
        initials: client.initials,
        date: newSession.date,
        time: newSession.time,
        duration: Number.parseInt(newSession.duration),
        type: newSession.type,
      }

      // Имитация задержки запроса
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSessions([...sessions, newSessionObj])
      setNewSession({
        clientId: "",
        date: "",
        time: "",
        duration: "60",
        type: "online",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Ошибка при добавлении сессии:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Получаем сессии для конкретного дня
  const getSessionsForDay = (date: Date) => {
    const dateString = formatDate(date)
    return sessions.filter((session) => session.date === dateString)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 border-beige-300">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {monthNames[month]} {year}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 border-beige-300">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-beige-900 text-beige-50 hover:bg-beige-800">
          <Plus className="mr-2 h-4 w-4" />
          Добавить сессию
        </Button>
      </div>

      <Card className="border-beige-200">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b border-beige-200 bg-beige-100">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              if (!day) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="min-h-[120px] border-b border-r border-beige-200 bg-beige-50 p-2"
                  />
                )
              }

              const isToday = new Date().toDateString() === day.toDateString()
              const daySessions = getSessionsForDay(day)

              return (
                <div
                  key={day.getTime()}
                  className={`min-h-[120px] border-b border-r border-beige-200 p-2 ${isToday ? "bg-beige-100" : ""}`}
                >
                  <div className={`mb-1 text-right text-sm ${isToday ? "font-bold" : ""}`}>{day.getDate()}</div>

                  <div className="space-y-1">
                    {daySessions.map((session) => (
                      <div
                        key={session.id}
                        className={`rounded-md p-1 text-xs ${
                          session.type === "online" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={session.avatar} alt={session.clientName} />
                            <AvatarFallback className="text-[8px]">{session.initials}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{session.clientName}</span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between">
                          <span>{session.time}</span>
                          {session.type === "online" && <Video className="h-3 w-3" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить сессию</DialogTitle>
            <DialogDescription>Заполните информацию о новой сессии.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client">Клиент</Label>
              <Select
                value={newSession.clientId}
                onValueChange={(value) => setNewSession({ ...newSession, clientId: value })}
              >
                <SelectTrigger id="client" className="border-beige-300">
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  {clientsData.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Дата</Label>
                <Input
                  id="date"
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  className="border-beige-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Время</Label>
                <Input
                  id="time"
                  type="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                  className="border-beige-300"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Длительность (мин)</Label>
                <Select
                  value={newSession.duration}
                  onValueChange={(value) => setNewSession({ ...newSession, duration: value })}
                >
                  <SelectTrigger id="duration" className="border-beige-300">
                    <SelectValue placeholder="Выберите длительность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 минут</SelectItem>
                    <SelectItem value="45">45 минут</SelectItem>
                    <SelectItem value="60">60 минут</SelectItem>
                    <SelectItem value="90">90 минут</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Тип сессии</Label>
                <Select
                  value={newSession.type}
                  onValueChange={(value) => setNewSession({ ...newSession, type: value })}
                >
                  <SelectTrigger id="type" className="border-beige-300">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Онлайн</SelectItem>
                    <SelectItem value="in-person">Очно</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-beige-300">
              Отмена
            </Button>
            <Button
              onClick={handleAddSession}
              disabled={!newSession.clientId || !newSession.date || !newSession.time || isSubmitting}
              className="bg-beige-900 text-beige-50 hover:bg-beige-800"
            >
              {isSubmitting ? "Добавление..." : "Добавить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

