'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

export default function WeddingPage() {
  const router = useRouter()

  // 🔥 FEATURED (only 3 premium)
  const featuredCollections = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
      title: 'Sourav × Stella',
      location: 'Darjeeling',
      category: 'Destination Wedding',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80',
      title: 'Aman × Riya',
      location: 'Udaipur',
      category: 'Royal Wedding',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=500&q=80',
      title: 'Rahul × Neha',
      location: 'Goa',
      category: 'Beach Wedding',
    },
  ]

  // 🔽 Remaining Works
  const allWorks = [
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=500&q=80',
      title: 'Karan × Simran',
      location: 'Jaipur',
      category: 'Traditional Wedding',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
      title: 'Arjun × Meera',
      location: 'Delhi',
      category: 'Luxury Wedding',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80',
      title: 'Vikram × Alia',
      location: 'Mumbai',
      category: 'Modern Wedding',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=500&q=80',
      title: 'Rohan × Isha',
      location: 'Kolkata',
      category: 'Classic Wedding',
    },
  ]

  const handleClick = () => {
    router.push('/wedding/gallery')
  }

  const CollectionCard = ({ item }) => (
    <div
      onClick={handleClick}
      className="group cursor-pointer flex flex-col items-center"
    >
      <div className="relative p-[1.5px] rounded-[2.5rem] bg-gradient-to-tr from-gray-500 via-gray-200 to-gray-500 mb-6 transition-transform duration-500 group-hover:scale-[1.02]">
        <div className="relative overflow-hidden rounded-[2.4rem] aspect-[1.4/1] bg-[#1a1a1a]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-medium text-[#D4AF37] tracking-wide mb-2">
          {item.title}
        </h3>

        <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase">
          <span>{item.location}</span>
          <span className="text-gray-700">/</span>
          <span>{item.category}</span>
        </div>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* VIDEO HEADER */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-display mb-4">
            <span className="text-gold">Wedding</span> Photography
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg">
            Capturing the essence of your special day with timeless elegance and artistic vision
          </p>
        </div>
      </section>

      {/* 🔥 FEATURED COLLECTIONS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-16">
            Featured <span className="text-gold">Collections</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {featuredCollections.map((item) => (
              <CollectionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 🔽 ALL WORKS SECTION */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-16">
            Our <span className="text-gold">Recent Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {allWorks.map((item) => (
              <CollectionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
