'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { getMediaUrl } from '@/lib/utils'

// export default function AlbumsPage() {

//   const [albums, setAlbums] = useState([])
//   const [selectedIndex, setSelectedIndex] = useState(null)
//   const [activeCategory, setActiveCategory] = useState('all')

//   /* FETCH COLLECTIONS */

//   useEffect(() => {
//     fetch(`${API}/api/collections`)
//       .then(res => res.json())
//       .then(data => setAlbums(data))
//   }, [])
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
export default function AlbumsPage() {
  // Add this line to link the variable to your Vercel Environment Variable
  const [albums, setAlbums] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  /* FETCH COLLECTIONS */
  useEffect(() => {
    // Now ${API} will correctly point to your backend URL
    fetch(`${API}/api/collections`)
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(err => console.error("Fetch error:", err));
  }, []); // Added API to dependency array for safety
  const filteredAlbums =
    activeCategory === 'all'
      ? albums
      : albums.filter(album => album.category === activeCategory)

  /* GROUPED SECTIONS */

  const normalize = (str) => str?.trim().toLowerCase()

  const weddingAlbums = albums.filter(a => normalize(a.category) === 'wedding')
  const preWeddingAlbums = albums.filter(a => normalize(a.category) === 'pre-wedding')
  const videoAlbums = albums.filter(a => normalize(a.category) === 'video-production')
  const fashionAlbums = albums.filter(a => normalize(a.category) === 'fashion')

  /* IMAGE HANDLER */

  const getImageSrc = (url) => {
    if (!url) return '/no-image.png'

    return url.startsWith('/')
      ? getMediaUrl(url)
      : getMediaUrl(url)
  }

  /* SECTION RENDER */

  const renderSection = (title, data) => {
    if (!data.length) return null

    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl text-[#d4af37] mb-8 tracking-widest uppercase">
            {title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {data.map(album => (
              <a
                key={album.id}
                href={`/albums/${album.id}`}
                className="relative group overflow-hidden border border-white/5"
              >

                {/* MEDIA */}
                {album.cover_video ? (
                  <video         src={getImageSrc(album.cover_video)}
                    muted
                    loop
                    playsInline
                    onMouseEnter={e => e.target.play()}
                    onMouseLeave={e => {
                      e.target.pause()
                      e.target.currentTime = 0
                    }}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                  />
                ) : album.cover_image ? (
                  <img
                    src={getImageSrc(album.cover_image)}
                    alt={album.title || "album"}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                    No Media
                  </div>
                )}

                <div className="absolute bottom-0 p-4">
                  <p className="text-xs text-[#d4af37]">{album.date}</p>
                  <h3>{album.title}</h3>
                </div>

              </a>
            ))}

          </div>
        </div>
      </section>
    )
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-40 pb-10 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-display mb-6 tracking-tight">
          <span className="text-[#d4af37]">Projects by</span> ANII
        </h1>
      </section>

      {/* FILTER */}
      <section className="pb-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">

          {[
            { label: 'All', value: 'all' },
            { label: 'Wedding', value: 'wedding' },
            { label: 'Pre Wedding', value: 'pre-wedding' },
            { label: 'Video Production', value: 'video-production' },
            { label: 'Fashion', value: 'fashion' },
          ].map(btn => (

            <button
              key={btn.value}
              onClick={() => {
                setActiveCategory(btn.value)
                setSelectedIndex(null)
              }}
              className={`px-6 py-2 rounded-full border
              ${activeCategory === btn.value
                ? 'bg-[#d4af37] text-black'
                : 'border-[#d4af37] text-[#d4af37]'}`}
            >
              {btn.label}
            </button>

          ))}

        </div>
      </section>

      {/* SECTIONS */}

      {activeCategory === 'all' && (
        <>
          {renderSection('Wedding', weddingAlbums)}
          {renderSection('Pre Wedding', preWeddingAlbums)}
          {renderSection('Video Production', videoAlbums)}
          {renderSection('Fashion', fashionAlbums)}
        </>
      )}

      {activeCategory === 'wedding' &&
        renderSection('Wedding', weddingAlbums)
      }

      {activeCategory === 'pre-wedding' &&
        renderSection('Pre Wedding', preWeddingAlbums)
      }

      {activeCategory === 'video-production' &&
        renderSection('Video Production', videoAlbums)
      }

      {activeCategory === 'fashion' &&
        renderSection('Fashion', fashionAlbums)
      }

      {/* ❌ REMOVED ORIGINAL GRID (CAUSE OF BUG) */}

      <Footer />
    </main>
  )
}