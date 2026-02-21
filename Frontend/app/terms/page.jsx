'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          Terms & <span className="text-gold">Conditions</span>
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Please read our terms and conditions carefully
        </p>
      </section>

      {/* Terms Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">1. General Terms</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              These Terms and Conditions ("Agreement") constitute a legally binding agreement between LUXE Photography and the Client. By booking our services, you agree to abide by all terms outlined herein. Our photography services are provided on a professional basis and are subject to the conditions specified in each service agreement.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              All photography sessions must be confirmed at least 14 days prior to the scheduled date. Any changes to the session date or time must be communicated at least 7 days in advance. Failure to do so may result in additional charges or forfeiture of the session deposit.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">2. Booking & Payment</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              A non-refundable deposit of 50% is required to secure your booking. The remaining balance must be paid in full 3 days before the session date. We accept all major payment methods including credit cards, bank transfers, and digital wallets. Late payments may result in the postponement or cancellation of your session.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              Deposits are valid for 12 months from the date of booking. If your session is not scheduled within this period, the deposit will be forfeited. No refunds are issued for cancellations made less than 30 days before the scheduled session date.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">3. Cancellation Policy</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Clients may cancel their session with the following terms:
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• More than 30 days before: Full refund of session fee only</li>
              <li>• 15-30 days before: 50% refund of total payment</li>
              <li>• Less than 15 days before: No refund, deposit forfeited</li>
              <li>• No-show: Complete loss of deposit and session fee</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">4. Intellectual Property & Usage Rights</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              All photographs taken by LUXE Photography remain the intellectual property of the photographer. The client is granted a license to use the photographs for personal, non-commercial purposes only. Commercial use, including advertising, social media marketing, or any business promotion, requires a separate commercial license agreement and additional fees.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              LUXE Photography retains the right to display photographs in portfolios, on websites, and in marketing materials unless the client requests otherwise in writing at the time of booking.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">5. Deliverables</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Digital images are delivered via secure cloud storage within 30 days of the session. All images are edited and color-corrected according to LUXE Photography standards. The number of final images varies by package and session type. Clients receive high-resolution files suitable for printing and personal use.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              Albums and prints are produced by professional vendors and are subject to their quality standards. Rush delivery options are available for an additional fee. Digital files are provided in RGB format suitable for screen viewing and printing.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">6. Client Responsibilities</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Clients agree to provide accurate information regarding the event details, venue access, and any special requirements. The client is responsible for obtaining necessary permissions for photography at the venue. LUXE Photography is not responsible for delays or restrictions imposed by venue management or other third parties.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              The client authorizes LUXE Photography and its team to enter the venue and capture photographs as agreed upon. The client assumes all liability for any damage to the photographer's equipment during the session.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">7. Liability & Disclaimer</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              LUXE Photography cannot be held responsible for circumstances beyond our control, including but not limited to: adverse weather conditions, technical equipment failures, illness, or unforeseen emergencies. In such cases, we will make reasonable efforts to reschedule your session at the earliest convenience.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              The maximum liability of LUXE Photography is limited to the total fees paid for the session. We do not guarantee specific poses, compositions, or emotional outcomes in photographs.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">8. Privacy & Data Protection</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Client information is kept strictly confidential and used only for session coordination and delivery of services. We comply with all data protection regulations. Client data will not be shared with third parties without explicit consent except as required for album production or delivery of services.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">9. Modifications & Amendments</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              LUXE Photography reserves the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to our website. Continued use of our services indicates acceptance of modified terms.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">10. Contact Information</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              For any questions regarding these terms, please contact us at:
            </p>
            <p className="text-gold font-lato font-bold mt-4">
              Email: info@luxephotography.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Photography Lane, Creative City, ST 12345
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
