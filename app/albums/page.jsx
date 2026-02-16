'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function AlbumsPage() {
  const [selectedImage, setSelectedImage] = useState(null)

  const albums = [
    {
      id: 1,
      title: 'Sarah & John Wedding',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    },
    {
      id: 2,
      title: 'Emma & Alex Engagement',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
    },
    {
      id: 3,
      title: 'Rachel & David Wedding',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
    },
    {
      id: 4,
      title: 'Jessica & Mark Celebration',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
    },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      <section className="pt-40 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-display mb-6 tracking-tight">
          <span className="text-[#d4af37]">Photo</span> Albums
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-sm tracking-[0.3em] uppercase">
          Click any album to view in full cinematic detail
        </p>
      </section>

      {/* Albums Cinematic Masonry */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">
            {albums.map((album, index) => {
              const isLarge = index % 5 === 0
              const isWide = index % 5 === 3

              return (
                <div 
                  key={album.id}
                  onClick={() => setSelectedImage(album)} // Simple click to open
                  className={`relative group overflow-hidden cursor-pointer border border-white/5 
                    ${isLarge ? 'md:row-span-2' : ''} 
                    ${isWide ? 'md:col-span-2' : ''}`}
                >
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[#d4af37] text-[10px] tracking-widest uppercase mb-2">{album.date}</p>
                    <h3 className="text-2xl font-display text-white">{album.title}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- CINEMATIC LIGHTBOX --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-md z-[200] flex flex-col transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Top Bar for Close Button */}
          <div className="w-full h-24 flex items-center justify-end px-8 md:px-16 shrink-0">
            <button
              onClick={() => setSelectedImage(null)}
              className="text-[#d4af37] hover:text-white transition-colors"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow relative flex items-center justify-center p-6 pt-0">
            {/* Nav Arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-16 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = albums.findIndex(img => img.id === selectedImage.id);
                  const prevIndex = (currentIndex - 1 + albums.length) % albums.length;
                  setSelectedImage(albums[prevIndex]);
                }}
                className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full border border-[#d4af37]/20 bg-black/40 text-[#d4af37] hover:text-white transition-all"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = albums.findIndex(img => img.id === selectedImage.id);
                  const nextIndex = (currentIndex + 1) % albums.length;
                  setSelectedImage(albums[nextIndex]);
                }}
                className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full border border-[#d4af37]/20 bg-black/40 text-[#d4af37] hover:text-white transition-all"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Photo Wrapper */}
            <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[65vh] md:max-h-[75vh] object-contain shadow-2xl"
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