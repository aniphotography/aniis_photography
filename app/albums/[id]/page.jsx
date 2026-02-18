'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function GalleryCategoryPage() {
  const params = useParams()
  const { id } = params
  const [selectedImage, setSelectedImage] = useState(null)

  const collections = {
    wedding: {
      title: 'Wedding Collection',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80' },
        { type: 'video', src: '/videos/prewedding.mp4' },
      ],
    },
    'pre-wedding': {
      title: 'Pre Wedding Collection',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80' },
        { type: 'video', src: '/videos/prewedding.mp4' },
      ],
    },
    'video-production': {
      title: 'Video Production',
      media: [
        { type: 'video', src: '/videos/prewedding.mp4' },
        { type: 'video', src: '/videos/prewedding.mp4' },
      ],
    },
    fashion: {
      title: 'Fashion Collection',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1495568720989-cebdbdd97913?w=800&q=80' },
      ],
    },
  }

  const category = collections[id]

  if (!category) return null

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-16 px-6 text-center">
        <h1 className="text-6xl font-display text-[#d4af37]">
          {category.title}
        </h1>
      </section>

      {/* Media Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {category.media.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer border border-white/10"
              onClick={() => item.type === 'image' && setSelectedImage(item.src)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  className="w-full h-80 object-cover hover:scale-110 transition duration-700"
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-80 object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[80vh] max-w-5xl"
          />
        </div>
      )}

      <Footer />
    </main>
  )
}
