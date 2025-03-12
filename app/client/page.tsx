import { ClientDashboard } from "@/components/client/client-dashboard"
import { redirect } from "next/navigation"

// В реальном приложении здесь будет проверка аутентификации
const isAuthenticated = true

export default function ClientPage() {
  // Перенаправление на страницу входа, если пользователь не аутентифицирован
  if (!isAuthenticated) {
    redirect("/auth/login")
  }

  return <ClientDashboard />
}

