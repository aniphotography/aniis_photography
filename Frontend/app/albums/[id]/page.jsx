'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function GalleryCategoryPage() {

  const { id } = useParams()

  const [collection, setCollection] = useState(null)
  const [media, setMedia] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  /* FETCH COLLECTION */

  useEffect(() => {

    fetch(`http://localhost:5000/api/collections`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id == id)
        setCollection(found)
      })

    fetch(`http://localhost:5000/api/media?collection_id=${id}`)
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
                src={`http://localhost:5000${item.image_url}`}
                muted
                loop
                playsInline
                className="w-full h-80 object-cover"
              />
            ) : (
              <img
                src={`http://localhost:5000${item.image_url}`}
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
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex flex-col"
          onClick={() => setSelectedIndex(null)}
        >

          {/* TOP BAR */}
          <div className="w-full h-20 flex items-center justify-end px-10">
            <button
              onClick={() => setSelectedIndex(null)}
              className="text-gold hover:text-white transition"
            >
              ✕
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 flex items-center justify-center relative px-10">

            {/* LEFT */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(
                  (prev) => (prev - 1 + media.length) % media.length
                )
              }}
              className="absolute left-5 text-gold text-4xl hover:text-white"
            >
              ‹
            </button>

            {/* MEDIA DISPLAY */}
            {media[selectedIndex].image_url?.endsWith('.mp4') ? (
              <video
                src={`http://localhost:5000${media[selectedIndex].image_url}`}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={`http://localhost:5000${media[selectedIndex].image_url}`}
                className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* RIGHT */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(
                  (prev) => (prev + 1) % media.length
                )
              }}
              className="absolute right-5 text-gold text-4xl hover:text-white"
            >
              ›
            </button>

          </div>

          {/* COUNTER */}
          <div className="text-center pb-6 text-gray-400 text-sm tracking-widest">
            {selectedIndex + 1} / {media.length}
          </div>

        </div>

      )}

      <Footer />

    </main>
  )
}