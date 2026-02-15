'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80")',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl md:text-7xl font-display mb-4 fade-in">
          <span className="text-gold">Capturing</span>
          <br />
          <span className="text-white">Timeless Moments</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12 font-lato font-light max-w-2xl mx-auto">
          Elegant photography that tells your story with artistry and sophistication
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/contact"
            className="px-8 py-3 bg-gold text-black font-bold text-sm hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            Book a Session
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          <Link
            href="/albums"
            className="px-8 py-3 border-2 border-gold text-gold font-bold text-sm hover:bg-gold hover:text-black transition-all duration-300"
          >
            View Portfolio
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="w-8 h-12 border-2 border-gold rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a]" />
    </section>
  )
}
