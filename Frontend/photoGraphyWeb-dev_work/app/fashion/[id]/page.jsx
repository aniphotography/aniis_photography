'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { use } from 'react'

export default function FashionDetailPage({ params }) {

  const { id } = use(params)

  const fashionData = {
    1: {
      title: 'Urban Fashion',
      videos: ['/videos/prewedding.mp4'],
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        'https://images.unsplash.com/photo-1495568720989-cebdbdd97913?w=800',
      ]
    },
    2: {
      title: 'Studio Portrait',
      videos: ['/videos/prewedding.mp4'],
      images: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
        'https://images.unsplash.com/photo-1434637866556-6b63c891057d?w=800',
      ]
    },
    3: {
      title: 'Fashion Editorial',
      videos: ['/videos/prewedding.mp4'],
      images: [
        'https://images.unsplash.com/photo-1539571696357-5a69c006ad1c?w=800',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      ]
    },
  }

  const content = fashionData[id]

  if (!content) return <div className="text-white">Not Found</div>

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 text-center">
        <h1 className="text-6xl font-display">
          <span className="text-gold">{content.title}</span>
        </h1>
      </section>

      {/* Videos */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {content.videos.map((video, i) => (
            <video
              key={i}
              controls
              className="w-full rounded-lg border border-gold"
            >
              <source src={video} type="video/mp4" />
            </video>
          ))}
        </div>
      </section>

      {/* Images */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-80 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
