import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

const testimonials = [
  {
    quote: "This platform has transformed how I approach psychological assessment with my clients.",
    author: "Dr. Sarah Johnson",
    role: "Clinical Psychologist",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "The resources available have been invaluable for my research and clinical practice.",
    author: "Prof. Michael Chen",
    role: "Research Psychologist",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "I've seen remarkable progress with my patients using the tools provided here.",
    author: "Dr. Emily Rodriguez",
    role: "Therapist",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-beige-900 md:text-4xl">What Professionals Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-beige-700">
            Hear from psychologists and mental health professionals who use our platform.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-beige-200 bg-beige-50">
              <CardContent className="p-6">
                <QuoteIcon className="mb-4 h-8 w-8 text-beige-400" />
                <p className="mb-6 text-lg text-beige-700">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-beige-900">{testimonial.author}</h4>
                    <p className="text-sm text-beige-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

