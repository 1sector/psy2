"use client"

import { useState } from "react"
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

// Пример данных для таблицы
const contentData = [
  {
    id: "1",
    title: "Когнитивные искажения в повседневной жизни",
    type: "article",
    author: "Анна Смирнова",
    status: "published",
    date: "2023-11-15",
  },
  {
    id: "2",
    title: "Техники релаксации при стрессе",
    type: "resource",
    author: "Иван Петров",
    status: "published",
    date: "2023-10-28",
  },
  {
    id: "3",
    title: "Опросник для оценки эмоционального состояния",
    type: "tool",
    author: "Мария Иванова",
    status: "draft",
    date: "2023-11-10",
  },
  {
    id: "4",
    title: "Влияние медитации на когнитивные функции",
    type: "case-study",
    author: "Алексей Козлов",
    status: "published",
    date: "2023-09-05",
  },
  {
    id: "5",
    title: "Психологические аспекты принятия решений",
    type: "article",
    author: "Елена Соколова",
    status: "draft",
    date: "2023-11-18",
  },
]

// Функция для форматирования даты
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ru-RU").format(date)
}

// Компонент для отображения типа контента
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

// Компонент для отображения статуса
function StatusLabel({ status }: { status: string }) {
  const statusLabels: Record<string, { label: string; className: string }> = {
    published: { label: "Опубликовано", className: "bg-green-100 text-green-800 hover:bg-green-200" },
    draft: { label: "Черновик", className: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
  }

  const { label, className } = statusLabels[status] || { label: status, className: "bg-gray-100 text-gray-800" }

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

export function ContentTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setSelectedItemId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // В реальном приложении здесь будет логика удаления
    console.log(`Удаление элемента с ID: ${selectedItemId}`)
    setDeleteDialogOpen(false)
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
            {contentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <ContentTypeLabel type={item.type} />
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>
                  <StatusLabel status={item.status} />
                </TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
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
            ))}
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

