'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRef } from 'react'

export default function FashionPage() {

  const gallery = [
    { id: 1, title: 'Urban Fashion', video: '/videos/prewedding.mp4' },
    { id: 2, title: 'Studio Portrait', video: '/videos/prewedding.mp4' },
    { id: 3, title: 'Fashion Editorial', video: '/videos/prewedding.mp4' },
  ]

  const brands = [
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          <span className="text-gold">Fashion</span> Photography
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          High-fashion editorial and luxury brand storytelling
        </p>
      </section>

      {/* VIDEO COLLECTIONS */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Collections</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gallery.map((item) => (
              <HoverVideoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND SLIDER */}
      <section className="py-24 bg-black border-t border-gold/20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display">
            Brands We've <span className="text-gold">Worked With</span>
          </h2>
        </div>

        <div className="relative overflow-hidden w-full">
          <div className="flex gap-20 animate-scroll w-max">
            {[...brands, ...brands].map((logo, i) => (
              <div key={i} className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="Brand Logo"
                  className="h-16 md:h-20 object-contain opacity-60 hover:opacity-100 transition duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ================= HOVER VIDEO CARD ================= */

function HoverVideoCard({ item }) {

  const videoRef = useRef(null)

  const handleEnter = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {}) // prevent AbortError
  }

  const handleLeave = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <Link href={`/fashion/${item.id}`}>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative h-80 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold transition-all duration-300 group"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={item.video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
          <h3 className="text-2xl font-display text-white group-hover:text-gold transition duration-300">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}
