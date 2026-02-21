'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, use, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-[800px] bg-white/5 animate-pulse rounded-lg flex items-center justify-center">
        Loading Album...
      </div>
    ),
  }
)

export default function AlbumDetailPage({ params }) {
  const unwrappedParams = use(params)
  const [selectedImage, setSelectedImage] = useState(null)
  const bookRef = useRef(null)

  const albumData = {
    1: {
      id: 1,
      couple: 'Sarah & Michael',
      year: '2024',
      pages: [
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
      ],
    },
  }

  const album = albumData[unwrappedParams.id] || albumData[1]

  /* =========================
     AUTO PAGE FLIP LOGIC
  ========================== */
  useEffect(() => {
    if (!bookRef.current) return

    let flipInterval
    let currentPage = 0
    const totalPages = album.pages.length + 2 // front + back cover

    const startAutoFlip = () => {
      flipInterval = setInterval(() => {
        if (currentPage < totalPages - 1) {
          bookRef.current.pageFlip().flipNext()
          currentPage++
        } else {
          clearInterval(flipInterval)
        }
      }, 2500)
    }

    const delayStart = setTimeout(() => {
      startAutoFlip()
    }, 1500)

    return () => {
      clearInterval(flipInterval)
      clearTimeout(delayStart)
    }
  }, [])
  /* ========================= */

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
          <source
            src="https://videos.pexels.com/video-files/6999927/6999927-sd_506_506_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-display mb-4">
            {album.couple}'s <span className="text-gold">Album</span>
          </h1>
          <p className="text-gray-300 font-lato text-lg">Year: {album.year}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/album-design"
            className="text-gold hover:text-yellow-300 font-lato text-sm uppercase tracking-widest mb-12 inline-block"
          >
            ← Back to Albums
          </Link>

          {/* Opening Book Animation */}
          <div className="flex flex-col items-center mb-20">
            <div className="shadow-2xl overflow-hidden rounded-lg">
              <HTMLFlipBook
                width={400}
                height={500}
                size="stretch"
                minWidth={300}
                maxWidth={800}
                minHeight={400}
                maxHeight={1200}
                showCover={true}
                flippingTime={800}
                className="wedding-book"
                ref={bookRef}
              >
                {/* FRONT COVER */}
                <div
                  className="page"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #aa841e 100%)',
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                    <h2 className="text-3xl font-display mb-4 border-b-2 border-white pb-2 uppercase tracking-tighter">
                      {album.couple}
                    </h2>
                    <p className="font-lato tracking-widest uppercase text-xs">
                      Premium Wedding Collection
                    </p>
                    <p className="mt-20 text-sm opacity-80 italic animate-pulse">
                      Click or drag corner to flip
                    </p>
                  </div>
                </div>

                {/* PHOTO PAGES */}
                {album.pages.map((url, index) => (
                  <div key={index} className="page bg-white border-l border-gray-200">
                    <div className="h-full p-4 flex flex-col">
                      <div className="flex-1 overflow-hidden rounded-sm shadow-inner">
                        <img
                          src={url}
                          alt={`Moment ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="py-4 text-center">
                        <span className="text-[#aa841e] font-display text-lg">
                          Page {index + 1}
                        </span>
                        <div className="w-8 h-px bg-[#d4af37]/30 mx-auto mt-1"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* BACK COVER */}
                <div className="page bg-[#2a2a2a]">
                  <div className="flex items-center justify-center h-full text-[#d4af37]">
                    <p className="font-display text-2xl tracking-widest uppercase">
                      Fin.
                    </p>
                  </div>
                </div>
              </HTMLFlipBook>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-6 mt-10">
              <button
                onClick={() => bookRef.current.pageFlip().flipPrev()}
                className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all font-lato text-xs tracking-widest"
              >
                PREVIOUS
              </button>
              <button
                onClick={() => bookRef.current.pageFlip().flipNext()}
                className="px-8 py-3 bg-gold text-black hover:bg-yellow-500 transition-all font-lato text-xs tracking-widest"
              >
                NEXT PAGE
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <h3 className="text-3xl font-display mb-4">
            Photo <span className="text-gold">Pages</span>
          </h3>
          <p className="text-gray-400 font-lato mb-12">
            Total Pages: {album.pages.length}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {album.pages.map((page, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden h-64 cursor-pointer border-4 border-gold/20 hover:border-gold transition-colors duration-500"
                onClick={() => setSelectedImage(page)}
              >
                <img
                  src={page}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center">
                  <p className="text-white font-display text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Page {idx + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 transition-all"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full view"
              className="w-full h-auto max-h-[85vh] object-contain shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-gold hover:text-white transition-colors uppercase text-xs tracking-widest"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
