import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClipboardList, Eye, Edit, Users } from "lucide-react"
import Link from "next/link"

// Имитация данных о тестах
const testsData = [
  {
    id: "t1",
    name: "Шкала тревоги Бека",
    description: "Оценка уровня тревоги",
    questions: 21,
    type: "scale",
    assignedCount: 8,
    completedCount: 5,
  },
  {
    id: "t2",
    name: "Опросник депрессии Бека",
    description: "Оценка уровня депрессии",
    questions: 21,
    type: "scale",
    assignedCount: 6,
    completedCount: 4,
  },
  {
    id: "t3",
    name: "Шкала тревоги Спилбергера",
    description: "Оценка ситуативной и личностной тревожности",
    questions: 40,
    type: "scale",
    assignedCount: 4,
    completedCount: 2,
  },
  {
    id: "t4",
    name: "Опросник качества жизни",
    description: "Оценка субъективного качества жизни",
    questions: 15,
    type: "scale",
    assignedCount: 3,
    completedCount: 1,
  },
  {
    id: "t5",
    name: "Опросник копинг-стратегий",
    description: "Оценка стратегий совладания со стрессом",
    questions: 18,
    type: "multiple",
    assignedCount: 2,
    completedCount: 0,
  },
]

// Компонент для отображения типа теста
function TestTypeBadge({ type }: { type: string }) {
  const typeConfig = {
    scale: { label: "Шкала", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    single: { label: "Один ответ", className: "bg-green-100 text-green-800 hover:bg-green-200" },
    multiple: { label: "Множественный", className: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
    text: { label: "Текстовый", className: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
  }

  const { label, className } = typeConfig[type as keyof typeof typeConfig] || {
    label: type,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  }

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

export function TestsList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {testsData.map((test) => (
        <Card key={test.id} className="border-beige-200">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{test.name}</CardTitle>
              <TestTypeBadge type={test.type} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-beige-700">{test.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-beige-600">Вопросов: {test.questions}</span>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-beige-600" />
                  <span>{test.assignedCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" asChild className="border-beige-300">
                    <Link href={`/therapist/tests/${test.id}`}>
                      <Eye className="mr-1 h-4 w-4" />
                      Просмотр
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="border-beige-300">
                    <Link href={`/therapist/tests/${test.id}/edit`}>
                      <Edit className="mr-1 h-4 w-4" />
                      Изменить
                    </Link>
                  </Button>
                </div>
                <Button variant="outline" size="sm" asChild className="border-beige-300">
                  <Link href={`/therapist/tests/${test.id}/results`}>
                    <ClipboardList className="mr-1 h-4 w-4" />
                    Результаты
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

