"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Примерные данные для тестов
const testsData = [
  {
    id: "1",
    title: "Тест на уровень тревожности",
    description: "Оцените свой текущий уровень тревожности и получите рекомендации по управлению стрессом.",
    category: "Эмоции",
    duration: "10 минут",
    questionsCount: 5, // Уменьшено для примера
    questions: [
      {
        id: "q1",
        text: "Как часто вы испытываете беспокойство без видимой причины?",
        options: [
          { id: "a", text: "Никогда", value: 0 },
          { id: "b", text: "Редко", value: 1 },
          { id: "c", text: "Иногда", value: 2 },
          { id: "d", text: "Часто", value: 3 },
          { id: "e", text: "Постоянно", value: 4 },
        ],
      },
      {
        id: "q2",
        text: "Насколько сложно вам расслабиться после напряженного дня?",
        options: [
          { id: "a", text: "Совсем не сложно", value: 0 },
          { id: "b", text: "Немного сложно", value: 1 },
          { id: "c", text: "Умеренно сложно", value: 2 },
          { id: "d", text: "Очень сложно", value: 3 },
          { id: "e", text: "Практически невозможно", value: 4 },
        ],
      },
      {
        id: "q3",
        text: "Как часто вы испытываете физические симптомы тревоги (учащенное сердцебиение, потливость, дрожь)?",
        options: [
          { id: "a", text: "Никогда", value: 0 },
          { id: "b", text: "Редко", value: 1 },
          { id: "c", text: "Иногда", value: 2 },
          { id: "d", text: "Часто", value: 3 },
          { id: "e", text: "Постоянно", value: 4 },
        ],
      },
      {
        id: "q4",
        text: "Насколько часто вы избегаете ситуаций из-за тревоги?",
        options: [
          { id: "a", text: "Никогда", value: 0 },
          { id: "b", text: "Редко", value: 1 },
          { id: "c", text: "Иногда", value: 2 },
          { id: "d", text: "Часто", value: 3 },
          { id: "e", text: "Постоянно", value: 4 },
        ],
      },
      {
        id: "q5",
        text: "Как часто тревожные мысли мешают вам заснуть?",
        options: [
          { id: "a", text: "Никогда", value: 0 },
          { id: "b", text: "Редко", value: 1 },
          { id: "c", text: "Иногда", value: 2 },
          { id: "d", text: "Часто", value: 3 },
          { id: "e", text: "Постоянно", value: 4 },
        ],
      },
    ],
    results: [
      {
        range: [0, 5],
        title: "Минимальный уровень тревожности",
        description: "У вас очень низкий уровень тревожности. Это отличный показатель психологического благополучия.",
        recommendations: [
          "Продолжайте практиковать здоровый образ жизни",
          "Регулярно занимайтесь физическими упражнениями",
          "Поддерживайте социальные связи",
        ],
      },
      {
        range: [6, 10],
        title: "Низкий уровень тревожности",
        description: "У вас низкий уровень тревожности. Вы хорошо справляетесь со стрессом в повседневной жизни.",
        recommendations: [
          "Практикуйте осознанность и медитацию",
          "Обратите внимание на качество сна",
          "Продолжайте развивать навыки управления стрессом",
        ],
      },
      {
        range: [11, 15],
        title: "Умеренный уровень тревожности",
        description: "У вас умеренный уровень тревожности. Это может иногда влиять на вашу повседневную жизнь.",
        recommendations: [
          "Регулярно практикуйте техники релаксации",
          "Рассмотрите возможность ведения дневника тревожности",
          "Обратите внимание на триггеры тревоги и разработайте стратегии их преодоления",
        ],
      },
      {
        range: [16, 20],
        title: "Высокий уровень тревожности",
        description: "У вас высокий уровень тревожности. Это может значительно влиять на качество вашей жизни.",
        recommendations: [
          "Рассмотрите возможность консультации с психологом или психотерапевтом",
          "Изучите когнитивно-поведенческие техники для управления тревогой",
          "Уделите особое внимание самозаботе и режиму дня",
          "Практикуйте дыхательные упражнения при приступах тревоги",
        ],
      },
    ],
  },
  // Другие тесты...
]

