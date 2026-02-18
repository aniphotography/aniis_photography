'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function BookSessionModal() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)

    const timer = setTimeout(() => {
      setOpen(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-[#111] border border-gold/40 rounded-sm w-full max-w-sm p-4 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Heading */}
        <h2 className="text-4xl font-display text-gold mb-8 text-center">
          Book Your Session
        </h2>

        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-gold font-lato text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gold transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gold font-lato text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gold transition"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-gold font-lato text-sm mb-2">
              Event Type
            </label>
            <select
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white focus:outline-none focus:border-gold transition"
            >
              <option>Select an event type</option>
              <option>Wedding</option>
              <option>Pre-Wedding</option>
              <option>Fashion</option>
              <option>Album Design</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gold font-lato text-sm mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your event..."
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gold transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gold text-black py-3 rounded-md font-bold hover:bg-yellow-400 transition-all duration-300"
          >
            Submit
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-gold text-xl hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
