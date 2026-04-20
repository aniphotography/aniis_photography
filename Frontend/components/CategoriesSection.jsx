
'use client'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

export default function CategoriesSection() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [dbData, setDbData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Check for Admin Status
    const token = localStorage.getItem('adminToken')
    setIsAdmin(!!token)

    // 2. Fetch data directly
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/home-content`)
        const json = await res.json()
        setDbData(json)
      } catch (err) {
        console.error("Categories Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
const videoRefs = {} 
  const handleAddClick = (e) => {
    e.preventDefault() 
    e.stopPropagation() 
    router.push('/admin/dashboard?section=services')
  }

  // Helper to find the specific image path for a slot
  const getImageUrl = (slotName) => {
    const item = dbData.find(d => d.slot === slotName)
    return item ? getMediaUrl(item.image_path) : null
  }

  // This maps your UI cards to the Database Slots
  const categories = [
    { id: 1, title: 'Wedding', slot: 'wedding', href: '/wedding', description: 'Capturing your special day with timeless elegance' },
    { id: 2, title: 'Pre-Wedding', slot: 'pre-wedding', href: '/pre-wedding', description: 'Romance and connection before the big day' },
    { id: 3, title: 'Video Production', slot: 'video-production', href: '/video-production', description: 'Professional brand and corporate video production' },
    { id: 4, title: 'Fashion', slot: 'fashion', href: '/fashion', description: 'High-fashion and editorial photography' },
    { id: 5, title: 'Album Design', slot: 'album-design', href: '/album-design', description: 'Creative album layouts and custom designs' },
  ]

  // const renderCard = (category, isWide = false) => {
  //   const image = getImageUrl(category.slot)
  //   const hasImage = !!image

  //   return (
  //     <Link 
  //       key={category.id}
  //       href={category.href}
  //       className={"group relative overflow-hidden h-80 rounded-2xl shadow-xl transition-all duration-300 block bg-[#0a0a0a] " + (isWide ? 'w-full lg:w-1/2' : 'w-full')}
  //     >
  //       {/* ===== PHOTO LAYER ===== */}
  //       {hasImage && (
  //         <img
  //           src={image}
  //           alt={category.title}
  //           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
  //         />
  //       )}

  //       {/* ===== CENTERED PLUS BUTTON (ONLY IF NO IMAGE AND IS ADMIN) ===== */}
  //       {!hasImage && isAdmin && (
  //         <div className="absolute inset-0 flex items-center justify-center z-30">
  //           <button
  //             onClick={handleAddClick}
  //             className="w-20 h-20 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gold text-gold text-4xl hover:bg-gold hover:text-black hover:border-solid transition-all transform hover:scale-110 shadow-2xl bg-black/40"
  //           >
  //             +
  //           </button>
  //         </div>
  //       )}

  //       {/* GRADIENT OVERLAY */}
  //       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

  //       {/* CONTENT */}
  //       <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20 pointer-events-none">
  //         <h3 className="text-3xl font-display text-white mb-2">
  //           {category.title}
  //         </h3>
  //         <p className="text-gray-200 text-sm font-lato opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  //           {category.description}
  //         </p>
  //         <div className="w-12 h-1 bg-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  //       </div>
  //     </Link>
  //   )
  // }
const renderCard = (category, isWide = false) => {
    const mediaPath = getImageUrl(category.slot)
    const hasMedia = !!mediaPath
    // Check if the file extension is a video format
    const isVideo = mediaPath?.match(/\.(mp4|webm|ogg)$/i)

    return (
      <Link 
        key={category.id}
        href={category.href}
        onMouseEnter={(e) => {
          const video = e.currentTarget.querySelector('video')
          if (video) video.play()
        }}
        onMouseLeave={(e) => {
          const video = e.currentTarget.querySelector('video')
          if (video) {
            video.pause()
            video.currentTime = 0 // Optional: Reset to start
          }
        }}
        className={"group relative overflow-hidden h-80 rounded-2xl shadow-xl transition-all duration-300 block bg-[#0a0a0a] " + (isWide ? 'w-full lg:w-1/2' : 'w-full')}
      >
        {/* ===== MEDIA LAYER ===== */}
        {hasMedia && (
          isVideo ? (
            <video
              src={mediaPath}
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
            />
          ) : (
            <img
              src={mediaPath}
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
            />
          )
        )}

        {/* ===== CENTERED PLUS BUTTON (ONLY IF NO MEDIA AND IS ADMIN) ===== */}
        {!hasMedia && isAdmin && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <button
              onClick={handleAddClick}
              className="w-20 h-20 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gold text-gold text-4xl hover:bg-gold hover:text-black hover:border-solid transition-all transform hover:scale-110 shadow-2xl bg-black/40 pointer-events-auto"
            >
              +
            </button>
          </div>
        )}

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20 pointer-events-none">
          <h3 className="text-3xl font-display text-white mb-2">
            {category.title}
          </h3>
          <p className="text-gray-200 text-sm font-lato opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {category.description}
          </p>
          <div className="w-12 h-1 bg-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    )
  }
  if (loading) return <div className="py-20 bg-black text-center text-gold">Loading Services...</div>


  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
        </div>

        <div className="flex flex-col gap-8">
          
          {/* TOP ROW: Fashion & Wedding (2 Large Boxes) */}
          <div className="flex flex-col md:flex-row gap-8">
            {categories
              .filter(cat => cat.id === 4 || cat.id === 1)
              .map((cat) => renderCard(cat, true)) 
            }
          </div>

          {/* BOTTOM ROW: Album Design, Video Production, Pre-Wedding (3 Smaller Boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              categories.find(c => c.id === 5), 
              categories.find(c => c.id === 2), 
              categories.find(c => c.id === 3)
            ]
              .filter(Boolean) // This prevents errors if a category isn't found
              .map((cat) => renderCard(cat, false))
            }
          </div>

        </div>
      </div>
    </section>
  )
      }