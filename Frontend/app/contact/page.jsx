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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch(`${API}/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (res.ok) {
      setSubmitted(true)
      setFormData({ name: '', email: '', eventType: '', message: '' })
    } else {
      console.error(data)
      alert("Failed to send message")
    }

  } catch (err) {
    console.error(err)
    alert("Error sending message")
  }
}

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          Get in <span className="text-gold">Touch</span>
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Ready to capture your special moments? Contact us today
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-display text-white mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-gold font-display mb-2 text-lg">Email</h3>
                  <a
                    href="mailto:mailaniiphotography@gmail.com"
                    className="text-gray-300 hover-gold-text font-lato"
                  >
                    mailaniiphotography@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-gold font-display mb-2 text-lg">Phone</h3>
                  <a href="tel:+91 8981106258" className="text-gray-300 hover-gold-text font-lato">
                    +91 8981106258
                  </a>
                </div>

                {/* <div>
                  <h3 className="text-gold font-display mb-2 text-lg">Location</h3>
                  <p className="text-gray-300 font-lato">
                    123 Photography Lane
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div> */}

                <div>
                  <h3 className="text-gold font-display mb-2 text-lg">Calling Hours</h3>
                  <p className="text-gray-300 font-lato">
                    Monday - Friday: 9 AM - 9 PM
                    <br />
                    Saturday - Sunday: 10 AM - 9 PM
                    <br />
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-display text-white mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="p-8 border-2 border-gold bg-black/50 text-center">
                  <p className="text-gold font-display text-xl mb-2">Thank You!</p>
                  <p className="text-gray-300 font-lato">
                    We've received your inquiry and will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-lato text-gold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-white/20 px-4 py-3 font-lato text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-lato text-gold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-white/20 px-4 py-3 font-lato text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="eventType" className="block text-sm font-lato text-gold mb-2">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-white/20 px-4 py-3 font-lato text-white focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select an event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="pre-wedding">Pre-Wedding</option>
                      <option value="fashion">Fashion</option>
                     <option value="video">Video</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-lato text-gold mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-black/50 border border-white/20 px-4 py-3 font-lato text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your event..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gold text-black font-bold hover:bg-yellow-400 transition-colors duration-300"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
