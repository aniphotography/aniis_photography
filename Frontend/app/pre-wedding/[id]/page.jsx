// // 'use client'

// // import Navbar from '@/components/Navbar'
// // import Footer from '@/components/Footer'
// // import Link from 'next/link'
// // import { useState, use } from 'react'

// // export default function CoupleDetailPage({ params }) {
// //   const unwrappedParams = use(params)
// // const [selectedIndex, setSelectedIndex] = useState(null)

// //   const coupleData = {
// //     1: {
// //       id: 1,
// //       names: 'Sarah & Michael',
// //       photos: [
// //         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
// //         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
// //         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
// //         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
// //         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
// //         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
// //       ],
// //     },
// //     2: {
// //       id: 2,
// //       names: 'Emma & James',
// //       photos: [
// //         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
// //         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
// //         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
// //         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
// //         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
// //         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
// //       ],
// //     },
// //     3: {
// //       id: 3,
// //       names: 'Olivia & David',
// //       photos: [
// //         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
// //         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
// //         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
// //         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
// //         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
// //         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
// //       ],
// //     },
// //     4: {
// //       id: 4,
// //       names: 'Sophie & Alex',
// //       photos: [
// //         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
// //         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
// //         'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
// //         'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
// //         'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
// //         'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
// //       ],
// //     },
// //   }

// //   const couple = coupleData[unwrappedParams.id] || coupleData[1]

// //   return (
// //     <main className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
// //       <Navbar />

// //       {/* Background Video Hero */}
// //       <section className="relative h-96 md:h-[500px] overflow-hidden">

// //         {/* Background Video */}
// //         <video
// //           autoPlay
// //           muted
// //           loop
// //           playsInline
// //           preload="auto"
// //           className="absolute inset-0 w-full h-full object-cover"
// //         >
// //           <source src="/videos/prewedding.mp4" type="video/mp4" />
// //         </video>

// //         {/* Dark Overlay */}
// //         <div className="absolute inset-0 bg-black/50" />

// //         {/* Content */}
// //         <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
// //           <h1 className="text-5xl md:text-7xl font-display mb-4">
// //             {couple.names}'s <span className="text-gold">Story</span>
// //           </h1>
// //           <p className="text-gray-300 font-lato max-w-2xl text-lg">
// //             A beautiful love story captured in moments
// //           </p>
// //         </div>
// //       </section>

// //       {/* Gallery Section */}
// //       <section className="py-20 px-6">
// //         <div className="max-w-7xl mx-auto">

// //           <Link
// //             href="/pre-wedding"
// //             className="text-gold hover:text-yellow-300 font-lato text-sm uppercase tracking-widest mb-8 inline-block"
// //           >
// //             ← Back to Stories
// //           </Link>

// //           <h3 className="text-3xl font-display mb-8">
// //             Photo <span className="text-gold">Gallery</span>
// //           </h3>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">
// //   {couple.photos.map((photo, idx) => {

// //     const isLarge = idx % 5 === 0
// //     const isWide = idx % 5 === 3

// //     return (
// //       <div
// //         key={idx}
// //         onClick={() => setSelectedIndex(idx)}
// //         className={`group relative overflow-hidden cursor-pointer border border-white/5
// //         ${isLarge ? 'md:row-span-2' : ''}
// //         ${isWide ? 'md:col-span-2' : ''}`}
// //       >

// //         <img
// //           src={photo}
// //           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //         />

// //         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"/>
// //       </div>
// //     )
// //   })}
// // </div>
// //         </div>
// //       </section>

// //       {/* Lightbox */}
// //       {selectedIndex !== null && (
// //   <div
// //     className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
// //     onClick={() => setSelectedIndex(null)}
// //   >

// //     {/* Left Button */}
// //     <button
// //       onClick={(e) => {
// //         e.stopPropagation()
// //         setSelectedIndex((p) =>
// //           (p - 1 + couple.photos.length) % couple.photos.length
// //         )
// //       }}
// //       className="absolute left-10 text-white text-4xl"
// //     >
// //       ←
// //     </button>

// //     {/* Image */}
// //     <img
// //       src={couple.photos[selectedIndex]}
// //       className="max-w-[90%] max-h-[80vh] object-contain"
// //     />

