"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentImageUpload } from "@/components/admin/content-image-upload"

export default function NewContentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    content: "",
    image: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // В реальном приложении здесь будет отправка данных на сервер
      console.log("Отправка данных:", formData)

      // Имитация задержки запроса
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Перенаправление на страницу со списком контента
      router.push("/admin/content")
    } catch (error) {
      console.error("Ошибка при отправке данных:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Добавление нового контента</h1>
      <Card className="border-beige-200">
        <CardHeader>
          <CardTitle>Информация о контенте</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Введите заголовок"
                required
                className="border-beige-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Тип контента</Label>
              <Select value={formData.type} onValueChange={handleSelectChange} required>
                <SelectTrigger className="border-beige-300">
                  <SelectValue placeholder="Выберите тип контента" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Статья</SelectItem>
                  <SelectItem value="resource">Ресурс</SelectItem>
                  <SelectItem value="tool">Инструмент</SelectItem>
                  <SelectItem value="case-study">Кейс-стади</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Краткое описание</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Введите краткое описание"
                required
                className="border-beige-300"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Введите содержание"
                required
                className="border-beige-300"
                rows={10}
              />
            </div>

            <div className="space-y-2">
              <Label>Изображение</Label>
              <ContentImageUpload onImageChange={handleImageChange} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/content")}
              className="border-beige-300"
            >
              Отмена
            </Button>
            <Button type="submit" className="bg-beige-900 text-beige-50 hover:bg-beige-800" disabled={isSubmitting}>
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

