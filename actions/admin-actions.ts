"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

export async function setupAdmin(email: string, password: string, fullName: string) {
  try {
    console.log("Начало создания администратора:", { email, fullName })
    const supabase = createServerComponentClient<Database>({ cookies })

    // Проверяем, есть ли уже администратор в системе
    const { data: existingAdmins, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "admin")
      .limit(1)

    if (checkError) {
      console.error("Ошибка при проверке существующих администраторов:", checkError)
      throw checkError
    }

    console.log("Результат проверки существующих администраторов:", existingAdmins)

    if (existingAdmins && existingAdmins.length > 0) {
      return { success: false, message: "Администратор уже существует в системе" }
    }

    // Регистрируем нового пользователя
    console.log("Регистрация нового пользователя...")
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      console.error("Ошибка при регистрации пользователя:", authError)
      throw authError
    }

    console.log("Результат регистрации:", authData)

    if (!authData.user) {
      return { success: false, message: "Не удалось создать пользователя" }
    }

    // Обновляем профиль пользователя, устанавливая роль "admin"
    console.log("Обновление профиля пользователя...")
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        role: "admin",
      })
      .eq("id", authData.user.id)

    if (updateError) {
      console.error("Ошибка при обновлении профиля:", updateError)
      throw updateError
    }

    console.log("Администратор успешно создан")
    return { success: true, message: "Администратор успешно создан" }
  } catch (error) {
    console.error("Ошибка при создании администратора:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Произошла ошибка при создании администратора",
    }
  }
}

export async function checkAdminAccess() {
  try {
    const supabase = createServerComponentClient<Database>({ cookies })

    // Получаем текущую сессию
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { isAdmin: false }
    }

    // Проверяем, является ли пользователь администратором
    const { data, error } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (error || !data) {
      return { isAdmin: false }
    }

    return { isAdmin: data.role === "admin" }
  } catch (error) {
    console.error("Ошибка при проверке доступа администратора:", error)
    return { isAdmin: false }
  }
}

