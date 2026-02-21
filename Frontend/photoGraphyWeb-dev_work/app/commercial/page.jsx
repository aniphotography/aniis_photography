'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CommercialPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slideshow = [
    { id: 1, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', title: 'Brand Showcase' },
    { id: 2, image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80', title: 'Corporate Elegance' },
    { id: 3, image: 'https://images.unsplash.com/photo-1484807352052-23338103c627?w=1200&q=80', title: 'Product Excellence' },
    { id: 4, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', title: 'Brand Identity' },
    { id: 5, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=1200&q=80', title: 'Creative Vision' },
    { id: 6, image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=1200&q=80', title: 'Commercial Art' },
  ]

  const services = [
    {
      id: 1,
      title: 'Brand Shoots',
      description: 'Capture your brand identity with stunning product and lifestyle photography',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    },
    {
      id: 2,
      title: 'Corporate Events',
      description: 'Professional coverage of conferences, meetings, and corporate functions',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    },
    {
      id: 3,
      title: 'Product Photography',
      description: 'High-quality product shots that showcase your offerings perfectly',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshow.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshow.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshow.length) % slideshow.length)
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          <span className="text-gold">Commercial</span> Photography
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Professional brand and corporate photography for businesses
        </p>
      </section>

      {/* Auto-Scrolling Carousel Section */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display text-center mb-12">
            Our <span className="text-gold">Portfolio</span>
          </h2>
          
          {/* Main Slide */}
          <div className="relative h-96 md:h-[500px] overflow-hidden group mb-8">
            {slideshow.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  idx === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl md:text-4xl font-display text-gold">{slide.title}</h3>
                </div>
              </div>
            ))}

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gold transition-colors duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gold transition-colors duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {slideshow.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Continuous Scrolling Gallery */}
          <div className="relative overflow-hidden bg-black py-8">
            <div className="flex gap-6 animate-scroll">
              {[...slideshow, ...slideshow].map((slide, idx) => (
                <div
                  key={`${slide.id}-${idx}`}
                  className="flex-shrink-0 w-64 h-48 overflow-hidden group"
                >
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white font-display text-center text-sm">{slide.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>

      {/* Services Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group border border-white/10 hover:border-gold transition-colors duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-display text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 font-lato text-sm mb-6">{service.description}</p>

                  <Link
                    href="/contact"
                    className="inline-block text-gold hover:text-yellow-300 transition-colors duration-300 text-sm font-bold"
                  >
                    Learn More →
                  </Link>
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
