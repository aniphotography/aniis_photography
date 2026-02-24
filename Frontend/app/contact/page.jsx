'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `${formData.eventType} - ${formData.message}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      console.log('✅ Saved to DB:', data)

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        eventType: '',
        message: '',
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 3000)

    } catch (err) {
      console.error('❌ Error submitting form:', err)
      setError('Failed to send enquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          Get in <span className="text-gold">Touch</span>
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Ready to capture your special moments? Contact us today.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-display mb-8">Contact Information</h2>
            <p className="text-gray-300 font-lato mb-4">
              Email: hello@luxephotography.com
            </p>
            <p className="text-gray-300 font-lato mb-4">
              Phone: +1 (555) 123-4567
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-display mb-8">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 p-6 border border-green-500 bg-green-900/20 text-green-400 text-center">
                ✅ Your enquiry has been submitted successfully!
              </div>
            )}

            {error && (
              <div className="mb-6 p-6 border border-red-500 bg-red-900/20 text-red-400 text-center">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white"
              />

              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white"
              >
                <option value="">Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Pre-Wedding">Pre-Wedding</option>
                <option value="Commercial">Commercial</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your event..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gold text-black font-bold hover:bg-yellow-400 transition-colors duration-300"
              >
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>

            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}