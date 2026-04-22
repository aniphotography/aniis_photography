
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
  const [heroData, setHeroData] = useState([]);
const [testimonials, setTestimonials] = useState([])
  useEffect(() => {
    Promise.all([
     fetch(`${API}/api/collections?category=wedding&section=featured`),
      fetch(`${API}/api/collections?category=wedding&section=recent`),
      fetch(`${API}/api/home-content`),
      fetch(`${API}/api/testimonials`)
    ])
      // FIX: Destructure ALL FOUR responses [fRes, rRes, hRes, tRes]
      .then(async (responses) => {
    // Check if all responses are okay
    if (responses.some(res => !res.ok)) {
      throw new Error('One or more API requests failed');
    }

    // Process all JSON parsing in parallel
    const [fData, rData, hData, tData] = await Promise.all(
      responses.map(res => res.json())
    );

    setFeaturedCollections(fData);
    setRecentWorks(rData);
    setHeroData(hData);
    setTestimonials(tData);
  
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
//   const getMediaUrl = (path) => {
//   if (!path) return "/placeholder-image.jpg"; // Helps see if the path is missing
//   if (path.startsWith('http')) return path;
//   return `${API}${path.startsWith('/') ? '' : '/'}${path}`;
// };
//


const getMediaUrl = (path) => {
  if (!path) return "/placeholder-image.jpg";

  // If the path is already a full Cloudinary URL, just return it
  if (path.startsWith('http')) {
    return path;
  }

  // Otherwise, fall back to your local/deployed API path
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  return `${API}/${path}`;
};
async function getTestimonials() {
  // Use the env variable if it exists, otherwise default to your local backend port
  
  try {
    const res = await fetch(`${API}/api/testimonials`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      // This helps catch if the route exists but the server is failing
      console.error(`Error: ${res.status} ${res.statusText}`);
      return []; 
    }

    return await res.json();
  } catch (error) {
    // This catches if the backend server isn't running at all
    console.error("Failed to connect to backend:", error);
    return []; // Return empty array so the .map() doesn't crash the page
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
<section className="py-24 px-8 max-w-7xl mx-auto bg-[#1a1a1a]">
  {/* The container with the subtle border from your photo */}
  <div className="border border-white/10 p-8 bg-black/30 rounded-2xl shadow-2xl">
    
    <h4 className="text-center tracking-[0.3em] text-xs mb-4 text-gray-400 uppercase">HERE'S WHAT OUR COUPLES HAVE TO SAY</h4>
      <h2 className="text-center text-5xl font-display mb-20 uppercase tracking-tight">Notes of <span className="text-gold">Gratitude</span></h2>

    {/* Exact spacing from your first code: space-y-16 */}
    <div className="space-y-10">
      {testimonials.map((item, index) => (
        <div 
          key={index} 
          className={`flex flex-col md:items-center gap-8 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Text Side - Exact text-base and font-serif styles */}
        {/* Change item.author to item.author_name and fix the img src line */}

<div className="flex-1 text-center md:text-left px-4">
  <p className="text-xl italic font-light leading-[1.8] mb-8 text-gray-200 font-serif">"{item.quote}"</p>
  <div className="space-y-1">
    {/* FIXED: Changed item.author to item.author_name */}
    <p className="font-bold tracking-[0.2em] text-sm text-gold">- {item.author_name}</p> 
  </div>
</div>

{/* Image Side */}
<div className="flex-1 max-w-sm mx-auto w-full">
  <img 
   
    src={getMediaUrl(item.image_url || item.image_path || item.image)} 
    alt={item.author_name} 
    className="rounded-[2.5rem] w-full aspect-[4/3] object-cover shadow-2xl border border-white/5"
  />
</div>
        </div>
      ))}
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
