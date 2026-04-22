
// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'

// export default function WeddingPage() {
//   const router = useRouter()

//   const [featuredCollections, setFeaturedCollections] = useState([])
//   const [recentWorks, setRecentWorks] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     Promise.all([
//       fetch(`${API}/api/collections?category=wedding&section=featured'),
//       fetch(`${API}/api/collections?category=wedding&section=recent')
//     ])
//       .then(async ([fRes, rRes]) => {
//         const fData = await fRes.json()
//         const rData = await rRes.json()

//         setFeaturedCollections(fData)
//         setRecentWorks(rData)
//         setLoading(false)
//       })
//       .catch(() => setLoading(false))
//   }, [])

//   const handleAddClick = () => {
//     const token = localStorage.getItem('adminToken')

//     if (!token) {
//       router.push('/admin/login')
//     } else {
//       router.push('/admin/dashboard?category=wedding')
//     }
//   }

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white">
//       <Navbar />

//       {/* ===== HERO SECTION (UNCHANGED) ===== */}
//       <section className="relative h-[500px] overflow-hidden">
//         <div className="absolute inset-0 bg-black/70" />
//         <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
//           <h1 className="text-6xl md:text-7xl font-display mb-4">
//             <span className="text-gold">Wedding</span> Photography
//           </h1>
//           <p className="text-gray-300 font-lato max-w-2xl text-lg">
//             Capturing timeless love stories with elegance and artistry
//           </p>
//         </div>
//       </section>

//       {/* ===== FEATURED COLLECTIONS ===== */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-display text-center mb-12">
//             Featured <span className="text-gold">Collections</span>
//           </h2>

//           <div className="grid md:grid-cols-2 gap-12">
//             {featuredCollections.length > 0 ? (
//               featuredCollections.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => router.push(`/wedding/${item.id}`)}
//                   className="group cursor-pointer"
//                 >
//                   <div className="overflow-hidden rounded-[2rem] border border-white/10">
//                     <img
//                       src={getMediaUrl(item.cover_image)}
//                       className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
//                       alt={item.title}
//                     />
//                   </div>
//                   <h3 className="text-center text-2xl mt-6 text-gold">
//                     {item.title}
//                   </h3>
//                 </div>
//               ))
//             ) : (
//               <div
//                 onClick={handleAddClick}
//                 className="flex items-center justify-center h-[350px] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
//               >
//                 <span className="text-5xl text-gold">+</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* ===== RECENT WORKS ===== */}
//       <section className="py-20 px-6 bg-black">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-display text-center mb-12">
//             Our <span className="text-gold">Recent Works</span>
//           </h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {recentWorks.length > 0 ? (
//               recentWorks.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => router.push(`/wedding/${item.id}`)}
//                   className="group cursor-pointer"
//                 >
//                   <div className="overflow-hidden rounded-xl border border-white/10">
//                     <img
//                       src={getMediaUrl(item.cover_image)}
//                       className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
//                       alt={item.title}
//                     />
//                   </div>
//                   <h3 className="text-center text-lg mt-4 text-gray-300">
//                     {item.title}
//                   </h3>
//                 </div>
//               ))
//             ) : (
//               <div
//                 onClick={handleAddClick}
//                 className="flex items-center justify-center h-[300px] border-2 border-dashed border-gold rounded-xl cursor-pointer hover:bg-white/5 transition"
//               >
//                 <span className="text-5xl text-gold">+</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }

'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
export default function WeddingPage() {
  const router = useRouter()

  const [featuredCollections, setFeaturedCollections] = useState([])
  const [recentWorks, setRecentWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    Promise.all([
     fetch(`${API}/api/collections?category=wedding&section=featured`),
      fetch(`${API}/api/collections?category=wedding&section=recent`),
      fetch(`${API}/api/home-content`)
    ])
      // FIX: Destructure ALL THREE responses [fRes, rRes, hRes]
      .then(async ([fRes, rRes, hRes]) => {
        const fData = await fRes.json()
        const rData = await rRes.json()
        const hData = await hRes.json()
        
        setFeaturedCollections(fData)
        setRecentWorks(rData)
        
        const weddingBg = hData.find(item => item.slot === 'wedding_bg')
        if (weddingBg) {
          setBgImage(getMediaUrl(weddingBg.image_path))
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
      router.push('/admin/dashboard?category=wedding')
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative h-[500px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-display mb-4">
            <span className="text-gold">Weddingz</span> by Anii
          </h1>
          <p className="text-gray-300 font-lato max-w-2xl text-lg">
            Capturing timeless love stories with elegance and artistry
          </p>
        </div>
      </section>

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Featured <span className="text-gold">Collections</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {featuredCollections.length > 0 ? (
              featuredCollections.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/wedding/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-[2rem] border border-white/10">
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
                className="flex items-center justify-center h-[350px] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
              >
                <span className="text-5xl text-gold">+</span>
              </div>
            )}
          </div>
        </div>
      </section>
{/* Qoute */}

<div className="w-full py-16 text-center bg-black">
  <div className="inline-block relative">
    <p className="text-white text-xl md:text-3xl font-medium tracking-[0.3em] uppercase opacity-90 leading-relaxed">
      Capturing the <span style={{ color: "#d4af37" }}>majesty</span> 
      <span className="block text-sm tracking-[0.5em] mt-4 opacity-70">
        of your once-in-a-lifetime moments
      </span>
    </p>
    
    {/* The Straight Line */}
    <div className="mt-8 w-24 h-[1px] bg-[#d4af37] mx-auto opacity-60"></div>
  </div>
</div>
      {/* ===== RECENT WORKS ===== */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Our <span className="text-gold">Recent Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {recentWorks.length > 0 ? (
              recentWorks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/wedding/${item.id}`)}
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
<section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-light mb-20 tracking-wide">
          Why Weddingz by Anii ?
        </h2>

        {/* Top Row: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Connection</h3>
            <p className="text-gray-300 leading-relaxed">
              The best photographs happen when you feel completely like yourself. We prioritize building a genuine relationship with you before the big day, ensuring you feel relaxed, comfortable, and natural in front of the lens.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Preparation</h3>
            <p className="text-gray-300 leading-relaxed">
              Your wedding is completely unique, and understanding your vision is our priority. We dive deeply into every detail of your itinerary, allowing us to offer expert suggestions and plan the perfect shots for your events.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Ease</h3>
            <p className="text-gray-300 leading-relaxed">
              On your wedding day, the last thing you need is added stress. We operate with a seamless, unobtrusive approach, letting the day flow smoothly so you can stay in the moment while we capture the magic.
            </p>
          </div>
        </div>

        {/* Bottom Row: 2 Columns Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-4 md:text-right">
            <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Artistry</h3>
            <p className="text-gray-300 leading-relaxed">
              We do not just document your day; we craft visual stories. Bringing a creative eye to every venue, we look for unique angles, gorgeous lighting, and authentic emotions to turn your memories into timeless art.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Grandeur</h3>
            <p className="text-gray-300 leading-relaxed">
              Every great love story deserves a cinematic touch. We focus on capturing the scale, beauty, and spectacular energy of your celebration, delivering a final gallery that feels monumental and truly grand.
            </p>
          </div>
        </div>
      </div>
    </section>
      <Footer />
    </main>
  )
}