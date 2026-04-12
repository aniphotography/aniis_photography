
'use client'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://${API}:5000'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

export default function FeaturedSection() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [dbData, setDbData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Check for Admin Status
    const token = localStorage.getItem('adminToken')
    setIsAdmin(!!token)

    // 2. Fetch data directly from the API
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/home-content`)
        const json = await res.json()
        setDbData(json)
      } catch (err) {
        console.error("Featured Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddClick = (e) => {
    e.preventDefault() 
    e.stopPropagation() 
    router.push('/admin/dashboard?section=featured')
  }

  // Helper to find image for specific slots (slot1, slot2, slot3)
  const getImageUrl = (slotName) => {
    const item = dbData.find(d => d.slot === slotName && d.section === 'featured')
    return item ? getMediaUrl(item.image_path) : null
  }

  // Unified Data mapped to your DB Slots
  const featured = [
    {
      id: 1,
      title: 'Ethereal Elegance',
      category: 'Wedding',
      slot: 'slot1', 
      href: '/wedding',
    },
    {
      id: 2,
      title: 'Romance in Motion',
      category: 'Pre-Wedding',
      slot: 'slot2',
      href: '/pre-wedding',
    },
    {
      id: 3,
      title: 'Timeless Stories',
      category: 'Albums',
      slot: 'slot3',
      href: '/albums',
    },
  ]

  if (loading) return null; // Or a simple skeleton loader

  return (
    <section className="py-20 px-6 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display text-white mb-4">
            Signature <span className="text-gold">Collections</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((item) => {
            const dynamicImage = getImageUrl(item.slot)
            const hasImage = !!dynamicImage

            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative overflow-hidden h-96 cursor-pointer block bg-[#111] border border-white/5"
              >
                {/* BACKGROUND IMAGE LAYER */}
                {hasImage && (
                  <img
                    src={dynamicImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70"
                  />
                )}

                {/* ===== CENTERED PLUS BUTTON (ONLY IF NO IMAGE AND IS ADMIN) ===== */}
                {!hasImage && isAdmin && (
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <button
                      onClick={handleAddClick}
                      className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-dashed border-gold text-gold text-5xl hover:bg-gold hover:text-black hover:border-solid transition-all transform hover:scale-110 shadow-2xl bg-black/40"
                    >
                      +
                    </button>
                  </div>
                )}

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                {/* CONTENT LAYER */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-gold text-sm font-lato uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-display text-white mb-4">
                    {item.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}