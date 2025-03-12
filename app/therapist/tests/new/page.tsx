"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  text: string
  type: "single" | "multiple" | "scale" | "text"
  options: string[]
}

export default function NewTestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      text: "",
      type: "single",
      options: [""],
    },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuestionChange = (id: string, field: keyof Question, value: any) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const handleOptionChange = (questionId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options]
          newOptions[index] = value
          return { ...q, options: newOptions }
        }
        return q
      }),
    )
  }

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return { ...q, options: [...q.options, ""] }
        }
        return q
      }),
    )
  }

  const removeOption = (questionId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId && q.options.length > 1) {
          const newOptions = [...q.options]
          newOptions.splice(index, 1)
          return { ...q, options: newOptions }
        }
        return q
      }),
    )
  }

  const addQuestion = () => {
    const newId = `q${questions.length + 1}`
    setQuestions((prev) => [
      ...prev,
      {
        id: newId,
        text: "",
        type: "single",
        options: [""],
      },
    ])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions((prev) => prev.filter((q) => q.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // В реальном приложении здесь будет отправка данных на сервер
      console.log("Отправка данных:", { ...formData, questions })

      // Имитация задержки запроса
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Перенаправление на страницу со списком тестов
      router.push("/therapist/tests")
    } catch (error) {
      console.error("Ошибка при отправке данных:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/therapist/tests">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Создание нового теста</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card className="border-beige-200">
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Название теста</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Например: Шкала тревоги Бека"
                  required
                  className="border-beige-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание теста</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Опишите назначение теста и инструкции по его прохождению"
                  className="border-beige-300"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Вопросы</h2>
              <Button type="button" onClick={addQuestion} className="bg-beige-900 text-beige-50 hover:bg-beige-800">
                <Plus className="mr-2 h-4 w-4" /> Добавить вопрос
              </Button>
            </div>

            {questions.map((question, qIndex) => (
              <Card key={question.id} className="border-beige-200">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <CardTitle className="text-lg">Вопрос {qIndex + 1}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(question.id)}
                    disabled={questions.length <= 1}
                    className="h-8 w-8 text-beige-700 hover:text-beige-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${question.id}`}>Текст вопроса</Label>
                    <Input
                      id={`question-${question.id}`}
                      value={question.text}
                      onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
                      placeholder="Введите текст вопроса"
                      required
                      className="border-beige-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`type-${question.id}`}>Тип вопроса</Label>
                    <select
                      id={`type-${question.id}`}
                      value={question.type}
                      onChange={(e) => handleQuestionChange(question.id, "type", e.target.value)}
                      className="w-full rounded-md border border-beige-300 bg-transparent px-3 py-2 text-sm"
                    >
                      <option value="single">Один вариант ответа</option>
                      <option value="multiple">Несколько вариантов ответа</option>
                      <option value="scale">Шкала (1-10)</option>
                      <option value="text">Текстовый ответ</option>
                    </select>
                  </div>

                  {(question.type === "single" || question.type === "multiple") && (
                    <div className="space-y-3">
                      <Label>Варианты ответов</Label>
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                            placeholder={`Вариант ${index + 1}`}
                            required
                            className="border-beige-300"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(question.id, index)}
                            disabled={question.options.length <= 1}
                            className="h-8 w-8 shrink-0 text-beige-700 hover:text-beige-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addOption(question.id)}
                        className="mt-2 border-beige-300"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Добавить вариант
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/therapist/tests")}
              className="border-beige-300"
            >
              Отмена
            </Button>
            <Button type="submit" className="bg-beige-900 text-beige-50 hover:bg-beige-800" disabled={isSubmitting}>
              {isSubmitting ? "Сохранение..." : "Сохранить тест"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

