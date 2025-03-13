"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-beige-200 bg-beige-50/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-beige-900">PSY</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex gap-6">
            <Link href="/about" className="text-beige-700 hover:text-beige-900">
              About
            </Link>
            <Link href="/services" className="text-beige-700 hover:text-beige-900">
              Services
            </Link>
            <Link href="/resources" className="text-beige-700 hover:text-beige-900">
              Resources
            </Link>
            <Link href="/contact" className="text-beige-700 hover:text-beige-900">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="outline" className="border-beige-300 text-beige-900 hover:bg-beige-100">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-beige-900 text-beige-50 hover:bg-beige-800">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6 text-beige-900" /> : <Menu className="h-6 w-6 text-beige-900" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-6 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-beige-700 hover:bg-beige-100 hover:text-beige-900"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="rounded-md px-3 py-2 text-beige-700 hover:bg-beige-100 hover:text-beige-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/resources"
              className="rounded-md px-3 py-2 text-beige-700 hover:bg-beige-100 hover:text-beige-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="rounded-md px-3 py-2 text-beige-700 hover:bg-beige-100 hover:text-beige-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full border-beige-300 text-beige-900 hover:bg-beige-100">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="w-full bg-beige-900 text-beige-50 hover:bg-beige-800">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

