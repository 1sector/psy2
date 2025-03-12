import { ContentTable } from "@/components/admin/content-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Управление контентом</h1>
        <Button asChild className="bg-beige-900 text-beige-50 hover:bg-beige-800">
          <Link href="/admin/content/new">
            <Plus className="mr-2 h-4 w-4" /> Добавить контент
          </Link>
        </Button>
      </div>
      <ContentTable />
    </div>
  )
}

