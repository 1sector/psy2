"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, ClipboardList, Calendar, BarChart, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  {
    title: "Панель управления",
    href: "/therapist",
    icon: BarChart,
  },
  {
    title: "Клиенты",
    href: "/therapist/clients",
    icon: Users,
  },
  {
    title: "Тесты",
    href: "/therapist/tests",
    icon: ClipboardList,
  },
  {
    title: "Расписание",
    href: "/therapist/schedule",
    icon: Calendar,
  },
  {
    title: "Настройки",
    href: "/therapist/settings",
    icon: Settings,
  },
]

export function TherapistSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-beige-200 bg-beige-50 transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-beige-200 px-6">
          <Link href="/therapist" className="flex items-center gap-2">
            <span className="text-xl font-bold text-beige-900">PSY Терапевт</span>
          </Link>
        </div>

        <div className="flex h-[calc(100%-4rem)] flex-col justify-between">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-beige-700 hover:bg-beige-100 hover:text-beige-900",
                      pathname === item.href && "bg-beige-200 text-beige-900",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-beige-700 hover:bg-beige-100 hover:text-beige-900"
            >
              <LogOut className="h-5 w-5" />
              <span>Выйти</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}

