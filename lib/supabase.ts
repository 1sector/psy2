import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

// Используем переменные окружения с fallback значениями
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  // Добавляем настройки для улучшения обработки сетевых ошибок
  global: {
    fetch: (...args) => {
      return fetch(...args)
    },
    headers: {
      "X-Client-Info": "supabase-js/2.x",
    },
  },
})

