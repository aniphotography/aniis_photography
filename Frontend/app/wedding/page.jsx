
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
            <span className="text-gold">Wedding</span> Photography
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

      <Footer />
    </main>
  )
}