'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function VideoProductionPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slideshow = [
    { id: 1, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', title: 'Brand Videos' },
    { id: 2, image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80', title: 'Corporate Productions' },
    { id: 3, image: 'https://images.unsplash.com/photo-1484807352052-23338103c627?w=1200&q=80', title: 'Cinematic Content' },
    { id: 4, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', title: 'Event Coverage' },
    { id: 5, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=1200&q=80', title: 'Creative Productions' },
    { id: 6, image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=1200&q=80', title: '4K Films' },
  ]

  const services = [
    {
      id: 1,
      title: 'Brand Videos',
      description: 'Captivate your audience with high-quality brand storytelling videos',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    },
    {
      id: 2,
      title: 'Corporate Films',
      description: 'Professional video coverage of conferences, seminars, and corporate events',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    },
    {
      id: 3,
      title: 'Cinematic Production',
      description: 'High-end cinematic production with 4K quality and professional editing',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    },
  ]

  const packages = [
    {
      id: 1,
      name: 'Basic Package',
      price: '$2,000',
      features: [
        'Up to 2 Hours Footage',
        'Single Videographer',
        'Standard Editing',
        'Digital Delivery',
      ],
    },
    {
      id: 2,
      name: 'Professional Package',
      price: '$5,000',
      features: [
        'Full Day Coverage',
        'Multiple Cameras',
        'Professional Editing',
        '4K Quality',
        'Color Grading',
      ],
      featured: true,
    },
    {
      id: 3,
      name: 'Premium Package',
      price: '$10,000',
      features: [
        'Complete Production',
        'Aerial Footage',
        'Cinema Editing',
        '4K/8K Quality',
        'Sound Design',
        'Motion Graphics',
      ],
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
          <span className="text-gold">Video</span> Production
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Professional video production services that bring your vision to life
        </p>
      </section>

      {/* Auto-Scrolling Carousel Section */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display text-center mb-12">
            Our <span className="text-gold">Work</span>
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

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold hover:text-yellow-300 transition-colors duration-300 z-10 bg-black/30 p-3 rounded-full"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gold hover:text-yellow-300 transition-colors duration-300 z-10 bg-black/30 p-3 rounded-full"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Our <span className="text-gold">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden h-64 md:h-80 cursor-pointer"
              >
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-display text-gold mb-2">{service.title}</h3>
                  <p className="text-gray-200 text-sm font-lato opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ================= OUR RECENT WORKS ================= */}
<section className="py-24 px-6 bg-black/40">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-display text-center mb-16">
      Our <span className="text-gold">Recent Works</span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {slideshow.slice(0, 6).map((work) => (
        <div
          key={`recent-${work.id}`}
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden h-72 rounded-xl border border-white/10">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-display text-gold">
                {work.title}
              </h3>
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
