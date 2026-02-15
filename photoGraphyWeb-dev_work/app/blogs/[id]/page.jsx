'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { use } from 'react'

export default function BlogDetailPage({ params }) {

  const { id } = use(params)

  const blogData = {

    1: {
      title: 'How to Plan a Cinematic Laha Bari Pre-Wedding Shoot in Kolkata',
      date: '28 JAN, 2026',
      hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600',
      images: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200',
        'https://images.unsplash.com/photo-1539571696357-5a69c006ad1c?w=1200'
      ],
      content: `
Planning a cinematic pre-wedding shoot at Laha Bari in Kolkata allows you to combine royal heritage with emotional storytelling.

Choose traditional Bengali attire, use golden-hour lighting, and incorporate architectural symmetry for dramatic frames.

Movement-based storytelling enhances cinematic depth and emotional connection.
      `
    },

    2: {
      title: 'Picture Perfect: 20+ Trending Engagement Poses to Capture Your Chemistry',
      date: '18 JAN, 2026',
      hero: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200'
      ],
      content: `
Engagement photography is about natural chemistry.

Use walking shots, soft laughter, candid expressions, and close-frame emotional portraits.

Avoid stiff posing — focus on interaction and movement for authenticity.
      `
    },

    3: {
      title: 'From Gaye Holud to Sindoor Daan: A Bengali Wedding Ritual Guide',
      date: '05 JAN, 2026',
      hero: 'https://images.unsplash.com/photo-1539571696357-5a69c006ad1c?w=1600',
      images: [
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=1200',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200'
      ],
      content: `
Bengali weddings are filled with rich rituals and cultural symbolism.

From Gaye Holud to Sindoor Daan, every moment carries emotional significance.

Capturing these rituals requires anticipation, emotional awareness, and cultural sensitivity.
      `
    },

    4: {
      title: 'Top 10 Pre-Wedding Shoot Locations in Kolkata',
      date: '01 JAN, 2026',
      hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600',
      images: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200',
        'https://images.unsplash.com/photo-1539571696357-5a69c006ad1c?w=1200'
      ],
      content: `
Kolkata offers a perfect blend of heritage and modern aesthetics for pre-wedding shoots.

Victoria Memorial, Prinsep Ghat, and Laha Bari provide cinematic backgrounds.

Always plan shoots around lighting conditions and crowd flow for best results.
      `
    }

  }

  const blog = blogData[id]

  if (!blog) return <div className="p-20 text-white">Blog not found</div>

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-gray-500 uppercase text-sm mb-10 tracking-widest">
            {blog.date}
          </p>

          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden mb-12">
            <img
              src={blog.hero}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="text-gray-300 leading-relaxed whitespace-pre-line space-y-6 text-lg">
            {blog.content}
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {blog.images.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img
                  src={img}
                  alt="Blog visual"
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </article>

      <Footer />
    </main>
  )
}
