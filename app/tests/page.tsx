import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TestsList } from "@/components/tests-list"
import { TestsHero } from "@/components/tests-hero"

export const metadata = {
  title: "Психологические тесты | PSY",
  description: "Пройдите психологические тесты и оценки для лучшего понимания себя",
}

export default function TestsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <TestsHero />
      <TestsList />
      <Footer />
    </main>
  )
}
