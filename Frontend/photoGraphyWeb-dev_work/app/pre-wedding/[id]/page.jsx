'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, use } from 'react'

export default function CoupleDetailPage({ params }) {
  const unwrappedParams = use(params)
  const [selectedImage, setSelectedImage] = useState(null)

  const coupleData = {
    1: {
      id: 1,
      names: 'Sarah & Michael',
      photos: [
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      ],
    },
    2: {
      id: 2,
      names: 'Emma & James',
      photos: [
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
      ],
    },
    3: {
      id: 3,
      names: 'Olivia & David',
      photos: [
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
      ],
    },
    4: {
      id: 4,
      names: 'Sophie & Alex',
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
      ],
    },
  }

  const couple = coupleData[unwrappedParams.id] || coupleData[1]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
      <Navbar />

      {/* Background Video Hero */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/prewedding.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <h1 className="text-5xl md:text-7xl font-display mb-4">
            {couple.names}'s <span className="text-gold">Story</span>
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg">
            A beautiful love story captured in moments
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <Link
            href="/pre-wedding"
            className="text-gold hover:text-yellow-300 font-lato text-sm uppercase tracking-widest mb-8 inline-block"
          >
            ← Back to Stories
          </Link>

          <h3 className="text-3xl font-display mb-8">
            Photo <span className="text-gold">Gallery</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {couple.photos.map((photo, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden h-64 cursor-pointer"
                onClick={() => setSelectedImage(photo)}
              >
                <img
                  src={photo}
                  alt={`${couple.names} moment ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full view"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gold hover:text-yellow-300 transition-colors duration-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
