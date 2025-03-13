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
import { saveContent, type ContentFormData } from "@/actions/content-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function NewContentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContentFormData>({
    title: "",
    type: "",
    description: "",
    content: "",
    image: null,
  })
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

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

  // Обновите функцию handleSubmit в компоненте NewContentPage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      // Validate form data
      if (!formData.title || !formData.type || !formData.description || !formData.content) {
        setStatus({
          type: "error",
          message: "Please fill in all required fields",
        })
        setIsSubmitting(false)
        return
      }

      console.log("Submitting form data:", formData)

      // Call the server action to save the content
      const result = await saveContent(formData)
      console.log("Save content result:", result)

      if (result.success) {
        setStatus({
          type: "success",
          message: result.message,
        })

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/content")
        }, 1500)
      } else {
        setStatus({
          type: "error",
          message: result.message,
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Добавление нового контента</h1>

      {status.type && (
        <Alert variant={status.type === "error" ? "destructive" : "default"} className="mb-6">
          {status.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

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

