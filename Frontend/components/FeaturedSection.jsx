'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const SLOT_TITLES = {
  1: 'Ethereal Elegance',
  2: 'Romance in Motion', 
  3: 'Timeless Stories',
}

export default function FeaturedSection() {
  const [featuredCollections, setFeaturedCollections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/collections/featured`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFeaturedCollections(data)
      })
      .catch(err => console.error("Featured Fetch Error:", err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  // Create slots array - always show 3 slots
  const slots = [1, 2, 3].map(slot => {
    const collection = featuredCollections.find(c => c.featured_slot === slot)
    return { slot, collection }
  })

  return (
    <section className="py-20 px-6 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display text-white mb-4">
            Signature <span className="text-gold">Collections</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {slots.map(({ slot, collection }) => {
            if (!collection) return (
              <div
                key={slot}
                className="group relative overflow-hidden h-96 bg-[#111] border border-white/5 flex items-center justify-center"
              >
                <p className="text-gray-600 text-sm">Slot {slot} — Not assigned</p>
              </div>
            )

            // Determine the correct link based on category
            const getCategoryLink = (cat, id) => {
              const map = {
                'wedding': `/wedding/${id}`,
                'pre-wedding': `/pre-wedding/${id}`,
                'fashion': `/fashion/${id}`,
                'video-production': `/video-production/${id}`,
                'blogs': `/blogs/${id}`,
              }
              return map[cat] || `/${cat}/${id}`
            }

            return (
              <Link
                key={slot}
                href={getCategoryLink(collection.category, collection.id)}
                className="group relative overflow-hidden h-96 cursor-pointer block bg-[#111] border border-white/5"
              >
                {collection.cover_image && (
                  <img
                    src={getMediaUrl(collection.cover_image)}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-gold text-sm font-lato uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {collection.category}
                  </p>
                  <h3 className="text-2xl font-display text-white mb-4">
                    {collection.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}