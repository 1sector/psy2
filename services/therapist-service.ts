import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type TherapistClient = Database["public"]["Tables"]["therapist_clients"]["Row"]
type Session = Database["public"]["Tables"]["sessions"]["Row"]
type Test = Database["public"]["Tables"]["tests"]["Row"]
type AssignedTest = Database["public"]["Tables"]["assigned_tests"]["Row"]

export async function getTherapistProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).eq("role", "therapist").single()

  if (error) {
    console.error("Ошибка при получении профиля терапевта:", error)
    return null
  }

  return data
}

export async function getTherapistClients(therapistId: string): Promise<(TherapistClient & { profile: Profile })[]> {
  const { data, error } = await supabase
    .from("therapist_clients")
    .select(`
      *,
      profile: profiles!client_id(*)
    `)
    .eq("therapist_id", therapistId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Ошибка при получении клиентов терапевта:", error)
    return []
  }

  return data || []
}

export async function getTherapistSessions(therapistId: string): Promise<(Session & { client: Profile })[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select(`
      *,
      client: profiles!client_id(*)
    `)
    .eq("therapist_id", therapistId)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  if (error) {
    console.error("Ошибка при получении сессий терапевта:", error)
    return []
  }

  return data || []
}

export async function getTherapistUpcomingSessions(
  therapistId: string,
  limit = 3,
): Promise<(Session & { client: Profile })[]> {
  const today = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("sessions")
    .select(`
      *,
      client: profiles!client_id(*)
    `)
    .eq("therapist_id", therapistId)
    .eq("status", "scheduled")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Ошибка при получении предстоящих сессий терапевта:", error)
    return []
  }

  return data || []
}

export async function getTherapistTests(therapistId: string): Promise<Test[]> {
  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .eq("created_by", therapistId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Ошибка при получении тестов терапевта:", error)
    return []
  }

  return data || []
}

export async function getTherapistAssignedTests(
  therapistId: string,
): Promise<(AssignedTest & { client: Profile; test: Test })[]> {
  const { data, error } = await supabase
    .from("assigned_tests")
    .select(`
      *,
      client: profiles!client_id(*),
      test: tests(*)
    `)
    .eq("therapist_id", therapistId)
    .order("assigned_date", { ascending: false })

  if (error) {
    console.error("Ошибка при получении назначенных тестов терапевта:", error)
    return []
  }

  return data || []
}

export async function addClient(
  therapistId: string,
  clientData: {
    email: string
    full_name: string
    diagnosis?: string
    goals?: string[]
  },
): Promise<{ success: boolean; message: string; clientId?: string }> {
  try {
    // Проверяем, существует ли пользователь с таким email
    const { data: existingUser, error: userError } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("email", clientData.email)
      .single()

    if (userError && userError.code !== "PGRST116") {
      // PGRST116 - запись не найдена, что нормально в данном случае
      throw userError
    }

    let clientId: string

    if (!existingUser) {
      // Создаем нового пользователя через API (в реальном приложении)
      // Здесь мы просто создаем запись в profiles
      const { data: newUser, error: createError } = await supabase
        .from("profiles")
        .insert({
          email: clientData.email,
          full_name: clientData.full_name,
          role: "client",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select("id")
        .single()

      if (createError) throw createError

      clientId = newUser.id
    } else {
      // Проверяем, что существующий пользователь - клиент
      if (existingUser.role !== "client") {
        return {
          success: false,
          message: "Пользователь с таким email уже существует и не является клиентом",
        }
      }

      clientId = existingUser.id
    }

    // Проверяем, не связан ли уже клиент с этим терапевтом
    const { data: existingRelation, error: relationError } = await supabase
      .from("therapist_clients")
      .select("id, status")
      .eq("therapist_id", therapistId)
      .eq("client_id", clientId)
      .single()

    if (relationError && relationError.code !== "PGRST116") {
      throw relationError
    }

    if (existingRelation) {
      if (existingRelation.status === "active") {
        return {
          success: false,
          message: "Этот клиент уже связан с вами",
        }
      }

      // Обновляем существующую связь
      const { error: updateError } = await supabase
        .from("therapist_clients")
        .update({
          status: "active",
          diagnosis: clientData.diagnosis,
          goals: clientData.goals,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingRelation.id)

      if (updateError) throw updateError
    } else {
      // Создаем новую связь
      const { error: insertError } = await supabase.from("therapist_clients").insert({
        therapist_id: therapistId,
        client_id: clientId,
        status: "active",
        diagnosis: clientData.diagnosis,
        goals: clientData.goals,
        created_at: new Date().toISOString(),
      })

      if (insertError) throw insertError
    }

    return {
      success: true,
      message: "Клиент успешно добавлен",
      clientId,
    }
  } catch (error) {
    console.error("Ошибка при добавлении клиента:", error)
    return {
      success: false,
      message: "Произошла ошибка при добавлении клиента",
    }
  }
}

