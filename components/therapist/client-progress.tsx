"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProgressData {
  date: string
  anxietyLevel: number
  sleepQuality: number
  moodScore: number
}

interface ClientProgressProps {
  progressData: ProgressData[]
}

// Форматирование даты для графика
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "numeric",
  }).format(date)
}

export function ClientProgress({ progressData }: ClientProgressProps) {
  // Подготовка данных для графика
  const chartData = progressData.map((item) => ({
    ...item,
    date: formatDate(item.date),
  }))

  return (
    <div className="space-y-6">
      <Card className="border-beige-200">
        <CardHeader>
          <CardTitle>Динамика показателей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="anxietyLevel"
                  name="Уровень тревоги"
                  stroke="#ef4444"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="sleepQuality" name="Качество сна" stroke="#3b82f6" />
                <Line type="monotone" dataKey="moodScore" name="Настроение" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="anxiety">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="anxiety">Тревога</TabsTrigger>
          <TabsTrigger value="sleep">Сон</TabsTrigger>
          <TabsTrigger value="mood">Настроение</TabsTrigger>
        </TabsList>

        <TabsContent value="anxiety" className="mt-4">
          <Card className="border-beige-200">
            <CardHeader>
              <CardTitle>Динамика уровня тревоги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-beige-700">
                  Уровень тревоги снизился с {progressData[0].anxietyLevel} до{" "}
                  {progressData[progressData.length - 1].anxietyLevel} баллов за период терапии.
                </p>

                <div className="rounded-md bg-beige-100 p-4">
                  <h3 className="mb-2 font-medium">Рекомендации</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>Продолжить практику техник релаксации</li>
                    <li>Вести дневник тревожных мыслей</li>
                    <li>Увеличить физическую активность</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="mt-4">
          <Card className="border-beige-200">
            <CardHeader>
              <CardTitle>Динамика качества сна</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-beige-700">
                  Качество сна улучшилось с {progressData[0].sleepQuality} до{" "}
                  {progressData[progressData.length - 1].sleepQuality} баллов за период терапии.
                </p>

                <div className="rounded-md bg-beige-100 p-4">
                  <h3 className="mb-2 font-medium">Рекомендации</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>Соблюдать режим сна</li>
                    <li>Избегать кофеина после 16:00</li>
                    <li>Практиковать вечернюю медитацию</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="mt-4">
          <Card className="border-beige-200">
            <CardHeader>
              <CardTitle>Динамика настроения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-beige-700">
                  Общее настроение улучшилось с {progressData[0].moodScore} до{" "}
                  {progressData[progressData.length - 1].moodScore} баллов за период терапии.
                </p>

                <div className="rounded-md bg-beige-100 p-4">
                  <h3 className="mb-2 font-medium">Рекомендации</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>Продолжить практику позитивного мышления</li>
                    <li>Увеличить социальную активность</li>
                    <li>Вести дневник благодарности</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

