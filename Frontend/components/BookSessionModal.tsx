'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function BookSessionModal() {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    message: '',
  })

  useEffect(() => {
    const allowedPages = ['/', '/wedding']

    if (!allowedPages.includes(pathname)) return
    if (sessionStorage.getItem('bookPopupShown')) return

    const timer = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem('bookPopupShown', 'true')
    }, 1500)

    return () => clearTimeout(timer)
  }, [pathname])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert('Booking request sent successfully!')

        setFormData({
          name: '',
          email: '',
          eventType: '',
          message: '',
        })

        setOpen(false)
      } else {
        alert('Failed to send request')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-[#111] border border-gold/40 rounded-lg w-full max-w-lg p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-display text-gold mb-6 text-center">
          Book Your Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gold text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white"
            />
          </div>

          <div>
            <label className="block text-gold text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white"
            />
          </div>

          <div>
            <label className="block text-gold text-sm mb-2">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white"
            >
              <option value="">Select an event type</option>
              <option>Wedding</option>
              <option>Pre-Wedding</option>
              <option>Fashion</option>
              <option>Album Design</option>
              <option>Video Production</option> {/* ✅ Added */}
            </select>
          </div>

          <div>
            <label className="block text-gold text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your event..."
              required
              className="w-full bg-black border border-white/20 px-4 py-3 rounded-md text-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 rounded-md font-bold hover:bg-yellow-400 transition"
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>

        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gold text-xl hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  )
}