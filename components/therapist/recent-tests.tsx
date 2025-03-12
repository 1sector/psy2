import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye } from "lucide-react"
import Link from "next/link"

// Имитация данных о недавних тестах
const recentTests = [
  {
    id: "1",
    testName: "Шкала тревоги Бека",
    clientName: "Анна Петрова",
    clientId: "c1",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "АП",
    date: "2023-11-28",
    status: "completed",
    score: 18,
  },
  {
    id: "2",
    testName: "Опросник депрессии Бека",
    clientName: "Иван Сидоров",
    clientId: "c2",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ИС",
    date: "2023-11-27",
    status: "completed",
    score: 12,
  },
  {
    id: "3",
    testName: "Шкала тревоги Спилбергера",
    clientName: "Мария Иванова",
    clientId: "c3",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "МИ",
    date: "2023-11-25",
    status: "pending",
    score: null,
  },
  {
    id: "4",
    testName: "Опросник качества жизни",
    clientName: "Алексей Петров",
    clientId: "c4",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "АП",
    date: "2023-11-24",
    status: "completed",
    score: 72,
  },
]

// Форматирование даты
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ru-RU").format(date)
}

// Компонент для отображения статуса теста
function TestStatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
        Завершен
      </Badge>
    )
  }

  if (status === "pending") {
    return (
      <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
        Ожидает
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
      {status}
    </Badge>
  )
}

export function RecentTests() {
  return (
    <Card className="border-beige-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Недавние тесты</CardTitle>
        <Button variant="outline" asChild className="border-beige-300">
          <Link href="/therapist/tests">Все тесты</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-beige-200 text-left text-sm font-medium text-beige-600">
                <th className="pb-3 pl-4">Тест</th>
                <th className="pb-3">Клиент</th>
                <th className="pb-3">Дата</th>
                <th className="pb-3">Статус</th>
                <th className="pb-3">Результат</th>
                <th className="pb-3 pr-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {recentTests.map((test) => (
                <tr key={test.id} className="border-b border-beige-200">
                  <td className="py-4 pl-4 font-medium">{test.testName}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-beige-200">
                        <AvatarImage src={test.avatar} alt={test.clientName} />
                        <AvatarFallback className="bg-beige-200 text-beige-900 text-xs">{test.initials}</AvatarFallback>
                      </Avatar>
                      <span>{test.clientName}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-beige-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(test.date)}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <TestStatusBadge status={test.status} />
                  </td>
                  <td className="py-4">{test.score !== null ? test.score : "-"}</td>
                  <td className="py-4 pr-4 text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/therapist/tests/${test.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Просмотр</span>
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

