
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRef } from 'react'

export default function FashionPage() {
  
  const featuredGallery = [
    { id: 1, title: 'Urban Editorial', video: '/videos/prewedding.mp4' },
    { id: 2, title: 'Studio Luxe', video: '/videos/prewedding.mp4' },
    { id: 3, title: 'Vogue Concept', video: '/videos/prewedding.mp4' },
  ]

  const recentWork = [
    { id: 4, title: 'Summer 26', video: '/videos/prewedding.mp4' },
    { id: 5, title: 'Parisian Night', video: '/videos/prewedding.mp4' },
    { id: 6, title: 'Minimalist Form', video: '/videos/prewedding.mp4' },
  ]

  const brands = [
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-36 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display mb-4">
          <span className="text-gold italic">Fashion</span> Editorial
        </h1>
        <p className="text-gray-500 text-xs tracking-[0.4em] uppercase">The Motion Collection</p>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-display uppercase tracking-widest">Featured</h2>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGallery.map((item) => (
              <HoverVideoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND SLIDER - Placed between sections */}
      <section className="py-20 bg-black/30 border-y border-white/5 my-10">
        <div className="relative overflow-hidden w-full px-6">
          {/* Gradients to fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
          
          <div className="flex gap-20 animate-scroll w-max items-center">
            {/* Double the array to ensure seamless looping */}
            {[...brands, ...brands].map((logo, i) => (
              <div key={i} className="flex items-center justify-center shrink-0">
                <img
                  src={logo}
                  alt="Brand Logo"
                  className="h-10 md:h-12 object-contain opacity-40 hover:opacity-100 transition duration-500 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-display uppercase tracking-widest">Recent Work</h2>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentWork.map((item) => (
              <HoverVideoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* In-page CSS for the scroll animation if not in your Tailwind config */}
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </main>
  )
}

function HoverVideoCard({ item }) {
  const videoRef = useRef(null)

  const handleEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {}) 
  }

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Link href={`/fashion/${item.id}`}>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative aspect-[2/3] w-full overflow-hidden rounded-sm cursor-pointer group bg-[#111]"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
        >
          <source src={item.video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h3 className="text-xl font-display text-white group-hover:text-gold transition-colors duration-300 transform group-hover:-translate-y-1 transition-transform">
            {item.title}
          </h3>
          <p className="text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
            Explore Project
          </p>
        </div>
      </div>
    </Link>
  )
}
// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { useState, useEffect } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation'

// export default function PreWeddingGalleryPage() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const [selectedPackage, setSelectedPackage] = useState('basic')
//   const [packages, setPackages] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedImage, setSelectedImage] = useState(null)

//   // Set package from query params
//   useEffect(() => {
//     const pkg = searchParams.get('package')
//     if (pkg) setSelectedPackage(pkg)
//   }, [searchParams])

//   // Fetch packages from backend
//   useEffect(() => {
//     fetch('http://localhost:5000/api/prewedding-packages')
//       .then(res => res.json())
//       .then(data => {
//         setPackages(data)
//         setLoading(false)
//       })
//       .catch(() => setLoading(false))
//   }, [])

//   const handleAddClick = () => {
//     const token = localStorage.getItem('adminToken')
//     if (!token) router.push('/admin/login')
//     else router.push('/admin/dashboard?category=prewedding')
//   }

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-black text-white">
//         Loading...
//       </main>
//     )
//   }

//   // Get current package info dynamically
//   const currentPackage = packages.find(p => p.slug === selectedPackage) || packages[0]

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white">
//       <Navbar />

//       {/* Package Details Header */}
//       <section className="pt-32 px-6 bg-gradient-to-b from-black/50 to-black">
//         <div className="max-w-7xl mx-auto pb-12">
//           <div className="border-l-4 border-gold pl-6 mb-8">
//             <h1 className="text-5xl md:text-6xl font-display mb-2 capitalize">
//               {currentPackage?.name || 'Package'}
//             </h1>
//             <p className="text-gold text-2xl font-bold mb-4">{currentPackage?.price}</p>
//             <p className="text-gray-300 text-lg mb-6">
//               {currentPackage?.duration} • {currentPackage?.coverage}
//             </p>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {currentPackage?.features?.map((feature, idx) => (
//                 <div key={idx} className="text-sm text-gray-300">
//                   <span className="text-gold font-bold">✓</span> {feature}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Package Filter Buttons */}
//       <section className="px-6 py-8 bg-black/70">
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
//           {packages.map(pkg => (
//             <button
//               key={pkg.slug}
//               onClick={() => setSelectedPackage(pkg.slug)}
//               className={`px-6 py-2 font-lato font-bold transition-all duration-300 ${
//                 selectedPackage === pkg.slug
//                   ? 'bg-gold text-black'
//                   : 'border-2 border-gold text-gold hover:bg-gold hover:text-black'
//               }`}
//             >
//               {pkg.name}
//             </button>
//           ))}

//           {/* Add Button for Admin */}
//           <div
//             onClick={handleAddClick}
//             className="flex items-center justify-center px-6 py-2 border-2 border-dashed border-gold cursor-pointer hover:bg-white/5 transition"
//           >
//             <span className="text-2xl text-gold font-bold">+ Add</span>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Grid */}
//       <section className="px-6 py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {currentPackage?.photos?.length > 0 ? (
//               currentPackage.photos.map((image) => (
//                 <div
//                   key={image.id}
//                   className="group relative overflow-hidden h-72 cursor-pointer"
//                   onClick={() => setSelectedImage(image)}
//                 >
//                   <img
//                     src={image.url || '/placeholder.svg'}
//                     alt={image.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                     <p className="text-white font-display text-lg text-center">{image.title}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div
//                 onClick={handleAddClick}
//                 className="flex items-center justify-center h-72 border-2 border-dashed border-gold rounded-xl cursor-pointer hover:bg-white/5 transition"
//               >
//                 <span className="text-5xl text-gold">+</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Lightbox Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
//             <img
//               src={selectedImage.url || '/placeholder.svg'}
//               alt={selectedImage.title}
//               className="w-full h-auto max-h-[80vh] object-contain"
//             />
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-4 right-4 text-gold hover:text-yellow-300 transition-colors duration-300"
//               aria-label="Close"
//             >
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <p className="text-white text-center mt-4 font-display text-xl">{selectedImage.title}</p>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </main>
//   )
// }