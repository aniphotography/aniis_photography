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

  const [previewPages, setPreviewPages] = useState([])
  const [albums, setAlbums] = useState([])
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const abortControllerRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])


  /* ================= FETCH PREVIEW IMAGES ================= */

  useEffect(() => {
    abortControllerRef.current = new AbortController()

    const fetchData = async () => {
      try {
        const previewRes = await fetch('http://localhost:5000/api/media?type=album-preview', {
          signal: abortControllerRef.current.signal
        })
        if (previewRes.ok) {
          const previewData = await previewRes.json()
          setPreviewPages(previewData)
        }
        setPreviewLoaded(true)

        const albumRes = await fetch('http://localhost:5000/api/collections', {
          signal: abortControllerRef.current.signal
        })
        if (albumRes.ok) {
          const albumData = await albumRes.json()
          const albumDesignItems = albumData.filter(item => {
            const category = String(item.category || '').toLowerCase().replace(/\s+/g, '-')
            return category === 'album-design' || category === 'albumdesign' || category.includes('album')
          })
          setAlbums(albumDesignItems)
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchData()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }

  }, [])


  /* ================= ADMIN ACTION ================= */

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

      {/* HEADER */}

      <section className="pt-32 pb-16 text-center">

        <h1 className="text-6xl font-display">
          Album <span className="text-gold">Design</span>
        </h1>

        <p className="text-gray-400 mt-4">
          Luxury album design and production
        </p>

      </section>


      {/* ================= FLIPBOOK ================= */}

      <section className="py-24 flex justify-center">

        {mounted && previewLoaded && (

          <HTMLFlipBook
            width={500}
            height={600}
            showCover={true}
            flippingTime={800}
            ref={bookRef}
          >

            {/* COVER */}

            <div className="page bg-gold flex items-center justify-center text-black text-3xl">
              Premium Collection
            </div>


            {/* PAGES */}

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


            {/* BACK */}

            <div className="page bg-black flex items-center justify-center text-gold">
              Explore More
            </div>

          </HTMLFlipBook>

        )}

      </section>


      {/* ================= FEATURED ALBUMS ================= */}

      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Albums</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            {albums.length > 0 ? (

              albums.map((album) => (

                <Link key={album.id} href={`/album-design/${album.id}`}>

                  <div className="group cursor-pointer">

                    <div className="relative h-96 rounded-lg overflow-hidden bg-[#111]">

                      {album.cover_image ? (
                        <img
                          src={`http://localhost:5000${album.cover_image}`}
                          className="absolute inset-0 w-full h-full object-cover opacity-40"
                          alt={album.title}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-black/40" />
                      )}

                      <div className="relative z-10 flex items-center justify-center h-full">

                        <div className="text-center">

                          <p className="text-black text-3xl font-display">
                            {album.title}
                          </p>

                          <p className="text-black/70 text-sm">
                            Album {album.date}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </Link>

              ))

            ) : (

              <div
                onClick={handleInsertAlbum}
                className="flex items-center justify-center h-96 border-2 border-dashed border-gold"
              >
                <span className="text-5xl text-gold">+</span>
              </div>

            )}

          </div>

        </div>

      </section>


      <Footer />

    </main>
  )
}