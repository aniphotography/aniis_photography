
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://${API}:5000'
export default function PreWeddingPage() {
  const router = useRouter()

  const [featuredCollections, setFeaturedCollections] = useState([])
  const [recentWorks, setRecentWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/collections?category=pre-wedding&section=featured`),
      fetch(`${API}/api/collections?category=pre-wedding&section=recent`),
      fetch(`${API}/api/home-content`) // Fetching global home content
    ])
      .then(async ([fRes, rRes, hRes]) => { // Correctly destructuring all 3 responses
        const fData = await fRes.json()
        const rData = await rRes.json()
        const hData = await hRes.json()

        setFeaturedCollections(fData)
        setRecentWorks(rData)

        // Find the slot dedicated to the pre-wedding page header background
        const preWedBg = hData.find(item => item.slot === 'pre-wedding_bg')
        if (preWedBg) {
          setBgImage(getMediaUrl(preWedBg.image_path))
        }
        
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [])

  const handleAddClick = () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin/login')
    } else {
      router.push('/admin/dashboard?category=pre-wedding')
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* ===== HERO SECTION (Dynamic Background) ===== */}
      <section 
        className="relative h-[500px] overflow-hidden bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundColor: '#1a1a1a' 
        }}
      >
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-display mb-4">
            <span className="text-gold">Pre-Wedding</span> Moments
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg">
            Romantic storytelling through cinematic pre-wedding artistry
          </p>
        </div>
      </section>

      {/* ===== FEATURED LOVE STORIES ===== */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Love Stories</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {featuredCollections.length > 0 ? (
              featuredCollections.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/pre-wedding/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={getMediaUrl(item.cover_image)}
                      className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
                      alt={item.title}
                    />
                  </div>
                  <h3 className="text-center text-2xl mt-6 text-gold">
                    {item.title}
                  </h3>
                </div>
              ))
            ) : (
              <div
                onClick={handleAddClick}
                className="flex items-center justify-center h-[350px] border-2 border-dashed border-gold rounded-xl cursor-pointer hover:bg-white/5 transition"
              >
                <span className="text-5xl text-gold">+</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== RECENT WORKS ===== */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Our <span className="text-gold">Recent Works</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {recentWorks.length > 0 ? (
              recentWorks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/pre-wedding/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={getMediaUrl(item.cover_image)}
                      className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
                      alt={item.title}
                    />
                  </div>
                  <h3 className="text-center text-lg mt-4 text-gray-300">
                    {item.title}
                  </h3>
                </div>
              ))
            ) : (
              <div
                onClick={handleAddClick}
                className="flex items-center justify-center h-[300px] border-2 border-dashed border-gold rounded-xl cursor-pointer hover:bg-white/5 transition"
              >
                <span className="text-5xl text-gold">+</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}