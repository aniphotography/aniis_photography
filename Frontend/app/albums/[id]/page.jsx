'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getMediaUrl } from '@/lib/utils'

export default function GalleryCategoryPage() {

  const { id } = useParams()

  const [collection, setCollection] = useState(null)
  const [media, setMedia] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  /* FETCH COLLECTION */

  useEffect(() => {

    fetch(`http://${API}:5000/api/collections`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id == id)
        setCollection(found)
      })

    fetch(`http://${API}:5000/api/media?collection_id=${id}`)
      .then(res => res.json())
      .then(data => setMedia(data))

  }, [id])

  if (!collection) return <div className="text-white p-10">Loading...</div>

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* TITLE */}
      <section className="pt-40 text-center">
        <h1 className="text-6xl text-gold">{collection.title}</h1>
      </section>

      {/* GRID */}
      <section className="p-10 grid grid-cols-3 gap-6">

        {media.map((item, index) => (

          <div
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="cursor-pointer relative group"
          >

            {/* MEDIA */}
            {item.image_url?.endsWith('.mp4') ? (
              <video
                src={getMediaUrl(item.image_url)}
                muted
                loop
                playsInline
                className="w-full h-80 object-cover"
              />
            ) : (
              <img
                src={getMediaUrl(item.image_url)}
                className="w-full h-80 object-cover"
              />
            )}

            {/* ✅ PLAY BUTTON OVERLAY */}
            {item.image_url?.endsWith('.mp4') && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:scale-110 transition">
                  <span className="ml-1 text-white text-xl">▶</span>
                </div>
              </div>
            )}

          </div>

        ))}

      </section>

      {/* LIGHTBOX */}

      {selectedIndex !== null && (
  <div
    className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
    onClick={() => setSelectedIndex(null)}
  >
    {/* Close Button Row */}
    <div className="w-full h-16 flex items-center justify-end px-8 md:px-16 shrink-0">
      <button
        onClick={() => setSelectedIndex(null)}
        className="text-[#d4af37] hover:text-white transition-colors text-2xl z-[110] p-4"
      >
        ✕
      </button>
    </div>

    <div className="flex-grow relative flex items-center justify-center p-2 pt-0">
      {/* Main Container */}
      <div
        className="relative max-w-7xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation: Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
          }}
          className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start z-[130] transition-all group pl-4 md:pl-10"
        >
          <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
            <span className="transform translate-y-[-8px] leading-none pr-1">‹</span>
          </span>
        </button>

        {/* Navigation: Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex((prev) => (prev + 1) % media.length);
          }}
          className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end z-[130] transition-all group pr-4 md:pr-10"
        >
          <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
            <span className="transform translate-y-[-8px] leading-none pl-1">›</span>
          </span>
        </button>

        {/* --- MEDIA DISPLAY --- */}
        {media[selectedIndex].image_url?.endsWith('.mp4') ? (
          <video
            src={getMediaUrl(media[selectedIndex].image_url)}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-auto max-h-[85vh] object-contain shadow-2xl transition-all duration-300"
          />
        ) : (
          <img
            src={getMediaUrl(media[selectedIndex].image_url)}
            className="w-full h-auto max-h-[85vh] object-contain shadow-2xl transition-all duration-300"
            alt="Gallery View"
          />
        )}

        {/* Info Area */}
        <div className="mt-4 text-center">
          {media[selectedIndex].caption && (
            <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium mb-1">
              {media[selectedIndex].caption}
            </p>
          )}
          <p className="text-gray-500 text-[10px] tracking-widest">
            {selectedIndex + 1} / {media.length}
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
