"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import { setupAdmin } from "@/actions/admin-actions"

export default function SetupAdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hasAdmin, setHasAdmin] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    async function checkForAdmin() {
      try {
        // Проверяем, есть ли уже администратор в системе
        const { data, error } = await supabase.from("profiles").select("id").eq("role", "admin").limit(1)

        if (error) throw error

        setHasAdmin(data && data.length > 0)
      } catch (err) {
        console.error("Ошибка при проверке администратора:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkForAdmin()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      console.log("Отправка формы:", formData)
      setIsLoading(true)

      const result = await setupAdmin(formData.email, formData.password, formData.fullName)
      console.log("Результат setupAdmin:", result)

      if (result.success) {
        setSuccess(result.message)
        setTimeout(() => {
          router.push("/admin/login")
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error("Ошибка при создании администратора:", err)
      setError(err instanceof Error ? err.message : "Произошла ошибка при создании администратора")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-beige-300 border-t-beige-900"></div>
      </div>
    )
  }

  if (hasAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md border-beige-200">
          <CardHeader>
            <CardTitle>Администратор уже настроен</CardTitle>
            <CardDescription>
              Администратор уже существует в системе. Используйте страницу входа для доступа к панели администратора.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={() => router.push("/admin/login")}
              className="w-full bg-beige-900 text-beige-50 hover:bg-beige-800"
            >
              Перейти на страницу входа
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-beige-200">
        <CardHeader>
          <CardTitle>Настройка администратора</CardTitle>
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
            <Button type="submit" className="w-full bg-beige-900 text-beige-50 hover:bg-beige-800">
              Создать администратора
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

