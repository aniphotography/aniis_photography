'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'

export default function AlbumsPage() {
  const [activeReview, setActiveReview] = useState(0)

  const albums = [
    {
      id: 1,
      title: 'Sarah & John Wedding',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
      photos: 500,
    },
    {
      id: 2,
      title: 'Emma & Alex Engagement',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=500&q=80',
      photos: 200,
    },
    {
      id: 3,
      title: 'Rachel & David Wedding',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80',
      photos: 450,
    },
    {
      id: 4,
      title: 'Jessica & Mark Celebration',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=500&q=80',
      photos: 350,
    },
  ]

  const reviews = [
    {
      id: 1,
      name: 'Sarah Williams',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      text: 'LUXE captured our wedding day beautifully. The photographer was professional, attentive, and delivered stunning photos that we will treasure forever.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Emma Johnson',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      text: 'Outstanding service from start to finish. The pre-wedding shoot was absolutely magical, and the final images exceeded our expectations.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Rachel Brown',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
      text: 'The attention to detail and creativity is unmatched. LUXE truly understands how to capture the emotion and elegance of special moments.',
      rating: 5,
    },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          <span className="text-gold">Photo</span> Albums
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Complete collections of memorable moments organized by events
        </p>
      </section>

      {/* Albums Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {albums.map((album) => (
              <div
                key={album.id}
                className="group cursor-pointer border border-white/10 overflow-hidden hover:border-gold transition-colors duration-300"
              >
                <div className="relative overflow-hidden h-64 md:h-80">
                  <img
                    src={album.image || "/placeholder.svg"}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                </div>

                <div className="p-8 bg-black/50">
                  <p className="text-gold text-xs uppercase tracking-widest mb-2">{album.date}</p>
                  <h3 className="text-2xl font-display text-white mb-4">{album.title}</h3>
                  <p className="text-gray-400 font-lato text-sm mb-6">{album.photos} Photos</p>

                  <Link
                    href={`/albums/${album.id}`}
                    className="inline-block px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-sm font-bold"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-4">
            Client <span className="text-gold">Reviews</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-12" />

          <div className="relative">
            {/* Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div
                  key={review.id}
                  className={`p-8 border transition-all duration-300 transform ${
                    idx === activeReview
                      ? 'border-gold bg-black/80 md:col-span-1'
                      : 'border-white/10 bg-black/40 md:scale-95'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="text-white font-display">{review.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-gold">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 font-lato text-sm italic">"{review.text}"</p>
                </div>
              ))}
            </div>

            {/* Review Navigation */}
            <div className="flex justify-center gap-4 mt-12">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeReview ? 'bg-gold w-8' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
