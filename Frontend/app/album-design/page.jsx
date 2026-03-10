'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod) => mod.default),
  { ssr: false }
)

export default function AlbumDesignPage() {

  const router = useRouter()

  const bookRef = useRef(null)

  const [showForm, setShowForm] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [previewPages, setPreviewPages] = useState([])
  const [albums, setAlbums] = useState([])

  /* ================= MOUNT FIX ================= */

  useEffect(() => {
    setMounted(true)
  }, [])

  /* ================= FETCH DATA ================= */

  useEffect(() => {

    fetch('http://localhost:5000/api/media?type=album-preview')
      .then(res => res.json())
      .then(data => setPreviewPages(data))
      .catch(() => setPreviewPages([]))

    fetch('http://localhost:5000/api/collections?category=album-design')
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(() => setAlbums([]))

  }, [])

  /* ================= AUTO FLIP ================= */

  useEffect(() => {

    if (!mounted) return

    let interval
    let currentPage = 0

    const waitForFlipBook = () => {

      if (!bookRef.current || !bookRef.current.pageFlip()) {
        setTimeout(waitForFlipBook, 300)
        return
      }

      const pageFlip = bookRef.current?.pageFlip()

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

  }, [mounted])

  /* ================= ADMIN INSERT ================= */

  const handleInsertPreview = () => {

    const token = localStorage.getItem('adminToken')

    if (!token) router.push('/admin/login')
    else router.push('/admin/dashboard?section=album-preview')

  }

  const handleInsertAlbum = () => {

    const token = localStorage.getItem('adminToken')

    if (!token) router.push('/admin/login')
    else router.push('/admin/dashboard?category=album-design')

  }

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


      {/* ================= FLIPBOOK ================= */}

      <section className="py-24 flex justify-center">

        <div className="shadow-2xl">

          {mounted && (

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


              {/* Dynamic Preview Pages */}

              {previewPages.length > 0 ? (

                previewPages.map((img, i) => (

                  <div key={i} className="page bg-white">
                    <img
                      src={`http://localhost:5000${img.image_url}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                ))

              ) : (

                <div
                  onClick={handleInsertPreview}
                  className="page bg-black flex items-center justify-center text-gold text-5xl cursor-pointer"
                >
                  +
                </div>

              )}


              {/* Back Cover */}

              <div className="page bg-black flex items-center justify-center text-gold text-xl">
                Explore More
              </div>

            </HTMLFlipBook>

          )}

        </div>

      </section>


      {/* ================= FEATURED ALBUMS ================= */}

      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Albums</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

            {albums.length > 0 ? (

              albums.map((album) => (

                <Link key={album.id} href={`/album-design/${album.id}`}>

                  <div className="group cursor-pointer flex justify-center">

                    <div className="w-full max-w-lg h-96 flex items-center justify-center">

                      <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">

                        <div className="relative w-full h-full bg-gradient-to-br from-gold to-yellow-600 rounded-lg shadow-2xl p-10 flex items-center justify-center text-center border-4 border-gold overflow-hidden">

                          <img
                            src={`http://localhost:5000${album.cover_image}`}
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                          />

                          <div className="relative z-10">

                            <p className="text-black font-display text-3xl mb-2">
                              {album.title}
                            </p>

                            <p className="text-black/70 text-sm uppercase">
                              Album {album.date}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </Link>

              ))

            ) : (

              <div
                onClick={handleInsertAlbum}
                className="flex items-center justify-center h-96 border-2 border-dashed border-gold rounded-lg cursor-pointer"
              >
                <span className="text-5xl text-gold">+</span>
              </div>

            )}

          </div>

        </div>

      </section>


      {/* ================= MAKE YOUR OWN ALBUM ================= */}

      <section className="py-20 text-center">

        <button
          onClick={() => setShowForm(true)}
          className="px-14 py-4 bg-gold text-black font-bold hover:bg-yellow-400 transition-all text-lg"
        >
          Make Your Own Album
        </button>

      </section>


      {/* ================= MODAL ================= */}

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