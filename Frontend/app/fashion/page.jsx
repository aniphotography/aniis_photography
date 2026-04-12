
// 'use client'

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import Link from 'next/link'
// import { useRef, useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function FashionPage() {

//   const router = useRouter()
//   const brands = [
//     'https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png',
//     'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
//     'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
//     'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
//     'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
//     'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
//   ]

//   const [collections, setCollections] = useState([])
//   const [featuredGallery, setFeaturedGallery] = useState([])
//   const [brandLogos, setBrandLogos] = useState(brands)

//   useEffect(() => {
//     fetch('http://localhost:5000/api/collections?category=fashion&section=featured')
//       .then(res => res.json())
//       .then(data => setFeaturedGallery(data))
//       .catch(err => console.error(err))
//   }, [])

//   // load all collections for "Our Works"
//   useEffect(() => {
//     fetch('http://localhost:5000/api/collections?category=fashion')
//       .then(res => res.json())
//       .then(data => setCollections(data))
//       .catch(err => console.error(err))
//   }, [])

//   // try to load logos saved via admin (tag=logo), fallback kept in state
//   useEffect(() => {
//     fetch('http://localhost:5000/api/media?tag=logo')
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data) && data.length > 0) {
//           const urls = data.map(item => `http://localhost:5000${item.image_url}`)
//           setBrandLogos(urls)
//         }
//       })
//       .catch(() => {})
//   }, [])

//   const handleAddClick = () => {
//     const token = localStorage.getItem('adminToken')

//     if (!token) {
//       router.push('/admin/login')
//     } else {
//       router.push('/admin/dashboard?category=fashion')
//     }
//   }
//   // const featuredGallery = collections.slice(0,3)
//   // const recentWork = collections.slice(3)

  
//   return (
//     <main className="min-h-screen bg-[#0a0a0a] text-white">
//       <Navbar />

//       {/* HEADER */}
//       <section className="pt-36 pb-12 px-6 text-center">
//         <h1 className="text-5xl md:text-7xl font-display mb-4">
//           <span className="text-gold italic">Fashion</span> Editorial
//         </h1>
//         <p className="text-gray-500 text-xs tracking-[0.4em] uppercase">
//           The Motion Collection
//         </p>
//       </section>

//       {/* FEATURED */}
//       <section className="py-10 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center gap-4 mb-10">
//             <h2 className="text-2xl font-display uppercase tracking-widest">
//               Featured
//             </h2>
//             <div className="h-[1px] flex-1 bg-white/10"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//             {/* {featuredGallery.length > 0 ? (
//               featuredGallery.map((item) => (
//                 <HoverVideoCard key={item.id} item={item} />
//               ))
//             ) : (
//               <AddCard handleAddClick={handleAddClick}/>
//             )} */}
//             {featuredGallery.map((item) => (
//     <HoverVideoCard key={item.id} item={item} />
//   ))}

//   {Array.from({ length: 3 - featuredGallery.length }).map((_, index) => (
//     <AddCard key={`add-${index}`} handleAddClick={handleAddClick} />
//   ))}

//           </div>
//         </div>
//       </section>

//       {/* BRAND SLIDER */}
//       <section className="py-20 bg-black/30 border-y border-white/5 my-10">
//         <div className="relative overflow-hidden w-full px-6">

//           <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
//           <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

//           <div className="flex gap-20 animate-scroll w-max items-center">
//             {[...brandLogos, ...brandLogos].map((logo, i) => (
//               <div key={i} className="flex items-center justify-center shrink-0">
//                 <img
//                   src={logo}
//                   alt="Brand Logo"
//                   className="h-10 md:h-12 object-contain opacity-40 hover:opacity-100 transition duration-500"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* OUR WORKS (dynamic) */}
//       <section className="py-24 px-6 bg-[#080808]">
//         <div className="max-w-7xl mx-auto">

//           <div className="flex items-center gap-4 mb-12">
//             <h2 className="text-3xl font-display uppercase tracking-widest">
//               Our <span className="text-gold">Works</span>
//             </h2>
//             <div className="h-[1px] flex-1 bg-white/10"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//             {collections && collections.length > 0 ? (
//               // exclude featured from the works grid to avoid duplicates
//               collections
//                 .filter(c => !featuredGallery.some(f => f.id === c.id))
//                 .map((col) => (
//                   <Link key={col.id} href={`/fashion/${col.id}`}>
//                     <div className="group overflow-hidden aspect-[2/3] bg-[#111] rounded-sm cursor-pointer">
//                       <img
//                         src={`http://localhost:5000${col.cover_image || col.cover_video || ''}`}
//                         alt={col.title}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-60 transition" />
//                       <div className="p-6 absolute bottom-0 left-0">
//                         <h3 className="text-white font-display text-xl">{col.title}</h3>
//                       </div>
//                     </div>
//                   </Link>
//                 ))
//             ) : (
//               <AddCard handleAddClick={handleAddClick} />
//             )}

//           </div>

//         </div>
//       </section>

//       <Footer />

//       <style jsx global>{`
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(calc(-50%)); }
//         }
//         .animate-scroll {
//           animation: scroll 30s linear infinite;
//         }
//       `}</style>

//     </main>
//   )
// }

// function HoverVideoCard({ item }) {

//   const videoRef = useRef(null)

//   const handleEnter = () => {
//     if (videoRef.current) videoRef.current.play().catch(() => {})
//   }

//   const handleLeave = () => {
//     if (videoRef.current) {
//       videoRef.current.pause()
//       videoRef.current.currentTime = 0
//     }
//   }

