'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function AlbumsPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const albums = [
    {
      id: 1,
      title: 'Sarah & John Wedding',
      date: '2024',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    },
    {
      id: 2,
      title: 'Emma & Alex Pre Wedding',
      date: '2024',
      category: 'pre-wedding',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
    },
    {
      id: 3,
      title: 'Video Production Project',
      date: '2023',
      category: 'video-production',
      image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80',
    },
    {
      id: 4,
      title: 'Fashion Editorial Shoot',
      date: '2023',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    },
  ]

  const filteredAlbums =
    activeCategory === 'all'
      ? albums
      : albums.filter(album => album.category === activeCategory)

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-40 pb-10 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-display mb-6 tracking-tight">
          <span className="text-[#d4af37]">Photo</span> Albums
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-sm tracking-[0.3em] uppercase">
          Click any album to view in full cinematic detail
        </p>
      </section>

      {/* ===== FILTER BUTTONS (NEW ADDED PART) ===== */}
      <section className="pb-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">

          {[
            { label: 'All', value: 'all' },
            { label: 'Wedding', value: 'wedding' },
            { label: 'Pre Wedding', value: 'pre-wedding' },
            { label: 'Video Production', value: 'video-production' },
            { label: 'Fashion', value: 'fashion' },
          ].map(btn => (
            <button
              key={btn.value}
              onClick={() => setActiveCategory(btn.value)}
              className={`px-6 py-2 rounded-full border text-sm tracking-widest transition-all duration-300
                ${
                  activeCategory === btn.value
                    ? 'bg-[#d4af37] text-black border-[#d4af37]'
                    : 'border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black'
                }`}
            >
              {btn.label}
            </button>
          ))}

        </div>
      </section>

      {/* Albums Cinematic Masonry */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">

            {filteredAlbums.map((album, index) => {
              const isLarge = index % 5 === 0
              const isWide = index % 5 === 3

              return (
                <div
                  key={album.id}
                  onClick={() => setSelectedImage(album)}
                  className={`relative group overflow-hidden cursor-pointer border border-white/5 
                    ${isLarge ? 'md:row-span-2' : ''} 
                    ${isWide ? 'md:col-span-2' : ''}`}
                >
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[#d4af37] text-[10px] tracking-widest uppercase mb-2">
                      {album.date}
                    </p>
                    <h3 className="text-2xl font-display text-white">
                      {album.title}
                    </h3>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX (UNCHANGED) ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-md z-[200] flex flex-col"
          onClick={() => setSelectedImage(null)}
        >
          <div className="w-full h-24 flex items-center justify-end px-8 md:px-16 shrink-0">
            <button
              onClick={() => setSelectedImage(null)}
              className="text-[#d4af37] hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-grow flex items-center justify-center p-6">
            <div
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[75vh] object-contain shadow-2xl"
              />
              <div className="mt-8 text-center">
                <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium">
                  {selectedImage.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
