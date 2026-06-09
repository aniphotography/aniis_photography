
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  return /\.(mp4|mov|webm|ogg)(\?|$)/i.test(url) || url.includes('/video/upload/')
}

const buildPreviewFromMedia = (mediaItems = []) => {
  if (!Array.isArray(mediaItems) || mediaItems.length === 0) {
    return { previewUrl: null, previewIsVideo: false, trailerUrl: null }
  }

  const videoItem = mediaItems.find((item) => isVideoUrl(item?.image_url))
  const previewItem = videoItem || mediaItems[0]

  return {
    previewUrl: previewItem?.image_url ? getMediaUrl(previewItem.image_url) : null,
    previewIsVideo: isVideoUrl(previewItem?.image_url),
    trailerUrl: previewItem?.youtube_url || null,
  }
}

export default function FashionPage() {
  const router = useRouter()
  const [featuredGallery, setFeaturedGallery] = useState([])
  const [recentWork, setRecentWork] = useState([])
  const [brandLogos, setBrandLogos] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
const [homeData, setHomeData] = useState([]);
const [fashionHeader, setFashionHeader] = useState(null);
useEffect(() => {
  Promise.all([
    fetch(`${API}/api/collections?category=fashion&section=featured`),
    fetch(`${API}/api/collections?category=fashion&section=recent`),
    fetch(`${API}/api/home-content`)
  ])
    .then(async (responses) => {
      if (responses.some((res) => !res.ok)) {
        throw new Error('One or more Fashion API requests failed')
      }

      const [fData, rData, hData] = await Promise.all(responses.map((res) => res.json()))

      const enrichWithPreviews = async (items) => Promise.all(
        items.map(async (item) => {
          try {
            const mediaRes = await fetch(`${API}/api/media?collection_id=${item.id}`)
            if (!mediaRes.ok) {
              return {
                ...item,
                previewUrl: getMediaUrl(item.cover_video || item.video_url),
                previewIsVideo: isVideoUrl(item.cover_video || item.video_url),
                trailerUrl: item.youtube_url || null,
              }
            }

const mediaItems = await mediaRes.json()
const preview = buildPreviewFromMedia(mediaItems)
            return {
              ...item,
              previewUrl: preview.previewUrl || getMediaUrl(item.cover_video || item.video_url),
              previewIsVideo: preview.previewIsVideo || isVideoUrl(item.cover_video || item.video_url),
              trailerUrl: preview.trailerUrl || item.youtube_url || null,
            }
          } catch (error) {
            console.error('Fashion preview lookup failed:', item.id, error)
            return {
              ...item,
              previewUrl: getMediaUrl(item.cover_video || item.video_url),
              previewIsVideo: isVideoUrl(item.cover_video || item.video_url),
              trailerUrl: item.youtube_url || null,
            }
          }
        })
      )

      const [featuredWithPreviews, recentWithPreviews] = await Promise.all([
        enrichWithPreviews(fData),
        enrichWithPreviews(rData),
      ])

      setFeaturedGallery(featuredWithPreviews)
      setRecentWork(recentWithPreviews)

      const fashionBg = hData.find(item => 
        item.section === 'services' && item.slot === 'fashion_bg'
      )

      if (fashionBg) {
        setFashionHeader(fashionBg)
      }
    })
    .catch(err => console.error('Fashion fetch error:', err))
}, []);
  // Check admin status
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    setIsAdmin(!!token)
  }, [])

  const handleAddClick = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      router.push('/admin/dashboard?category=fashion')
    }
  }

  useEffect(() => {
    fetch(`${API}/api/media?tag=logo`)
      .then(res => {
        if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBrandLogos(data)
        }
      })
      .catch(err => console.error('Brand logos fetch error:', err))
  }, [])
