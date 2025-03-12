"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Database } from "@/lib/database.types"

type ProgressRecord = Database["public"]["Tables"]["progress_records"]["Row"]

interface TherapyProgressProps {
  progressData: ProgressRecord[]
}

// Форматирование даты для графика
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "numeric",
  }).format(date)
}

export function TherapyProgress({ progressData }: TherapyProgressProps) {
  // Подготовка данных для графика
  const chartData = progressData.map((item) => ({
    date: formatDate(item.date),
    anxietyLevel: item.anxiety_level,
    sleepQuality: item.sleep_quality,
    moodScore: item.mood_score,
  }))

  return (
    <Card className="border-beige-200">
      <CardHeader>
        <CardTitle>Мой прогресс</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-[240px]">
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
        ) : (
          <div className="flex h-[240px] items-center justify-center">
            <p className="text-beige-600">Нет данных о прогрессе</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

