'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PreWeddingPage() {

  const featured = [
    {
      id: 1,
      names: 'Sarah & Michael',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
    },
    {
      id: 2,
      names: 'Emma & James',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=900&q=80',
    },
  ]

  const recent = [
    {
      id: 3,
      names: 'Olivia & David',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=900&q=80',
    },
    {
      id: 4,
      names: 'Sophie & Alex',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=900&q=80',
    },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* ===== HERO COLLAGE ===== */}
      <section className="relative h-[500px] overflow-hidden">

        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80" className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-display mb-4">
            <span className="text-gold">Pre-Wedding</span> Moments
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg">
            Romantic storytelling through cinematic pre-wedding artistry
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Love Stories</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {featured.map((item) => (
              <Link key={item.id} href={`/pre-wedding/${item.id}`}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={item.image}
                      className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                  <h3 className="text-center text-2xl mt-6 text-gold">
                    {item.names}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Our <span className="text-gold">Recent Works</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {recent.map((item) => (
              <Link key={item.id} href={`/pre-wedding/${item.id}`}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={item.image}
                      className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                  <h3 className="text-center text-lg mt-4 text-gray-300">
                    {item.names}
                  </h3>
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
