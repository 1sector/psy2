import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Eye, ArrowUpRight } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-beige-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Всего контента</CardTitle>
          <FileText className="h-4 w-4 text-beige-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-beige-600">+4 за последний месяц</p>
        </CardContent>
      </Card>

      <Card className="border-beige-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
          <Users className="h-4 w-4 text-beige-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">573</div>
          <p className="text-xs text-beige-600">+32 за последний месяц</p>
        </CardContent>
      </Card>

      <Card className="border-beige-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Просмотры</CardTitle>
          <Eye className="h-4 w-4 text-beige-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,543</div>
          <p className="text-xs text-beige-600">+1,234 за последний месяц</p>
        </CardContent>
      </Card>

      <Card className="border-beige-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-beige-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2%</div>
          <p className="text-xs text-beige-600">+0.4% за последний месяц</p>
        </CardContent>
      </Card>
    </div>
  )
}

