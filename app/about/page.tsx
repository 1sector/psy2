import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-beige-900 md:text-5xl">About PSY</h1>
          <p className="mb-8 text-lg text-beige-700">
            We're dedicated to advancing psychological practice through innovative digital tools.
          </p>
        </div>

        <div className="mt-16 grid gap-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 text-3xl font-bold text-beige-900">Our Mission</h2>
              <p className="mb-4 text-beige-700">
                PSY was founded with a clear mission: to make advanced psychological tools accessible to practitioners
                and researchers worldwide.
              </p>
              <p className="text-beige-700">
                We believe that by leveraging technology, we can enhance the practice of psychology and improve outcomes
                for individuals seeking mental health support.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-beige-200 md:aspect-auto md:h-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our mission illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-beige-200 md:aspect-auto md:h-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our team illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-bold text-beige-900">Our Team</h2>
              <p className="mb-4 text-beige-700">
                Our interdisciplinary team brings together expertise in psychology, technology, and design to create
                tools that are both scientifically sound and user-friendly.
              </p>
              <p className="text-beige-700">
                With backgrounds spanning clinical psychology, research methodology, software development, and user
                experience design, we approach each challenge from multiple perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

