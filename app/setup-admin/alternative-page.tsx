"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"

export default function AlternativeSetupAdminPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // 1. Регистрируем пользователя
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (signUpError) throw signUpError

      if (!authData.user) {
        throw new Error("Не удалось создать пользователя")
      }

      // 2. Обновляем профиль пользователя
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          role: "admin",
        })
        .eq("id", authData.user.id)

      if (updateError) throw updateError

      setSuccess("Администратор успешно создан! Перенаправление на страницу входа...")

      // 3. Выходим из текущей сессии
      await supabase.auth.signOut()

      // 4. Перенаправляем на страницу входа
      setTimeout(() => {
        router.push("/admin/login")
      }, 2000)
    } catch (err) {
      console.error("Ошибка при создании администратора:", err)
      setError(err instanceof Error ? err.message : "Произошла ошибка при создании администратора")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-beige-200">
        <CardHeader>
          <CardTitle>Альтернативная настройка администратора</CardTitle>
          <CardDescription>Создайте первого администратора для доступа к панели управления.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">ФИО</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Иванов Иван Иванович"
                required
                className="border-beige-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                className="border-beige-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={8}
                className="border-beige-300"
              />
            </div>
            <Button type="submit" className="w-full bg-beige-900 text-beige-50 hover:bg-beige-800" disabled={isLoading}>
              {isLoading ? "Создание..." : "Создать администратора"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

