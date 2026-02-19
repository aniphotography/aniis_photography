// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import Link from 'next/link'
// import { use } from 'react'

// export default function FashionDetailPage({ params }) {

//   const { id } = use(params)

//   const fashionData = {
//     1: {
//       title: 'Urban Fashion',
//       videos: ['/videos/prewedding.mp4'],
//       images: [
//         'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
//         'https://images.unsplash.com/photo-1495568720989-cebdbdd97913?w=800',
//       ]
//     },
//     2: {
//       title: 'Studio Portrait',
//       videos: ['/videos/prewedding.mp4'],
//       images: [
//         'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
//         'https://images.unsplash.com/photo-1434637866556-6b63c891057d?w=800',
//       ]
//     },
//     3: {
//       title: 'Fashion Editorial',
//       videos: ['/videos/prewedding.mp4'],
//       images: [
//         'https://images.unsplash.com/photo-1539571696357-5a69c006ad1c?w=800',
//         'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
//       ]
//     },
//   }

//   const content = fashionData[id]

//   if (!content) return <div className="text-white">Not Found</div>

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="pt-32 pb-16 text-center">
//         <h1 className="text-6xl font-display">
//           <span className="text-gold">{content.title}</span>
//         </h1>
//       </section>

//       {/* Videos */}
//       <section className="py-10 px-6">
//         <div className="max-w-5xl mx-auto space-y-8">
//           {content.videos.map((video, i) => (
//             <video
//               key={i}
//               controls
//               className="w-full rounded-lg border border-gold"
//             >
//               <source src={video} type="video/mp4" />
//             </video>
//           ))}
//         </div>
//       </section>

//       {/* Images */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//           {content.images.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               className="w-full h-80 object-cover rounded-lg"
//             />
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }
// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import Link from 'next/link'
// import { use } from 'react'

// export default function FashionDetailPage({ params }) {

//   const { id } = use(params)

//   const fashionData = {
//     1: {
//       title: 'Urban Fashion',
//       videos: ['/videos/prewedding.mp4'],
//       images: [
//         'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
//         'https://images.unsplash.com/photo-1495568720989-cebdbdd97913?w=800',
//         'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
//       ]
//     },
//     2: {
//       title: 'Studio Portrait',
//       videos: ['/videos/prewedding.mp4'],
//       images: [
//         'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
//         'https://images.unsplash.com/photo-1434637866556-6b63c891057d?w=800',
//         'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
//       ]
//     },
//     3: {
//       title: 'Fashion Editorial',
//       videos: ['/videos/prewedding.mp4'],
//       images: [
//         'https://images.unsplash.com/photo-1539571696357-5a69c006ad1c?w=800',
//         'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
//         'https://images.unsplash.com/photo-1495568720989-cebdbdd97913?w=800',
//       ]
//     },
//   }

//   const content = fashionData[id]

//   if (!content) return (
//     <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
//       <h1 className="text-white font-display text-2xl tracking-widest uppercase">Project Not Found</h1>
//     </div>
//   )

//   return (
//     <main className="min-h-screen bg-[#0a0a0a] text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="pt-40 pb-20 text-center px-6">
//         <Link href="/fashion" className="text-gold text-xs uppercase tracking-[0.4em] mb-4 inline-block hover:opacity-60 transition-opacity">
//           ← Back to Collections
//         </Link>
//         <h1 className="text-5xl md:text-7xl font-display mt-4">
//           <span className="text-gold italic">{content.title}</span>
//         </h1>
//       </section>

//       {/* Vertical Video Section - Matching the 2:3 style */}
//       <section className="py-10 px-6">
//         <div className="max-w-xl mx-auto"> {/* Max-w-xl keeps the portrait video from being too wide */}
//           <div className="flex items-center gap-4 mb-8">
//             <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Video Editorial</span>
//             <div className="h-[1px] flex-1 bg-white/10"></div>
//           </div>
          
//           {content.videos.map((video, i) => (
//             <div key={i} className="relative aspect-[2/3] w-full bg-[#111] rounded-sm overflow-hidden border border-white/5 shadow-2xl">
//               <video
//                 controls
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-full object-cover"
//               >
//                 <source src={video} type="video/mp4" />
//               </video>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Photography Grid */}
//       <section className="py-24 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center gap-4 mb-12">
//             <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Stills Gallery</span>
//             <div className="h-[1px] flex-1 bg-white/10"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {content.images.map((img, i) => (
//               <div key={i} className="relative aspect-[2/3] overflow-hidden group">
//                 <img
//                   src={img}
//                   alt={`${content.title} ${i}`}
//                   className="w-full h-full object-cover rounded-sm transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
import { use } from 'react'

export default function FashionDetailPage({ params }) {

  const { id } = use(params)

  const fashionData = {
    1: {
      title: 'Urban Fashion',
      // Added 3 videos to data
      videos: ['/videos/prewedding.mp4', '/videos/prewedding.mp4', '/videos/prewedding.mp4'],
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        'https://images.unsplash.com/photo-1495568720989-cebdbdd97913?w=800',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
      ]
    },
    2: {
      title: 'Studio Portrait',
      videos: ['/videos/prewedding.mp4', '/videos/prewedding.mp4', '/videos/prewedding.mp4'],
      images: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
        'https://images.unsplash.com/photo-1434637866556-6b63c891057d?w=800',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      ]
    },
    3: {
      title: 'Fashion Editorial',
      videos: ['/videos/prewedding.mp4', '/videos/prewedding.mp4', '/videos/prewedding.mp4'],
      images: [
        'https://images.unsplash.com/photo-1539571696357-5a69c006ad1c?w=800',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        'https://images.unsplash.com/photo-1495568720989-cebdbdd97913?w=800',
      ]
    },
  }

  const content = fashionData[id]

  if (!content) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <h1 className="text-white font-display text-2xl tracking-widest uppercase">Project Not Found</h1>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-20 text-center px-6">
        <Link href="/fashion" className="text-gold text-xs uppercase tracking-[0.4em] mb-4 inline-block hover:opacity-60 transition-opacity">
          ← Back to Collections
        </Link>
        <h1 className="text-5xl md:text-7xl font-display mt-4">
          <span className="text-gold italic">{content.title}</span>
        </h1>
      </section>

      {/* 3 Videos in One Row */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto"> 
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Video Editorial</span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.videos.map((video, i) => (
              <div key={i} className="relative aspect-[2/3] w-full bg-[#111] rounded-sm overflow-hidden border border-white/5 shadow-2xl">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Grid */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Stills Gallery</span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.images.map((img, i) => (
              <div key={i} className="relative aspect-[2/3] overflow-hidden group">
                <img
                  src={img}
                  alt={`${content.title} ${i}`}
                  className="w-full h-full object-cover rounded-sm transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}