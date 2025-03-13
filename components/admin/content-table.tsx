"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

type ContentItem = {
  id: string
  title: string
  type: string
  description: string
  created_at: string
  published: boolean
  author: {
    full_name: string
  }
}

// Function for formatting date
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ru-RU").format(date)
}

// Component for displaying content type
function ContentTypeLabel({ type }: { type: string }) {
  const typeLabels: Record<string, { label: string; className: string }> = {
    article: { label: "Статья", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    resource: { label: "Ресурс", className: "bg-green-100 text-green-800 hover:bg-green-200" },
    tool: { label: "Инструмент", className: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
    "case-study": { label: "Кейс-стади", className: "bg-rose-100 text-rose-800 hover:bg-rose-200" },
  }

  const { label, className } = typeLabels[type] || { label: type, className: "bg-gray-100 text-gray-800" }

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

// Component for displaying status
function StatusLabel({ status }: { status: boolean }) {
  return status ? (
    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
      Опубликовано
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
      Черновик
    </Badge>
  )
}

export function ContentTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [contentData, setContentData] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("content")
        .select(`
          id,
          title,
          type,
          description,
          created_at,
          published,
          author:author_id(full_name)
        `)
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setContentData(data || [])
    } catch (error) {
      console.error("Error fetching content:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список контента",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    setSelectedItemId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedItemId) return

    try {
      const { error } = await supabase.from("content").delete().eq("id", selectedItemId)

      if (error) {
        throw error
      }

      // Remove the deleted item from the state
      setContentData(contentData.filter((item) => item.id !== selectedItemId))

      toast({
        title: "Успешно",
        description: "Контент успешно удален",
      })
    } catch (error) {
      console.error("Error deleting content:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить контент",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setSelectedItemId(null)
    }
  }

  return (
    <>
      <div className="rounded-md border border-beige-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-beige-100">
              <TableHead>Название</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Автор</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="w-[80px]">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : contentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Нет данных
                </TableCell>
              </TableRow>
            ) : (
              contentData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <ContentTypeLabel type={item.type} />
                  </TableCell>
                  <TableCell>{item.author?.full_name || "Неизвестно"}</TableCell>
                  <TableCell>
                    <StatusLabel status={item.published} />
                  </TableCell>
                  <TableCell>{formatDate(item.created_at)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Меню</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/content/${item.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Просмотр</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/content/${item.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Редактировать</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Удалить</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этот контент? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-beige-300">
              Отмена
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

