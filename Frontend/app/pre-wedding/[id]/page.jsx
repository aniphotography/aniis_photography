
'use client'
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

export default function AlbumGalleryPage() {
  const { id: albumId } = useParams()

  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showVideo, setShowVideo] = useState(false)

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
  }, [albumId])

  // Helper to format YouTube link for the modal
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&mute=0` 
      : '';
  };

  // --- NAVIGATION LOGIC ---
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
      <section className="relative h-[70vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            {/* Background uses Cloudinary URL */}
            <source src={getMediaUrl(album.video_url)} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <div className="border-l-4 border-[#d4af37] pl-6 mb-4">
            <p className="text-[#d4af37] text-sm uppercase tracking-[0.3em] mb-2">
              {album.date}
            </p>
            <h1 className="text-5xl md:text-7xl font-display mb-4 tracking-tight">
              {album.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
              <span className="text-xs tracking-widest uppercase">
                {album.images?.length} Photos
              </span>
              <span className="w-8 h-[1px] bg-[#d4af37]/50"></span>
              <span className="text-xs tracking-widest uppercase italic">
                High-Resolution Collection
              </span>

              {/* WATCH NOW BUTTON: Uses the youtube_url column */}
              {album.youtube_url && (
                <button 
                  onClick={() => setShowVideo(true)}
                  className="group flex items-center gap-3 bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-[#d4af37] hover:text-white transition-all duration-300 shadow-xl ml-2"
                >
                  <span className="text-xs uppercase tracking-wider">Watch it now</span>
                  <div className="bg-red-600 rounded-full p-1 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-3 h-3">
                      <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>

            <p className="text-gray-400 font-lato max-w-2xl leading-relaxed">
              {album.description}
            </p>
          </div>
        </div>
      </section>

      {/* FILM MODAL: Separate from Background Video logic */}
      {showVideo && album.youtube_url && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-8 right-8 text-white/70 hover:text-[#d4af37] text-4xl transition-colors z-[210]"
          >
            ✕
          </button>
          <div 
            className="w-full max-w-6xl aspect-video border border-[#d4af37]/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking video
          >
            <iframe
              className="w-full h-full"
              src={getYoutubeEmbedUrl(album.youtube_url)}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}


    
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
                    src={getMediaUrl(image.image_url)}
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