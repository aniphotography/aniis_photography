'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PreWeddingPage() {

  const featuredCouples = [
    {
      id: 1,
      names: 'Sarah & Michael',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
    },
    {
      id: 2,
      names: 'Emma & James',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80',
    },
  ]

  const recentCouples = [
    {
      id: 3,
      names: 'Olivia & David',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=500&q=80',
    },
    {
      id: 4,
      names: 'Sophie & Alex',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=500&q=80',
    },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Video Background Header */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/6999927/6999927-sd_506_506_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-display mb-4">
            <span className="text-gold">Pre-Wedding</span> Moments
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg">
            Celebrate your love story with stunning pre-wedding cinematography and photography
          </p>
        </div>
      </section>

      {/* ================= FEATURED LOVE STORIES ================= */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Love Stories</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {featuredCouples.map((couple) => (
              <Link key={couple.id} href={`/pre-wedding/${couple.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden h-72 md:h-80 mb-4 border-4 border-gold">
                    <img
                      src={couple.image}
                      alt={couple.names}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-white font-display text-3xl mb-2">
                          {couple.names}
                        </p>
                        <p className="text-gold text-sm uppercase tracking-widest">
                          View Their Story
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR RECENT WORKS ================= */}
      <section className="py-20 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Our <span className="text-gold">Recent Works</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recentCouples.map((couple) => (
              <Link key={couple.id} href={`/pre-wedding/${couple.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden h-64 md:h-72 mb-4 border border-white/10">
                    <img
                      src={couple.image}
                      alt={couple.names}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-white font-display text-2xl mb-2">
                          {couple.names}
                        </p>
                        <p className="text-gold text-xs uppercase tracking-widest">
                          View Story
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
