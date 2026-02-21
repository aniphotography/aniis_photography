'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function GalleryCategoryPage() {
  const params = useParams()
  const { id } = params
  
  const [selectedIndex, setSelectedIndex] = useState(null)

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
    // ... add your other categories here
  }

  const category = collections[id]
  if (!category) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Category not found</div>

  const handleNext = (e) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev + 1) % category.media.length)
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev - 1 + category.media.length) % category.media.length)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="pt-40 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-[#d4af37] italic">
          {category.title}
        </h1>
      </section>

      {/* Media Grid */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {category.media.map((item, index) => (
            <div
              key={index}
              className="relative aspect-[4/5] overflow-hidden cursor-pointer border border-white/5 bg-[#111] group"
              onClick={() => setSelectedIndex(index)}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.src} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700" 
                  alt="" 
                />
              ) : (
                <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-700">
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
     {/* --- CINEMATIC LIGHTBOX --- */}
{selectedIndex !== null && (
  <div
    className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
    onClick={() => setSelectedIndex(null)}
  >
    {/* --- TOP BAR --- */}
    <div className="w-full h-24 flex items-center justify-end px-8 md:px-16 shrink-0">
      <button
        onClick={() => setSelectedIndex(null)}
        className="text-[#d4af37] hover:text-white transition-colors z-[110] pointer-events-auto"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* --- MEDIA AREA --- */}
    <div className="flex-grow relative flex items-center justify-center p-6 pt-0">
      
      {/* --- BIG SIZE NAVIGATION ARROWS --- */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none">
        
        {/* BIG PREVIOUS BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex((prev) => (prev - 1 + category.media.length) % category.media.length);
          }}
          className="pointer-events-auto w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border border-[#d4af37]/30 bg-black/40 text-[#d4af37] hover:text-white hover:border-[#d4af37] hover:bg-black/60 transition-all duration-300"
        >
          <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* BIG NEXT BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex((prev) => (prev + 1) % category.media.length);
          }}
          className="pointer-events-auto w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border border-[#d4af37]/30 bg-black/40 text-[#d4af37] hover:text-white hover:border-[#d4af37] hover:bg-black/60 transition-all duration-300"
        >
          <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* --- THE MEDIA WRAPPER --- */}
      <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {category.media[selectedIndex].type === 'image' ? (
          <img
            src={category.media[selectedIndex].src}
            className="w-full max-h-[70vh] object-contain shadow-2xl animate-in zoom-in duration-500"
            alt="Selected"
          />
        ) : (
          <video 
            controls 
            autoPlay 
            className="w-full max-h-[70vh] object-contain shadow-2xl"
            key={category.media[selectedIndex].src}
          >
            <source src={category.media[selectedIndex].src} type="video/mp4" />
          </video>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-[#d4af37] tracking-[0.5em] uppercase text-[10px] font-light opacity-60">
            {selectedIndex + 1} / {category.media.length}
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