const bgImage = fashionHeader?.image_path 
  ? (fashionHeader.image_path.startsWith('http') 
      ? fashionHeader.image_path 
      : `${API}${fashionHeader.image_path}`) 
  : null;
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* HEADER */}
 <section 
        className="relative h-[500px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      >

  {/* 2. The Dark Overlay - Keeps the "Fashion Collections" text readable */}
  
   <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-display mb-4">
      <span className="text-gold italic">Fashion</span> Collections
    </h1>
    <p className="text-gray-300 text-xs tracking-[0.4em] uppercase">
      The Motion Collection
    </p>
  </div>
</section>

      {/* FEATURED */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-display uppercase tracking-widest">
              Featured
            </h2>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGallery.map((item) => (
              <HoverVideoCard key={item.id} item={item} />
            ))}

            {/* ✅ Only show AddCard if admin and there is space in the grid */}
            {isAdmin && Array.from({ length: Math.max(0, 3 - featuredGallery.length) }).map((_, index) => (
              <AddCard key={`feat-add-${index}`} handleAddClick={handleAddClick} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND SLIDER */}
      <section className="py-20 bg-black/30 border-y border-white/5 my-10">
        <div className="relative overflow-hidden w-full px-6">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

          <div className="flex gap-10 animate-scroll w-max items-center">
            {brandLogos && brandLogos.length > 0 ? (
              [...brandLogos, ...brandLogos].map((logo, i) => (
                <div key={i} className="flex-shrink-0 w-64 h-48 overflow-hidden group flex items-center justify-center">
                  <img
                    src={typeof logo === 'string' ? logo : getMediaUrl(logo.image_url)}
                    alt="Brand Logo"
                    className="w-full h-full object-contain p-6 transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
              ))
            ) : (
              Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex-shrink-0 w-64 h-48 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-sm">
                  Logo Slot
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-display uppercase tracking-widest">
              Recent Work
            </h2>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentWork.map((item) => (
              <HoverVideoCard key={item.id} item={item} />
            ))}
            
            {/* ✅ Only show AddCard if admin logged in */}
            {isAdmin && <AddCard handleAddClick={handleAddClick} />}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </main>
  )
}

function HoverVideoCard({ item }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {})
          } else {
            if (videoRef.current) {
              videoRef.current.pause()
              videoRef.current.currentTime = 0
            }
          }
        })
      },
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

const previewSrc = item.previewUrl || getMediaUrl(item.cover_video || item.video_url)
  const previewIsVideo =
  item.previewIsVideo ??
  isVideoUrl(previewSrc)
// console.log({
//   id: item.id,
//   title: item.title,
//   previewSrc,
//   previewIsVideo,
//   cover_video: item.cover_video,
//   video_url: item.video_url,
// })
  return (
    <Link href={`/fashion/${item.id}`}>
      <div
        ref={containerRef}
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
          }
        }}
        className="relative aspect-[2/3] w-full overflow-hidden rounded-sm cursor-pointer group bg-[#111]"
      >
        {previewSrc ? previewIsVideo ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
            onError={() => {
              console.error('Fashion preview video failed to load:', {
                id: item.id,
                src: previewSrc,
              })
            }}
          >
            <source src={previewSrc} />
          </video>
        ) : (
          <img
            src={previewSrc}
            alt={item.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
            onError={() => {
              console.error('Fashion preview image failed to load:', {
                id: item.id,
                src: previewSrc,
              })
            }}
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h3 className="text-xl font-display text-white group-hover:text-gold transition-colors duration-300 transform group-hover:-translate-y-1">
            {item.title}
          </h3>
          <p className="text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
            Explore Project
          </p>
        </div>
      </div>
    </Link>
  )
}
function AddCard({ handleAddClick }) {
  return (
    <div
      onClick={handleAddClick}
      className="flex items-center justify-center aspect-[2/3] border-2 border-dashed border-gold rounded-sm cursor-pointer hover:bg-white/5 transition"
    >
      <span className="text-5xl text-gold">+</span>
    </div>
  )
}