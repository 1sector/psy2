import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold leading-tight text-beige-900 md:text-5xl lg:text-6xl">
            Modern Psychology for the Digital Age
          </h1>
          <p className="text-lg text-beige-700 md:text-xl">
            Discover innovative psychological tools and resources designed for today's challenges.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/auth/register">
              <Button className="bg-beige-900 text-beige-50 hover:bg-beige-800">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-beige-300 text-beige-900 hover:bg-beige-100">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-beige-200 md:aspect-auto md:h-[500px]">
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Psychology illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}

