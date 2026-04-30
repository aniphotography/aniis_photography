
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
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

const nextSlide = () => {
  setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
};

const prevSlide = () => {
  setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
};

const item = testimonials[currentIndex] || {};
useEffect(() => {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (isMobile) {
    localStorage.removeItem('adminToken'); // optional but recommended
    setIsAdmin(false);
  } else {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }
}, []);

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
<section className="relative h-[500px] overflow-hidden">
  {/* Video background */}
  {bgImage && bgImage.match(/\.(mp4|webm|mov)($|\?)/i) ? (
    <video
      src={bgImage}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
    />
  )}
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
             isAdmin && (
      <div
        onClick={handleAddClick}
        className="flex items-center justify-center h-[350px] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
      >
        <span className="text-5xl text-gold">+</span>
      </div>
    )
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
              isAdmin && (
      <div
        onClick={handleAddClick}
        className="flex items-center justify-center h-[350px] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
      >
        <span className="text-5xl text-gold">+</span>
      </div>
    )
  )}
</div>
        </div>
        </section>

<section className="py-24 px-8 max-w-[1600px] mx-auto bg-[#1a1a1a] text-white">
    {/* Header Section */}
    <div className="text-center mb-16">
      <h4 className="tracking-[0.3em] text-[10px] mb-4 text-gray-400 uppercase font-medium">
        HERE'S WHAT OUR COUPLES HAVE TO SAY
      </h4>
      <h2 className="text-5xl md:text-6xl font-serif tracking-tight uppercase">
        Notes of <span className="text-[#D4AF37]">Gratitude</span>
      </h2>
    </div>

    {/* Slider Container */}
    <div className="relative max-w-7xl mx-auto border border-white/5 p-8 md:p-16 bg-black/20 rounded-[2.5rem] shadow-2xl">
      
      {/* NAVIGATION BUTTONS */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/40 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <span className="text-3xl font-light">←</span>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/40 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <span className="text-3xl font-light">→</span>
      </button>

      {/* ACTIVE SLIDE CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24 transition-all duration-500">
        
        {/* Left Side: Text */}
        <div className="flex flex-col items-center text-center px-4 md:px-8">
          <p className="text-lg md:text-xl font-serif leading-[1.9] mb-10 text-gray-200 italic">
            "{item.quote}"
          </p>
          <div className="space-y-1">
            <p className="font-bold tracking-[0.2em] text-xs text-[#D4AF37] uppercase">
              - {item.author_name}
            </p>
            {/* <p className="text-[10px] tracking-widest text-gray-500 uppercase font-medium">
              {item.role || "TWF Couple"}
            </p> */}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
          <img 
            src={getMediaUrl(item.image_url || item.image_path || item.image)} 
            alt={item.author_name} 
            className="w-full aspect-[3/2] object-cover hover:scale-105 transition-transform duration-1000"
          />
        </div>
      </div>

      {/* PAGINATION DOTS (The bar seen in the photo) */}
      <div className="flex justify-center items-center gap-2 mt-16">
        {testimonials.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`cursor-pointer transition-all duration-300 ${
              currentIndex === i 
                ? 'h-[2px] w-12 bg-[#D4AF37]' 
                : 'h-1 w-1 bg-gray-700 rounded-full hover:bg-gray-500'
            }`}
          ></div>
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
