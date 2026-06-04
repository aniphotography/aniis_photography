import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturedSection from '@/components/FeaturedSection'
import CategoriesSection from '@/components/CategoriesSection'
import WhyAniiPhotography from '@/components/WhyAniiPhotography'
import Footer from '@/components/Footer'

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Anii Photography",
    "url": "https://www.aniiphotography.com"
  }
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <WhyAniiPhotography />
      <Footer />
    </main>
  )
}
