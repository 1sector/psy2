import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: {
      name: "Анна Смирнова",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "АС",
    },
    action: "добавила новую статью",
    item: "Когнитивные искажения в повседневной жизни",
    time: "2 часа назад",
  },
  {
    user: {
      name: "Иван Петров",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ИП",
    },
    action: "обновил ресурс",
    item: "Техники релаксации при стрессе",
    time: "5 часов назад",
  },
  {
    user: {
      name: "Мария Иванова",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "МИ",
    },
    action: "удалила инструмент",
    item: "Устаревший опросник",
    time: "вчера",
  },
  {
    user: {
      name: "Алексей Козлов",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "АК",
    },
    action: "зарегистрировался",
    item: "",
    time: "2 дня назад",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-beige-200">
      <CardHeader>
        <CardTitle>Недавняя активность</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border border-beige-200">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback className="bg-beige-200 text-beige-900 text-xs">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  <span className="text-beige-700">{activity.action}</span>
                  {activity.item && (
                    <>
                      {" "}
                      <span className="font-medium">"{activity.item}"</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-beige-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

