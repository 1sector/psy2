import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { TherapistSidebar } from "@/components/therapist/therapist-sidebar"
import { TherapistHeader } from "@/components/therapist/therapist-header"
import { ProtectedRoute } from "@/components/auth/protected-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PSY - Личный кабинет психотерапевта",
  description: "Управление клиентами и терапевтическими сессиями",
}

export default function TherapistLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRoute requiredRole="therapist">
      <div className={`${inter.className} min-h-screen bg-beige-50 text-beige-900`}>
        <div className="flex min-h-screen">
          <TherapistSidebar />
          <div className="flex flex-1 flex-col">
            <TherapistHeader />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

