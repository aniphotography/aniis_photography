// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'

// export default function WeddingPage() {
//   const router = useRouter()
//   const [collections, setCollections] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetch('http://localhost:5000/api/collections?category=wedding')
//       .then(res => res.json())
//       .then(data => {
//         setCollections(data)
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

//   const featuredCollections = collections.slice(0, 2)
//   const recentWorks = collections.slice(2)

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
//                       src={`http://localhost:5000${item.cover_image}`}
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
//                       src={`http://localhost:5000${item.cover_image}`}
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
//               collections.length > 0 ? null : (
//                 <div
//                   onClick={handleAddClick}
//                   className="flex items-center justify-center h-[300px] border-2 border-dashed border-gold rounded-xl cursor-pointer hover:bg-white/5 transition"
//                 >
//                   <span className="text-5xl text-gold">+</span>
//                 </div>
//               )
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

export default function WeddingPage() {
  const router = useRouter()

  const [featuredCollections, setFeaturedCollections] = useState([])
  const [recentWorks, setRecentWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/collections?category=wedding&section=featured'),
      fetch('http://localhost:5000/api/collections?category=wedding&section=recent')
    ])
      .then(async ([fRes, rRes]) => {
        const fData = await fRes.json()
        const rData = await rRes.json()

        setFeaturedCollections(fData)
        setRecentWorks(rData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
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

      {/* ===== HERO SECTION (UNCHANGED) ===== */}
      <section className="relative h-[500px] overflow-hidden">
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
                      src={`http://localhost:5000${item.cover_image}`}
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
                      src={`http://localhost:5000${item.cover_image}`}
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