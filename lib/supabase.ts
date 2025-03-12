import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://vcnhfjjlmndslnbprati.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbmhmampsbW5kc2xuYnByYXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjcyMjgsImV4cCI6MjA1NzM0MzIyOH0.p3Zxo7yleAenyDlgGQqSi9jFEHQ5GfVSDNOMZ3yBme8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

