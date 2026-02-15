'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/wedding', label: 'Wedding' },
    { href: '/pre-wedding', label: 'Pre-Wedding' },
    { href: '/albums', label: 'Gallery' },
    { href: '/video-production', label: 'Video Production' },
    { href: '/fashion', label: 'Fashion' },
    { href: '/album-design', label: 'Album Design' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-display text-gold flex-shrink-0">
          LUXE
        </Link>

        {/* Desktop Menu - Single Row */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-lato text-gray-300 hover:text-gold transition-colors duration-300 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block flex-shrink-0">
          <Link
            href="/contact"
            className="px-6 py-2 bg-gold text-black font-lato font-bold text-sm hover:bg-yellow-400 transition-colors duration-300"
          >
            Book Session
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gold"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-lato text-gray-300 hover:text-gold transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-6 py-2 bg-gold text-black font-lato font-bold text-sm text-center hover:bg-yellow-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Book Session
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
