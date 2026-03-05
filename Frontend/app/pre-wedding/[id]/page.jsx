// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import Link from 'next/link'
// import { useState, use } from 'react'

// export default function CoupleDetailPage({ params }) {
//   const unwrappedParams = use(params)
// const [selectedIndex, setSelectedIndex] = useState(null)

//   const coupleData = {
//     1: {
//       id: 1,
//       names: 'Sarah & Michael',
//       photos: [
//         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
//         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
//         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
//         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
//         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
//         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
//       ],
//     },
//     2: {
//       id: 2,
//       names: 'Emma & James',
//       photos: [
//         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
//         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
//         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
//         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
//         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
//         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
//       ],
//     },
//     3: {
//       id: 3,
//       names: 'Olivia & David',
//       photos: [
//         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
//         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
//         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
//         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
//         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
//         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
//       ],
//     },
//     4: {
//       id: 4,
//       names: 'Sophie & Alex',
//       photos: [
//         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
//         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
//         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
//         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
//         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
//         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
//       ],
//     },
//   }

//   const couple = coupleData[unwrappedParams.id] || coupleData[1]

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
//       <Navbar />

//       {/* Background Video Hero */}
//       <section className="relative h-96 md:h-[500px] overflow-hidden">

//         {/* Background Video */}
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//           className="absolute inset-0 w-full h-full object-cover"
//         >
//           <source src="/videos/prewedding.mp4" type="video/mp4" />
//         </video>

//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/50" />

//         {/* Content */}
//         <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
//           <h1 className="text-5xl md:text-7xl font-display mb-4">
//             {couple.names}'s <span className="text-gold">Story</span>
//           </h1>
//           <p className="text-gray-300 font-lato max-w-2xl text-lg">
//             A beautiful love story captured in moments
//           </p>
//         </div>
//       </section>

//       {/* Gallery Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">

//           <Link
//             href="/pre-wedding"
//             className="text-gold hover:text-yellow-300 font-lato text-sm uppercase tracking-widest mb-8 inline-block"
//           >
//             ← Back to Stories
//           </Link>

//           <h3 className="text-3xl font-display mb-8">
//             Photo <span className="text-gold">Gallery</span>
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">
//   {couple.photos.map((photo, idx) => {

//     const isLarge = idx % 5 === 0
//     const isWide = idx % 5 === 3

//     return (
//       <div
//         key={idx}
//         onClick={() => setSelectedIndex(idx)}
//         className={`group relative overflow-hidden cursor-pointer border border-white/5
//         ${isLarge ? 'md:row-span-2' : ''}
//         ${isWide ? 'md:col-span-2' : ''}`}
//       >

//         <img
//           src={photo}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />

//         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"/>
//       </div>
//     )
//   })}
// </div>
//         </div>
//       </section>

//       {/* Lightbox */}
//       {selectedIndex !== null && (
//   <div
//     className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
//     onClick={() => setSelectedIndex(null)}
//   >

//     {/* Left Button */}
//     <button
//       onClick={(e) => {
//         e.stopPropagation()
//         setSelectedIndex((p) =>
//           (p - 1 + couple.photos.length) % couple.photos.length
//         )
//       }}
//       className="absolute left-10 text-white text-4xl"
//     >
//       ←
//     </button>

//     {/* Image */}
//     <img
//       src={couple.photos[selectedIndex]}
//       className="max-w-[90%] max-h-[80vh] object-contain"
//     />

//     {/* Right Button */}
//     <button
//       onClick={(e) => {
//         e.stopPropagation()
//         setSelectedIndex((p) =>
//           (p + 1) % couple.photos.length
//         )
//       }}
//       className="absolute right-10 text-white text-4xl"
//     >
//       →
//     </button>

//     {/* Close */}
//     <button
//       onClick={() => setSelectedIndex(null)}
//       className="absolute top-10 right-10 text-white text-3xl"
//     >
//       ✕
//     </button>

//   </div>
// )}

//       <Footer />
//     </main>
//   )
// }
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'

export default function AlbumGalleryPage() {
  const { id: albumId } = useParams()
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch Album Data
  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/api/collections/${albumId}`)
      .then(res => res.json())
      .then(data => {
        setAlbum({
          ...data.collection,
          images: data.images
        })
      })
      .catch(err => console.error("Error fetching album:", err))
      .finally(() => setLoading(false))
  }, [albumId, API_BASE])

  // Navigation Logic for Lightbox
  const navigateImage = useCallback((direction) => {
    if (selectedImageIndex === null || !album) return
    const total = album.images.length
    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % total)
    } else {
      setSelectedImageIndex((selectedImageIndex - 1 + total) % total)
    }
  }, [selectedImageIndex, album])

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return
      if (e.key === 'Escape') setSelectedImageIndex(null)
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'ArrowLeft') navigateImage('prev')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, navigateImage])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-[#d4af37] animate-pulse tracking-[.5em] uppercase text-sm">Loading Story...</div>
      </div>
    )
  }

  if (!album) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Album not found.</div>

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            key={album.video_url} // Force reload when album changes
            className="w-full h-full object-cover opacity-40"
          >
            <source src={`${API_BASE}${album.video_url}`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/20 to-[#1a1a1a]" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="border-l-2 border-[#d4af37] pl-8 max-w-3xl">
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] mb-4 block">
              {album.date || 'Cinematic Collection'}
            </span>
            <h1 className="text-6xl md:text-8xl font-display mb-6 leading-tight">
              {album.title}
            </h1>
            <p className="text-gray-400 font-lato text-lg leading-relaxed max-w-xl">
              {album.description}
            </p>
          </div>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[350px] gap-8">
            {album.images.map((image, index) => {
              const isLarge = index % 7 === 0 // Pattern variation
              const isWide = index % 7 === 3

              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden cursor-pointer bg-black
                    ${isLarge ? 'md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2' : ''}
                  `}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                  
                    src={`${API_BASE}${image.image_url}`}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="text-white text-xs tracking-[0.3em] uppercase border-b border-[#d4af37] pb-2">
                       View Frame
                     </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

        {/* Lightbox */}
  {/* LIGHTBOX */}
{selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[100] flex items-center justify-center"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 md:left-8 text-white/20 hover:text-[#d4af37] text-6xl transition-all z-[120] p-4 select-none"
          >
            ‹
          </button>

          {/* Image Container - This fills the screen */}
          <div 
            className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none p-4 md:p-12" 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={selectedImageIndex}
              src={`${API_BASE}${album.images[selectedImageIndex].image_url}`}
              alt="Full Size View"
              /* FIX FOR SIZE: 
                 We set w-full and a high max-w-[1200px] (or 90vw).
                 object-contain ensures it never stretches or crops.
              */
              className="w-full h-auto max-w-[60vw] max-h-[65vh] object-contain shadow-[0_0_100px_rgba(0,0,0,1)] pointer-events-auto animate-in fade-in zoom-in-95 duration-300"
            />
            
            {album.images[selectedImageIndex].caption && (
              <div className="mt-8 text-center pointer-events-auto">
                <p className="text-[#d4af37] tracking-[0.6em] uppercase text-[10px] md:text-xs font-light">
                  {album.images[selectedImageIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 md:right-8 text-white/20 hover:text-[#d4af37] text-6xl transition-all z-[120] p-4 select-none"
          >
            ›
          </button>

          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 text-[#d4af37] hover:text-white text-3xl transition-transform hover:rotate-90 z-[120] p-4"
          >
            ✕
          </button>
        </div>
      )}
      <Footer/>
    </main>
  )
}