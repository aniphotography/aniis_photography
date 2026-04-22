import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturedSection from '@/components/FeaturedSection'
import CategoriesSection from '@/components/CategoriesSection'
import WhyAniiPhotography from '@/components/WhyAniiPhotography'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <WhyAniiPhotography />
      <Footer />
    </main>
  )
}
