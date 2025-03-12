"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, FileText, Filter } from "lucide-react"

// Примерные данные для тестов
const testCategories = ["Все", "Личность", "Эмоции", "Когнитивные", "Отношения", "Стресс"]

const tests = [
  {
    id: "1",
    title: "Тест на уровень тревожности",
    description: "Оцените свой текущий уровень тревожности и получите рекомендации по управлению стрессом.",
    category: "Эмоции",
    duration: "10 минут",
    questionsCount: 20,
    popularity: "Высокая",
  },
  {
    id: "2",
    title: "Оценка личностных черт",
    description: "Комплексный анализ ваших личностных характеристик на основе пятифакторной модели личности.",
    category: "Личность",
    duration: "15 минут",
    questionsCount: 30,
    popularity: "Высокая",
  },
  {
    id: "3",
    title: "Тест на эмоциональный интеллект",
    description: "Измерьте свою способность распознавать и управлять эмоциями — своими и других людей.",
    category: "Эмоции",
    duration: "12 минут",
    questionsCount: 25,
    popularity: "Средняя",
  },
  {
    id: "4",
    title: "Когнитивная гибкость",
    description: "Оцените свою способность адаптироваться к новым ситуациям и переключаться между задачами.",
    category: "Когнитивные",
    duration: "8 минут",
    questionsCount: 15,
    popularity: "Средняя",
  },
  {
    id: "5",
    title: "Стили привязанности",
    description: "Определите свой стиль привязанности и как он влияет на ваши отношения с другими людьми.",
    category: "Отношения",
    duration: "10 минут",
    questionsCount: 20,
    popularity: "Высокая",
  },
  {
    id: "6",
    title: "Оценка уровня стресса",
    description: "Измерьте текущий уровень стресса и выявите основные стрессоры в вашей жизни.",
    category: "Стресс",
    duration: "7 минут",
    questionsCount: 15,
    popularity: "Высокая",
  },
]

export function TestsList() {
  const [selectedCategory, setSelectedCategory] = useState("Все")

  const filteredTests = selectedCategory === "Все" 
    ? tests 
    : tests.filter(test => test.category === selectedCategory)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-bold text-beige-900">Доступные тесты</h2>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-beige-700" />
            <div className="flex flex-wrap gap-2">
              {testCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-beige-900 text-beige-50 hover:bg-beige-800"
                      : "border-beige-300 text-beige-900 hover:bg-beige-100"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <Card key={test.id} className="border-beige-200 bg-beige-50 transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex justify-between">
                  <Badge variant="outline" className="mb-2 border-beige-300 text-beige-700">
                    {test.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={
                      test.popularity === "Высокая"
                        ? "bg-beige-200 text-beige-900"
                        : "bg-beige-100 text-beige-700"
                    }
                  >
                    {test.popularity === "Высокая" ? "Популярный" : "Новый"}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-beige-900">{test.title}</CardTitle>
                <CardDescription className="text-beige-700">{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-beige-700">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{test.questionsCount} вопросов</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    <span>{test.category}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/tests/${test.id}`} className="w-full">
                  <Button className="w-full bg-beige-900 text-beige-50 hover:bg-beige-800">
                    Пройти тест
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
