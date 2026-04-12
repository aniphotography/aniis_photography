'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
export default function BlogDetailPage() {

  const params = useParams()
  const router = useRouter()
  const id = params.id

  const [blog, setBlog] = useState(null)

  // ✅ NEW: media state
  const [media, setMedia] = useState([])

  useEffect(() => {
    fetch(`${API}/api/collections/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error(err))

    // ✅ NEW: fetch media separately
    fetch(`${API}/api/media?collection_id=${id}`)
      .then(res => res.json())
      .then(data => setMedia(data))
      .catch(err => console.error(err))

  }, [id])

  const handleAddClick = (type) => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin/login')
    } else {
      router.push(`/admin/dashboard?category=blogs&id=${id}&type=${type}`)
    }
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white font-display text-2xl">
          Loading Blog...
        </h1>
      </div>
    )
  }

  // ❌ OLD (kept but unused)
  const extraImages = blog.images || []

  // ✅ NEW: split TEXT and MEDIA properly
  const textContent = media
    .filter(item => item.tag === 'text')
    .map(item => item.content)
    .join('\n\n')

  const mediaItems = media.filter(item => item.tag !== 'text')

  // ✅ NEW: hero fallback
  const firstImageMedia = mediaItems.find(
    m => m.image_url && !m.image_url.endsWith('.mp4')
  )

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-gray-500 uppercase text-sm mb-10 tracking-widest">
            {blog.date}
          </p>

          {/* Hero Image */}
          <div
            className="rounded-xl overflow-hidden mb-12 relative"
            style={{ paddingTop: '56.25%' }}
          >
            <img
              src={getMediaUrl(blog.cover_image || firstImageMedia?.image_url || '')}
              alt={blog.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* ✅ FIXED CONTENT SECTION */}
          <div className="text-gray-300 leading-relaxed whitespace-pre-line space-y-6 text-lg mb-10">

            {textContent ? (
              textContent
            ) : (
              <>
                <p className="text-gray-500 italic mb-6">
                  No content added yet.
                </p>

                <AddCard onClick={() => handleAddClick('content')} />
              </>
            )}

          </div>

          {/* ✅ FIXED GRID (ONLY MEDIA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">

            {mediaItems.map((item, i) => (

              <div key={i} className="rounded-xl overflow-hidden">

                {/* VIDEO */}
                {item.image_url?.endsWith('.mp4') ? (
                  <video
                    src={getMediaUrl(item.image_url)}
                    controls
                    autoPlay
                    muted
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  /* IMAGE */
                  <img
                    src={getMediaUrl(item.image_url)}
                    alt="Blog visual"
                    className="w-full h-96 object-cover"
                  />
                )}

              </div>

            ))}

            {/* ➕ ADD IMAGE BUTTON */}
            <AddCard onClick={() => handleAddClick('image')} />

          </div>

          {/* ❌ OLD SECTION (KEPT INTACT BUT HIDDEN) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 hidden">

            {extraImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img
                  src={getMediaUrl(img.image_url)}
                  alt="Blog visual"
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}

            {Array.from({
              length: Math.max(0, 2 - extraImages.length)
            }).map((_, index) => (
              <AddCard
                key={`img-add-${index}`}
                onClick={() => handleAddClick('image')}
              />
            ))}

          </div>

        </div>
      </article>

      <Footer />
    </main>
  )
}

// AddCard Component
function AddCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center h-72 border-2 border-dashed border-gold rounded-xl cursor-pointer hover:bg-white/5 transition"
    >
      <span className="text-5xl text-gold">+</span>
    </div>
  )
}