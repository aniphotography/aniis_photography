
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function FashionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const [project, setProject] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
const [trailerUrl, setTrailerUrl] = useState(null)
  useEffect(() => {
    setIsMounted(true)
    
    // Check admin status
    const token = localStorage.getItem('adminToken')
    setIsAdmin(!!token)

    // Fetch Project Data
    fetch(`${API}/api/collections/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err))
  }, [id])

  const handleAddClick = (type) => {
    if (!isAdmin) {
      router.push('/admin/login')
    } else {
      router.push(`/admin/dashboard?category=fashion&id=${id}&type=${type}`)
    }
  }

  if (!isMounted || !project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white font-display text-2xl">
          Loading Project...
        </h1>
      </div>
    )
  }

  const allMedia = project.images || []
  const videos = allMedia.filter(m =>
    m.image_url?.match(/\.(mp4|mov|avi)$/i)
  )

  const images = allMedia.filter(m =>
    !m.image_url?.match(/\.(mp4|mov|avi)$/i)
  )

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-40 pb-20 text-center px-6">
        <Link
          href="/fashion"
          className="text-gold text-xs uppercase tracking-[0.4em] mb-4 inline-block hover:opacity-70 transition-opacity"
        >
          ← Back to Collections
        </Link>

        <h1 className="text-5xl md:text-7xl font-display mt-4">
          <span className="text-gold italic">{project.title}</span>
        </h1>
      </section>

      {/* VIDEOS */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
              Video Collections
            </span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {videos.map((video, i) => (
  <div key={i} className="aspect-[2/3] bg-[#111] overflow-hidden border border-white/5 shadow-2xl relative group">
    <video controls muted loop playsInline className="w-full h-full object-cover">
      <source src={getMediaUrl(video.image_url)} type="video/mp4" />
    </video>
    
    {/* WATCH TRAILER BUTTON */}
    {video.youtube_url && (
      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setTrailerUrl(video.youtube_url)}
          className="flex items-center gap-2 px-6 py-3 bg-black/80 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Trailer
        </button>
      </div>
    )}
  </div>
))}

            {/* ✅ Only show AddCard if admin is logged in */}
            {isAdmin && Array.from({ length: Math.max(0, 3 - videos.length) }).map((_, index) => (
              <AddCard
                key={`video-add-${index}`}
                onClick={() => handleAddClick('video')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* IMAGES */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
              Stills Gallery
            </span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {images.map((img, i) => (
              <div key={i} className="aspect-[2/3] overflow-hidden group border border-white/5">
                <img
                  src={getMediaUrl(img.image_url)}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}

            {/* ✅ Only show AddCard if admin is logged in */}
            {isAdmin && Array.from({ length: Math.max(0, 3 - images.length) }).map((_, index) => (
              <AddCard
                key={`img-add-${index}`}
                onClick={() => handleAddClick('image')}
              />
            ))}
          </div>
        </div>
      </section>
{/* TRAILER MODAL */}
{trailerUrl && (
  <div
    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex flex-col items-center justify-center p-6"
    onClick={() => setTrailerUrl(null)}
  >
    <button
      onClick={() => setTrailerUrl(null)}
      className="absolute top-6 right-8 text-gold text-3xl hover:text-white transition"
    >
      ✕
    </button>
    <div
      className="w-full max-w-4xl aspect-video"
      onClick={e => e.stopPropagation()}
    >
      <iframe
        src={(() => {
          const match = trailerUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
          return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : trailerUrl
        })()}
        className="w-full h-full"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
    </div>
    <p className="text-gray-500 text-xs mt-4 uppercase tracking-widest">Click outside to close</p>
  </div>
)}
      <Footer />
    </main>
  )
}

function AddCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center aspect-[2/3] border-2 border-dashed border-gold rounded-sm cursor-pointer hover:bg-white/5 transition"
    >
      <span className="text-5xl text-gold">+</span>
    </div>
  )
}