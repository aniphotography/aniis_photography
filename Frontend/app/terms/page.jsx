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
          Please read the Terms and Conditions of Weddingz by Anii carefully
        </p>
      </section>

      
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">Preamble</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              These Terms and Conditions (the "Agreement") constitute a legally binding covenant between Weddingz by Anii, operating under the brand Anii Photography (hereinafter referred to as the "Studio"), and the undersigned client(s) (hereinafter referred to as the "Client"). 
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              By remitting the initial retainer, the Client explicitly agrees to be bound by the stipulations set forth herein.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">1. The Retainer & Date Exclusivity</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              To secure the Studio’s services for the specified event date, a Non-Refundable Retainer is required. This remittance guarantees the Studio’s exclusive availability and explicitly turns away other prospective clientele.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>Forfeiture:</strong> In the event of cancellation, this retainer is strictly non-refundable and non-transferable, serving as agreed liquidated damages for the Studio's loss of business.</li>
              <li>• <strong>Postponements:</strong> Should the event be deferred, the Studio may, at its sole discretion, apply the retainer to a new date, strictly contingent upon the Studio's availability. Subsequent retainers or premium surcharges may apply.</li>
            </ul>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">2. Schedule of Remittance</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Following the execution of the quotation, the Client is bound to a strict remittance schedule:
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>40%</strong> – Non-Refundable Retainer (Due upon execution to secure the date).</li>
              <li>• <strong>50%</strong> – Due strictly on or before the primary Event Date.</li>
              <li>• <strong>10%</strong> – Final Balance (Due prior to the release of soft copies, albums, and cinematic deliverables).</li>
            </ul>
            <p className="text-gray-300 font-lato leading-relaxed">
              The Studio reserves the explicit right to withhold all proofs, digital media, and physical deliverables until the Client’s account is settled in full.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">3. Exclusive Artistic Control</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Studio operates as a premium creative entity and retains absolute artistic license regarding composition, posing, lighting, location selection, and post-production editing. The Photographer’s professional judgment regarding aesthetics and coverage is final.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              While the Studio will attempt to accommodate shot lists, we strictly disclaim liability for missing specific images due to environmental limitations, weather, schedule delays, or lack of subject cooperation.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">4. Travel, Logistics & Crew Accommodations</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              All logistical expenses—including airfare, ground transportation, on-site crew meals, and overnight lodging—are the strict financial responsibility of the Client and are excluded from the base package fee.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              Accommodations must meet professional standards of hygiene, safety, and comfort. The Studio reserves the right to reject substandard lodging and secure appropriate alternatives at the Client's direct expense.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">5. Client Obligations & Scope Amendments</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Execution is strictly contingent upon the Client providing adequate time, physical space, and coordination. The Studio absolves itself of liability for missed moments resulting from poor logistical planning or tardiness.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              Any deviations from the original timeline, venue, or deliverables shall be classified as an extension of this Agreement and must be approved in writing.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">6. Intellectual Property & Promotional Rights</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Studio retains absolute ownership and copyright of all captured media. The Client is granted a limited, perpetual license for personal, non-commercial use only. Commercial usage requires a separate negotiated agreement.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              The Studio reserves the irrevocable right to utilize captured media for portfolios, social media marketing, and industry competitions unless a non-disclosure exception is negotiated in writing prior to booking.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">7. Post-Production & Deliverables</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              High-resolution digital files will be deployed via secure, encrypted cloud transmission. All physical albums and fine art prints are manufactured by vetted, industry-leading print houses.
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              The Studio’s quality control is rigorous and final. Rush processing is subject to availability and mandates an expedited service fee.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">8. Strict Cancellation Policy</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Upon termination by the Client, all remitted funds are instantly forfeited. 
            </p>
            <p className="text-gray-300 font-lato leading-relaxed font-bold">
              Penalty Clause: If cancellation occurs within thirty (30) days of the scheduled Event Date, the Client is legally obligated to remit 100% of the total contracted balance.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">9. Venue, Indemnification & Force Majeure</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Client is responsible for venue permits and equipment protection. The Studio shall not be in breach due to circumstances beyond reasonable control (Acts of God, equipment failure, severe illness).
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              In the event of catastrophic failure, the Studio's absolute liability is capped at the total monetary value of the contract. The Studio disclaims liability for indirect or emotional damages.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">10. Contact Information</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              For any questions regarding these terms, please contact us at:
            </p>
            <p className="text-gold font-lato font-bold mt-4">
              Email: contact@aniiphotography.com<br />
              Phone: +91 8981106258<br />
              Address: Garia, Kolkata - 700084
            </p>
          </div>

          
          <div className="border-t border-gold/30 pt-8 text-center">
            <p className="text-gray-400 font-lato text-sm">
              Last Updated: May 2026
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
