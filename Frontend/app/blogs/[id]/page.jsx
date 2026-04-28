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
const [showTrailer, setShowTrailer] = useState(false)
  const [blog, setBlog] = useState(null)

  // ✅ NEW: media state
  const [media, setMedia] = useState([])

  // ✅ NEW: admin login state
  const [isAdmin, setIsAdmin] = useState(false)

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

  // ✅ NEW: check admin login
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    if (isMobile) {
      localStorage.removeItem('adminToken'); // optional but recommended
      setIsAdmin(false);
    } else {
      const token = localStorage.getItem('adminToken');
      setIsAdmin(!!token);
    }
  }, []);

  const handleAddClick = (type) => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin/login')
    } else {
      router.push(`/admin/dashboard?category=blogs&id=${id}&type=${type}`)
    }
  }
const handleWatchStory = () => {
    // Dynamically check for a link in the blog data
    // Replace 'video_url' or 'story_url' with the actual key from your backend
    const storyLink = blog.video_url || blog.story_url;

    if (storyLink) {
      window.open(storyLink, '_blank', 'noopener,noreferrer');
    } else {
      alert("We are Eagerly Waiting to show you the Story. Working on It. Coming Very Soon.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: `Check out this story: ${blog.title}`,
      url: window.location.href, // Dynamically gets the current page URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      // Fallback for browsers that don't support native sharing
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! Share it anywhere.');
      } catch (err) {
        alert('Could not copy link.');
      }
    }
  };

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

                {isAdmin && <AddCard onClick={() => handleAddClick('content')} />}
              </>
            )}

          </div>

          {/* ✅ FIXED GRID (ONLY MEDIA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">

            {mediaItems.map((item, i) => (

              <div key={i} className="rounded-xl overflow-hidden">

                {/* VIDEO */}
                {item.image_url?.endsWith('.mp4') ? (
                  <video autoPlay loop muted playsInline                    src={getMediaUrl(item.image_url)}
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
            {isAdmin && <AddCard onClick={() => handleAddClick('image')} />}

          </div>
          {/* ✅ DYNAMIC ACTION BUTTONS - PLACED AT THE END OF CONTENT */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-20 mb-10 border-t border-white/10 pt-12">
            
            {/* Watch Story Button */}
            <button
  onClick={() => {
  const link = blog.youtube_url || blog.video_url || blog.external_url

  if (!link) {
    alert("We are Eagerly Waiting to show you the Story. Coming Soon.")
    return
  }

  const isYouTube = /youtube\.com|youtu\.be/.test(link)

  if (isYouTube) {
    setShowTrailer(true)
  } else {
    window.open(link, '_blank', 'noopener,noreferrer')
  }
}}
              className="group relative flex items-center justify-center px-8 py-4 bg-white text-black rounded-full transition-all hover:scale-105 active:scale-95 w-full sm:w-64"
            >
              <span className="font-display font-bold uppercase tracking-widest text-sm">
                Watch Story
              </span>
              <svg className="w-4 h-4 ml-2 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            {/* Share Story Button */}
            <button
              onClick={async () => {
                const shareData = {
                  title: blog.title,
                  text: `Check out this story: ${blog.title}`,
                  url: window.location.href,
                };

                if (navigator.share) {
                  try {
                    await navigator.share(shareData);
                  } catch (err) {
                    console.log('Share cancelled');
                  }
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-full transition-all hover:bg-white/10 hover:border-white active:scale-95 w-full sm:w-64"
            >
              <span className="font-display font-bold uppercase tracking-widest text-sm">
                Share Story
              </span>
              <svg className="w-4 h-4 ml-2 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>

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
{/* YOUTUBE EMBED MODAL */}
{showTrailer && (
  <div
    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex flex-col items-center justify-center p-6"
    onClick={() => setShowTrailer(false)}
  >
    <button
      onClick={() => setShowTrailer(false)}
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
          const url = blog.youtube_url || blog.video_url || ''
          // Convert youtube.com/watch?v=ID or youtu.be/ID to embed URL
          const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
          return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url
        })()}
        className="w-full h-full"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
    </div>
    <p className="text-gray-500 text-xs mt-4 uppercase tracking-widest">
      Click outside to close
    </p>
  </div>
)}
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