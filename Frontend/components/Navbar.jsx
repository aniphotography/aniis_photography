// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isAdmin, setIsAdmin] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken')
//     if (token) setIsAdmin(true)
//   }, [])

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/wedding', label: 'Wedding' },
//     { href: '/pre-wedding', label: 'Pre-Wedding' },
//     { href: '/albums', label: 'Gallery' },
//     { href: '/video-production', label: 'Video Production' },
//     { href: '/fashion', label: 'Fashion' },
//     { href: '/album-design', label: 'Album Design' },
//     { href: '/blogs', label: 'Blogs' },
//     { href: '/about', label: 'About' },
//     // ❌ Contact removed
//   ]

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/" className="text-2xl font-display text-gold flex-shrink-0">
//           ANII
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="text-sm font-lato text-gray-300 hover:text-gold transition-colors duration-300 relative group whitespace-nowrap"
//             >
//               {link.label}
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
//             </Link>
//           ))}
//         </div>

//         {/* Right Side Buttons */}
//         <div className="hidden lg:flex items-center gap-4 flex-shrink-0">

//           {/* Admin / Dashboard
//           {isAdmin ? (
//             <Link
//               href="/admin/dashboard"
//               className="text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors"
//             >
//               Dashboard
//             </Link>
//           ) : (
//             <Link
//               href="/admin/login"
//               className="text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors"
//             >
//               Admin
//             </Link>
//           )} */}

//           {/* Book Session */}
//           <Link
//             href="/contact"
//             className="px-6 py-2 bg-gold text-black font-lato font-bold text-sm hover:bg-yellow-400 transition-colors duration-300"
//           >
//             Book Session
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="lg:hidden text-gold"
//           aria-label="Toggle menu"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="lg:hidden bg-black/95 border-t border-white/10">
//           <div className="px-6 py-4 space-y-4">

//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="block text-sm font-lato text-gray-300 hover:text-gold transition-colors duration-300"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {/* Admin / Dashboard (Mobile) */}
//             {isAdmin ? (
//               <Link
//                 href="/admin/dashboard"
//                 className="block text-sm text-gray-300 hover:text-gold"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Dashboard
//               </Link>
//             ) : (
//               <Link
//                 href="/admin/login"
//                 className="block text-sm text-gray-300 hover:text-gold"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Admin
//               </Link>
//             )}

//             {/* Book Session */}
//             <Link
//               href="/contact"
//               className="block px-6 py-2 bg-gold text-black font-lato font-bold text-sm text-center hover:bg-yellow-400 transition-colors duration-300"
//               onClick={() => setIsOpen(false)}
//             >
//               Book Session
//             </Link>

//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
// Import icons
import { FaYoutube, FaInstagram, FaFacebook, FaBehance } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) setIsAdmin(true)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/wedding', label: 'Wedding' },
    { href: '/pre-wedding', label: 'Pre-Wedding' },
    { href: '/albums', label: 'Gallery' },
    { href: '/video-production', label: 'Video Production' },
    { href: '/fashion', label: 'Fashion' },
    { href: '/album-design', label: 'Album Design' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/about', label: 'About' },
  ]

  // New Social Links
  const socialLinks = [
    { href: 'https://youtube.com/@AniiPhotography', icon: <FaYoutube />, label: 'YouTube' },
    { href: 'https://www.instagram.com/anii_filmy', icon: <FaInstagram />, label: 'Instagram' },
    { href: 'https://www.facebook.com/the.anii.photography', icon: <FaFacebook />, label: 'Facebook' },
    { href: 'https://www.behance.net/aniruddha.das08', icon: <FaBehance />, label: 'Behance' },
  ]

  return (
   <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
  <div className="max-w-[95%] mx-auto px-2 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-display text-gold flex-shrink-0">
          ANII
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-lato text-gray-300 hover:text-gold transition-colors duration-300 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Right Side Buttons + Socials */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          
          {/* Social Icons Added Here */}
          <div className="flex items-center gap-4 text-gray-400">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors text-lg"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <Link
            href="/contact"
            className="px-6 py-2 bg-gold text-black font-lato font-bold text-sm hover:bg-yellow-400 transition-colors duration-300"
          >
            Book Session
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gold"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10">
          <div className="px-6 py-4 space-y-4">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-lato text-gray-300 hover:text-gold transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-white/10" />

            {/* Mobile Social Icons */}
            <div className="flex items-center gap-6 py-2 text-gray-400">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {isAdmin ? (
              <Link
                href="/admin/dashboard"
                className="block text-sm text-gray-300 hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="block text-sm text-gray-300 hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}

            <Link
              href="/contact"
              className="block px-6 py-2 bg-gold text-black font-lato font-bold text-sm text-center hover:bg-yellow-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Book Session
            </Link>

          </div>
        </div>
      )}
    </nav>
  ) 
}