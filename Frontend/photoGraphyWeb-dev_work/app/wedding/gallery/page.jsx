'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function WeddingGalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryImages = [
    { id: 1, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Candid Moment' },
    { id: 2, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', title: 'Tea Garden' },
    { id: 3, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', title: 'Mountain View' },
    { id: 4, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', title: 'The Umbrella' },
    { id: 5, image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', title: 'Portrait' },
    { id: 6, image: 'https://images.unsplash.com/photo-1519225497282-d49d50431bc9?w=800&q=80', title: 'Rocky Stream' },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      {/* --- HERO SECTION WITH VIDEO --- */}
<section className="relative h-[85vh] w-full overflow-hidden bg-[#1a1a1a]">
  {/* Container for the video - pushed down to match your preference */}
  <div className="relative h-[70%] w-full pt-20 overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover opacity-60"
    >
      <source src="/videos/prewedding.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* Floating Text Overlay over the video */}
    <div className="absolute inset-0 flex justify-center pt-32 pointer-events-none">
      <h2 className="text-[#d4af37] text-5xl md:text-8xl font-display tracking-[0.4em] uppercase opacity-90">
        DARJEELING
      </h2>
    </div>
  </div>

  {/* Bottom Title Bar with Metadata */}
  <div className="absolute bottom-0 w-full bg-[#1a1a1a] py-12 text-center border-t border-[#d4af37]/10">
    <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37] tracking-tight mb-3">
      Sourav <span className="text-2xl align-middle mx-2 text-gray-500">×</span> Stella
    </h1>
    
    <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase">
      <span>Darjeeling</span>
      <span className="text-[#d4af37]/40">/</span>
      <span>Destination Prewedding</span>
    </div>
  </div>
</section>

      {/* --- GALLERY GRID --- */}
      <section className="px-6 py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative p-[1px] bg-[#d4af37]/20 group-hover:bg-[#d4af37] transition-colors duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <p className="text-[#d4af37] font-bold tracking-[0.3em] uppercase text-[10px]">
               Anii's Photography • Est. 2024
             </p>
          </div>
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
  {/* --- LIGHTBOX MODAL WITH PHOTO NAVIGATION --- */}
{selectedImage && (
  <div
    className="fixed inset-0 bg-black/98 z-[100] flex items-end justify-center p-4 pb-20 transition-all duration-300"
    onClick={() => setSelectedImage(null)}
  >
    {/* Navigation Arrows Container */}
    <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none">
      {/* Previous Photo Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
          const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
          setSelectedImage(galleryImages[prevIndex]);
        }}
        className="pointer-events-auto p-2 text-[#d4af37] hover:text-white transition-all bg-black/40 rounded-full backdrop-blur-sm border border-[#d4af37]/20 hover:border-[#d4af37]"
        aria-label="Previous photo"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Photo Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
          const nextIndex = (currentIndex + 1) % galleryImages.length;
          setSelectedImage(galleryImages[nextIndex]);
        }}
        className="pointer-events-auto p-2 text-[#d4af37] hover:text-white transition-all bg-black/40 rounded-full backdrop-blur-sm border border-[#d4af37]/20 hover:border-[#d4af37]"
        aria-label="Next photo"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* The Expanded Photo */}
    <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
      <img
        src={selectedImage.image}
        alt={selectedImage.title}
        className="w-full h-auto max-h-[75vh] object-contain shadow-[0_0_50px_rgba(212,175,55,0.15)]"
      />
      
      {/* Close Button */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute -top-12 right-0 text-[#d4af37] hover:text-white transition-colors"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}

      <Footer />
    </main>
  )
}