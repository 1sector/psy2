import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Session = Database["public"]["Tables"]["sessions"]["Row"]
type AssignedTest = Database["public"]["Tables"]["assigned_tests"]["Row"]
type ProgressRecord = Database["public"]["Tables"]["progress_records"]["Row"]

export async function getClientProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).eq("role", "client").single()

  if (error) {
    console.error("Ошибка при получении профиля клиента:", error)
    return null
  }

  return data
}

export async function getClientTherapist(clientId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("therapist_clients")
    .select("therapist_id")
    .eq("client_id", clientId)
    .eq("status", "active")
    .single()

  if (error || !data) {
    console.error("Ошибка при получении терапевта клиента:", error)
    return null
  }

  const { data: therapist, error: therapistError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.therapist_id)
    .single()

  if (therapistError) {
    console.error("Ошибка при получении профиля терапевта:", therapistError)
    return null
  }

  return therapist
}

export async function getClientSessions(clientId: string): Promise<Session[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("client_id", clientId)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  if (error) {
    console.error("Ошибка при получении сессий клиента:", error)
    return []
  }

  return data || []
}

export async function getClientUpcomingSessions(clientId: string, limit = 3): Promise<Session[]> {
  const today = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("client_id", clientId)
    .eq("status", "scheduled")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Ошибка при получении предстоящих сессий клиента:", error)
    return []
  }

  return data || []
}

export async function getClientAssignedTests(clientId: string): Promise<AssignedTest[]> {
  const { data, error } = await supabase
    .from("assigned_tests")
    .select(`
      *,
      tests (
        id,
        title,
        description
      )
    `)
    .eq("client_id", clientId)
    .order("assigned_date", { ascending: false })

  if (error) {
    console.error("Ошибка при получении назначенных тестов клиента:", error)
    return []
  }

  return data || []
}

export async function getClientProgressRecords(clientId: string): Promise<ProgressRecord[]> {
  const { data, error } = await supabase
    .from("progress_records")
    .select("*")
    .eq("client_id", clientId)
    .order("date", { ascending: true })

  if (error) {
    console.error("Ошибка при получении записей о прогрессе клиента:", error)
    return []
  }

  return data || []
}

