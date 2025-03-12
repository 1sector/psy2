"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ClipboardCheck } from "lucide-react"
import Link from "next/link"
import { getClientAssignedTests } from "@/services/client-service"
import type { Database } from "@/lib/database.types"

type AssignedTest = Database["public"]["Tables"]["assigned_tests"]["Row"] & {
  tests?: {
    id: string
    title: string
    description: string
  }
}

interface AssignedTestsProps {
  clientId: string
}

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

export function AssignedTests({ clientId }: AssignedTestsProps) {
  const [tests, setTests] = useState<AssignedTest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTests = async () => {
      if (clientId) {
        try {
          const data = await getClientAssignedTests(clientId)
          setTests(data)
        } catch (error) {
          console.error("Ошибка при загрузке тестов:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchTests()
  }, [clientId])

  if (isLoading) {
    return (
      <Card className="border-beige-200">
        <CardHeader>
          <CardTitle>Назначенные тесты</CardTitle>
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
        <CardTitle>Назначенные тесты</CardTitle>
        <Button variant="outline" asChild className="border-beige-300">
          <Link href="/client/tests">Все тесты</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {tests.length > 0 ? (
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="flex items-center justify-between rounded-lg border border-beige-200 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{test.tests?.title || "Тест"}</h3>
                    <TestStatusBadge status={test.status} />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-beige-600">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Назначен: {formatDate(test.assigned_date)}</span>
                  </div>
                </div>
                {test.status === "pending" && (
                  <Button size="sm" asChild className="bg-beige-900 text-beige-50 hover:bg-beige-800">
                    <Link href={`/client/tests/${test.id}`}>
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Пройти
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-beige-200 bg-beige-50 p-8 text-center">
            <p className="text-beige-600">У вас нет назначенных тестов</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

