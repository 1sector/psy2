import { TestsList } from "@/components/therapist/tests-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Психологические тесты</h1>
        <Button asChild className="bg-beige-900 text-beige-50 hover:bg-beige-800">
          <Link href="/therapist/tests/new">
            <Plus className="mr-2 h-4 w-4" /> Создать тест
          </Link>
        </Button>
      </div>
      <TestsList />
    </div>
  )
}

