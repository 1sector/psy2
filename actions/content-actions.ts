"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export type ContentFormData = {
  title: string
  type: string
  description: string
  content: string
  image?: File | null
}

export async function saveContent(formData: ContentFormData) {
  try {
    // Создаем клиент Supabase с использованием cookies для серверного компонента
    const supabaseServer = createServerComponentClient({ cookies })

    // Получаем сессию пользователя
    const {
      data: { session },
    } = await supabaseServer.auth.getSession()

    if (!session?.user) {
      console.error("No authenticated user found")
      return { success: false, message: "Unauthorized. Please log in." }
    }

    console.log("Authenticated user ID:", session.user.id)

    // Создаем новую запись контента
    const { data, error } = await supabaseServer
      .from("content")
      .insert({
        title: formData.title,
        type: formData.type,
        description: formData.description,
        content: formData.content,
        author_id: session.user.id,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error saving content:", error)
      return { success: false, message: error.message }
    }

    // Если есть изображение, загружаем его в хранилище
    if (formData.image && data && data[0]) {
      const contentId = data[0].id
      const fileExt = formData.image.name.split(".").pop()
      const filePath = `content/${contentId}/${Date.now()}.${fileExt}`

      // Конвертируем File в Buffer для серверного действия
      const arrayBuffer = await formData.image.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabaseServer.storage.from("content-images").upload(filePath, buffer, {
        contentType: formData.image.type,
        upsert: true,
      })

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        return { success: true, message: "Content saved but image upload failed", data: data[0] }
      }

      // Обновляем контент с URL изображения
      const { data: publicUrlData } = supabaseServer.storage.from("content-images").getPublicUrl(filePath)

      await supabaseServer.from("content").update({ image_url: publicUrlData.publicUrl }).eq("id", contentId)
    }

    // Обновляем кэш страницы списка контента
    revalidatePath("/admin/content")

    return { success: true, message: "Content saved successfully", data: data[0] }
  } catch (error) {
    console.error("Error in saveContent:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