//   return (
//     <Link href={`/fashion/${item.id}`}>
//       <div
//         onMouseEnter={handleEnter}
//         onMouseLeave={handleLeave}
//         className="relative aspect-[2/3] w-full overflow-hidden rounded-sm cursor-pointer group bg-[#111]"
//       >

//         <video
//           ref={videoRef}
//           muted
//           loop
//           playsInline
//           preload="metadata"
//           className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
//         >
//           <source src={`http://localhost:5000${item.cover_video || item.video_url}`} type="video/mp4" />
//         </video>

//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

//         <div className="absolute inset-0 flex flex-col justify-end p-8">
//           <h3 className="text-xl font-display text-white group-hover:text-gold transition-colors duration-300 transform group-hover:-translate-y-1">
//             {item.title}
//           </h3>

//           <p className="text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
//             Explore Project
//           </p>
//         </div>

//       </div>
//     </Link>
//   )
// }

// function AddCard({ handleAddClick }) {
//   return (
//     <div
//       onClick={handleAddClick}
//       className="flex items-center justify-center aspect-[2/3] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
//     >
//       <span className="text-5xl text-gold">+</span>
//     </div>
//   )
// }



'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

export default function FashionPage() {

  const router = useRouter()
  const [collections, setCollections] = useState([])
const [featuredGallery, setFeaturedGallery] = useState([])
const [recentWork, setRecentWork] = useState([])
const [brandLogos, setBrandLogos] = useState([]);
useEffect(() => {
  Promise.all([
    fetch('http://localhost:5000/api/collections?category=fashion&section=featured'),
    fetch('http://localhost:5000/api/collections?category=fashion&section=recent')
  ])
    .then(async ([fRes, rRes]) => {
      const fData = await fRes.json()
      const rData = await rRes.json()
      setFeaturedGallery(fData)
      setRecentWork(rData)
    })
    .catch(err => console.error(err))
}, [])
  const handleAddClick = () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin/login')
    } else {
      router.push('/admin/dashboard?category=fashion')
    }
  }
  // const featuredGallery = collections.slice(0,3)
  // const recentWork = collections.slice(3)



  // allow dynamic brand logos from backend (fallback to hardcoded list)
  

  useEffect(() => {
    // try to load logos saved via admin (tag=logo)
    fetch('http://localhost:5000/api/media?tag=logo')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const urls = data.map(item => `http://localhost:5000${item.image_url}`)
          setBrandLogos(urls)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-36 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display mb-4">
          <span className="text-gold italic">Fashion</span> Editorial
        </h1>
        <p className="text-gray-500 text-xs tracking-[0.4em] uppercase">
          The Motion Collection
        </p>
      </section>

      {/* FEATURED */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-display uppercase tracking-widest">
              Featured
            </h2>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* {featuredGallery.length > 0 ? (
              featuredGallery.map((item) => (
                <HoverVideoCard key={item.id} item={item} />
              ))
            ) : (
              <AddCard handleAddClick={handleAddClick}/>
            )} */}
            {featuredGallery.map((item) => (
    <HoverVideoCard key={item.id} item={item} />
  ))}

  {Array.from({ length: 3 - featuredGallery.length }).map((_, index) => (
    <AddCard key={`add-${index}`} handleAddClick={handleAddClick} />
  ))}

          </div>
        </div>
      </section>

      {/* BRAND SLIDER */}
      {/* <section className="py-20 bg-black/30 border-y border-white/5 my-10">
        <div className="relative overflow-hidden w-full px-6">

          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

          <div className="flex gap-20 animate-scroll w-max items-center">

            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <div key={i} className="flex items-center justify-center shrink-0">
                <img
                  src={logo}
                  alt="Brand Logo"
                  className="h-10 md:h-12 object-contain opacity-40 hover:opacity-100 transition duration-500"
                />
              </div>
            ))}

          </div>
        </div>
      </section> */}
<section className="py-20 bg-black/30 border-y border-white/5 my-10">
  <div className="relative overflow-hidden w-full px-6">
    {/* Side Gradients for smooth fading edges */}
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

    <div className="flex gap-10 animate-scroll w-max items-center">
      {brandLogos && brandLogos.length > 0 ? (
        // Duplicate array for infinite scroll effect
        [...brandLogos, ...brandLogos].map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 h-48 overflow-hidden group flex items-center justify-center"
          >
         <img
  // Use a higher base opacity (70) so it's visible but still looks like a secondary brand
  src={typeof logo === 'string' ? logo : getMediaUrl(logo.image_url)}
  alt="Brand Logo"
  className="w-full h-full object-contain p-6 transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105"
/>
          </div>
        ))
      ) : (
        // Fallback slots if array is empty
        Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex-shrink-0 w-64 h-48 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-sm">
            Logo Slot
          </div>
        ))
      )}
    </div>
  </div>
</section>
      {/* RECENT WORK */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-display uppercase tracking-widest">
              Recent Work
            </h2>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {recentWork.length > 0 ? (
              recentWork.map((item) => (
                <HoverVideoCard key={item.id} item={item} />
              ))
            ) : (
              <AddCard handleAddClick={handleAddClick}/>
            )}

          </div>
        </div>
      </section>

      <Footer />

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
          preload="metadata"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
        >
          <source src={getMediaUrl(item.cover_video || item.video_url)} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h3 className="text-xl font-display text-white group-hover:text-gold transition-colors duration-300 transform group-hover:-translate-y-1">
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

function AddCard({ handleAddClick }) {
  return (
    <div
      onClick={handleAddClick}
      className="flex items-center justify-center aspect-[2/3] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
    >
      <span className="text-5xl text-gold">+</span>
    </div>
  )
}

