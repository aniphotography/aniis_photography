// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import Link from 'next/link'
// import { use } from 'react'

// export default function FashionDetailPage({ params }) {

//   const { id } = use(params)

//   // MASTER DATA (Used for Featured + Recent)
//   const allProjects = [
//     {
//       id: 1,
//       title: 'Urban Fashion',
//     },
//     {
//       id: 2,
//       title: 'Studio Portrait',
//     },
//     {
//       id: 3,
//       title: 'Fashion Editorial',
//     },
//     {
//       id: 4,
//       title: 'Luxury Campaign',
//     },
//     {
//       id: 5,
//       title: 'High Fashion Series',
//     },
//     {
//       id: 6,
//       title: 'Runway Collection',
//     },
//     {
//       id: 7,
//       title: 'Street Couture',
//     },
//     {
//       id: 8,
//       title: 'Minimal Aesthetic',
//     }
//   ]

//   const content = allProjects.find(
//     (item) => item.id === Number(id)
//   )

//   if (!content) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <h1 className="text-white font-display text-2xl">
//           PROJECT NOT FOUND
//         </h1>
//       </div>
//     )
//   }

//   return (
//     <main className="min-h-screen bg-[#0a0a0a] text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="pt-40 pb-20 text-center px-6">
//         <Link
//           href="/fashion"
//           className="text-gold text-xs uppercase tracking-[0.4em] mb-4 inline-block"
//         >
//           ← Back to Collections
//         </Link>

//         <h1 className="text-5xl md:text-7xl font-display mt-4">
//           <span className="text-gold italic">{content.title}</span>
//         </h1>
//       </section>

//       {/* Videos */}
//       <section className="py-10 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center gap-4 mb-12">
//             <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
//               Video Editorial
//             </span>
//             <div className="h-[1px] flex-1 bg-white/10"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1,2,3].map((_, i) => (
//               <div key={i} className="aspect-[2/3] bg-[#111] overflow-hidden border border-white/5 shadow-2xl">
//                 <video controls muted loop playsInline className="w-full h-full object-cover">
//                   <source src="/videos/prewedding.mp4" type="video/mp4" />
//                 </video>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Images */}
//       <section className="py-24 px-6 bg-[#080808]">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center gap-4 mb-12">
//             <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
//               Stills Gallery
//             </span>
//             <div className="h-[1px] flex-1 bg-white/10"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1,2,3].map((_, i) => (
//               <div key={i} className="aspect-[2/3] overflow-hidden group">
//                 <img
//                   src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
//                   alt=""
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//               </div>
//             ))}
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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function FashionDetailPage() {

  const params = useParams()
  const router = useRouter()

  const id = params.id

  const [project, setProject] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/collections/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err))
  }, [id])

  const handleAddClick = (type) => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin/login')
    } else {
      router.push(`/admin/dashboard?category=fashion&id=${id}&type=${type}`)
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white font-display text-2xl">
          Loading Project...
        </h1>
      </div>
    )
  }

  const videos = project.videos || []
  const images = project.images || []

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-40 pb-20 text-center px-6">
        <Link
          href="/fashion"
          className="text-gold text-xs uppercase tracking-[0.4em] mb-4 inline-block"
        >
          ← Back to Collections
        </Link>

        <h1 className="text-5xl md:text-7xl font-display mt-4">
          <span className="text-gold italic">{project.title}</span>
        </h1>
      </section>

      {/* VIDEOS */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
              Video Editorial
            </span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {videos.map((video, i) => (
              <div key={i} className="aspect-[2/3] bg-[#111] overflow-hidden border border-white/5 shadow-2xl">
                <video controls muted loop playsInline className="w-full h-full object-cover">
                  <source src={`http://localhost:5000${video}`} type="video/mp4" />
                </video>
              </div>
            ))}

            {Array.from({ length: 3 - videos.length }).map((_, index) => (
              <AddCard
                key={`video-add-${index}`}
                onClick={() => handleAddClick('video')}
              />
            ))}

          </div>

        </div>
      </section>

      {/* IMAGES */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
              Stills Gallery
            </span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {images.map((img, i) => (
              <div key={i} className="aspect-[2/3] overflow-hidden group">
                <img
                  src={`http://localhost:5000${img}`}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}

            {Array.from({ length: 3 - images.length }).map((_, index) => (
              <AddCard
                key={`img-add-${index}`}
                onClick={() => handleAddClick('image')}
              />
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

function AddCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center aspect-[2/3] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
    >
      <span className="text-5xl text-gold">+</span>
    </div>
  )
}
