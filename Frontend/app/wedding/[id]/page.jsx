'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function AlbumGalleryPage() {
  const params = useParams()
  const albumId = params.id

  const [selectedImage, setSelectedImage] = useState(null)
  const [album, setAlbum] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/collections/${albumId}`)
      .then(res => res.json())
      .then(data => {
        setAlbum({
          ...data.collection,
          images: data.images
        })
      })
  }, [albumId])

  if (!album) return null

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* HERO SECTION WITH VIDEO */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source
              src={`http://localhost:5000${album.video_url}`}
              type="video/mp4"
            />
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
            <div className="flex items-center gap-4 text-gray-300 mb-6">
              <span className="text-xs tracking-widest uppercase">
                {album.images.length} Photos
              </span>
              <span className="w-8 h-[1px] bg-[#d4af37]/50"></span>
              <span className="text-xs tracking-widest uppercase italic">
                High-Resolution Collection
              </span>
            </div>
            <p className="text-gray-400 font-lato max-w-2xl leading-relaxed">
              {album.description}
            </p>
          </div>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="px-6 py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-6">
            {album.images.map((image, index) => {
              const isLarge = index % 5 === 0
              const isWide = index % 5 === 3

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
                    src={`http://localhost:5000${image.image_url}`}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

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

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="w-full h-24 flex items-center justify-end px-8 md:px-16 shrink-0">
            <button
              onClick={() => setSelectedImage(null)}
              className="text-[#d4af37] hover:text-white transition-colors z-[110]"
            >
              ✕
            </button>
          </div>

          <div className="flex-grow relative flex items-center justify-center p-6 pt-0">
            <div
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`http://localhost:5000${selectedImage.image_url}`}
                className="w-full max-h-[70vh] object-contain shadow-2xl"
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