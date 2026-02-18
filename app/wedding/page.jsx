'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function WeddingPage() {
  const router = useRouter()

  const galleryImages = [
    { id: 1, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80', package: 'basic' },
    { id: 2, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80', package: 'silver' },
    { id: 3, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=500&q=80', package: 'gold' },
    { id: 4, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=500&q=80', package: 'basic' },
    { id: 5, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80', package: 'gold' },
    { id: 6, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80', package: 'silver' },
    { id: 7, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=500&q=80', package: 'gold' },
    { id: 8, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=500&q=80', package: 'silver' },
  ]


  const handleImageClick = (packageType) => {
    router.push(`/wedding/gallery`)
  }

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

      {/* Package Information Section */}
      {/* <section className="px-6 py-16 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display text-center mb-12">
            Our <span className="text-gold">Wedding Packages</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            {/* Basic Package */}
            {/* <div className="text-center p-6">
              <h3 className="text-2xl font-display mb-2">Basic Package</h3>
              <p className="text-2xl text-gold font-bold mb-2">$1,500</p>
              <p className="text-gray-400 text-sm mb-4">6 Hours • Ceremony & Reception</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Candid & Posed Shots</li>
                <li>First Dance & Key Moments</li>
                <li>Digital Gallery</li>
                <li>Limited Prints</li>
              </ul>
            </div> */}

            {/* Silver Package */}
            {/* <div className="text-center p-6 border border-gray-400">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Silver Edge</div>
              <h3 className="text-2xl font-display mb-2">Silver Package</h3>
              <p className="text-2xl text-gold font-bold mb-2">$1,500</p>
              <p className="text-gray-400 text-sm mb-4">6 Hours • Ceremony & Reception</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Candid & Posed Shots</li>
                <li>First Dance & Key Moments</li>
                <li>Digital Gallery</li>
                <li>Limited Prints</li>
              </ul>
            </div> */}

            {/* Gold Package */}
            {/* <div className="text-center p-6 border-2 border-gold">
              <div className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Premium Choice</div>
              <h3 className="text-2xl font-display mb-2">Gold Package</h3>
              <p className="text-2xl text-gold font-bold mb-2">$2,500</p>
              <p className="text-gray-400 text-sm mb-4">8 Hours • Full Day Coverage</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Full Day Coverage</li>
                <li>Cinematic Video</li>
                <li>Premium Album</li>
                <li>Unlimited Prints</li>
                <li>Engagement Session</li>
              </ul>
            </div>*/}
          {/* </div>
        </div> 
      </section> */}
      {/* Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Collections</span>
          </h2>
        
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {galleryImages.map((item) => (
        <div
          key={item.id}
          className="group cursor-pointer flex flex-col items-center"
          onClick={handleImageClick}
        >
          {/* Image Container with specific rounding to match the photo */}
          {/* Silver Lining Border Container */}
          <div className="relative p-[1.5px] rounded-[2.5rem] bg-gradient-to-tr from-gray-500 via-gray-200 to-gray-500 mb-6 transition-transform duration-500 group-hover:scale-[1.02]">
            
            {/* Inner Image Container */}
            <div className="relative overflow-hidden rounded-[2.4rem] aspect-[1.4/1] bg-[#1a1a1a]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle inner shadow for depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            {/* Golden Title */}
            <h3 className="text-2xl font-medium text-[#D4AF37] tracking-wide mb-2">
              {item.title || "Sourav × Stella"}
            </h3>
            
            {/* Metadata labels */}
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase">
              <span>{item.location || "Darjeeling"}</span>
              <span className="text-gray-700">/</span>
              <span>{item.category || "Destination Prewedding"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      

      <Footer />
    </main>
  )
}