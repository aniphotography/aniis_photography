'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod) => mod.default),
  { ssr: false }
)

export default function AlbumDesignPage() {

  const bookRef = useRef(null)
  const [showForm, setShowForm] = useState(false)

  const previewPages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800',
    'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800',
  ]

  /* ===================== AUTO FLIP LOGIC ===================== */

  useEffect(() => {
    let interval
    let currentPage = 0

    const waitForFlipBook = () => {
      if (!bookRef.current || !bookRef.current.pageFlip()) {
        setTimeout(waitForFlipBook, 300)
        return
      }

      const pageFlip = bookRef.current.pageFlip()

      interval = setInterval(() => {
        const totalPages = pageFlip.getPageCount()

        if (currentPage < totalPages - 1) {
          pageFlip.flipNext()
          currentPage++
        } else {
          pageFlip.flip(0)
          currentPage = 0
        }
      }, 3000)
    }

    waitForFlipBook()

    return () => clearInterval(interval)
  }, [])

  /* ============================================================ */

  const albums = [
    { id: 1, couple: 'Sarah & Michael', year: '2024', coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80' },
    { id: 2, couple: 'Emma & James', year: '2024', coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80' },
    { id: 3, couple: 'Olivia & David', year: '2024', coverImage: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=500&q=80' },
    { id: 4, couple: 'Sophie & Alex', year: '2024', coverImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=500&q=80' },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          Album <span className="text-gold">Design</span>
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Luxury album design and production for your most treasured memories
        </p>
      </section>

      {/* AUTO FLIP SHOWCASE */}
      <section className="py-24 flex justify-center">
        <div className="shadow-2xl">
          <HTMLFlipBook
            width={500}
            height={600}
            showCover={true}
            flippingTime={800}
            ref={bookRef}
          >
            {/* Cover */}
            <div className="page bg-gold flex items-center justify-center text-black font-display text-3xl">
              Premium Collection
            </div>

            {/* Preview Pages */}
            {previewPages.map((img, i) => (
              <div key={i} className="page bg-white">
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}

            {/* Back Cover */}
            <div className="page bg-black flex items-center justify-center text-gold text-xl">
              Explore More
            </div>
          </HTMLFlipBook>
        </div>
      </section>

      {/* Featured Albums */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Albums</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {albums.map((album) => (
              <Link key={album.id} href={`/album-design/${album.id}`}>
                <div className="group cursor-pointer flex justify-center">
                  <div className="w-full max-w-lg h-96 flex items-center justify-center">
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <div className="relative w-full h-full bg-gradient-to-br from-gold to-yellow-600 rounded-lg shadow-2xl p-10 flex items-center justify-center text-center border-4 border-gold overflow-hidden">
                        <img
                          src={album.coverImage}
                          className="absolute inset-0 w-full h-full object-cover opacity-40"
                        />
                        <div className="relative z-10">
                          <p className="text-black font-display text-3xl mb-2">
                            {album.couple}
                          </p>
                          <p className="text-black/70 text-sm uppercase">
                            Album {album.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Make Your Own Album */}
      <section className="py-20 text-center">
        <button
          onClick={() => setShowForm(true)}
          className="px-14 py-4 bg-gold text-black font-bold hover:bg-yellow-400 transition-all text-lg"
        >
          Make Your Own Album
        </button>
      </section>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#222] p-10 rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-display mb-6 text-gold">
              Create Custom Album
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-black border border-white/20"
              />
              <input
                type="number"
                placeholder="Number of Pages"
                className="w-full p-3 bg-black border border-white/20"
              />
              <select className="w-full p-3 bg-black border border-white/20">
                <option>Classic Design</option>
                <option>Luxury Design</option>
                <option>Premium Collection</option>
              </select>

              <button className="w-full py-3 bg-gold text-black font-bold">
                Submit Request
              </button>
            </form>

            <button
              onClick={() => setShowForm(false)}
              className="mt-6 text-gray-400 hover:text-white text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
