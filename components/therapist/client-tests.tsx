"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, ClipboardList, Eye, Send } from "lucide-react"
import Link from "next/link"

interface Test {
  id: string
  name: string
  description: string
}

interface AssignedTest {
  id: string
  testId: string
  testName: string
  date: string
  status: "pending" | "completed" | "expired"
  score?: number
}

interface ClientTestsProps {
  clientId: string
}

// Имитация данных о доступных тестах
const availableTests: Test[] = [
  {
    id: "t1",
    name: "Шкала тревоги Бека",
    description: "Оценка уровня тревоги",
  },
  {
    id: "t2",
    name: "Опросник депрессии Бека",
    description: "Оценка уровня депрессии",
  },
  {
    id: "t3",
    name: "Шкала тревоги Спилбергера",
    description: "Оценка ситуативной и личностной тревожности",
  },
  {
    id: "t4",
    name: "Опросник качества жизни",
    description: "Оценка субъективного качества жизни",
  },
]

// Имитация данных о назначенных тестах
const initialAssignedTests: AssignedTest[] = [
  {
    id: "at1",
    testId: "t1",
    testName: "Шкала тревоги Бека",
    date: "2023-11-28",
    status: "completed",
    score: 18,
  },
  {
    id: "at2",
    testId: "t2",
    testName: "Опросник депрессии Бека",
    date: "2023-11-15",
    status: "completed",
    score: 12,
  },
  {
    id: "at3",
    testId: "t3",
    testName: "Шкала тревоги Спилбергера",
    date: "2023-12-10",
    status: "pending",
  },
]

// Форматирование даты
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ru-RU").format(date)
}

// Компонент для отображения статуса теста
function TestStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: { label: "Ожидает", className: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
    completed: { label: "Завершен", className: "bg-green-100 text-green-800 hover:bg-green-200" },
    expired: { label: "Просрочен", className: "bg-red-100 text-red-800 hover:bg-red-200" },
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

export function ClientTests({ clientId }: ClientTestsProps) {
  const [assignedTests, setAssignedTests] = useState<AssignedTest[]>(initialAssignedTests)
  const [selectedTest, setSelectedTest] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAssignTest = async () => {
    if (!selectedTest) return

    setIsSubmitting(true)

    try {
      // В реальном приложении здесь будет отправка данных на сервер
      const selectedTestData = availableTests.find((test) => test.id === selectedTest)

      if (!selectedTestData) {
        throw new Error("Тест не найден")
      }

      const currentDate = new Date().toISOString().split("T")[0]
      const newAssignedTest: AssignedTest = {
        id: `at${Date.now()}`,
        testId: selectedTestData.id,
        testName: selectedTestData.name,
        date: currentDate,
        status: "pending",
      }

      // Имитация задержки запроса
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAssignedTests([newAssignedTest, ...assignedTests])
      setSelectedTest("")
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Ошибка при назначении теста:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Назначенные тесты</h3>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-beige-900 text-beige-50 hover:bg-beige-800">
          <ClipboardList className="mr-2 h-4 w-4" />
          Назначить тест
        </Button>
      </div>

      {assignedTests.length > 0 ? (
        <div className="space-y-4">
          {assignedTests.map((test) => (
            <Card key={test.id} className="border-beige-200">
              <CardContent className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{test.testName}</h4>
                      <TestStatusBadge status={test.status} />
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-beige-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(test.date)}</span>
                    </div>
                    {test.status === "completed" && test.score !== undefined && (
                      <div className="mt-2">
                        <span className="text-sm font-medium">Результат: {test.score}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {test.status === "pending" && (
                      <Button variant="outline" size="sm" className="border-beige-300">
                        <Send className="mr-2 h-4 w-4" />
                        Напомнить
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild className="border-beige-300">
                      <Link href={`/therapist/tests/${test.testId}/results/${test.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        {test.status === "completed" ? "Результаты" : "Детали"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-beige-200 bg-beige-50 p-8 text-center">
          <p className="text-beige-600">Нет назначенных тестов</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Назначить тест</DialogTitle>
            <DialogDescription>Выберите тест, который хотите назначить клиенту.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Select value={selectedTest} onValueChange={setSelectedTest}>
              <SelectTrigger className="border-beige-300">
                <SelectValue placeholder="Выберите тест" />
              </SelectTrigger>
              <SelectContent>
                {availableTests.map((test) => (
                  <SelectItem key={test.id} value={test.id}>
                    {test.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedTest && (
              <div className="mt-4 rounded-md bg-beige-100 p-3">
                <p className="text-sm text-beige-700">
                  {availableTests.find((test) => test.id === selectedTest)?.description}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-beige-300">
              Отмена
            </Button>
            <Button
              onClick={handleAssignTest}
              disabled={!selectedTest || isSubmitting}
              className="bg-beige-900 text-beige-50 hover:bg-beige-800"
            >
              {isSubmitting ? "Назначение..." : "Назначить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

