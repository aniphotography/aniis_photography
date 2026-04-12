'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://${API}:5000'
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
        const previewRes = await fetch(`${API}/api/media?type=album-preview`, {
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

           <div className="page bg-gold border-r border-black/20 shadow-inner">
  <div className="flex h-full w-full items-center justify-center p-10 text-center">
    <h2 className="text-black text-2xl md:text-3xl font-display leading-tight uppercase">
     PREMIUM COLLECTION
    </h2>
  </div>
</div>


            {/* * PAGES */}

            {previewPages.length > 0 ? (

              previewPages.map((img, i) => (

                <div key={i} className="page bg-white">

                  <img
                    src={getMediaUrl(img.image_url)}
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

            <div className="page bg-black border-l border-white/10">
  <div className="flex h-full w-full flex-col items-center justify-center text-center p-8">
    
    {/* Main Message */}
     <h3 className="text-yellow-400 text-3xl font-display mb-3 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
      Explore More
    </h3> 
    
    {/* Decorative Divider */}
     <div className="w-16 h-[2px] bg-yellow-400/50 mb-5" /> 
    
    {/* Brand Name */}
     <p className="text-yellow-500/80 text-[11px] tracking-[0.6em] uppercase font-medium">
      Anii's Photography
    </p>

  </div>
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