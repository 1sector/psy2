import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Lightbulb, Heart } from "lucide-react"

const contentTypes = [
  {
    type: "Статьи",
    count: 12,
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    type: "Ресурсы",
    count: 8,
    icon: BookOpen,
    color: "bg-green-100 text-green-700",
  },
  {
    type: "Инструменты",
    count: 4,
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-700",
  },
  {
    type: "Кейс-стади",
    count: 6,
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
  },
]

export function ContentOverview() {
  return (
    <Card className="border-beige-200">
      <CardHeader>
        <CardTitle>Обзор контента</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contentTypes.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="font-medium">{item.type}</span>
              </div>
              <span className="text-beige-700">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

