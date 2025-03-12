import { redirect } from "next/navigation"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { ContentOverview } from "@/components/admin/content-overview"

// В реальном приложении здесь будет проверка аутентификации
const isAuthenticated = true

export default function AdminDashboard() {
  // Перенаправление на страницу входа, если пользователь не аутентифицирован
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Панель управления</h1>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <ContentOverview />
      </div>
    </div>
  )
}

