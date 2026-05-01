
'use client'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

export default function HeroSection() {
  const router = useRouter()
  
  // --- INTERNAL STATE ---
  const [heroData, setHeroData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API}/api/home-content`)
        const allData = await res.json()
        
        // Find the specific slot for the Hero
        const heroItem = allData.find(item => item.slot === 'main_hero')
        
        if (heroItem) {
          setHeroData({
            image: getMediaUrl(heroItem.image_path),
            title1: "Capturing", // You can eventually pull these from DB too
            title2: "Timeless Moments"
          })
        }
      } catch (err) {
        console.error("Hero Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHero()
  }, [])

  const handleAddClick = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      router.push('/admin/dashboard?section=hero')
    }
  }

  // Use heroData if found, otherwise it stays null (showing the Plus button)
  const hasImage = !!heroData?.image

  // Don't render anything until we know if we have data or not (prevents flickering)
  if (loading) return <div className="h-screen bg-black" />

  return (
    <section className="relative w-full h-screen bg-[#000] flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE LAYER */}
      {/* {hasImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 z-0 transition-opacity duration-1000"
          style={{ backgroundImage: `url("${heroData.image}")` }}
        />
      )} */}

      {/* 2. BIG CENTER PLUS BUTTON (Visible only if no image) */}
      {/* {!hasImage && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <button
            onClick={handleAddClick}
            className="group flex flex-col items-center justify-center gap-6 transition-all duration-300"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center border-4 border-dashed border-gold text-gold text-7xl rounded-full bg-black/40 hover:bg-gold hover:text-black hover:border-solid transition-all transform hover:scale-110 shadow-2xl">
              +
            </div>
            <span className="text-gold font-display tracking-[0.2em] uppercase text-sm bg-black/60 px-4 py-1 rounded">
              Add Hero Media
            </span>
          </button>
        </div>
      )} */}
      {/* 1. MEDIA BACKGROUND (Video or Image) */}
{heroData.image && (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {heroData.image.match(/\.(mp4|webm|mov)($|\?)/i) ? (
      <video
        src={heroData.image}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000"
      />
    ) : (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70 transition-opacity duration-1000"
        style={{ backgroundImage: `url("${heroData.image}")` }}
      />
    )}
  </div>
)}

{/* 2. BIG CENTER PLUS BUTTON (Visible ONLY if heroData.image is empty/null) */}
{!heroData.image && (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
    <button
      onClick={handleAddClick}
      className="group flex flex-col items-center justify-center gap-6 transition-all duration-300"
    >
      <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center border-4 border-dashed border-gold text-gold text-7xl rounded-full bg-black/40 hover:bg-gold hover:text-black hover:border-solid transition-all transform hover:scale-110 shadow-2xl">
        +
      </div>
      <span className="text-gold font-display tracking-[0.2em] uppercase text-sm bg-black/60 px-4 py-1 rounded">
        Add Hero Media
      </span>
    </button>
  </div>
)}

      {/* 3. MAIN CONTENT */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20 pointer-events-none">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          <span className="text-gold">{heroData?.title1 || 'Capturing'}</span>
          <br />
          <span className="text-white">{heroData?.title2 || 'Timeless Moments'}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12 font-lato font-light max-w-2xl mx-auto">
          Elegant photography that tells your story with artistry and sophistication
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
          <Link
            href="/contact"
            className="px-8 py-3 bg-gold text-black font-bold text-sm hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            Book a Session
          </Link>

          <Link
            href="/albums"
            className="px-8 py-3 border-2 border-gold text-gold font-bold text-sm hover:bg-gold hover:text-black transition-all duration-300"
          >
            View Portfolio
          </Link>
        </div>
      </div>

      {/* 4. GRADIENT OVERLAY (Always active for text contrast) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black pointer-events-none z-[5]" />
    </section>
  )
}