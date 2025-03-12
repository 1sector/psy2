import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Heart, Users, Sparkles, BookOpen, LineChart, Lightbulb, Shield } from "lucide-react"

const services = [
  {
    title: "Psychological Assessment",
    description: "Comprehensive tools for evaluating cognitive functions, emotional states, and behavioral patterns.",
    icon: Brain,
  },
  {
    title: "Therapeutic Resources",
    description: "Evidence-based materials to support various therapeutic approaches and interventions.",
    icon: Heart,
  },
  {
    title: "Group Facilitation",
    description: "Resources for conducting effective group therapy sessions and workshops.",
    icon: Users,
  },
  {
    title: "Innovative Methods",
    description: "Access to cutting-edge psychological approaches backed by recent research.",
    icon: Sparkles,
  },
  {
    title: "Educational Materials",
    description:
      "Learning resources for both practitioners and clients to enhance understanding of psychological concepts.",
    icon: BookOpen,
  },
  {
    title: "Progress Tracking",
    description: "Tools to monitor and visualize client progress over time with detailed analytics.",
    icon: LineChart,
  },
  {
    title: "Research Support",
    description: "Resources and methodologies to support psychological research and data collection.",
    icon: Lightbulb,
  },
  {
    title: "Data Security",
    description: "Robust security measures to protect sensitive client information and ensure confidentiality.",
    icon: Shield,
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-beige-900 md:text-5xl">Our Services</h1>
          <p className="mb-8 text-lg text-beige-700">
            Comprehensive psychological tools and resources designed for professionals and researchers.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="border-beige-200 bg-beige-50 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 inline-flex rounded-lg bg-beige-200 p-3">
                  <service.icon className="h-6 w-6 text-beige-900" />
                </div>
                <CardTitle className="text-xl text-beige-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-beige-700">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

