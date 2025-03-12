import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database.types"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Используем конкретные значения для Supabase
  const supabaseUrl = "https://vcnhfjjlmndslnbprati.supabase.co"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbmhmampsbW5kc2xuYnByYXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjcyMjgsImV4cCI6MjA1NzM0MzIyOH0.p3Zxo7yleAenyDlgGQqSi9jFEHQ5GfVSDNOMZ3yBme8"

  const supabase = createMiddlewareClient<Database>(
    { req, res },
    {
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Если пользователь не аутентифицирован и пытается получить доступ к защищенным маршрутам
  if (!session && (req.nextUrl.pathname.startsWith("/client") || req.nextUrl.pathname.startsWith("/therapist"))) {
    const redirectUrl = new URL("/auth/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Если пользователь аутентифицирован, проверяем его роль
  if (session) {
    // Получаем профиль пользователя
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    // Если пользователь пытается получить доступ к маршрутам, не соответствующим его роли
    if (profile) {
      if (profile.role === "client" && req.nextUrl.pathname.startsWith("/therapist")) {
        const redirectUrl = new URL("/client", req.url)
        return NextResponse.redirect(redirectUrl)
      }

      if (profile.role === "therapist" && req.nextUrl.pathname.startsWith("/client")) {
        const redirectUrl = new URL("/therapist", req.url)
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  return res
}

export const config = {
  matcher: ["/client/:path*", "/therapist/:path*", "/auth/:path*"],
}

