'use client'
import { useState, useEffect } from 'react'
import { getMediaUrl } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function WhyAniiSection() {
  const [dbData, setDbData] = useState([])
  const [loading, setLoading] = useState(true)
  const accentColor = "#d4af37" // Your signature gold
  const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/home-content`)
        const json = await res.json()
        setDbData(json)
      } catch (err) {
        console.error("WhyAnii Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Helper to find media paths from your database slots
  const getMedia = (slotName) => {
    const item = dbData.find(d => d.slot === slotName)
    return item ? getMediaUrl(item.image_path) : null
  }

  const features = [
    { id: 1, title: 'Connection', slot: 'why-connection', description: 'The best photographs happen when you feel completely like yourself. We prioritize building a genuine relationship with you before the big day.' },
    { id: 2, title: 'Preparation', slot: 'why-preparation', description: 'Your wedding is completely unique. We dive deeply into every detail of your itinerary to plan the perfect shots for your events.' },
    { id: 3, title: 'Ease', slot: 'why-ease', description: 'On your wedding day, the last thing you need is stress. We operate with a seamless, unobtrusive approach so you can stay in the moment.' },
    { id: 4, title: 'Artistry', slot: 'why-artistry', description: 'We do not just document your day; we craft visual stories using unique angles, gorgeous lighting, and authentic emotions.' },
    { id: 5, title: 'Grandeur', slot: 'why-grandeur', description: 'Every great love story deserves a cinematic touch. We focus on capturing the scale, beauty, and spectacular energy of your celebration.' },
  ]

  const renderFeatureCard = (feature, isWide = false) => {
    const mediaPath = getMedia(feature.slot)
    const isVideo = mediaPath?.match(/\.(mp4|webm|ogg)$/i)

    return (
      <div 
        key={feature.id}
        onMouseEnter={(e) => {
          const video = e.currentTarget.querySelector('video')
          if (video) video.play()
        }}
        onMouseLeave={(e) => {
          const video = e.currentTarget.querySelector('video')
          if (video) { video.pause(); video.currentTime = 0 }
        }}
        className={`group relative overflow-hidden h-80 rounded-2xl shadow-xl transition-all duration-300 bg-[#0a0a0a] ${isWide ? 'w-full lg:w-1/2' : 'w-full'}`}
      >
        {/* MEDIA LAYER */}
        {mediaPath && (
          isVideo ? (
            <video src={mediaPath} muted loop playsInline className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <img src={mediaPath} alt={feature.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500" />
          )
        )}

        {/* CONTENT LAYER */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
          <h3 className="text-3xl font-display mb-2 transition-colors duration-300" style={{ color: accentColor }}>
            {feature.title}
          </h3>
          <p className="text-gray-200 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {feature.description}
          </p>
          <div className="w-12 h-1 mt-4 transition-all duration-300 group-hover:w-24" style={{ backgroundColor: accentColor }} />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
      </div>
    )
  }

  if (loading) return <div className="py-20 bg-black text-center" style={{ color: accentColor }}>Loading...</div>

  return (
    <section>
   <section className="bg-black text-white py-20 px-6">
  <div className="max-w-7xl mx-auto">
    {/* Title - Matches Wedding section spacing */}
    <h2 className="text-center text-4xl md:text-5xl font-light mb-16 tracking-wide">
      Why Anii Photography ?
    </h2>

    {/* Top Row: 3 Columns - Storytelling, Precision, Impact */}
    {/* gap-x-16 provides that professional breathing room between columns */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12 mb-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Storytelling</h3>
        <p className="text-gray-300 leading-relaxed font-light">
          We do more than capture visuals; we craft compelling narratives that connect deeply with your target audience and bring your brand's unique ethos to life.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Precision</h3>
        <p className="text-gray-300 leading-relaxed font-light">
          From lighting setups to post-production color grading, we obsess over every detail, ensuring your visual assets are flawlessly executed and technically perfect.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Impact</h3>
        <p className="text-gray-300 leading-relaxed font-light">
          Our high-end photography and cinematic sequences are strategically designed to command attention, drive audience engagement, and elevate your market presence.
        </p>
      </div>
    </div>

    {/* Bottom Row: 2 Columns Centered - Bespoke & Partnership */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
      <div className="space-y-4 md:text-right">
        <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Bespoke</h3>
        <p className="text-gray-300 leading-relaxed font-light">
          No two brands are the same. We deliver custom-tailored creative solutions that align perfectly with your specific marketing goals, aesthetics, and visual identity.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl font-semibold" style={{ color: "#d4af37" }}>Partnership</h3>
        <p className="text-gray-300 leading-relaxed font-light">
          We operate as a dedicated extension of your team, providing a seamless, collaborative, and reliable production experience from initial concept to final delivery.
        </p>
      </div>
    </div>
  </div>
</section>
 <section className="py-20 px-6">
  <div className="max-w-6xl mx-auto">
    {/* Updated from md:grid-cols-4 to md:grid-cols-3 to center the 3 items */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">
      
      {/* Weddings */}
      <div>
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={500} />+
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Weddings Captured
        </p>
      </div>

      {/* Years Experience */}
      <div>
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={10} />+
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Years Experience
        </p>
      </div>

      {/* Satisfaction */}
      <div className="sm:col-span-2 md:col-span-1"> {/* Centers on mobile/tablet if needed */}
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={99} />%
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Client Satisfaction
        </p>
      </div>
      {/* Fashion & Brands */}
      <div className="sm:col-span-2 md:col-span-1"> {/* Centers on mobile/tablet if needed */}
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={250} />+
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Fashion & brands
        </p>
      </div>
    </div>
  </div>
</section>
</section>
  )
}