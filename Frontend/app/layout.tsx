import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import BookSessionModal from '@/components/BookSessionModal'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900']
})

const lato = Lato({ 
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700']
})

export const metadata = {
  title: 'LUXE - Premium Photography',
  description: 'Luxury photography capturing timeless moments with artistry and sophistication',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased bg-[#1a1a1a] text-white">
        {children}
        <BookSessionModal />
      </body>
    </html>
  )
}
