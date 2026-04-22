
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
    <>
      {/* LAYER 1: The ultra-blurred background layer (the "Haze") */}
      <img 
        src={pages[0]} 
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-150 blur-xl opacity-50"
      />

      {/* LAYER 2: The sharp, central focus layer (The "Cut Size") */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={pages[0]} 
          alt="Album Cover Focus"
          /* 'object-contain' ensures the image is NEVER stretched.
            'h-[110%]' scales it just enough to overlap the top/bottom slightly
            'mx-auto' keeps it central in the 3:1 frame.
          */
          className="h-[110%] w-auto max-w-[90%] object-contain mx-auto drop-shadow-2xl"
        />
      </div>
    </>
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
            className="text-gold mb-12 inline-block"
          >
            ← Back to Albums
          </Link>


          {/* FLIPBOOK */}

          <div className="flex flex-col items-center mb-20">

            <HTMLFlipBook
  /* 3:1 Ratio: Width 1200 / Height 400 */
  width={1200} 
  height={400}
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
        className="w-full h-full object-cover opacity-60"
        alt="Cover"
      />
    )}
    <div className="absolute inset-0 flex items-center justify-center p-10 bg-black/20">
      <h2 className="text-gold text-4xl md:text-6xl font-display leading-tight uppercase tracking-[0.3em] text-center">
        {album.title}
      </h2>
    </div>
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
        className="w-full h-full object-cover opacity-60"
        alt="Back Cover"
      />
    )}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/40">
      <h3 className="text-yellow-400 text-4xl font-display mb-3 tracking-[0.4em] uppercase">
        Thank You
      </h3>
      <div className="w-32 h-[1px] bg-gold/50 mb-6" />
      <p className="text-yellow-500/80 text-sm tracking-[0.8em] uppercase font-medium">
        Anii Photography
      </p>
    </div>
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

<div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-12">
  {/* Left Side: Title and Count */}
  <div>
    <h3 className="text-3xl md:text-4xl font-display mb-2 tracking-tight">
      Photo <span className="text-gold">Pages</span>
    </h3>
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-gold/50"></span>
      <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-light">
        Index — {pages.length} Total Frames
      </p>
    </div>
  </div>

  {/* Right Side: The Branding Label */}
  <div className="mt-4 md:mt-0">
    <p className="text-[#d4af37]/60 text-[9px] md:text-[10px] tracking-[0.6em] uppercase font-medium leading-none">
      Anii Photography Standard
    </p>
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
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[350px] gap-2">
  {/* .slice(1) starts the loop from the second photo */}
  {pages.slice(1).map((page, idx) => {
    
    // We use 'idx' from the sliced array so the layout logic 
    // stays consistent (the new first photo becomes the 'Large' one)
    const isLarge = idx % 7 === 0;
    const isWide = idx % 7 === 3;

    return (
      <div
        key={idx}
        className={`group relative overflow-hidden cursor-pointer bg-black transition-all duration-500
          ${isLarge ? 'md:row-span-2' : ''}
          ${isWide ? 'md:col-span-2' : ''}
        `}
        /* Crucial: We add +1 to the index in the click handler 
           so that the lightbox/viewer still opens the correct image 
        */
        onClick={() => setSelectedImageIndex(idx + 1)}
      >
        <img
          src={page}
          alt={`Page ${idx + 2}`}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center">
            <span className="text-white text-xs tracking-[0.4em] uppercase border-b border-[#d4af37] pb-2 mb-2">
              View Frame
            </span>
            <span className="text-[#d4af37] text-[10px] tracking-widest">
              {/* Added +2 because we skipped index 0 and index starts at 0 */}
              PAGE {idx + 2}
            </span>
          </div>
        </div>
      </div>
    );
  })}
</div>
</div>
      </section>


      {/* LIGHTBOX */}


{selectedImageIndex !== null && (
  <div
    className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
    onClick={() => setSelectedImageIndex(null)}
  >
    {/* Close Button Row */}
    <div className="w-full h-16 flex items-center justify-end px-8 md:px-16 shrink-0">
      <button
        onClick={() => setSelectedImageIndex(null)}
        className="text-[#d4af37] hover:text-white transition-colors text-2xl z-[110] p-4"
      >
        ✕
      </button>
    </div>

    <div className="flex-grow relative flex items-center justify-center p-2 pt-0">
      <div className="relative max-w-7xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        
        {/* Navigation: Previous */}
        <button onClick={showPrevImage} className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start z-[130] group pl-4 md:pl-10">
          <span className="flex items-center justify-center w-16 h-16 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
            <span className="transform translate-y-[-8px] pr-1">‹</span>
          </span>
        </button>

        {/* Navigation: Next */}
        <button onClick={showNextImage} className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end z-[130] group pr-4 md:pr-10">
          <span className="flex items-center justify-center w-16 h-16 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
            <span className="transform translate-y-[-8px] pl-1">›</span>
          </span>
        </button>

        {/* The Image - Accessing via index */}
        <img
  // Use 'pages' instead of 'album.images'
  // Use a fallback to prevent the "reading properties of undefined" error
  src={pages && pages[selectedImageIndex] ? pages[selectedImageIndex] : ""}
  className="w-full h-auto max-h-[85vh] object-contain shadow-2xl transition-all duration-300"
  alt="Gallery View"
/>

        {/* Caption Area */}
      <div className="mt-4 text-center">
  <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium mb-1">
    {/* Since 'pages' is just an array of URLs, we use a default title */}
    Gallery View
  </p>
  
  <p className="text-gray-500 text-[10px] tracking-widest">
    {/* Use pages.length instead of album.images.length */}
    {selectedImageIndex + 1} / {pages?.length || 0}
  </p>
</div>
      </div>
    </div>
  </div>
)}
      <Footer />

    </main>
  )
}