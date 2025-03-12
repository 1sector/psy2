"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - would connect to backend in a real implementation
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    // Show success message
    alert("Thank you for your message. We'll get back to you soon!")
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-beige-900 md:text-5xl">Contact Us</h1>
          <p className="mb-8 text-lg text-beige-700">Have questions or need assistance? We're here to help.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="border-beige-300 focus:border-beige-500 focus:ring-beige-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="border-beige-300 focus:border-beige-500 focus:ring-beige-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="border-beige-300 focus:border-beige-500 focus:ring-beige-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  required
                  className="border-beige-300 focus:border-beige-500 focus:ring-beige-500"
                />
              </div>
              <Button type="submit" className="w-full bg-beige-900 text-beige-50 hover:bg-beige-800">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card className="border-beige-200 bg-beige-50">
              <CardContent className="flex items-start gap-4 p-6">
                <Mail className="h-6 w-6 text-beige-900" />
                <div>
                  <h3 className="font-semibold text-beige-900">Email Us</h3>
                  <p className="text-beige-700">info@psyplatform.com</p>
                  <p className="text-beige-700">support@psyplatform.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-beige-200 bg-beige-50">
              <CardContent className="flex items-start gap-4 p-6">
                <Phone className="h-6 w-6 text-beige-900" />
                <div>
                  <h3 className="font-semibold text-beige-900">Call Us</h3>
                  <p className="text-beige-700">+1 (555) 123-4567</p>
                  <p className="text-beige-700">Mon-Fri: 9AM - 5PM EST</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-beige-200 bg-beige-50">
              <CardContent className="flex items-start gap-4 p-6">
                <MapPin className="h-6 w-6 text-beige-900" />
                <div>
                  <h3 className="font-semibold text-beige-900">Visit Us</h3>
                  <p className="text-beige-700">123 Psychology Lane</p>
                  <p className="text-beige-700">New York, NY 10001</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

