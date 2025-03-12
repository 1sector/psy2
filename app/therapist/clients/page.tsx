import { ClientsList } from "@/components/therapist/clients-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Мои клиенты</h1>
        <Button asChild className="bg-beige-900 text-beige-50 hover:bg-beige-800">
          <Link href="/therapist/clients/new">
            <Plus className="mr-2 h-4 w-4" /> Добавить клиента
          </Link>
        </Button>
      </div>
      <ClientsList />
    </div>
  )
}

