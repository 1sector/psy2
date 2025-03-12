"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ContentImageUploadProps {
  onImageChange: (file: File | null) => void
}

export function ContentImageUpload({ onImageChange }: ContentImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange(file)
    } else {
      setPreview(null)
      onImageChange(null)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-beige-300 bg-beige-50 p-6 text-center hover:bg-beige-100"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mb-2 h-8 w-8 text-beige-500" />
          <p className="mb-1 text-sm font-medium text-beige-900">Нажмите для загрузки или перетащите файл</p>
          <p className="text-xs text-beige-600">PNG, JPG или WEBP (макс. 5MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-lg border border-beige-200 p-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={preview || "/placeholder.svg"} alt="Предпросмотр изображения" fill className="object-cover" />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-2 -top-2 h-8 w-8 rounded-full border-beige-300 bg-beige-50"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

