import { TherapistDashboard } from "@/components/therapist/therapist-dashboard"
import { redirect } from "next/navigation"

// In a real application, this would be an authentication check
const isAuthenticated = true

export default function TherapistPage() {
  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    redirect("/auth/login")
  }

  return <TherapistDashboard />
}

