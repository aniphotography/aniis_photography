
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
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
const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const bookRef = useRef(null)
  const abortControllerRef = useRef(null)

  /* ================= FETCH COLLECTION ================= */

  useEffect(() => {
    abortControllerRef.current = new AbortController()

    const fetchCollection = async () => {
      try {
        const res = await fetch(`${API}/api/collections/${id}`, {
          signal: abortControllerRef.current.signal
        })
        if (res.ok) {
          const data = await res.json()
          setAlbum(data.collection)

          const imgs = data.images.map(img =>
            getMediaUrl(img.image_url)
          )

          setPages(imgs)
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




  if (!album) return null
const showNextImage = (e) => {
  e.stopPropagation(); 
  // Change album.images.length to pages.length
  if (pages && selectedImageIndex < pages.length - 1) {
    setSelectedImageIndex(selectedImageIndex + 1);
  } else {
    setSelectedImageIndex(0); 
  }
};

const showPrevImage = (e) => {
  e.stopPropagation();
  // Change album.images.length to pages.length
  if (pages && selectedImageIndex > 0) {
    setSelectedImageIndex(selectedImageIndex - 1);
  } else {
    setSelectedImageIndex(pages.length - 1); 
  }
};

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">

      <Navbar />

      {/* HERO */}

      {/* <section className="relative h-96 md:h-[500px] overflow-hidden"> */}
<section className="relative h-60 md:h-[370px] overflow-hidden">
  {pages.length > 0 && (
  <div className="relative w-full h-full overflow-hidden">
    {/* LAYER 1: Background Haze 
        Keep this only if you want a subtle blurred edge effect 
        or if you plan on changing the opacity of Layer 2.
    */}
    <img 
      src={pages[0]} 
      alt=""
      className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
    />

    {/* LAYER 2: Full Cover Image
        'object-cover' ensures the image fills the entire 15x10 or 3:1 div.
        Note: This will crop the edges of the photo to ensure a perfect fit.
    */}
    <div className="absolute inset-0">
      <img 
        src={pages[0]} 
        alt="Album Cover Focus"
        className="w-full h-full object-cover" 
      />
    </div>
  </div>
)}

  {/* EXISTING LAYERS (Overlay and Text) */}
  <div className="absolute inset-0 bg-black/50" />

  <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-5xl md:text-6xl font-display mb-4 text-white">
      {album.title}
      <span className="text-gold"> Album</span>
    </h1>
    <p className="text-gray-300 text-lg">Year: {album.date}</p>
  </div>
</section>
      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <Link
            href="/album-design"
            className="text-gold mb-20 inline-block"
          >
            ← Back to Albums
          </Link>


          {/* FLIPBOOK */}

          <div className="flex flex-col items-center mb-20">

            <HTMLFlipBook
  /* 3:1 Ratio: Width 1200 / Height 400 */
 width={900} 
  height={600}
  size="stretch" 
  minWidth={300}
  maxWidth={1800} // Increased to allow for the wide span
  minHeight={100}
  maxHeight={600}
  showCover={true}
  flippingTime={800}
  ref={bookRef}
  className="shadow-2xl"
>
  {/* FRONT COVER */}
  <div className="page relative bg-black overflow-hidden">
    {pages.length > 1 && (
      <img
        src={pages[1]}
        className="w-full h-full object-cover opacity-100"
        alt="Cover"
      />
    )}
   
  </div>

  {/* INNER PHOTO PAGES - These will now appear as wide spreads */}
  {pages.slice(1, -1).map((url, index) => (
    <div key={index} className="page bg-white overflow-hidden">
      <img
        src={url}
        className="w-full h-full object-cover"
        alt={`Page ${index + 1}`}
      />
    </div>
  ))}

  {/* BACK COVER */}
  <div className="page relative bg-black overflow-hidden">
    {pages.length > 1 && (
      <img
        src={pages[pages.length - 1]}
        className="w-full h-full object-cover opacity-100"
        alt="Back Cover"
      />
    )}
  </div>
</HTMLFlipBook>

            {/* NAV BUTTONS */}

            <div className="flex gap-6 mt-20">

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

<div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-12">
  {/* Left Side: Title and Count */}
 
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-gold/50"></span>
      <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-light">
        Index — {pages.length} Total Frames
      </p>
    </div>


  {/* Right Side: The Branding Label */}
  <div className="mt-4 md:mt-0">
    <p className="text-[#d4af37]/60 text-[9px] md:text-[10px] tracking-[0.6em] uppercase font-medium leading-none">
      Anii Photography Standard
    </p>
  </div>
</div>
  </div>
{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[350px] gap-2">
  {pages.map((page, idx) => {
    const isLarge = idx % 7 === 0;
    const isWide = idx % 7 === 3;

    return (
      <div
        key={idx}
        className={`group relative overflow-hidden cursor-pointer bg-black transition-all duration-500
          ${isLarge ? 'md:row-span-2' : ''}
          ${isWide ? 'md:col-span-2' : ''}
        `}
        onClick={() => setSelectedImageIndex(idx)}
      >
        <img
          src={page}
          alt={`Page ${idx + 1}`}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center">
            <span className="text-white text-xs tracking-[0.4em] uppercase border-b border-[#d4af37] pb-2 mb-2">
              View Frame
            </span>
            <span className="text-[#d4af37] text-[10px] tracking-widest">
              PAGE {idx + 1}
            </span>
          </div>
        </div>
      </div>
    );
  })}
</div> */}

      </section>


      {/* LIGHTBOX */}



      <Footer />

    </main>
  )
}