// //     {/* Right Button */}
// //     <button
// //       onClick={(e) => {
// //         e.stopPropagation()
// //         setSelectedIndex((p) =>
// //           (p + 1) % couple.photos.length
// //         )
// //       }}
// //       className="absolute right-10 text-white text-4xl"
// //     >
// //       →
// //     </button>

// //     {/* Close */}
// //     <button
// //       onClick={() => setSelectedIndex(null)}
// //       className="absolute top-10 right-10 text-white text-3xl"
// //     >
// //       ✕
// //     </button>

// //   </div>
// // )}

// //       <Footer />
// //     </main>
// //   )
// // }
// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { useState, useEffect, useCallback } from 'react'
// import { useParams } from 'next/navigation'

// export default function AlbumGalleryPage() {
//   const { id: albumId } = useParams()
//   const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

//   const [selectedImageIndex, setSelectedImageIndex] = useState(null)
//   const [album, setAlbum] = useState(null)
//   const [loading, setLoading] = useState(true)

//   // Fetch Album Data
//   useEffect(() => {
//     setLoading(true)
//     fetch(`${API_BASE}/api/collections/${albumId}`)
//       .then(res => res.json())
//       .then(data => {
//         setAlbum({
//           ...data.collection,
//           images: data.images
//         })
//       })
//       .catch(err => console.error("Error fetching album:", err))
//       .finally(() => setLoading(false))
//   }, [albumId, API_BASE])

//   // Navigation Logic for Lightbox
//   const navigateImage = useCallback((direction) => {
//     if (selectedImageIndex === null || !album) return
//     const total = album.images.length
//     if (direction === 'next') {
//       setSelectedImageIndex((selectedImageIndex + 1) % total)
//     } else {
//       setSelectedImageIndex((selectedImageIndex - 1 + total) % total)
//     }
//   }, [selectedImageIndex, album])

//   // Keyboard Support
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (selectedImageIndex === null) return
//       if (e.key === 'Escape') setSelectedImageIndex(null)
//       if (e.key === 'ArrowRight') navigateImage('next')
//       if (e.key === 'ArrowLeft') navigateImage('prev')
//     }
//     window.addEventListener('keydown', handleKeyDown)
//     return () => window.removeEventListener('keydown', handleKeyDown)
//   }, [selectedImageIndex, navigateImage])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
//         <div className="text-[#d4af37] animate-pulse tracking-[.5em] uppercase text-sm">Loading Story...</div>
//       </div>
//     )
//   }

//   if (!album) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Album not found.</div>

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white">
//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="relative h-[75vh] w-full overflow-hidden">
//         <div className="absolute inset-0">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             key={album.video_url} // Force reload when album changes
//             className="w-full h-full object-cover opacity-40"
//           >
//             <source src={`${API_BASE}${album.video_url}`} type="video/mp4" />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/20 to-[#1a1a1a]" />
//         </div>

//         <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
//           <div className="border-l-2 border-[#d4af37] pl-8 max-w-3xl">
//             <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] mb-4 block">
//               {album.date || 'Cinematic Collection'}
//             </span>
//             <h1 className="text-6xl md:text-8xl font-display mb-6 leading-tight">
//               {album.title}
//             </h1>
//             <p className="text-gray-400 font-lato text-lg leading-relaxed max-w-xl">
//               {album.description}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* MASONRY GRID */}
//       <section className="px-6 py-24">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[350px] gap-8">
//             {album.images.map((image, index) => {
//               const isLarge = index % 7 === 0 // Pattern variation
//               const isWide = index % 7 === 3

//               return (
//                 <div
//                   key={image.id}
//                   className={`group relative overflow-hidden cursor-pointer bg-black
//                     ${isLarge ? 'md:row-span-2' : ''}
//                     ${isWide ? 'md:col-span-2' : ''}
//                   `}
//                   onClick={() => setSelectedImageIndex(index)}
//                 >
//                   <img
                  
//                     src={`${API_BASE}${image.image_url}`}
//                     alt={image.caption}
//                     className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                      <span className="text-white text-xs tracking-[0.3em] uppercase border-b border-[#d4af37] pb-2">
//                        View Frame
//                      </span>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//         {/* Lightbox */}
//   {/* LIGHTBOX */}
// {selectedImage && (
//   <div
//     className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
//     onClick={() => setSelectedImage(null)}
//   >
//     {/* Close Button Row */}
//     <div className="w-full h-16 flex items-center justify-end px-8 md:px-16 shrink-0">
//       <button
//         onClick={() => setSelectedImage(null)}
//         className="text-[#d4af37] hover:text-white transition-colors text-2xl z-[110] p-4"
//       >
//         ✕
//       </button>
//     </div>

