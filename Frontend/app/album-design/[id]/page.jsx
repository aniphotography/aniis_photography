'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

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

export default function AlbumDetailPage() {

  const { id } = useParams()

  const [album, setAlbum] = useState(null)
  const [pages, setPages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [flipbookKey, setFlipbookKey] = useState(0)

  const bookRef = useRef(null)
  const abortControllerRef = useRef(null)

  /* ================= FETCH COLLECTION ================= */

  useEffect(() => {
    abortControllerRef.current = new AbortController()

    const fetchCollection = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/collections/${id}`, {
          signal: abortControllerRef.current.signal
        })
        if (res.ok) {
          const data = await res.json()
          setAlbum(data.collection)

          const imgs = data.images.map(img =>
            `http://localhost:5000${img.image_url}`
          )

          setPages(imgs)
          setFlipbookKey(prev => prev + 1)
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching collection:', error)
        }
      }
    }

    fetchCollection()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }

  }, [id])


  /* ================= AUTO PAGE FLIP ================= */

  useEffect(() => {

    if (!bookRef.current || pages.length === 0) return

    let flipInterval
    let currentPage = 0
    let isMounted = true

    const totalPages = pages.length + 2

    flipInterval = setInterval(() => {

      if (!isMounted || !bookRef.current) {
        clearInterval(flipInterval)
        return
      }

      try {
        const pageFlip = bookRef.current?.pageFlip?.()
        if (!pageFlip) return

        if (currentPage < totalPages - 1) {
          pageFlip.flipNext()
          currentPage++
        } else {
          clearInterval(flipInterval)
        }
      } catch (err) {
        // Silently catch errors during unmount
        clearInterval(flipInterval)
      }

    }, 2500)

    return () => {
      isMounted = false
      clearInterval(flipInterval)
      bookRef.current = null
    }

  }, [pages])


  if (!album) return null


  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">

      <Navbar />

      {/* HERO */}

      <section className="relative h-96 md:h-[500px] overflow-hidden">

        {album.video_url && (
          <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
            <source
              src={`http://localhost:5000${album.video_url}`}
              type="video/mp4"
            />
          </video>
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">

          <h1 className="text-5xl md:text-6xl font-display mb-4">
            {album.title}
            <span className="text-gold"> Album</span>
          </h1>

          <p className="text-gray-300 text-lg">
            Year: {album.date}
          </p>

        </div>

      </section>


      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <Link
            href="/album-design"
            className="text-gold mb-12 inline-block"
          >
            ← Back to Albums
          </Link>


          {/* FLIPBOOK */}

          <div className="flex flex-col items-center mb-20">

            <HTMLFlipBook
              key={flipbookKey}
              width={400}
              height={500}
              showCover={true}
              flippingTime={800}
              ref={bookRef}
            >

              {/* FRONT COVER */}

              <div className="page bg-gold flex items-center justify-center text-black text-3xl font-display">
                {album.title}
              </div>


              {/* PHOTO PAGES */}

              {pages.map((url, index) => (

                <div key={index} className="page bg-white">

                  <img
                    src={url}
                    className="w-full h-full object-cover"
                  />

                </div>

              ))}


              {/* BACK COVER */}

              <div className="page bg-black flex items-center justify-center text-gold text-xl">
                Fin.
              </div>

            </HTMLFlipBook>


            {/* NAV BUTTONS */}

            <div className="flex gap-6 mt-10">

              <button
                onClick={() => {
                  try {
                    bookRef.current?.pageFlip?.()?.flipPrev()
                  } catch (err) {
                    console.warn('Error flipping page:', err)
                  }
                }}
                className="px-8 py-3 border border-gold text-gold"
              >
                PREVIOUS
              </button>

              <button
                onClick={() => {
                  try {
                    bookRef.current?.pageFlip?.()?.flipNext()
                  } catch (err) {
                    console.warn('Error flipping page:', err)
                  }
                }}
                className="px-8 py-3 bg-gold text-black"
              >
                NEXT PAGE
              </button>

            </div>

          </div>


          {/* GRID */}

          <h3 className="text-3xl font-display mb-4">
            Photo <span className="text-gold">Pages</span>
          </h3>

          <p className="text-gray-400 mb-12">
            Total Pages: {pages.length}
          </p>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {pages.map((page, idx) => (

              <div
                key={idx}
                className="group relative overflow-hidden h-64 cursor-pointer"
                onClick={() => setSelectedImage(page)}
              >

                <img
                  src={page}
                  className="w-full h-full object-cover"
                />

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* LIGHTBOX */}

      {selectedImage && (

        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >

          <img
            src={selectedImage}
            className="max-h-[85vh]"
          />

        </div>

      )}

      <Footer />

    </main>
  )
}