import { Brain, Heart, Users, Sparkles } from "lucide-react"

const features = [
  {
    title: "Cognitive Assessment",
    description: "Advanced tools to evaluate cognitive functions and mental processes.",
    icon: Brain,
  },
  {
    title: "Emotional Wellbeing",
    description: "Resources and techniques to support emotional health and resilience.",
    icon: Heart,
  },
  {
    title: "Group Therapy",
    description: "Collaborative approaches for shared experiences and mutual support.",
    icon: Users,
  },
  {
    title: "Innovative Methods",
    description: "Cutting-edge psychological approaches backed by recent research.",
    icon: Sparkles,
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-beige-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-beige-900 md:text-4xl">Our Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-beige-700">
            Discover the comprehensive tools and resources designed to support psychological wellbeing and growth.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="rounded-xl bg-beige-50 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-beige-200 p-3">
                <feature.icon className="h-6 w-6 text-beige-900" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-beige-900">{feature.title}</h3>
              <p className="text-beige-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

