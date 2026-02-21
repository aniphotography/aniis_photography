'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PreWeddingGalleryPage() {
  const searchParams = useSearchParams()
  const [selectedPackage, setSelectedPackage] = useState('basic')
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const pkg = searchParams.get('package')
    if (pkg && ['basic', 'silver', 'gold'].includes(pkg)) {
      setSelectedPackage(pkg)
    }
  }, [searchParams])

  const galleryImages = {
    basic: [
      { id: 1, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', title: 'Intimate Moment' },
      { id: 2, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Close Connection' },
      { id: 3, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', title: 'Tender Touch' },
      { id: 4, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', title: 'Quiet Moment' },
    ],
    silver: [
      { id: 5, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', title: 'Romantic Sunset' },
      { id: 6, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Golden Love' },
      { id: 7, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', title: 'Dance Together' },
      { id: 8, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', title: 'Romantic Pose' },
      { id: 9, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', title: 'Nature Romance' },
      { id: 10, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', title: 'Evening Glow' },
    ],
    gold: [
      { id: 11, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', title: 'Premium Cinematic' },
      { id: 12, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', title: 'Luxury Album' },
      { id: 13, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Bridal Elegance' },
      { id: 14, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', title: 'Groom Portrait' },
      { id: 15, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', title: 'Couple Story' },
      { id: 16, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', title: 'Destination Photo' },
      { id: 17, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', title: 'Cinematic Edit' },
      { id: 18, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Premium Collection' },
    ],
  }

  const packageInfo = {
    basic: {
      name: 'Intimate Package',
      price: '$499',
      duration: '2 Hours',
      coverage: 'Single Location',
      features: [
        '100+ Digital Photos',
        'Candid & Posed Shots',
        'Digital Gallery',
      ],
    },
    silver: {
      name: 'Romance Package',
      price: '$899',
      duration: '4 Hours',
      coverage: 'Multiple Locations',
      features: [
        '300+ Digital Photos',
        'Cinematic Film',
        'Premium Digital Gallery',
        'Print Release',
      ],
    },
    gold: {
      name: 'Ultimate Package',
      price: '$1,299',
      duration: '6 Hours',
      coverage: 'Unlimited Locations',
      features: [
        '500+ Digital Photos',
        '4K Video',
        'Luxury Album',
        'Canvas Print Included',
      ],
    },
  }

  const currentPackageInfo = packageInfo[selectedPackage]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Package Details Header */}
      <section className="pt-32 px-6 bg-gradient-to-b from-black/50 to-black">
        <div className="max-w-7xl mx-auto pb-12">
          <div className="border-l-4 border-gold pl-6 mb-8">
            <h1 className="text-5xl md:text-6xl font-display mb-2 capitalize">
              {currentPackageInfo.name}
            </h1>
            <p className="text-gold text-2xl font-bold mb-4">{currentPackageInfo.price}</p>
            <p className="text-gray-300 text-lg mb-6">
              {currentPackageInfo.duration} • {currentPackageInfo.coverage}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentPackageInfo.features.map((feature, idx) => (
                <div key={idx} className="text-sm text-gray-300">
                  <span className="text-gold font-bold">✓</span> {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Package Filter Buttons */}
      <section className="px-6 py-8 bg-black/70">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedPackage('basic')}
              className={`px-6 py-2 font-lato font-bold transition-all duration-300 ${
                selectedPackage === 'basic'
                  ? 'bg-gold text-black'
                  : 'border-2 border-gold text-gold hover:bg-gold hover:text-black'
              }`}
            >
              Intimate Package
            </button>
            <button
              onClick={() => setSelectedPackage('silver')}
              className={`px-6 py-2 font-lato font-bold transition-all duration-300 ${
                selectedPackage === 'silver'
                  ? 'border-4 border-gray-400 text-white'
                  : 'border-2 border-gold text-gold hover:bg-gold hover:text-black'
              }`}
            >
              Romance Package
            </button>
            <button
              onClick={() => setSelectedPackage('gold')}
              className={`px-6 py-2 font-lato font-bold transition-all duration-300 ${
                selectedPackage === 'gold'
                  ? 'border-4 border-gold text-white'
                  : 'border-2 border-gold text-gold hover:bg-gold hover:text-black'
              }`}
            >
              Ultimate Package
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages[selectedPackage].map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden h-72 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white font-display text-lg text-center">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image || "/placeholder.svg"}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gold hover:text-yellow-300 transition-colors duration-300"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-white text-center mt-4 font-display text-xl">{selectedImage.title}</p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
