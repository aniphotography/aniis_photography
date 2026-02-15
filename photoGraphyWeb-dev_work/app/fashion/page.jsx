'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRef } from 'react'

export default function FashionPage() {

  const gallery = [
    {
      id: 1,
      title: 'Urban Fashion',
      video: '/videos/prewedding.mp4', // use your local video
    },
    {
      id: 2,
      title: 'Studio Portrait',
      video: '/videos/prewedding.mp4',
    },
    {
      id: 3,
      title: 'Fashion Editorial',
      video: '/videos/prewedding.mp4',
    },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          <span className="text-gold">Fashion</span> Photography
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          High-fashion editorial and luxury brand photography
        </p>
      </section>

      {/* VIDEO BOX SECTION */}
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

      <Footer />
    </main>
  )
}

/* ================= Hover Video Component ================= */

function HoverVideoCard({ item }) {

  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    videoRef.current.play()
  }

  const handleMouseLeave = () => {
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <Link href={`/fashion/${item.id}`}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-80 cursor-pointer overflow-hidden rounded-lg border border-white/20 hover:border-gold transition-all duration-300 group"
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
          <h3 className="text-white font-display text-2xl opacity-80 group-hover:opacity-100">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}
