import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-beige-200 bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold text-beige-900">PSY</h3>
            <p className="text-beige-700">
              Modern psychological tools and resources for professionals and individuals.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-beige-900">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/assessments" className="text-beige-700 hover:text-beige-900">
                  Assessments
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-beige-700 hover:text-beige-900">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-beige-700 hover:text-beige-900">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-beige-700 hover:text-beige-900">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-beige-900">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-beige-700 hover:text-beige-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-beige-700 hover:text-beige-900">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-beige-700 hover:text-beige-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-beige-700 hover:text-beige-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-beige-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-beige-700 hover:text-beige-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-beige-700 hover:text-beige-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-beige-700 hover:text-beige-900">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-beige-200 pt-6 text-center text-beige-700">
          <p>© {new Date().getFullYear()} PSY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

