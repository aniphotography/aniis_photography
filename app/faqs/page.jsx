'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FaqsPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          FAQs
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Frequently Asked Questions about LUXE Photography services
        </p>
      </section>

      {/* FAQs Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* FAQ 1 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">1. How do I book a session?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              You can book a session by contacting us via email, phone, or through our website booking form. A 50% deposit is required to confirm your booking.
            </p>
          </div>

          {/* FAQ 2 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">2. What is the cancellation policy?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              Cancellations more than 30 days prior receive a full refund of the session fee. 15-30 days prior: 50% refund. Less than 15 days or no-show: no refund.
            </p>
          </div>

          {/* FAQ 3 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">3. When will I receive my photos?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              Edited digital images are delivered via secure cloud storage within 30 days of the session. Rush delivery options are available for an additional fee.
            </p>
          </div>

          {/* FAQ 4 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">4. Can I use my photos for commercial purposes?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              All photographs remain the intellectual property of LUXE Photography. Personal use is included; commercial use requires a separate license and additional fees.
            </p>
          </div>

          {/* FAQ 5 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">5. Do you travel for photoshoots?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              Yes! Travel outside the local area may include additional fees for transportation, accommodation, and logistics.
            </p>
          </div>

          {/* FAQ 6 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">6. How many photos will I receive?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              The number of final images depends on the package and type of session. All delivered images are professionally edited and high-resolution.
            </p>
          </div>

          {/* FAQ 7 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">7. What should I wear or bring?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              We provide guidance for outfits, props, and styling based on the type of session. Please communicate any specific requirements in advance.
            </p>
          </div>

          {/* FAQ 8 */}
          <div>
            <h2 className="text-3xl font-display text-gold mb-4">8. Can I request specific shots?</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              Absolutely! We encourage clients to share inspiration, mood boards, or a shot list. We strive to capture the vision you have in mind.
            </p>
          </div>

          {/* Last Updated */}
          <div className="border-t border-gold/30 pt-8 text-center">
            <p className="text-gray-400 font-lato text-sm">
              Last Updated: February 2026
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
