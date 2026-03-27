// 'use client'

// import Link from 'next/link'

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-screen bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-50"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80")',
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
//         <h1 className="text-6xl md:text-7xl font-display mb-4 fade-in">
//           <span className="text-gold">Capturing</span>
//           <br />
//           <span className="text-white">Timeless Moments</span>
//         </h1>

//         <p className="text-lg md:text-xl text-gray-300 mb-12 font-lato font-light max-w-2xl mx-auto">
//           Elegant photography that tells your story with artistry and sophistication
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//           <Link
//             href="/contact"
//             className="px-8 py-3 bg-gold text-black font-bold text-sm hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
//           >
//             Book a Session
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 7l5 5m0 0l-5 5m5-5H6"
//               />
//             </svg>
//           </Link>

//           <Link
//             href="/albums"
//             className="px-8 py-3 border-2 border-gold text-gold font-bold text-sm hover:bg-gold hover:text-black transition-all duration-300"
//           >
//             View Portfolio
//           </Link>
//         </div>

//         {/* Decorative Element */}
//         <div className="mt-16 flex justify-center">
//           <div className="w-8 h-12 border-2 border-gold rounded-full flex items-start justify-center p-2">
//             <div className="w-1 h-3 bg-gold rounded-full animate-bounce" />
//           </div>
//         </div>
//       </div>

//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a]" />
//     </section>
//   )
// }
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HeroSection({ data }) {
  const router = useRouter()

  const handleAddClick = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      router.push('/admin/dashboard?section=hero')
    }
  }

  const hasData = !!(data && data.image)
  const bgImage = hasData ? data.image : null

  return (
    <section className="relative w-full h-screen bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE LAYER */}
      {hasData && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* 2. BIG CENTER PLUS BUTTON (Visible only if no data) */}
      {!hasData && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <button
            onClick={handleAddClick}
            className="pointer-events-auto group flex flex-col items-center justify-center gap-6 transition-all duration-300"
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

      {/* 3. MAIN CONTENT (Always visible) */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl md:text-7xl font-display mb-4 fade-in">
          <span className="text-gold">{data?.title1 || 'Capturing'}</span>
          <br />
          <span className="text-white">{data?.title2 || 'Timeless Moments'}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12 font-lato font-light max-w-2xl mx-auto">
          {data?.subtitle || 'Elegant photography that tells your story with artistry and sophistication'}
        </p>

        {/* CTA BUTTONS (Now fully visible) */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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

        {/* DECOR SCROLL INDICATOR */}
        <div className="mt-16 flex justify-center">
          <div className="w-8 h-12 border-2 border-gold rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* 4. GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#1a1a1a] pointer-events-none z-[5]" />
    </section>
  )
}