
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

  const renderCard = (category, isWide = false) => {
    const image = getImageUrl(category.slot)
    const hasImage = !!image
// ... (previous logic for categories and renderCard remains the same)

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
        </div>

        <div className="flex flex-col gap-8">
          {/* --- TOP ROW: 2 LARGER BOXES (Fashion & Wedding) --- */}
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Fashion (ID 4) and Wedding (ID 1) */}
            {categories.filter(cat => cat.id === 4 || cat.id === 1).map((cat) => 
              renderCard(cat, true)
            )}
          </div>

          {/* --- BOTTOM ROW: 3 SMALLER BOXES (Album Design, Video Production, and Pre-Wedding) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Album Design (ID 5), Video Production (ID 3), and Pre-Wedding (ID 2) */}
            {[
              categories.find(c => c.id === 5), 
              categories.find(c => c.id === 3), 
              categories.find(c => c.id === 2)
            ].map((cat) => renderCard(cat))}
          </div>
        </div>
      </div>
    </section>
  )
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

  // if (loading) return <div className="py-20 bg-black text-center text-gold">Loading Services...</div>

  // return (
  //   <section className="py-20 px-6 bg-black">
  //     <div className="max-w-7xl mx-auto">
  //       <div className="text-center mb-16">
  //         <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
  //           Our <span className="text-gold">Services</span>
  //         </h2>
  //         <div className="w-12 h-1 bg-gold mx-auto mb-6" />
  //       </div>

  //       <div className="flex flex-col gap-8">
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {categories.slice(0, 3).map((cat) => renderCard(cat))}
  //         </div>

  //         <div className="flex flex-col md:flex-row justify-center gap-8">
  //           {categories.slice(3, 5).map((cat) => renderCard(cat, true))}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // )
  //     }