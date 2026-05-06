'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
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

// Add this state near your other useState declarations
const [bookSize, setBookSize] = useState({
  width: 900,
  height: 600,
})

useEffect(() => {
  const updateBookSize = () => {

    if (window.innerWidth < 768) {

      // Mobile
      const mobileWidth = window.innerWidth * 0.82

      setBookSize({
        width: mobileWidth,
        height: mobileWidth * 0.66, // keeps same desktop ratio
      })

    } else {

      // Desktop
      setBookSize({
        width: 900,
        height: 600,
      })

    }
  }

  updateBookSize()

  window.addEventListener('resize', updateBookSize)

  return () =>
    window.removeEventListener('resize', updateBookSize)

}, [])
  /* ================= FETCH PREVIEW IMAGES ================= */

  useEffect(() => {
    abortControllerRef.current = new AbortController()

    const fetchData = async () => {
      try {
        const previewRes = await fetch(`${API}/api/media?tag=album-preview`, {
          signal: abortControllerRef.current.signal
        })
        if (previewRes.ok) {
          const previewData = await previewRes.json()
          setPreviewPages(previewData)
        }
        setPreviewLoaded(true)

        const albumRes = await fetch(`${API}/api/collections`, {
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
      <section className="py-24 flex flex-col items-center">
  {/* Fullscreen button */}
  <div className="w-full max-w-7xl flex justify-end px-6 mb-4">
    <button
      onClick={() => {
        const el = document.querySelector('.flipbook-container')
        if (!document.fullscreenElement) el?.requestFullscreen()
        else document.exitFullscreen()
      }}
      className="px-4 py-2 border border-gold/50 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
    >
      ⛶ Fullscreen
    </button>
  </div>

  <div className="flipbook-container w-full flex justify-center overflow-hidden px-2">
  {mounted && previewLoaded && (
    <HTMLFlipBook
      /* 3:1 Page Ratio (Width 1200 / Height 400 = 3) */
      width={bookSize.width}
      height={bookSize.height}
      size="stretch" // Allows the book to scale properly
      usePortrait={false}
      mobileScrollSupport={false}
      drawShadow={false}
      maxShadowOpacity={0}
      minWidth={150}
      maxWidth={1500}
      minHeight={100}
      maxHeight={500}
      showCover={true}
      flippingTime={800}
      ref={bookRef}
      className="shadow-2xl"
    >
      {/* FRONT COVER - First Image with Overlay */}
      <div className="page relative bg-black overflow-hidden">
        {previewPages.length > 0 && (
          <img
            src={getMediaUrl(previewPages[0].image_url)}
            className="w-full h-full object coantain bg-black opacity-100"
          />
        )}
       
      </div>

      {/* INNER PAGES (Middle of the deck) */}
      {previewPages.slice(1, -1).map((img, i) => (
        <div key={i} className="page bg-white overflow-hidden">
          <img
            src={getMediaUrl(img.image_url)}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* BACK COVER - Last Image with Overlay */}
      <div className="page relative bg-black overflow-hidden">
        {previewPages.length > 1 && (
          <img
            src={getMediaUrl(previewPages[previewPages.length - 1].image_url)}
            className="w-full h-full object-coantain bg-black opacity-100"
          />
        )}
       
      </div>
    </HTMLFlipBook>
  )}
  </div>
</section>

<h6 className="text-3xl md:text-5xl font-display text-center py-20">
  We don't just design <span className="text-gold italic">albums</span>, 
  We Create <span className="text-gold italic">Stories</span>
</h6>
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
<div className="relative h-96 rounded-lg overflow-hidden">
  {album.cover_image ? (
    <>
      <img
        src={getMediaUrl(album.cover_image)}
        className="absolute inset-0 w-full h-full object-cover" // Full opacity
        alt={album.title}
      />
      {/* This adds a dark tint only at the bottom/center to help text pop */}
      <div className="absolute inset-0 bg-black/30" /> 
    </>
  ) : (
    <div className="absolute inset-0 bg-[#111]" />
  )}

  <div className="relative z-10 flex items-center justify-center h-full">
     {/* Change text to white so it contrasts with the image */}
     <div className="text-center text-white"> 
        <p className="text-3xl font-display">{album.title}</p>
        <p className="opacity-80 text-sm">Album {album.date}</p>
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