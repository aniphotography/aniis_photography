'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Column 1: Services */}
          <div>
            <h4 className="font-display text-white mb-6 text-lg uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Wedding', href: '/wedding' },
                { label: 'Pre-Wedding', href: '/pre-wedding' },
                { label: 'Album Design', href: '/album-design' },
                { label: 'Video Production', href: '/video-production' },
                { label: 'Fashion', href: '/fashion' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 font-lato text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-display text-white mb-6 text-lg uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Gallery', href: '/albums' },
                { label: 'Blogs', href: '/blogs' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 font-lato text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-display text-white mb-6 text-lg uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4 font-lato text-sm text-gray-400">
              <li className="hover:text-gold transition-colors duration-300">
                <a href="mailto:contact@aniiphotography@gmail.com">
                  contact@aniiphotography.com
                </a>
              </li>
              <li className="hover:text-gold transition-colors duration-300 cursor-default">
                +91 8981106258
              </li>
              <li className="hover:text-gold transition-colors duration-300 cursor-default">
                Kolkata, West Bengal, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-gray-500 font-lato text-sm">
            <p>&copy; {currentYear} Anii Photography. All rights reserved.</p>
            <span className="text-gray-600">|</span>
            <Link
              href="/terms"
              className="hover:text-gold transition-colors duration-300"
            >
              Terms & Conditions
            </Link>
               <Link
              href="/faqs"
              className="hover:text-gold transition-colors duration-300"
            >
              FAQs
            </Link>
          </div>
          <div className="flex gap-8">
            {[
              { icon: 'f', label: 'Facebook', href: 'https://www.facebook.com/the.anii.photography' },
              { icon: 'i', label: 'Instagram', href: 'https://www.instagram.com/anii_film' },
              { icon: 'b', label: 'Behance', href: 'https://www.behance.net/aniruddhadas8' },
              { icon: 'y', label: 'YouTube', href: 'https://www.youtube.com/@Anii_Photography' },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-300 font-lato text-sm"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
