'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function AlbumGalleryPage() {
  const params = useParams()
  const albumId = params.id
  const [selectedImage, setSelectedImage] = useState(null)

  const albumsData = {
    '1': {
      title: 'Sarah & John Wedding',
      date: '2024',
      photos: 500,
      description: 'A beautiful celebration of love with breathtaking moments captured throughout the day.',
      images: [
        { id: 1, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Bride & Groom' },
        { id: 2, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'First Dance' },
        { id: 3, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'Reception' },
        { id: 4, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', caption: 'Celebration' },
        { id: 5, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', caption: 'Golden Hour' },
        { id: 6, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Couple Portrait' },
        { id: 7, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'Ceremony' },
        { id: 8, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'Details' },
      ],
    },
    // ... other albums remain the same
  }

  const album = albumsData[albumId] || albumsData['1']

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* --- HERO SECTION WITH VIDEO --- */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/videos/prewedding.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <div className="border-l-4 border-[#d4af37] pl-6 mb-4">
            <p className="text-[#d4af37] text-sm uppercase tracking-[0.3em] mb-2">{album.date}</p>
            <h1 className="text-5xl md:text-7xl font-display mb-4 tracking-tight">
              {album.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-300 mb-6">
               <span className="text-xs tracking-widest uppercase">{album.photos} Photos</span>
               <span className="w-8 h-[1px] bg-[#d4af37]/50"></span>
               <span className="text-xs tracking-widest uppercase italic">High-Resolution Collection</span>
            </div>
            <p className="text-gray-400 font-lato max-w-2xl leading-relaxed">
              {album.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- CINEMATIC MASONRY GALLERY GRID --- */}
      <section className="px-6 py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">
            {album.images.map((image, index) => {
              // Same placement logic from your AlbumsPage
              const isLarge = index % 5 === 0; // every 5th image large
              const isWide = index % 5 === 3;  // every 5th pattern wide

              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden cursor-pointer border border-white/5
                    ${isLarge ? 'md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2' : ''}
                  `}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <p className="text-[#d4af37] font-display text-lg text-center tracking-widest uppercase px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- CINEMATIC LIGHTBOX --- */}
     {selectedImage && (
  <div
    className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
    onClick={() => setSelectedImage(null)}
  >
    {/* --- TOP BAR (Protects the button) --- */}
    <div className="w-full h-24 flex items-center justify-end px-8 md:px-16 shrink-0">
      <button
        onClick={() => setSelectedImage(null)}
        className="text-[#d4af37] hover:text-white transition-colors z-[110] pointer-events-auto"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* --- IMAGE AREA --- */}
    <div className="flex-grow relative flex items-center justify-center p-6 pt-0">
      
      {/* Navigation Arrows (Absolute to the whole screen) */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-16 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
            const prevIndex = (currentIndex - 1 + album.images.length) % album.images.length;
            setSelectedImage(album.images[prevIndex]);
          }}
          className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full border border-[#d4af37]/20 bg-black/40 text-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
            const nextIndex = (currentIndex + 1) % album.images.length;
            setSelectedImage(album.images[nextIndex]);
          }}
          className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full border border-[#d4af37]/20 bg-black/40 text-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* The Photo wrapper */}
      <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={selectedImage.image}
          alt={selectedImage.caption}
          className="w-full max-h-[65vh] md:max-h-[70vh] object-contain shadow-2xl"
        />
        <div className="mt-6 text-center">
          <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium">
            {selectedImage.caption}
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
// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { useState } from 'react'

// export default function WeddingGalleryPage() {
//   const [selectedImage, setSelectedImage] = useState(null)

//   const galleryImages = [
//     { id: 1, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Candid Moment' },
//     { id: 2, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', title: 'Tea Garden' },
//     { id: 3, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', title: 'Mountain View' },
//     { id: 4, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', title: 'The Umbrella' },
//     { id: 5, image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', title: 'Portrait' },
//     { id: 6, image: 'https://images.unsplash.com/photo-1519225497282-d49d50431bc9?w=800&q=80', title: 'Rocky Stream' },
//   ]

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white">
//       <Navbar />

//       {/* --- HERO SECTION WITH VIDEO --- */}
//       <section className="relative h-[85vh] w-full overflow-hidden bg-[#1a1a1a]">
//         <div className="relative h-[70%] w-full pt-20 overflow-hidden">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover opacity-60"
//           >
//             <source src="/videos/prewedding.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>

//           <div className="absolute inset-0 flex justify-center pt-32 pointer-events-none">
//             <h2 className="text-[#d4af37] text-5xl md:text-8xl font-display tracking-[0.4em] uppercase opacity-90">
//               DARJEELING
//             </h2>
//           </div>
//         </div>

//         <div className="absolute bottom-0 w-full bg-[#1a1a1a] py-12 text-center border-t border-[#d4af37]/10">
//           <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37] tracking-tight mb-3">
//             Sourav <span className="text-2xl align-middle mx-2 text-gray-500">×</span> Stella
//           </h1>
          
//           <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase">
//             <span>Darjeeling</span>
//             <span className="text-[#d4af37]/40">/</span>
//             <span>Destination Prewedding</span>
//           </div>
//         </div>
//       </section>

//       {/* --- CINEMATIC MASONRY GALLERY GRID --- */}
//       <section className="px-6 py-20 bg-[#1a1a1a]">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">
//             {galleryImages.map((item, index) => {
//               // Masonry placement logic
//               const isLarge = index % 5 === 0; // Large vertical block
//               const isWide = index % 5 === 3;  // Wide horizontal block

//               return (
//                 <div
//                   key={item.id}
//                   className={`group relative cursor-pointer overflow-hidden
//                     ${isLarge ? 'md:row-span-2' : ''}
//                     ${isWide ? 'md:col-span-2' : ''}
//                   `}
//                   onClick={() => setSelectedImage(item)}
//                 >
//                   <div className="relative h-full w-full p-[1px] bg-[#d4af37]/20 group-hover:bg-[#d4af37] transition-colors duration-500">
//                     <div className="relative h-full w-full overflow-hidden bg-gray-900">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                          <p className="text-[#d4af37] font-display text-sm tracking-widest uppercase">
//                             {item.title}
//                          </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//           <div className="mt-16 text-center">
//              <p className="text-[#d4af37] font-bold tracking-[0.3em] uppercase text-[10px]">
//                Anii's Photography • Est. 2024
//              </p>
//           </div>
//         </div>
//       </section>

//       {/* --- LIGHTBOX MODAL --- */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-4 transition-all duration-300"
//           onClick={() => setSelectedImage(null)}
//         >
//           {/* Navigation Arrows */}
//           <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
//                 const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
//                 setSelectedImage(galleryImages[prevIndex]);
//               }}
//               className="pointer-events-auto p-2 text-[#d4af37] hover:text-white transition-all bg-black/40 rounded-full backdrop-blur-sm border border-[#d4af37]/20 hover:border-[#d4af37]"
//             >
//               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
//                 const nextIndex = (currentIndex + 1) % galleryImages.length;
//                 setSelectedImage(galleryImages[nextIndex]);
//               }}
//               className="pointer-events-auto p-2 text-[#d4af37] hover:text-white transition-all bg-black/40 rounded-full backdrop-blur-sm border border-[#d4af37]/20 hover:border-[#d4af37]"
//             >
//               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>

//           <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={selectedImage.image}
//               alt={selectedImage.title}
//               className="w-full h-auto max-h-[80vh] object-contain shadow-[0_0_50px_rgba(212,175,55,0.15)]"
//             />
            
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute -top-12 right-0 text-[#d4af37] hover:text-white transition-colors"
//             >
//               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </main>
//   )
// }