import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { ClientHeader } from "@/components/client/client-header"
import { ProtectedRoute } from "@/components/auth/protected-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PSY - Личный кабинет клиента",
  description: "Управление психологическими сессиями и тестами",
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRoute requiredRole="client">
      <div className={`${inter.className} min-h-screen bg-beige-50 text-beige-900`}>
        <div className="flex min-h-screen">
          <ClientSidebar />
          <div className="flex flex-1 flex-col">
            <ClientHeader />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

