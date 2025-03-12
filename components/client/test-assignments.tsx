"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, AlertCircle } from "lucide-react"
import type { Database } from "@/lib/database.types"

type AssignedTest = Database["public"]["Tables"]["assigned_tests"]["Row"] & {
  test: Database["public"]["Tables"]["tests"]["Row"]
  therapist: Database["public"]["Tables"]["profiles"]["Row"]
}

export function TestAssignments() {
  const { user } = useAuth()
  const [assignedTests, setAssignedTests] = useState<AssignedTest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchAssignedTests = async () => {
      try {
        setIsLoading(true)
        
        // Получаем назначенные тесты для текущего пользователя
        const { data, error } = await supabase
          .from("assigned_tests")
          .select(`
            *,
            test:test_id(*),
            therapist:therapist_id(*)
          `)
          .eq("client_id", user.id)
          .order("assigned_date", { ascending: false })
        
        if (error) throw error
        
        setAssignedTests(data as AssignedTest[])
      } catch (error) {
        console.error("Ошибка при загрузке назначенных тестов:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssignedTests()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-beige-700">Загрузка назначенных тестов...</p>
      </div>
    )
  }

  if (assignedTests.length === 0) {
    return (
      <Card className="border-beige-200 bg-beige-50">
        <CardHeader>
          <CardTitle className="text-xl text-beige-900">Назначенные тесты</CardTitle>
          <CardDescription className="text-beige-700">
            Тесты, назначенные вашим терапевтом
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="mb-3 h-12 w-12 text-beige-400" />
            <h3 className="mb-1 text-lg font-medium text-beige-900">Нет назначенных тестов</h3>
            <p className="mb-4 text-beige-700">
              В настоящее время у вас нет назначенных тестов от вашего терапевта.
            </p>
            <Link href="/tests">
              <Button className="bg-beige-900 text-beige-50 hover:bg-beige-800">
                Просмотреть доступные тесты
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-beige-200 bg-beige-50">
      <CardHeader>
        <CardTitle className="text-xl text-beige-900">Назначенные тесты</CardTitle>
        <CardDescription className="text-beige-700">
          Тесты, назначенные вашим терапевтом
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignedTests.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-lg border border-beige-200 bg-white p-4 shadow-sm transition-all hover:shadow"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-beige-900">{assignment.test.title}</h3>
                  <p className="text-sm text-beige-700">{assignment.test.description}</p>
                </div>
                <Badge
                  className={
                    assignment.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : assignment.status === "expired"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }
                >
                  {assignment.status === "completed"
                    ? "Завершен"
                    : assignment.status === "expired"
                    ? "Просрочен"
                    : "Ожидает выполнения"}
                </Badge>
              </div>
              <div className="mb-3 flex flex-wrap gap-3 text-xs text-beige-700">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Назначен: {new Date(assignment.assigned_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>
                    {JSON.parse(assignment.test.questions as string).length} вопросов
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-xs text-beige-600">
                  Назначил: {assignment.therapist.full_name}
                </div>
                {assignment.status === "pending" && (
                  <Link href={`/client/tests/${assignment.test_id}`}>
                    <Button size="sm" className="bg-beige-900 text-beige-50 hover:bg-beige-800">
                      Пройти тест
                    </Button>
                  </Link>
                )}
                {assignment.status === "completed" && (
                  <Link href={`/client/tests/${assignment.test_id}/results`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-beige-300 text-beige-900 hover:bg-beige-100"
                    >
                      Просмотреть результаты
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/tests" className="w-full">
          <Button
            variant="outline"
            className="w-full border-beige-300 text-beige-900 hover:bg-beige-100"
          >
            Просмотреть все доступные тесты
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
