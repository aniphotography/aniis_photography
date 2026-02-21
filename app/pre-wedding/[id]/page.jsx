// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import Link from 'next/link'
// import { useState, use } from 'react'

// export default function CoupleDetailPage({ params }) {
//   const unwrappedParams = use(params)
//   const [selectedImage, setSelectedImage] = useState(null)

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

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {couple.photos.map((photo, idx) => (
//               <div
//                 key={idx}
//                 className="group relative overflow-hidden h-64 cursor-pointer"
//                 onClick={() => setSelectedImage(photo)}
//               >
//                 <img
//                   src={photo}
//                   alt={`${couple.names} moment ${idx + 1}`}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Lightbox */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div
//             className="relative max-w-4xl w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedImage}
//               alt="Full view"
//               className="w-full h-auto max-h-[80vh] object-contain"
//             />
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-4 right-4 text-gold hover:text-yellow-300 transition-colors duration-300"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </main>
//   )
// }
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, use } from 'react'

export default function CoupleDetailPage({ params }) {
  const unwrappedParams = use(params)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const coupleData = {
    1: {
      id: 1,
      names: 'Sarah & Michael',
      photos: [
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
        'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      ],
    },
    // ... other couples
  }

  const couple = coupleData[unwrappedParams.id] || coupleData[1]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
      <Navbar />

      {/* Background Video Hero */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/prewedding.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-black/40" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <h1 className="text-5xl md:text-7xl font-display mb-4">
            {couple.names}'s <span className="text-gold">Story</span>
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg uppercase tracking-[0.3em]">
            The Motion Collection
          </p>
        </div>
      </section>

      {/* --- MASONRY GALLERY SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/pre-wedding"
            className="text-gold hover:text-white transition-colors font-lato text-sm uppercase tracking-widest mb-12 inline-block"
          >
            ← Back to Stories
          </Link>

          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-display uppercase tracking-widest">
              Photo <span className="text-gold">Gallery</span>
            </h3>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          {/* GRID START: Same logic as your Albums Page */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">
            {couple.photos.map((photo, idx) => {
              const isLarge = idx % 5 === 0; // Every 1st image is TALL
              const isWide = idx % 5 === 3;  // Every 4th image is WIDE

              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden cursor-pointer border border-white/5
                    ${isLarge ? 'md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2' : ''}
                  `}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <img
                    src={photo}
                    alt={`${couple.names} moment ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-500" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- BIG BUTTON LIGHTBOX --- */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="w-full h-24 flex items-center justify-end px-8 md:px-16 shrink-0">
            <button onClick={() => setSelectedIndex(null)} className="text-gold hover:text-white transition-colors">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-grow relative flex items-center justify-center p-6 pt-0">
            {/* BIG NAVIGATION BUTTONS */}
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev - 1 + couple.photos.length) % couple.photos.length);
                }}
                className="pointer-events-auto w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border border-gold/20 bg-black/40 text-gold hover:text-white hover:border-gold transition-all duration-300"
              >
                <svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev + 1) % couple.photos.length);
                }}
                className="pointer-events-auto w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border border-gold/20 bg-black/40 text-gold hover:text-white hover:border-gold transition-all duration-300"
              >
                <svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <div className="relative max-w-5xl w-full flex flex-col items-center z-10" onClick={(e) => e.stopPropagation()}>
              <img src={couple.photos[selectedIndex]} className="w-full max-h-[70vh] object-contain shadow-2xl animate-in zoom-in duration-500" />
              <p className="mt-8 text-gold tracking-[0.5em] uppercase text-xs font-medium">
                {selectedIndex + 1} / {couple.photos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}