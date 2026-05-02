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

      
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">PREAMBLE</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              These Terms and Conditions (the "Agreement") constitute a legally binding covenant between Weddingz by Anii, operating under the brand Anii Photography (hereinafter referred to as the "Studio"), and the undersigned client(s) (hereinafter referred to as the "Client"). By remitting the initial retainer, the Client explicitly agrees to be bound by the stipulations set forth herein.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">1. The Retainer & Date Exclusivity</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              To secure the Studio’s services for the specified event date, a Non-Refundable Retainer is required. This remittance guarantees the Studio’s exclusive availability and explicitly turns away other prospective clientele.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>Forfeiture:</strong> In the event of cancellation, this retainer is strictly non-refundable and non-transferable, serving as agreed liquidated damages for the Studio's loss of business.</li>
              <li>• <strong>Postponements:</strong> Should the event be deferred, the Studio may, at its sole discretion, apply the retainer to a new date, strictly contingent upon the Studio's availability. Subsequent retainers or premium surcharges may apply to secure rescheduled dates.</li>
            </ul>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">2. Schedule of Remittance</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              Following the execution of the quotation, the Client is bound to a strict remittance schedule. Unless otherwise stipulated in writing, financial obligations shall be executed as follows:
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>40%</strong> – Non-Refundable Retainer (Due upon execution of this contract to secure the date).</li>
              <li>• <strong>50%</strong> – Due strictly on or before the primary Event Date.</li>
              <li>• <strong>10%</strong> – Final Balance (Due prior to the release of soft copies of albums, and final cinematic deliverables).</li>
              <li>• <strong>Default:</strong> The Studio reserves the explicit right to withhold all proofs, digital media, and physical deliverables until the Client’s account is settled in full. Additional à la carte services must be paid in full at the time of order.</li>
            </ul>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">3. Exclusive Artistic Control</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Studio operates as a premium creative entity and retains absolute artistic license regarding composition, posing, lighting, location selection, and post-production editing.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• The Photographer’s professional judgment regarding aesthetics and coverage is final and binding.</li>
              <li>• While the Studio will attempt to accommodate shot lists, we strictly disclaim liability for missing specific images due to environmental limitations, weather constraints, schedule delays, or lack of subject cooperation.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">4. Travel, Logistics & Crew Accommodations</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              All logistical expenses required for the execution of the event—including but not limited to airfare or ground transportation, on-site sustenance (crew meals), and overnight lodging—are the strict financial responsibility of the Client and are categorically excluded from the base contracted package fee. 
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              Furthermore, any accommodations provided for the Studio’s crew must meet acceptable professional standards of hygiene, safety, and comfort. Lodging must be distinctly clean, adequately spacious, and fully suitable for professionals to rest and recharge between intensive shooting schedules. The Studio explicitly reserves the right to reject substandard or unsanitary accommodations and independently secure appropriate lodging at the Client's direct expense.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">5. Client Obligations & Event Execution</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Studio endeavors to document the event comprehensively; however, execution is strictly contingent upon the Client providing adequate time, physical space, and coordination. 
            </p>
            <p className="text-gray-300 font-lato leading-relaxed">
              ● The Studio expressly absolves itself of liability for missed moments resulting from poor logistical planning, tardiness, or failure of the Client (or their coordinators) to assemble subjects.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">6. Intellectual Property & Copyright</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              In accordance with international copyright law, the Studio retains absolute ownership and copyright of all captured media.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>Personal License:</strong> The Client is granted a limited, perpetual license to utilize the media strictly for personal, non-commercial purposes.</li>
              <li>• <strong>Commercial Prohibition:</strong> Any commercial usage, brand promotion, or third-party advertising by the Client or vendor partners requires a separate, explicitly negotiated Commercial Licensing Agreement and appropriate financial compensation to the Studio.</li>
            </ul>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">7. Promotional Use & Exhibition Rights</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Studio reserves the irrevocable right to utilize any captured media for portfolio exhibition, website curation, social media marketing, and elite industry competitions. The Client acknowledges that the Studio cannot be held liable for unauthorized scraping or malicious misuse of displayed imagery by unaffiliated third parties. (Note: Non-disclosure/privacy exceptions must be negotiated in writing prior to booking and may incur an exclusivity fee).
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">8. Post-Production & Deliverables</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              High-resolution digital files will be deployed via secure, encrypted cloud transmission within the timeline dictated by the selected package.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>Quality Standards:</strong> All physical albums and fine art prints are manufactured by vetted, industry-leading print houses. The Studio’s quality control is rigorous and final. Rush processing is strictly subject to Studio availability and mandates an expedited service fee.</li>
            </ul>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">9. Strict Cancellation Policy</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Client maintains the right to terminate this Agreement via formal written notice.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• Upon termination, all remitted funds are instantly forfeited.</li>
              <li>• <strong>Penalty Clause:</strong> If cancellation occurs within thirty (30) days of the scheduled Event Date, the Client is legally obligated to remit 100% of the total contracted balance, as the Studio’s ability to re-book the date is severely compromised.</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">10. Scope Amendments</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              Any deviations from the original timeline, venue, or contracted deliverables shall be classified as an extension of this Agreement. The Studio accepts no liability for unfulfilled expectations unless all modifications are submitted and approved in writing.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">11. Venue Constraints & Equipment Indemnification</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Client assumes full responsibility for securing all necessary permits, access rights, and photographic clearances required by venues. The Studio accepts no liability for coverage restrictions imposed by venue management, officiants, or local authorities.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>Equipment Protection:</strong> The Client agrees to fully indemnify and hold the Studio harmless for any damage to photographic/cinematographic equipment caused by the Client, their guests, or independent contractors during the course of the event.</li>
            </ul>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">12. Force Majeure & Contingencies</h2>
            <p className="text-gray-300 font-lato leading-relaxed mb-4">
              The Studio shall not be deemed in breach of this Agreement if unable to execute its duties due to circumstances beyond reasonable control, including but not limited to acts of God, extreme meteorological events, catastrophic equipment failure, or severe sudden illness.
            </p>
            <ul className="text-gray-300 font-lato space-y-2 mb-4 ml-6">
              <li>• <strong>Personnel Substitution:</strong> In the exceedingly rare event of primary photographer incapacitation, the Studio reserves the right to deploy a master-level substitute to execute the contract.</li>
              <li>• <strong>Limitation of Liability:</strong> In the event of total media loss or catastrophic contract failure, the Studio's absolute liability is legally capped at the total monetary value of the contract. The Studio expressly disclaims liability for indirect, emotional, or consequential damages.</li>
            </ul>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">13. Confidentiality & Data Processing</h2>
            <p className="text-gray-300 font-lato leading-relaxed">
              The Studio adheres to stringent data protection protocols. Client logistics, contact information, and event details are kept strictly confidential and utilized solely for logistical execution and deliverable fulfillment.
            </p>
          </div>

          
          <div className="mb-12">
            <h2 className="text-3xl font-display text-gold mb-4">Contact Information</h2>
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
