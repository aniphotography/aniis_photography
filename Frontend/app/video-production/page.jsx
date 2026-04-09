'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function VideoProductionPage() {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [projects, setProjects] = useState([])
  const [videoLogos, setVideoLogos] = useState([])
  const [loading, setLoading] = useState(true)

  // ✅ FETCH VIDEO PROJECTS
  useEffect(() => {
    fetch("http://localhost:5000/api/collections?category=video-production")
      .then(res => res.json())
      .then(data => {
        console.log("Projects:", data) // DEBUG
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading video projects", err)
        setLoading(false)
      })
  }, [])

  // ✅ FETCH VIDEO LOGOS
  useEffect(() => {
    fetch("http://localhost:5000/api/media?tag=video_logo")
      .then(res => res.json())
      .then(data => {
        console.log("Video Logos:", data) // DEBUG
        setVideoLogos(data)
      })
      .catch(err => console.error("Error loading video logos", err))
  }, [])

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (projects.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [projects])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gold">
        Loading...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">

      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-16 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          <span className="text-gold">Video</span> Production
        </h1>
        <p className="text-gray-400">
          Professional video production services that bring your vision to life
        </p>
      </section>

      {/* ✅ VIDEO LOGO SLIDER */}
      <div className="overflow-hidden bg-black py-6">
        <div className="flex gap-10 animate-scroll items-center">
          {[...videoLogos, ...videoLogos].map((logo, idx) => (
            <img
              key={`${logo.id}-${idx}`}
              src={`http://localhost:5000${logo.image_url}`}
              className="h-12 object-contain opacity-70 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>

      {/* OUR WORKS */}
      <section className="py-20">
        <h2 className="text-3xl text-center mb-10">
          Our <span className="text-gold">Works</span>
        </h2>

        <div className="relative h-[500px] max-w-6xl mx-auto overflow-hidden">

          {projects.map((slide, idx) => (
            <Link
              href={`/video-production/${slide.id}`}
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0'
              }`}
            >
              <img
                src={
                  slide.cover
                    ? `http://localhost:5000${slide.cover}`
                    : "/placeholder.svg"
                }
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-10 left-10">
                <h3 className="text-4xl text-gold">{slide.title}</h3>
                <p className="text-sm">View Project →</p>
              </div>
            </Link>
          ))}

          {/* NAV BUTTONS */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-3"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-3"
          >
            ›
          </button>

        </div>
      </section>

      <Footer />

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>

    </main>
  )
}