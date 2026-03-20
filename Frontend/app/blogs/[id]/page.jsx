
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function BlogDetailPage() {

  const params = useParams()
  const router = useRouter()
  const id = params.id

  const [blog, setBlog] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/collections/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data))
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

  const extraImages = blog.images || []

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

          {/* Hero Image with fixed aspect ratio */}
         {/* Hero Image */}
<div className="rounded-xl overflow-hidden mb-12 relative" style={{ paddingTop: '56.25%' }}>
  <img
    src={`http://localhost:5000${blog.cover_image || (blog.images && blog.images[0]?.image_url)}`}
    alt={blog.title}
    className="absolute top-0 left-0 w-full h-full object-cover"
  />
</div>

          {/* CONTENT + ADD */}
          <div className="text-gray-300 leading-relaxed whitespace-pre-line space-y-6 text-lg mb-10">
            {blog.description && blog.description.trim() !== '' ? (
              blog.description
            ) : (
              <>
                <p className="text-gray-500 italic mb-6">No content added yet.</p>

                {/* ➕ ADD CONTENT BUTTON */}
                <AddCard onClick={() => handleAddClick('content')} />
              </>
            )}
          </div>

          {/* EXTRA IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">

            {extraImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img
                  src={`http://localhost:5000${img.image_url}`}
                  alt="Blog visual"
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}

            {/* ➕ ADD IMAGE BUTTON */}
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