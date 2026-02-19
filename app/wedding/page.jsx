'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

export default function WeddingPage() {
  const router = useRouter()

  const featuredCollections = [
    {
      id: 1,
      title: 'Sourav × Stella',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
    },
    {
      id: 2,
      title: 'Arjun × Meera',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=900&q=80',
    },
  ]

  const recentWorks = [
    {
      id: 3,
      title: 'Rahul × Ananya',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=900&q=80',
    },
    {
      id: 4,
      title: 'Vikram × Riya',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=900&q=80',
    },
    {
      id: 5,
      title: 'Kabir × Isha',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
    },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* ===== HERO COLLAGE SECTION ===== */}
      <section className="relative h-[500px] overflow-hidden">

        {/* Collage Grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80" className="w-full h-full object-cover" />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-display mb-4">
            <span className="text-gold">Wedding</span> Photography
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg">
            Capturing timeless love stories with elegance and artistry
          </p>
        </div>
      </section>

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Collections</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {featuredCollections.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push('/wedding/gallery')}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-[2rem] border border-white/10">
                  <img
                    src={item.image}
                    className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
                <h3 className="text-center text-2xl mt-6 text-gold">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECENT WORKS ===== */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Our <span className="text-gold">Recent Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {recentWorks.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push('/wedding/gallery')}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={item.image}
                    className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
                <h3 className="text-center text-lg mt-4 text-gray-300">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