export default function TestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentTest, setCurrentTest] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  useEffect(() => {
    // Находим тест по ID из URL
    const test = testsData.find((t) => t.id === params.id)
    if (test) {
      setCurrentTest(test)
    } else {
      // Если тест не найден, перенаправляем на страницу со списком тестов
      router.push("/tests")
    }
  }, [params.id, router])

  if (!currentTest) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-beige-900">Загрузка теста...</h2>
          <p className="text-beige-700">Пожалуйста, подождите</p>
        </div>
      </div>
    )
  }

  const currentQuestion = currentTest.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Вычисляем результат теста
      calculateResult()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const calculateResult = () => {
    // Подсчитываем общий балл
    let totalScore = 0
    
    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = currentTest.questions.find((q: any) => q.id === questionId)
      if (question) {
        const option = question.options.find((o: any) => o.id === optionId)
        if (option) {
          totalScore += option.value
        }
      }
    })
    
    // Определяем результат на основе диапазона баллов
    const result = currentTest.results.find((r: any) => 
      totalScore >= r.range[0] && totalScore <= r.range[1]
    )
    
    setTestResult(result)
    setShowResults(true)
  }

  if (showResults && testResult) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Link href="/tests" className="mb-4 flex items-center text-beige-700 hover:text-beige-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться к списку тестов
              </Link>
              <h1 className="mb-2 text-3xl font-bold text-beige-900">{currentTest.title} - Результаты</h1>
              <p className="text-beige-700">Спасибо за прохождение теста!</p>
            </div>
            
            <Card className="mb-8 border-beige-200 bg-beige-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <CardTitle className="text-2xl text-beige-900">{testResult.title}</CardTitle>
                </div>
                <CardDescription className="text-lg text-beige-700">
                  {testResult.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-semibold text-beige-900">Рекомендации:</h3>
                  <ul className="space-y-2 text-beige-700">
                    {testResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-500">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 sm:flex-row">
                <Link href="/tests" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full border-beige-300 text-beige-900 hover:bg-beige-100 sm:w-auto">
                    Другие тесты
                  </Button>
                </Link>
                <Button 
                  className="w-full bg-beige-900 text-beige-50 hover:bg-beige-800 sm:w-auto"
                  onClick={() => {
                    setShowResults(false)
                    setCurrentQuestionIndex(0)
                    setAnswers({})
                  }}
                >
                  Пройти тест снова
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/tests" className="mb-4 flex items-center text-beige-700 hover:text-beige-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться к списку тестов
            </Link>
            <h1 className="mb-2 text-3xl font-bold text-beige-900">{currentTest.title}</h1>
            <p className="mb-4 text-beige-700">{currentTest.description}</p>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-beige-700">
                Вопрос {currentQuestionIndex + 1} из {currentTest.questions.length}
              </span>
              <span className="text-sm text-beige-700">{progress.toFixed(0)}% завершено</span>
            </div>
            <Progress value={progress} className="h-2 bg-beige-200" />
          </div>

          <Card className="mb-8 border-beige-200 bg-beige-50">
            <CardHeader>
              <CardTitle className="text-xl text-beige-900">{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              >
                <div className="space-y-4">
                  {currentQuestion.options.map((option: any) => (
                    <div key={option.id} className="flex items-center">
                      <RadioGroupItem
                        value={option.id}
                        id={`option-${option.id}`}
                        className="border-beige-300 text-beige-900"
                      />
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="ml-2 cursor-pointer text-beige-900"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="border-beige-300 text-beige-900 hover:bg-beige-100"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="bg-beige-900 text-beige-50 hover:bg-beige-800"
              >
                {currentQuestionIndex < currentTest.questions.length - 1 ? (
                  <>
                    Далее
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Завершить тест"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  )
}