//     <div className="flex-grow relative flex items-center justify-center p-2 pt-0">
//       {/* Main Image Container */}
//       <div
//         className="relative max-w-7xl w-full flex flex-col items-center"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Navigation: Previous Button (Invisible click area with a prominent circular arrow) */}
// {/* Navigation: Previous Button */}
// <button
//   onClick={showPrevImage}
//   className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start z-[130] transition-all group pl-4 md:pl-10"
// >
//   <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
//     {/* translate-y-[4px] pushes the glyph DOWN into the center */}
//     <span className="transform translate-y-[-8px] leading-none pr-1">
//       ‹
//     </span>
//   </span>
// </button>

// {/* Navigation: Next Button */}
// <button
//   onClick={showNextImage}
//   className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end z-[130] transition-all group pr-4 md:pr-10"
// >
//   <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
//     {/* translate-y-[4px] pushes the glyph DOWN into the center */}
//     <span className="transform translate-y-[-8px] leading-none pl-1">
//       ›
//     </span>
//   </span>
// </button>

//         {/* --- ACTUAL IMAGE --- */}
//         <img
//           src={`http://localhost:5000${selectedImage.image_url}`}
//           className="w-full h-auto max-h-[85vh] object-contain shadow-2xl transition-all duration-300"
//           alt="Gallery View"
//         />
        
//         <div className="mt-4 text-center">
//           {selectedImage.caption && (
//             <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium mb-1">
//               {selectedImage.caption}
//             </p>
//           )}
          
//           <p className="text-gray-500 text-[10px] tracking-widest">
//             {album.images.findIndex(img => img.id === selectedImage.id) + 1} / {album.images.length}
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//       <Footer/>
//     </main>
//   )
// }
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
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

  // --- RECONCILED NAVIGATION LOGIC ---
  const showNextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex === null || !album) return
    const total = album.images.length
    setSelectedImageIndex((prev) => (prev + 1) % total)
  }, [selectedImageIndex, album])

  const showPrevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex === null || !album) return
    const total = album.images.length
    setSelectedImageIndex((prev) => (prev - 1 + total) % total)
  }, [selectedImageIndex, album])

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return
      if (e.key === 'Escape') setSelectedImageIndex(null)
      if (e.key === 'ArrowRight') showNextImage()
      if (e.key === 'ArrowLeft') showPrevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, showNextImage, showPrevImage])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-[#d4af37] animate-pulse tracking-[.5em] uppercase text-sm">Loading Story...</div>
      </div>
    )
  }

  if (!album) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Album not found.</div>

  // Reference for the currently open image
  const activeImage = selectedImageIndex !== null ? album.images[selectedImageIndex] : null

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
            key={album.video_url}
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
              const isLarge = index % 7 === 0
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

      {/* LIGHTBOX */}
      {activeImage && (
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
            {/* Main Image Container */}
            <div
              className="relative max-w-7xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation: Previous Button */}
              <button
                onClick={showPrevImage}
                className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start z-[130] transition-all group pl-4 md:pl-10"
              >
                <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
                  <span className="transform translate-y-[-8px] leading-none pr-1">
                    ‹
                  </span>
                </span>
              </button>

              {/* Navigation: Next Button */}
              <button
                onClick={showNextImage}
                className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end z-[130] transition-all group pr-4 md:pr-10"
              >
                <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
                  <span className="transform translate-y-[-8px] leading-none pl-1">
                    ›
                  </span>
                </span>
              </button>

              {/* --- ACTUAL IMAGE --- */}
              <img
                src={`${API_BASE}${activeImage.image_url}`}
                className="w-full h-auto max-h-[85vh] object-contain shadow-2xl transition-all duration-300"
                alt="Gallery View"
              />
              
              <div className="mt-4 text-center">
                {activeImage.caption && (
                  <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium mb-1">
                    {activeImage.caption}
                  </p>
                )}
                
                <p className="text-gray-500 text-[10px] tracking-widest">
                  {selectedImageIndex + 1} / {album.images.length}
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