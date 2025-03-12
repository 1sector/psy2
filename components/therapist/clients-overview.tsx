import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Simplified version without recharts to avoid potential issues
export function ClientsOverview() {
  // Sample data
  const clientsData = [
    { name: "Активные", value: 12, color: "#10b981" },
    { name: "Новые", value: 4, color: "#3b82f6" },
    { name: "Завершившие", value: 8, color: "#6b7280" },
  ]

  const totalClients = clientsData.reduce((acc, item) => acc + item.value, 0)

  return (
    <Card className="border-beige-200">
      <CardHeader>
        <CardTitle>Обзор клиентов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium">Всего клиентов: {totalClients}</p>
            <ul className="mt-4 space-y-2">
              {clientsData.map((item) => (
                <li key={item.name} className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>
                    {item.name}: {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalClients}</div>
            <div className="text-xs text-beige-600">Всего клиентов</div>
          </div>
          <div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-beige-600">Сессий на этой неделе</div>
          </div>
          <div>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-xs text-beige-600">Средний прогресс</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

