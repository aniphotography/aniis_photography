'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FeaturedSection() {
  const featured = [
    {
      id: 1,
      title: 'Ethereal Elegance',
      category: 'Wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      href: '/wedding',
    },
    {
      id: 2,
      title: 'Romance in Motion',
      category: 'Pre-Wedding',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
      href: '/pre-wedding',
    },
    {
      id: 3,
      title: 'Timeless Stories',
      category: 'Albums',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
      href: '/albums',
    },
  ]

  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section className="py-20 px-6 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display text-white mb-4">
            Signature <span className="text-gold">Collections</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
          <p className="text-gray-400 font-lato max-w-2xl mx-auto">
            Explore our curated highlight section showcasing the best of our signature works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative overflow-hidden h-96 cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-gold text-sm font-lato uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.category}
                </p>
                <h3 className="text-2xl font-display text-white mb-4">
                  {item.title}
                </h3>
                <div className="w-8 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
