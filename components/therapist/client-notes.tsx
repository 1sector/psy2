"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus, Trash2 } from "lucide-react"

interface Note {
  id: string
  date: string
  content: string
}

interface ClientNotesProps {
  clientId: string
}

// Имитация данных о заметках
const initialNotes: Note[] = [
  {
    id: "n1",
    date: "2023-11-24",
    content:
      "Клиент отмечает снижение тревожности в социальных ситуациях. Продолжаем работу над техниками релаксации и когнитивной реструктуризацией.",
  },
  {
    id: "n2",
    date: "2023-11-10",
    content:
      "Обсудили прогресс в управлении тревогой. Клиент начал применять техники осознанности в повседневной жизни. Отмечает улучшение качества сна.",
  },
  {
    id: "n3",
    date: "2023-10-27",
    content:
      "Клиент сообщает о трудностях на работе, которые усиливают тревогу. Разработали план управления стрессом в рабочей среде.",
  },
]

// Форматирование даты
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ru-RU").format(date)
}

export function ClientNotes({ clientId }: ClientNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [newNote, setNewNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsSubmitting(true)

    try {
      // В реальном приложении здесь будет отправка данных на сервер
      const currentDate = new Date().toISOString().split("T")[0]
      const newNoteObj: Note = {
        id: `n${Date.now()}`,
        date: currentDate,
        content: newNote,
      }

      // Имитация задержки запроса
      await new Promise((resolve) => setTimeout(resolve, 500))

      setNotes([newNoteObj, ...notes])
      setNewNote("")
    } catch (error) {
      console.error("Ошибка при добавлении заметки:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteNote = async (id: string) => {
    try {
      // В реальном приложении здесь будет отправка данных на сервер

      // Имитация задержки запроса
      await new Promise((resolve) => setTimeout(resolve, 500))

      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-beige-200">
        <CardHeader>
          <CardTitle>Добавить заметку</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Введите заметку о сессии..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[120px] border-beige-300"
            />
            <Button
              onClick={handleAddNote}
              disabled={!newNote.trim() || isSubmitting}
              className="bg-beige-900 text-beige-50 hover:bg-beige-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isSubmitting ? "Добавление..." : "Добавить заметку"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">История заметок</h3>

        {notes.length > 0 ? (
          notes.map((note) => (
            <Card key={note.id} className="border-beige-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm text-beige-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(note.date)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteNote(note.id)}
                    className="h-8 w-8 text-beige-700 hover:text-beige-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm">{note.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-lg border border-beige-200 bg-beige-50 p-8 text-center">
            <p className="text-beige-600">Нет заметок</p>
          </div>
        )}
      </div>
    </div>
  )
}

